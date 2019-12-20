(this["webpackJsonpphone-book"]=this["webpackJsonpphone-book"]||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),c=t.n(o),u=(t(19),t(2)),l=function(e){var n=e.searchWord,t=e.onSearchWordChange;return r.a.createElement("div",null,"Filter shown with ",r.a.createElement("input",{value:n,onChange:t}))},i=function(e){var n=e.newName,t=e.newNumber,a=e.onNameChange,o=e.onNumberChange,c=e.onAddPhone;return r.a.createElement("form",{onSubmit:c},r.a.createElement("div",null,r.a.createElement("div",null,"Name: ",r.a.createElement("input",{value:n,onChange:a})),r.a.createElement("div",null,"Number: ",r.a.createElement("input",{value:t,onChange:o}))),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"Add")))},m=function(e){var n=e.personToShow,t=e.onClickDeletePerson;return r.a.createElement("ul",null,n.map((function(e){return r.a.createElement("li",{key:e.name},e.name," ",e.number,r.a.createElement("button",{onClick:t(e.name,e.id)},"Delete"))})))},s=function(e){var n=e.message,t=e.errorMessage;return null!==n?r.a.createElement("div",{className:"success-message"},n):null!==t?r.a.createElement("div",{className:"error-message"},t):null},d=t(3),f=t.n(d),h="http://localhost:3001/api/persons",b=function(){return f.a.get(h).then((function(e){return e.data}))},E=function(e){return f.a.post(h,e).then((function(e){return e.data}))},p=function(e,n){return f.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},v=function(e){return f.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))},g=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(""),d=Object(u.a)(c,2),f=d[0],h=d[1],g=Object(a.useState)(""),w=Object(u.a)(g,2),C=w[0],j=w[1],N=Object(a.useState)(""),O=Object(u.a)(N,2),S=O[0],k=O[1],P=Object(a.useState)(null),y=Object(u.a)(P,2),A=y[0],D=y[1],T=Object(a.useState)(null),W=Object(u.a)(T,2),J=W[0],L=W[1];Object(a.useEffect)((function(){b().then((function(e){o(e)}))}),[]);var M=t.filter((function(e){return e.name.toLowerCase().includes(S.toLowerCase())}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(s,{message:A,errorMessage:J}),r.a.createElement(l,{searchWord:S,onSearchWordChange:function(e){k(e.target.value)}}),r.a.createElement("h2",null,"Add a new"),r.a.createElement(i,{newName:f,newNumber:C,onNameChange:function(e){h(e.target.value)},onNumberChange:function(e){j(e.target.value)},onAddPhone:function(e){e.preventDefault();var n={name:f,number:C},a=t.find((function(e){return e.name===f}));a?window.confirm("".concat(f," is already added to phonebook, replace the old number with new one?"))&&p(a.id,n).then((function(e){o(t.map((function(n){return n.id!==a.id?n:e})))})).catch((function(e){L("Person '".concat(a.name,"' was already removed from server")),setTimeout((function(){L(null)}),5e3),o(t.filter((function(e){return e.id!==a.id})))})):""!==f&&""!==C?E(n).then((function(e){o(t.concat(e)),h(""),D("Added '".concat(e.name,"'")),setTimeout((function(){D(null)}),5e3)})):alert("Please input");h(""),j("")}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(m,{personToShow:M,onClickDeletePerson:function(e,n){return function(){window.confirm("Delete ".concat(e,"?"))&&v(n).then((function(e){o(t.filter((function(e){return e.id!==n}))),h("")}))}}}))};c.a.render(r.a.createElement(g,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.3fae996c.chunk.js.map