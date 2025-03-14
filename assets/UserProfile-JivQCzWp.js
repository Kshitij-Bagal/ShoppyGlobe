import{r as d,u as P,e as F,j as e,L as A,s as T}from"./index-Duvofgoi.js";const L=()=>{var f,y,N,C,v;const[s,p]=d.useState(null),[E,S]=d.useState(!0),[m,x]=d.useState(null),[i,j]=d.useState(!1),[a,c]=d.useState({firstName:"",lastName:"",email:"",username:"",age:"",phone:"",gender:"",address:{street:"",city:"",state:"",postalCode:"",country:""}}),g=P(),o=localStorage.getItem("token");if(F(),!o){window.location.href="/login";return}d.useEffect(()=>{(async()=>{try{const t=await fetch("https://shoppyglobe-server.onrender.com/api/users/profile",{method:"GET",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"}}),n=await t.json();if(!t.ok)throw new Error("Failed to fetch user profile");p(n),localStorage.setItem("userRole",n.role),g(T(o))}catch(t){console.error("Error fetching user data:",t),x(t.message)}finally{S(!1)}})()},[o,g]);const u=()=>{j(!i),!i&&s&&c({firstName:s.firstName||"",lastName:s.lastName||"",email:s.email||"",username:s.username||"",age:s.age||"",phone:s.phone||"",gender:s.gender||"",address:s.address||{street:"",city:"",state:"",postalCode:"",country:""}})},r=l=>{const{name:t,value:n}=l.target;if(t.includes("address")){const h=t.split(".")[1];c(b=>({...b,address:{...b.address,[h]:n}}))}else c(h=>({...h,[t]:n}))},w=async l=>{l.preventDefault();try{const t=await fetch("https://shoppyglobe-server.onrender.com/api/users/profile",{method:"PUT",headers:{Authorization:`Bearer ${o}`,"Content-Type":"application/json"},body:JSON.stringify(a)}),n=await t.json();if(!t.ok)throw new Error("Failed to update profile");p(n),j(!1)}catch(t){console.error("Error updating user data:",t),x(t.message)}},U=a.firstName&&a.lastName&&a.email&&a.username&&a.age&&a.phone&&a.gender&&a.address.street&&a.address.city&&a.address.state&&a.address.postalCode&&a.address.country;if(E)return e.jsx("div",{className:"loading-spinner",children:"Loading..."});if(m)return e.jsxs("div",{className:"error-message",children:["Error: ",m]});const k=(s==null?void 0:s.role)==="admin";return e.jsxs("div",{className:"user-profile",children:[e.jsxs("h2",{className:"profile-heading",children:["Welcome, ",s==null?void 0:s.firstName," ",s==null?void 0:s.lastName]}),e.jsxs("div",{className:"profile-details",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Email:"})," ",(s==null?void 0:s.email)||"N/A"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Username:"})," ",(s==null?void 0:s.username)||"N/A"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Phone:"})," ",(s==null?void 0:s.phone)||"N/A"]}),i?e.jsxs(e.Fragment,{children:[e.jsx("input",{type:"text",name:"firstName",placeholder:"First Name",value:a.firstName,onChange:r}),e.jsx("br",{}),e.jsx("input",{type:"text",name:"lastName",placeholder:"Last Name",value:a.lastName,onChange:r}),e.jsx("br",{}),e.jsx("input",{type:"email",name:"email",placeholder:"Email",value:a.email,onChange:r}),e.jsx("br",{}),e.jsx("input",{type:"text",name:"username",placeholder:"Username",value:a.username,onChange:r}),e.jsx("br",{}),e.jsx("input",{type:"number",name:"age",placeholder:"Age",value:a.age,onChange:r}),e.jsx("br",{}),e.jsx("input",{type:"number",name:"phone",placeholder:"Phone",value:a.phone,onChange:r}),e.jsx("br",{}),e.jsx("input",{type:"text",name:"gender",placeholder:"Gender",value:a.gender,onChange:r}),e.jsx("br",{}),e.jsxs("div",{className:"profile-address",children:[e.jsx("h3",{children:"Address:"}),e.jsx("input",{type:"text",name:"address.street",placeholder:"Street",value:a.address.street,onChange:r}),e.jsx("br",{}),e.jsx("input",{type:"text",name:"address.city",placeholder:"City",value:a.address.city,onChange:r}),e.jsx("br",{}),e.jsx("input",{type:"text",name:"address.state",placeholder:"State",value:a.address.state,onChange:r}),e.jsx("br",{}),e.jsx("input",{type:"text",name:"address.postalCode",placeholder:"Postal Code",value:a.address.postalCode,onChange:r}),e.jsx("br",{}),e.jsx("input",{type:"text",name:"address.country",placeholder:"Country",value:a.address.country,onChange:r})]}),e.jsx("br",{}),e.jsx("button",{onClick:w,disabled:!U,children:"Save"}),e.jsx("button",{onClick:u,children:"Cancel"})]}):e.jsxs(e.Fragment,{children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Age:"})," ",(s==null?void 0:s.age)||"N/A"]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Gender:"})," ",(s==null?void 0:s.gender)||"N/A"]}),e.jsxs("div",{className:"profile-address",children:[e.jsx("h3",{children:"Address:"}),e.jsxs("p",{children:[((f=s==null?void 0:s.address)==null?void 0:f.street)||"N/A",", ",((y=s==null?void 0:s.address)==null?void 0:y.city)||"N/A",",",((N=s==null?void 0:s.address)==null?void 0:N.state)||"N/A",", ",((C=s==null?void 0:s.address)==null?void 0:C.postalCode)||"N/A",",",((v=s==null?void 0:s.address)==null?void 0:v.country)||"N/A"]})]}),e.jsx("button",{onClick:u,children:"Edit Profile"})]}),k&&e.jsxs("div",{className:"admin-controls",children:[e.jsx("h3",{children:"Admin Panel"}),e.jsx(A,{to:"/adminproducts",children:e.jsx("button",{children:"Update Product Database"})}),e.jsx(A,{to:"/adminusers",children:e.jsx("button",{children:"Manage User Accounts"})})]})]})]})};export{L as default};
