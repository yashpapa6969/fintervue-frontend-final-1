import{b as G,f as U,d as H,o as A,e as b,g as R,h as V,I as K,i as X,r as c,j as e,u as Y,L as ee,a as ne,c as re}from"./index-DbbjP9G_.js";import{u as se}from"./index.modern-DrVmpm_h.js";import{u as P,a as te,F as w}from"./chunk-56K2BSAJ-CA24om2I.js";import{I as y,a as _}from"./chunk-6CVSDS6C-BtXcUb6Q.js";import{C as T,F as ie,a as ae,b as oe,c as ue,d as le,e as de,f as me,g as fe,h as ce,i as pe,j as ve,k as ge,l as Ne,m as xe,n as be}from"./taxation-tXqfnPoE.js";import{u as he}from"./chunk-6RSEZNRH-BA_4GoP0.js";var[we,ye]=G({name:"FormErrorStylesContext",errorMessage:`useFormErrorStyles returned is 'undefined'. Seems you forgot to wrap the components in "<FormError />" `}),N=U((r,a)=>{const n=H("FormError",r),u=A(r),t=P();return t!=null&&t.isInvalid?b.jsx(we,{value:n,children:b.jsx(R.div,{...t==null?void 0:t.getErrorMessageProps(u,a),className:V("chakra-form__error-message",r.className),__css:{display:"flex",alignItems:"center",...n.text}})}):null});N.displayName="FormErrorMessage";var _e=U((r,a)=>{const n=ye(),u=P();if(!(u!=null&&u.isInvalid))return null;const t=V("chakra-form__error-icon",r.className);return b.jsx(K,{ref:a,"aria-hidden":!0,...r,__css:n.icon,className:t,children:b.jsx("path",{fill:"currentColor",d:"M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"})})});_e.displayName="FormErrorIcon";var x=U(function(a,n){var u;const t=X("FormLabel",a),m=A(a),{className:j,children:F,requiredIndicator:D=b.jsx(q,{}),optionalIndicator:I=null,...h}=m,i=P(),p=(u=i==null?void 0:i.getLabelProps(h,n))!=null?u:{ref:n,...h};return b.jsxs(R.label,{...p,className:V("chakra-form__label",m.className),__css:{display:"block",textAlign:"start",...t},children:[F,i!=null&&i.isRequired?D:I]})});x.displayName="FormLabel";var q=U(function(a,n){const u=P(),t=te();if(!(u!=null&&u.isRequired))return null;const m=V("chakra-form__required-indicator",a.className);return b.jsx(R.span,{...u==null?void 0:u.getRequiredIndicatorProps(a,n),__css:t.requiredIndicator,className:m})});q.displayName="RequiredIndicator";const je=({formData:r,handleChange:a,errors:n})=>{const[u,t]=c.useState(!1),m=c.useRef(null),j=i=>{const p=i.target.files[0];if(p){const S=URL.createObjectURL(p);a("resume",S)}},F=i=>{i.preventDefault(),t(!0)},D=()=>{t(!1)},I=i=>{i.preventDefault(),t(!1);const p=i.dataTransfer.files[0];if(p){const S=URL.createObjectURL(p);a("resume",S)}},h=()=>{m.current.click()};return e.jsxDEV("div",{className:"flex flex-col gap-4 px-4 w-full mb-24",children:[" ",e.jsxDEV("div",{className:"flex flex-col md:flex-row gap-5",children:[e.jsxDEV(w,{isInvalid:!!(n!=null&&n.firstName),isRequired:!0,className:"w-full",children:[e.jsxDEV(x,{className:"font-medium text-gray-700",children:"First Name"},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:46,columnNumber:11},void 0),e.jsxDEV(y,{children:e.jsxDEV(_,{className:"outline-none border border-gray-300 rounded-md py-2 px-3 transition-all focus:border-blue-700",type:"text",placeholder:"Enter your first name",value:r==null?void 0:r.firstName,onChange:i=>a("firstName",i.target.value)},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:48,columnNumber:13},void 0)},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:47,columnNumber:11},void 0),(n==null?void 0:n.firstName)&&e.jsxDEV(N,{children:n.firstName},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:56,columnNumber:33},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:45,columnNumber:9},void 0),e.jsxDEV(w,{isInvalid:!!(n!=null&&n.lastName),isRequired:!0,className:"w-full",children:[e.jsxDEV(x,{className:"font-medium text-gray-700",children:"Last Name"},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:59,columnNumber:11},void 0),e.jsxDEV(y,{children:e.jsxDEV(_,{className:"outline-none border border-gray-300 rounded-md py-2 px-3 transition-all focus:border-blue-700",type:"text",placeholder:"Enter your last name",value:r==null?void 0:r.lastName,onChange:i=>a("lastName",i.target.value)},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:61,columnNumber:13},void 0)},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:60,columnNumber:11},void 0),(n==null?void 0:n.lastName)&&e.jsxDEV(N,{children:n.lastName},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:69,columnNumber:32},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:58,columnNumber:9},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:44,columnNumber:7},void 0),e.jsxDEV("div",{className:"flex flex-col md:flex-row gap-5",children:[e.jsxDEV(w,{isInvalid:!!(n!=null&&n.phoneNumber),isRequired:!0,className:"w-full",children:[e.jsxDEV(x,{className:"font-medium text-gray-700",children:"Phone Number"},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:76,columnNumber:11},void 0),e.jsxDEV(y,{children:e.jsxDEV(_,{className:"outline-none border border-gray-300 rounded-md py-2 px-3 transition-all focus:border-blue-700",type:"tel",placeholder:"Enter your phone number",value:r==null?void 0:r.phoneNumber,onChange:i=>a("phoneNumber",i.target.value)},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:78,columnNumber:13},void 0)},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:77,columnNumber:11},void 0),(n==null?void 0:n.phoneNumber)&&e.jsxDEV(N,{children:n.phoneNumber},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:86,columnNumber:35},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:75,columnNumber:9},void 0),e.jsxDEV(w,{isInvalid:!!(n!=null&&n.email),isRequired:!0,className:"w-full",children:[e.jsxDEV(x,{className:"font-medium text-gray-700",children:"Email"},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:89,columnNumber:11},void 0),e.jsxDEV(y,{children:e.jsxDEV(_,{className:"outline-none border border-gray-300 rounded-md py-2 px-3 transition-all focus:border-blue-700",type:"email",placeholder:"Enter your email address",value:r==null?void 0:r.email,onChange:i=>a("email",i.target.value)},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:91,columnNumber:13},void 0)},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:90,columnNumber:11},void 0),(n==null?void 0:n.email)&&e.jsxDEV(N,{children:n.email},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:99,columnNumber:29},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:88,columnNumber:9},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:74,columnNumber:7},void 0),e.jsxDEV(w,{isInvalid:!!(n!=null&&n.linkedInProfile),isRequired:!0,children:[e.jsxDEV(x,{className:"font-medium text-gray-700",children:"LinkedIn URL"},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:105,columnNumber:9},void 0),e.jsxDEV(y,{children:e.jsxDEV(_,{className:"outline-none border border-gray-300 rounded-md py-2 px-3 transition-all focus:border-blue-700",type:"text",placeholder:"Enter your LinkedIn profile",value:r==null?void 0:r.linkedInProfile,onChange:i=>a("linkedInProfile",i.target.value)},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:107,columnNumber:11},void 0)},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:106,columnNumber:9},void 0),(n==null?void 0:n.linkedInProfile)&&e.jsxDEV(N,{children:n.linkedInProfile},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:115,columnNumber:37},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:104,columnNumber:7},void 0),e.jsxDEV(w,{isInvalid:!!(n!=null&&n.password),isRequired:!0,children:[e.jsxDEV(x,{className:"font-medium text-gray-700",children:"Password"},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:120,columnNumber:9},void 0),e.jsxDEV(y,{children:e.jsxDEV(_,{className:"outline-none border border-gray-300 rounded-md py-2 px-3 transition-all focus:border-blue-700",type:"password",placeholder:"Create a password",value:r==null?void 0:r.password,onChange:i=>a("password",i.target.value)},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:122,columnNumber:11},void 0)},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:121,columnNumber:9},void 0),(n==null?void 0:n.password)&&e.jsxDEV(N,{children:n.password},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:130,columnNumber:30},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:119,columnNumber:7},void 0),e.jsxDEV("div",{className:`w-full p-4 border-2 border-dashed ${u?"border-green-500":"border-gray-300"} rounded-md transition-all duration-300 hover:bg-gray-100 cursor-pointer`,onDrop:I,onDragOver:F,onDragLeave:D,onClick:h,children:[e.jsxDEV("p",{className:"text-center text-gray-600",children:"Drag & Drop your resume here, or click to upload."},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:143,columnNumber:9},void 0),e.jsxDEV("input",{type:"file",accept:".pdf,.doc,.docx",className:"hidden",ref:m,onChange:j},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:144,columnNumber:9},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:134,columnNumber:7},void 0),(r==null?void 0:r.resume)&&e.jsxDEV("div",{className:"mt-4",children:[e.jsxDEV("p",{children:"Resume Uploaded:"},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:156,columnNumber:11},void 0),e.jsxDEV("a",{href:r.resume,target:"_blank",rel:"noopener noreferrer",className:"text-blue-600",children:"View Resume"},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:157,columnNumber:11},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:155,columnNumber:9},void 0),e.jsxDEV("div",{className:"flex items-center gap-2 mb-4",children:[e.jsxDEV("input",{type:"checkbox",id:"whatsapp_opt_in",className:"cursor-pointer"},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:165,columnNumber:9},void 0),e.jsxDEV("label",{htmlFor:"whatsapp_opt_in",className:"text-md font-semibold text-gray-600 cursor-pointer",children:["Send me important updates & promotions via SMS, email, and"," ",e.jsxDEV("span",{className:"text-green-500",children:"WhatsApp"},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:168,columnNumber:11},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:166,columnNumber:9},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:164,columnNumber:7},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/components/forms/InterviewerSignupForm.jsx",lineNumber:42,columnNumber:5},void 0)},Ue=()=>{const r=he(),a=Y(),[n,u]=c.useState(!1),[t,m]=c.useState(1),[j,F]=c.useState(""),[D,I]=c.useState([]),[h,i]=c.useState([]),[p,S]=c.useState([]),[f,E]=c.useState({firstName:"",lastName:"",phoneNumber:"",profilePic:"",resume:"",email:"",password:"",linkedInProfile:"",industryExpertise:[],availability:{availableDays:[],availableTimeSlots:[]}}),[O,$]=c.useState({}),B=s=>{I(o=>{if(o.includes(s)){const d=o.filter(C=>C!==s);return M(d),d}else{const d=[...o,s];return M(d),d}})},M=s=>{const o=L.filter(d=>s.includes(d.id)).map(d=>d.name);E(d=>({...d,industryExpertise:o}))},W=()=>{const s={};let o=!0;return(!f.email||!/\S+@\S+\.\S+/.test(f.email))&&(s.email="Please enter a valid email address.",o=!1),(!f.phoneNumber||!/^\d{10}$/.test(f.phoneNumber))&&(s.phoneNumber="Please enter a valid phone number.",o=!1),f.linkedInProfile||(s.linkedInProfile="Please enter a valid LinkedIn profile.",o=!1),f.firstName||(s.firstName="Please enter your first name.",o=!1),f.lastName||(s.lastName="Please enter your last name.",o=!1),f.password||(s.password="Please enter your password.",o=!1),$(s),o},Z=()=>{const s=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],o=["12:00 AM","3:00 AM","6:00 AM","9:00 AM","12:00 PM","3:00 PM","6:00 PM","9:00 PM"],d=l=>{i(g=>{const k=g.includes(l)?g.filter(v=>v!==l):[...g,l];return E(v=>({...v,availability:{...v.availability,availableDays:k}})),k})},C=l=>{S(g=>{const k=g.includes(l)?g.filter(v=>v!==l):[...g,l];return E(v=>({...v,availability:{...v.availability,availableTimeSlots:k}})),k})};return e.jsxDEV("div",{className:"flex flex-col lg:flex-row gap-8 mt-6",children:[e.jsxDEV("div",{className:"w-full",children:[e.jsxDEV("h2",{className:"text-lg font-semibold mb-4",children:"Choose your available days"},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:147,columnNumber:11},void 0),e.jsxDEV("div",{className:"grid grid-cols-3 gap-4",children:s.map(l=>e.jsxDEV("button",{onClick:()=>d(l),className:`px-3 py-2 rounded-md border-2 text-base font-medium transition-all duration-300 inline-block 
                  ${h.includes(l)?"bg-blue-700 text-white":"bg-white text-gray-600 hover:bg-gray-100"} border-blue-700`,style:{width:"auto",whiteSpace:"nowrap"},children:l},l,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:150,columnNumber:15},void 0))},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:148,columnNumber:11},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:146,columnNumber:9},void 0),e.jsxDEV("div",{className:"w-full",children:[e.jsxDEV("h2",{className:"text-lg font-semibold mb-4",children:"Choose your available time slots"},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:168,columnNumber:11},void 0),e.jsxDEV("div",{className:"grid grid-cols-2 gap-4",children:o.map(l=>e.jsxDEV("button",{onClick:()=>C(l),className:`px-4 py-2 rounded-md border-2 text-base font-medium transition-all duration-300 transform ${p.includes(l)?"bg-blue-700 text-white border-blue-700 shadow-md":"bg-white text-gray-600 border-blue-700 hover:bg-gray-100 hover:scale-105"}`,style:{transitionTimingFunction:"ease-in-out"},children:l},l,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:171,columnNumber:15},void 0))},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:169,columnNumber:11},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:167,columnNumber:9},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:145,columnNumber:7},void 0)},L=[{id:1,category:"Corporate Finance",name:"Corporate Finance",icon:ie},{id:2,category:"Investment Banking",name:"Investment Banking",icon:ae},{id:3,category:"Asset Management and Wealth Management",name:"Asset Management and Wealth Management",icon:oe},{id:4,category:"Risk Management",name:"Risk Management",icon:ue},{id:5,category:"Accounting and Auditing",name:"Accounting and Auditing",icon:le},{id:6,category:"Financial Advisory",name:"Financial Advisory",icon:de},{id:7,category:"Banking and Financial Services",name:"Banking and Financial Services",icon:me},{id:8,category:"Financial Technology (FinTech)",name:"Financial Technology (FinTech)",icon:fe},{id:9,category:"Insurance",name:"Insurance",icon:ce},{id:10,category:"Real Estate Finance",name:"Real Estate Finance",icon:pe},{id:11,category:"Treasury and Cash Management",name:"Treasury and Cash Management",icon:ve},{id:12,category:"Quantitative Finance",name:"Quantitative Finance",icon:ge},{id:13,category:"Compliance and Regulatory Roles",name:"Compliance and Regulatory Roles",icon:Ne},{id:14,category:"Financial Journalism and Research",name:"Financial Journalism and Research",icon:xe},{id:15,category:"Taxation",name:"Taxation",icon:be}],J=L.filter(s=>s.name.toLowerCase().includes(j.toLowerCase())),Q=(s,o)=>{E(d=>({...d,[s]:o}))},z=async()=>{if(W()){try{if(u(!0),(await ne.post(`${re.apiBaseUrl}/api/interviewer/AddInterviewer`,f)).status===201){r({title:"Welcome",description:"Successfully registered interviewer.",variant:"top-accent",status:"success",isClosable:!0}),a("/product");return}}catch(o){u(!1),r({title:"Error",description:`${o.message}`,variant:"top-accent",status:"error",isClosable:!0});return}u(!1),r({title:"Error",description:"Something went wrong. Please try again.",variant:"top-accent",status:"error",isClosable:!0})}};return e.jsxDEV("div",{className:"h-full overflow-auto w-full flex items-start",children:[e.jsxDEV(se,{color:"blue",progress:33.33*(t-1)},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:265,columnNumber:7},void 0),e.jsxDEV("div",{className:"hidden md:flex flex-col h-screen overflow-auto gap-8 items-center justify-center w-1/3 bg-gray-50 p-8",children:[e.jsxDEV("div",{className:"w-full flex flex-col gap-4",children:[e.jsxDEV("div",{className:"flex items-center",children:[t>1&&e.jsxDEV(T,{className:"bg-blue-800 p-1 h-6 w-6 rounded-full text-white"},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:271,columnNumber:15},void 0),e.jsxDEV("h3",{className:"ml-2 font-semibold text-2xl text-blue-800",children:"Step 1"},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:273,columnNumber:13},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:269,columnNumber:11},void 0),e.jsxDEV("p",{className:"ml-8 text-xl text-gray-600",children:"Choose your Domain."},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:275,columnNumber:11},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:268,columnNumber:9},void 0),e.jsxDEV("div",{className:"w-full flex flex-col gap-4",children:[e.jsxDEV("div",{className:"flex items-center",children:[t>2&&e.jsxDEV(T,{className:"bg-blue-800 p-1 h-6 w-6 rounded-full text-white"},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:280,columnNumber:15},void 0),e.jsxDEV("h3",{className:"ml-2 font-semibold text-2xl text-blue-800",children:"Step 2"},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:282,columnNumber:13},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:278,columnNumber:11},void 0),e.jsxDEV("p",{className:"ml-8 text-xl text-gray-600",children:"Enter your details."},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:284,columnNumber:11},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:277,columnNumber:9},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:267,columnNumber:7},void 0),e.jsxDEV("div",{className:"w-full md:w-2/3 mt-4 min-h-full px-6 md:px-20 flex items-center justify-center",children:[t===1?e.jsxDEV("div",{className:"flex flex-col items-center w-full max-w-[800px] h-[90vh] overflow-y-auto gap-8",children:[e.jsxDEV("h1",{className:"text-3xl md:text-4xl font-extrabold text-blue-700 tracking-wide",children:["Step 1:"," ",e.jsxDEV("span",{className:"text-blue-900",children:"Choose your Domain"},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:293,columnNumber:15},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:291,columnNumber:13},void 0),e.jsxDEV("p",{className:"text-lg md:text-xl text-gray-500 font-light",children:"Crack your next finance-interview with us"},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:295,columnNumber:13},void 0),e.jsxDEV("div",{className:"w-full",children:e.jsxDEV("input",{type:"text",placeholder:"Search Domain",value:j,onChange:s=>F(s.target.value),className:"w-full p-3 border-2 border-blue-300 rounded-md focus:ring-4 focus:ring-blue-200 transition-all duration-300"},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:300,columnNumber:15},void 0)},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:299,columnNumber:13},void 0),e.jsxDEV("div",{className:"grid grid-cols-2 md:grid-cols-3 gap-6 w-full overflow-y-auto p-5",children:J.map(s=>e.jsxDEV("div",{onClick:()=>B(s.id),className:`border-2 ${D.includes(s.id)?"border-blue-600 bg-blue-50":"border-gray-300"} rounded-md cursor-pointer p-4 flex flex-col items-center transition-transform hover:scale-105`,children:[e.jsxDEV("img",{src:s.icon,alt:s.name,className:"w-12 h-12 mb-2"},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:320,columnNumber:19},void 0),e.jsxDEV("h3",{className:"text-center text-sm md:text-lg font-semibold text-gray-800",children:s.name},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:325,columnNumber:19},void 0)]},s.id,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:311,columnNumber:17},void 0))},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:309,columnNumber:13},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:290,columnNumber:11},void 0):t===2?e.jsxDEV("div",{className:"flex flex-col items-center w-full max-w-[800px] h-full overflow-y-auto gap-8 px-4 md:px-0",children:[e.jsxDEV("div",{className:"text-center space-y-2",children:[e.jsxDEV("h3",{className:"text-3xl md:text-4xl font-extrabold text-blue-700 tracking-wide",children:["Complete your ",e.jsxDEV("span",{className:"text-blue-900",children:"Fintervue Profile"},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:337,columnNumber:29},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:336,columnNumber:13},void 0),e.jsxDEV("p",{className:"text-lg md:text-xl text-gray-500 font-light",children:"Search & apply to finance jobs from here"},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:339,columnNumber:13},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:335,columnNumber:11},void 0),e.jsxDEV("div",{className:"w-full",children:e.jsxDEV(Z,{},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:346,columnNumber:13},void 0)},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:345,columnNumber:11},void 0),e.jsxDEV("div",{className:"w-full max-w-[800px]",children:e.jsxDEV(je,{formData:f,handleChange:Q,errors:O},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:351,columnNumber:13},void 0)},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:350,columnNumber:11},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:333,columnNumber:11},void 0):e.jsxDEV("div",{children:e.jsxDEV("h1",{},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:360,columnNumber:13},void 0)},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:359,columnNumber:11},void 0),e.jsxDEV("div",{className:"fixed bottom-6 right-6 flex gap-4 w-15 md:w-auto px-4 md:px-0",children:[t>1&&e.jsxDEV("button",{onClick:()=>m(t-1),className:"py-3 px-4 text-blue-500 border bg-white border-blue-500 w-full md:w-40 text-lg rounded-2xl transition-transform hover:scale-105",children:"Back"},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:366,columnNumber:11},void 0),t<2&&e.jsxDEV("button",{onClick:()=>m(t+1),className:"py-3 px-4 text-white bg-blue-700 font-bold w-full md:w-40 text-lg rounded-2xl transition-transform hover:scale-105",children:"Next"},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:374,columnNumber:11},void 0),t===2&&e.jsxDEV("button",{disabled:n,onClick:z,className:"py-3 px-4 text-white bg-blue-700 font-bold w-full md:w-40 text-lg rounded-2xl flex items-center justify-center gap-4 transition-transform hover:scale-105",children:n?e.jsxDEV(ee,{size:20,className:"animate-spin"},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:388,columnNumber:15},void 0):"Sign up"},void 0,!1,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:382,columnNumber:11},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:364,columnNumber:7},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:288,columnNumber:7},void 0)]},void 0,!0,{fileName:"/Users/yashgupta/Desktop/frontend-fintervue/Fintervue_front_new/src/pages/InterviewerSignupPage.jsx",lineNumber:264,columnNumber:5},void 0)};export{Ue as default};
