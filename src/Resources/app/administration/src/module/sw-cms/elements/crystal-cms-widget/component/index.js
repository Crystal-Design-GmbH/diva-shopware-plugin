import template from './sw-cms-el-crystal-cms-widget.html.twig';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-crystal-cms-widget', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('crystal-cms-widget');
            this.initElementData('crystal-cms-widget');
        }
    },

    computed: {
        assetFilter() {
            return Shopware.Filter.getByName('asset');
        },
    }
});
