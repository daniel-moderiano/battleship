(()=>{"use strict";const e=(e,t,r)=>{const a=[];if(a[0]=e,"vertical"===r)for(let e=1;e<t;e++)a[e]=a[e-1]+10;else for(let e=1;e<t;e++)a[e]=a[e-1]+1;return a};function t(t){if(t<2||t>5)throw new Error("Invalid ship length, must be between 2 and 5 inclusive");let r="vertical";const a=[],o=[];return{length:t,orientation:r,hit:e=>{o.push(e)},isSunk:()=>o.length===t,setPosition:(r,o)=>{a.length=0,e(r,t,o).forEach((e=>{a.push(e)}))},position:a,hits:o,resetShip:()=>{a.length=0,r="vertical",o.length=0}}}function r(e,t){const r=document.querySelector(".shipyard"),a=document.createElement("table");a.classList.add("ship"),a.setAttribute("draggable","true"),a.dataset.id=t;for(let t=0;t<e;t++){const e=document.createElement("tr");e.classList.add("ship-row");const r=document.createElement("td");r.classList.add("ship-cell"),e.appendChild(r),a.appendChild(e),a.dataset.length=t+1,a.dataset.orientation="vertical"}r.appendChild(a)}function a(){r(5,0),r(4,1),r(3,2),r(3,3),r(2,4)}function o(e,t){t?e.classList.add("board__cell--hit"):e.classList.add("board__cell--miss")}function n(e,t){e.classList.add("board--hidden"),t.classList.remove("board--hidden")}const l=[1,2,3,4,5,6,7,8],c=[91,92,93,94,95,96,97,98],d=[19,29,39,49,59,69,79,89],i=[10,20,30,40,50,60,70,80];function s(e,t){return e.filter((e=>!t.includes(e)))}function u(e){return Math.abs(e[0]-e[1])>1?"vertical":"horizontal"}function h(e){document.querySelectorAll(".ship").forEach((t=>{t.addEventListener("click",(t=>{!function(e,t){const r=e.target.parentNode.parentNode;if(r.classList.contains("ship--placed"))try{t.board.rotateShip(t.ships[r.dataset.id]),r.classList.toggle("ship--horizontal"),"vertical"===r.dataset.orientation?r.dataset.orientation="horizontal":r.dataset.orientation="vertical"}catch(e){console.log(e),r.classList.add("ship--error"),setTimeout((()=>r.classList.remove("ship--error")),100)}}(t,e)}))}))}function m(){return!0===document.querySelector("#one-player").checked?1:2}function b(e){const t=document.querySelectorAll(".ship"),r=[...document.querySelectorAll(".board__cell")].filter((t=>e.getDOMBoard().contains(t))),o=document.querySelector(".shipyard");let n=null,l=null,c=null,d=null;const i=document.querySelector(".board--active");let s=parseInt(i.dataset.id);function u(){n=parseInt(this.dataset.length),l=this.dataset.orientation,c=this.dataset.id,d=this}function h(){n=null,l=null,c=null,d=null}function b(e){e.preventDefault()}function p(){e.board.isValidPosition(parseInt(this.dataset.coordinate),n,l)&&(e.board.placeShip(parseInt(this.dataset.coordinate),e.ships[c]),d.classList.add("ship--placed"),this.appendChild(d))}function y(){document.querySelector(".board-one").classList.add("board--hidden"),document.querySelector(".board-one").classList.remove("board--active"),document.querySelector(".board-two").classList.remove("board--hidden"),document.querySelector(".board-two").classList.add("board--active"),a(),s=2;const e=new Event("boardswitched");window.dispatchEvent(e),document.querySelector('.board__ready[data-id="1"]').remove(),document.querySelector(".play-btn").classList.add("hidden")}function v(){o.remove(),s=1;const e=new Event("begintwoplayer");window.dispatchEvent(e),document.querySelector('.board__ready[data-id="2"]').remove(),document.querySelector(".play-btn").classList.add("hidden")}t.forEach((e=>{e.addEventListener("dragstart",u),e.addEventListener("dragend",h)})),r.forEach((e=>{e.addEventListener("dragover",b),e.addEventListener("dragenter",p)})),window.addEventListener("dragend",(function(){e.allShipsPlaced()&&2===m()?1===s?(document.querySelector('.board__ready[data-id="1"]').classList.remove("hidden"),document.querySelector('.board__ready[data-id="1"]').addEventListener("click",y)):(document.querySelector('.board__ready[data-id="2"]').classList.remove("hidden"),document.querySelector('.board__ready[data-id="2"]').textContent="Begin game",document.querySelector('.board__ready[data-id="2"]').addEventListener("click",v)):document.querySelector(".error").textContent=""}))}function p(e,t="PC"){const r=y(e),h=y(t);let m=0;const b=()=>{0===m?m+=1:m=0},p=()=>m,v=()=>{m=0},_=[r,h];let g=_[m];const S=()=>{g=_[p()]},f=()=>{0===p()?(r.deactivateDOMBoard(),h.activateDOMBoard(),document.querySelector(".board__title-1").classList.add("board__title--active"),document.querySelector(".board__title-2").classList.remove("board__title--active")):(r.activateDOMBoard(),h.deactivateDOMBoard(),document.querySelector(".board__title-2").classList.add("board__title--active"),document.querySelector(".board__title-1").classList.remove("board__title--active"))},q=()=>{0===p()?(document.querySelector(".board__title-1").classList.add("board__title--active"),document.querySelector(".board__title-2").classList.remove("board__title--active")):(document.querySelector(".board__title-2").classList.add("board__title--active"),document.querySelector(".board__title-1").classList.remove("board__title--active"))},L=()=>{b(),S(),f(),q()},w=e=>0===e.board.remainingShips(),E=()=>{v(),r.deactivateDOMBoard(),h.deactivateDOMBoard(),document.querySelector(".game-status").textContent=`Game over, ${g.name} wins!`,document.querySelector(".reset-btn").classList.remove("hidden")},k=()=>{const e=r.board.getRemainingFreeCells();return e[Math.floor(Math.random()*e.length)]},A=e=>{const t=s(function(e){let t=[];switch(!0){case 0===e:t=[e+1,e+10];break;case 9===e:t=[e-1,e+10];break;case 90===e:t=[e+1,e-10];break;case 99===e:t=[e-1,e-10];break;case i.includes(e):t=[e+1,e-10,e+10];break;case d.includes(e):t=[e-1,e-10,e+10];break;case l.includes(e):t=[e-1,e+1,e+10];break;case c.includes(e):t=[e-1,e+1,e-10];break;default:t=[e-1,e+1,e-10,e+10]}return t}(parseInt(e)),r.board.getAllAttackedCoordinates());return t[Math.floor(Math.random()*t.length)]},M=e=>{const t=function(e){let t=[];switch(!0){case 0===e:case 9===e:case 90===e:case 99===e:t="none";break;case l.includes(e):case c.includes(e):t=[e-1,e+1];break;case i.includes(e):case d.includes(e):t="none";break;default:t=[e-1,e+1]}return t}(parseInt(e));if("none"===t)return;const a=s(t,r.board.getAllAttackedCoordinates());return a[Math.floor(Math.random()*a.length)]},O=e=>{const t=function(e){let t=[];switch(!0){case 0===e:case 9===e:case 90===e:case 99===e:t="none";break;case i.includes(e):case d.includes(e):t=[e-10,e+10];break;case l.includes(e):case c.includes(e):t="none";break;default:t=[e-10,e+10]}return t}(parseInt(e));if("none"===t)return;const a=s(t,r.board.getAllAttackedCoordinates());return a[Math.floor(Math.random()*a.length)]};function C(){const e=["vertical","horizontal"];for(let t=0;t<5;t++){const r=h.ships[t],a=e[Math.floor(2*Math.random())];r.orientation=a;let o=Math.floor(100*Math.random());for(;!h.board.isValidPosition(o,r.length,a,!1);)o=Math.floor(100*Math.random());h.board.placeShip(o,r)}}function P(){let e=k(),t=[],a=[],n=null;document.querySelector(".board__table-2").addEventListener("click",(l=>{l.target.parentNode.parentNode.parentNode.classList.contains("board__table--active")&&new Promise((e=>{const t=h.board.receiveAttack(parseInt(l.target.dataset.coordinate));0===t.length?(o(l.target,!1),document.querySelector(".game-status").textContent="The battle is on!"):(o(l.target,!0),t[0].isSunk()&&(document.querySelector(".game-status").textContent=`You sunk one of ${h.name}'s ships!`)),e()})).then((()=>{if(w(h))throw E(),new Error("Game Over");L()})).then((()=>{let l;0!==t.length?a.length>1?"horizontal"===u(a)?(l=M(e),void 0===l&&(l=M(a[0]))):(l=O(e),void 0===l&&(l=O(a[0]))):l=A(e):0===t.length&&0!==a.length?a.length>1?"horizontal"===u(a)?(l=M(a[a.length-1]),void 0===l&&(l=M(a[0]))):(l=O(a[a.length-1]),void 0===l&&(l=O(a[0]))):(l=A(a[a.length-1]),void 0===l&&(l=A(a[0]))):l=k(),e=l,t=r.board.receiveAttack(parseInt(l)),null!==n&&0!==t.length&&t[0]!==n&&([n]=t,a.length=0),0!==t.length&&([n]=t),setTimeout((()=>{if(0===t.length?o(document.querySelector(`.board__table-1 [data-coordinate='${l}']`),!1):(o(document.querySelector(`.board__table-1 [data-coordinate='${l}']`),!0),t[0].isSunk()?(t.length=0,a.length=0,n=null):a.push(l)),w(r))throw E(),new Error("Game Over");L()}),500)})).catch((e=>{"Game Over"===e.message?console.log("TODO: game over logic"):console.log(e)}))}))}return{playerOne:r,playerTwo:h,currentTurn:p,changeTurn:b,resetTurn:v,getCurrentPlayers:()=>_,gameStartOnePlayer:()=>{C(),v(),S(),f(),q(),P()},gameStartTwoPlayer:()=>{v(),S(),f(),q(),document.querySelector(".board__table-1").addEventListener("click",(e=>{e.target.parentNode.parentNode.parentNode.classList.contains("board__table--active")&&new Promise((t=>{0===r.board.receiveAttack(parseInt(e.target.dataset.coordinate)).length?o(e.target,!1):o(e.target,!0),t()})).then((()=>{if(w(r))throw E(),new Error("Game Over");L(),setTimeout((()=>n(document.querySelector(".board-one"),document.querySelector(".board-two"))),1e3)})).catch((e=>console.log(e)))})),document.querySelector(".board__table-2").addEventListener("click",(e=>{e.target.parentNode.parentNode.parentNode.classList.contains("board__table--active")&&new Promise((t=>{0===h.board.receiveAttack(parseInt(e.target.dataset.coordinate)).length?o(e.target,!1):o(e.target,!0),t()})).then((()=>{w(h)?E():(L(),setTimeout((()=>n(document.querySelector(".board-two"),document.querySelector(".board-one"))),1e3))})).catch((e=>console.log(e)))}))},getCurrentPlayer:()=>g,changeCurrentPlayer:S,turnComplete:L,resetGame:()=>{v(),r.deactivateDOMBoard(),h.deactivateDOMBoard(),r.resetAllShips(),h.resetAllShips(),document.querySelectorAll(".board__cell").forEach((e=>{e.classList.remove("board__cell--miss"),e.classList.remove("board__cell--hit"),e.classList.remove("board__cell--ship"),e.classList.remove("board__cell--active")})),document.querySelectorAll(".ship").forEach((e=>e.remove())),document.querySelectorAll(".board").forEach((e=>e.classList.remove("board--hidden"))),function(){if(document.querySelector(".shipyard"))return;const e=document.createElement("div");e.classList.add("shipyard");const t=document.querySelector(".boards");t.insertBefore(e,t.firstChild)}(),a(),r.board.resetBoard(),h.board.resetBoard(),document.querySelector(".board__title-1").classList.remove("board__title--active"),document.querySelector(".board__title-2").classList.remove("board__title--active")},onePlayerGameLoop:P,placeAIShips:C}}function y(r){const a=function(){const t=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99],r=[],a=[],o=[],n=()=>a,l=(t,r,a,o=!1)=>{const l=e(t,r,a);if(l[r-1]>=100||l[r-1]%10<t%10)return!1;const c=[];if(n().forEach((e=>{c.push(e.position)})),o){if(c.flat().some((e=>l.slice(1).includes(e))))return!1}else if(c.flat().some((e=>l.slice(0).includes(e))))return!1;return!0};return{getMissedAttacks:()=>r,getCurrentShips:n,placeShip:(e,t)=>{if(!l(e,t.length,t.orientation))throw new Error("Error: invalid ship position");a.some((e=>e===t))||a.push(t),t.setPosition(e,t.orientation)},isValidPosition:l,rotateShip:e=>{if("vertical"===e.orientation){if(l(e.position[0],e.length,"horizontal",!0))return e.setPosition(e.position[0],"horizontal"),void(e.orientation="horizontal");throw new Error("Error: invalid rotation")}if(!l(e.position[0],e.length,"vertical",!0))throw new Error("Error: invalid rotation");e.setPosition(e.position[0],"vertical"),e.orientation="vertical"},receiveAttack:e=>{if(o.includes(e))throw new Error("Error: coordinate already attacked");const t=[],l=n();for(let r=0;r<a.length;r++)if(l[r].position.includes(e))return l[r].hit(e),t.push(l[r]),o.push(e),t;return o.push(e),r.push(e),t},remainingShips:()=>{let e=0;return n().forEach((t=>{t.isSunk()||(e+=1)})),e},getAllAttackedCoordinates:()=>o,getRemainingFreeCells:()=>t.filter((e=>!o.includes(e))),resetBoard:()=>{r.length=0,a.length=0,o.length=0}}}();let o;const n=[t(5),t(4),t(3),t(3),t(2)];return{name:r,board:a,attack:(e,t)=>{e.receiveAttack(t)},ships:n,allocateDOMBoard:e=>{o=e},getDOMBoard:()=>o,activateDOMBoard:()=>{o.classList.add("board__table--active")},deactivateDOMBoard:()=>{o.classList.remove("board__table--active")},resetAllShips:function(){n.forEach((e=>{e.resetShip()}))},allShipsPlaced:()=>{for(let e=0;e<n.length;e++)if(0===n[e].position.length)return!1;return!0},getName:()=>document.querySelector(".name-one").textContent}}document.querySelector(".board__table-1"),document.querySelector(".board__table-2");const v=document.querySelector(".play-btn"),_=document.querySelector(".game-status"),g=document.querySelector(".error");_.textContent="Waiting for start";const S=function(){const e=p("Player 1","Player 2");return document.querySelector(".reset-btn").classList.add("hidden"),e.playerOne.board.resetBoard(),e.playerTwo.board.resetBoard(),e.playerOne.allocateDOMBoard(document.querySelector(".board__table-1")),e.playerTwo.allocateDOMBoard(document.querySelector(".board__table-2")),e}();v.addEventListener("click",(()=>{if(1===m()){if(!S.playerOne.allShipsPlaced())throw g.textContent="All ships must be placed first!",new Error("Not all ships placed");document.querySelectorAll(".board__cell").forEach((e=>e.classList.add("board__cell--active"))),S.gameStartOnePlayer(),e=S.playerOne,t=1,document.querySelectorAll(`.board__table-${t} .board__cell`).forEach((e=>e.classList.remove("board__cell--ship"))),e.board.getCurrentShips().forEach((e=>function(e,t){t.position.forEach((t=>{document.querySelector(`.board__table-${e} [data-coordinate='${t}']`).classList.add("board__cell--ship")}))}(t,e))),document.querySelectorAll(".ship").forEach((e=>e.remove())),document.querySelector(".play-btn").classList.add("hidden"),document.querySelector(".restart-btn").classList.remove("hidden"),document.querySelector(".shipyard").remove(),_.textContent="The battle is on!"}else if(!S.playerTwo.allShipsPlaced()||!S.playerOne.allShipsPlaced())throw g.textContent="All ships must be placed first!",new Error("Not all ships placed");var e,t})),a(),1===m()&&(b(S.playerOne),h(S.playerOne)),window.addEventListener("boardswitched",(()=>{b(S.playerTwo),h(S.playerTwo)})),window.addEventListener("begintwoplayer",(()=>{document.querySelectorAll(".board__cell").forEach((e=>e.classList.add("board__cell--active"))),S.gameStartTwoPlayer()})),document.querySelector(".num-players__btn").addEventListener("click",(()=>{document.querySelector(".modal").style.display="none",1===m()?document.querySelector(".board-two").classList.remove("board--hidden"):document.querySelector(".board-two").classList.add("board--hidden")})),document.querySelector(".name-one").addEventListener("input",(e=>{S.playerTwo.name=e.target.textContent})),document.querySelector(".name-two").addEventListener("input",(e=>{S.playerTwo.name=e.target.textContent})),document.querySelector(".restart-btn").addEventListener("click",(()=>{window.location.reload()})),document.querySelector(".reset-btn").addEventListener("click",(()=>{window.location.reload()}))})();