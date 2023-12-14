import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'crystal-cms-widget',
    label: 'teamblau-cms.block.crystalCmsWidget.label',
    category: 'text-image',
    component: 'sw-cms-block-crystal-cms-widget',
    previewComponent: 'sw-cms-preview-crystal-cms-widget',
    slots: {
        main: 'crystal-cms-widget'
    }
});
