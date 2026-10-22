import GameCompletion from './GameCompletion.jsx';
import React,{useEffect,useLayoutEffect,useReducer,useRef,useState} from 'react';
import {recipes,recipeInitial,recipeReducer} from './recipe-game-model.js';
import {cutDirection} from './lemon-game-model.js';
import RecipeScene from './RecipeScene.jsx';
import './lemon-game.css';
import './jelly-game.css';
import './pork-game.css';
import './recipe-game.css';
export default function RecipeGame({id}){
 const recipe=recipes[id];
 const [state,dispatch]=useReducer((s,e)=>recipeReducer(recipe,s,e),recipeInitial),[animation,setAnimation]=useState(''),[help,setHelp]=useState(false),[hint,setHint]=useState(''),[stroke,setStroke]=useState(null);
 const root=useRef(null),stage=useRef(null),busy=useRef(false),timer=useRef(null),gesture=useRef(null);
 useEffect(()=>()=>clearTimeout(timer.current),[]);
 useLayoutEffect(()=>{const dialog=root.current?.closest('dialog');if(dialog)dialog.scrollTop=0;},[state.step,help]);
 const current=recipe.steps[state.step-1],action=current?.actions[state.action],complete=state.step===recipe.steps.length+1;
 function animate(motion,event){if(busy.current)return;busy.current=true;setAnimation(motion);setHint('');timer.current=setTimeout(()=>{dispatch(event);busy.current=false;setAnimation('');},window.matchMedia('(prefers-reduced-motion: reduce)').matches?150:motion==='bake'?4200:motion==='steam'||motion==='toast'?1800:1200);}
 function tap(){if(action)animate(action.motion,{type:'TAP'});}
 function cut(direction){if(busy.current||!current?.cut)return;if(!direction){setHint('划过南瓜中心，横向、竖向各划一次。');return;}if(state.cuts.includes(direction)){setHint('这一刀已切好，请换一个方向。');return;}dispatch({type:'CUT',direction});setHint('');if(state.cuts.length===1)animate('cut',{type:'CUT_DONE'});}
 function point(e){const r=stage.current.getBoundingClientRect();return {x:(e.clientX-r.left)*360/r.width,y:(e.clientY-r.top)*320/r.height};}
 function down(e){if(!current?.cut||busy.current||!e.isPrimary)return;e.preventDefault();e.currentTarget.setPointerCapture(e.pointerId);gesture.current={...point(e),id:e.pointerId};setStroke({start:point(e),end:point(e)});}
 function up(e){if(gesture.current?.id!==e.pointerId)return;cut(cutDirection(gesture.current,point(e)));gesture.current=null;setStroke(null);}
 function reset(start=false){clearTimeout(timer.current);busy.current=false;gesture.current=null;setStroke(null);setAnimation('');setHint('');setHelp(false);dispatch({type:'RESET',start});}
 if(state.step===0||help)return <div className="tea-overview" ref={root}><ol className="jelly-overview">{recipe.steps.map((s,i)=><li key={s.title}><RecipeScene id={id} step={i+1} preview/><span><b>{i+1}</b>{s.title}</span></li>)}</ol><button className="action" onClick={()=>{setHelp(false);if(!state.step)dispatch({type:'START'});}}>{help?'继续制作':'开始制作'}</button></div>;
 if(complete)return <GameCompletion id={id} name={recipe.name} containerRef={root} onReplay={()=>reset(true)} onOverview={()=>reset(false)}><RecipeScene id={id} {...state}/></GameCompletion>;
 return <div className="recipe-game" ref={root}><div className="tea-step-heading"><span>{`${String(state.step).padStart(2,'0')} / ${String(recipe.steps.length).padStart(2,'0')}`}</span><h3>{current.title}</h3></div><progress className="tea-progress" max={recipe.steps.length} value={state.step-1} aria-label="制作总进度"/><p className="tea-instruction" aria-live="polite">{current.cut?'在南瓜上横划一次、竖划一次，切成四块。':`点击画面 1 次，${action.name}。`}</p>
 {!!current?.actions.length&&<ol className="pork-actions" aria-label="当前步骤的动作顺序">{current.actions.map((a,i)=><li key={a.name} className={i<state.action?'done':i===state.action?'current':''} aria-current={i===state.action?'step':undefined}>{i<state.action?'✓':i+1} {a.name}</li>)}</ol>}
 <div ref={stage} className={`tea-stage recipe-stage${current?.cut?' slice-stage':''}`} role={action?'button':'group'} tabIndex={action?0:undefined} aria-label={complete?`${recipe.name}完成图`:current.cut?'划过南瓜，横竖各一刀':`点击一次：${action.name}`} aria-disabled={action?!!animation:undefined} onClick={tap} onKeyDown={e=>{if(e.target===e.currentTarget&&['Enter',' '].includes(e.key)){e.preventDefault();tap();}}} onPointerDown={down} onPointerMove={e=>{if(gesture.current?.id===e.pointerId)setStroke({start:gesture.current,end:point(e)});}} onPointerUp={up} onPointerCancel={()=>{gesture.current=null;setStroke(null);}}>
 <RecipeScene id={id} {...state} animation={animation}/>{stroke&&<svg className="gesture-line" viewBox="0 0 360 320"><path d={`M${stroke.start.x} ${stroke.start.y}L${stroke.end.x} ${stroke.end.y}`} stroke="#fff8dc" strokeWidth="4" strokeDasharray="5 6"/></svg>}</div>
 <p className="tea-feedback" role="status">{hint||(animation==='bake'?'小闹钟转过 10 分钟，等待甜品出炉…':animation?`${current.cut?'切南瓜':action.name}中…`:complete?'制作完成':current.cut?`已切 ${state.cuts.length} / 2 刀`:`已完成 ${state.action} / ${current.actions.length} 个动作`)}</p>
 {current?.cut&&<div className="keyboard-cuts" aria-label="也可使用按钮切南瓜"><button disabled={state.cuts.includes('horizontal')||!!animation} onClick={()=>cut('horizontal')}>横切一刀 ↔</button><button disabled={state.cuts.includes('vertical')||!!animation} onClick={()=>cut('vertical')}>竖切一刀 ↕</button></div>}
 <div className="tea-controls"><button className={complete?'action':'tea-text-button'} disabled={!!animation} onClick={complete?()=>reset(true):()=>setHelp(true)}>{complete?'再做一次':'查看全流程'}</button><button className="tea-text-button" disabled={!!animation} onClick={()=>reset(!complete)}>{complete?'返回全流程':'重新制作'}</button></div></div>;
}
