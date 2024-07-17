import Plugin from 'src/plugin-system/plugin.class';

export default class ConfiguratorIntegration extends Plugin {
    init() {
        this._divaScript();
	}

    _divaScript() {

        const diva = document.createElement('diva-framework');
        const parent = document.getElementById('framework');

        const organizationId = parent.getAttribute('data-organization-id');
        let shopLanguage = parent.getAttribute('data-language');
        const identifier = parent.getAttribute('data-identifier');
        const divaProductId = parent.getAttribute('data-diva-product-id');

        if (shopLanguage === 'de' || shopLanguage === 'it' || shopLanguage === 'en' || shopLanguage === 'fr') {
            //use the configurator with the shop language
        } else {
            //use 'de' as default language
            shopLanguage = 'de';
        }

        //Base configuration parameters
        diva.organizationId = organizationId;
        diva.identifier = identifier;

        //Set to current language of shop
        diva.language = shopLanguage;

        //diva is initialized as a content box, which displays the product information of the given productId
        diva.currentComponent = { type: 'CONTENTBOX', parameters: { productId: divaProductId} };

        parent.appendChild(diva);

        //A configuration is saved and should be added to the basket
        diva.addEventListener('onAddToBasket', (data) => {
            console.log('Added with Diva Nr ' + data.detail.DivaNr);
            console.log(data.detail);
        });

        //A configuration is saved and should be added to a whishlist (optional)
        diva.addEventListener('onWebPlanerSave', (data) => {
            console.log('Added with Diva Nr to Wishlist ' + data.detail.DivaNr);
            console.log(data.detail);
        });

        //A product variant is selected, the PDP should be updated
        diva.addEventListener('onVariantSelected', (data) => {
            window.location.href = '/detail/' + data.detail.customData.shopwareId.value;
        });

        //Show an error page to the user
        diva.addEventListener('onError', (data) => {
            console.log('An error occurred');
            console.log(data.detail);
        });

        //externally tell diva to open the configurator
        document.getElementById('openConfig').addEventListener('click', event => {
            diva.invokeEvent('openConfiguratorOverlay');
        });

        //A configuration is saved and should be added to the basket
        diva.addEventListener('onAddToBasket', (data) => {
            console.log('Added with Diva Nr ' + data.detail.DivaNr);
            console.log(data.detail);

            let form = document.createElement("form");
            form.setAttribute("method", "post");
            form.setAttribute("action", "/diva/line-item/add");
            form.setAttribute("id", "divaForm");
            form.setAttribute("data-add-to-cart", "true");

            let divaNr = document.createElement("input");
            divaNr.setAttribute("type", "hidden");
            divaNr.setAttribute("name", "divaNr");
            divaNr.setAttribute("value", data.detail.DivaNr);
            form.appendChild(divaNr);

            let documentVersion = document.createElement("input");
            documentVersion.setAttribute("type", "hidden");
            documentVersion.setAttribute("name", "documentVersion");
            documentVersion.setAttribute("value", data.detail.DocumentVersion);
            form.appendChild(documentVersion);

            let redirectTo = document.createElement("input");
            redirectTo.setAttribute("type", "hidden");
            redirectTo.setAttribute("name", "redirectTo");
            redirectTo.setAttribute("value", "frontend.cart.offcanvas");
            form.appendChild(redirectTo);

            let quantityInput = document.createElement("input");
            quantityInput.setAttribute("type", "hidden");
            quantityInput.setAttribute("name", "quantity");
            quantityInput.setAttribute("value", 1);
            form.appendChild(quantityInput);

            let divaBuyBtn = document.createElement("button");
            divaBuyBtn.setAttribute("id", "divaBuyBtn");
            divaBuyBtn.setAttribute("type", "submit");
            divaBuyBtn.setAttribute("class", "d-none");
            form.appendChild(divaBuyBtn);
            diva.appendChild(form);

            window.PluginManager.initializePlugins();
            document.getElementById("divaBuyBtn").click();

            // close configurator after adding product to cart
            diva.invokeEvent('onFullscreenClose');
        });
    }
}