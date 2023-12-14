<?php declare(strict_types=1);

namespace Teamblau\TeamblauCrystalDesignConfiguratorIntegration\Subscriber;

use Shopware\Core\Checkout\Cart\Order\CartConvertedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class CheckoutOrderPlacedEventSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            CartConvertedEvent::class => 'onCartConvert'
        ];
    }

    public function onCartConvert($event)
    {
        $cart = $event->getConvertedCart();

        foreach ($cart['lineItems'] as $key => $lineItem) {
            if ($lineItem['type'] == 'productDiva') {
                $divaNr = $lineItem['payload']['divaNr'];
                $label = $lineItem['label'];
                $cart['lineItems'][$key]['label'] = $label . ' ' . $divaNr;
            }
        }

        $event->setConvertedCart($cart);
    }
}