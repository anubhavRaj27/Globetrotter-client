import React, { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const remove = (id) => setToasts((t) => t.filter((x) => x.id !== id));

  const push = useCallback((type, content) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, type, content }]);
    setTimeout(() => remove(id), 3000); // auto-dismiss after 3 s
  }, []);

  const api = {
    success: (msg) => push("success", msg),
    error: (msg) => push("error", msg),
    info: (msg) => push("info", msg),
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div style={styles.wrap}>
        {toasts.map((t) => (
          <div key={t.id} style={{ ...styles.toast, ...styles[t.type] }}>
            {t.content}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const styles = {
  wrap: {
    position: "fixed",
    top: 16,
    right: 16,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    minWidth: 200,
    zIndex: 1000,
  },
  toast: {
    padding: "8px 12px",
    borderRadius: 4,
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,.15)",
    fontSize: 14,
  },
  success: { borderLeft: "4px solid #52c41a" },
  error: { borderLeft: "4px solid #ff4d4f" },
  info: { borderLeft: "4px solid #1890ff" },
};
