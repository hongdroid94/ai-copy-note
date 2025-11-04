import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function LoginPage() {
  const navigate = useNavigate()
  const { signIn, user } = useAuth()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // 이미 로그인되어 있으면 대시보드로 리다이렉트
  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // 유효성 검사
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요')
      return
    }

    setLoading(true)

    const { data, error: signInError } = await signIn(email, password)

    if (signInError) {
      if (signInError.message.includes('Invalid login credentials')) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다')
      } else if (signInError.message.includes('Email not confirmed')) {
        // 이메일 미인증 사용자 처리
        setError('이메일 인증이 필요합니다.')
        setLoading(false)
        
        // 이메일을 저장하고 인증 페이지로 이동
        localStorage.setItem('pendingVerificationEmail', email)
        setTimeout(() => {
          navigate('/verify-email')
        }, 2000)
        return
      } else {
        setError(signInError.message)
      }
      setLoading(false)
      return
    }

    // 로그인 성공 - navigate는 useEffect에서 처리
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl relative">
        {/* 테스트 페이지 링크 */}
        <div className="absolute top-4 right-4">
          <Link
            to="/test"
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
          >
            🧪 API 테스트
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AI Copy Note
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            🤖 스마트 메모 저장소
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
            <p className="text-red-800 dark:text-red-200 text-sm text-center">
              ⚠️ {error}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              placeholder="example@email.com"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              placeholder="••••••••••"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>로그인 중...</span>
              </>
            ) : (
              '로그인하기'
            )}
          </button>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            계정이 없으신가요?{' '}
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-700 font-medium dark:text-blue-400"
            >
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
