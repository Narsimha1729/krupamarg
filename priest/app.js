/* Krupamarg Priest · main app (classic script). Shared data (SITES, WISHES, CITIES, panchang) is injected above by index.html. */
'use strict';

/* ---------- strings (en / hi / mr) — have a native speaker review before launch ---------- */
const STR = {
 en:{today:'Today',devotees:'Devotees',calendar:'Calendar',me:'Profile',namaskar:'Namaskar',active:'Active sankalps',readToday:'Read today',toRead:'To read',newS:'New',endingSoon:'Ending in 7 days',
  startReading:'Start reading',readAll:'Read-aloud mode',firstRead:'New sankalps — read for the first time',completions:'Completion poojas',nothing:'Nothing here today.',
  search:'Search by name, gotra or wish',all:'All',notRead:'Not read today',ending:'Ending soon',daysLeft:'days left',ended:'Deadline passed',
  markRead:'Mark sankalp read',markedRead:'Read today ✓',sendPhoto:'Send photo',sendBlessing:'Send blessing',whatsapp:'WhatsApp',call:'Call',
  sankalp:'Sankalp',family:'Family',vedic:'Vedic & birth details',devotion:'Devotion progress',upcoming:'Upcoming vrat days',notes:'Private notes',history:'Sent to devotee',
  notesHint:'Only priests of this temple see these notes.',started:'Started',deadline:'Deadline',completion:'Completion pooja',wish:'Wish',
  gotra:'Gotra',rashi:'Rashi',nak:'Nakshatra',born:'Born',place:'Birth place',city:'Lives in',gender:'Gender',
  todayPlan:'Today’s plan',overall:'Overall',mantra:'Mantra today',streak:'Days in a row',none:'None',
  prev:'Previous',next:'Skip',read:'Read ✓',of:'of',allRead:'All sankalps read for today. 🙏',back:'Back',close:'Close',
  blessingPh:'Write a short blessing or update…',send:'Send',sent:'Sent to the devotee.',cancel:'Cancel',
  print:'Print today’s list',signout:'Sign out',lang:'Language',temple:'Temple',help:'Help',
  noDevotees:'No devotees have shared their sankalp with this temple yet.',sample:'Sample data — not real devotees.',exitSample:'Exit sample',
  readOf:'{a} of {b} read today',dayLeft:'day left',waMsg:'🙏 Namaskar {name}. Your sankalp was read today at {temple}. — {priest}',reading:'Sankalp read in your name',photo:'Photo from the temple',message:'Blessing',
  next30:'Next 30 days',deadlineOf:'Deadline',completionOf:'Completion pooja',
  signin:'Sign in',request:'Request access',email:'Email',password:'Password',name:'Your name',wantTemple:'Temple you serve',
  pendingT:'Waiting for approval',pendingP:'Your request has reached the temple admin. You can use the app once they approve it.',checkAgain:'Check again',
  setupT:'Priest app not connected yet',setupP:'The temple admin needs to connect Krupamarg to its online database. Until then you can explore with sample data.',trySample:'Explore with sample data'},
 hi:{today:'आज',devotees:'भक्त',calendar:'कैलेंडर',me:'प्रोफ़ाइल',namaskar:'नमस्कार',active:'सक्रिय संकल्प',readToday:'आज पढ़े',toRead:'पढ़ने हैं',newS:'नए',endingSoon:'7 दिन में पूर्ण',
  startReading:'पढ़ना शुरू करें',readAll:'संकल्प पाठ मोड',firstRead:'नए संकल्प — पहली बार पढ़ें',completions:'पूर्णाहुति पूजा',nothing:'आज कुछ नहीं।',
  search:'नाम, गोत्र या मनोकामना से खोजें',all:'सभी',notRead:'आज नहीं पढ़े',ending:'जल्द पूर्ण',daysLeft:'दिन बाकी',ended:'समय सीमा बीत गई',
  markRead:'संकल्प पढ़ा',markedRead:'आज पढ़ा ✓',sendPhoto:'फ़ोटो भेजें',sendBlessing:'आशीर्वाद भेजें',whatsapp:'व्हाट्सऐप',call:'कॉल',
  sankalp:'संकल्प',family:'परिवार',vedic:'वैदिक व जन्म विवरण',devotion:'साधना प्रगति',upcoming:'आगामी व्रत',notes:'निजी नोट्स',history:'भक्त को भेजा',
  notesHint:'ये नोट्स केवल इस मंदिर के पुजारी देखते हैं।',started:'आरंभ',deadline:'समय सीमा',completion:'पूर्णाहुति पूजा',wish:'मनोकामना',
  gotra:'गोत्र',rashi:'राशि',nak:'नक्षत्र',born:'जन्म',place:'जन्म स्थान',city:'निवास',gender:'लिंग',
  todayPlan:'आज की साधना',overall:'कुल',mantra:'आज का जप',streak:'लगातार दिन',none:'कोई नहीं',
  prev:'पिछला',next:'छोड़ें',read:'पढ़ा ✓',of:'में से',allRead:'आज के सभी संकल्प पढ़ लिए। 🙏',back:'वापस',close:'बंद करें',
  blessingPh:'छोटा आशीर्वाद या संदेश लिखें…',send:'भेजें',sent:'भक्त को भेज दिया।',cancel:'रद्द करें',
  print:'आज की सूची प्रिंट करें',signout:'साइन आउट',lang:'भाषा',temple:'मंदिर',help:'सहायता',
  noDevotees:'अभी किसी भक्त ने इस मंदिर से संकल्प साझा नहीं किया है।',sample:'नमूना डेटा — असली भक्त नहीं।',exitSample:'नमूना बंद करें',
  readOf:'{b} में से {a} आज पढ़े',dayLeft:'दिन बाकी',waMsg:'🙏 नमस्कार {name}। आज {temple} में आपका संकल्प पढ़ा गया। — {priest}',reading:'आपके नाम से संकल्प पढ़ा गया',photo:'मंदिर से फ़ोटो',message:'आशीर्वाद',
  next30:'अगले 30 दिन',deadlineOf:'समय सीमा',completionOf:'पूर्णाहुति पूजा',
  signin:'साइन इन',request:'पहुँच का अनुरोध',email:'ईमेल',password:'पासवर्ड',name:'आपका नाम',wantTemple:'आपका मंदिर',
  pendingT:'स्वीकृति की प्रतीक्षा',pendingP:'आपका अनुरोध मंदिर व्यवस्थापक तक पहुँच गया है। स्वीकृति के बाद आप ऐप उपयोग कर सकेंगे।',checkAgain:'फिर जाँचें',
  setupT:'पुजारी ऐप अभी जुड़ा नहीं है',setupP:'मंदिर व्यवस्थापक को कृपामार्ग को ऑनलाइन डेटाबेस से जोड़ना होगा। तब तक नमूना डेटा देखें।',trySample:'नमूना डेटा देखें'},
 mr:{today:'आज',devotees:'भक्त',calendar:'दिनदर्शिका',me:'प्रोफाइल',namaskar:'नमस्कार',active:'सक्रिय संकल्प',readToday:'आज वाचले',toRead:'वाचायचे',newS:'नवीन',endingSoon:'7 दिवसांत पूर्ण',
  startReading:'वाचन सुरू करा',readAll:'संकल्प वाचन मोड',firstRead:'नवीन संकल्प — प्रथम वाचन',completions:'पूर्णाहुती पूजा',nothing:'आज काही नाही.',
  search:'नाव, गोत्र किंवा इच्छा शोधा',all:'सर्व',notRead:'आज न वाचलेले',ending:'लवकर पूर्ण',daysLeft:'दिवस बाकी',ended:'मुदत संपली',
  markRead:'संकल्प वाचला',markedRead:'आज वाचला ✓',sendPhoto:'फोटो पाठवा',sendBlessing:'आशीर्वाद पाठवा',whatsapp:'व्हॉट्सॲप',call:'कॉल',
  sankalp:'संकल्प',family:'कुटुंब',vedic:'वैदिक व जन्म तपशील',devotion:'साधना प्रगती',upcoming:'येणारे व्रत',notes:'खाजगी नोंदी',history:'भक्ताला पाठवले',
  notesHint:'या नोंदी फक्त या मंदिराचे पुजारी पाहतात.',started:'सुरुवात',deadline:'मुदत',completion:'पूर्णाहुती पूजा',wish:'इच्छा',
  gotra:'गोत्र',rashi:'राशी',nak:'नक्षत्र',born:'जन्म',place:'जन्मस्थान',city:'राहणे',gender:'लिंग',
  todayPlan:'आजची साधना',overall:'एकूण',mantra:'आजचा जप',streak:'सलग दिवस',none:'काही नाही',
  prev:'मागील',next:'पुढे',read:'वाचला ✓',of:'पैकी',allRead:'आजचे सर्व संकल्प वाचले. 🙏',back:'मागे',close:'बंद',
  blessingPh:'छोटा आशीर्वाद किंवा संदेश लिहा…',send:'पाठवा',sent:'भक्ताला पाठवले.',cancel:'रद्द',
  print:'आजची यादी प्रिंट करा',signout:'साइन आउट',lang:'भाषा',temple:'मंदिर',help:'मदत',
  noDevotees:'अजून कोणत्याही भक्ताने या मंदिराशी संकल्प शेअर केलेला नाही.',sample:'नमुना डेटा — खरे भक्त नाहीत.',exitSample:'नमुना बंद करा',
  readOf:'{b} पैकी {a} आज वाचले',dayLeft:'दिवस बाकी',waMsg:'🙏 नमस्कार {name}. आज {temple} येथे तुमचा संकल्प वाचला. — {priest}',reading:'तुमच्या नावाने संकल्प वाचला',photo:'मंदिरातील फोटो',message:'आशीर्वाद',
  next30:'पुढील 30 दिवस',deadlineOf:'मुदत',completionOf:'पूर्णाहुती पूजा',
  signin:'साइन इन',request:'प्रवेशाची विनंती',email:'ईमेल',password:'पासवर्ड',name:'तुमचे नाव',wantTemple:'तुमचे मंदिर',
  pendingT:'मंजुरीची प्रतीक्षा',pendingP:'तुमची विनंती मंदिर व्यवस्थापकाकडे पोहोचली आहे. मंजुरीनंतर ॲप वापरता येईल.',checkAgain:'पुन्हा तपासा',
  setupT:'पुजारी ॲप अजून जोडलेले नाही',setupP:'मंदिर व्यवस्थापकाने कृपामार्ग ऑनलाइन डेटाबेसशी जोडणे आवश्यक आहे. तोपर्यंत नमुना डेटा पहा.',trySample:'नमुना डेटा पहा'}
};
const LANGS=[['en','English'],['hi','हिंदी'],['mr','मराठी']];

