import React from 'react';
function Peppers(){return <g fill="#7c8d52"><path d="M126 181Q155 167 166 188Q148 187 134 207Q120 206 126 181Z"/><path d="M171 196Q194 166 222 181Q218 200 193 213Q192 196 171 196Z"/><path d="M155 219Q167 199 191 221Q180 242 160 239Z"/><path d="m130 184 15 4m54-3 13-1m-46 39 9 4" fill="none" stroke="#bdc78c" strokeWidth="3"/></g>;}
function Bone({x=180,y=180,meaty=true}){return <g transform={`translate(${x} ${y}) rotate(-15)`}>{meaty&&<path d="M-44-18Q-26-38-5-22Q15-35 38-17Q55 6 30 28Q10 36-4 23Q-34 38-46 12Z" fill="#ae8062"/>}<path d="M-27-8Q-47-29-52-9Q-61 8-36 13L24 13Q45 30 50 11Q60-5 37-8Z" fill="#e5d8b6"/><path d="M-30 0H28" stroke="#bcaa83"/></g>;}
function Meat(){return <g fill="#aa7855"><path d="m127 179 29-11 14 20-20 14-27-6zm49 11 19-22 28 13-8 25-25 4zm-25 24 22-12 21 25-22 12-23-10z"/><path d="m135 184 17-4m44 3 12 6m-47 28 9 8" stroke="#dbb28b" strokeWidth="3"/></g>;}
export default function PorkScene({step,action=0,animation='',preview=false}){
 const active=Boolean(animation)||preview;
 const peppers=step>4||step===4&&(action>=2||animation==='pepper'||preview);
 return <svg viewBox="0 0 360 300" className={`pork-scene ${animation?'pork-'+animation:''}`} aria-hidden="true" stroke="#69513d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <ellipse cx="180" cy="271" rx="119" ry="12" fill="#dbceb0" opacity=".35" stroke="none"/>
 {step===1?<>
   <path d="M63 185Q81 265 180 265Q278 265 297 185Z" fill="#a8bab0"/><ellipse cx="180" cy="184" rx="117" ry="35" fill="#cfded2"/>
   {action===0?<g className="wash-pepper"><g transform="translate(0 -70)"><Peppers/></g></g>:<g className="wash-bone"><Bone x={180} y={135}/></g>}
   <path className="wash-water" d="M97 200q24 9 48 0m61 3q27 10 51-2" fill="none" stroke="#f6f2dc" strokeWidth="4"/>
   <path className="water-drops" d="M113 91v13m25-20v15m95-10v15m20-13v12" stroke="#91aca8" strokeWidth="3"/>
 </>:step===2||step===3?<>
   <path d="M81 174l-25 2v20h28m193-22 26 2v20h-28" fill="none" strokeWidth="7"/>
   <path d="M83 174L98 244Q180 268 262 244L277 174Z" fill="#9eaa9c"/><ellipse cx="180" cy="176" rx="97" ry="30" fill="#b5cfc5"/>
   <g className="pot-water" fill="none" stroke="#edf2dd" strokeWidth="2.5"><path d="M105 180q22 10 42 0m63 1q24 10 43-1M146 194q29 9 57 0"/>{[119,151,211,243].map((x,i)=><circle key={x} cx={x} cy={166+i%2*6} r={3+i%2*2}/>)}</g>
   <g className={step===2?'blanch-food':'lift-food'}><Bone x={180} y={step===2?112:184}/>
   {step===2&&<g><path d="m117 124 17-7 7 15-19 5z" fill="#d6bd77"/><path d="m224 111-9 33m24-28-9 31" stroke="#7e8c55" strokeWidth="6"/><ellipse cx="155" cy="138" rx="9" ry="7" fill="#e8dbb8"/></g>}
   {step===3&&<><path d="M121 188Q178 235 239 188M128 198h101m-88 11 72 1m-63-18 9 25m20-25v30m20-30-8 25" fill="none" stroke="#7b8877"/><path d="M236 193L313 132" stroke="#8e785c" strokeWidth="8"/></>}
   </g><path className="pork-steam" d="M111 129q-13-15 0-29m124 29q12-17-2-30" fill="none" stroke="#a1ac93"/>
 </>:step===5?<>
   <path d="M47 109L309 105L317 246L42 250Z" fill="#bf986b"/><path d="M55 129l244-4M53 231l246-5" stroke="#a58055"/>
   <g className="debone-bone"><Bone x={177} y={176} meaty={!active}/></g>
   {active&&<g className="debone-meat"><g transform="translate(24 15) scale(.9)"><Meat/></g></g>}
   <g className="boning-knife"><path d="M168 117L238 66L246 78L190 145Z" fill="#bac5b8"/><path d="M239 66L264 43L277 52L246 79Z" fill="#8d6d4b"/></g>
 </>:<>
   {step>=7?<><ellipse cx="180" cy="233" rx="126" ry="40" fill="#a9b390"/><ellipse cx="180" cy="226" rx="112" ry="32" fill="#eee2c8"/></>:null}
   {(step===4||step===6||step===7)&&<g className={step===7?'finishing-wok':'wok'}><path d="M76 180L47 163L40 177L80 206M280 180L327 148L333 162L279 209" fill="#927d5d"/><path d="M74 183Q85 270 181 273Q277 269 289 183Z" fill="#7d806a"/><ellipse cx="181" cy="182" rx="107" ry="35" fill="#b3ad88"/></g>}
   {step===4&&(action>=1||active)&&<ellipse className="oil-pool" cx="180" cy="190" rx="70" ry="15" fill="#ceae62" fillOpacity=".55" stroke="none"/>}
   {step===4&&action===0&&<><g className="oil-bottle"><path d="M243 49h23v26l9 12v36h-41V87l9-12z" fill="#bca96b"/><path d="M241 43h27v9h-27z" fill="#88885b"/></g><path className="oil-stream" d="M238 112Q207 136 178 184" fill="none" stroke="#cba456" strokeWidth="5"/></>}
   <g className={step===7?'plate-food':'pork-food'}>
    {step>=7&&<g className="finishing-sauce"><ellipse cx="179" cy="213" rx="87" ry="23" fill="#aa783f" fillOpacity=".75" stroke="none"/><path d="M110 215q24 10 40 4m48 8q24 0 43-9" fill="none" stroke="#d3af6d" strokeWidth="3"/></g>}
    {step>=6&&<Meat/>}{peppers&&<g className={animation==='pepper'?'pepper-drop':''}><Peppers/></g>}
    {step===6&&<g fill="#e8d5a6" stroke="none"><path d="m141 188 7-4 4 7-7 3zm47 24 7-5 5 5-7 5zm24-21 7-1 1 5-8 3z"/></g>}
   </g>
   {(step===4&&action===2||step===6&&action===0)&&<g className="wok-spatula"><path d="M213 188L265 77" stroke="#98774f" strokeWidth="10"/><path d="M205 176L224 187L207 216L183 202Z" fill="#bc9462"/></g>}
   {step===6&&action===1&&<><g className="broth-bowl"><path d="M56 77Q60 121 99 119L124 79Z" fill="#a0ad92"/><ellipse cx="90" cy="78" rx="34" ry="10" fill="#c9b37d"/></g><path className="broth-stream" d="M120 99Q148 117 180 184" fill="none" stroke="#c5a15a" strokeWidth="7"/><ellipse className="broth-pool" cx="181" cy="211" rx="70" ry="17" fill="#b78d4f" opacity=".35" stroke="none"/><g className="pot-cover"><path d="M76 177Q180 115 285 177Z" fill="#a1aa93"/><path d="M162 143v-13h37v13" fill="none" strokeWidth="6"/></g></>}
   {step===7&&<g className="finishing-steam"><path d="M132 158q-15-20 0-41m47 37q-15-21 0-43m49 46q12-20-1-41" fill="none" stroke="#c0baa0" strokeWidth="3"/></g>}
   {step===8&&<g fill="#8d9661" stroke="none"><text x="90" y="130" fontSize="24">✧</text><text x="259" y="139" fontSize="27">✧</text></g>}
 </>}
 </svg>;
}
