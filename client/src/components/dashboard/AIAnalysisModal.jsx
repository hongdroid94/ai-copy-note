import { useEffect } from 'react'

function AIAnalysisModal({ isOpen, onClose, analysis, onConfirm, isSaving }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen || !analysis) return null

  const getCategoryIcon = (category) => {
    const icons = {
      code: '💻',
      link: '🔗',
      todo: '✅',
      idea: '💡',
      reference: '📄',
      other: '🎯'
    }
    return icons[category] || '🎯'
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-fadeIn">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">✅</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            메모가 저장되었습니다!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            AI가 자동으로 분석한 결과입니다
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {/* 카테고리 */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>📂</span>
              <span className="font-medium">카테고리</span>
            </div>
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
              <span>{getCategoryIcon(analysis.category)}</span>
              <span>{analysis.categoryName || analysis.category}</span>
            </div>
          </div>

          {/* 제목 */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
              <span>📝</span>
              <span className="font-medium">제목</span>
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {analysis.title}
            </div>
          </div>

          {/* 태그 */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>🏷️</span>
              <span className="font-medium">태그</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 요약 (있는 경우) */}
          {analysis.summary && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                <span>🤖</span>
                <span className="font-medium">AI 요약</span>
              </div>
              <div className="text-gray-900 dark:text-white">
                {analysis.summary}
              </div>
            </div>
          )}
        </div>

        {/* 에러 메시지 (있는 경우) */}
        {analysis.error && (
          <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              ⚠️ AI 분석 중 오류가 발생하여 기본값으로 설정되었습니다.
            </p>
          </div>
        )}

        {/* 액션 버튼 */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            닫기
          </button>
          <button
            onClick={() => onConfirm(analysis)}
            disabled={isSaving}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>저장 중...</span>
              </>
            ) : (
              '저장하기'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIAnalysisModal

