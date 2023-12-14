<?php declare(strict_types=1);

namespace Teamblau\TeamblauCrystalDesignConfiguratorIntegration\Core\Checkout\Promotion\Cart\Discount\ScopePackager;

use Shopware\Core\Checkout\Cart\Cart;
use Shopware\Core\Checkout\Cart\LineItem\LineItem;
use Shopware\Core\Checkout\Promotion\Cart\Discount\DiscountLineItem;
use Shopware\Core\Checkout\Promotion\Cart\Discount\DiscountPackageCollection;
use Shopware\Core\Checkout\Promotion\Cart\Discount\ScopePackager\CartScopeDiscountPackager;
use Shopware\Core\Framework\Log\Package;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Teamblau\TeamblauCrystalDesignConfiguratorIntegration\Core\Checkout\Cart\ProductDivaLineItemFactory;

#[Package('checkout')]
class TeamblauCartScopeDiscountPackager extends CartScopeDiscountPackager
{
    public function getMatchingItems(DiscountLineItem $discount, Cart $cart, SalesChannelContext $context): DiscountPackageCollection
    {
        $allItems = $cart->getLineItems()->filter(fn (LineItem $lineItem) => ($lineItem->getType() === LineItem::PRODUCT_LINE_ITEM_TYPE || $lineItem->getType() === ProductDivaLineItemFactory::TYPE) && $lineItem->isStackable());

        $discountPackage = parent::getDiscountPackage($allItems);
        if ($discountPackage === null) {
            return new DiscountPackageCollection([]);
        }

        return new DiscountPackageCollection([$discountPackage]);
    }
}