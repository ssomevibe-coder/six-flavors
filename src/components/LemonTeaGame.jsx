import GameCompletion from './GameCompletion.jsx';
import React, { useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react';
import TeaScene, { SealArt } from './TeaScene.jsx';
import { initialGame, gameReducer, steps, tapGoals, cutDirection, isLidDrop } from './lemon-game-model.js';
import './lemon-game.css';

const instructions = {
  1: '在柠檬上横划一次、竖划一次，切成四块。', 2: '点击画面 3 次，把柠檬的香气捣出来。',
  3: '点击画面 1 次，让冰块落入杯中。', 4: '点击画面 3 次，把冰与柠檬一起捣碎。',
  5: '点击画面 1 次，倒入茶汤与糖。', 6: '点击画面 1 次，让雪克杯左右摇晃两下。',
  7: '点击画面 1 次，把茶汤倒进外带杯。', 8: '先把垫纸拖到杯口，再拖动杯盖。',
  9: '点击画面 3 次，依次放入鸭子、吸管，贴上订单。',
};
const animations = { 2: ['pound', 520], 3: ['ice', 850], 4: ['pound', 520], 5: ['pour', 1300], 6: ['shake', 1100], 7: ['serve', 1300], 9: ['pack', 650] };
function Overview({ onStart, returning }) {
  return <div className="tea-overview"><ol className="tea-process">{steps.slice(1,10).map((label,index) => <li key={label}><TeaScene step={index+1} cuts={index===0 ? ['horizontal','vertical'] : []} paperPlaced={index===7} lidPlaced={index===7} count={index===8 ? 3 : 0} preview/><span><b>{index+1}</b>{label}</span></li>)}</ol><button className="action" onClick={onStart}>{returning ? '继续制作' : '开始制作'}</button></div>;
}
export default function LemonTeaGame() {
  const [state, dispatch] = useReducer(gameReducer, initialGame);
  const [animation, setAnimation] = useState('');
  const [help, setHelp] = useState(false);
  const [hint, setHint] = useState('');
  const [drag, setDrag] = useState(null);
  const [stroke, setStroke] = useState(null);
  const rootRef = useRef(null), stageRef = useRef(null), gesture = useRef(null), dragStart = useRef(null), busy = useRef(false), timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  useLayoutEffect(() => { const dialog = rootRef.current?.closest('dialog'); if (dialog) dialog.scrollTop = 0; }, [state.step, help]);
  function animate(name, duration, action, after) {
    if (busy.current) return;
    busy.current = true; setAnimation(name); setHint('');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    timer.current = setTimeout(() => { dispatch(action); setAnimation(''); busy.current = false; after?.(); }, reduced ? 120 : duration);
  }
  function point(event) {
    const r = stageRef.current.getBoundingClientRect();
    return { x: (event.clientX-r.left)*360/r.width, y: (event.clientY-r.top)*320/r.height };
  }
  function tap() {
    if (busy.current || !tapGoals[state.step]) return;
    const [name, duration] = animations[state.step];
    animate(name,duration,{type:'TAP'});
  }
  function cut(direction) {
    if (busy.current || state.step !== 1) return;
    if (!direction) { setHint('从柠檬的一侧划到另一侧，试着划直一点。'); return; }
    if (state.cuts.includes(direction)) { setHint(direction==='horizontal' ? '横向已切好，再竖着划一刀。' : '竖向已切好，再横着划一刀。'); return; }
    dispatch({type:'CUT',direction}); setHint('');
    if (state.cuts.length === 1) animate('cut',700,{type:'CUT_DONE'});
  }
  function pointerDown(event) {
    if (state.step !== 1 || busy.current || !event.isPrimary) return;
    event.preventDefault(); event.currentTarget.setPointerCapture(event.pointerId);
    gesture.current = { ...point(event), pointerId:event.pointerId };
    setStroke({start:point(event),end:point(event)});
  }
  function pointerMove(event) {
    if (!gesture.current || gesture.current.pointerId !== event.pointerId) return;
    setStroke({start:gesture.current,end:point(event)});
  }
  function pointerUp(event) {
    if (!gesture.current || gesture.current.pointerId !== event.pointerId) return;
    cut(cutDirection(gesture.current,point(event))); gesture.current=null;setStroke(null);
  }
  function place(item) {
    if (busy.current || (item==='lid' && !state.paper)) return;
    dispatch({type:'PLACE',item});setHint('');
    if (item==='lid') animate('seal',650,{type:'SEAL_DONE'});
  }
  function startDrag(event,item) {
    if (!event.isPrimary || busy.current || (item==='lid' && !state.paper)) return;
    event.preventDefault();event.stopPropagation();event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current={x:event.clientX,y:event.clientY,item,pointerId:event.pointerId};setDrag({item,x:0,y:0});
  }
  function moveDrag(event) {
    const d=dragStart.current;if(!d || d.pointerId!==event.pointerId)return;
    setDrag({item:d.item,x:event.clientX-d.x,y:event.clientY-d.y});
  }
  function endDrag(event) {
    const d=dragStart.current;if(!d || d.pointerId!==event.pointerId)return;
    if(isLidDrop(point(event))) place(d.item); else setHint('拖到杯口的虚线区域，再松开手指。');
    dragStart.current=null;setDrag(null);
  }
  function reset() {clearTimeout(timer.current);busy.current=false;setAnimation('');setHint('');setStroke(null);setDrag(null);gesture.current=null;dragStart.current=null;dispatch({type:'RESET',start:true});}
  if(state.step===0 || help) return <div ref={rootRef}><Overview returning={help} onStart={()=>{setHelp(false);if(state.step===0)dispatch({type:'START'});}}/></div>;
  const complete=state.step===10;
  if(complete)return <GameCompletion id="lemon-tea" name="柠檬茶" containerRef={rootRef} onReplay={reset} onOverview={()=>dispatch({type:'RESET'})}><TeaScene step={10} count={3} cuts={state.cuts} paperPlaced lidPlaced/></GameCompletion>;
  const progress=complete?9:state.step-1;
  return <div className="lemon-game" ref={rootRef}>
    <div className="tea-step-heading"><span>{complete ? '完成' : `${String(state.step).padStart(2,'0')} / 09`}</span><h3>{steps[state.step]}</h3></div>
    <progress className="tea-progress" value={progress} max="9" aria-label="制作总进度"/>
    <p className="tea-instruction" aria-live="polite">{complete ? '清爽已打包，带上好心情出发吧。' : instructions[state.step]}</p>
    <div ref={stageRef} className={`tea-stage${state.step===1?' slice-stage':''}${state.step===8?' seal-stage':''}`} data-step={state.step} aria-label={tapGoals[state.step] ? instructions[state.step] : '制作画面'} role={tapGoals[state.step] ? 'button' : 'group'} tabIndex={tapGoals[state.step] ? 0 : undefined} aria-disabled={tapGoals[state.step] ? !!animation : undefined}
      onClick={tap} onKeyDown={event=>{if(event.target===event.currentTarget && (event.key==='Enter'||event.key===' ')){event.preventDefault();tap();}}}
      onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={()=>{gesture.current=null;setStroke(null);}}>
      <TeaScene step={state.step} count={state.count} cuts={state.cuts} paperPlaced={state.paper} lidPlaced={state.lid} animation={animation}/>
      {stroke && <svg className="gesture-line" viewBox="0 0 360 320"><path d={`M${stroke.start.x} ${stroke.start.y}L${stroke.end.x} ${stroke.end.y}`} stroke="#fff8dc" strokeWidth="4" strokeLinecap="round" strokeDasharray="5 6"/></svg>}
      {state.step===8 && !state.lid && <span className="drop-label">杯口 · 放在这里</span>}
    </div>
    {state.step===8 && <div className="seal-tray" aria-label="封杯材料">{['paper','lid'].map(item=><button key={item} className={`seal-piece ${drag?.item===item?'dragging':''}`} disabled={item==='paper'?state.paper:!state.paper||state.lid} aria-label={item==='paper'?'拖动垫纸到杯口（键盘按回车放置）':'拖动杯盖到杯口（键盘按回车放置）'}
      style={drag?.item===item?{transform:`translate(${drag.x}px,${drag.y}px)`}:undefined}
      onPointerDown={e=>startDrag(e,item)} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={()=>{dragStart.current=null;setDrag(null);}}
      onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();place(item);}}}>
      <SealArt item={item}/><span>{item==='paper'?(state.paper?'垫纸已就位':'① 垫纸'):(state.lid?'杯盖已就位':'② 杯盖')}</span></button>)}</div>}
    <div className="tea-feedback" role="status">{hint || (animation ? '制作中…' : state.step===1 ? `已切 ${state.cuts.length} / 2 刀` : state.step===8 ? (state.paper?'垫纸好了，把杯盖拖到杯口。':'先拖动左边的垫纸。') : state.step===9 ? ['第一下：放入小鸭子','第二下：放入吸管','第三下：贴上外卖订单'][state.count] : tapGoals[state.step] ? `已完成 ${state.count} / ${tapGoals[state.step]} 次` : '这一杯，属于你。')}</div>
    {state.step===1 && <div className="keyboard-cuts" aria-label="也可使用按钮切柠檬"><button disabled={state.cuts.includes('horizontal')||!!animation} onClick={()=>cut('horizontal')}>横切一刀 ↔</button><button disabled={state.cuts.includes('vertical')||!!animation} onClick={()=>cut('vertical')}>竖切一刀 ↕</button></div>}
    <div className="tea-controls">{complete ? <button className="action" onClick={reset}>再做一杯</button> : <button className="tea-text-button" disabled={!!animation} onClick={()=>setHelp(true)}>查看全流程</button>}<button className="tea-text-button" disabled={!!animation} onClick={complete?()=>dispatch({type:'RESET'}):reset}>{complete?'返回全流程':'重新制作'}</button></div>
  </div>;
}
