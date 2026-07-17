import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { CheckIcon, CloseIcon } from "./icons";

const ToastContext = createContext(() => {});

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const remove = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  // Flag the toast as leaving so it plays the shrink-to-center fade, then
  // drop it from the DOM once that animation has finished.
  const dismiss = useCallback(
    (id) => {
      setToasts((list) =>
        list.map((t) => (t.id === id ? { ...t, leaving: true } : t)),
      );
      setTimeout(() => remove(id), 220);
    },
    [remove],
  );

  const toast = useCallback(
    (message, options = {}) => {
      const id = (idRef.current += 1);
      setToasts((list) => [...list, { id, message, ...options }]);
      const duration = options.duration ?? 2000;
      setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex flex-col items-center gap-2 p-4"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`pointer-events-auto flex items-center gap-3 rounded-xl px-4 py-2.5 shadow-[0_10px_30px_-8px_rgba(33,31,27,0.4)] ${
              t.leaving
                ? "animate-[toast-out_.22s_ease_forwards]"
                : "animate-[toast-in_.2s_ease]"
            } ${
              t.variant === "error"
                ? "bg-high text-white"
                : "bg-toast text-white"
            }`}
          >
            {t.variant !== "error" && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15">
                <CheckIcon className="h-3 w-3" />
              </span>
            )}
            <span className="text-[13.5px] font-medium">{t.message}</span>
            {t.actionLabel && (
              <button
                onClick={() => {
                  t.onAction?.();
                  dismiss(t.id);
                }}
                className="rounded-md border border-white/30 px-2 py-1 text-[12.5px] font-semibold text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                {t.actionLabel}
              </button>
            )}
            <button
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
              className="flex h-6 w-6 items-center justify-center rounded-md text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
