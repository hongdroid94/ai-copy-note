import Toast from './Toast'
import { useToastContext } from '../../contexts/ToastContext'

function ToastContainer() {
  const { toasts, removeToast } = useToastContext()

  return (
    <div className="fixed top-20 right-6 z-[9999] flex flex-col gap-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={removeToast}
          duration={toast.duration}
        />
      ))}
    </div>
  )
}

export default ToastContainer

