(()=>{"use strict";var t={857:t=>{var e=function(t){var e;return!!t&&"object"==typeof t&&"[object RegExp]"!==(e=Object.prototype.toString.call(t))&&"[object Date]"!==e&&t.$$typeof!==r},r="function"==typeof Symbol&&Symbol.for?Symbol.for("react.element"):60103;function i(t,e){return!1!==e.clone&&e.isMergeableObject(t)?s(Array.isArray(t)?[]:{},t,e):t}function n(t,e,r){return t.concat(e).map(function(t){return i(t,r)})}function a(t){return Object.keys(t).concat(Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t).filter(function(e){return Object.propertyIsEnumerable.call(t,e)}):[])}function o(t,e){try{return e in t}catch(t){return!1}}function s(t,r,d){(d=d||{}).arrayMerge=d.arrayMerge||n,d.isMergeableObject=d.isMergeableObject||e,d.cloneUnlessOtherwiseSpecified=i;var l,u,c=Array.isArray(r);return c!==Array.isArray(t)?i(r,d):c?d.arrayMerge(t,r,d):(u={},(l=d).isMergeableObject(t)&&a(t).forEach(function(e){u[e]=i(t[e],l)}),a(r).forEach(function(e){(!o(t,e)||Object.hasOwnProperty.call(t,e)&&Object.propertyIsEnumerable.call(t,e))&&(o(t,e)&&l.isMergeableObject(r[e])?u[e]=(function(t,e){if(!e.customMerge)return s;var r=e.customMerge(t);return"function"==typeof r?r:s})(e,l)(t[e],r[e],l):u[e]=i(r[e],l))}),u)}s.all=function(t,e){if(!Array.isArray(t))throw Error("first argument should be an array");return t.reduce(function(t,r){return s(t,r,e)},{})},t.exports=s}},e={};function r(i){var n=e[i];if(void 0!==n)return n.exports;var a=e[i]={exports:{}};return t[i](a,a.exports,r),a.exports}(()=>{r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e}})(),(()=>{r.d=(t,e)=>{for(var i in e)r.o(e,i)&&!r.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}})(),(()=>{r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e)})(),(()=>{var t=r(857),e=r.n(t);class i{static ucFirst(t){return t.charAt(0).toUpperCase()+t.slice(1)}static lcFirst(t){return t.charAt(0).toLowerCase()+t.slice(1)}static toDashCase(t){return t.replace(/([A-Z])/g,"-$1").replace(/^-/,"").toLowerCase()}static toLowerCamelCase(t,e){let r=i.toUpperCamelCase(t,e);return i.lcFirst(r)}static toUpperCamelCase(t,e){return e?t.split(e).map(t=>i.ucFirst(t.toLowerCase())).join(""):i.ucFirst(t.toLowerCase())}static parsePrimitive(t){try{return/^\d+(.|,)\d+$/.test(t)&&(t=t.replace(",",".")),JSON.parse(t)}catch(e){return t.toString()}}}class n{static isNode(t){return"object"==typeof t&&null!==t&&(t===document||t===window||t instanceof Node)}static hasAttribute(t,e){if(!n.isNode(t))throw Error("The element must be a valid HTML Node!");return"function"==typeof t.hasAttribute&&t.hasAttribute(e)}static getAttribute(t,e){let r=!(arguments.length>2)||void 0===arguments[2]||arguments[2];if(r&&!1===n.hasAttribute(t,e))throw Error('The required property "'.concat(e,'" does not exist!'));if("function"!=typeof t.getAttribute){if(r)throw Error("This node doesn't support the getAttribute function!");return}return t.getAttribute(e)}static getDataAttribute(t,e){let r=!(arguments.length>2)||void 0===arguments[2]||arguments[2],a=e.replace(/^data(|-)/,""),o=i.toLowerCamelCase(a,"-");if(!n.isNode(t)){if(r)throw Error("The passed node is not a valid HTML Node!");return}if(void 0===t.dataset){if(r)throw Error("This node doesn't support the dataset attribute!");return}let s=t.dataset[o];if(void 0===s){if(r)throw Error('The required data attribute "'.concat(e,'" does not exist on ').concat(t,"!"));return s}return i.parsePrimitive(s)}static querySelector(t,e){let r=!(arguments.length>2)||void 0===arguments[2]||arguments[2];if(r&&!n.isNode(t))throw Error("The parent node is not a valid HTML Node!");let i=t.querySelector(e)||!1;if(r&&!1===i)throw Error('The required element "'.concat(e,'" does not exist in parent node!'));return i}static querySelectorAll(t,e){let r=!(arguments.length>2)||void 0===arguments[2]||arguments[2];if(r&&!n.isNode(t))throw Error("The parent node is not a valid HTML Node!");let i=t.querySelectorAll(e);if(0===i.length&&(i=!1),r&&!1===i)throw Error('At least one item of "'.concat(e,'" must exist in parent node!'));return i}}class a{publish(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=new CustomEvent(t,{detail:e,cancelable:r});return this.el.dispatchEvent(i),i}subscribe(t,e){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=this,n=t.split("."),a=r.scope?e.bind(r.scope):e;if(r.once&&!0===r.once){let e=a;a=function(r){i.unsubscribe(t),e(r)}}return this.el.addEventListener(n[0],a),this.listeners.push({splitEventName:n,opts:r,cb:a}),!0}unsubscribe(t){let e=t.split(".");return this.listeners=this.listeners.reduce((t,r)=>([...r.splitEventName].sort().toString()===e.sort().toString()?this.el.removeEventListener(r.splitEventName[0],r.cb):t.push(r),t),[]),!0}reset(){return this.listeners.forEach(t=>{this.el.removeEventListener(t.splitEventName[0],t.cb)}),this.listeners=[],!0}get el(){return this._el}set el(t){this._el=t}get listeners(){return this._listeners}set listeners(t){this._listeners=t}constructor(t=document){this._el=t,t.$emitter=this,this._listeners=[]}}class o{init(){throw Error('The "init" method for the plugin "'.concat(this._pluginName,'" is not defined.'))}update(){}_init(){this._initialized||(this.init(),this._initialized=!0)}_update(){this._initialized&&this.update()}_mergeOptions(t){let r=i.toDashCase(this._pluginName),a=n.getDataAttribute(this.el,"data-".concat(r,"-config"),!1),o=n.getAttribute(this.el,"data-".concat(r,"-options"),!1),s=[this.constructor.options,this.options,t];a&&s.push(window.PluginConfigManager.get(this._pluginName,a));try{o&&s.push(JSON.parse(o))}catch(t){throw console.error(this.el),Error('The data attribute "data-'.concat(r,'-options" could not be parsed to json: ').concat(t.message))}return e().all(s.filter(t=>t instanceof Object&&!(t instanceof Array)).map(t=>t||{}))}_registerInstance(){window.PluginManager.getPluginInstancesFromElement(this.el).set(this._pluginName,this),window.PluginManager.getPlugin(this._pluginName,!1).get("instances").push(this)}_getPluginName(t){return t||(t=this.constructor.name),t}constructor(t,e={},r=!1){if(!n.isNode(t))throw Error("There is no valid element given.");this.el=t,this.$emitter=new a(this.el),this._pluginName=this._getPluginName(r),this.options=this._mergeOptions(e),this._initialized=!1,this._registerInstance(),this._init()}}let s=window.PluginManager;s.register("ConfiguratorIntegration",class extends o{init(){this._newElements()}_newElements(){if(this._buttons=document.getElementsByClassName("openConfiguratorBtn"),this._buttons.length>0)this._divaScript();else throw Error("No button found for the plugin: ".concat(this.constructor.name))}_divaScript(){document.querySelectorAll(".openConfiguratorBtn").forEach(t=>t.addEventListener("click",t=>{if("BUTTON"==t.target.nodeName)var e=t.target;else if("BUTTON"==t.target.parentNode.nodeName)var e=t.target.parentNode;else if("BUTTON"==t.target.parentNode.parentNode.nodeName)var e=t.target.parentNode.parentNode;else console.log("Error finding button."),console.log(t.target);DIVA_LOGGER=3;let r=e.getAttribute("data-organization-id"),i=e.getAttribute("data-identifier"),n=e.getAttribute("data-shop-language"),a=e.getAttribute("data-diva-nr"),o=e.getAttribute("data-update-line-item"),s=e.getAttribute("data-quantity");a||(a=e.getAttribute("data-product-number")),"de"===n||"it"===n||"en"===n||"fr"===n||(n="de");let d=document.createElement("diva-framework");d.organizationId=r,d.identifier=i,d.language=n,d.currentComponent={type:"DIVA_WEBPLANNER",parameters:{divaNr:a},openInFullscreen:!0,absoluteFullscreen:!0};let l=document.getElementById("framework");l.appendChild(d),d.addEventListener("onAddToBasket",t=>{console.log("Added with Diva Nr "+t.detail.DivaNr),console.log(t.detail);let e="",r=0,i="";null!=o?(e="/diva/line-item/update",r=s,i="frontend.checkout.cart.page"):(e="/diva/line-item/add",r=1,i="frontend.cart.offcanvas");let n=document.createElement("form");n.setAttribute("method","post"),n.setAttribute("action",e),n.setAttribute("id","divaForm"),n.setAttribute("data-add-to-cart","true");let a=document.createElement("input");a.setAttribute("type","hidden"),a.setAttribute("name","divaNr"),a.setAttribute("value",t.detail.DivaNr),n.appendChild(a);let u=document.createElement("input");u.setAttribute("type","hidden"),u.setAttribute("name","documentVersion"),u.setAttribute("value",t.detail.DocumentVersion),n.appendChild(u);let c=document.createElement("input");c.setAttribute("type","hidden"),c.setAttribute("name","redirectTo"),c.setAttribute("value",i),n.appendChild(c);let p=document.createElement("input");p.setAttribute("type","hidden"),p.setAttribute("name","quantity"),p.setAttribute("value",r),n.appendChild(p);let h=document.createElement("button");h.setAttribute("id","divaBuyBtn"),h.setAttribute("type","submit"),h.setAttribute("class","d-none"),n.appendChild(h),d.appendChild(n),null!=o?document.getElementById("divaForm").submit():window.PluginManager.initializePlugin("AddToCart","[data-add-to-cart]").then(()=>{document.getElementById("divaBuyBtn").click()}),l.removeChild(d),Array.from(document.getElementsByClassName("diva-pseudo-fullscreen")).forEach(t=>t.classList.remove("diva-pseudo-fullscreen"))}),d.addEventListener("onWebPlanerSave",t=>{console.log("Added with Diva Nr to Wishlist "+t.detail.DivaNr),console.log(t.detail)}),d.addEventListener("closeComponentInFullscreen",t=>{l.removeChild(d)}),d.addEventListener("onError",t=>{console.log("An error occurred"),console.log(t.detail)})}))}},"[data-tb-configurator-integration]"),s.register("ProductDetailConfigurator",class extends o{init(){this._divaScript()}_divaScript(){let t=document.createElement("diva-framework"),e=document.getElementById("framework"),r=e.getAttribute("data-organization-id"),i=e.getAttribute("data-language"),n=e.getAttribute("data-identifier"),a=e.getAttribute("data-diva-product-id");e.getAttribute("data-defaultapiconfig");let o=e.getAttribute("data-base-url");"de"===i||"it"===i||"en"===i||"fr"===i||(i="de"),t.organizationId=r,t.identifier=n,null!=o?t.defaultApiConfig={baseUrl:o}:t.defaultApiConfig={baseUrl:"https://api-dev.diva-portal.com"},t.language=i,t.currentComponent={type:"PRODUCTDETAILPAGE",parameters:{id:a}},e.appendChild(t),t.addEventListener("onAddToBasket",e=>{console.log("Added with Diva Nr "+e.detail.DivaNr),console.log(e.detail),t.invokeEvent("onFullscreenClose")}),t.addEventListener("onWebPlanerSave",t=>{console.log("Added with Diva Nr to Wishlist "+t.detail.DivaNr),console.log(t.detail)}),t.addEventListener("onVariantSelected",t=>{window.location.href="/detail/"+t.detail.customData.shopwareId.value}),t.addEventListener("onError",t=>{console.log("An error occurred"),console.log(t.detail)});let s=document.getElementById("openConfig");s&&s.addEventListener("click",e=>{t.invokeEvent("openConfiguratorOverlay")}),t.addEventListener("onAddToBasket",e=>{console.log("Added with Diva Nr "+e.detail.DivaNr),console.log(e.detail);let r=document.createElement("form");r.setAttribute("method","post"),r.setAttribute("action","/diva/line-item/add"),r.setAttribute("id","divaForm"),r.setAttribute("data-add-to-cart","true");let i=document.createElement("input");i.setAttribute("type","hidden"),i.setAttribute("name","divaNr"),i.setAttribute("value",e.detail.DivaNr),r.appendChild(i);let n=document.createElement("input");n.setAttribute("type","hidden"),n.setAttribute("name","documentVersion"),n.setAttribute("value",e.detail.DocumentVersion),r.appendChild(n);let a=document.createElement("input");a.setAttribute("type","hidden"),a.setAttribute("name","redirectTo"),a.setAttribute("value","frontend.cart.offcanvas"),r.appendChild(a);let o=document.createElement("input");o.setAttribute("type","hidden"),o.setAttribute("name","quantity"),o.setAttribute("value",1),r.appendChild(o);let s=document.createElement("button");s.setAttribute("id","divaBuyBtn"),s.setAttribute("type","submit"),s.setAttribute("class","d-none"),r.appendChild(s),t.appendChild(r),window.PluginManager.initializePlugin("AddToCart","[data-add-to-cart]").then(()=>{document.getElementById("divaBuyBtn").click(),t.invokeEvent("onFullscreenClose")})})}},"[data-tb-product-detail-configurator]")})()})();