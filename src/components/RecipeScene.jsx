import React from 'react';
import {recipes} from './recipe-game-model.js';
function Food({kind,x=180,y=167,small=false}){
 return <g transform={`translate(${x} ${y}) scale(${small?.65:1})`} className={`food-${kind}`}>
 {kind==='pumpkin'?<><ellipse rx="59" ry="47" fill="#c78f43"/><ellipse rx="34" ry="47" fill="#d5a451"/><path d="M0 -44q-8 -22 8 -25" fill="none" stroke="#758150" strokeWidth="8"/><path d="M-18 -42q-20 43 0 83M18 -42q20 43 0 83" fill="none"/></>:
 kind==='noodle'?<g fill="none" stroke="#d5ad61" strokeWidth="7">{[0,1,2,3,4,5].map(i=><path key={i} d={`M${-50+i*8} ${-17+i*6}q100 -28 77 8t-70 8q-20 25 63 15`}/>)}</g>:
 kind==='bone'?<><path d="M-35 -16q-22 -22 -26 0q-8 19 15 20L30 18q17 23 28 3q16 -23 -11 -29Z" fill="#d0b392"/><path d="M-24 -5L29 7" stroke="#f0dfb8" strokeWidth="10"/></>:
 kind==='pumpkin-chunks'?<>{[[-38,-8],[-6,-21],[29,-13],[-14,17],[30,18]].map(([x,y],i)=><g key={i} transform={`translate(${x} ${y}) rotate(${i*19-20})`}><path d="M-19 -14L18 -10 10 17-21 10Z" fill="#dbab58"/><path d="M-21 10L10 17 18 -10" fill="none" stroke="#72804b" strokeWidth="5"/><path d="M-12 -7L9 -4" stroke="#f0cd85" strokeWidth="3"/></g>)}</>:
 kind==='egg'?<><path d="M-59 2C-71 -20 -39 -24 -21 -16C-8 -30 12 -22 19 -14C43 -27 70 -8 59 11C70 29 34 33 15 22C-7 38 -26 23 -39 25C-62 29 -75 10 -59 2Z" fill="#f3e6b9" fillOpacity=".65" stroke="#d3c6a0" strokeWidth="1"/>{[-26,26].map(x=><g key={x} transform={`translate(${x} 0)`}><ellipse rx="16" ry="12" fill="#e4ab3e" stroke="#bb8e3d" strokeWidth="1"/><path d="M-8 -4q5 -6 11 -2" fill="none" stroke="#ffe5a0" strokeWidth="3"/></g>)}</>:
 kind==='chocolate'?<>{[-1,0,1].map(i=><rect key={i} x={i*26-12} y={-20+(i%2)*8} width="25" height="34" rx="3" fill="#674735"/>)}<rect x="25" y="16" width="26" height="16" rx="3" fill="#e4c573"/></>:
 kind==='squid'?<g fill="none" stroke="#d4bc98" strokeWidth="9">{[-30,-5,22].map(x=><ellipse key={x} cx={x} rx="13" ry="21"/>)}</g>:
 kind==='shrimp'?<g fill="none" stroke="#b67950" strokeWidth="10">{[-30,0,30].map(x=><path key={x} d={`M${x+7} -14q-30 -10 -16 20q10 12 20 -2`}/>)}</g>:
 kind==='greens'||kind==='aromatics'?<g fill="#7d8756">{[-35,-10,18,39].map((x,i)=><path key={x} d={`M${x} 25q-35 -50 -3 -55q25 3 3 55Z`}/>)}<path d="M-36 23L25 -20M-5 22L38 -16" stroke="#b6bc83" strokeWidth="5"/></g>:
 kind==='meat'?<g fill="#a46a50">{[-35,-10,17,35].map((x,i)=><rect key={x} x={x-9} y={i%2?-17:5} width="23" height="22" rx="4"/>)}</g>:
 kind==='rice'||kind==='peanut'||kind==='salt'||kind==='flour'?<g fill={kind==='peanut'?'#bd8d4f':kind==='rice'?'#dfcb8e':'#f9f0d9'} strokeWidth=".6">{Array.from({length:22},(_,i)=><ellipse key={i} cx={(i*23%105)-52} cy={(i*17%47)-23} rx={kind==='peanut'?7:3} ry={kind==='peanut'?4:2}/>)}</g>:
 <ellipse rx="60" ry="19" fill={kind==='water'?'#abbdb2':kind==='foam'?'#fff9e6':'#e9d7a6'}/>}</g>;
}
function Vessel({type='bowl',fill='#b8a07c'}){if(type==='pumpkin')return <g><ellipse cx="180" cy="265" rx="112" ry="23" fill="#b9c1a3"/><path d="M93 190C75 288 285 288 267 190Z" fill="#ca984e"/><path d="M125 202q-7 43 24 55M159 207q-2 41 10 55M201 207q2 41-10 55M235 202q7 43-24 55" stroke="#a2773e"/><ellipse cx="180" cy="192" rx="87" ry="28" fill="#ead6a2"/><ellipse cx="180" cy="194" rx="72" ry="20" fill="#c49a52"/></g>;return <g>
 {type==='pan'?<><path d="M87 194q15 75 93 75t93 -75" fill="#727d69"/><path d="M263 205l63 -36" stroke="#735d45" strokeWidth="13"/></>:<path d="M93 192l14 60q73 37 146 0l14 -60" fill={fill}/>}
 <ellipse cx="180" cy="192" rx="87" ry="28" fill="#ece1bf"/><path d="M105 209q75 28 150 0" fill="none" opacity=".4"/>
 {type==='pot'&&<><path d="M91 211H72v22h27M269 211h19v22h-27" fill="none" strokeWidth="7"/><path d="M124 277q12 -30 18 0m30 0q12 -30 18 0m30 0q12 -30 18 0" fill="none" stroke="#bb8253"/></>}
 </g>}