/* ---------- helpers ---------- */
const $=s=>document.querySelector(s);
const today=new Date();today.setHours(0,0,0,0);
const iso=d=>{const x=new Date(d);return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0')};
const fromIso=s=>{const [y,m,d]=String(s).split('-').map(Number);return new Date(y,m-1,d)};
const addDays=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
const daysBetween=(a,b)=>Math.round((fromIso(typeof b==='string'?b:iso(b))-fromIso(typeof a==='string'?a:iso(a)))/86400000);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const site=id=>SITES.find(s=>s.id===id)||{id,name:id,place:'',deity:'',mantra:''};
const wishName=k=>(WISHES.find(w=>w[0]===k)||[])[1]||k||'';
const initials=n=>String(n||'?').trim().split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase();
function toast(msg){const t=$('#toast');t.textContent=msg;t.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>t.hidden=true,2400)}
const LOCALE={en:'en-IN',hi:'hi-IN',mr:'mr-IN'};

/* temple coordinates for panchang (approximate) */
const TEMPLE_LL={grish:[20.02,75.17],trimb:[19.93,73.53],siddhi:[19.02,72.83],somnath:[20.89,70.40],ambaji:[24.33,72.85],tulja:[18.01,76.13]};
Object.entries(TEMPLE_LL).forEach(([k,v])=>CITIES['@'+k]=v);
const S={user:{city:'Pune'}};  // shim used by the shared panchang()
const pcFor=(templeId,d)=>{S.user.city=TEMPLE_LL[templeId]?'@'+templeId:'Pune';return panchang(d)};

