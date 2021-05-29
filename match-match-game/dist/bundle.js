(()=>{"use strict";var e={596:(e,t,n)=>{n.r(t)},477:(e,t,n)=>{n.r(t)},766:(e,t,n)=>{n.r(t)},336:(e,t,n)=>{n.r(t)},528:(e,t,n)=>{n.r(t)},184:(e,t,n)=>{n.r(t)},148:(e,t,n)=>{n.r(t)},387:(e,t,n)=>{n.r(t)},752:function(e,t,n){var s=this&&this.__awaiter||function(e,t,n,s){return new(n||(n=Promise))((function(i,a){function r(e){try{l(s.next(e))}catch(e){a(e)}}function o(e){try{l(s.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,o)}l((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;const i=n(88),a=n(54),r=n(229),o=n(977),l=n(831),c=n(49),d=n(178);t.App=class{constructor(e){this.rootElement=e,this.iDB=new c.Database,this.iDB.init(),this.header=new o.Header,this.main=new d.BaseComponent("main",["main"]),this.about=new a.About,this.bestScore=new i.BestScore,this.settings=new l.Settings,this.game=new r.Game,this.routes={"/":this.about.element,"/best-score":this.bestScore.element,"/settings":this.settings.element,"/game":this.game.element},this.rootElement.appendChild(this.header.element),this.rootElement.appendChild(this.main.element),this.onNav(window.location.pathname)}onNav(e){var t;this.clear(),this.header.toggleActiveLink(e),document.querySelectorAll(".navigation__item").forEach((e=>{e.classList.remove("active")})),null===(t=document.getElementById(`${e}`))||void 0===t||t.classList.add("active"),"/best-score"===e&&this.iDB.readAll("users").then((e=>{this.bestScore.renderScore(e)})),"/game"===window.location.pathname&&this.header.addStartGameButton(),window.history.pushState({},e,window.location.origin+e),this.main.element.appendChild(this.routes[e]),window.onpopstate=()=>{this.clear(),this.main.element.appendChild(this.routes[window.location.pathname])}}clear(){this.main.element.innerHTML=""}start(){return s(this,void 0,void 0,(function*(){const e=yield fetch("./images.json"),t=yield e.json(),n=t[this.settings.settingsValues[0]],s=this.settings.settingsValues[1],i=n.images.slice(0,s).map((e=>`${t[this.settings.settingsValues[0]].category}/${e}`));this.game.newGame(i,s),this.header.addStopGameButton()}))}addListeners(){this.header.StopGameButton.element.addEventListener("click",(e=>{e.preventDefault();const t=e.target;this.onNav(t.dataset.link),this.header.addStartGameButton(),this.header.element.appendChild(this.header.StartGameButton.element)})),this.header.StartGameButton.element.addEventListener("click",(e=>{const t=e.target;this.start(),this.onNav(t.dataset.link),this.header.addStopGameButton()})),window.onload=()=>{document.querySelectorAll(".navigation__item").forEach((e=>{e.addEventListener("click",(e=>{e.preventDefault();const t=e.target;this.onNav(t.dataset.link)}))}))},this.game.modal.element.addEventListener("submit",(e=>{e.preventDefault();const t={firstName:this.game.modal.inputs[0].element.value,lastName:this.game.modal.inputs[1].element.value,email:this.game.modal.inputs[2].element.value,image:this.game.modal.canvas.base64Files,score:this.game.modal.score};this.iDB.write("users",t),this.onNav("/best-score")})),this.game.modal.buttonCancel.element.addEventListener("click",(e=>{e.preventDefault(),this.onNav("/")}))}}},54:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.About=void 0;const s=n(178);n(596);class i extends s.BaseComponent{constructor(){super("div",["game-field","wrapper"]),this.element.innerHTML='<h2 class="title">How to play?</h2>\n      <div class="how-to-play">\n        <section class="how-to-play__item">\n          <figure class="circle">1</figure>\n          <span class="how-to-play__text">Register new player in game</span>\n        </section>\n        <section class="how-to-play__item form-img"></section>\n        <section class="how-to-play__item">\n          <figure class="circle">2</figure>\n          <span class="how-to-play__text">Configure your game settings</span>\n        </section>\n        <a href="#" data-link="/settings" class="navigation__item btn_game-settings"\n          ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n            <path\n              d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52\n              22 12C22 6.48 17.52 2 11.99 2ZM16.23 18L12 15.45L7.77 18L8.89 13.19L5.16\n              9.96L10.08 9.54L12 5L13.92 9.53L18.84 9.95L15.11 13.18L16.23 18Z"\n              fill="white"\n              fill-opacity="0.7"\n            />\n            <circle cx="12" cy="12" r="10" fill="white" />\n            <path\n              fill-rule="evenodd"\n              clip-rule="evenodd"\n              d="M16.7487 12.624C16.7727 12.424 16.7887 12.216 16.7887 12C16.7887\n              11.784 16.7727 11.576 16.7407 11.376L18.0927 10.32C18.2127 10.224\n              18.2447 10.048 18.1727 9.91201L16.8927 7.69601C16.8127 7.55201 16.6447\n               7.50401 16.5007 7.55201L14.9087 8.19201C14.5727 7.93601 14.2207\n                7.72801 13.8287 7.56801L13.5887 5.87201C13.5647 5.71201 13.4287\n                 5.60001 13.2687 5.60001H10.7087C10.5487 5.60001 10.4207 5.71201\n                  10.3967 5.87201L10.1567 7.56801C9.76468 7.72801 9.40468 7.94401\n                   9.07668 8.19201L7.48468 7.55201C7.34068 7.49601 7.17268 7.55201\n                    7.09268 7.69601L5.81268 9.91201C5.73268 10.056 5.76468 10.224\n                     5.89268 10.32L7.24468 11.376C7.21268 11.576 7.18868 11.792\n                     7.18868 12C7.18868 12.208 7.20468 12.424 7.23668 12.624L5.88468\n                      13.68C5.76468 13.776 5.73268 13.952 5.80468 14.088L7.08468\n                       16.304C7.16468 16.448 7.33268 16.496 7.47668 16.448L9.06868\n                        15.808C9.40468 16.064 9.75668 16.272 10.1487 16.432L10.3887\n                         18.128C10.4207 18.288 10.5487 18.4 10.7087 18.4H13.2687C13.4287\n                         18.4 13.5647 18.288 13.5807 18.128L13.8207 16.432C14.2127\n                         16.272 14.5727 16.056 14.9007 15.808L16.4927\n                          16.448C16.6367 16.504 16.8047 16.448 16.8847 16.304L18.1647\n                           14.088C18.2447 13.944 18.2127 13.776 18.0847\n                            13.68L16.7487 12.624ZM11.9887 14.4C10.6687\n                             14.4 9.58867 13.32 9.58867 12C9.58867 10.68\n                              10.6687 9.60001 11.9887 9.60001C13.3087\n                              9.60001 14.3887 10.68 14.3887 12C14.3887 13.32\n                              13.3087 14.4 11.9887 14.4Z"\n              fill="#2F80ED"\n            />\n          </svg>\n          Game Settings</a\n        >\n        <section class="how-to-play__item">\n          <figure class="circle">3</figure>\n          <span class="how-to-play__text"\n            >Start you new game! Remember card <br />positions and match it before times up.</span\n          >\n        </section>\n        <section class="how-to-play__item preview-img"></section>\n      </div>\n    '}}t.About=i},88:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.BestScore=void 0;const s=n(496),i=n(178),a=n(359);n(477);class r extends i.BaseComponent{constructor(){super("div",["wrapper","best-scores"]),this.title=new i.BaseComponent("h2",["title"],"Best players"),this.wrapper=new i.BaseComponent("div",["testtt"]),this.element.appendChild(this.title.element),this.element.appendChild(this.wrapper.element)}clearScore(){this.wrapper.element.innerHTML=""}renderScore(e){this.clearScore(),e.sort(((e,t)=>e.score>t.score?-1:0)),e.slice(0,10).forEach((e=>{const t=new s.Canvas("user__avatar");t.drawImage(e.image);const n=new i.BaseComponent("section",["top-players"]);this.wrapper.element.appendChild(n.element),n.element.innerHTML+=`\n        <div class='top-players__user user'>\n        <div class="user__information">\n          <h3 class="user__name">${e.firstName} ${e.lastName}</h3 >\n          <h4 class="user__email" > ${e.email}</h4></div>\n        </div>\n        <div class="top-players__score score">\n          <span class="Score__title">Score:</span>\n          <output class="score__result"> ${e.score}</output>\n        </div>`,n.element.appendChild(t.element)}));const t=new a.Registration;t.render(100,10,1),this.element.appendChild(t.element)}}t.BestScore=r},128:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Card=void 0;const s=n(178);n(766);class i extends s.BaseComponent{constructor(e,t){super("div",["card-container",`card-${t}`]),this.image=e,this.isCorrect=!1,this.element.innerHTML=`\n      <div class="card">\n        <div class="card__front" style="background-image: url('./images/${e}')">\n          <div class="card__cover"></div>\n        </div>\n        <div class="card__back"></div>\n      </div>`}flipToBack(){return this.flip(!0)}flipToFront(){return this.flip()}changeStatus(e){"correct"===e&&(this.isCorrect=!0);const t=this.element.querySelector(".card__cover");null==t||t.classList.toggle(`${e}`)}flip(e=!1){return new Promise((t=>{this.element.classList.toggle("flip",e),this.element.addEventListener("transitionend",(()=>t()),{once:!0})}))}}t.Card=i},168:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GameField=void 0;const s=n(178);class i extends s.BaseComponent{constructor(){super("div",["game-field"]),this.cards=[]}clear(){this.cards=[],this.element.innerHTML=""}addCards(e){this.cards=e,this.cards.forEach((e=>this.element.appendChild(e.element))),setTimeout((()=>{this.cards.forEach((e=>e.flipToBack()))}),5e3)}}t.GameField=i},229:function(e,t,n){var s=this&&this.__awaiter||function(e,t,n,s){return new(n||(n=Promise))((function(i,a){function r(e){try{l(s.next(e))}catch(e){a(e)}}function o(e){try{l(s.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,o)}l((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.Game=void 0;const i=n(680),a=n(168),r=n(178),o=n(128),l=n(359),c=n(298);n(336);class d extends r.BaseComponent{constructor(){super("div",["game","wrapper"]),this.isAnimation=!1,this.gameResult={flips:0,corrects:0,mistakes:0,cardsPairs:0},this.timer=new c.Timer,this.gameField=new a.GameField,this.element.appendChild(this.timer.element),this.element.appendChild(this.gameField.element),this.modal=new l.Registration}newGame(e,t){this.gameField.clear(),this.timer.clear(),this.timer.start(),this.gameResult.mistakes=0,this.gameResult.corrects=0,this.gameResult.flips=0,this.gameResult.cardsPairs=e.length;const n=e.concat(e).map((e=>new o.Card(e,t))).sort((()=>Math.random()-.5));this.gameField.addCards(n),setTimeout((()=>{n.forEach((e=>{e.element.addEventListener("click",(()=>{this.cardHandler(e)}))}))}),5e3)}showModal(e,t,n){this.modal.render(e,t,n),this.gameField.element.appendChild(this.modal.element)}cardHandler(e){return s(this,void 0,void 0,(function*(){if(!this.isAnimation&&!e.isCorrect){if(this.isAnimation=!0,yield e.flipToFront(),!this.activeCard)return this.activeCard=e,void(this.isAnimation=!1);if(this.gameResult.flips++,this.activeCard.image!==e.image)e.changeStatus("mistake"),this.activeCard.changeStatus("mistake"),yield i.delay(3e3),yield Promise.all([this.activeCard.flipToBack(),this.activeCard.changeStatus("mistake"),e.flipToBack(),e.changeStatus("mistake")]),this.gameResult.mistakes++;else if(e.changeStatus("correct"),this.activeCard.changeStatus("correct"),this.gameResult.corrects++,this.gameResult.corrects===this.gameResult.cardsPairs){this.timer.stop();const e=this.calculateScore(this.timer.min,this.timer.sec);this.showModal(e,this.timer.min,this.timer.sec)}this.isAnimation=!1,this.activeCard=void 0}}))}calculateScore(e,t){const n=100*(this.gameResult.flips-this.gameResult.mistakes)-10*(60*e+t);return n<0?0:n}}t.Game=d},977:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Header=void 0;const s=n(178),i=n(955),a=n(660),r=n(628);n(528);class o extends s.BaseComponent{constructor(){super("header",["header"]),this.logo=new s.BaseComponent("div",["logo"]),this.navigationWrapper=new s.BaseComponent("div",["header__navigation"]),this.StartGameButton=new i.Button(["btn"],"Start Game","/game","a"),this.StopGameButton=new i.Button(["btn"],"STOP GAME","/","a"),this.element.appendChild(this.logo.element),this.element.appendChild(this.navigationWrapper.element),r.navLinkParam.forEach((e=>{const t=new a.NavItem(e.text,e.link,e.svgClass);this.navigationWrapper.element.appendChild(t.element)})),this.element.appendChild(this.StartGameButton.element)}addStopGameButton(){this.element.removeChild(this.StartGameButton.element),this.element.appendChild(this.StopGameButton.element)}addStartGameButton(){this.element.removeChild(this.StopGameButton.element),this.element.appendChild(this.StartGameButton.element)}toggleActiveLink(e){var t;this.element.querySelectorAll(".navigation__item").forEach((e=>{e.classList.remove("active")})),null===(t=document.getElementById(`${e}`))||void 0===t||t.classList.add("active")}}t.Header=o},660:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.NavItem=void 0;const s=n(178),i=n(955);class a extends i.Button{constructor(e,t,n){super(["navigation__item"],e,t,"a"),this.element.id=t,this.svg=new s.BaseComponent("figure",["navigation__svg",`${n}`]),this.element.appendChild(this.svg.element)}}t.NavItem=a},471:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Input=void 0;const s=n(178);class i extends s.BaseComponent{constructor(e,t,n,s,i,a){super("input",["form__input"]),this.element.id=e,this.isValid=!1,this.element.setAttribute("type",t),this.element.setAttribute("maxlength","30"),this.errField=s,this.element.addEventListener("input",(e=>{this.element.className="form__input";const{value:s}=e.target;this.isValid=this.checkIsEmpty(),this.errField.innerText="",n.forEach((e=>{let n=s.match(e.RegExp);"email"===t&&(n=null!=n?null:["3"]),null!=n&&(this.element.classList.add("input_error"),this.errField.innerText=e.errMessage,this.isValid=!1)})),this.isValid&&(this.element.className="form__input input_valid"),i.every((e=>e.isValid))?a.element.removeAttribute("disabled"):a.element.setAttribute("disabled","")}))}checkIsEmpty(){const{value:e}=this.element;return""!==e||(this.errField.innerText="заполните это поле",this.isValid=!1,!1)}}t.Input=i},143:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.InputFile=void 0;const s=n(178);class i extends s.BaseComponent{constructor(e){super("input",["form__image-input"]),this.element.setAttribute("type","file"),this.element.addEventListener("change",(()=>{const t=this.element.files;if(!t)return;const n=new FileReader;n.onload=()=>{e.drawImage(n.result),this.element.value=""},n.readAsDataURL(t[0])}))}}t.InputFile=i},359:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Registration=void 0;const s=n(178),i=n(955),a=n(471),r=n(143),o=n(496),l=n(628);n(184);class c extends s.BaseComponent{constructor(){super("div",["cover"]),this.inputs=[],this.score=0,this.form=new s.BaseComponent("form",["form"]),this.congratulation=new s.BaseComponent("span",["congratulations__text"]),this.formWrapper=new s.BaseComponent("div",["form-wrapper"]),this.buttonWrapper=new s.BaseComponent("div",["form__buttons-wrapper"]),this.buttonAdd=new i.Button(["btn","btn_add-user"],"ADD USER","/about","button",!0),this.canvas=new o.Canvas("form__image"),this.inputFile=new r.InputFile(this.canvas),this.buttonCancel=new i.Button(["btn","btn_cancel"],"CANCEL","/about");const e=new s.BaseComponent("div",["form__avatar"]).element;this.element.appendChild(this.form.element),e.appendChild(this.canvas.element),e.appendChild(this.inputFile.element),this.form.element.appendChild(this.congratulation.element),this.form.element.appendChild(new s.BaseComponent("h2",["title"],"Registr new Player").element),this.form.element.appendChild(e),this.form.element.appendChild(this.formWrapper.element),this.form.element.appendChild(this.buttonWrapper.element),this.buttonWrapper.element.appendChild(this.buttonAdd.element),this.buttonWrapper.element.appendChild(this.buttonCancel.element)}clear(){this.congratulation.element.innerText="",this.formWrapper.element.innerHTML="",this.inputs=[],this.canvas.clear()}render(e,t,n){this.clear(),this.score=e,this.congratulation.element.innerText=`\n    Congratulations! You successfully found all matches on ${t}.${n} minutes.`,l.inputsParam.forEach((e=>{const t=new s.BaseComponent("label",["form__label"],e.labelText),n=new s.BaseComponent("div",["input_error-message"],"заполните это поле"),i=new a.Input(e.id,e.type,e.rule,n.element,this.inputs,this.buttonAdd);this.inputs.push(i),this.formWrapper.element.appendChild(i.element),this.formWrapper.element.appendChild(t.element),this.formWrapper.element.appendChild(n.element)}))}}t.Registration=c},422:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Option=void 0;const s=n(178);class i extends s.BaseComponent{constructor(e,t){super("option",[`${e}`],`${e}`),this.element.setAttribute("value",t)}}t.Option=i},295:function(e,t,n){var s=this&&this.__awaiter||function(e,t,n,s){return new(n||(n=Promise))((function(i,a){function r(e){try{l(s.next(e))}catch(e){a(e)}}function o(e){try{l(s.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,o)}l((s=s.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.Select=void 0;const i=n(178),a=n(422);class r extends i.BaseComponent{constructor(e,t){super("select",[`${e}`]),this.name=e,this.json=t}getOptions(){return s(this,void 0,void 0,(function*(){const e=yield fetch(`./${this.json}`);(yield e.json()).forEach((e=>{const t=e.value,n=new a.Option(`${e.category}`,t);this.element.appendChild(n.element)}))}))}}t.Select=r},831:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Settings=void 0;const s=n(178),i=n(295);n(148);class a extends s.BaseComponent{constructor(){super("div",["wrapper","best-scores"]),this.settings=[new i.Select("Categories","images.json"),new i.Select("Difficulty","difficulties.json")],this.settingsValues=[0,8],this.settings.forEach(((e,t)=>{this.element.appendChild(new s.BaseComponent("h2",["setting__name"],`${e.element.classList}`).element),e.getOptions(),this.element.appendChild(e.element),e.element.addEventListener("change",(e=>{this.settingsValues[t]=Number(e.target.value)}))}))}}t.Settings=a},607:(e,t,n)=>{t.w=void 0;const s=n(752);n(387),t.w=new s.App(document.body),t.w.addListeners()},178:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.BaseComponent=void 0,t.BaseComponent=class{constructor(e="div",t=[],n=""){this.element=document.createElement(e),this.element.classList.add(...t),this.element.innerText=n}}},955:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Button=void 0;const s=n(178);class i extends s.BaseComponent{constructor(e,t,n,s="button",i){super(s,e,t),this.element.dataset.link=n,i&&(this.element.setAttribute("type","submit"),this.element.setAttribute("disabled",""))}}t.Button=i},496:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Canvas=void 0;const s=n(178);class i extends s.BaseComponent{constructor(e){super("canvas",["canvas",e]),this.base64Files="",this.element.setAttribute("width","168"),this.element.setAttribute("height","168")}drawImage(e){const t=new Image(168,168);t.src=e,t.setAttribute("style","object-fit:cover"),t.onload=()=>{this.element.getContext("2d").drawImage(t,0,0,t.width,t.height),this.base64Files=this.element.toDataURL()}}clear(){this.element.getContext("2d").clearRect(0,0,198,198)}}t.Canvas=i},628:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.navLinkParam=t.inputsParam=void 0,t.inputsParam=[{id:"first-name",type:"text",labelText:"First name",rule:[{RegExp:/^\d{1,}$/gi,errMessage:" Имя не может состоять из цифр."},{RegExp:/[~!@#$%*()_—+=|:;"'`<>,.?/^]/gi,errMessage:"Имя не может содержать: (~ ! @ # $ % * () _ — + = | : ; \" ' ` < > , . ? / ^)"}]},{id:"last-name",type:"text",labelText:"Last Name",rule:[{RegExp:/^\d{1,}$/gi,errMessage:" Имя не может состоять из цифр."},{RegExp:/[~!@#$%*()_—+=|:;"'`<>,.?/^]/gi,errMessage:"Фамилия не может содержать: (~ ! @ # $ % * () _ — + = | : ; \" ' ` < > , . ? / ^)"}]},{id:"email",type:"email",labelText:"Email",rule:[{RegExp:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,errMessage:"email должен соответствовать стандартному правилу формированию email"}]}],t.navLinkParam=[{link:"/",text:"About Game",svgClass:"about-svg"},{link:"/best-score",text:"Best Score",svgClass:"best-score-svg"},{link:"/settings",text:"Game Settings",svgClass:"settings-svg"}]},49:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Database=void 0,t.Database=class{init(){const e=window.indexedDB.open("AKZhuk",1);e.onupgradeneeded=()=>{const t=e.result;t.createObjectStore("users",{keyPath:"email"}),this.db=t},e.onsuccess=()=>{this.db=e.result},e.onerror=()=>{throw new Error(`Errror has occured! Abort, ${e.error}`)}}write(e,t){const n=this.db.transaction(e,"readwrite"),s=n.objectStore(e).add(t);s.onsuccess=()=>{},s.onerror=()=>{throw new Error(`Errror has occured! Writing in DB error, ${n.error}`)},n.onabort=()=>{throw new Error(`Errror has occured! Abort, ${n.error}`)}}readAll(e){return new Promise(((t,n)=>{const s=this.db.transaction(e,"readonly"),i=s.objectStore(e).getAll();s.oncomplete=()=>{t(i.result)},s.onerror=()=>{n(new Error(`Errror has occured! read data from DB error, ${s.error}`))}}))}}},680:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.delay=void 0,t.delay=function(e){return new Promise((t=>{setTimeout(t,e)}))}},298:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Timer=void 0;const s=n(178);class i extends s.BaseComponent{constructor(){super("div",["timer"]),this.clock=0,this.offset=0,this.min=0,this.sec=0,this.interval=null,this.update=this.update.bind(this)}start(){this.interval||(this.offset=Date.now(),this.interval=setInterval(this.update.bind(this),1),this.min=0)}stop(){this.interval&&(clearInterval(this.interval),this.interval=null)}reset(){this.clock=0,this.render()}clear(){this.min=0,this.sec=0,this.clock=0}delta(){const e=Date.now(),t=e-this.offset;return this.offset=e,t}update(){this.clock+=this.delta(),this.render()}render(){this.sec=Math.floor(this.clock/1e3),60===this.sec&&(this.min++,this.reset()),this.element.innerHTML=`${this.min}<p>:</p>${this.sec}`}}t.Timer=i}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var a=t[s]={exports:{}};return e[s].call(a.exports,a,a.exports,n),a.exports}n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(607)})();