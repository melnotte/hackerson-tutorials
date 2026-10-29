const $=s=>document.querySelector(s);
let PLATAFORMAS=[],plat=null,tut=null,paso=0;
async function cargar(u){const r=await fetch(u);if(!r.ok)throw new Error(u);return r.json()}
function aviso(m){$("#grid").textContent=m}
function el(tag,cls,txt){const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e}
function ic(name){const i=document.createElement("i");i.setAttribute("data-lucide",name);return i}
function tema(){document.documentElement.style.setProperty("--c",plat.color)}

function tabs(){const b=$("#tabs");b.textContent="";
 PLATAFORMAS.forEach(p=>{const t=el("button","tab");t.setAttribute("role","tab");t.setAttribute("aria-selected",p===plat);t.style.setProperty("--tc",p.color);
  t.append(ic(p.icono),el("span","",p.nombre));t.onclick=()=>{plat=p;location.hash=p.id;tema();tabs();grid()};b.append(t)});lucide.createIcons()}

function grid(){const g=$("#grid");g.textContent="";
 if(!plat.tutoriales.length){const e=el("div","empty");e.append(ic("construction"),el("span","","Muy pronto habra tutoriales aqui."));g.append(e);lucide.createIcons();return}
 plat.tutoriales.forEach(t=>{const c=el("button","card");
  const m=el("div","meta");const b=el("span");b.append(ic("signal"),document.createTextNode(t.nivel));m.append(b);
  const ico=el("div","ico");ico.append(ic(t.icono));c.append(ico,el("h2","",t.titulo),m);
  c.onclick=()=>{location.hash=plat.id+"-"+t.id};g.append(c)});lucide.createIcons()}

function codigoHasta(k){const arr=[];
 for(let j=0;j<=k;j++){const a=tut.pasos[j].add;if(!a||(tut.pasos[j].script||"")!==(tut.pasos[k].script||""))continue;const o=a.map(x=>({x,n:j===k}));
  const dep=tut.pasos[j].inside;if(dep)arr.splice(arr.length-(dep===true?1:dep),0,...o);else arr.push(...o)}return arr}

function parteDe(k){for(let j=k;j>=0;j--)if(tut.pasos[j].parte)return tut.pasos[j].parte+"  -  ";return ""}
function dibuja(){try{localStorage.setItem("prog-"+plat.id+"-"+tut.id,paso>=tut.pasos.length?0:paso)}catch(e){}const v=$("#view");v.textContent="";const n=tut.pasos.length;
 const top=el("div","top");const sal=el("button","btn");sal.append(ic("x"),document.createTextNode("Salir"));sal.onclick=()=>{location.hash=plat.id};
 const bar=el("div","bar");const fill=document.createElement("i");fill.style.width=Math.min(paso,n)/n*100+"%";bar.append(fill);top.append(sal,bar);
 const st=el("div","stage");
 if(paso>=n){const f=el("div","fin");const ico=el("div","ico");ico.append(ic("trophy"));f.append(ico,el("h2","","Lo lograste!"),el("p","","Ya programaste esto tu mismo."));
  const r=el("div","reto");r.append(el("div","tag","Reto"),el("div","",tut.reto));f.append(r);st.append(f)}
 else{const p=tut.pasos[paso];const hd=el("div","hd");const ico=el("div","ico");ico.append(ic(p.i));const tx=el("div");tx.append(el("small","",parteDe(paso)+"Paso "+(paso+1)+" de "+n),el("h2","",p.t));hd.append(ico,tx);st.append(hd);
  if(p.s)st.append(el("p","ayuda",p.s));
  if(p.add){if(p.script){const etq=el("div","tag");etq.append(ic("file-code"),document.createTextNode(p.script+" dentro de la Tool"));st.append(etq)}const code=el("div","code");code.setAttribute("aria-label","Codigo");codigoHasta(paso).forEach(l=>{code.append(el("div","ln"+(l.n?" new":""),l.x))});
   st.append(code);const nt=el("div","nota");nt.append(ic("keyboard"),el("span","","Las lineas brillantes son las que escribes ahora. Escribelas tu mismo."));st.append(nt);
   const w=el("div","why");const q=el("button","btn");q.append(ic("lightbulb"),document.createTextNode("Que hace?"));const txt=el("p","q",p.why);txt.hidden=true;txt.style.margin="14px 0 0";
   q.onclick=()=>{txt.hidden=!txt.hidden};const w2=el("div");w2.append(q,txt);st.append(w2)}}
 const nav=el("div","nav");const at=el("button","btn");at.append(ic("arrow-left"),document.createTextNode("Atras"));at.disabled=paso===0;at.onclick=()=>{paso--;dibuja()};
 const sg=el("button","btn main");if(paso>=n){sg.append(ic("house"),document.createTextNode("Terminar"));sg.onclick=()=>{location.hash=plat.id}}else{sg.append(document.createTextNode("Listo, siguiente"),ic("arrow-right"));sg.onclick=()=>{paso++;dibuja()}}
 nav.append(at,sg);st.append(nav);v.append(top,st);v.classList.add("open");v.scrollTop=0;document.body.style.overflow="hidden";lucide.createIcons()}

async function ruta(){
 const [pid,tid]=location.hash.slice(1).split("-");const p=PLATAFORMAS.find(x=>x.id===pid);
 if(p&&p!==plat){plat=p;tema();tabs();grid()}
 const t=p&&tid&&p.tutoriales.find(x=>x.id===tid);
 if(!t){tut=null;$("#view").classList.remove("open");document.body.style.overflow="";return}
 if(!t.pasos){try{Object.assign(t,await cargar("data/"+p.id+"/"+t.id+".json"))}catch(e){location.hash=p.id;aviso("No se pudo abrir este tutorial.");return}}
 if(tut!==t){tut=t;paso=0;try{paso=Math.min(+localStorage.getItem("prog-"+p.id+"-"+t.id)||0,t.pasos.length)}catch(e){}}
 dibuja()}
document.addEventListener("keydown",e=>{if(!tut)return;if(e.key==="ArrowRight"&&paso<=tut.pasos.length-1){paso++;dibuja()}if(e.key==="ArrowLeft"&&paso>0){paso--;dibuja()}if(e.key==="Escape")location.hash=plat.id});
(async()=>{
 try{PLATAFORMAS=await cargar("data/plataformas.json")}catch(e){aviso("No se pudo cargar. Si abriste el archivo con doble clic, usa un servidor local (ver LEEME.md).");return}
 plat=PLATAFORMAS[0];tema();tabs();grid();window.addEventListener("hashchange",ruta);ruta()})();
