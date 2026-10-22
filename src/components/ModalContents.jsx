import React, { useState } from 'react';
import LemonTeaGame from './LemonTeaGame.jsx';
import JellyfishGame from './JellyfishGame.jsx';
import PorkGame from './PorkGame.jsx';
import RecipeGame from './RecipeGame.jsx';
import {recipes} from './recipe-game-model.js';
import {ingredientImages} from '../ingredient-images.js';
import {mediaLinks} from '../media-links.js';

export function GalleryModal({ dish }) {
  return <div className="ingredient-gallery">{ingredientImages[dish.id].map((src,i)=><figure key={src}><img src={src} alt={`${dish.name}原材料图 ${i+1}`} loading="lazy" decoding="async"/><figcaption>{String(i+1).padStart(2,'0')} / 03</figcaption></figure>)}</div>;
}
export function GameModal({ dish }) {
  if (dish.id === 'lemon-tea') return <LemonTeaGame/>;
  if (dish.id === 'jellyfish') return <JellyfishGame/>;
  if (dish.id === 'pepper-pork') return <PorkGame/>;
  if (recipes[dish.id]) return <RecipeGame key={dish.id} id={dish.id}/>;
  return <ProcessPlaceholder dish={dish}/>;
}
function ProcessPlaceholder({ dish }) {
  const [step, setStep] = useState(0);
  const complete = step === dish.game.steps.length;
  return <div className="game"><div className="placeholder">交互区域占位</div><p aria-live="polite">{complete ? '流程演示完成' : dish.game.steps[step]}</p><progress value={step} max={dish.game.steps.length} aria-label="演示进度"/><p className="muted">仅演示状态切换，游戏内容待补充。</p><button className="action" onClick={() => setStep(complete ? 0 : step + 1)}>{complete ? '重新演示' : '下一步'}</button></div>;
}
export function ArticleModal({ dish }) {
  return <article className="reading" aria-label={dish.article.title}>{dish.article.paragraphs.map((text, i) => <p key={i}>{text}</p>)}</article>;
}
export function VideoModal({ dish }) {
  const media=mediaLinks[dish.id];
  return <div className="media-resource"><span className="media-play" aria-hidden="true">▷</span><h3>{dish.name}</h3><p>{media.platform}</p><a className="action" href={media.url} target="_blank" rel="noopener noreferrer">前往{media.platform}观看 ↗</a><p className="muted">在新窗口打开原视频</p></div>;
}
export const modalComponents = { gallery: GalleryModal, game: GameModal, article: ArticleModal, video: VideoModal };
