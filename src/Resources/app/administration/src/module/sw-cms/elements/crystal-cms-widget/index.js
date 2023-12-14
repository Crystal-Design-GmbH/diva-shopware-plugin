import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'crystal-cms-widget',
    label: 'teamblau-cms.elements.crystalCmsWidget.label',
    component: 'sw-cms-el-crystal-cms-widget',
    configComponent: 'sw-cms-el-config-crystal-cms-widget',
    previewComponent: 'sw-cms-el-preview-crystal-cms-widget',
    defaultConfig: {
        identifier: {
            source: 'static',
            value: ''
        },
        type: {
            source: 'static',
            value: '',
            required: true
        },
        parameters: {
            source: 'static',
            value: ''
        }
    }
});
