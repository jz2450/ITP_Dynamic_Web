(()=>{async function t(){let e=await c();return console.log(e),`
    <div>
    <h2>have you tried listening to</h2>
    </div>
    <div>
    <h1>${e}</h1>
    </div>
    <div>
    <h2>yet?</h2>
    </div>`}function o(){return'<div class="container"><div id="responseSpace"></div><button>new rec</button></div>'}async function r(){console.log("clicked!");let e=document.getElementById("responseSpace");e.innerHTML=await t()}async function c(){try{let n=await(await fetch("https://binaryjazz.us/wp-json/genrenator/v1/genre/")).json();return console.log(n),n}catch(e){return e}}async function i(e){let n=document.querySelector("body");n!=null&&(console.log("hi"),n.innerHTML=e)}i(o());document.querySelector("button").addEventListener("click",()=>{r()});})();
