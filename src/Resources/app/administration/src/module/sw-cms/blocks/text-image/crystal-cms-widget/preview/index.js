import template from './sw-cms-preview-crystal-cms-widget.html.twig';

Shopware.Component.register('sw-cms-preview-crystal-cms-widget', {
    template,

    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    }
});
