import{d4 as F,d5 as T,d7 as I,d9 as d,dw as y,d6 as t,dy as x,dt as O,ds as n}from"./index-3_MDlEUN.js";import{h as q}from"./CopyToClipboard-DSTf_eKU-Dkg4Pmze.js";import{n as B}from"./OpenLink-DZHy38vr-PCqGE7bB.js";import{C as E}from"./QrCode-B84kEIjT-DiiidMzF.js";import{n as M}from"./ScreenLayout-D1p_ntex-D9QNBO5s.js";import{l as h}from"./farcaster-DPlSjvF5-BAIfgEXe.js";import"./dijkstra-COg3n3zL.js";import"./ModalHeader-BnVmXtvG-C4TBIaFO.js";import"./Screen-Cycy3IzT-DKCOTU3e.js";import"./index-Dq_xe9dz-8bNoNoGU.js";let S="#8a63d2";const _=({appName:u,loading:m,success:i,errorMessage:e,connectUri:r,onBack:s,onClose:c,onOpenFarcaster:o})=>t.jsx(M,x.isMobile||m?x.isIOS?{title:e?e.message:"Add a signer to Farcaster",subtitle:e?e.detail:`This will allow ${u} to add casts, likes, follows, and more on your behalf.`,icon:h,iconVariant:"loading",iconLoadingStatus:{success:i,fail:!!e},primaryCta:r&&o?{label:"Open Farcaster app",onClick:o}:void 0,onBack:s,onClose:c,watermark:!0}:{title:e?e.message:"Requesting signer from Farcaster",subtitle:e?e.detail:"This should only take a moment",icon:h,iconVariant:"loading",iconLoadingStatus:{success:i,fail:!!e},onBack:s,onClose:c,watermark:!0,children:r&&x.isMobile&&t.jsx(A,{children:t.jsx(B,{text:"Take me to Farcaster",url:r,color:S})})}:{title:"Add a signer to Farcaster",subtitle:`This will allow ${u} to add casts, likes, follows, and more on your behalf.`,onBack:s,onClose:c,watermark:!0,children:t.jsxs(P,{children:[t.jsx(R,{children:r?t.jsx(E,{url:r,size:275,squareLogoElement:h}):t.jsx(V,{children:t.jsx(O,{})})}),t.jsxs(L,{children:[t.jsx(N,{children:"Or copy this link and paste it into a phone browser to open the Farcaster app."}),r&&t.jsx(q,{text:r,itemName:"link",color:S})]})]})});let A=n.div`
  margin-top: 24px;
`,P=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`,R=n.div`
  padding: 24px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 275px;
`,L=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`,N=n.div`
  font-size: 0.875rem;
  text-align: center;
  color: var(--privy-color-foreground-2);
`,V=n.div`
  position: relative;
  width: 82px;
  height: 82px;
`;const Y={component:()=>{let{lastScreen:u,navigateBack:m,data:i}=F(),e=T(),{requestFarcasterSignerStatus:r,closePrivyModal:s}=I(),[c,o]=d.useState(void 0),[k,v]=d.useState(!1),[b,w]=d.useState(!1),g=d.useRef([]),a=i==null?void 0:i.farcasterSigner;d.useEffect((()=>{let C=Date.now(),l=setInterval((async()=>{if(!(a!=null&&a.public_key))return clearInterval(l),void o({retryable:!0,message:"Connect failed",detail:"Something went wrong. Please try again."});a.status==="approved"&&(clearInterval(l),v(!1),w(!0),g.current.push(setTimeout((()=>s({shouldCallAuthOnSuccess:!1,isSuccess:!0})),y)));let p=await r(a==null?void 0:a.public_key),j=Date.now()-C;p.status==="approved"?(clearInterval(l),v(!1),w(!0),g.current.push(setTimeout((()=>s({shouldCallAuthOnSuccess:!1,isSuccess:!0})),y))):j>3e5?(clearInterval(l),o({retryable:!0,message:"Connect failed",detail:"The request timed out. Try again."})):p.status==="revoked"&&(clearInterval(l),o({retryable:!0,message:"Request rejected",detail:"The request was rejected. Please try again."}))}),2e3);return()=>{clearInterval(l),g.current.forEach((p=>clearTimeout(p)))}}),[]);let f=(a==null?void 0:a.status)==="pending_approval"?a.signer_approval_url:void 0;return t.jsx(_,{appName:e.name,loading:k,success:b,errorMessage:c,connectUri:f,onBack:u?m:void 0,onClose:s,onOpenFarcaster:()=>{f&&(window.location.href=f)}})}};export{Y as FarcasterSignerStatusScreen,_ as FarcasterSignerStatusView,Y as default};
