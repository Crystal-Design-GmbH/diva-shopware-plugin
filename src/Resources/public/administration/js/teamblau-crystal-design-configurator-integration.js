!function(e){var t={};function s(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(i,n,function(t){return e[t]}.bind(null,n));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p=(window.__sw__.assetPath + '/bundles/teamblaucrystaldesignconfiguratorintegration/'),s(s.s="SWIL")}({"3mKo":function(e){e.exports=JSON.parse('{"teamblau-cms":{"block":{"crystalCmsWidget":{"label":"Crystal Design Cms Widget"}},"elements":{"productConfigurator":{"label":"Product detail configurator","identifier":"Identifier","type":"Type"},"crystalCmsWidget":{"label":"Crystal Design Cms Widget","identifier":"Identifier","type":"Type","parameters":"Parameters (Format: json)"}}}}')},M7GO:function(e){e.exports=JSON.parse('{"teamblau-cms":{"block":{"crystalCmsWidget":{"label":"Crystal Design Cms Widget"}},"elements":{"productConfigurator":{"label":"Produkt Detail Konfigurator","identifier":"Identifier","type":"Type"},"crystalCmsWidget":{"label":"Crystal Design Cms Widget","identifier":"Identifier","type":"Type","parameters":"Parameters (Format: json)"}}}}')},SWIL:function(e,t,s){"use strict";s.r(t);Shopware.Component.register("sw-cms-block-crystal-cms-widget",{template:'{% block sw_cms_block_crystal_cms_widget_block %}\n    <div class="sw-cms-block-crystal-cms-widget">\n        <slot name="main">{% block sw_cms_element_crystal_cms_widget %}{% endblock %}</slot>\n    </div>\n{% endblock %}\n'});Shopware.Component.register("sw-cms-preview-crystal-cms-widget",{template:'{% block sw_cms_block_crystal_cms_widget_preview %}\n    <div class="preview-crystal-cms-widget-block">\n        <img class="sw-cms-block-product-detail-img"\n            :src="\'teamblaucrystaldesignconfiguratorintegration/administration/assets/diva-cms-widget.png\' | asset">\n    </div>\n{% endblock %}\n'}),Shopware.Service("cmsService").registerCmsBlock({name:"crystal-cms-widget",label:"teamblau-cms.block.crystalCmsWidget.label",category:"text-image",component:"sw-cms-block-crystal-cms-widget",previewComponent:"sw-cms-preview-crystal-cms-widget",slots:{main:"crystal-cms-widget"}});var i=Shopware,n=i.Component,r=i.Mixin;n.register("sw-cms-el-crystal-cms-widget",{template:'{% block sw_cms_element_crystal_cms_widget %}\n    <div class="sw-cms-el-crystal-cms-widget">\n        <img class="sw-cms-el-product-detail-img"\n            :src="\'teamblaucrystaldesignconfiguratorintegration/administration/assets/diva-cms-widget.png\' | asset">\n    </div>\n{% endblock %}\n',mixins:[r.getByName("cms-element")],created:function(){this.createdComponent()},methods:{createdComponent:function(){this.initElementConfig("crystal-cms-widget"),this.initElementData("crystal-cms-widget")}}});var a=Shopware,c=a.Component,l=a.Mixin;c.register("sw-cms-el-config-crystal-cms-widget",{template:'{% block sw_cms_element_config_crystal_cms_widget %}\n    <div class="sw-cms-el-config-crystal-cms-widget">\n        <sw-text-field type="text"\n                        :label="$tc(\'teamblau-cms.elements.crystalCmsWidget.identifier\')"\n                        v-model="element.config.identifier.value">\n        </sw-text-field>\n        <sw-text-field type="text"\n                        :label="$tc(\'teamblau-cms.elements.crystalCmsWidget.type\')"\n                        required="true"\n                        v-model="element.config.type.value">\n        </sw-text-field>\n        <sw-text-field type="json"\n                        :label="$tc(\'teamblau-cms.elements.crystalCmsWidget.parameters\')"\n                        v-model="element.config.parameters.value">\n        </sw-text-field>\n    </div>\n{% endblock %}\n',mixins:[l.getByName("cms-element")],created:function(){this.createdComponent()},methods:{createdComponent:function(){this.initElementConfig("crystal-cms-widget")}}});Shopware.Component.register("sw-cms-el-preview-crystal-cms-widget",{template:'{% block sw_cms_el_preview_crystal_cms_widget %}\n    <div class="preview-crystal-cms-widget">\n        <img class="sw-cms-el-product-detail-img"\n            :src="\'teamblaucrystaldesignconfiguratorintegration/administration/assets/diva-cms-widget.png\' | asset">\n    </div>\n{% endblock %}'}),Shopware.Service("cmsService").registerCmsElement({name:"crystal-cms-widget",label:"teamblau-cms.elements.crystalCmsWidget.label",component:"sw-cms-el-crystal-cms-widget",configComponent:"sw-cms-el-config-crystal-cms-widget",previewComponent:"sw-cms-el-preview-crystal-cms-widget",defaultConfig:{identifier:{source:"static",value:""},type:{source:"static",value:"",required:!0},parameters:{source:"static",value:""}}});var o=s("M7GO"),m=s("3mKo"),d=s("pI5o");Shopware.Locale.extend("de-DE",o),Shopware.Locale.extend("en-GB",m),Shopware.Locale.extend("it-IT",d),Shopware.Application.getContainer("service")},pI5o:function(e){e.exports=JSON.parse('{"teamblau-cms":{"block":{"crystalCmsWidget":{"label":"Crystal Design Cms Widget"}},"elements":{"productConfigurator":{"label":"Configuratore dettaglio prodotto","identifier":"Identifier","type":"Type"},"crystalCmsWidget":{"label":"Crystal Design Cms Widget","identifier":"Identifier","type":"Type","parameters":"Parameters (Format: json)"}}}}')}});