import{_ as d,B as r,C as a,D as c,E as l}from"./VMain-47d22c96.js";import{o as m,c as p,w as e,a as t,b as s,a0 as u}from"./index-fd740c5a.js";import"./VResponsive-646d0ee2.js";const f={data:()=>({nombre:"Gestio Comandas",link:"gestioproductes"}),created(){},methods:{cambio(){this.nombre=this.nombre==="Gestio Comandas"?"Gestio Productes":"Gestio Comandas",this.$router.push(this.link),this.link=this.link==="gestiocomandes"?"gestioproductes":"gestiocomandes"}}};function h(i,o,_,k,b,n){return m(),p(r,{class:"rounded rounded-md"},{default:e(()=>[t(c,{elevation:2,title:"Nombre tienda"},{append:e(()=>[t(a,{variant:"plain",onClick:o[0]||(o[0]=C=>this.$router.push("/analisidades"))},{default:e(()=>[s(" Anàlisi de dades ")]),_:1}),t(a,{variant:"plain",onClick:n.cambio},{default:e(()=>[s(u(i.nombre),1)]),_:1},8,["onClick"]),t(a,{icon:"	mdi-chevron-down"})]),_:1}),t(l,{class:"d-flex align-center justify-center",style:{"min-height":"300px"}},{default:e(()=>[s(" Les dades s'aNALITZEN AQUI ")]),_:1})]),_:1})}const $=d(f,[["render",h]]);export{$ as default};