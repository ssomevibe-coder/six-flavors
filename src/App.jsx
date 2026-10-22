import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { HashRouter, Routes, Route, Link, Navigate, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { dishes, modalTypes, findDish, findModal } from './data.js';
import Modal from './components/Modal.jsx';
import { modalComponents } from './components/ModalContents.jsx';
import { dishArtwork } from './artwork.js';
import { heroImages } from './hero-images.js';

function Page({ level, title, back, children, isMenu = false, subtitle }) {
  const heading = useRef(null);
  useEffect(() => { document.title = `${title} · 六味之绪`; heading.current?.focus(); window.scrollTo(0, 0); }, [title]);
  return <section className={`page${isMenu ? ' illustrated-menu' : ''}`}><header><Link to={back || '/'} aria-label={back ? '返回上一级' : '返回首页'}>←</Link><span>六味之绪</span><small>{isMenu ? '01 — 06' : ''}</small></header><div className="page-heading"><small>A TABLE OF LITTLE JOYS</small><h1 ref={heading} tabIndex={-1}>{title}{isMenu && <span className="heading-flower" aria-hidden="true">✳</span>}</h1><p className="muted">{isMenu ? '一席六味，慢慢品尝。' : subtitle}</p></div>{children}</section>;
}
function HomePage() {
  useEffect(() => { document.title = '六味之绪'; }, []);
  return <section className="cover"><div className="topline"><span>A LITTLE TASTE OF LIFE</span></div><div><p className="intro">从物理滋养到精神复苏——<br/><span>一场关于「喜、怒、哀、惧、思、欲」的美食沙龙</span></p><h1>六味之绪</h1><Link className="start" to="/menu">START <span>⟶</span></Link><div className="cover-mark" aria-hidden="true">✳</div></div><footer>SIX FLAVORS, SIX FEELINGS</footer></section>;
}
function MenuPage() {
  return <Page level="L2" title="今日食单" back="/" isMenu><div className="menu-grid">{dishes.map((dish, i) => <Link className="dish" to={`/dish/${dish.id}`} key={dish.id} aria-label={`${dish.category} ${dish.name}，查看详情`}><img className="dish-artwork" src={dishArtwork[dish.id]} alt="" width="180" height="150"/><small>{String(i + 1).padStart(2, '0')} / {dish.category}</small><h2>{dish.name}</h2></Link>)}</div><footer className="menu-footer">— 好好吃饭，尽情生活 —<span aria-hidden="true">✳</span></footer></Page>;
}
function DishPage() {
  const { dishId } = useParams();
  const dish = findDish(dishId);
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const modalId = params.get('modal');
  const modal = findModal(modalId);
  const selectedTrigger = useRef(null);
  useLayoutEffect(() => { if (!modalId && selectedTrigger.current?.isConnected) selectedTrigger.current.focus(); }, [modalId]);
  if (!dish) return <NotFound/>;
  const Content = modal ? modalComponents[modal.id] : null;
  function openModal(id, event) { selectedTrigger.current = event.currentTarget; setParams({ modal: id }, { state: { modalFrom: location.pathname } }); }
  function closeModal() {
    if (location.state?.modalFrom === location.pathname) navigate(-1);
    else setParams({}, { replace: true }); // Direct-linked modal closes to its own dish.
  }
  return <Page level="L3" title={dish.name} subtitle={dish.subtitle} back="/menu"><img className="detail-hero" src={heroImages[dish.id]} alt={`${dish.name}主视觉`} decoding="async"/><nav className="features" aria-label="菜品内容">{modalTypes.map(item => <button className="feature" key={item.id} onClick={event => openModal(item.id, event)} aria-haspopup="dialog"><span className="feature-index">{item.label}</span><span>{item.title}</span><span aria-hidden="true">↗</span></button>)}</nav>{modal && <Modal key={`${dish.id}-${modal.id}`} title={modal.id === 'article' ? dish.article.title : modal.title} onClose={closeModal}><Content dish={dish}/></Modal>}{modalId && !modal && <p role="status">该内容窗口不存在。<button onClick={() => setParams({}, {replace:true})}>返回详情</button></p>}</Page>;
}
function NotFound() { return <Page level="404" title="页面不存在" back="/menu"><Link className="action" to="/menu">返回菜单</Link></Page>; }
export default function App() { return <HashRouter><main className="book"><Routes><Route path="/" element={<HomePage/>}/><Route path="/menu" element={<MenuPage/>}/><Route path="/dish/:dishId" element={<DishPage/>}/><Route path="/index.html" element={<Navigate to="/" replace/>}/><Route path="*" element={<NotFound/>}/></Routes></main></HashRouter>; }

