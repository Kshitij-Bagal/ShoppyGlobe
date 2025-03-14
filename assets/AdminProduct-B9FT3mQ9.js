import{r as d,j as e}from"./index-BfvK3Jrr.js";const P=()=>{const[x,l]=d.useState([]),[a,u]=d.useState({title:"",thumbnail:"",description:"",category:"",price:"",discountPercentage:"",rating:"",stock:"",tags:"",brand:"",sku:"",weight:"",dimensions:{width:"",height:"",depth:""},warrantyInformation:"",shippingInformation:"",availabilityStatus:"In Stock"}),[o,p]=d.useState(null),[g,h]=d.useState(null);d.useEffect(()=>{(async()=>{try{const n=await fetch("https://shoppyglobe-server.onrender.com/api/products",{method:"GET",headers:{"Content-Type":"application/json"}}),r=await n.json();if(n.ok)l(r);else throw new Error(r.message||"Failed to fetch products")}catch(n){h(n.message)}})()},[]);const s=t=>{const{name:n,value:r}=t.target;if(n.includes("dimensions")){const[i]=n.split(".");u(c=>({...c,dimensions:{...c.dimensions,[i]:r}}))}else u(i=>({...i,[n]:r}))},j=async t=>{t.preventDefault();try{const n=await fetch("https://shoppyglobe-server.onrender.com/api/products",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),r=await n.json();if(n.ok)l(i=>[...i,r]),u({title:"",thumbnail:"",description:"",category:"",price:"",discountPercentage:"",rating:"",stock:"",tags:"",brand:"",sku:"",weight:"",dimensions:{width:"",height:"",depth:""},warrantyInformation:"",shippingInformation:"",availabilityStatus:"In Stock"});else throw new Error(r.message||"Failed to add product")}catch(n){h(n.message)}},b=async t=>{try{if((await fetch(`https://shoppyglobe-server.onrender.com/api/products/${t}`,{method:"DELETE"})).ok)l(r=>r.filter(i=>i._id!==t));else throw new Error("Failed to delete product")}catch(n){h(n.message)}},y=t=>{p(t)},v=async t=>{t.preventDefault();try{const n=await fetch(`https://shoppyglobe-server.onrender.com/api/products/${o._id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}),r=await n.json();if(n.ok)l(i=>i.map(c=>c._id===o._id?r:c)),p(null);else throw new Error(r.message||"Failed to update product")}catch(n){h(n.message)}},m=t=>{const{name:n,value:r}=t.target;p(i=>({...i,[n]:r}))};return e.jsxs("div",{className:"admin-product",children:[e.jsx("h2",{children:"Manage Products"}),g&&e.jsx("div",{className:"error-message",children:g}),e.jsx("h3",{children:"Product List"}),e.jsx("div",{className:"card-container",children:e.jsx("div",{className:"product-list",children:x.map(t=>e.jsxs("div",{className:"product-card",children:[e.jsx("img",{src:t.thumbnail,alt:t.title,className:"product-thumbnail"}),e.jsx("h4",{children:t.title}),e.jsx("p",{children:t.category}),o&&o._id===t._id?e.jsxs(e.Fragment,{children:[e.jsx("input",{type:"number",name:"price",value:o.price,onChange:m}),e.jsx("input",{type:"number",name:"discountPercentage",value:o.discountPercentage,onChange:m}),e.jsx("input",{type:"number",name:"stock",value:o.stock,onChange:m}),e.jsx("button",{onClick:v,children:"Update"})]}):e.jsxs(e.Fragment,{children:[e.jsxs("p",{children:["Price: $",t.price]}),e.jsxs("p",{children:["Discount: ",t.discountPercentage,"%"]}),e.jsxs("p",{children:["Stock: ",t.stock]}),e.jsxs("div",{className:"pro-list-btn",children:[e.jsx("button",{onClick:()=>y(t),children:"Edit"}),e.jsx("button",{onClick:()=>b(t._id),children:"Delete"})]})]})]},t._id))})}),e.jsx("br",{}),e.jsxs("div",{className:"add-product-form",children:[e.jsx("h3",{children:"Add New Product"}),e.jsxs("form",{onSubmit:j,children:[e.jsx("input",{type:"text",name:"title",placeholder:"Product Title",value:a.title,onChange:s,required:!0}),e.jsx("br",{}),e.jsx("input",{type:"text",name:"thumbnail",placeholder:"Thumbnail URL",value:a.thumbnail,onChange:s,required:!0}),e.jsx("br",{}),e.jsx("textarea",{name:"description",placeholder:"Description",value:a.description,onChange:s,required:!0}),e.jsx("br",{}),e.jsx("input",{type:"text",name:"category",placeholder:"Category",value:a.category,onChange:s,required:!0}),e.jsx("br",{}),e.jsx("input",{type:"number",name:"price",placeholder:"Price",value:a.price,onChange:s,required:!0}),e.jsx("br",{}),e.jsx("input",{type:"number",name:"discountPercentage",placeholder:"Discount Percentage",value:a.discountPercentage,onChange:s}),e.jsx("br",{}),e.jsx("input",{type:"number",name:"rating",placeholder:"Rating",value:a.rating,onChange:s}),e.jsx("br",{}),e.jsx("input",{type:"number",name:"stock",placeholder:"Stock",value:a.stock,onChange:s,required:!0}),e.jsx("br",{}),e.jsx("input",{type:"text",name:"tags",placeholder:"Tags (comma separated)",value:a.tags,onChange:s}),e.jsx("br",{}),e.jsx("input",{type:"text",name:"brand",placeholder:"Brand",value:a.brand,onChange:s}),e.jsx("br",{}),e.jsx("input",{type:"text",name:"sku",placeholder:"SKU",value:a.sku,onChange:s,required:!0}),e.jsx("br",{}),e.jsx("input",{type:"number",name:"weight",placeholder:"Weight",value:a.weight,onChange:s}),e.jsx("br",{}),e.jsx("input",{type:"number",name:"dimensions.width",placeholder:"Width",value:a.dimensions.width,onChange:s}),e.jsx("br",{}),e.jsx("input",{type:"number",name:"dimensions.height",placeholder:"Height",value:a.dimensions.height,onChange:s}),e.jsx("br",{}),e.jsx("input",{type:"number",name:"dimensions.depth",placeholder:"Depth",value:a.dimensions.depth,onChange:s}),e.jsx("br",{}),e.jsx("textarea",{name:"warrantyInformation",placeholder:"Warranty Information",value:a.warrantyInformation,onChange:s}),e.jsx("br",{}),e.jsx("textarea",{name:"shippingInformation",placeholder:"Shipping Information",value:a.shippingInformation,onChange:s}),e.jsx("br",{}),e.jsxs("select",{name:"availabilityStatus",value:a.availabilityStatus,onChange:s,children:[e.jsx("option",{value:"In Stock",children:"In Stock"}),e.jsx("option",{value:"Out of Stock",children:"Out of Stock"}),e.jsx("option",{value:"Pre-order",children:"Pre-order"})]}),e.jsx("br",{}),e.jsx("button",{type:"submit",children:"Add Product"})]})]})]})};export{P as default};
