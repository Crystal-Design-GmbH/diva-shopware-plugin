<?php declare(strict_types=1);

namespace Teamblau\TeamblauCrystalDesignConfiguratorIntegration\Controller;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\ContainerInterface;
use Psr\Container\NotFoundExceptionInterface;
use Shopware\Core\Checkout\Cart\Cart;
use Shopware\Core\Checkout\Cart\CartPersister;
use Shopware\Core\Checkout\Cart\Error\Error;
use Shopware\Core\Checkout\Cart\LineItem\LineItem;
use Shopware\Core\Checkout\Cart\LineItem\LineItemCollection;
use Shopware\Core\Checkout\Cart\Price\Struct\CalculatedPrice;
use Shopware\Core\Checkout\Cart\Price\Struct\QuantityPriceDefinition;
use Shopware\Core\Checkout\Cart\SalesChannel\CartService;
use Shopware\Core\Checkout\Cart\Tax\Struct\CalculatedTaxCollection;
use Shopware\Core\Content\Product\Exception\ProductNotFoundException;
use Shopware\Core\Framework\Log\Package;
use Shopware\Core\Framework\Routing\Exception\MissingRequestParameterException;
use Shopware\Core\Framework\Validation\DataBag\RequestDataBag;
use Shopware\Core\Profiling\Profiler;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Shopware\Core\System\SystemConfig\SystemConfigService;
use Shopware\Core\System\Tax\TaxEntity;
use Shopware\Storefront\Controller\StorefrontController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @internal
 */
#[Route(defaults: ['_routeScope' => ['storefront']])]
#[Package('storefront')]
class TeamblauAddToCartController extends StorefrontController
{
    public const TYPE = 'productDiva';

    /**
     * @internal
     */
    public function __construct(
        ContainerInterface $container,
        private readonly CartService            $cartService,
        private readonly CartPersister          $cartPersister,
        private readonly SystemConfigService    $systemConfigService
    )
    {
    }

    #[Route(path: '/diva/line-item/add', name: 'frontend.teamblau.diva.line-item.add', options: ['seo' => false], defaults: ['XmlHttpRequest' => true, 'csrf_protected' => false], methods: ['POST'])]
    public function addDivaLineItem(Cart $cart, RequestDataBag $requestDataBag, Request $request, SalesChannelContext $context)
    {
        return Profiler::trace('cart::add-line-item', function () use ($cart, $requestDataBag, $request, $context) {
            $this->addNewLineItem($cart,$requestDataBag, $context, $request);

            return $this->createActionResponse($request);
        });
    }

    #[Route(path: '/diva/line-item/update', name: 'frontend.teamblau.diva.line-item.update', options: ['seo' => false], defaults: ['XmlHttpRequest' => true, 'csrf_protected' => false], methods: ['POST'])]
    public function updateDivaLineItem(Cart $cart, RequestDataBag $requestDataBag, Request $request, SalesChannelContext $context)
    {
        return Profiler::trace('cart::update-line-item', function () use ($cart, $requestDataBag, $request, $context) {
            $this->addNewLineItem($cart,$requestDataBag, $context, $request);

            return $this->createActionResponse($request);
        });
    }

    private function getDivaBasket($divaNr, $documentVersion, $context): mixed
    {
        $fields = 'DivaNrVersion,DocumentVersion,ProductImage,TotalPrice,SetName,PDFDocumentURL';
        $fields = urlencode($fields);

        $clientOptions = ['verify' => false];
        $client = new Client($clientOptions);

        $apiKey = $this->systemConfigService->get('TeamblauCrystalDesignConfiguratorIntegration.config.apiKey');

        if (array_key_exists('diva_base_url', $context->getSalesChannel()->getCustomFields())) {
            $divaBaseUrl = $context->getSalesChannel()->getCustomFields()['diva_base_url'];
        } else {
            return null;
        }

        try {
            $lineItem = $client->request('GET', $divaBaseUrl . '/basket/baskets/' . $divaNr . '?version=' . $documentVersion . '&fields={' . $fields . '}', [
                'headers' => ['X-API-KEY' => $apiKey]
            ]);
        } catch (ClientException $exception) {
            return null;
        }

        $lineItemContents = $lineItem->getBody()->getContents();

        return json_decode($lineItemContents);
    }

