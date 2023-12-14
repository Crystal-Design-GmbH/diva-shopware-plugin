<?php declare(strict_types=1);

namespace Teamblau\TeamblauCrystalDesignConfiguratorIntegration\Core\Checkout\Cart;

use Shopware\Core\Checkout\Cart\CartException;
use Shopware\Core\Checkout\Cart\Delivery\Struct\DeliveryInformation;
use Shopware\Core\Checkout\Cart\Delivery\Struct\DeliveryTime;
use Shopware\Core\Checkout\Cart\LineItem\LineItem;
use Shopware\Core\Checkout\Cart\LineItem\QuantityInformation;
use Shopware\Core\Checkout\Cart\LineItemFactoryHandler\LineItemFactoryInterface;
use Shopware\Core\Checkout\Cart\PriceDefinitionFactory;
use Shopware\Core\Content\Product\Cart\ProductCartProcessor;
use Shopware\Core\Framework\Struct\ArrayEntity;
use Shopware\Core\System\DeliveryTime\DeliveryTimeEntity;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Shopware\Core\System\SystemConfig\SystemConfigService;
use Shopware\Core\System\Tax\TaxEntity;

#[Package('checkout')]
class ProductDivaLineItemFactory implements LineItemFactoryInterface
{
    public const TYPE = 'productDiva';

    /**
     * @internal
     */
    public function __construct(
        private readonly SystemConfigService $systemConfigService,
        private readonly PriceDefinitionFactory $priceDefinitionFactory,
    )
    {
    }

    public function supports(string $type): bool
    {
        return $type === self::TYPE;
    }

    /**
     * @param array<mixed> $data
     */
    public function create(array $data, SalesChannelContext $context): LineItem
    {
        $quantity = isset($data['quantity']) ? (int)$data['quantity'] : 1;

        $lineItem = new LineItem($data['id'], self::TYPE, $data['referencedId'] ?? null, $quantity);
        $lineItem->markModified();

        $lineItem->setRemovable(true);
        $lineItem->setStackable(true)
            ->setDeliveryInformation(
                new DeliveryInformation(
                    100,
                    null,
                    false,
                    2,
                    $this->createDeliveryTime()
                )
            )
            ->setQuantityInformation(
                $this->createQuantityInformation($context)
            );

        if (array_key_exists('label', $data)) {
            $lineItem->setLabel($data['label']);
        }
        if (array_key_exists('payload', $data)) {
            foreach ($data['payload'] as $payloadKey => $payloadValue) {
                $lineItem->setPayloadValue($payloadKey, $payloadValue);
            }
        }

        $this->update($lineItem, $data, $context);

        return $lineItem;
    }

    /**
     * @param array<mixed> $data
     */
    public function update(LineItem $lineItem, array $data, SalesChannelContext $context): void
    {
         if (isset($data['payload'])) {
             $lineItem->setPayload($data['payload'] ?? []);
         }

         if (isset($data['quantity'])) {
             $lineItem->setQuantity((int) $data['quantity']);
         }

         if (isset($data['priceDefinition']) && !$context->hasPermission(ProductCartProcessor::ALLOW_PRODUCT_PRICE_OVERWRITES)) {
             throw CartException::insufficientPermission();
         }

        if (isset($data['priceDefinition'])) {
            $lineItem->addExtension(ProductCartProcessor::CUSTOM_PRICE, new ArrayEntity());
            $lineItem->setPriceDefinition($this->priceDefinitionFactory->factory($context->getContext(), $data['priceDefinition'], $data['type']));
        }

        if (isset($data['label'])) {
            $lineItem->setLabel($data['label']);
        }
    }

    public function getType(): string
    {
        return self::TYPE;
    }

    /**
     * QuantityInformation anfügen, da ansonsten die Menge im Warenkorb nicht verändert werden kann
     * @param SalesChannelContext $context
     * @return QuantityInformation
     */
    private function createQuantityInformation(SalesChannelContext $context): QuantityInformation
    {
        $quantityInformation = new QuantityInformation();

        $quantityInformation->setMinPurchase(
            1
        );

        $quantityInformation->setMaxPurchase(
            $this->systemConfigService->getInt(
                'core.cart.maxQuantity',
                $context->getSalesChannel()->getId()
            )
        );

        $quantityInformation->setPurchaseSteps(
            1
        );

        return $quantityInformation;
    }

    private function createDeliveryTime(): DeliveryTime
    {
        $deliveryTime = new DeliveryTime();
        $deliveryTime->setMin(1);
        $deliveryTime->setMax(4);
        $deliveryTime->setUnit(DeliveryTimeEntity::DELIVERY_TIME_DAY);

        return $deliveryTime;
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
}