/* ---------- state ---------- */
const P={screen:'boot',tab:'today',lang:'en',sample:false,temple:null,priest:null,user:null,devotees:[],notes:{},proofs:{},detail:null,readIdx:0,filter:'all',q:'',dialog:null};
try{const l=localStorage.getItem('km.priest.lang');if(l&&STR[l])P.lang=l;const t=localStorage.getItem('km.priest.temple');if(t)P.temple=t}catch(e){}
const T=k=>(STR[P.lang]&&STR[P.lang][k])||STR.en[k]||k;
const fmt=d=>(typeof d==='string'?fromIso(d):d).toLocaleDateString(LOCALE[P.lang],{day:'numeric',month:'short'});
const fmtLong=d=>(typeof d==='string'?fromIso(d):d).toLocaleDateString(LOCALE[P.lang],{weekday:'long',day:'numeric',month:'long'});
const fmtTime=ms=>ms?new Date(ms).toLocaleString(LOCALE[P.lang],{dateStyle:'medium',timeStyle:'short'}):'';

/* ---------- sample data (clearly labelled; never mixed with real data) ---------- */
function sampleDevotees(t){const mk=(o,i)=>({uid:'s'+i,temple:t,consent:true,updatedAt:Date.now()-i*3600e3,lang:'mr',sites:[t],mantraToday:(i*37)%220,streak:(i*3)%9,
  doneTotal:20+i*7,planTotal:180,todayDone:i%4,todayTotal:4,outcome:null,whatsapp:'',...o});
 return[
  {name:'Sample Devotee A',gender:'Female',dob:'1994-07-21',tob:'05:40',pob:'Pune',city:'Pune',gotra:'Kashyap',rashi:'Simha',nakshatra:'Magha',family:[{name:'Sample Husband A',rel:'Spouse'}],wish:'marriage',wishText:'A happy married life',startedOn:iso(addDays(today,-1)),deadline:iso(addDays(today,40))},
  {name:'Sample Devotee B',gender:'Male',dob:'2008-02-11',tob:'',pob:'Nashik',city:'Nashik',gotra:'Bharadwaj',rashi:'Kumbha',nakshatra:'Shatabhisha',family:[{name:'Sample Mother B',rel:'Mother'},{name:'Sample Father B',rel:'Father'}],wish:'exam',wishText:'Clear Class 12 board exams',startedOn:iso(addDays(today,-30)),deadline:iso(addDays(today,1))},
  {name:'Sample Devotee C',gender:'Male',dob:'1985-11-02',tob:'09:15',pob:'Mumbai',city:'Mumbai',gotra:'Vasishtha',rashi:'Tula',nakshatra:'Swati',family:[],wish:'business',wishText:'Steady growth for the shop',startedOn:iso(addDays(today,-10)),deadline:iso(addDays(today,5))},
  {name:'Sample Devotee D',gender:'Female',dob:'1962-04-30',tob:'',pob:'Chh. Sambhajinagar',city:'Chh. Sambhajinagar',gotra:'Atri',rashi:'Vrishabha',nakshatra:'Rohini',family:[{name:'Sample Son D',rel:'Son'}],wish:'health',wishText:'Good recovery after surgery, alongside the doctor’s treatment',startedOn:iso(today),deadline:iso(addDays(today,21))},
  {name:'Sample Devotee E',gender:'Male',dob:'1990-01-17',tob:'22:05',pob:'Ahmedabad',city:'Ahmedabad',gotra:'Gautam',rashi:'Mesha',nakshatra:'Ashwini',family:[{name:'Sample Wife E',rel:'Spouse'},{name:'Sample Daughter E',rel:'Daughter'}],wish:'job',wishText:'A stable job in the city',startedOn:iso(addDays(today,-3)),deadline:iso(addDays(today,60))}
 ].map(mk)}

/* ---------- derived ---------- */
const active=d=>d.deadline&&daysBetween(today,d.deadline)>=0;
const readToday=d=>(P.notes[d.uid]||{}).lastRead===iso(today);
const isNew=d=>!(P.notes[d.uid]||{}).readCount;
const daysLeft=d=>daysBetween(today,d.deadline);
const pctPeriod=d=>{const tot=Math.max(1,daysBetween(d.startedOn||iso(today),d.deadline));return Math.max(0,Math.min(100,Math.round((tot-daysLeft(d))/tot*100)))};
const completionDate=d=>iso(addDays(fromIso(d.deadline),-1));
function vratDays(t,from,to,max=6){const out=[];for(let i=0;i<=Math.min(60,daysBetween(from,to));i++){const d=addDays(fromIso(from),i),k=specialDay(pcFor(t,d).t);if(k&&!(out.length&&out[out.length-1].k===k&&daysBetween(out[out.length-1].d,d)<2))out.push({d,k});if(out.length>=max)break}return out}

/* ---------- cloud bridge (window.PCloud is set by the module in index.html) ---------- */
const cloud=()=>window.PCloud;
let unsub=[];
function subscribe(){unsub.forEach(f=>f());unsub=[];if(P.sample||!cloud()||!P.temple)return;
 unsub.push(cloud().watchDevotees(P.temple,list=>{P.devotees=list;render()}));
 unsub.push(cloud().watchNotes(P.temple,map=>{P.notes=map;render()}))}
