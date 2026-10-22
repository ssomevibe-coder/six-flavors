import GameCompletion from './GameCompletion.jsx';
import React,{useEffect,useLayoutEffect,useReducer,useRef,useState} from 'react';
import {porkSteps,porkActions,porkInitial,porkReducer} from './pork-game-model.js';
import PorkScene from './PorkScene.jsx';
import './lemon-game.css';
import './jelly-game.css';
import './pork-game.css';
export default function PorkGame(){
 const [state,dispatch]=useReducer(porkReducer,porkInitial),[animation,setAnimation]=useState(''),[help,setHelp]=useState(false);
 const root=useRef(null),lock=useRef(false),timer=useRef(null);
 useEffect(()=>()=>clearTimeout(timer.current),[]);
 useLayoutEffect(()=>{const dialog=root.current?.closest('dialog');if(dialog)dialog.scrollTop=0;},[state.step,help]);
 const action=porkActions[state.step]?.[state.action];
 function tap(){if(lock.current||!action)return;lock.current=true;setAnimation(action.animation);timer.current=setTimeout(()=>{dispatch({type:'TAP'});lock.current=false;setAnimation('');},window.matchMedia('(prefers-reduced-motion: reduce)').matches?120:action.animation==='broth'?1900:action.animation==='plate'?1800:1200);}
 function reset(){clearTimeout(timer.current);lock.current=false;setAnimation('');setHelp(false);dispatch({type:'RESET',start:true});}
 if(state.step===0||help)return <div className="tea-overview" ref={root}><ol className="jelly-overview">{porkSteps.slice(1,8).map((title,i)=><li key={title}><PorkScene step={i+1} preview/><span><b>{i+1}</b>{title}</span></li>)}</ol><button className="action" onClick={()=>{setHelp(false);if(state.step===0)dispatch({type:'START'});}}>{help?'继续制作':'开始制作'}</button></div>;
 const complete=state.step===8;
 if(complete)return <GameCompletion id="pepper-pork" name="青椒拆骨肉" containerRef={root} onReplay={reset} onOverview={()=>dispatch({type:'RESET'})}><PorkScene step={8}/></GameCompletion>;
 return <div className="pork-game" ref={root}><div className="tea-step-heading"><span>{complete?'完成':`${String(state.step).padStart(2,'0')} / 07`}</span><h3>{porkSteps[state.step]}</h3></div><progress className="tea-progress" value={complete?7:state.step-1} max="7" aria-label="制作总进度"/><p className="tea-instruction" aria-live="polite">{complete?'椒香与热气，都已盛入盘中。':`点击画面 1 次，${action.name}。`}</p>
 {!complete&&<ol className="pork-actions" aria-label="当前步骤的动作顺序">{porkActions[state.step].map((a,i)=><li key={a.name} className={i<state.action?'done':i===state.action?'current':''} aria-current={i===state.action?'step':undefined}>{i<state.action?'✓':i+1} {a.name}</li>)}</ol>}
 <div className="tea-stage pork-stage" role={complete?'group':'button'} tabIndex={complete?undefined:0} aria-label={complete?'青椒拆骨肉完成图':`点击一次：${action.name}`} aria-disabled={complete?undefined:!!animation} onClick={tap} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();tap();}}}><PorkScene {...state} animation={animation}/></div>
 <p className="tea-feedback" role="status">{animation?`${action.name}中…`:complete?'这一盘家常，趁热尝尝。':`已完成 ${state.action} / ${porkActions[state.step].length} 个动作`}</p><div className="tea-controls"><button className={complete?'action':'tea-text-button'} disabled={!!animation} onClick={complete?reset:()=>setHelp(true)}>{complete?'再做一盘':'查看全流程'}</button><button className="tea-text-button" disabled={!!animation} onClick={complete?()=>dispatch({type:'RESET'}):reset}>{complete?'返回全流程':'重新制作'}</button></div></div>;
}
