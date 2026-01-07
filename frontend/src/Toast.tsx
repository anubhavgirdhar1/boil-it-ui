import { useEffect } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error';
}

interface Props {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export default function Toast({ toasts, onRemove }: Props) {
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        onRemove(toasts[0].id);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toasts, onRemove]);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          <div className="toast-icon">
            {toast.type === 'success' ? (
              <CheckCircle size={20} color="#4caf50" />
            ) : (
              <AlertCircle size={20} color="#f44336" />
            )}
          </div>
          <div className="toast-message">{toast.message}</div>
        </div>
      ))}
    </div>
  );
}
