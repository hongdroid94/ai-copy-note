function AILoadingModal({ isOpen, progress }) {
  if (!isOpen) return null

  const steps = [
    { key: 'analyzing', label: '텍스트 분석 중...', threshold: 0 },
    { key: 'category', label: '카테고리 분류 중...', threshold: 25 },
    { key: 'tags', label: '태그 생성 중...', threshold: 50 },
    { key: 'title', label: '제목 생성 중...', threshold: 75 },
    { key: 'complete', label: '완료!', threshold: 100 }
  ]

  const currentStep = steps.reduce((acc, step) => {
    return progress >= step.threshold ? step : acc
  }, steps[0])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-8">
        {/* AI 로봇 애니메이션 */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4 animate-bounce">
            🤖
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            AI가 메모를 분석 중...
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            잠시만 기다려주세요
          </p>
        </div>

        {/* 진행률 바 */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-center mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {progress}%
          </div>
        </div>

        {/* 단계 표시 */}
        <div className="space-y-3">
          {steps.slice(0, -1).map((step, index) => {
            const isCompleted = progress > step.threshold
            const isCurrent = currentStep.key === step.key

            return (
              <div
                key={step.key}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isCurrent
                    ? 'bg-blue-50 dark:bg-blue-900'
                    : isCompleted
                    ? 'bg-green-50 dark:bg-green-900'
                    : 'bg-gray-50 dark:bg-gray-700'
                }`}
              >
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <span className="text-green-500 text-xl">✓</span>
                  ) : isCurrent ? (
                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span className="text-gray-400 text-xl">⏳</span>
                  )}
                </div>
                <span
                  className={`text-sm ${
                    isCurrent
                      ? 'text-blue-700 dark:text-blue-300 font-medium'
                      : isCompleted
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AILoadingModal

