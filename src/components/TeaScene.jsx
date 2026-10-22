import React, { useId } from 'react';

const ink = '#69513d', paper = '#f4efdf';
function LemonSlice({ x = 0, y = 0, r = 22 }) {
  return <g transform={`translate(${x} ${y})`}><circle r={r} fill="#d6b64f"/><circle r={r-4} fill="#e8cc70" stroke="#fbefbb" strokeWidth="2"/><path d={`M0 ${-r+6}V${r-6}M${-r+6} 0H${r-6}M${-r*.55} ${-r*.55}L${r*.55} ${r*.55}M${r*.55} ${-r*.55}L${-r*.55} ${r*.55}`} stroke="#fbefbb" strokeWidth="2"/></g>;
}
export function SealArt({ item }) {
  return <svg viewBox="0 0 140 65" width="140" height="65" aria-hidden="true" fill="none" stroke={ink} strokeWidth="2" strokeLinejoin="round">{item === 'paper' ? <><path d="M9 28L23 16L118 17L132 30L122 44L108 38L95 46L80 39L65 46L50 38L34 44L21 37L10 41Z" fill="#f5e8c5"/><path d="M24 28Q68 19 117 29" stroke="#b8a782"/></> : <><path d="M23 40C28 1 110 1 116 40" fill="#e2e6db" fillOpacity=".65"/><path d="M15 40Q70 29 125 40L124 49Q71 58 16 49Z" fill="#ede8d6"/><path d="M44 26Q56 12 74 14" stroke="#fffaf0" strokeWidth="4"/></>}</svg>;
}
function Duck() { return <g><path d="M0 16Q-10 4-21 15Q-26 35 0 36Q27 36 25 19L16 12" fill="#d6b64f"/><circle cx="6" cy="8" r="15" fill="#e4c35d"/><path d="M17 6L29 11L17 16" fill="#ba7549"/><circle cx="10" cy="4" r="1.5" fill={ink}/><path d="M-10 23q11-9 18 1" fill="none"/></g>; }
export default function TeaScene({ step, count = 0, cuts = [], paperPlaced = false, lidPlaced = false, animation = '', preview = false }) {
  const uid = useId().replace(/:/g, '');
  const hasTea = step >= 6 || (step === 5 && (animation || preview));
  const hasIce = step >= 4 || (step === 3 && (animation || preview));
  const packedCount = step === 10 ? 3 : count + (step === 9 && animation ? 1 : 0);
  const sealed = step >= 9 || lidPlaced;
  return <svg className={`tea-scene ${animation ? `anim-${animation}` : ''}`} viewBox="0 0 360 320" aria-hidden="true" stroke={ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <defs><clipPath id={`${uid}-cup`}><path d="M122 111L138 268Q180 284 222 268L238 111Z"/></clipPath><pattern id={`${uid}-grain`} width="19" height="23" patternUnits="userSpaceOnUse"><circle cx="3" cy="6" r=".55" fill="#72553d" stroke="none" opacity=".11"/><circle cx="12" cy="18" r=".7" fill="#fffdf3" stroke="none" opacity=".35"/></pattern></defs>
    <ellipse cx="180" cy="286" rx="113" ry="12" fill="#d9ceb4" opacity=".4" stroke="none"/>
    {step === 1 ? <>
      <path d="M36 91Q35 82 47 82L311 86Q324 86 324 98L319 247Q319 256 306 257L43 252Q31 252 32 240Z" fill="#c59c6d"/>
      <path d="M48 104L304 109M46 130L305 135M44 225L301 231M47 241L300 245" stroke="#ac8255" opacity=".6"/>
      {cuts.length < 2 ? <g><path d="M132 149Q137 111 176 112Q218 104 231 150L239 160L230 173Q218 210 180 209Q140 212 130 174L122 164Z" fill="#d7b34f"/><path d="M145 145Q151 128 169 127" fill="none" stroke="#f4e2a1" strokeWidth="5"/></g> : <g className="lemon-quartered">
        {[0,1,2,3].map(i => <g key={i} className={`lemon-quarter q${i}`} style={{'--qx':`${i%2 ? 10 : -10}px`,'--qy':`${i>1 ? 10 : -10}px`}}><path transform={`translate(180 160) rotate(${i*90})`} d="M0 0L0-48Q39-51 49-10Q51 0 48 0Z" fill="#d8b84f"/><path transform={`translate(180 160) rotate(${i*90})`} d="M5-5L5-39Q36-40 40-5Z" fill="#efdb86" stroke="#f8edbc"/></g>)}
      </g>}
      <path d="M185 111q-10-31 24-30-2 29-24 30" fill="#7e8957"/>
      {cuts.includes('horizontal') && <path d="M122 160H240" stroke={paper} strokeWidth="5"/>}
      {cuts.includes('vertical') && <path d="M180 105V218" stroke={paper} strokeWidth="5"/>}
      <path d="M46 64L115 37L119 48L50 77Z" fill="#b8c3bd"/><path d="M28 76L49 64L55 76L33 88Z" fill="#87654b"/>
    </> : <>
      {step >= 9 && <g className="takeaway-bag"><path d="M87 117L122 111L128 61Q130 36 149 39L157 105H203L211 40Q230 35 233 62L239 111L269 118L284 286Q180 310 77 287Z" fill="#e7e9d8" fillOpacity=".4" stroke="#8c9281"/><path d="M94 133L86 279M257 135L272 280" opacity=".5" fill="none"/></g>}
      <g className={step === 6 ? 'shaker-group' : ''}>
        <path d="M122 111L138 268Q180 284 222 268L238 111Z" fill="#f5edd8" fillOpacity=".5"/>
        <g clipPath={`url(#${uid}-cup)`}>
          {hasTea && <path className="tea-liquid" d="M119 170Q176 181 242 168V291H119Z" fill="#bd823d" opacity=".86" stroke="none"/>}
          {step === 7 && <path className="serving-liquid" d="M119 170Q176 181 242 168V291H119Z" fill="#bd823d" opacity=".86" stroke="none"/>}
          <LemonSlice x={166} y={245} r={25}/><LemonSlice x={200} y={227} r={25}/><LemonSlice x={161} y={208} r={20}/>
          {hasIce && <g className={step === 3 ? 'ice-fall' : ''} fill="#d2ded7" fillOpacity=".85" stroke="#829c99">{[[153,171],[190,167],[206,190],[171,190]].map(([x,y],i)=><rect key={i} x={x-11} y={y-10} width="23" height="23" rx="4" transform={`rotate(${i%2 ? 14 : -12} ${x} ${y})`}/>)}</g>}
          <path d="M145 133L155 256" fill="none" stroke="#fffaf0" strokeWidth="4" opacity=".6"/>
        </g>
        <ellipse cx="180" cy="111" rx="58" ry="13" fill="none"/>
        {(step === 2 || step === 4) && <g className="pestle"><path d="M171 48Q187 40 200 51L185 220Q174 232 160 217Z" fill="#bd8b55"/><ellipse cx="185" cy="49" rx="15" ry="6" fill="#dcc093"/><path d="M181 68L169 207" stroke="#e7c795" strokeWidth="3"/></g>}
        {step === 6 && <g><path d="M123 110L136 74L224 74L238 110Z" fill="#a5b5ab"/><path d="M152 74L155 48Q180 41 205 48L208 74Z" fill="#b8c3b6"/><path d="M163 52L160 70M146 82L139 102" stroke="#f2efdf" strokeWidth="4"/></g>}
        {(paperPlaced || step >= 9) && <g transform="translate(110 88)"><SealArt item="paper"/></g>}
        {sealed && <g transform="translate(110 67)"><SealArt item="lid"/></g>}
      </g>
      {step === 3 && <g className="ice-scoop" transform="translate(241 43) rotate(24)"><path d="M0 0h56v24q-27 24-56 0z" fill="#bbc8c0"/><path d="M56 5h35v13H56" fill="#8d9b92"/><path d="M9 5h18v16H9m21-13h18v17H30" fill="#e5eee1"/></g>}
      {step === 5 && <>
        <g className="tea-pitcher" transform="translate(46 27)"><path d="M0 0h57l10 55q-29 15-59-1z" fill="#bd823d" fillOpacity=".7"/><path d="M4 7h49M6 20h48" stroke="#e7cf91"/></g>
        <path className="pour-stream" d="M114 70Q144 87 173 173" stroke="#b07b38" strokeWidth="9" fill="none"/>
        <g className="sugar-spoon" transform="translate(252 44) rotate(20)"><ellipse cx="0" cy="0" rx="18" ry="10" fill="#dac59a"/><path d="M17 0h43" stroke="#9c7752" strokeWidth="6"/></g>
        <path className="sugar-fall" d="M251 60L208 164M244 63L198 157" stroke="#fff9e6" strokeDasharray="3 9" strokeWidth="4"/>
      </>}
      {step === 7 && <><g className="serving-pitcher" transform="translate(54 27) rotate(-28)"><path d="M0 0h54l-3 66H4Z" fill="#acb9ad"/><path d="M5 15h43v42H7Z" fill="#b78543"/></g><path className="pour-stream" d="M106 70Q140 80 173 171" fill="none" stroke="#bb8643" strokeWidth="10"/></>}
      {step === 8 && !sealed && <rect x="115" y="85" width="130" height="70" rx="16" stroke="#86915c" strokeDasharray="5 6" fill="#b6bb7e" fillOpacity=".12"/>}
      {step >= 9 && <>
        {packedCount >= 1 && <g className={step === 9 && count === 0 && animation ? 'packing-item' : ''} transform="translate(119 255)"><Duck/></g>}
        {packedCount >= 2 && <g className={step === 9 && count === 1 && animation ? 'packing-item' : ''}><path d="M245 259L222 94L240 74" stroke="#cfb05b" strokeWidth="7" fill="none"/></g>}
        {packedCount >= 3 && <g className={step === 9 && count === 2 && animation ? 'packing-item' : ''} transform="translate(209 148) rotate(-7)"><path d="M0 0H59V89L52 85L44 89L36 85L28 89L20 85L12 89L0 84Z" fill="#fff8e6"/><path d="M18-5H38V4H18Z" fill="#af6c51"/><text x="29" y="28" textAnchor="middle" stroke="none" fill={ink} fontSize="10">外卖订单</text><path d="M10 40H47M10 49H39M10 58H46M10 70H29" stroke="#baa98a"/></g>}
      </>}
    </>}
    <rect width="360" height="320" fill={`url(#${uid}-grain)`} stroke="none" pointerEvents="none"/>
    {!preview && step === 10 && <g fill="#9b9b61" stroke="none"><text x="62" y="71" fontSize="27">✧</text><text x="279" y="91" fontSize="24">✧</text></g>}
  </svg>;
}
