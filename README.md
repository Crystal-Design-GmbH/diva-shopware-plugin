# TeamblauCrystalDesignConfiguratorIntegration

This plugin integrates the Diva Configurator, the Product Detail Configurator for variant changes, and a custom "Crystal Design CMS Widget".

### Installing the Plugin
To add the plugin (Erweiterung) to your Shop please follow the instructions provided by Shopware [here](https://docs.shopware.com/de/shopware-6-de/Erweiterungen/MeineErweiterungen).

### Plugin Configurations
You can access the **plugin configurations** settings by going to Extensions/My extensions, locating the plugin named 'Teamblau Crystal Design Configurator Integration', and clicking on the three dots icon for Configure.

It is necessary to set the `Diva Version` in the plugin configurations. Additionally, to connect to api.diva-portal.com/basket, you must add the `API key` in the plugin configurations.

### Sales Channel Custom Fields
Sales Channel Custom Fields (Zusatzfelder) can be set at the bottom of each Sales Channel under the "Diva" tab.

For each Sales Channel, the following parameters can be configured:
 - `Organization Id`
 - `Idenitifier`
 - `Default Api Config`

### Product Custom Fields
Product Custom Fields (Zusatzfelder) can be set for every product at the bottom of the "Specifications" tab under Diva Custom Fields.

To display the product detail widget and open the configurator on the product detail page, set the product custom field `Diva Product` to true and include the `Diva Product Id`.

### Crystal Design CMS Widget
A custom 'Crystal Design CMS Widget' block is available to integrate in shopping expierences.

In shopping experiences, navigate to the different page layouts to add the CMS Widget under "Text & Images" > "Crystal Design CMS Widget".

In the block settings, specify the widget `type` and optionally include the `Identifier` and `Parameters (Format: json)`.

### ProductDiva LineItem
Products added to the cart through the Crystal Design configurator will be added as `productDiva` line item.
