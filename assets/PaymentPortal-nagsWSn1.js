import{i as h,r as l,j as e}from"./index-BPaaz1FW.js";const y=()=>{const c=h(),{cart:i,total:d}=c.state||{cart:[],total:0},[s,n]=l.useState(null),[t,o]=l.useState({name:"",cardNumber:"",expiry:"",cvv:""}),r=a=>{const{name:m,value:x}=a.target;o({...t,[m]:x})},u=a=>{a.preventDefault(),t.cardNumber&&t.expiry&&t.cvv?n("success"):n("failure")};return e.jsxs("div",{className:"payment-portal",children:[e.jsxs("div",{className:"product-summary",children:[e.jsx("h2",{children:"Demo Payment Portal"}),e.jsx("h3",{children:"Order Summary"}),e.jsx("ul",{children:i.map(a=>e.jsxs("li",{children:[a.title," x ",a.quantity," - $",a.price*a.quantity]},a.id))}),e.jsxs("h4",{children:["Total: $",d.toFixed(2)]})]}),e.jsxs("form",{onSubmit:u,className:"payment-form",children:[e.jsx("h3",{children:"Payment Details"}),e.jsx("label",{children:"Name on Card"}),e.jsx("input",{type:"text",name:"name",placeholder:"John Doe",required:!0,onChange:r}),e.jsx("label",{children:"Card Number"}),e.jsx("input",{type:"text",name:"cardNumber",placeholder:"1234 5678 9101 1121",maxLength:"16",required:!0,onChange:r}),e.jsxs("div",{className:"card-info",children:[e.jsxs("div",{children:[e.jsx("label",{children:"Expiry Date"}),e.jsx("br",{}),e.jsx("input",{type:"text",name:"expiry",placeholder:"MM/YY",maxLength:"5",required:!0,onChange:r})]}),e.jsxs("div",{children:[e.jsx("label",{children:"CVV"}),e.jsx("br",{}),e.jsx("input",{type:"text",name:"cvv",placeholder:"123",maxLength:"3",required:!0,onChange:r})]})]}),e.jsx("button",{type:"submit",children:"Pay Now"})]}),s==="success"&&e.jsx("div",{className:"payment-success",children:"✅ Payment Successful! Thank you for your purchase."}),s==="failure"&&e.jsx("div",{className:"payment-failure",children:"❌ Payment Failed! Please check your card details and try again."})]})};export{y as default};
