!function(){"use strict";var e="undefined"==typeof window?global:window;if("function"!=typeof e.require){var t={},r={},n={},a={}.hasOwnProperty,i=/^\.\.?(\/|$)/,o=function(e,t){for(var r,n=[],a=(i.test(t)?e+"/"+t:t).split("/"),o=0,u=a.length;o<u;o++)r=a[o],".."===r?n.pop():"."!==r&&""!==r&&n.push(r);return n.join("/")},u=function(e){return e.split("/").slice(0,-1).join("/")},l=function(t){return function(r){var n=o(u(t),r);return e.require(n,t)}},s=function(e,t){var n=null;n=h&&h.createHot(e);var a={id:e,exports:{},hot:n};return r[e]=a,t(a.exports,l(e),a),a.exports},c=function(e){return n[e]?c(n[e]):e},f=function(e,t){return c(o(u(e),t))},d=function(e,n){null==n&&(n="/");var i=c(e);if(a.call(r,i))return r[i].exports;if(a.call(t,i))return s(i,t[i]);throw new Error("Cannot find module '"+e+"' from '"+n+"'")};d.alias=function(e,t){n[t]=e};var p=/\.[^.\/]+$/,g=/\/index(\.[^\/]+)?$/,_=function(e){if(p.test(e)){var t=e.replace(p,"");a.call(n,t)&&n[t].replace(p,"")!==t+"/index"||(n[t]=e)}if(g.test(e)){var r=e.replace(g,"");a.call(n,r)||(n[r]=e)}};d.register=d.define=function(e,n){if("object"==typeof e)for(var i in e)a.call(e,i)&&d.register(i,e[i]);else t[e]=n,delete r[e],_(e)},d.list=function(){var e=[];for(var r in t)a.call(t,r)&&e.push(r);return e};var h=e._hmr&&new e._hmr(f,d,t,r);d._cache=r,d.hmr=h&&h.wrap,d.brunch=!0,e.require=d}}(),function(){"undefined"==typeof window?this:window;require.register("App.js",function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),o=t("hud"),u=n(o),l=t("utils"),s=t("./scenes/scene_manager"),c=n(s),f=t("./scenes/EggGameScene"),d=n(f),p=t("./scenes/MainMenuScene"),g=n(p),_=t("./scenes/OfficeGameScene"),h=n(_);r.exports=function(){function e(){a(this,e);var t=this.create_app_element();this.app_element=t,this.initialize_resize_listener(),t.appendChild(c["default"].get_scene_element()),t.appendChild(u["default"].init()),c["default"].register("main_menu",new g["default"]),c["default"].register("office_game",new h["default"]),c["default"].register("egg_game",new d["default"]),c["default"].navigate("main_menu"),console.log("initialized")}return i(e,[{key:"create_app_element",value:function(){var e=(0,l.create_element)("div")["class"]("app").render();return document.body.appendChild(e),e}},{key:"initialize_resize_listener",value:function(){this.resize_timeout_throttle=!1,this.resize_timeout_id=null,window.addEventListener("resize",this.resize_listener.bind(this)),this.resize_listener()}},{key:"resize_listener",value:function(e){var t=this;this.resize_timeout_throttle||(this.resize_timeout_throttle=!0,setTimeout(function(e){return t.resize_timeout_throttle=!1},500),clearTimeout(this.resize_timeout_id),this.resize_timeout_id=setTimeout(this.resize_app.bind(this),750))}},{key:"resize_app",value:function(){this.resize_timeout_id=null;var e=this.app_element,t=window.innerWidth,r=window.innerHeight,n=t/16*9;if(n<r)e.style.height=n+"px",e.style.width="100%",e.style.top=(r-n)/2+"px",e.style.left="";else{var a=r/9*16;e.style.height="100%",e.style.width=a+"px",e.style.top="",e.style.left=(t-a)/2+"px"}e.style.fontSize=e.getBoundingClientRect().height/100+"px"}}]),e}()}),require.register("hud.js",function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(){return(0,s.create_element)("img").attr("src","img/home_button.png")["class"]("hud_mainmenu").click(function(e){f["default"].navigate("main_menu")}).render()}function i(){return(0,s.create_element)("div")["class"]("hud_bag_box").adopt(o()).adopt(u()).render()}function o(){var e=(0,s.create_element)("img").attr("src","img/flashlight.png")["class"]("bag_item").render(),t=(0,s.create_element)("img").attr("src","img/catfood.png")["class"]("bag_item").render();return(0,s.create_element)("div")["class"]("hud_bag").adopt(e).adopt(t).render()}function u(){return(0,s.create_element)("img").attr("src","img/bag_button.png")["class"]("hud_bag_button").render()}function l(){return(0,s.create_element)("div")["class"]("hud").adopt(a()).adopt(i()).render()}var s=t("utils"),c=t("./scenes/scene_manager"),f=n(c);r.exports={init:l}}),require.register("initialize.js",function(e,t,r){"use strict";document.addEventListener("DOMContentLoaded",function(){var e=t("App");new e})}),require.register("scenes/EggGameScene.js",function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),l=t("interactjs"),s=n(l),c=t("../utils"),f=t("./Scene"),d=n(f),p=function(e){function t(){return a(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),u(t,[{key:"render",value:function(e){e.appendChild(this.create_egg_box());var t=this.create_egg_source("brown");this.create_egg(t),e.appendChild(t);var r=this.create_egg_source("white");this.create_egg(r),e.appendChild(r),this.set_problem("2 + ? = 6")}},{key:"set_problem",value:function(e){this.problem_field.textContent=e}},{key:"check_finish",value:function(){var e=this.dimples.reduce(function(e,t){return t.childElementCount>0&&(e[t.firstChild.getAttribute("data-color")]+=1),e},{white:0,brown:0}),t=e.brown,r=e.white;t+r>=6&&setTimeout(function(e){return alert("Voll! "+t+" braune und "+r+" weiße!")},0)}},{key:"create_egg_box",value:function(){var e=this,t=(0,c.create_element)("div")["class"]("egg_box").adopt(this.create_problem_field());return this.dimples=[],(0,c.range)(6).forEach(function(r){var n=e.create_dimple(r);t.adopt(n),e.dimples.push(n)}),t.render()}},{key:"create_problem_field",value:function(){return this.problem_field=(0,c.create_element)("div")["class"]("problem_field").render(),this.problem_field}},{key:"create_dimple",value:function(e){var t=(0,c.create_element)("div")["class"]("egg_dimple")["class"]("egg_dimple_"+e).render();return(0,s["default"])(t).dropzone({overlap:.25,ondragenter:function(e){e.target.classList.add("drop-target")},ondragleave:function(e){e.target.classList.remove("drop-target")},ondropdeactivate:function(e){e.target.classList.remove("drop-target")}}),t}},{key:"create_egg_source",value:function(e){return(0,c.create_element)("div")["class"]("egg_source")["class"]("egg_source_"+e)["class"]("egg")["class"](e+"_egg").attr("data-color",e).render()}},{key:"create_egg",value:function(e){var t=this,r=e.getAttribute("data-color"),n=(0,c.create_element)("div")["class"]("egg")["class"]("egg_draggable")["class"](r+"_egg").attr("data-color",r).render();(0,s["default"])(n).draggable({inertia:!0,onstart:function(e){e.target.classList.remove("egg_in_box")},onmove:function(e){var t=e.target,r=(parseFloat(t.getAttribute("data-x"))||0)+e.dx,n=(parseFloat(t.getAttribute("data-y"))||0)+e.dy;t.style.transform="translate("+r+"px, "+n+"px)",t.setAttribute("data-x",r),t.setAttribute("data-y",n)},onend:function(r){var n=r.target,a=r.interaction.dropElement;null==a?n.parentNode.removeChild(n):(n.removeAttribute("data-x"),n.removeAttribute("data-y"),n.style.removeProperty("transform"),n.classList.add("egg_in_box"),(0,c.to_array)(a.childNodes).forEach(function(e){a.removeChild(e)}),a.appendChild(n)),t.create_egg(e),t.check_finish()}}).styleCursor(!1),e.appendChild(n)}},{key:"cleanup",value:function(e){}}]),t}(d["default"]);e["default"]=p}),require.register("scenes/MainMenuScene.js",function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),l=t("../utils"),s=t("./scene_manager"),c=n(s),f=t("./Scene"),d=n(f),p=function(e){function t(){return a(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),u(t,[{key:"render",value:function(e){e.appendChild(this.create_menu_button("Office Game","office_game")),e.appendChild(this.create_menu_button("Egg Game","egg_game"))}},{key:"create_menu_button",value:function(e,t){return(0,l.create_element)("div")["class"]("menu_button").click(function(e){return c["default"].navigate(t)}).text(e).render()}},{key:"cleanup",value:function(e){}}]),t}(d["default"]);e["default"]=p}),require.register("scenes/OfficeGameScene.js",function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),l=t("interactjs"),s=n(l),c=t("../utils"),f=t("./Scene"),d=n(f),p=function(e){function t(){return a(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),u(t,[{key:"render",value:function(e){var t=this;e.style.backgroundImage="url(img/officegame_bg2.jpg)";var r=["blue","green","red"],n=[];(0,c.range)(4).map(function(a){var i=void 0,o=(0,c.create_element)("div")["class"]("shelf")["class"]("shelf"+a).render();return a<3?(i=t.fill_shelf_with_folders(o,r[a],3),n=n.concat(i)):t.fill_shelf_with_folders(o,"yellow",0),e.appendChild(o),o});t.messageBox=(0,c.create_element)("div")["class"]("message_box").render(),e.appendChild(t.messageBox),t.dragContainer=(0,c.create_element)("div")["class"]("drag_container").render(),(0,c.shuffle)(n).forEach(function(e){var r=e.color,n=e.number,a=e.drop_target,i=t.create_draggable_folder(r,n,a);t.dragContainer.appendChild(i)}),e.appendChild((0,c.create_element)("div")["class"]("drag_shadow").adopt(t.dragContainer).render()),t.showMessage("Sortiere die Ordner nach Farbe und Nummer ins Regal!"),(0,s["default"])(".draggable_folder").draggable({inertia:!0,onstart:function(e){e.target.style.zIndex=1},onmove:function(e){var t=e.target,r=(parseFloat(t.getAttribute("data-x"))||0)+e.dx,n=(parseFloat(t.getAttribute("data-y"))||0)+e.dy;t.style.transform="translate("+r+"px, "+n+"px)",t.setAttribute("data-x",r),t.setAttribute("data-y",n)},onend:function(e){if(e.target.style.zIndex="",null==e.interaction.dropElement){var r=e.target;r.removeAttribute("data-x"),r.removeAttribute("data-y"),r.style.transform="",r.parentElement!=t.dragContainer&&t.dragContainer.appendChild(r)}t.check_finish()}}).styleCursor(!1),(0,s["default"])(".folder_space").dropzone({overlap:.5,ondragenter:function(e){e.target.classList.add("drop-target")},ondragleave:function(e){e.target.classList.remove("drop-target")},ondrop:function(e){var r=e.target,n=r.getBoundingClientRect(),a=n.x,i=n.y,o=e.relatedTarget;o.style.top=i+"px",o.style.left=a+"px",o.style.transform="",r.childElementCount>0&&(0,c.to_array)(r.childNodes).forEach(function(e){t.dragContainer.appendChild(e)}),r.appendChild(o)},ondropdeactivate:function(e){var t=e.relatedTarget;t.removeAttribute("data-x"),t.removeAttribute("data-y"),t.style.transform=0,e.target.classList.remove("drop-target")}})}},{key:"check_finish",value:function(){if(0==this.dragContainer.childElementCount){var e=document.querySelectorAll(".draggable_folder"),t=(0,c.to_array)(e),r=t.reduce(function(e,t){var r=t.parentElement,n=r.getAttribute("data-type"),a=t.getAttribute("data-type");return n==a?e+1:e},0);9==r?this.showMessage("Richtig!"):this.showMessage("Leider falsch. Schau nochmal genau hin!")}}},{key:"showMessage",value:function(e){var t=this.messageBox;t.textContent=e,t.classList.add("active"),clearTimeout(this.messageBoxTimeout),this.messageBoxTimeout=setTimeout(function(){t.classList.remove("active")},5e3)}},{key:"fill_shelf_with_folders",value:function(e,t,r){var n=this,a=(0,c.range)(10),i=(0,c.range)(r).map(function(e){var t=Math.floor(Math.random()*a.length),r=a[t];a.splice(t,1);var n=a.indexOf(r-1);n>-1&&a.splice(n,1);var i=a.indexOf(r+1);return i>-1&&i<a.length&&a.splice(i,1),r});return(0,c.range)(10).reduce(function(r,a){if(i.indexOf(a)>-1){var o=(0,c.create_element)("div")["class"]("folder_space").attr("data-type",t+a).render();return e.appendChild(o),r.concat({number:a,color:t,drop_target:o})}return e.appendChild(n.create_folder(t,a)),r},[])}},{key:"create_draggable_folder",value:function(e,t,r){var n=this.create_folder(e,t);return n.classList.add("draggable_folder"),n}},{key:"create_folder",value:function(e,t){var r=this.folder_sprite_offset(e,t);return(0,c.create_element)("div")["class"]("folder").attr("data-type",e+t).style("background-position",r).render()}},{key:"folder_sprite_offset",value:function(e,t){var r={yellow:0,blue:33.3,green:66.6,red:100},n=11.1*t,a=r[e];return n+"% "+a+"%"}},{key:"cleanup",value:function(e){}}]),t}(d["default"]);e["default"]=p}),require.register("scenes/Scene.js",function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=function(){function e(){n(this,e)}return a(e,[{key:"render",value:function(e){}},{key:"clenaup",value:function(e){}}]),e}();e["default"]=i}),require.register("scenes/scene_manager.js",function(e,t,r){"use strict";function n(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var a=n([""," is not a scene"],[""," is not a scene"]),i=t("../utils"),o=function(){return(0,i.create_element)("div")["class"]("scene").render()},u=function(){var e=o();f.parentNode.replaceChild(e,f),f=e},l=function(e,t){t&&t.render&&t.cleanup||thorw(a,t),d[e]=t},s=function(e){if(!(e in d))throw"Unknown scene '"+e+"'";var t=d[e];u(),p&&p.cleanup&&p.cleanup(f),t.render(f),p=t},c=function(){return f},f=o(),d={},p=void 0;r.exports={register:l,navigate:s,get_scene_element:c}}),require.register("utils.js",function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;arguments.length<1?(t=0,e=0):null===t&&(t=e,e=0);for(var n=[];e!=t;)n.push(e),e+=r;return n}function i(e){for(var t=[],r=e.slice(0);r.length>0;){var n=Math.floor(Math.random()*r.length);t.push(r.splice(n,1)[0])}return t}function o(e){return new s(e)}function u(e){return Array.prototype.slice.call(e)}Object.defineProperty(e,"__esModule",{value:!0});var l=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();e.range=a,e.shuffle=i,e.create_element=o,e.to_array=u;var s=function(){function e(t){n(this,e),this.el=document.createElement(t)}return l(e,[{key:"class",value:function(e){return this.el.classList.add(e),this}},{key:"id",value:function(e){return this.el.setAttribute("id",e),this}},{key:"attr",value:function(e,t){return this.el.setAttribute(e,t),this}},{key:"style",value:function(e,t){return this.el.style.setProperty(e,t),this}},{key:"text",value:function(e){return this.el.textContent=e,this}},{key:"adopt",value:function(e){return this.el.appendChild(e),this}},{key:"click",value:function(e){return this.el.addEventListener("click",e),this}},{key:"render",value:function(){return this.el}}]),e}()}),require.register("___globals___",function(e,t,r){})}(),require("___globals___");