import { useState } from 'react'
import { Link } from 'react-router-dom'
import { analyzeNote, validateApiKey } from '../utils/gemini'

function TestPage() {
  const [content, setContent] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleTest = async () => {
    if (!content.trim()) {
      alert('테스트할 내용을 입력해주세요')
      return
    }

    setIsAnalyzing(true)
    setError(null)
    setResult(null)

    try {
      const analysis = await analyzeNote(content)
      setResult(analysis)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const apiKeyValid = validateApiKey()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        {/* 뒤로가기 링크 */}
        <div className="mb-4">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
          >
            <span>←</span>
            <span>메인 화면으로</span>
          </Link>
        </div>

        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            🤖 Gemini API 테스트
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            AI Copy Note - Gemini API 연동 테스트 페이지
          </p>
        </div>

        {/* API 키 상태 */}
        <div className={`card p-4 mb-6 ${apiKeyValid ? 'bg-green-50 dark:bg-green-900' : 'bg-red-50 dark:bg-red-900'}`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{apiKeyValid ? '✅' : '❌'}</span>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                API 키 상태: {apiKeyValid ? '정상' : '미설정'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {apiKeyValid 
                  ? 'Gemini API 키가 정상적으로 설정되었습니다.' 
                  : 'VITE_GEMINI_API_KEY 환경변수가 설정되지 않았습니다.'}
              </p>
            </div>
          </div>
        </div>

        {/* 입력 영역 */}
        <div className="card p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📝 테스트할 메모 입력
          </h3>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="여기에 텍스트를 입력하세요...

예시:
- React 컴포넌트 최적화 방법
- https://nextjs.org/docs
- 프로젝트 문서 작성하기"
            className="w-full h-48 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none bg-white dark:bg-gray-700 dark:text-white"
          />
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={handleTest}
              disabled={isAnalyzing || !apiKeyValid}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? '🔄 분석 중...' : '🚀 AI 분석 시작'}
            </button>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {content.length}자
            </span>
          </div>
        </div>

        {/* 로딩 */}
        {isAnalyzing && (
          <div className="card p-8 mb-6 text-center">
            <div className="text-6xl mb-4 animate-bounce">🤖</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              AI가 텍스트를 분석하고 있습니다...
            </h3>
            <div className="flex justify-center">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        )}

        {/* 에러 */}
        {error && (
          <div className="card p-6 mb-6 bg-red-50 dark:bg-red-900 border-2 border-red-200 dark:border-red-700">
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2 flex items-center gap-2">
              <span>❌</span>
              오류 발생
            </h3>
            <p className="text-red-700 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* 결과 */}
        {result && !isAnalyzing && (
          <div className="card p-6 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <span>✨</span>
              AI 분석 결과
            </h3>

            <div className="space-y-4">
              {/* 카테고리 */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">
                  📂 카테고리
                </div>
                <div className="text-xl font-semibold text-gray-900 dark:text-white">
                  {result.categoryName || result.category}
                </div>
              </div>

              {/* 제목 */}
              <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">
                  📝 제목
                </div>
                <div className="text-xl font-semibold text-gray-900 dark:text-white">
                  {result.title}
                </div>
              </div>

              {/* 태그 */}
              <div className="p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">
                  🏷️ 태그
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-200 dark:bg-purple-800 text-purple-900 dark:text-purple-100 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 요약 */}
              {result.summary && (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">
                    🤖 AI 요약
                  </div>
                  <div className="text-gray-900 dark:text-white">
                    {result.summary}
                  </div>
                </div>
              )}

              {/* 원본 응답 (디버깅용) */}
              <details className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <summary className="cursor-pointer font-medium text-gray-700 dark:text-gray-300">
                  🔍 원본 응답 보기 (디버깅용)
                </summary>
                <pre className="mt-3 p-3 bg-gray-100 dark:bg-gray-900 rounded text-xs overflow-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        )}

        {/* 테스트 예시 */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            💡 테스트 예시
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                코드 예시:
              </div>
              <code className="text-sm text-gray-600 dark:text-gray-400">
                React 컴포넌트 최적화를 위해 useMemo와 useCallback을 사용하는 방법
              </code>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                링크 예시:
              </div>
              <code className="text-sm text-gray-600 dark:text-gray-400">
                https://nextjs.org/docs - Next.js 공식 문서
              </code>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                할일 예시:
              </div>
              <code className="text-sm text-gray-600 dark:text-gray-400">
                프로젝트 PRD 문서 작성 완료하고 팀에 공유하기
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestPage

