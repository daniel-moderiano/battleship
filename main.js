(()=>{"use strict";const e=(e,t,r)=>{const o=[];if(o[0]=e,"vertical"===r)for(let e=1;e<t;e++)o[e]=o[e-1]+10;else for(let e=1;e<t;e++)o[e]=o[e-1]+1;return o};function t(t){if(t<2||t>5)throw new Error("Invalid ship length, must be between 2 and 5 inclusive");let r="vertical";const o=[],a=[];return{length:t,orientation:r,hit:e=>{a.push(e)},isSunk:()=>a.length===t,setPosition:(r,a)=>{o.length=0,e(r,t,a).forEach((e=>{o.push(e)}))},position:o,hits:a,resetShip:()=>{o.length=0,r="vertical",a.length=0}}}function r(r){const o=function(){const t=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99],r=[],o=[],a=[],n=()=>o,l=(t,r,o,a=!1)=>{let l=!0;const i=e(t,r,o);if(i[r-1]>=100||i[r-1]%10<t%10)return!1;const c=[];return n().forEach((e=>{c.push(e.position)})),l=a?!c.flat().some((e=>i.slice(1).includes(e))):!c.flat().some((e=>i.slice(0).includes(e))),l};return{getMissedAttacks:()=>r,getCurrentShips:n,placeShip:(e,t)=>{if(!l(e,t.length,t.orientation))throw new Error("Error: invalid ship position");o.some((e=>e===t))||o.push(t),t.setPosition(e,t.orientation)},isValidPosition:l,rotateShip:e=>{if("vertical"===e.orientation){if(l(e.position[0],e.length,"horizontal",!0))return e.setPosition(e.position[0],"horizontal"),void(e.orientation="horizontal");throw new Error("Error: invalid rotation")}if(!l(e.position[0],e.length,"vertical",!0))throw new Error("Error: invalid rotation");e.setPosition(e.position[0],"vertical"),e.orientation="vertical"},receiveAttack:e=>{if(a.includes(e))throw new Error("Error: coordinate already attacked");const t=[],l=n();for(let r=0;r<o.length;r++)if(l[r].position.includes(e))return l[r].hit(e),t.push(l[r]),a.push(e),t;return a.push(e),r.push(e),t},remainingShips:()=>{let e=0;return n().forEach((t=>{t.isSunk()||(e+=1)})),e},getAllAttackedCoordinates:()=>a,getRemainingFreeCells:()=>t.filter((e=>!a.includes(e))),resetBoard:()=>{r.length=0,o.length=0,a.length=0}}}();let a;const n=[t(5),t(4),t(3),t(3),t(2)];return{name:r,board:o,attack:(e,t)=>{e.receiveAttack(t)},ships:n,allocateDOMBoard:e=>{a=e},getDOMBoard:()=>a,activateDOMBoard:()=>{a.classList.add("board__table--active")},deactivateDOMBoard:()=>{a.classList.remove("board__table--active")},resetAllShips:function(){n.forEach((e=>{e.resetShip()}))},allShipsPlaced:()=>{for(let e=0;e<n.length;e++)if(0===n[e].position.length)return!1;return!0},getName:()=>document.querySelector(".name-one").textContent,placeAIShips:function(){const e=["vertical","horizontal"];for(let t=0;t<5;t++){const r=n[t],a=e[Math.floor(2*Math.random())];r.orientation=a;let l=Math.floor(100*Math.random());for(;!o.isValidPosition(l,r.length,a,!1);)l=Math.floor(100*Math.random());o.placeShip(l,r)}}}}function o(e,t){const r=document.querySelector(".shipyard"),o=document.createElement("table");o.classList.add("ship"),o.setAttribute("draggable","true"),o.dataset.id=t;for(let t=0;t<e;t++){const e=document.createElement("tr");e.classList.add("ship-row");const r=document.createElement("td");r.classList.add("ship-cell"),e.appendChild(r),o.appendChild(e),o.dataset.length=t+1,o.dataset.orientation="vertical"}r.appendChild(o)}function a(){o(5,0),o(4,1),o(3,2),o(3,3),o(2,4)}function n(e,t){document.querySelectorAll(`.board__table-${t} .board__cell`).forEach((e=>e.classList.remove("board__cell--ship"))),e.board.getCurrentShips().forEach((e=>function(e,t){t.position.forEach((t=>{document.querySelector(`.board__table-${e} [data-coordinate='${t}']`).classList.add("board__cell--ship")}))}(t,e))),document.querySelectorAll(".ship").forEach((e=>e.remove()))}function l(e,t){t?e.classList.add("board__cell--hit"):e.classList.add("board__cell--miss")}function i(e,t){e.classList.add("board--hidden"),t.classList.remove("board--hidden")}const c=[1,2,3,4,5,6,7,8],d=[91,92,93,94,95,96,97,98],s=[19,29,39,49,59,69,79,89],u=[10,20,30,40,50,60,70,80];function h(e){return Math.abs(e[0]-e[1])>1?"vertical":"horizontal"}function m(e){document.querySelectorAll(".ship").forEach((t=>{t.addEventListener("click",(t=>{!function(e,t){const r=e.target.parentNode.parentNode;if(r.classList.contains("ship--placed"))try{t.board.rotateShip(t.ships[r.dataset.id]),r.classList.toggle("ship--horizontal"),"vertical"===r.dataset.orientation?r.dataset.orientation="horizontal":r.dataset.orientation="vertical"}catch(e){r.classList.add("ship--error"),setTimeout((()=>r.classList.remove("ship--error")),100)}}(t,e)}))}))}function p(){return!0===document.querySelector("#one-player").checked?1:2}function b(e){const t=document.querySelectorAll(".ship"),r=[...document.querySelectorAll(".board__cell")].filter((t=>e.getDOMBoard().contains(t))),o=document.querySelector(".shipyard");let n=null,l=null,i=null,c=null;const d=document.querySelector(".board--active");let s=parseInt(d.dataset.id);function u(){n=parseInt(this.dataset.length),l=this.dataset.orientation,i=this.dataset.id,c=this}function h(){n=null,l=null,i=null,c=null}function m(e){e.preventDefault()}function b(){e.board.isValidPosition(parseInt(this.dataset.coordinate),n,l)&&(e.board.placeShip(parseInt(this.dataset.coordinate),e.ships[i]),c.classList.add("ship--placed"),this.appendChild(c))}function y(){window.removeEventListener("dragend",S),document.querySelector(".board-one").classList.add("board--hidden"),document.querySelector(".board-one").classList.remove("board--active"),document.querySelector(".board-two").classList.remove("board--hidden"),document.querySelector(".board-two").classList.add("board--active"),a(),s=2;const e=new Event("boardswitched");window.dispatchEvent(e),document.querySelector('.board__ready[data-id="1"]').remove(),document.querySelector(".play-btn").classList.add("hidden")}function v(){o.remove(),s=1;const e=new Event("begintwoplayer");window.dispatchEvent(e),document.querySelector('.board__ready[data-id="2"]').remove(),document.querySelector(".play-btn").classList.add("hidden")}function S(){console.log(e.allShipsPlaced()),e.allShipsPlaced()&&2===p()?1===s?(document.querySelector('.board__ready[data-id="1"]').classList.remove("hidden"),document.querySelector('.board__ready[data-id="1"]').addEventListener("click",y)):(document.querySelector('.board__ready[data-id="2"]').classList.remove("hidden"),document.querySelector('.board__ready[data-id="2"]').textContent="Begin game",document.querySelector('.board__ready[data-id="2"]').addEventListener("click",v)):document.querySelector(".error").textContent=""}t.forEach((e=>{e.addEventListener("dragstart",u),e.addEventListener("dragend",h)})),r.forEach((e=>{e.addEventListener("dragover",m),e.addEventListener("dragenter",b)})),window.addEventListener("dragend",S)}const y=document.querySelector(".play-btn"),v=document.querySelector(".game-status"),S=document.querySelector(".error");v.textContent="Waiting for start";const g=function(){const e=function(e,t){const o=r(e),a=r(t);let n=0;const m=()=>{0===n?n+=1:n=0},p=()=>n,b=()=>{n=0},y=[o,a];let v=y[n];const S=()=>{v=y[p()]},g=()=>{0===p()?(o.deactivateDOMBoard(),a.activateDOMBoard(),document.querySelector(".board__title-1").classList.add("board__title--active"),document.querySelector(".board__title-2").classList.remove("board__title--active")):(o.activateDOMBoard(),a.deactivateDOMBoard(),document.querySelector(".board__title-2").classList.add("board__title--active"),document.querySelector(".board__title-1").classList.remove("board__title--active"))},_=()=>{0===p()?(document.querySelector(".board__title-1").classList.add("board__title--active"),document.querySelector(".board__title-2").classList.remove("board__title--active")):(document.querySelector(".board__title-2").classList.add("board__title--active"),document.querySelector(".board__title-1").classList.remove("board__title--active"))},f=()=>{m(),S(),g(),_()},q=e=>0===e.board.remainingShips(),w=()=>{b(),o.deactivateDOMBoard(),a.deactivateDOMBoard(),document.querySelector(".game-status").textContent=`Game over, ${v.name} wins!`,document.querySelector(".reset-btn").classList.remove("hidden")},L=()=>{const e=o.board.getRemainingFreeCells();return e[Math.floor(Math.random()*e.length)]},E=(e,t=null)=>{let r;const a=parseInt(e);if("vertical"===t){if(r=function(e){let t=[];switch(!0){case 0===e:case 9===e:case 90===e:case 99===e:t="none";break;case u.includes(e):case s.includes(e):t=[e-10,e+10];break;case c.includes(e):case d.includes(e):t="none";break;default:t=[e-10,e+10]}return t}(a),"none"===r)return}else if("horizontal"===t){if(r=function(e){let t=[];switch(!0){case 0===e:case 9===e:case 90===e:case 99===e:t="none";break;case c.includes(e):case d.includes(e):t=[e-1,e+1];break;case u.includes(e):case s.includes(e):t="none";break;default:t=[e-1,e+1]}return t}(a),"none"===r)return}else r=function(e){let t=[];switch(!0){case 0===e:t=[e+1,e+10];break;case 9===e:t=[e-1,e+10];break;case 90===e:t=[e+1,e-10];break;case 99===e:t=[e-1,e-10];break;case u.includes(e):t=[e+1,e-10,e+10];break;case s.includes(e):t=[e-1,e-10,e+10];break;case c.includes(e):t=[e-1,e+1,e+10];break;case d.includes(e):t=[e-1,e+1,e-10];break;default:t=[e-1,e+1,e-10,e+10]}return t}(a);const n=function(e,t){return e.filter((e=>!t.includes(e)))}(r,o.board.getAllAttackedCoordinates());return n[Math.floor(Math.random()*n.length)]};function k(){let e=L(),t=[];const r=[];let n=null;document.querySelector(".board__table-2").addEventListener("click",(i=>{i.target.parentNode.parentNode.parentNode.classList.contains("board__table--active")&&new Promise((e=>{const t=a.board.receiveAttack(parseInt(i.target.dataset.coordinate));0===t.length?(l(i.target,!1),document.querySelector(".game-status").textContent="The battle is on!"):(l(i.target,!0),t[0].isSunk()&&(document.querySelector(".game-status").textContent=`You sunk one of ${a.name}'s ships!`)),e()})).then((()=>{q(a)?w():f()})).then((()=>{let a;0!==t.length?r.length>1?"horizontal"===h(r)?(a=E(e,"horizontal"),void 0===a&&(a=E(r[0],"horizontal"))):(a=E(e,"vertical"),void 0===a&&(a=E(r[0],"vertical"))):a=E(e):0===t.length&&0!==r.length?r.length>1?"horizontal"===h(r)?(a=E(r[r.length-1],"horizontal"),void 0===a&&(a=E(r[0],"horizontal"))):(a=E(r[r.length-1],"vertical"),void 0===a&&(a=E(r[0],"vertical"))):(a=E(r[r.length-1]),void 0===a&&(a=E(r[0]))):a=L(),e=a,t=o.board.receiveAttack(parseInt(a)),null!==n&&0!==t.length&&t[0]!==n&&([n]=t,r.length=0),0!==t.length&&([n]=t),setTimeout((()=>{if(0===t.length?l(document.querySelector(`.board__table-1 [data-coordinate='${a}']`),!1):(l(document.querySelector(`.board__table-1 [data-coordinate='${a}']`),!0),t[0].isSunk()?(t.length=0,r.length=0,n=null):r.push(a)),q(o))throw w(),new Error("Game Over");f()}),500)})).catch((e=>{"Game Over"===e.message?console.log("TODO: game over logic"):console.log(e)}))}))}const O=(e,t)=>{e.target.parentNode.parentNode.parentNode.classList.contains("board__table--active")&&new Promise((r=>{const o=t.board.receiveAttack(parseInt(e.target.dataset.coordinate));0===o.length?(l(e.target,!1),document.querySelector(".game-status").textContent="The battle is on!"):(l(e.target,!0),o[0].isSunk()&&(document.querySelector(".game-status").textContent=`You sunk one of ${t.name}'s ships!`)),r()})).then((()=>{q(t)?w():(f(),t===o?setTimeout((()=>i(document.querySelector(".board-one"),document.querySelector(".board-two"))),1e3):setTimeout((()=>i(document.querySelector(".board-two"),document.querySelector(".board-one"))),1e3))})).catch((e=>console.log(e)))};return{playerOne:o,playerTwo:a,currentTurn:p,changeTurn:m,resetTurn:b,gameStartOnePlayer:()=>{a.placeAIShips(),b(),S(),g(),_(),k()},gameStartTwoPlayer:()=>{b(),S(),g(),_(),document.querySelector(".board__table-1").addEventListener("click",(e=>{O(e,o)})),document.querySelector(".board__table-2").addEventListener("click",(e=>{O(e,a)}))},changeCurrentPlayer:S,turnComplete:f,onePlayerGameLoop:k}}("Player 1","Player 2");return document.querySelector(".reset-btn").classList.add("hidden"),e.playerOne.board.resetBoard(),e.playerTwo.board.resetBoard(),e.playerOne.allocateDOMBoard(document.querySelector(".board__table-1")),e.playerTwo.allocateDOMBoard(document.querySelector(".board__table-2")),e}();y.addEventListener("click",(()=>{if(1===p()){if(!g.playerOne.allShipsPlaced())throw S.textContent="All ships must be placed first!",new Error("Not all ships placed");document.querySelectorAll(".board__cell").forEach((e=>e.classList.add("board__cell--active"))),g.gameStartOnePlayer(),n(g.playerOne,1),document.querySelector(".play-btn").classList.add("hidden"),document.querySelector(".restart-btn").classList.remove("hidden"),document.querySelector(".shipyard").remove(),v.textContent="The battle is on!"}else if(!g.playerTwo.allShipsPlaced()||!g.playerOne.allShipsPlaced())throw S.textContent="All ships must be placed first!",new Error("Not all ships placed")})),a(),1===p()&&(b(g.playerOne),m(g.playerOne)),window.addEventListener("boardswitched",(()=>{b(g.playerTwo),m(g.playerTwo)})),window.addEventListener("begintwoplayer",(()=>{document.querySelectorAll(".board__cell").forEach((e=>e.classList.add("board__cell--active"))),g.gameStartTwoPlayer(),n(g.playerOne,1),n(g.playerTwo,2)})),document.querySelector(".num-players__btn").addEventListener("click",(()=>{document.querySelector(".modal").style.display="none",1===p()?document.querySelector(".board-two").classList.remove("board--hidden"):document.querySelector(".board-two").classList.add("board--hidden")})),document.querySelector(".name-one").addEventListener("input",(e=>{g.playerTwo.name=e.target.textContent})),document.querySelector(".name-two").addEventListener("input",(e=>{g.playerTwo.name=e.target.textContent})),document.querySelector(".restart-btn").addEventListener("click",(()=>{window.location.reload()})),document.querySelector(".reset-btn").addEventListener("click",(()=>{window.location.reload()}))})();