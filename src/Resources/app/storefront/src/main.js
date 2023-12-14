//Import all necesary for similar slider
import ConfiguratorIntegration from './js/teamblau-configurator-integration';
import ProductDetailConfigurator from './js/teamblau-configurator-product-variant';

// Register them via the existing PluginManager
const PluginManager = window.PluginManager;

// Register them via the existing PluginManager
PluginManager.register('ConfiguratorIntegration', ConfiguratorIntegration, '[data-tb-configurator-integration]');
PluginManager.register('ProductDetailConfigurator', ProductDetailConfigurator, '[data-tb-product-detail-configurator]');

// Necessary for the webpack hot module reloading server
if (module.hot) {
    module.hot.accept();
}
