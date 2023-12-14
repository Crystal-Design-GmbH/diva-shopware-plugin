<?php declare(strict_types=1);

namespace Teamblau\TeamblauCrystalDesignConfiguratorIntegration\Core\Checkout\Cart;

use Shopware\Core\Checkout\Cart\Cart;
use Shopware\Core\Checkout\Cart\CartBehavior;
use Shopware\Core\Checkout\Cart\CartException;
use Shopware\Core\Checkout\Cart\CartProcessorInterface;
use Shopware\Core\Checkout\Cart\LineItem\CartDataCollection;
use Shopware\Core\Checkout\Cart\Price\QuantityPriceCalculator;
use Shopware\Core\Checkout\Cart\Price\Struct\QuantityPriceDefinition;
use Shopware\Core\Profiling\Profiler;
use Shopware\Core\System\SalesChannel\SalesChannelContext;

class ProductDivaCartProcessor implements CartProcessorInterface {

    /**
     * @internal
     */
    public function __construct(private readonly QuantityPriceCalculator $calculator)
    {
    }

    public function process(CartDataCollection $data, Cart $original, Cart $toCalculate, SalesChannelContext $context, CartBehavior $behavior): void
    {
        Profiler::trace('cart::productDiva::process', function () use ($data, $original, $toCalculate, $context): void {
            $items = $original->getLineItems()->filterFlatByType(ProductDivaLineItemFactory::TYPE);

            foreach ($items as $item) {
                $definition = $item->getPriceDefinition();

                if (!$definition instanceof QuantityPriceDefinition) {
                    throw CartException::missingLineItemPrice($item->getId());
                }
                $definition->setQuantity($item->getQuantity());

                $item->setPrice($this->calculator->calculate($definition, $context));
            }

            $items = $original->getLineItems()->filterType(ProductDivaLineItemFactory::TYPE);

            foreach ($items as $item) {
                $toCalculate->add($item);
            }
        }, 'cart');
    }
}
