!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),r=document.body,d=null;e.setAttribute("disabled",!0),t.addEventListener("click",(function(){t.setAttribute("disabled",!0),e.removeAttribute("disabled",!1),d=setInterval((function(){r.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),e.addEventListener("click",(function(){clearInterval(d),t.removeAttribute("disabled",!1),e.setAttribute("disabled",!0)}))}();
//# sourceMappingURL=01-color-switcher.d57f50ba.js.map
