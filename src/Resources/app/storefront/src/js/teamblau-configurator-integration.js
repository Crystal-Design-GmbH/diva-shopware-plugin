import Plugin from 'src/plugin-system/plugin.class';

export default class ConfiguratorIntegration extends Plugin {
    init() {
        this._newElements();
	}

	_newElements() {
        this._buttons = document.getElementsByClassName('openConfiguratorBtn');

		if (this._buttons.length > 0) {
            this._divaScript();
        } else {
            throw new Error(`No button found for the plugin: ${this.constructor.name}`);
        }
	}

	_divaScript() {
        const buttons = document.querySelectorAll('.openConfiguratorBtn');
        buttons.forEach(el => el.addEventListener('click', event => {

            if (event.target.nodeName == 'BUTTON') {
                var elementTarget = event.target;
            } else if (event.target.parentNode.nodeName == 'BUTTON') {
                var elementTarget = event.target.parentNode;
            } else if (event.target.parentNode.parentNode.nodeName == 'BUTTON') {
                var elementTarget = event.target.parentNode.parentNode;
            } else {
                console.log('Error finding button.');
                console.log(event.target);
            }

            DIVA_LOGGER = 3;
            let organizationId = elementTarget.getAttribute('data-organization-id');
            let identifier = elementTarget.getAttribute('data-identifier');
            let shopLanguage = elementTarget.getAttribute('data-shop-language');
            let divanr = elementTarget.getAttribute('data-diva-nr');
            let updateLineItem = elementTarget.getAttribute('data-update-line-item');
            let lineItemQuantity = elementTarget.getAttribute('data-quantity');

            if(!divanr) {
                divanr = elementTarget.getAttribute('data-product-number');
            }

            if (shopLanguage === 'de' || shopLanguage === 'it' || shopLanguage === 'en' || shopLanguage === 'fr') {
                //use the configurator with the shop language
            } else {
                //use 'de' as default language
                shopLanguage = 'de';
            }

            //Create the diva custom element
            const diva = document.createElement('diva-framework');

            //Base configuration parameters
            diva.organizationId = organizationId;
            diva.identifier = identifier;

            //Set to current language of shop
            diva.language = shopLanguage;

            //As soon as the element is mounted the configurator is opended with the provided divaNr in a Fullscreen Overlay
            diva.currentComponent = { type: 'DIVA_WEBPLANNER', parameters: { divaNr: divanr }, openInFullscreen: true, absoluteFullscreen: true };

            const parent = document.getElementById('framework');
            parent.appendChild(diva);

            //A configuration is saved and should be added to the basket
            diva.addEventListener('onAddToBasket', (data) => {
                console.log('Added with Diva Nr ' + data.detail.DivaNr);
                console.log(data.detail);
                let action = "";
                let quantity = 0;
                let redirectToLink = "";

                if (updateLineItem != null) {
                    action = "/diva/line-item/update";
                    quantity = lineItemQuantity;
                    redirectToLink = "frontend.checkout.cart.page";
                } else {
                    action = "/diva/line-item/add";
                    quantity = 1;
                    redirectToLink = "frontend.cart.offcanvas";
                }

                let form = document.createElement("form");
                form.setAttribute("method", "post");
                form.setAttribute("action", action);
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
                redirectTo.setAttribute("value", redirectToLink);
                form.appendChild(redirectTo);

                let quantityInput = document.createElement("input");
                quantityInput.setAttribute("type", "hidden");
                quantityInput.setAttribute("name", "quantity");
                quantityInput.setAttribute("value", quantity);
                form.appendChild(quantityInput);

                let divaBuyBtn = document.createElement("button");
                divaBuyBtn.setAttribute("id", "divaBuyBtn");
                divaBuyBtn.setAttribute("type", "submit");
                divaBuyBtn.setAttribute("class", "d-none");
                form.appendChild(divaBuyBtn);
                diva.appendChild(form);

                if (updateLineItem != null) {
                    document.getElementById("divaForm").submit();
                } else {
                    window.PluginManager.initializePlugin('AddToCart', '[data-add-to-cart]').then(() => {
                        document.getElementById("divaBuyBtn").click();
                    });
                }

                // close configurator after adding product to cart
                parent.removeChild(diva);

                // remove overflow hidden class on body
                const divaPseudoFullscreens = document.getElementsByClassName('diva-pseudo-fullscreen');
                Array.from(divaPseudoFullscreens).forEach(element => element.classList.remove('diva-pseudo-fullscreen'));

            });

            //A configuration is saved and should be added to a whishlist (optional)
            diva.addEventListener('onWebPlanerSave', (data) => {
                console.log('Added with Diva Nr to Wishlist ' + data.detail.DivaNr);
                console.log(data.detail);
            });

            //The configurator is closed, remove DIVA from DOM
            diva.addEventListener('closeComponentInFullscreen', (data) => {
                parent.removeChild(diva);
            });

            //Show an error page to the user
            diva.addEventListener('onError', (data) => {
                console.log('An error occurred');
                console.log(data.detail);
            });

        }));
	}
}
