import React,{useEffect,useState} from 'react';
import {heroImages} from '../hero-images.js';
import './game-completion.css';

// Keep the finished illustration visible while the photo loads and for at least 2.5 seconds.
export default function GameCompletion({id,name,children,onReplay,onOverview,containerRef}){
 const [held,setHeld]=useState(false),[loaded,setLoaded]=useState(false);
 useEffect(()=>{const timer=setTimeout(()=>setHeld(true),2500);return()=>clearTimeout(timer);},[]);
 const reveal=held&&loaded;
 return <div ref={containerRef} className="game-completion">
  <div className="tea-step-heading"><span>完成</span></div>
  <progress className="tea-progress" max="1" value="1" aria-label="制作总进度"/>
  <div className={`completion-art${reveal?' photo-visible':''}`} aria-label={`${name}完成图`}>
   <div className="completion-illustration" aria-hidden={reveal}>{children}</div>
   <img className="completion-photo" src={heroImages[id]} alt={`${name}主视觉实物图`} aria-hidden={!reveal} onLoad={()=>setLoaded(true)}/>
  </div>
  <p className="tea-feedback" role="status">制作完成</p>
  <div className="tea-controls"><button className="action" onClick={onReplay}>再做一次</button><button className="tea-text-button" onClick={onOverview}>返回全流程</button></div>
 </div>;
}
