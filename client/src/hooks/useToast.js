import { useToastContext } from '../contexts/ToastContext'

export function useToast() {
  const { addToast } = useToastContext()

  return {
    success: (message, duration) => addToast(message, 'success', duration),
    error: (message, duration) => addToast(message, 'error', duration),
    warning: (message, duration) => addToast(message, 'warning', duration),
    info: (message, duration) => addToast(message, 'info', duration),
  }
}

