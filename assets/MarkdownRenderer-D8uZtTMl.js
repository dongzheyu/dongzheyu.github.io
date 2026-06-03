import{A as y,M as v,O as x,b as _,t as h,w}from"./vendor-CnYUwNcv.js";import{i as f}from"./index-DHYk43-D.js";var b=["innerHTML"],k=x({__name:"MarkdownRenderer",props:{content:{}},setup(i){const l=i,a=new h({html:!0,linkify:!0,typographer:!0,breaks:!0}),u=a.renderer.rules.fence||function(t,o,c,n,e){return e.renderToken(t,o,c)};a.renderer.rules.fence=(t,o,c,n,e)=>{const r=t[o];r.content;const d=r.info.trim(),s=`code-${Math.random().toString(36).substr(2,9)}`,m=u(t,o,c,n,e);return`
    <div class="code-block-wrapper">
      ${d?`<div class="code-lang-badge">${d}</div>`:""}
      <button class="code-copy-btn" onclick="copyCode('${s}')" title="复制代码">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <span class="copy-text">复制</span>
      </button>
      <div class="code-content" id="${s}">${m}</div>
    </div>
  `};const p=_(()=>a.render(l.content));return y(()=>{window.copyCode=async t=>{const o=document.getElementById(t)?.querySelector("code");if(!o)return;const c=o.textContent||"";try{await navigator.clipboard.writeText(c);const n=document.querySelector(`button[onclick="copyCode('${t}')"]`);if(n){const e=n.querySelector(".copy-text");if(e){const r=e.textContent;e.textContent="已复制!",n.classList.add("copied"),setTimeout(()=>{e.textContent=r,n.classList.remove("copied")},2e3)}}}catch{const e=document.createElement("textarea");e.value=c,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.select();try{document.execCommand("copy");const r=document.querySelector(`button[onclick="copyCode('${t}')"]`);if(r){const d=r.querySelector(".copy-text");d&&(d.textContent="已复制!",setTimeout(()=>{d.textContent="复制"},2e3))}}catch{}document.body.removeChild(e)}}}),(t,o)=>(v(),w("div",{class:"markdown-content",innerHTML:p.value},null,8,b))}}),M=f(k,[["__scopeId","data-v-3bbbc4ae"]]);export{M as t};