    private function newLineItem($lineItemArray, $scContext) {
        $lineItemsDivaTB = new LineItemCollection();

        if ($lineItemArray != []) {
            try {
                $customLineItemFactory = $this->container->get("Teamblau\TeamblauCrystalDesignConfiguratorIntegration\Core\Checkout\Cart\ProductDivaLineItemFactory");
            } catch (NotFoundExceptionInterface|ContainerExceptionInterface $e) {
                $customLineItemFactory = null;
            }

            if ($customLineItemFactory) {
                $divaNrVersion = $lineItemArray->DivaNrVersion;
                $quantity = 1;

                $productRequestLineItem = [
                    'id' => md5($divaNrVersion),
                    'label' => $lineItemArray->SetName,
                    'quantity' => $quantity,
                    'payload' => [
                        'divaNr' => $lineItemArray->DivaNr,
                        'divaNrVersion' => $lineItemArray->DivaNrVersion,
                        'documentVersion' => $lineItemArray->DocumentVersion,
                        'imageUrl' => $lineItemArray->ProductImage,
                        'pdfUrl' => $lineItemArray->PDFDocumentURL
                    ]
                ];

                /** @var LineItem $lineItem */
                $lineItemDivaTB = $customLineItemFactory->create($productRequestLineItem, $scContext);

                $price = (float) $lineItemArray->TotalPrice;
                $lineItemDivaTB->setPrice($this->calculatedPrice($price, $scContext, $quantity));
                $lineItemDivaTB->setPriceDefinition($this->priceDefinition($price, $scContext, $quantity));
                $lineItemsDivaTB->add($lineItemDivaTB);
            }

            if ($lineItemsDivaTB->count() >= 1) {
                return $lineItemsDivaTB;
            }
        }
    }

    private function addNewLineItem($cart, $requestDataBag, $context, $request) {
        /** @var string $divaNr */
        $divaNr = $requestDataBag->get('divaNr');
        if (!$divaNr) {
            throw new MissingRequestParameterException('lineItems');
        }

        $documentVersion = $requestDataBag->get('documentVersion');
        $count = 0;

        try {
            $count += 1;
            $lineItem = $this->getDivaBasket($divaNr, $documentVersion);

            $lineItemsDivaTB = $this->newLineItem($lineItem, $context);

            $cart = $this->cartService->add($cart, $lineItemsDivaTB->getFlat(), $context);

            if (!$this->traceErrors($cart)) {
                $this->addFlash(self::SUCCESS, $this->trans('checkout.addToCartSuccess', ['%count%' => $count]));
            }
        } catch (ProductNotFoundException) {
            $this->addFlash(self::DANGER, $this->trans('error.addToCartError'));
        }
    }

    private function priceDefinition($price, $scContext, $quantity): QuantityPriceDefinition
    {
        $taxId = $this->getDefaultTaxFromContext($scContext);

        return new QuantityPriceDefinition($price, $scContext->buildTaxRules($taxId), $quantity);
    }

    private function calculatedPrice($price, $scContext, $quantity): CalculatedPrice
    {
        $taxId = $this->getDefaultTaxFromContext($scContext);

        return new CalculatedPrice(
            $price,
            $price * $quantity,
            new CalculatedTaxCollection(),
            $scContext->buildTaxRules($taxId),
            $quantity
        );
    }

    /**
     * @param SalesChannelContext $scContext
     * @return string
     */
    private function getDefaultTaxFromContext(SalesChannelContext $scContext): string
    {
        if (empty($this->defaultTaxId)) {
            $taxRules = $scContext->getTaxRules();
            $defaultTaxRate = $taxRules->filter(function (TaxEntity $tax) {
                return $tax->getTaxRate() == 22.0;
            });
            if ($defaultTaxRate && $defaultTaxRate->count() >= 1) {
                $this->defaultTaxId = $defaultTaxRate->first()->getId();
            } else {
                $this->defaultTaxId = $taxRules->first()->getId();
            }
        }
        return $this->defaultTaxId;
    }

    private function traceErrors(Cart $cart): bool
    {
        if ($cart->getErrors()->count() <= 0) {
            return false;
        }

        $this->addCartErrors($cart, fn (Error $error) => $error->isPersistent());

        return true;
    }
}