function Steam(){return <g className="recipe-steam" fill="none" stroke="#a4a68d" strokeWidth="3"><path d="M135 125q-18 -15 0 -33t0 -25M180 119q-18 -15 0 -33t0 -25M225 125q-18 -15 0 -33t0 -25"/></g>}
function Heart({x=180,y=205,fill='#73513d'}){return <g transform={`translate(${x} ${y})`}><path d="M-58 -9Q-70 12 0 52Q70 12 58 -9L0 26Z" fill="#593d2e"/><path d="M0 34C-105 -20 -42 -81 0 -36C42 -81 105 -20 0 34Z" fill={fill}/></g>}
function TeaMixture({x=180,y=184,small=false}){return <g className="tea-mixture" transform={`translate(${x} ${y}) scale(${small?.55:1})`}><Food kind="greens" x={0} y={-8} small/><Food kind="meat" x={0} y={13} small/><Food kind="shrimp" x={-25} y={9} small/><Food kind="squid" x={30} y={4} small/></g>}
function ToastedTopping({x=180,y=180}){return <g className="toasted-topping"><Food kind="rice" x={x-8} y={y} small/><Food kind="peanut" x={x+12} y={y+4} small/></g>}
export default function RecipeScene({id,step=1,action=0,cuts=[],animation='',preview=false}){
 const pasta=id==='pumpkin-pasta',tea=id==='vegetable-tea',cake=id==='chocolate-cake',done=step>(tea?5:6),active=!!animation;
 const cutting=(pasta&&step===1)||(tea&&step===2),baking=cake&&step===6;
 let kind=pasta?['','pumpkin','pumpkin','noodle','cream','noodle','noodle'][step]:tea?['','bone',['greens','shrimp','squid','meat'][action],'rice',action?'greens':'meat','greens'][step]:['','chocolate',action===0?'egg':action===1?'salt':'foam','batter','chocolate','chocolate','cake'][step];
 const chopped=cuts.length===2||preview;
 const contents=pasta&&step===2?'pumpkin-chunks':tea&&step===3&&action===1?'peanut':cake&&step===2&&action===1?'egg':kind;
 const actionFood=recipes[id]?.steps[step-1]?.actions[action]?.food;
 return <svg className={`recipe-scene motion-${animation}`} viewBox="0 0 360 320" aria-hidden="true" fill="none" stroke="#695c46" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
 <ellipse cx="180" cy="280" rx="116" ry="12" fill="#b4a781" opacity=".12" stroke="none"/>
 {pasta&&step===2?<g className="pumpkin-oven"><rect x="65" y="83" width="230" height="185" rx="14" fill="#a8ad8e"/><rect x="83" y="129" width="194" height="117" rx="7" fill="#665441"/><path d="M103 114h137" strokeWidth="6"/><circle cx="262" cy="104" r="6" fill="#bd8157"/><g className="roast-tray"><path d="M97 213h166l-9 15H107Z" fill="#b0b6a0"/><Food kind="pumpkin-chunks" y={188}/></g><g className="oven-heat" stroke="#dbaf72"><path d="M112 154q-9 -10 0 -18m68 18q-9 -10 0 -18m68 18q-9 -10 0 -18"/></g></g>:cutting?<><rect x="57" y="100" width="246" height="140" rx="18" fill="#c7ab7b"/><path d="M72 117h214M72 226h214" opacity=".25"/>
 {pasta?(chopped?<g>{[[-35,-25],[35,-25],[-35,28],[35,28]].map(([x,y],i)=><path key={i} transform={`translate(${180+x} ${165+y}) rotate(${i*80})`} d="M-25 -16Q33 -32 27 25L-25 -16" fill="#d7a453"/>)}</g>:<><Food kind="pumpkin" y={160}/>{cuts.includes('horizontal')&&<path d="M125 160h110" stroke="#f9e8bc" strokeWidth="4"/>}{cuts.includes('vertical')&&<path d="M180 113v92" stroke="#f9e8bc" strokeWidth="4"/>}</>):<><g className="raw-food"><Food kind={kind} y={168}/></g><g className="chopped-food"><Food kind={kind} x={150} y={176} small/><Food kind={kind} x={213} y={188} small/></g>{action===1||action===2?<g className="scissors"><circle cx="231" cy="100" r="12"/><circle cx="264" cy="105" r="12"/><path d="M238 110l-48 64M257 117l-66 11" strokeWidth="5"/></g>:<g className="recipe-knife"><path d="M187 135l69 -49 12 17-69 48Z" fill="#c4ccc1"/><path d="M257 91l24 -19" stroke="#8d6849" strokeWidth="10"/></g>}</>}
 </>:baking?<><g className="recipe-oven"><rect x="73" y="103" width="214" height="163" rx="14" fill="#a8ad8e"/><rect x="92" y="143" width="176" height="104" rx="7" fill="#5e5546"/><path d="M104 135h151" strokeWidth="5"/><circle cx="245" cy="119" r="5" fill="#bd8157"/><g className="oven-cake"><Heart y={198}/></g></g><g className="bake-clock"><circle cx="180" cy="67" r="33" fill="#f2e6c3"/><path d="M156 34l-8 -8m56 8 8 -8M163 98l-6 9m40 -9 6 9" strokeWidth="5"/><path className="clock-hand" d="M180 67V43" strokeWidth="3"/><text x="227" y="72" stroke="none" fill="#695c46" fontSize="13">10 分钟</text></g><g className="baked-result"><ellipse cx="180" cy="244" rx="100" ry="23" fill="#b9bf9e"/><Heart/></g></>:
 done?<><ellipse cx="180" cy="245" rx="109" ry="27" fill="#bdc5a8"/>{cake?<Heart/>:pasta?<><Vessel type="pumpkin"/><ellipse cx="180" cy="194" rx="76" ry="23" fill="#cfab5c"/><Food kind="noodle" y={182}/><Food kind="greens" x={211} y={156} small/></>:<><Vessel fill="#7b8657"/><TeaMixture y={187}/><ToastedTopping y={197}/><Steam/></>}<path d="M78 111l4 9 9 4-9 4-4 9-4 -9-9 -4 9 -4ZM277 138l3 7 7 3-7 3-3 7-3 -7-7 -3 7 -3Z" fill="#ede1ad"/></>:
 <>
 {cake&&step===5?<><ellipse cx="180" cy="257" rx="105" ry="20" fill="#b8b798"/><Heart fill="#d1a18c"/><g className="mold-fill"><Heart fill="#73513d"/></g></>:<>
 <Vessel type={pasta?(step===2||step===3?'pot':step===6?'pumpkin':'pan'):tea?(step===1?'pot':step===3||step===4?'pan':'bowl'):'bowl'} fill={pasta&&step===6?'#bd924d':tea?'#86906a':'#b5bba0'}/>
 {cake&&step===1&&<ellipse cx="180" cy="271" rx="100" ry="15" fill="#b3c3b7"/>}
 <ellipse cx="180" cy="194" rx="72" ry="20" fill={cake?(step===1||step===4?'#74513b':'#eadcb7'):tea?'#afad77':'#ead8a2'}/>
 {!(cake&&(step>=3||step===1&&action>=1))&&<g className={pasta&&step>=5&&!preview?'serving-noodles':active&&['drop','steam'].includes(animation)?'falling-food':animation==='melt'?'melting-food':'pan-food'}>{tea&&(step===4||step===5)?(step===4&&action===0?<><Food kind="meat" y={184}/><Food kind="shrimp" x={150} y={188} small/><Food kind="squid" x={212} y={182} small/></>:<TeaMixture/>):<Food kind={contents} y={184}/>}</g>}
 {tea&&step===5&&action>=2&&<ToastedTopping y={193}/>}
 {tea&&step===1&&action===1&&active&&<g className="falling-food"><Food kind="aromatics" y={176} small/></g>}
 {tea&&step===3&&action===1&&<Food kind="rice" y={189} small/>}
 {pasta&&step===2&&<><path d="M104 211h151M115 221h130"/><g className="steam-lid"><path d="M90 151q90 -58 180 0Z" fill="#b4ad88"/><path d="M166 110q14 -16 28 0"/></g></>}
 </>}
 {active&&['pour','serve','sprinkle','sift'].includes(animation)&&<><g className="pour-source"><path d="M84 67l48 8-8 41-45 -13Z" fill="#b4bba0"/><path d="M132 78q30 0 12 25h-15"/></g>{['sprinkle','sift'].includes(animation)?<g className="sprinkles">{tea&&step===5?<ToastedTopping x={162} y={130}/>:<Food kind={actionFood} x={162} y={130} small/>}</g>:<path className="recipe-stream" d="M125 102Q183 119 180 185" stroke={cake?'#76503a':pasta?'#dabb78':'#c3bb8b'} strokeWidth={pasta?'12':'8'}/>}</>}
 {active&&animation==='sift'&&<path d="M100 100q60 58 120 0Z" fill="#e0d6b4"/>}
 {active&&['stir','fold','whisk','toss','toast'].includes(animation)&&<g className="recipe-utensil">{animation==='whisk'?<><path d="M200 167l41 -69" strokeWidth="7"/><ellipse cx="190" cy="185" rx="18" ry="29" fill="none"/><ellipse cx="190" cy="185" rx="7" ry="29"/></>:<><path d="M185 193l65 -97" stroke="#9b754d" strokeWidth="9"/><ellipse cx="185" cy="192" rx="12" ry="20" fill="#ac8557"/></>}</g>}
 {active&&animation==='scoop'&&<g className="recipe-scoop"><path d="M218 176l68 -68" strokeWidth="7"/><ellipse cx="204" cy="188" rx="34" ry="16" fill="#c4c7ac"/>{tea?<TeaMixture x={204} y={184} small/>:<Food kind="water" x={204} y={184} small/>}</g>}
 {pasta&&step===3&&action===2&&<g className="saved-water"><path d="M263 232h63l-7 28h-49Z" fill="#babda2"/><ellipse cx="294" cy="233" rx="31" ry="9" fill="#c1d0bb"/><text x="291" y="283" textAnchor="middle" stroke="none" fill="#75684e" fontSize="11">½ 碗面水</text></g>}
 {(active||preview)&&<Steam/>}
 </>}
 </svg>;
}
