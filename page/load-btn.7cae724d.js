!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},a=t.parcelRequired7c6;null==a&&((a=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var a={id:e,exports:{}};return r[e]=a,t.call(a.exports,a,a.exports),a.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){n[e]=t},t.parcelRequired7c6=a);var l=a("5IjG7"),o=a("9GCeT"),i=a("9cwlI"),c=a("j1Fxp"),d=a("hYpAF"),s=a("cE2Y3"),u={userForm:document.getElementById("search-form"),gallery:document.getElementById("gallery"),loadMoreBtn:document.querySelector(".js-load-more"),upBtn:document.getElementById("button-up"),fixedWrapper:document.querySelector(".form-wrapper")},f=1,p=new(e(l))(".gallery a",{captionsData:"alt",captionDelay:250,captionClass:"gallery__caption",overlayOpacity:.9,fadeSpeed:350});u.userForm.addEventListener("submit",(function(e){e.preventDefault();var t=e.currentTarget.elements.searchQuery.value;if((0,i.clearMarkup)(u.gallery,u.loadMoreBtn),!t||" "===t)return void(0,d.createNotify)("info");f=1,(0,o.fetchImages)(t,f,40).then((function(e){u.gallery.insertAdjacentHTML("beforeend",(0,i.createCardMarkup)(e.hits)),e.totalHits>0&&e.hits.length>0?(0,d.createNotify)("success",e.totalHits):(0,d.createNotify)("failure-no-matching"),e.totalHits>40&&e.hits.length>0&&u.loadMoreBtn.classList.replace("is-hidden","load-more"),p.refresh()})).catch((function(e){console.error("Помилка під час запиту:",e),(0,d.createNotify)("failure-general")}))})),u.loadMoreBtn.addEventListener("click",(function(e){var t=e.target;f+=1,t.disabled=!0;var r=u.userForm.elements.searchQuery.value,n=u.gallery.firstElementChild;if(!n)return;(0,o.fetchImages)(r,f,40).then((function(e){u.gallery.insertAdjacentHTML("beforeend",(0,i.createCardMarkup)(e.hits));var t=n.getBoundingClientRect().height;p.refresh(),(0,c.scrollBy)(t),e.totalHits-40*f<=0&&(u.loadMoreBtn.classList.replace("load-more","is-hidden"),(0,s.createLoadMoreObserver)((function(){(0,d.createNotify)("info-end-results")}),u.gallery.lastElementChild))})).catch((function(e){console.error("Помилка під час запиту:",e),(0,d.createNotify)("failure-general")})).finally((function(){t.disabled=!1}))})),u.upBtn.addEventListener("click",c.scrollUp),window.addEventListener("scroll",(function(){return(0,c.handleScrollEffects)(u.fixedWrapper,u.upBtn)})),(0,i.clearMarkup)(u.gallery,u.loadMoreBtn)}();
//# sourceMappingURL=load-btn.7cae724d.js.map