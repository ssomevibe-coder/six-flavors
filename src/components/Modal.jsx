import React, { useEffect, useRef } from 'react';

// Native dialog supplies focus containment, background inertness and Escape support.
export default function Modal({ title, onClose, children }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, []);
  return <dialog ref={dialogRef} className="modal" aria-labelledby="modal-title"
    onCancel={event => { event.preventDefault(); onClose(); }}
    onClick={event => { if (event.target === event.currentTarget) {
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
    } }}>
    <div className="modal-header"><h2 id="modal-title">{title}</h2><button className="close" onClick={onClose} aria-label="关闭弹窗" autoFocus>×</button></div>
    <div className="modal-content">{children}</div>
  </dialog>;
}
