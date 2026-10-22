import GameCompletion from './GameCompletion.jsx';
import React, { useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react';
import JellyScene, { IngredientArt } from './JellyScene.jsx';
import { jellyInitial, jellyReducer, jellySteps, ingredients } from './jelly-game-model.js';
import './lemon-game.css';
import './jelly-game.css';

const hints = {1:'点击画面 1 次，让海蜇头浸入清水，再轻轻捞出。',2:'点击画面 1 次，把海蜇头放入微沸的水中。',3:'点击画面，把海蜇头放入冰水。',4:'分别点击香菜、红椒、黄瓜和蒜，备好四种辅料。',5:'点击画面 1 次，把米醋与糖加入碗中。',6:'点击画面 1 次，用木勺拌匀主料、辅料和料汁。',7:'点击画面 1 次，把料汁淋在冰盘中的海蜇头上。'};
export default function JellyfishGame(){
  const [state,dispatch]=useReducer(jellyReducer,jellyInitial);
  const [animation,setAnimation]=useState('');
  const [chopping,setChopping]=useState(null);
  const [overview,setOverview]=useState(false);
  const root=useRef(null),busy=useRef(false),timer=useRef(null);
  useEffect(()=>()=>clearTimeout(timer.current),[]);
  useLayoutEffect(()=>{const dialog=root.current?.closest('dialog');if(dialog)dialog.scrollTop=0;},[state.step,overview]);
  function run(name,duration,commit){
    if(busy.current)return;busy.current=true;setAnimation(name);
    timer.current=setTimeout(()=>{setAnimation('');busy.current=false;commit();},window.matchMedia('(prefers-reduced-motion: reduce)').matches?120:duration);
  }
  function tap(){
    const actions={1:['soak',1600],2:['blanch',1100],3:state.iceCount===0?['chill',900]:['drain',1500],5:['season',1500],6:['stir',1700],7:['dress',1400]};
    if(!actions[state.step])return;
    const [name,duration]=actions[state.step];run(name,duration,()=>dispatch({type:'TAP'}));
  }
  function prepare(id){
    if(busy.current||state.prepared.includes(id))return;
    setChopping(id);
    run('chop',650,()=>{
      dispatch({type:'PREPARE',id});setChopping(null);
      if(state.prepared.length===3){busy.current=true;setAnimation('ready');timer.current=setTimeout(()=>{dispatch({type:'PREPARED'});busy.current=false;setAnimation('');},650);}
    });
  }
  function reset(){clearTimeout(timer.current);busy.current=false;setAnimation('');setChopping(null);setOverview(false);dispatch({type:'RESET',start:true});}
  if(state.step===0||overview)return <div ref={root} className="tea-overview"><ol className="jelly-overview">{jellySteps.slice(1,8).map((label,i)=><li key={label}>{i===3?<div className="mini-ingredients">{ingredients.map(item=><IngredientArt key={item.id} id={item.id}/>)}</div>:<JellyScene step={i+1} preview/>}<span><b>{i+1}</b>{label}</span></li>)}</ol><button className="action" onClick={()=>{setOverview(false);if(state.step===0)dispatch({type:'START'});}}>{overview?'继续制作':'开始制作'}</button></div>;
  const complete=state.step===8;
  if(complete)return <GameCompletion id="jellyfish" name="凉拌海蜇头" containerRef={root} onReplay={reset} onOverview={()=>dispatch({type:'RESET'})}><JellyScene step={8}/></GameCompletion>;
  const instruction=state.step===3&&state.iceCount===1?'再点击 1 次，捞出海蜇头，抖动滤网沥干。':hints[state.step];
  return <div className="jelly-game" ref={root}><div className="tea-step-heading"><span>{complete?'完成':`${String(state.step).padStart(2,'0')} / 07`}</span><h3>{jellySteps[state.step]}</h3></div><progress className="tea-progress" value={complete?7:state.step-1} max="7" aria-label="制作总进度"/><p className="tea-instruction" aria-live="polite">{complete?'清爽入盘，欢喜开席。':instruction}</p>
    {state.step===4?<div className="ingredient-grid" aria-label="四种辅料">{ingredients.map(item=>{const ready=state.prepared.includes(item.id);return <button key={item.id} className={`ingredient-card${chopping===item.id?' chopping':''}${ready?' prepared':''}`} disabled={ready||!!animation} onClick={()=>prepare(item.id)} aria-label={`${item.name}${ready?'已备好':'，点击切备'}`}><IngredientArt id={item.id} chopped={ready}/><span>{item.name}</span><small>{ready?'✓ 已备好':chopping===item.id?'切备中…':'点击切备'}</small><span className="chop-knife" aria-hidden="true">╱</span></button>;})}</div>:<div className="tea-stage jelly-stage" role={complete?'group':'button'} aria-label={complete?'凉拌海蜇头完成图':instruction} aria-disabled={complete?undefined:!!animation} tabIndex={complete?undefined:0} onClick={tap} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();tap();}}}><JellyScene step={state.step} iceCount={state.iceCount} animation={animation}/></div>}
    <p className="tea-feedback" role="status">{animation?(state.step===4&&state.prepared.length===4?'四种辅料都备好了。':'制作中…'):state.step===4?`已备好 ${state.prepared.length} / 4 种`:state.step===3?`已完成 ${state.iceCount} / 2 次`:complete?'这一盘清脆，献给此刻的相聚。':'轻点画面，开始这一步。'}</p>
    <div className="tea-controls"><button className={complete?'action':'tea-text-button'} disabled={!!animation} onClick={complete?reset:()=>setOverview(true)}>{complete?'再做一盘':'查看全流程'}</button><button className="tea-text-button" disabled={!!animation} onClick={complete?()=>dispatch({type:'RESET'}):reset}>{complete?'返回全流程':'重新制作'}</button></div>
  </div>;
}
