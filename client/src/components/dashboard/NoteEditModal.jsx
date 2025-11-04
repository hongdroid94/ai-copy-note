import { useState, useEffect } from 'react'
import { analyzeNote, validateApiKey } from '../../utils/gemini'
import { updateNote } from '../../lib/notes'
import { useToast } from '../../hooks/useToast'

function NoteEditModal({ isOpen, onClose, note, onSaved }) {
  const toast = useToast()
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('other')
  const [tags, setTags] = useState('')
  const [summary, setSummary] = useState('')
  const [isAIEnabled, setIsAIEnabled] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // 메모 데이터 로드
  useEffect(() => {
    if (note) {
      setContent(note.content || '')
      setTitle(note.title || '')
      setCategory(note.category || 'other')
      setTags(note.tags ? note.tags.map(tag => tag.replace('#', '')).join(', ') : '')
      setSummary(note.summary || '')
    }
  }, [note])

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen && !isAnalyzing && !isSaving) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose, isAnalyzing, isSaving])

  const handleAIAnalysis = async () => {
    if (!content.trim()) {
      toast.warning('메모 내용을 입력해주세요')
      return
    }

    if (!validateApiKey()) {
      toast.error('Gemini API 키가 설정되지 않았습니다')
      return
    }

    try {
      setIsAnalyzing(true)
      
      const analysis = await analyzeNote(content)
      
      // AI 분석 결과로 필드 업데이트
      setTitle(analysis.title || title)
      setCategory(analysis.category || category)
      setTags(analysis.tags ? analysis.tags.map(tag => tag.replace('#', '')).join(', ') : tags)
      setSummary(analysis.summary || summary)
      
      toast.success('AI 분석이 완료되었습니다!')
    } catch (error) {
      console.error('AI 분석 오류:', error)
      toast.error('AI 분석 중 오류가 발생했습니다')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleSave = async () => {
    if (!content.trim()) {
      toast.warning('메모 내용을 입력해주세요')
      return
    }

    if (!title.trim()) {
      toast.warning('제목을 입력해주세요')
      return
    }

    try {
      setIsSaving(true)

      // 태그 파싱
      const parsedTags = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)
        .map(tag => tag.startsWith('#') ? tag : `#${tag}`)

      const updates = {
        title: title.trim(),
        content: content.trim(),
        category,
        tags: parsedTags,
        summary: summary.trim() || null,
      }

      const { error } = await updateNote(note.id, updates)

      if (error) throw error

      toast.success('메모가 수정되었습니다!')
      onSaved()
      onClose()
    } catch (error) {
      console.error('메모 수정 오류:', error)
      toast.error('메모 수정 중 오류가 발생했습니다')
    } finally {
      setIsSaving(false)
    }
  }

  if (!isOpen || !note) return null

  const getCategoryIcon = (cat) => {
    const icons = {
      code: '💻',
      link: '🔗',
      todo: '✅',
      idea: '💡',
      reference: '📄',
      other: '🎯'
    }
    return icons[cat] || '🎯'
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full my-8 animate-fadeIn">
        {/* 헤더 */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span>✏️</span>
              <span>메모 수정</span>
            </h2>
            <button
              onClick={onClose}
              disabled={isAnalyzing || isSaving}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl disabled:opacity-50"
            >
              ✕
            </button>
          </div>
        </div>

        {/* 본문 */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* 제목 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              📝 제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isAnalyzing || isSaving}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white disabled:opacity-50"
              placeholder="메모 제목을 입력하세요"
            />
          </div>

          {/* 내용 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              📄 내용
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isAnalyzing || isSaving}
              className="w-full h-40 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white dark:bg-gray-700 dark:text-white disabled:opacity-50"
              placeholder="메모 내용을 입력하세요"
            />
          </div>

          {/* 카테고리 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              📂 카테고리
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={isAnalyzing || isSaving}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <option value="code">💻 코드</option>
              <option value="link">🔗 링크</option>
              <option value="todo">✅ 할 일</option>
              <option value="idea">💡 아이디어</option>
              <option value="reference">📄 참고자료</option>
              <option value="other">🎯 기타</option>
            </select>
          </div>

          {/* 태그 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              🏷️ 태그 (쉼표로 구분)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              disabled={isAnalyzing || isSaving}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white disabled:opacity-50"
              placeholder="예: react, javascript, tutorial"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              # 기호는 자동으로 추가됩니다
            </p>
          </div>

          {/* 요약 (선택) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              🤖 요약 (선택)
            </label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              disabled={isAnalyzing || isSaving}
              className="w-full h-20 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white dark:bg-gray-700 dark:text-white disabled:opacity-50"
              placeholder="메모의 요약을 입력하세요 (선택사항)"
            />
          </div>

          {/* AI 분석 버튼 */}
          <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
            <div className="flex-1">
              <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
                ✨ AI로 자동 분류하기
              </p>
              <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                내용을 기반으로 제목, 카테고리, 태그를 자동 생성합니다
              </p>
            </div>
            <button
              onClick={handleAIAnalysis}
              disabled={isAnalyzing || isSaving || !validateApiKey()}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>분석 중...</span>
                </>
              ) : (
                '🤖 AI 분석'
              )}
            </button>
          </div>
        </div>

        {/* 푸터 */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
          <button
            onClick={onClose}
            disabled={isAnalyzing || isSaving}
            className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={isAnalyzing || isSaving || !content.trim() || !title.trim()}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>저장 중...</span>
              </>
            ) : (
              '💾 저장하기'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoteEditModal

