import { useEffect, useRef } from "react";
import { Toast } from "bootstrap";
interface ToastsProps {
  isVisible: boolean;
  message: string;
}

function Toasts({ isVisible, message }: ToastsProps) {
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && toastRef.current) {
      const toastInstanceRef = new Toast(toastRef.current);
      toastInstanceRef.show();
      setTimeout(() => {
        toastInstanceRef.hide();
      }, 3000);
    }
  }, [isVisible]);

  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
      <div
        ref={toastRef}
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="me-auto">即時通知</strong>
        </div>
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
}

export default Toasts;
