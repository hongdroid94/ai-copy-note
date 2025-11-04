import { useEffect } from 'react'

function DeleteConfirmModal({ isOpen, onClose, onConfirm, noteTitle }) {
  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
        {/* 아이콘 */}
        <div className="text-center mb-4">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            메모를 삭제하시겠습니까?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            이 작업은 되돌릴 수 없습니다.
          </p>
          
          {/* 메모 제목 표시 */}
          {noteTitle && (
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4">
              <p className="text-sm text-gray-900 dark:text-white font-medium truncate">
                "{noteTitle}"
              </p>
            </div>
          )}
        </div>

        {/* 버튼 */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal

