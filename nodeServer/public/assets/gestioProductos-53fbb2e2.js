import{A as Ie,B as Pe,C as Re,D as ae,E as qe,F as Ue,G as xe,i as De,s as M,H as ue,U as Fe,I as R,J as Ae,K as He,L as Ee,r as z,y as re,t as q,M as D,n as V,z as U,b as Be,v as X,w as ie,x as Z}from"./VTextField-b9455543.js";import{I as $e,_ as Se,B as Te,C as d,D as Ge,F,E as Me}from"./VMain-47d22c96.js";import{V as h,a as A,b as N}from"./VRow-2350f49b.js";import{p as ze,g as Le,u as Oe,h as L,y as H,x as je,U as Ke,_ as Je,N as E,K as Xe,z as Ze,a as l,A as Q,F as B,e as ne,r as Qe,v as We,D as W,a5 as Ye,Z as _e,X as el,o as C,c as w,w as o,b as r,a0 as m,d as fe,a1 as de,a2 as se,a3 as ce}from"./index-fd740c5a.js";import{u as ll}from"./VResponsive-646d0ee2.js";const ol=ze({autoGrow:Boolean,autofocus:Boolean,counter:[Boolean,Number,String],counterValue:Function,prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,noResize:Boolean,rows:{type:[Number,String],default:5,validator:e=>!isNaN(parseFloat(e))},maxRows:{type:[Number,String],validator:e=>!isNaN(parseFloat(e))},suffix:String,modelModifiers:Object,...Ie(),...Pe()},"VTextarea"),Y=Le()({name:"VTextarea",directives:{Intersect:$e},inheritAttrs:!1,props:ol(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,t){let{attrs:c,emit:v,slots:p}=t;const n=Oe(e,"modelValue"),{isFocused:a,focus:b,blur:u}=Re(e),me=L(()=>typeof e.counterValue=="function"?e.counterValue(n.value):(n.value||"").toString().length),ve=L(()=>{if(c.maxlength)return c.maxlength;if(!(!e.counter||typeof e.counter!="number"&&typeof e.counter!="string"))return e.counter});function pe(i,f){var s,g;!e.autofocus||!i||(g=(s=f[0].target)==null?void 0:s.focus)==null||g.call(s)}const _=H(),$=H(),ee=je(""),S=H(),ge=L(()=>e.persistentPlaceholder||a.value||e.active);function O(){var i;S.value!==document.activeElement&&((i=S.value)==null||i.focus()),a.value||b()}function Ve(i){O(),v("click:control",i)}function he(i){v("mousedown:control",i)}function Ne(i){i.stopPropagation(),O(),W(()=>{n.value="",Ye(e["onClick:clear"],i)})}function Ce(i){var s;const f=i.target;if(n.value=f.value,(s=e.modelModifiers)!=null&&s.trim){const g=[f.selectionStart,f.selectionEnd];W(()=>{f.selectionStart=g[0],f.selectionEnd=g[1]})}}const I=H(),T=H(+e.rows),j=L(()=>["plain","underlined"].includes(e.variant));Ke(()=>{e.autoGrow||(T.value=+e.rows)});function P(){e.autoGrow&&W(()=>{if(!I.value||!$.value)return;const i=getComputedStyle(I.value),f=getComputedStyle($.value.$el),s=parseFloat(i.getPropertyValue("--v-field-padding-top"))+parseFloat(i.getPropertyValue("--v-input-padding-top"))+parseFloat(i.getPropertyValue("--v-field-padding-bottom")),g=I.value.scrollHeight,G=parseFloat(i.lineHeight),K=Math.max(parseFloat(e.rows)*G+s,parseFloat(f.getPropertyValue("--v-input-control-height"))),J=parseFloat(e.maxRows)*G+s||1/0,y=el(g??0,K,J);T.value=Math.floor((y-s)/G),ee.value=_e(y)})}Je(P),E(n,P),E(()=>e.rows,P),E(()=>e.maxRows,P),E(()=>e.density,P);let k;return E(I,i=>{i?(k=new ResizeObserver(P),k.observe(I.value)):k==null||k.disconnect()}),Xe(()=>{k==null||k.disconnect()}),ll(()=>{const i=!!(p.counter||e.counter||e.counterValue),f=!!(i||p.details),[s,g]=Ze(c),[{modelValue:G,...K}]=ae.filterProps(e),[J]=qe(e);return l(ae,Q({ref:_,modelValue:n.value,"onUpdate:modelValue":y=>n.value=y,class:["v-textarea v-text-field",{"v-textarea--prefixed":e.prefix,"v-textarea--suffixed":e.suffix,"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-textarea--auto-grow":e.autoGrow,"v-textarea--no-resize":e.noResize||e.autoGrow,"v-text-field--plain-underlined":j.value},e.class],style:e.style},s,K,{centerAffix:T.value===1&&!j.value,focused:a.value}),{...p,default:y=>{let{isDisabled:x,isDirty:le,isReadonly:ke,isValid:ye}=y;return l(Ue,Q({ref:$,style:{"--v-textarea-control-height":ee.value},onClick:Ve,onMousedown:he,"onClick:clear":Ne,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"]},J,{active:ge.value||le.value,centerAffix:T.value===1&&!j.value,dirty:le.value||e.dirty,disabled:x.value,focused:a.value,error:ye.value===!1}),{...p,default:be=>{let{props:{class:oe,...te}}=be;return l(B,null,[e.prefix&&l("span",{class:"v-text-field__prefix"},[e.prefix]),ne(l("textarea",Q({ref:S,class:oe,value:n.value,onInput:Ce,autofocus:e.autofocus,readonly:ke.value,disabled:x.value,placeholder:e.placeholder,rows:e.rows,name:e.name,onFocus:O,onBlur:u},te,g),null),[[Qe("intersect"),{handler:pe},null,{once:!0}]]),e.autoGrow&&ne(l("textarea",{class:[oe,"v-textarea__sizer"],id:`${te.id}-sizer`,"onUpdate:modelValue":we=>n.value=we,ref:I,readonly:!0,"aria-hidden":"true"},null),[[We,n.value]]),e.suffix&&l("span",{class:"v-text-field__suffix"},[e.suffix])])}})},details:f?y=>{var x;return l(B,null,[(x=p.details)==null?void 0:x.call(p,y),i&&l(B,null,[l("span",null,null),l(xe,{active:e.persistentCounter||a.value,value:me.value,max:ve.value},p.counter)])])}:void 0})}),De({},_,$,S)}}),tl={data:()=>({nombre:"Gestio Productes",link:"gestiocomandes",dialog:!1,dialog1:!1,ImagenURL:"",productoNuevo:{id:"",name:"",price:"",description:"",Imatge:""},productos1:[],Regla:{required:e=>!!e||"Es requereix"}}),methods:{connectar(){M.connect()},desconnectar(){M.disconnect()},cambio(){this.nombre=this.nombre==="Gestio Comandas"?"Gestio Productes":"Gestio Comandas",this.$router.push(this.link),this.link=this.link==="gestiocomandes"?"gestioproductes":"gestiocomandes"},afegir(){this.dialog=this.dialog===!1},editar(e){this.productoNuevo.id=e.IDProducto,this.productoNuevo.name=e.NombreProducto,this.productoNuevo.price=e.PrecioUnitario,this.productoNuevo.description=e.Descripcion,this.productoNuevo.Imatge=e.Imatge,e.reveal=!0},aceptar(e){var t="producto"+this.productoNuevo.name;let c={nombre:t,url:this.productoNuevo.Imatge};ue(c),this.productoNuevo.Imatge=t,Fe(this.productoNuevo,this.productoNuevo.id).then(v=>{e.reveal=!1,this.productoNuevo.id="",this.productoNuevo.name="",this.productoNuevo.price="",this.productoNuevo.description="",this.productoNuevo.Imatge=""}),R().then(v=>this.productos1=v)},Deshabilitar(e){this.productos1[e].Habilitado==1?this.productos1[e].Habilitado=0:this.productos1[e].Habilitado=1;var t=this.productos1[e].Habilitado;let c={status:t};M.emit("comandaNova"),Ae(c,this.productos1[e].IDProducto).then(v=>{this.productoNuevo.id="",this.productoNuevo.name="",this.productoNuevo.price="",this.productoNuevo.description="",c.status=""}),R().then(v=>this.productos1=v)},eliminar(e){let t={id:e.IDProducto};He(t).then(c=>{this.dialog=!1}),R().then(()=>{this.productos1=response})},addProducto(){var e="producto"+this.productoNuevo.name;let t={nombre:e,url:this.productoNuevo.Imatge};ue(t),this.productoNuevo.Imatge=e,Ee(this.productoNuevo).then(c=>{this.dialog1=!1,this.productoNuevo.name="",this.productoNuevo.price="",this.productoNuevo.description="",this.productoNuevo.Imatge=""}),R().then(()=>{this.productos1=response})},async recargar(){await R().then(e=>{this.productos1=e})}},created(){R().then(e=>{this.productos1=e})},computed:{estat(){return z.connected},recarregarEstat(){return z.recarregar&&(this.recargar(),M.emit("recarregat"),z.recarregar=!1,console.log("OK")),z.recarregar}}},al=fe("h1",null,"Productes",-1),ul={style:{display:"none"}};function rl(e,t,c,v,p,n){return C(),w(Te,{class:"rounded rounded-md"},{default:o(()=>[l(Ge,{elevation:2,title:"Nombre tienda"},{append:o(()=>[l(d,{variant:"plain",onClick:t[0]||(t[0]=a=>this.$router.push("/analisidades"))},{default:o(()=>[r(" Anàlisi de dades ")]),_:1}),l(d,{variant:"plain",onClick:n.cambio},{default:o(()=>[r(m(e.nombre),1)]),_:1},8,["onClick"]),l(d,{icon:"mdi-cached",onClick:t[1]||(t[1]=a=>n.recargar())})]),_:1}),l(Me,{class:"d-flex align-center justify-center",style:{"min-height":"300px"}},{default:o(()=>[l(h,null,{default:o(()=>[l(A,null,{default:o(()=>[l(N,{cols:"2"}),l(N,{cols:"8",class:"d-flex align-center justify-center"},{default:o(()=>[al]),_:1}),l(N,{cols:"2"})]),_:1}),fe("div",ul,m(this.recarregarEstat),1),l(A,null,{default:o(()=>[l(N,{cols:"10"}),l(N,{cols:"2"},{default:o(()=>[l(d,{onClick:t[2]||(t[2]=a=>e.dialog1=!0)},{default:o(()=>[r("Afegir")]),_:1}),l(re,{modelValue:e.dialog1,"onUpdate:modelValue":t[9]||(t[9]=a=>e.dialog1=a),width:"auto"},{default:o(()=>[l(q,null,{default:o(()=>[l(h,null,{default:o(()=>[l(D,null,{default:o(()=>[l(F,{src:e.productoNuevo.Imatge},null,8,["src"]),l(h,null,{default:o(()=>[l(V,{modelValue:e.productoNuevo.name,"onUpdate:modelValue":t[3]||(t[3]=a=>e.productoNuevo.name=a),rules:[e.Regla.required],label:"Nombre del producto",variante:"outlined",required:""},null,8,["modelValue","rules"]),l(V,{modelValue:e.productoNuevo.price,"onUpdate:modelValue":t[4]||(t[4]=a=>e.productoNuevo.price=a),suffix:"€",label:"Precio",rules:[e.Regla.required],required:""},null,8,["modelValue","rules"]),l(Y,{modelValue:e.productoNuevo.description,"onUpdate:modelValue":t[5]||(t[5]=a=>e.productoNuevo.description=a),rules:[e.Regla.required],label:"Descripcion","auto-grow":"",required:""},null,8,["modelValue","rules"]),l(V,{modelValue:e.productoNuevo.Imatge,"onUpdate:modelValue":t[6]||(t[6]=a=>e.productoNuevo.Imatge=a),rules:[e.Regla.required],label:"URL imagen",variante:"outlined",required:""},null,8,["modelValue","rules"])]),_:1})]),_:1}),l(U,null,{default:o(()=>[l(d,{color:"primary",onClick:t[7]||(t[7]=a=>n.addProducto())},{default:o(()=>[r("Aceptar")]),_:1}),l(d,{color:"primary",onClick:t[8]||(t[8]=a=>e.dialog1=!1)},{default:o(()=>[r("Cancelar")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1}),l(h,null,{default:o(()=>[l(A,null,{default:o(()=>[(C(!0),de(B,null,se(e.productos1,(a,b)=>(C(),w(N,{key:b,cols:"3"},{default:o(()=>[!a.reveal&&a.Habilitado?(C(),w(q,{key:0,class:"mx-auto","max-width":"344","min-height":"400"},{default:o(()=>[l(D,null,{default:o(()=>[l(F,{src:a.Imatge},null,8,["src"]),l(X,null,{default:o(()=>[r(m(a.NombreProducto),1)]),_:2},1024),l(ie,null,{default:o(()=>[r(m(a.PrecioUnitario)+"€",1)]),_:2},1024),l(Z,null,{default:o(()=>[r(m(a.Descripcion),1)]),_:2},1024)]),_:2},1024),l(U,null,{default:o(()=>[l(A,null,{default:o(()=>[l(N,{cols:"4"},{default:o(()=>[l(d,{color:"primary",onClick:u=>n.editar(a)},{default:o(()=>[r("Editar")]),_:2},1032,["onClick"])]),_:2},1024),l(N,{cols:"8"},{default:o(()=>[l(d,{color:"primary",onClick:u=>n.Deshabilitar(b)},{default:o(()=>[r("Deshabilitar")]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024)):a.reveal&&a.Habilitado?(C(),w(q,{key:1,class:"mx-auto","max-width":"344"},{default:o(()=>[l(h,null,{default:o(()=>[l(D,null,{default:o(()=>[l(F,{src:e.productoNuevo.Imatge},null,8,["src"]),l(h,null,{default:o(()=>[l(V,{modelValue:e.productoNuevo.name,"onUpdate:modelValue":t[10]||(t[10]=u=>e.productoNuevo.name=u),rules:[e.Regla.required],variant:"outlined",required:""},null,8,["modelValue","rules"]),l(V,{modelValue:e.productoNuevo.price,"onUpdate:modelValue":t[11]||(t[11]=u=>e.productoNuevo.price=u),suffix:"€",rules:[e.Regla.required],required:""},null,8,["modelValue","rules"]),l(Y,{modelValue:e.productoNuevo.description,"onUpdate:modelValue":t[12]||(t[12]=u=>e.productoNuevo.description=u),rules:[e.Regla.required],"auto-grow":"",required:""},null,8,["modelValue","rules"]),l(V,{modelValue:e.productoNuevo.Imatge,"onUpdate:modelValue":t[13]||(t[13]=u=>e.productoNuevo.Imatge=u),rules:[e.Regla.required],variant:"outlined",required:""},null,8,["modelValue","rules"])]),_:1})]),_:1}),l(U,null,{default:o(()=>[l(d,{color:"primary",onClick:u=>n.aceptar(a)},{default:o(()=>[r("Aceptar")]),_:2},1032,["onClick"]),l(d,{color:"primary",onClick:u=>a.reveal=!1},{default:o(()=>[r("Cancelar")]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024)]),_:2},1024)):ce("",!0)]),_:2},1024))),128))]),_:1})]),_:1}),l(Be,{thickness:5,class:"border-opacity-70"}),l(h,null,{default:o(()=>[l(A,null,{default:o(()=>[(C(!0),de(B,null,se(e.productos1,(a,b)=>(C(),w(N,{key:b,cols:"auto"},{default:o(()=>[!a.reveal&&!a.Habilitado?(C(),w(q,{key:0,class:"mx-auto","max-width":"344","min-height":"400",color:"rgb(255, 0, 0, 0.2)"},{default:o(()=>[l(D,null,{default:o(()=>[l(F,{src:a.Imatge},null,8,["src"]),l(X,null,{default:o(()=>[r(m(a.NombreProducto),1)]),_:2},1024),l(ie,null,{default:o(()=>[r(m(a.PrecioUnitario)+"€",1)]),_:2},1024),l(Z,null,{default:o(()=>[r(m(a.Descripcion),1)]),_:2},1024)]),_:2},1024),l(U,null,{default:o(()=>[l(d,{color:"primary",onClick:u=>n.editar(a)},{default:o(()=>[r("Editar")]),_:2},1032,["onClick"]),l(d,{color:"primary",onClick:u=>n.Deshabilitar(b)},{default:o(()=>[r("Habilitar")]),_:2},1032,["onClick"]),l(d,{color:"primary",onClick:t[14]||(t[14]=u=>e.dialog=!0)},{default:o(()=>[r("Eliminar")]),_:1}),l(re,{modelValue:e.dialog,"onUpdate:modelValue":t[16]||(t[16]=u=>e.dialog=u),width:"auto"},{default:o(()=>[l(q,null,{default:o(()=>[l(X,{class:"text-h5"},{default:o(()=>[r(" Eliminar "+m(a.NombreProducto)+" ? ",1)]),_:2},1024),l(Z,null,{default:o(()=>[r("¿Estas seguro que quieres eliminar "+m(a.NombreProducto)+"?",1)]),_:2},1024),l(U,null,{default:o(()=>[l(d,{color:"primary",onClick:u=>n.eliminar(a)},{default:o(()=>[r("Aceptar")]),_:2},1032,["onClick"]),l(d,{color:"primary",onClick:t[15]||(t[15]=u=>e.dialog=!1)},{default:o(()=>[r("Cancelar")]),_:1})]),_:2},1024)]),_:2},1024)]),_:2},1032,["modelValue"])]),_:2},1024)]),_:2},1024)):a.reveal&&!a.Habilitado?(C(),w(q,{key:1,class:"mx-auto","max-width":"344"},{default:o(()=>[l(h,null,{default:o(()=>[l(D,null,{default:o(()=>[l(F,{src:e.productoNuevo.Imatge},null,8,["src"]),l(h,null,{default:o(()=>[l(V,{modelValue:e.productoNuevo.name,"onUpdate:modelValue":t[17]||(t[17]=u=>e.productoNuevo.name=u),rules:[e.Regla.required],variante:"outlined",required:""},null,8,["modelValue","rules"]),l(V,{modelValue:e.productoNuevo.price,"onUpdate:modelValue":t[18]||(t[18]=u=>e.productoNuevo.price=u),suffix:"€",rules:[e.Regla.required],required:""},null,8,["modelValue","rules"]),l(Y,{modelValue:e.productoNuevo.description,"onUpdate:modelValue":t[19]||(t[19]=u=>e.productoNuevo.description=u),rules:[e.Regla.required],"auto-grow":"",required:""},null,8,["modelValue","rules"]),l(V,{modelValue:e.productoNuevo.Imatge,"onUpdate:modelValue":t[20]||(t[20]=u=>e.productoNuevo.Imatge=u),rules:[e.Regla.required],variante:"outlined",required:""},null,8,["modelValue","rules"])]),_:1})]),_:1}),l(U,null,{default:o(()=>[l(d,{color:"primary",onClick:u=>n.aceptar(a)},{default:o(()=>[r("Aceptar")]),_:2},1032,["onClick"]),l(d,{color:"primary",onClick:u=>a.reveal=!1},{default:o(()=>[r("Cancelar")]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024)]),_:2},1024)):ce("",!0)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}const fl=Se(tl,[["render",rl]]);export{fl as default};