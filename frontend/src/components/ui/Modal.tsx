import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  closable?: boolean;
  className?: string;
}

export default function Modal({
  children,
  isOpen,
  onClose,
  title,
  closable = true,
  className = ''
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className={`modal-box ${className}`}>
        {closable && (
          <button 
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
        )}
        
        {title && <h3 className="font-bold text-lg mb-4">{title}</h3>}
        
        <div>{children}</div>
        
        <div className="modal-action">
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}