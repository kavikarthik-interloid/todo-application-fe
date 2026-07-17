const Modal = ({
  onClose,
  labelledBy,
  describedBy,
  children,
  maxWidth = "max-w-[650px]",
  Position = "absolute",
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-5 pb-5 pt-[8vh] backdrop-blur-sm animate-[overlay-in_.16s_ease]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        className={`${maxWidth} ${Position} max-h-[84vh] overflow-y-auto w-full absolute top-50 rounded-2xl border border-line bg-surface shadow-[0_20px_50px_-12px_rgba(33,31,27,0.35)] animate-[modal-in_.18s_cubic-bezier(.2,.7,.3,1)]`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