async function boot(){
 if(!window.KM_FIREBASE){P.screen='setup';render();return}
 if(!cloud()){P.screen='boot';render();return}
 cloud().onUser(async u=>{P.user=u;if(!u){P.screen='login';render();return}
  const pr=await cloud().getPriest();P.priest=pr;
  if(!pr||!pr.approved||!(pr.temples||[]).length){P.screen='pending';render();return}
  if(!P.temple||!pr.temples.includes(P.temple))P.temple=pr.temples[0];
  P.screen='app';subscribe();render()})}
window.addEventListener('pcloud',boot);

function startSample(){P.sample=true;P.priest={name:'Sample Priest',temples:['grish','trimb']};P.temple=P.temple&&TEMPLE_LL[P.temple]?P.temple:'grish';
 P.devotees=sampleDevotees(P.temple);P.notes={s1:{lastRead:iso(addDays(today,-1)),readCount:12,text:'Family visits every Monday.'},s2:{readCount:4},s4:{readCount:2,lastRead:iso(today)}};P.proofs={};P.screen='app';P.tab='today';render()}
function exitSample(){P.sample=false;P.devotees=[];P.notes={};P.priest=null;P.screen='boot';boot();render()}

/* ---------- actions ---------- */
async function markRead(d){const n=P.notes[d.uid]||{};if(n.lastRead===iso(today)){toast(T('markedRead'));return}
 const upd={...n,lastRead:iso(today),readCount:(n.readCount||0)+1};P.notes[d.uid]=upd;render();
 const proof={type:'reading',text:'',byName:P.priest.name};
 if(P.sample){(P.proofs[d.uid]=P.proofs[d.uid]||[]).unshift({...proof,at:Date.now()});return}
 try{await Promise.all([cloud().saveNote(P.temple,d.uid,{lastRead:upd.lastRead,readCount:upd.readCount}),cloud().addProof(P.temple,d.uid,proof)])}catch(e){toast('Could not save. Check internet.')}}
async function sendProof(d,proof){const full={...proof,byName:P.priest.name};
 if(P.sample){(P.proofs[d.uid]=P.proofs[d.uid]||[]).unshift({...full,at:Date.now()});toast(T('sent'));render();return}
 try{await cloud().addProof(P.temple,d.uid,full);toast(T('sent'));P.proofs[d.uid]=null;render()}catch(e){toast('Could not send. Check internet.')}}
let noteTimer=null;
function saveNoteText(uid,text){P.notes[uid]={...(P.notes[uid]||{}),text};if(P.sample)return;clearTimeout(noteTimer);noteTimer=setTimeout(()=>cloud().saveNote(P.temple,uid,{text}).catch(()=>toast('Could not save note.')),700)}
const loadingProofs=new Set();
async function loadProofs(uid){if(P.sample){P.proofs[uid]=P.proofs[uid]||[];return}try{P.proofs[uid]=await cloud().listProofs(P.temple,uid)}catch(e){P.proofs[uid]=[]}render()}
function compressImage(file){return new Promise((res,rej)=>{const img=new Image(),url=URL.createObjectURL(file);img.onload=()=>{const max=1000,k=Math.min(1,max/Math.max(img.width,img.height));
 const c=document.createElement('canvas');c.width=Math.round(img.width*k);c.height=Math.round(img.height*k);c.getContext('2d').drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(url);
 let q=.75,out=c.toDataURL('image/jpeg',q);while(out.length>600000&&q>.35){q-=.1;out=c.toDataURL('image/jpeg',q)}res(out)};img.onerror=rej;img.src=url})}
const waLink=d=>'https://wa.me/91'+d.whatsapp+'?text='+encodeURIComponent(T('waMsg').replace('{name}',d.name.split(' ')[0]).replace('{temple}',site(P.temple).name).replace('{priest}',P.priest.name));

/* ---------- icons ---------- */
const IC={sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
 users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
 cal:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
 book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M8 7h8M8 11h6"/>',
 check:'<path d="M20 6 9 17l-5-5"/>',camera:'<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>',
 msg:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
 wa:'<path d="M3 21l1.6-4.8A8.5 8.5 0 1 1 8 19.6z"/><path d="M9 9.5c.5 2.5 2.5 4.6 5 5.5l1.2-1.3 2 1-.4 1.6c-3.8.4-8.4-4.2-8-8l1.6-.4 1 2z"/>',
 printer:'<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
 search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',chev:'<path d="m9 18 6-6-6-6"/>',x:'<path d="M18 6 6 18M6 6l12 12"/>',
 lotus:'<path d="M12 20c-4.5 0-8-2.5-9-6 3 0 5.5 1 7 3"/><path d="M12 20c4.5 0 8-2.5 9-6-3 0-5.5 1-7 3"/><path d="M12 20c-2.6-1.8-4-4.4-4-7.3C8 9.7 9.6 7 12 5c2.4 2 4 4.7 4 7.7 0 2.9-1.4 5.5-4 7.3z"/>'};
