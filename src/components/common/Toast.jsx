import { useEffect } from "react";

function Toast({ message, type, onClose, darkMode }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColors = {
    success: darkMode ? "bg-green-600" : "bg-green-500",
    error: darkMode ? "bg-red-600" : "bg-red-500",
    info: darkMode ? "bg-blue-600" : "bg-blue-500",
  };

  const icons = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-bounce-in">
      <div className={`${bgColors[type]} text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 min-w-[250px]`}>
        <span className="text-lg">{icons[type]}</span>
        <p className="text-sm font-medium">{message}</p>
        <button onClick={onClose} className="ml-auto text-white/80 hover:text-white">✕</button>
      </div>
    </div>
  );
}

export default Toast;