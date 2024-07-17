import template from './sw-cms-el-preview-crystal-cms-widget.html.twig';
import './sw-cms-el-preview-crystal-cms-widget.scss';

Shopware.Component.register('sw-cms-el-preview-crystal-cms-widget', {
    template,

    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    }
});