const ic=k=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[k]}</svg>`;

/* ---------- views ---------- */
const sampleBar=()=>P.sample?`<div class="demo"><span>${T('sample')}</span><button type="button" data-act="exitSample">${T('exitSample')}</button></div>`:'';
const avatar=d=>`<span class="avatar">${esc(initials(d.name))}</span>`;
const dlPill=d=>{const n=daysLeft(d);return n<0?`<span class="pill warn">${T('ended')}</span>`:`<span class="pill ${n<=7?'warn':''}">${n} ${n===1?T('dayLeft'):T('daysLeft')}</span>`};
const row=d=>`<button class="card drow" data-open="${esc(d.uid)}">${avatar(d)}<span class="drow-main"><strong>${esc(d.name)}</strong><span class="small muted">${esc(wishName(d.wish))} · ${esc(d.gotra||'—')}</span></span>
 <span class="drow-end">${dlPill(d)}${readToday(d)?`<span class="okdot" title="${T('markedRead')}">${ic('check')}</span>`:''}</span></button>`;

function vSetup(){return `<section class="screen stack" style="padding-top:6px">${hero(T('setupT'),T('setupP'))}
 <button class="btn-primary btn-block" data-act="sample">${T('trySample')}</button>
 <div class="card"><h3>For the temple admin</h3><p class="small muted">Create the Firebase project and paste its config into <code>firebase-config.js</code>. Step-by-step guide: <a href="https://github.com/Narsimha1729/krupamarg/blob/main/SETUP.md" target="_blank" rel="noopener">SETUP.md</a>.</p></div>
 ${langCard()}</section>`}
function hero(t,p){return `<div class="ganesh-hero">${typeof HERO_ART!=='undefined'?HERO_ART:''}<svg class="ganesh" viewBox="0 0 200 230" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#ganeshArt"/></svg>
 <h1>${esc(t)}</h1><p class="tag" style="max-width:300px">${esc(p)}</p></div>`}
function vBoot(){return `<section class="screen stack" style="padding-top:40px;align-items:center"><p class="muted">Loading…</p></section>`}
function vLogin(){const m=P.loginMode||'in';return `<section class="screen stack">${hero('Krupamarg Priest','कृपामार्ग · पुजारी')}
 <div class="seg"><button class="${m==='in'?'on':''}" data-act="mode-in">${T('signin')}</button><button class="${m==='up'?'on':''}" data-act="mode-up">${T('request')}</button></div>
 <form class="card" id="authForm">
  ${m==='up'?`<label class="field">${T('name')}<input id="aName" autocomplete="name" required></label>
  <label class="field">${T('wantTemple')}<select id="aTemple">${SITES.map(s=>`<option value="${s.id}">${esc(s.name)}</option>`).join('')}</select></label>`:''}
  <label class="field">${T('email')}<input id="aEmail" type="email" autocomplete="email" required></label>
  <label class="field">${T('password')}<input id="aPass" type="password" minlength="6" autocomplete="${m==='up'?'new-password':'current-password'}" required></label>
  <button class="btn-primary btn-block" type="submit">${m==='up'?T('request'):T('signin')}</button>
  <p class="tiny muted" id="authErr" role="alert"></p></form>
 ${langCard()}</section>`}
function vPending(){return `<section class="screen stack">${hero(T('pendingT'),T('pendingP'))}
 <div class="card"><dl class="kv"><dt>${T('name')}</dt><dd>${esc(P.priest&&P.priest.name||'')}</dd><dt>${T('email')}</dt><dd>${esc(P.user&&P.user.email||'')}</dd><dt>ID</dt><dd style="font-size:12px">${esc(P.user&&P.user.uid||'')}</dd></dl></div>
 <button class="btn-primary btn-block" data-act="recheck">${T('checkAgain')}</button><button class="btn-block" data-act="signout">${T('signout')}</button></section>`}
function langCard(){return `<div class="row" style="justify-content:center;gap:6px">${LANGS.map(([k,l])=>`<button class="chip" data-lang="${k}" aria-pressed="${P.lang===k}">${l}</button>`).join('')}</div>`}

function tToday(){const act=P.devotees.filter(active),toRead=act.filter(d=>!readToday(d)),fresh=act.filter(isNew),comp=act.filter(d=>completionDate(d)===iso(today)||daysLeft(d)===0),pc=pcFor(P.temple,today),sp=specialDay(pc.t);
 return `<section class="screen stack">${sampleBar()}
 <div class="row between"><div><p class="eyebrow dev" style="letter-spacing:0;text-transform:none;font-size:14px">${T('namaskar')}</p><h1>${esc(P.priest.name.split(' ').slice(0,2).join(' '))}</h1></div><span class="pill">${esc(site(P.temple).name)}</span></div>
 <div class="hero">${HERO_ART}<span class="eyebrow">${esc(fmtLong(today))}</span>
  <div class="row" style="align-items:flex-end;gap:10px;margin-top:4px"><span class="count">${toRead.length}</span><span style="padding-bottom:8px;font-weight:700;font-size:17px">${T('toRead')}</span></div>
  <p class="small muted">${T('readOf').replace('{a}',act.length-toRead.length).replace('{b}',act.length)}</p>
  <button class="btn-gold" data-act="readmode" ${toRead.length?'':'disabled'}>${ic('book')} ${T('startReading')}</button></div>
 <div class="grid3"><div class="stat"><b>${act.length}</b><span>${T('active')}</span></div><div class="stat"><b>${fresh.length}</b><span>${T('newS')}</span></div><div class="stat"><b>${act.filter(d=>daysLeft(d)<=7).length}</b><span>${T('endingSoon')}</span></div></div>
 <div class="card"><div class="row between"><span class="eyebrow" style="color:var(--fg)">Panchang · ${pc.vara}</span>${sp?`<span class="pill warn">${sp}</span>`:''}</div>
  <span class="pgrid"><span><span class="k">Tithi</span><strong>${pc.tithi}</strong></span><span><span class="k">Nakshatra</span><strong>${pc.nak}</strong></span><span><span class="k">Sunrise</span><strong>${pc.rise}</strong></span><span><span class="k">Rahu kaal</span><strong>${pc.rahu}</strong></span></span></div>
 ${comp.length?`<div class="stack" style="gap:8px"><h2>${T('completions')}</h2>${comp.map(row).join('')}</div>`:''}
 <div class="stack" style="gap:8px"><h2>${T('firstRead')}</h2>${fresh.length?fresh.map(row).join(''):`<p class="small muted">${T('nothing')}</p>`}</div>
 ${act.length?'':`<div class="card"><p class="small muted">${T('noDevotees')}</p></div>`}
 </section>`}

function tDevotees(){const q=P.q.trim().toLowerCase();let list=[...P.devotees].sort((a,b)=>(active(b)-active(a))||daysLeft(a)-daysLeft(b));
 if(P.filter==='notread')list=list.filter(d=>active(d)&&!readToday(d));if(P.filter==='ending')list=list.filter(d=>active(d)&&daysLeft(d)<=7);if(P.filter==='new')list=list.filter(isNew);
 if(q)list=list.filter(d=>[d.name,d.gotra,d.wishText,wishName(d.wish),...(d.family||[]).map(f=>f.name)].join(' ').toLowerCase().includes(q));
 return `<section class="screen stack">${sampleBar()}<h1>${T('devotees')} <span class="muted" style="font-size:18px">${P.devotees.length}</span></h1>
 <label class="searchbox">${ic('search')}<input id="q" type="search" placeholder="${T('search')}" value="${esc(P.q)}" autocomplete="off"></label>
 <div class="chips">${[['all',T('all')],['notread',T('notRead')],['ending',T('ending')],['new',T('newS')]].map(([k,l])=>`<button class="chip" data-filter="${k}" aria-pressed="${P.filter===k}">${l}</button>`).join('')}</div>
 <div class="stack" style="gap:8px">${list.map(row).join('')||`<p class="small muted">${P.devotees.length?T('nothing'):T('noDevotees')}</p>`}</div></section>`}

function vDetail(){const d=P.devotees.find(x=>x.uid===P.detail);if(!d){P.detail=null;return tDevotees()}
 if(P.proofs[d.uid]==null&&!loadingProofs.has(d.uid)){loadingProofs.add(d.uid);loadProofs(d.uid).finally(()=>loadingProofs.delete(d.uid))}
 const n=P.notes[d.uid]||{},pr=P.proofs[d.uid],vr=active(d)?vratDays(P.temple,iso(today),d.deadline,6):[],pct=d.planTotal?Math.round(d.doneTotal/d.planTotal*100):0;
 const kv=(pairs)=>`<dl class="kv">${pairs.filter(p=>p[1]).map(([k,v])=>`<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>`;
 return `<section class="screen stack">${sampleBar()}<button class="btn-ghost" data-act="closeDetail">← ${T('back')}</button>
 <div class="row" style="flex-wrap:nowrap;gap:14px">${avatar(d)}<div style="min-width:0"><h1 style="font-size:26px">${esc(d.name)}</h1><p class="small muted">${esc(wishName(d.wish))} · ${dlPill(d)}</p></div></div>
 <div class="actions">
  <button class="btn-primary" data-act="read" ${readToday(d)?'disabled':''}>${ic('check')} ${readToday(d)?T('markedRead'):T('markRead')}</button>
  <label class="btn act">${ic('camera')} ${T('sendPhoto')}<input type="file" accept="image/*" capture="environment" id="photoIn" hidden></label>
  <button class="act" data-act="bless">${ic('msg')} ${T('sendBlessing')}</button>
  ${d.whatsapp?`<a class="btn act" target="_blank" rel="noopener" href="${waLink(d)}">${ic('wa')} ${T('whatsapp')}</a><a class="btn act" href="tel:+91${esc(d.whatsapp)}">${ic('phone')} ${T('call')}</a>`:''}
 </div>
 <div class="card"><h3>${T('sankalp')}</h3><p style="font-size:17px">“${esc(d.wishText)}”</p>
  <div class="bar" role="progressbar" aria-valuenow="${pctPeriod(d)}" aria-valuemin="0" aria-valuemax="100"><b style="width:${pctPeriod(d)}%"></b></div>
  ${kv([[T('started'),d.startedOn?fmt(d.startedOn):''],[T('deadline'),fmt(d.deadline)],[T('completion'),fmt(completionDate(d))]])}</div>
 <div class="card"><h3>${T('family')}</h3>${(d.family||[]).length?d.family.map(f=>`<div class="list-row"><span>${esc(f.name)}</span><span class="small muted">${esc(f.rel)}</span></div>`).join(''):`<p class="small muted">${T('none')}</p>`}</div>
 <div class="card"><h3>${T('vedic')}</h3>${kv([[T('gotra'),esc(d.gotra)],[T('rashi'),esc(d.rashi)],[T('nak'),esc(d.nakshatra)],[T('born'),d.dob?esc(fmt(d.dob)+' '+d.dob.slice(0,4)+(d.tob?' · '+d.tob:'')):''],[T('place'),esc(d.pob)],[T('city'),esc(d.city)],[T('gender'),esc(d.gender)]])}</div>
 <div class="card"><h3>${T('devotion')}</h3><div class="grid3"><div class="stat"><b>${d.todayDone||0}/${d.todayTotal||0}</b><span>${T('todayPlan')}</span></div><div class="stat"><b>${pct}%</b><span>${T('overall')}</span></div><div class="stat"><b>${d.mantraToday||0}</b><span>${T('mantra')}</span></div></div>
  <p class="tiny muted">${T('streak')}: ${d.streak||0} · ${fmtTime(d.updatedAt)}</p></div>
 ${vr.length?`<div class="card"><h3>${T('upcoming')}</h3>${vr.map(x=>`<div class="list-row"><span>${x.k}</span><span class="pill">${fmt(x.d)}</span></div>`).join('')}</div>`:''}
 <div class="card"><h3>${T('notes')}</h3><textarea id="noteTxt" data-uid="${esc(d.uid)}" placeholder="…">${esc(n.text||'')}</textarea><p class="tiny muted">${T('notesHint')}</p></div>
 <div class="card"><h3>${T('history')}</h3>${pr===undefined?'<p class="small muted">…</p>':(pr&&pr.length?pr.map(x=>`<div class="list-row" style="align-items:flex-start"><span style="min-width:0">${x.photo?`<img src="${x.photo}" alt="" class="thumb">`:''}<strong class="small">${T(x.type==='reading'?'reading':x.type==='photo'?'photo':'message')}</strong>${x.text?`<br><span class="small">${esc(x.text)}</span>`:''}</span><span class="tiny muted" style="white-space:nowrap">${fmtTime(x.at)}</span></div>`).join(''):`<p class="small muted">${T('none')}</p>`)}</div>
 </section>`}

function vRead(){const q=P.devotees.filter(d=>active(d)&&!readToday(d));const total=P.devotees.filter(active).length;
 if(!q.length)return `<section class="reader"><button class="rclose" data-act="closeRead" aria-label="${T('close')}">${ic('x')}</button><div class="rbody"><p class="rname" style="font-size:30px">${T('allRead')}</p></div><div class="rnav"><button class="btn-gold" data-act="closeRead">${T('close')}</button></div></section>`;
 const i=Math.min(P.readIdx,q.length-1),d=q[i];
 return `<section class="reader" id="reader"><button class="rclose" data-act="closeRead" aria-label="${T('close')}">${ic('x')}</button>
 <p class="rcount">${total-q.length+1} / ${total}</p>
 <div class="rbody">
  <p class="rname">${esc(d.name)}</p>
  ${(d.family||[]).length?`<p class="rfam">${d.family.map(f=>esc(f.name)).join(' · ')}</p>`:''}
  <p class="rmeta">${[d.gotra?T('gotra')+': '+esc(d.gotra):'',d.nakshatra?T('nak')+': '+esc(d.nakshatra):'',d.rashi?T('rashi')+': '+esc(d.rashi):''].filter(Boolean).join('<br>')}</p>
  <p class="rwish"><span>${esc(wishName(d.wish))}</span>“${esc(d.wishText)}”</p>
 </div>
 <div class="rnav"><button data-act="rprev" ${i===0?'disabled':''}>${T('prev')}</button><button class="btn-gold" data-act="rread" data-uid="${esc(d.uid)}">${T('read')}</button><button data-act="rnext">${T('next')}</button></div></section>`}

function tCalendar(){const ev=[];P.devotees.filter(active).forEach(d=>{ev.push({d:completionDate(d),k:'c',t:T('completionOf')+' · '+d.name,uid:d.uid});ev.push({d:d.deadline,k:'d',t:T('deadlineOf')+' · '+d.name,uid:d.uid})});
 const end=iso(addDays(today,30));vratDays(P.temple,iso(today),end,20).forEach(x=>ev.push({d:iso(x.d),k:'v',t:x.k}));
 const days=[...new Set(ev.map(e=>e.d))].filter(x=>x>=iso(today)&&x<=end).sort();
 return `<section class="screen stack">${sampleBar()}<h1>${T('calendar')}</h1><p class="small muted">${T('next30')} · ${esc(site(P.temple).name)}</p>
 ${days.map(day=>`<div class="card"><div class="day-head" style="margin:0">${day===iso(today)?T('today'):fmtLong(day)}</div>${ev.filter(e=>e.d===day).map(e=>e.uid?`<button class="list-row linkrow" data-open="${esc(e.uid)}"><span>${esc(e.t)}</span><span class="pill ${e.k==='c'?'warn':''}">${e.k==='c'?T('completion'):T('deadline')}</span></button>`:`<div class="list-row"><span>${esc(e.t)}</span><span class="pill">Vrat</span></div>`).join('')}</div>`).join('')||`<p class="small muted">${T('nothing')}</p>`}
 </section>`}

function tMe(){return `<section class="screen stack">${sampleBar()}<h1>${T('me')}</h1>
 <div class="card"><div class="row" style="gap:14px;flex-wrap:nowrap"><span class="avatar">${esc(initials(P.priest.name))}</span><div><h3>${esc(P.priest.name)}</h3><p class="small muted">${esc(P.sample?'':(P.user&&P.user.email)||'')}</p></div></div></div>
 <div class="card"><h3>${T('temple')}</h3>${(P.priest.temples||[]).map(t=>`<button class="select-card" data-temple="${t}" aria-pressed="${P.temple===t}"><span class="tick">✓</span><span><strong>${esc(site(t).name)}</strong><br><span class="small muted">${esc(site(t).place)}</span></span></button>`).join('')}</div>
 <div class="card"><h3>${T('lang')}</h3>${langCard()}</div>
 <button data-act="print">${ic('printer')} ${T('print')}</button>
 ${P.sample?`<button data-act="exitSample">${T('exitSample')}</button>`:`<button data-act="signout" style="color:var(--err)">${T('signout')}</button>`}
 <p class="tiny muted">${T('notesHint')}</p></section>`}

function printView(){const list=P.devotees.filter(active);
 return `<h1>${esc(site(P.temple).name)} · ${esc(fmtLong(today))}</h1><table><thead><tr><th>#</th><th>${T('devotees')}</th><th>${T('family')}</th><th>${T('gotra')}</th><th>${T('nak')}</th><th>${T('wish')}</th><th>✓</th></tr></thead>
 <tbody>${list.map((d,i)=>`<tr><td>${i+1}</td><td>${esc(d.name)}</td><td>${(d.family||[]).map(f=>esc(f.name)).join(', ')}</td><td>${esc(d.gotra||'')}</td><td>${esc(d.nakshatra||'')}</td><td>${esc(wishName(d.wish))}</td><td>${readToday(d)?'✓':''}</td></tr>`).join('')}</tbody></table>`}

/* ---------- render ---------- */
const TABS=[['today','sun'],['devotees','users'],['calendar','cal'],['me','user']];
let lastView=null;const scrollMem={};
function render(){const el=$('#app');document.documentElement.lang=P.lang;
 const reading=P.screen==='app'&&P.mode==='read';
 const key=P.screen+':'+(P.detail?'d'+P.detail:P.tab)+(reading?':r':''),same=key===lastView,top=el.scrollTop;if(lastView)scrollMem[lastView]=top;
 let html;
 if(P.screen==='setup')html=vSetup();else if(P.screen==='login')html=vLogin();else if(P.screen==='pending')html=vPending();else if(P.screen!=='app')html=vBoot();
 else if(P.detail)html=vDetail();else html={today:tToday,devotees:tDevotees,calendar:tCalendar,me:tMe}[P.tab]();
 el.innerHTML=html;$('#readerHost').innerHTML=reading?vRead():'';$('#readerHost').hidden=!reading;
 const tabs=$('#tabs');tabs.hidden=P.screen!=='app';
 if(P.screen==='app')$('#tabsIn').innerHTML=TABS.map(([k,i])=>`<button data-tab="${k}" ${P.tab===k&&!P.detail?'aria-current="page"':''}><span class="ti">${ic(i)}</span>${T(k)}</button>`).join('');
 $('#templeName').textContent=P.screen==='app'?site(P.temple).name:'';
 el.scrollTop=same?top:(scrollMem[key]||0);if(!same){const sc=el.querySelector('.screen');if(sc)sc.classList.add('enter')}lastView=key}

/* ---------- events ---------- */
document.addEventListener('click',async e=>{const b=e.target.closest('button,[data-open]');if(!b)return;const d=b.dataset;
 if(d.tab){P.detail=null;if(P.tab===d.tab){$('#app').scrollTo({top:0,behavior:'smooth'});render();return}P.tab=d.tab;render();return}
 if(d.open){P.detail=d.open;render();return}
 if(d.filter){P.filter=d.filter;render();return}
 if(d.lang){P.lang=d.lang;try{localStorage.setItem('km.priest.lang',P.lang)}catch(x){}render();return}
 if(d.temple){P.temple=d.temple;try{localStorage.setItem('km.priest.temple',P.temple)}catch(x){}P.proofs={};if(P.sample)P.devotees=sampleDevotees(P.temple);else{P.devotees=[];P.notes={};subscribe()}render();return}
 const a=d.act;if(!a)return;
 const cur=()=>P.devotees.find(x=>x.uid===P.detail);
 if(a==='sample')startSample();
 if(a==='exitSample')exitSample();
 if(a==='mode-in'||a==='mode-up'){P.loginMode=a.slice(5);render()}
 if(a==='recheck'){P.screen='boot';render();boot()}
 if(a==='signout'){unsub.forEach(f=>f());unsub=[];await cloud().signOut();P.devotees=[];P.notes={};P.priest=null;P.tab='today';P.detail=null}
 if(a==='closeDetail'){P.detail=null;render()}
 if(a==='read'){markRead(cur())}
 if(a==='bless'){openBless(cur())}
 if(a==='readmode'){P.mode='read';P.readIdx=0;render()}
 if(a==='closeRead'){P.mode=null;render()}
 if(a==='rprev'){P.readIdx=Math.max(0,P.readIdx-1);render()}
 if(a==='rnext'){const q=P.devotees.filter(x=>active(x)&&!readToday(x));P.readIdx=(P.readIdx+1)%Math.max(1,q.length);render()}
 if(a==='rread'){const dv=P.devotees.find(x=>x.uid===d.uid);if(dv){await markRead(dv);if(navigator.vibrate)navigator.vibrate(20)}render()}
 if(a==='print'){$('#print').innerHTML=printView();window.print()}
 if(a==='blessSend'){const t=$('#blessTxt').value.trim();if(!t)return;closeDialog();sendProof(cur(),{type:'message',text:t})}
 if(a==='blessCancel')closeDialog();
});
function openBless(dv){const dlg=$('#dlg');dlg.innerHTML=`<form method="dialog" class="stack"><h2>${T('sendBlessing')}</h2><p class="small muted">${esc(dv.name)}</p><textarea id="blessTxt" placeholder="${T('blessingPh')}" maxlength="500"></textarea>
 <div class="grid2"><button type="button" data-act="blessCancel">${T('cancel')}</button><button type="button" class="btn-primary" data-act="blessSend">${T('send')}</button></div></form>`;dlg.showModal();setTimeout(()=>$('#blessTxt').focus(),50)}
function closeDialog(){const dlg=$('#dlg');if(dlg.open)dlg.close()}
document.addEventListener('input',e=>{const t=e.target;if(t.id==='q'){P.q=t.value;const pos=t.selectionStart;render();const n=$('#q');n.focus();n.setSelectionRange(pos,pos)}
 if(t.id==='noteTxt')saveNoteText(t.dataset.uid,t.value)});
document.addEventListener('change',async e=>{const t=e.target;if(t.id==='photoIn'&&t.files&&t.files[0]){const dv=P.devotees.find(x=>x.uid===P.detail);toast('…');
 try{const data=await compressImage(t.files[0]);await sendProof(dv,{type:'photo',photo:data,text:''})}catch(x){toast('Could not read the photo.')}t.value=''}});
document.addEventListener('submit',async e=>{e.preventDefault();if(e.target.id!=='authForm')return;const err=$('#authErr');err.textContent='';
 const email=$('#aEmail').value.trim(),pass=$('#aPass').value;
 try{if(P.loginMode==='up')await cloud().signUp($('#aName').value.trim(),email,pass,$('#aTemple').value);else await cloud().signIn(email,pass)}
 catch(x){err.textContent=(x&&x.code||'').replace('auth/','').replace(/-/g,' ')||'Could not sign in.'}});
/* swipe in read-aloud mode */
let sx=null;document.addEventListener('touchstart',e=>{if(e.target.closest('#reader'))sx=e.touches[0].clientX},{passive:true});
document.addEventListener('touchend',e=>{if(sx==null)return;const dx=e.changedTouches[0].clientX-sx;sx=null;if(Math.abs(dx)<60)return;
 if(dx<0){const q=P.devotees.filter(x=>active(x)&&!readToday(x));P.readIdx=(P.readIdx+1)%Math.max(1,q.length)}else P.readIdx=Math.max(0,P.readIdx-1);render()});
document.addEventListener('keydown',e=>{if(P.mode!=='read')return;if(e.key==='ArrowRight')$('[data-act=rnext]')?.click();if(e.key==='ArrowLeft')$('[data-act=rprev]')?.click();if(e.key==='Escape'){P.mode=null;render()}});

if('serviceWorker' in navigator&&location.protocol==='https:')navigator.serviceWorker.register('../sw.js',{scope:'../'}).catch(()=>{});
render();boot();
