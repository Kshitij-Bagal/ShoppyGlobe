import{d as n,e as i,j as e,L as d}from"./index-v4Nki3aL.js";const h=()=>{const s=n(t=>t.cart.items),a=i(),c=()=>s.reduce((t,r)=>t+r.price*r.quantity,0),l=()=>{a("/paymentportal",{state:{cart:s,total:c()}})};return e.jsxs("div",{className:"checkout-page",children:[e.jsx("h2",{children:"Checkout"}),s.length===0?e.jsxs("p",{children:["No items in the cart. ",e.jsx(d,{to:"/browse",children:"Add products!"})]}):e.jsxs("div",{className:"checkout-summary",children:[e.jsx("h3",{children:"Order Summary"}),e.jsx("ul",{children:s.map(t=>e.jsxs("li",{children:[t.title," x ",t.quantity," - $",t.price*t.quantity]},t._id))}),e.jsxs("h3",{children:["Total: $",c().toFixed(2)]}),e.jsx("button",{className:"place-order-btn",onClick:l,children:"Place Order"})]})]})};export{h as default};
