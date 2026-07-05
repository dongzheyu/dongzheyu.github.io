import{A as h,M as f,O as v,b as g,t as _,w}from"./vendor-CnYUwNcv.js";import{l as x}from"./index-DFOIpZWU.js";var k=["innerHTML"],b=v({__name:"MarkdownRenderer",props:{content:{}},setup(i){const l=i;function u(t){return t.toLowerCase().replace(/[^\w\u4e00-\u9fff\u3400-\u4dbf]+/g,"-").replace(/^-+|-+$/g,"").replace(/--+/g,"-")}const d=new _({html:!0,linkify:!0,typographer:!0,breaks:!0});d.renderer.rules.heading_open=(t,o)=>{const c=t[o],n=u(t[o+1].children?.reduce((e,r)=>e+r.content,"")||"");return`<h${c.tagLevel} id="${n}"><a class="header-anchor" href="#${n}" aria-hidden="true"></a>`};const p=d.renderer.rules.fence||function(t,o,c,n,e){return e.renderToken(t,o,c)};d.renderer.rules.fence=(t,o,c,n,e)=>{const r=t[o];r.content;const a=r.info.trim(),s=`code-${Math.random().toString(36).substr(2,9)}`,m=p(t,o,c,n,e);return`
    <div class="code-block-wrapper">
      ${a?`<div class="code-lang-badge">${a}</div>`:""}
      <button class="code-copy-btn" onclick="copyCode('${s}')" title="复制代码">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <span class="copy-text">复制</span>
      </button>
      <div class="code-content" id="${s}">${m}</div>
    </div>
  `};const y=g(()=>d.render(l.content));return h(()=>{window.copyCode=async t=>{const o=document.getElementById(t)?.querySelector("code");if(!o)return;const c=o.textContent||"";try{await navigator.clipboard.writeText(c);const n=document.querySelector(`button[onclick="copyCode('${t}')"]`);if(n){const e=n.querySelector(".copy-text");if(e){const r=e.textContent;e.textContent="已复制!",n.classList.add("copied"),setTimeout(()=>{e.textContent=r,n.classList.remove("copied")},2e3)}}}catch{const e=document.createElement("textarea");e.value=c,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.select();try{document.execCommand("copy");const r=document.querySelector(`button[onclick="copyCode('${t}')"]`);if(r){const a=r.querySelector(".copy-text");a&&(a.textContent="已复制!",setTimeout(()=>{a.textContent="复制"},2e3))}}catch{}document.body.removeChild(e)}}}),(t,o)=>(f(),w("div",{class:"markdown-content",innerHTML:y.value},null,8,k))}}),M=x(b,[["__scopeId","data-v-fd3412aa"]]);export{M as t};
