import './module/sw-cms/blocks/text-image/crystal-cms-widget';
import './module/sw-cms/elements/crystal-cms-widget';
import deDE from './snippet/de-DE.json';
import enGB from './snippet/en-GB.json';
import itIT from './snippet/it-IT.json';

Shopware.Locale.extend('de-DE', deDE);
Shopware.Locale.extend('en-GB', enGB);
Shopware.Locale.extend('it-IT', itIT);

Shopware.Application
    .getContainer('service')
