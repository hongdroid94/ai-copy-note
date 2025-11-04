import { useState } from 'react'
import { analyzeNote, validateApiKey } from '../../utils/gemini'
import { createNote } from '../../lib/notes'
import { useToast } from '../../hooks/useToast'
import AILoadingModal from './AILoadingModal'
import AIAnalysisModal from './AIAnalysisModal'

function NoteInput({ onNoteSaved }) {
  const toast = useToast()
  const [content, setContent] = useState('')
  const [isAIEnabled, setIsAIEnabled] = useState(true)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [showAnalysisModal, setShowAnalysisModal] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  
  // AI 비활성화 시 수동 입력 필드
  const [manualCategory, setManualCategory] = useState('other')
  const [manualTags, setManualTags] = useState('')

  // 진행률 시뮬레이션 함수
  const simulateProgress = () => {
    return new Promise((resolve) => {
      const steps = [0, 25, 50, 75, 100]
      let currentStep = 0

      const interval = setInterval(() => {
        if (currentStep < steps.length - 1) {
          currentStep++
          setAnalysisProgress(steps[currentStep])
        } else {
          clearInterval(interval)
          resolve()
        }
      }, 600) // 각 단계마다 600ms
    })
  }

  const handleSave = async () => {
    if (!content.trim()) {
      toast.warning('메모 내용을 입력해주세요')
      return
    }

    // AI 분석이 활성화되어 있는 경우
    if (isAIEnabled) {
      // API 키 검증
      if (!validateApiKey()) {
        toast.error('Gemini API 키가 설정되지 않았습니다')
        return
      }

      try {
        setIsAnalyzing(true)
        setAnalysisProgress(0)

        // 진행률 시뮬레이션과 실제 API 호출을 병렬로 실행
        const [analysis] = await Promise.all([
          analyzeNote(content),
          simulateProgress()
        ])

        setAnalysisProgress(100)
        setAnalysisResult(analysis)
        
        // 잠시 후 결과 모달 표시
        setTimeout(() => {
          setIsAnalyzing(false)
          setShowAnalysisModal(true)
        }, 500)

      } catch (error) {
        console.error('AI 분석 오류:', error)
        toast.error('AI 분석 중 오류가 발생했습니다')
        setIsAnalyzing(false)
        setAnalysisProgress(0)
      }
    } else {
      // AI 분석 없이 수동 입력으로 저장
      const tags = manualTags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)
        .map(tag => tag.startsWith('#') ? tag : `#${tag}`)

      await saveNoteDirectly({
        title: content.substring(0, 50) + (content.length > 50 ? '...' : ''),
        content: content,
        category: manualCategory,
        tags: tags,
        summary: null,
      })
    }
  }

  const saveNoteDirectly = async (noteData) => {
    try {
      setIsSaving(true)
      
      const { data, error } = await createNote(noteData)
      
      if (error) throw error

      // 저장 성공
      setContent('')
      setManualTags('')
      setManualCategory('other')
      toast.success('메모가 저장되었습니다!')
      
      // 부모 컴포넌트에 저장 완료 알림 (목록 새로고침)
      if (onNoteSaved) {
        onNoteSaved()
      }
    } catch (error) {
      console.error('메모 저장 오류:', error)
      toast.error('메모 저장 중 오류가 발생했습니다')
    } finally {
      setIsSaving(false)
    }
  }

  const handleConfirmAnalysis = async (analysis) => {
    try {
      setShowAnalysisModal(false)
      setIsSaving(true)

      // AI 분석 결과로 메모 저장
      const noteData = {
        title: analysis.title,
        content: content,
        category: analysis.category,
        tags: analysis.tags,
        summary: analysis.summary,
      }

      const { data, error } = await createNote(noteData)
      
      if (error) throw error

      // 저장 성공
      setContent('')
      setAnalysisResult(null)
      toast.success('메모가 저장되었습니다!')
      
      // 부모 컴포넌트에 저장 완료 알림 (목록 새로고침)
      if (onNoteSaved) {
        onNoteSaved()
      }
    } catch (error) {
      console.error('메모 저장 오류:', error)
      toast.error('메모 저장 중 오류가 발생했습니다')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCloseAnalysisModal = () => {
    setShowAnalysisModal(false)
    setContent('')
    setAnalysisResult(null)
  }

  // 키보드 단축키 (Ctrl/Cmd + Enter로 저장)
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      handleSave()
    }
  }

  return (
    <>
      <div className="card p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span>💾</span>
          새 메모 만들기
        </h3>
        
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="붙여넣기 또는 직접 입력하세요... (Ctrl/Cmd + Enter로 저장)"
          className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white dark:bg-gray-700 dark:text-white"
          disabled={isAnalyzing || isSaving}
        />
        
        {/* AI 비활성화 시 수동 입력 필드 */}
        {!isAIEnabled && (
          <div className="mt-4 space-y-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                📂 카테고리
              </label>
              <select
                value={manualCategory}
                onChange={(e) => setManualCategory(e.target.value)}
                disabled={isAnalyzing || isSaving}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="code">💻 코드</option>
                <option value="link">🔗 링크</option>
                <option value="todo">✅ 할 일</option>
                <option value="idea">💡 아이디어</option>
                <option value="reference">📄 참고자료</option>
                <option value="other">🎯 기타</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                🏷️ 태그 (쉼표로 구분)
              </label>
              <input
                type="text"
                value={manualTags}
                onChange={(e) => setManualTags(e.target.value)}
                placeholder="예: react, javascript, tutorial"
                disabled={isAnalyzing || isSaving}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                # 기호는 자동으로 추가됩니다
              </p>
            </div>
          </div>
        )}
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={isAnalyzing || isSaving || !content.trim()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>저장 중...</span>
                </>
              ) : (
                <>
                  <span>💾</span>
                  <span>저장</span>
                </>
              )}
            </button>
            
            <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={isAIEnabled}
                onChange={(e) => setIsAIEnabled(e.target.checked)}
                className="rounded"
                disabled={isAnalyzing || isSaving}
              />
              <span className="select-none">
                AI 자동 분류 {isAIEnabled ? '✨' : ''}
              </span>
            </label>
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400">
            {content.length}자
          </div>
        </div>

        {/* API 키 경고 */}
        {isAIEnabled && !validateApiKey() && (
          <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              ⚠️ Gemini API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.
            </p>
          </div>
        )}
      </div>

      {/* AI 분석 로딩 모달 */}
      <AILoadingModal isOpen={isAnalyzing} progress={analysisProgress} />

      {/* AI 분석 결과 모달 */}
      <AIAnalysisModal
        isOpen={showAnalysisModal}
        onClose={handleCloseAnalysisModal}
        analysis={analysisResult}
        onConfirm={handleConfirmAnalysis}
        isSaving={isSaving}
      />
    </>
  )
}

export default NoteInput
