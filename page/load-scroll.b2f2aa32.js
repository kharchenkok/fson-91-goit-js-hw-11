!function(){function e(e){return e&&e.__esModule?e.default:e}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},a=r.parcelRequired7c6;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var a={id:e,exports:{}};return t[e]=a,r.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,r){n[e]=r},r.parcelRequired7c6=a);var o=a("5IjG7"),l=a("9GCeT"),i=a("9cwlI"),d=a("hYpAF"),c=a("j1Fxp");function s(e){e.classList.remove("is-hidden")}function u(e){e.classList.add("is-hidden")}var f=a("cE2Y3"),p={userForm:document.getElementById("search-form"),gallery:document.getElementById("gallery"),upBtn:document.getElementById("button-up"),fixedWrapper:document.querySelector(".form-wrapper"),loadingIndicator:document.getElementById("loading-indicator"),loader:document.getElementById("loader")},y=1,g=!1,h=new(e(o))(".gallery a",{captionsData:"alt",captionDelay:250,captionClass:"gallery__caption",overlayOpacity:.9,fadeSpeed:350});p.userForm.addEventListener("submit",(function(e){e.preventDefault();var r=e.currentTarget.elements.searchQuery.value;if((0,i.clearMarkup)(p.gallery),!r||" "===r)return void(0,d.createNotify)("info");y=1,g=!1,p.loadingIndicator.classList.remove("is-hidden"),s(p.loader),(0,l.fetchImages)(r,y,40).then((function(e){p.gallery.insertAdjacentHTML("beforeend",(0,i.createCardMarkup)(e.hits)),e.totalHits>0&&e.hits.length>0?(0,d.createNotify)("success",e.totalHits):(0,d.createNotify)("failure-no-matching"),h.refresh()})).catch((function(e){console.error("Помилка під час запиту:",e),(0,d.createNotify)("failure-general")})).finally((function(){u(p.loader),g=!0}))})),p.upBtn.addEventListener("click",c.scrollUp),window.addEventListener("scroll",(function(){return(0,c.handleScrollEffects)(p.fixedWrapper,p.upBtn)})),(0,i.clearMarkup)(p.gallery),(0,f.createLoadMoreObserver)((function(){if(g){s(p.loader),y+=1;var e=p.userForm.elements.searchQuery.value;(0,l.fetchImages)(e,y,40).then((function(e){p.gallery.insertAdjacentHTML("beforeend",(0,i.createCardMarkup)(e.hits)),h.refresh(),e.totalHits-40*y<=0&&(p.loadingIndicator.classList.add("is-hidden"),(0,f.createLoadMoreObserver)((function(){(0,d.createNotify)("info-end-results")}),p.gallery.lastElementChild))})).catch((function(e){console.error("Помилка під час запиту:",e),(0,d.createNotify)("failure-general")})).finally((function(){u(p.loader)}))}}),p.loadingIndicator)}();
//# sourceMappingURL=load-scroll.b2f2aa32.js.map