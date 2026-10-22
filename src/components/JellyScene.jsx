import React from 'react';

function Jelly({ x=180, y=140, small=false }) {
  return <g transform={`translate(${x} ${y}) scale(${small?.7:1})`}><path d="M-49 10Q-55-8-37-15Q-35-36-15-27Q3-40 18-27Q42-33 44-13Q65-3 50 13Q58 30 36 31Q15 44-1 30Q-24 43-32 27Q-56 35-49 10Z" fill="#c6a271" fillOpacity=".9"/><g fill="none" stroke="#92714e" strokeWidth="3"><path d="M-35 12Q-41-9-22-14T-4 11T18 12T34-8M-23 26Q-6 7 11 25M-14-20Q5-30 17-13T41 8"/></g><path d="M-37-5Q-28-20-14-16M13-23Q29-26 34-13" fill="none" stroke="#e9d5ad" strokeWidth="3"/></g>;
}
function Ice({ x=0,y=0 }) { return <rect x={x} y={y} width="25" height="21" rx="4" fill="#dbe6e1" stroke="#91aaa5" transform={`rotate(12 ${x+12} ${y+10})`}/>; }
function Garnish(){return <g strokeWidth="4" fill="none"><path d="M134 195l28 24m-13-43 35 21m16-23 26 26m-50 20 23 11" stroke="#758657"/><path d="m164 183 13 9m19 17 18-5m-75 24 13-3" stroke="#ae6049"/><path d="m184 188 3 0m-29 24 3 0m55-22 3 0" stroke="#e8d9ac"/></g>;}
export function IngredientArt({id,chopped=false}) {
  return <svg viewBox="0 0 150 100" aria-hidden="true" stroke="#69513d" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="75" cy="84" rx="50" ry="8" fill="#daceb3" opacity=".35" stroke="none"/>
    {chopped ? <g>{Array.from({length:9},(_,i)=>{const x=40+(i%3)*24+(Math.floor(i/3)%2)*7,y=38+Math.floor(i/3)*16;return id==='cucumber'?<g key={i}><ellipse cx={x} cy={y} rx="12" ry="7" fill="#a3af75" stroke="#6d8051"/><path d={`M${x-4} ${y}h8`} stroke="#e5ddb3"/></g>:<path key={i} d={`M${x} ${y}l11-5 5 9-12 4z`} fill={{coriander:'#7c8b59',pepper:'#b86a50',garlic:'#e7d5ae'}[id]}/>;})}</g> : id==='coriander'?<g><path d="M69 84L57 28m12 56 17-61m-17 61 33-37" fill="none" stroke="#7a8753" strokeWidth="3"/>{[[54,29],[85,25],[100,45],[65,50],[83,49]].map(([x,y],i)=><path key={i} d={`M${x} ${y}q-18 0-12-12 7-10 13 0 7-13 15-4 8 11-16 16z`} fill="#85925f"/>)}</g>:id==='pepper'?<g><path d="M46 27Q81 18 100 43Q107 71 58 84Q78 62 61 45Z" fill="#b76549"/><path d="M49 29Q39 17 55 13" fill="none" stroke="#7e8751" strokeWidth="6"/><path d="M67 33q24 13 14 31" fill="none" stroke="#d69770" strokeWidth="3"/></g>:id==='cucumber'?<g transform="rotate(-24 75 50)"><rect x="57" y="13" width="36" height="75" rx="18" fill="#7f8f59"/><path d="M69 25v49m12-47v47" stroke="#b4bd82"/><path d="m62 31 2 0m24 12 2 0m-26 20 2 0" stroke="#526a45"/></g>:<g><path d="M74 22Q46 21 40 52Q39 79 75 82Q109 81 109 53Q107 28 81 22L79 11H72Z" fill="#e8d9b8"/><path d="M75 27Q58 52 64 77m14-50q15 28 9 49" fill="none" stroke="#b5a384"/></g>}
  </svg>;
}
export default function JellyScene({step,iceCount=0,animation='',preview=false}) {
  const waterScene=step<=3, boiling=step===2;
  return <svg viewBox="0 0 360 300" className={`jelly-scene ${animation?'jelly-'+animation:''}`} aria-hidden="true" stroke="#69513d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="180" cy="267" rx="120" ry="12" fill="#dbceb0" opacity=".35" stroke="none"/>
    {waterScene ? <>
      {boiling && <g><path d="M86 179L64 173Q51 180 65 193L87 196M274 179L296 173Q309 180 295 193L273 196" fill="none" strokeWidth="7"/><path d="M98 251H262L272 268H88Z" fill="#8c8c70"/></g>}
      <path d={boiling?'M85 174L96 239Q180 266 264 239L275 174Z':'M68 176Q82 260 180 260Q276 260 292 176Z'} fill={boiling?'#a7b1a1':'#a1b4ae'}/>
      <ellipse cx="180" cy="176" rx={boiling?95:112} ry="32" fill="#d4dfcf"/>
      <ellipse cx="180" cy="180" rx={boiling?86:101} ry="24" fill="#b8cec7" stroke="#8caaa4"/>
      {step===3 && <g><Ice x={101} y={163}/><Ice x={216} y={162}/><Ice x={194} y={189}/><Ice x={127} y={190}/></g>}
      <g className={`jelly-basket${step===3&&iceCount===1?' in-water':''}`}>
        <path d="M132 133L125 149Q180 176 235 149L229 133" fill="#c4c5ab"/>
        <Jelly x={180} y={121} small/>
        <path d="M127 148Q180 178 234 148M135 153l91-3m-81 12 66-3m-64-19 8 24m17-24 1 28m17-30-8 29m30-29-15 27" stroke="#89917c" fill="none"/>
        <path d="M233 141L307 106" stroke="#8b785e" strokeWidth="8"/>
        <g className="drain-drops" stroke="#8faeaa"><path d="M153 177v12m27-9v15m25-19v13"/></g>
      </g>
      <path className="water-ripple" d="M95 186Q116 194 138 187M220 188q24 7 46-3" fill="none" stroke="#f2f0da" strokeWidth="3"/>
      {step===1 && <g className="sand" fill="#a68e68" stroke="none"><circle cx="140" cy="211" r="2"/><circle cx="179" cy="225" r="2"/><circle cx="207" cy="210" r="2"/></g>}
      {boiling && <g className="steam" fill="none" stroke="#a4ad93"><path d="M120 120q-14-18 0-32m58 17q-13-20 2-37m55 54q-14-19-1-34"/><circle cx="116" cy="177" r="4"/><circle cx="242" cy="181" r="3"/></g>}
    </> : step===5 ? <>
      <path d="M94 185Q105 252 180 253Q256 251 268 185Z" fill="#cdc5a3"/>
      <ellipse cx="181" cy="185" rx="87" ry="26" fill="#eee3c5"/>
      <ellipse className={preview?'':'sauce-level'} cx="181" cy="186" rx="75" ry="19" fill="#bd965c" stroke="none"/>
      <g className="vinegar-bottle"><path d="M81 47h22v30l15 15v58q-25 9-51 0V92l14-15z" fill="#bcaa77"/><path d="M81 41h22v10H81z" fill="#7d8059"/><path d="M73 104h39v31H73z" fill="#f1e4c5"/><text x="92" y="124" fill="#69513d" stroke="none" textAnchor="middle" fontSize="12">米醋</text></g>
      <g className="sugar-cup"><path d="M238 79l49-9-1 43-31 7z" fill="#d4c09c"/><ellipse cx="262" cy="79" rx="25" ry="8" fill="#f9efda"/></g>
      <path className={preview?'':'seasoning-stream'} d="M113 123Q142 136 166 182" stroke="#ac8653" strokeWidth="6" fill="none"/>
      <path className={preview?'':'seasoning-stream'} d="M259 119L208 181M270 115L216 177" stroke="#fff8e5" strokeWidth="4" strokeDasharray="3 8" fill="none"/>
    </> : <>
      {step===6 ? <><path d="M69 195Q89 270 181 271Q274 270 292 195Z" fill="#a7af8a"/><ellipse cx="180" cy="194" rx="111" ry="40" fill="#eee3c6"/></> : <><ellipse cx="180" cy="224" rx="126" ry="42" fill="#8ea5a0"/><ellipse cx="180" cy="216" rx="115" ry="36" fill="#e1e4ce"/><g opacity=".65"><Ice x={89} y={211}/><Ice x={243} y={205}/><Ice x={165} y={233}/></g><ellipse cx="180" cy="216" rx="91" ry="27" fill="#eee6d0"/></>}
      <g className={step===6?'mix-food':''}><Jelly x={178} y={202}/><Jelly x={203} y={208} small/><Garnish/></g>
      {step===6 && <g className="wooden-spoon"><path d="M205 191L263 88" stroke="#9a754d" strokeWidth="12"/><ellipse cx="200" cy="204" rx="15" ry="26" transform="rotate(32 200 204)" fill="#ba9161"/><path d="M200 190q-10 15-5 26" fill="none" stroke="#dfbd86"/></g>}
      {step===7 && <><g className="sauce-pitcher"><path d="M226 77h63l-9 45q-24 14-49-2z" fill="#c3b28b"/><ellipse cx="257" cy="77" rx="32" ry="10" fill="#b58d52"/><path d="M287 84q31 4 3 27" fill="none" strokeWidth="5"/></g><path className={preview?'':'finish-stream'} d="M233 111Q205 134 178 199" fill="none" stroke="#a77d42" strokeWidth="7"/></>}
      {(step===7||step===8) && <path className={step===8?'':'finish-glaze'} d="M140 194q34 23 68 6m-58 19q37 12 64-4" fill="none" stroke="#b18446" strokeWidth="4" opacity=".75"/>}
      {step===8 && <g fill="#8a915f" stroke="none"><text x="80" y="108" fontSize="25">✧</text><text x="260" y="131" fontSize="30">✧</text></g>}
    </>}
  </svg>;
}
