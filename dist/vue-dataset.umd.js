!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("vue")):"function"==typeof define&&define.amd?define(["exports","vue"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).VueDataset={},e.Vue)}(this,(function(e,t){"use strict";var s={show:"Show",entries:"entries",previous:"Previous",next:"Next",showing:"Showing",showingTo:"to",showingOf:"of",showingEntries:"entries"};function n(e){for(const t in e)return!1;return!0}const a={props:{dsData:{type:Array,default:()=>[]},dsFilterFields:{type:Object,default:()=>({})},dsSortby:{type:Array,default:()=>[]},dsSearchIn:{type:Array,default:()=>[]},dsSearchAs:{type:Object,default:()=>({})},dsSortAs:{type:Object,default:()=>({})}},setup(e){const a=t.ref(1),o=t.ref(""),r=t.ref(10),l=t.ref(s),i=t.ref([]),d=e=>{o.value=e},u=async e=>{const s=v.value;r.value=e,await t.nextTick();const n=v.value;n.length<s.length&&c(n[n.length-1])},c=e=>{a.value=e},p=t.computed((()=>(e.dsData,o.value,e.dsSortby,e.dsFilterFields,e.dsSearchIn,e.dsSearchAs,e.dsSortAs,Date.now()))),g=t.computed((()=>i.value.slice(m.value,S.value))),v=t.computed((()=>function(e,t){const s=[],n=[];let a;if(s.push(1),e<=1)return s;for(let o=t-2;o<=t+2;o++)o<e&&o>1&&s.push(o);s.push(e);for(let o=0;o<s.length;o++)a&&(s[o]-a==2?n.push(a+1):s[o]-a!=1&&n.push("...")),n.push(s[o]),a=s[o];return n}(h.value,a.value))),f=t.computed((()=>i.value.length)),h=t.computed((()=>Math.ceil(f.value/r.value))),m=t.computed((()=>(a.value-1)*r.value)),S=t.computed((()=>a.value*r.value));return t.watch(f,((e,t)=>{c(1)})),t.watch(p,((t,s)=>{let a=[];o.value||e.dsSortby.length||!n(e.dsFilterFields)?(a=e.dsData.map(((e,t)=>({index:t,value:e}))),n(e.dsFilterFields)||(a=function(e,t){for(const s in t)e=e.filter((function(e){const n=e.value;for(const a in n)if(a===s){if("function"==typeof t[s])return t[s](n[a]);if(""===t[s])return!0;if(n[a]===t[s])return!0}return!1}));return e}(a,e.dsFilterFields)),o.value&&(a=a.filter((t=>function(e,t,s,n){n=String(n).toLowerCase();for(const a in s)if(0===e.length||-1!==e.indexOf(a)){const e=String(s[a]).toLowerCase();for(const s in t)if(s===a&&"function"==typeof t[s]){const a=t[s](e,n);if(!0===a)return a}if(e.indexOf(n)>=0)return!0}return!1}(e.dsSearchIn,e.dsSearchAs,t.value,o.value)))),e.dsSortby.length&&a.sort(function(e,t={}){const s=[];let n;const a=e.length;return e=e.map((function(e,t){return"-"===e[0]?(s[t]=-1,e=e.substring(1)):s[t]=1,e})),function(o,r){for(n=0;n<a;n++){const a=e[n],l=t[a]?t[a](o.value[a]):o.value[a],i=t[a]?t[a](r.value[a]):r.value[a];if(l>i)return s[n];if(l<i)return-s[n]}return 0}}(e.dsSortby,e.dsSortAs)),a=a.map((e=>e.index))):a=e.dsData.map(((e,t)=>t)),i.value=a}),{immediate:!0}),t.provide("search",d),t.provide("showEntries",u),t.provide("setActive",c),t.provide("datasetI18n",l),t.provide("dsData",e.dsData),t.provide("dsRows",g),t.provide("dsPages",v),t.provide("dsResultsNumber",f),t.provide("dsPagecount",h),t.provide("dsFrom",m),t.provide("dsTo",S),t.provide("dsPage",a),{dsShowEntries:r,dsResultsNumber:f,dsPage:a,dsPagecount:h,dsFrom:m,dsTo:S,dsRows:g,dsPages:v,search:d,showEntries:u,setActive:c}}};a.render=function(e,s,n,a,o,r){return t.openBlock(),t.createElementBlock("div",null,[t.renderSlot(e.$slots,"default",{ds:{dsShowEntries:a.dsShowEntries,dsResultsNumber:a.dsResultsNumber,dsPage:a.dsPage,dsPagecount:a.dsPagecount,dsFrom:a.dsFrom,dsTo:a.dsTo,dsData:n.dsData,dsRows:a.dsRows,dsPages:a.dsPages}})])};const o={setup(){const e=t.inject("dsResultsNumber"),s=t.inject("dsFrom"),n=t.inject("dsTo"),a=t.computed((()=>0!==e.value?s.value+1:0)),o=t.computed((()=>n.value>=e.value?e.value:n.value));return{datasetI18n:t.inject("datasetI18n"),dsResultsNumber:e,showing:a,showingTo:o}}};o.render=function(e,s,n,a,o,r){return t.openBlock(),t.createElementBlock("div",null,t.toDisplayString(a.datasetI18n.showing)+" "+t.toDisplayString(a.showing)+" "+t.toDisplayString(a.datasetI18n.showingTo)+" "+t.toDisplayString(a.showingTo)+" "+t.toDisplayString(a.datasetI18n.showingOf)+" "+t.toDisplayString(a.dsResultsNumber)+" "+t.toDisplayString(a.datasetI18n.showingEntries),1)};const r={props:{tag:{type:String,default:"div"}},setup:()=>({dsData:t.inject("dsData"),dsRows:t.inject("dsRows")})};r.render=function(e,s,n,a,o,r){return t.openBlock(),t.createBlock(t.resolveDynamicComponent(n.tag),null,{default:t.withCtx((()=>[(t.openBlock(!0),t.createElementBlock(t.Fragment,null,t.renderList(a.dsRows,(s=>t.renderSlot(e.$slots,"default",{row:a.dsData[s],rowIndex:s}))),256)),a.dsRows.length?t.createCommentVNode("",!0):t.renderSlot(e.$slots,"noDataFound",{key:0})])),_:3})};const l={setup(){const e=t.ref("..."),s=t.inject("dsPage"),n=t.inject("dsPagecount"),a=t.computed((()=>1===s.value)),o=t.computed((()=>s.value===n.value||0===n.value));return{datasetI18n:t.inject("datasetI18n"),setActive:t.inject("setActive"),dsPages:t.inject("dsPages"),dsPagecount:n,dsPage:s,morePages:e,disabledPrevious:a,disabledNext:o}}},i={class:"pagination"},d=["tabindex","aria-disabled"],u=["onClick"],c={key:1,class:"page-link"},p=["tabindex","aria-disabled"];l.render=function(e,s,n,a,o,r){return t.openBlock(),t.createElementBlock("ul",i,[t.createElementVNode("li",{class:t.normalizeClass(["page-item",a.disabledPrevious&&"disabled"])},[t.createElementVNode("a",{class:"page-link",href:"#",tabindex:a.disabledPrevious?"-1":null,"aria-disabled":a.disabledPrevious?"true":null,onClick:s[0]||(s[0]=t.withModifiers((e=>a.setActive(1!==a.dsPage&&0!==a.dsPagecount?a.dsPage-1:a.dsPage)),["prevent"]))},t.toDisplayString(a.datasetI18n.previous),9,d)],2),(t.openBlock(!0),t.createElementBlock(t.Fragment,null,t.renderList(a.dsPages,((e,s)=>(t.openBlock(),t.createElementBlock("li",{key:s,class:t.normalizeClass(["page-item",e===a.dsPage&&"active",e===a.morePages&&"disabled"])},[e!==a.morePages?(t.openBlock(),t.createElementBlock("a",{key:0,class:"page-link",href:"#",onClick:t.withModifiers((t=>a.setActive(e)),["prevent"])},t.toDisplayString(e),9,u)):(t.openBlock(),t.createElementBlock("span",c,t.toDisplayString(e),1))],2)))),128)),t.createElementVNode("li",{class:t.normalizeClass(["page-item",a.disabledNext&&"disabled"])},[t.createElementVNode("a",{class:"page-link",href:"#",tabindex:a.disabledNext?"-1":null,"aria-disabled":a.disabledNext?"true":null,onClick:s[1]||(s[1]=t.withModifiers((e=>a.setActive(a.dsPage!==a.dsPagecount&&0!==a.dsPagecount?a.dsPage+1:a.dsPage)),["prevent"]))},t.toDisplayString(a.datasetI18n.next),9,p)],2)])};const g={props:{dsSearchPlaceholder:{type:String,default:""},wait:{type:Number,default:0}},setup(e){const s=t.inject("search");return{dsSearch:t.ref(""),input:function(e,t,s){let n;return function(){const a=this,o=arguments;clearTimeout(n),s&&!n&&e.apply(a,o),n=setTimeout((function(){n=null,s||e.apply(a,o)}),t)}}((e=>{s(e)}),e.wait)}}},v=["placeholder","value"];g.render=function(e,s,n,a,o,r){return t.openBlock(),t.createElementBlock("input",{type:"text",placeholder:n.dsSearchPlaceholder,class:"form-control",value:a.dsSearch,onInput:s[0]||(s[0]=e=>a.input(e.target.value))},null,40,v)};const f={props:{dsShowEntries:{type:Number,default:10},dsShowEntriesLovs:{type:Array,default:()=>[{value:5,text:5},{value:10,text:10},{value:25,text:25},{value:50,text:50},{value:100,text:100}]}},emits:["changed"],setup(e,{emit:s}){const n=t.inject("showEntries");return n(Number(e.dsShowEntries)),{datasetI18n:t.inject("datasetI18n"),change:e=>{s("changed",Number(e.target.value)),n(Number(e.target.value))}}}},h={class:"form-inline"},m=["value"],S=["value"];f.render=function(e,s,n,a,o,r){return t.openBlock(),t.createElementBlock("div",h,[t.createElementVNode("label",null,t.toDisplayString(a.datasetI18n.show),1),t.createElementVNode("select",{value:n.dsShowEntries,class:"form-control mr-1 ml-1",onChange:s[0]||(s[0]=(...e)=>a.change&&a.change(...e))},[(t.openBlock(!0),t.createElementBlock(t.Fragment,null,t.renderList(n.dsShowEntriesLovs,(e=>(t.openBlock(),t.createElementBlock("option",{key:e.value,value:e.value},t.toDisplayString(e.text),9,S)))),128))],40,m),t.createElementVNode("label",null,t.toDisplayString(a.datasetI18n.entries),1)])},e.Dataset=a,e.DatasetInfo=o,e.DatasetItem=r,e.DatasetPager=l,e.DatasetSearch=g,e.DatasetShow=f,Object.defineProperty(e,"__esModule",{value:!0}),e[Symbol.toStringTag]="Module"}));