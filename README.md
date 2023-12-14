# TeamblauCrystalDesignConfiguratorIntegration

This plugin integrates the Diva Configurator, the Product Detail Configurator for variant changes, and a custom "Crystal Design CMS Widget".

### Set Diva Version
It is **required** to set the Diva Version in the plugin configurations.

### Set Api Key
To be able to connect to api.diva-portal.com/basket it is **required** to add the api key in the plugin configurations.

### Sales Channel Custom Fields
The following parameters can be set for each Sales Channel:
 - `diva_organization_id`
 - `diva_idenitifier`
 - `diva_default_api_config`

### Product Custom Fields
To show the product detail widget and to open the configurator on the product detail page, set the product custom field `diva_product` to true and add the `diva_product_id`.

### Crystal Design CMS Widget
A new custom 'Crystal Design CMS Widget' block is available to integrate in shopping expierences.

### ProductDiva LineItem
Products added to the cart through the Crystal Design configurator will be added as `productDiva` line item.
