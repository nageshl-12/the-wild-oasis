import { createPortal } from 'react-dom';

function Modal({ children, onClose }) {
  return createPortal(
    <div
      onClick={onClose}
      onTouchMove={onClose}
      className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto bg-black/40 p-3 backdrop-blur-[2px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="max-w-full animate-fade-in-down animate-duration-250"
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
