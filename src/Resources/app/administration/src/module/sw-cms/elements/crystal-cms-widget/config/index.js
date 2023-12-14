import template from './sw-cms-el-config-crystal-cms-widget.html.twig';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-el-config-crystal-cms-widget', {
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
        }
    }
});
