import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function VerifyEmailPage() {
  const [email, setEmail] = useState('')
  const [resending, setResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [resendError, setResendError] = useState(null)

  useEffect(() => {
    // 로컬 스토리지에서 방금 가입한 이메일 가져오기
    const signupEmail = localStorage.getItem('pendingVerificationEmail')
    if (signupEmail) {
      setEmail(signupEmail)
    }
  }, [])

  const handleResendEmail = async () => {
    if (!email) {
      setResendError('이메일 주소를 찾을 수 없습니다')
      return
    }

    setResending(true)
    setResendError(null)
    setResendSuccess(false)

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      })

      if (error) throw error

      setResendSuccess(true)
      
      // 5초 후 성공 메시지 숨기기
      setTimeout(() => {
        setResendSuccess(false)
      }, 5000)
    } catch (error) {
      console.error('이메일 재전송 오류:', error)
      setResendError(error.message || '이메일 재전송에 실패했습니다')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
        {/* 아이콘 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-5xl">📧</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            이메일을 확인하세요
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            회원가입이 거의 완료되었습니다!
          </p>
        </div>

        {/* 안내 메시지 */}
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            <strong>{email || '입력하신 이메일'}</strong>로 인증 링크를 보냈습니다.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            이메일을 확인하고 인증 링크를 클릭하여 가입을 완료해주세요.
          </p>
        </div>

        {/* 재전송 성공 메시지 */}
        {resendSuccess && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg animate-fadeIn">
            <p className="text-green-800 dark:text-green-200 text-sm text-center">
              ✅ 인증 이메일을 다시 보냈습니다!
            </p>
          </div>
        )}

        {/* 재전송 에러 메시지 */}
        {resendError && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
            <p className="text-red-800 dark:text-red-200 text-sm text-center">
              ⚠️ {resendError}
            </p>
          </div>
        )}

        {/* 도움말 */}
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <span className="text-xl">💡</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                이메일이 오지 않나요?
              </p>
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                <li>스팸 메일함을 확인해보세요</li>
                <li>이메일 주소가 정확한지 확인하세요</li>
                <li>몇 분 정도 기다려보세요</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 재전송 버튼 */}
        <button
          onClick={handleResendEmail}
          disabled={resending || resendSuccess}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4"
        >
          {resending ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>전송 중...</span>
            </>
          ) : resendSuccess ? (
            <>
              <span>✓</span>
              <span>전송 완료</span>
            </>
          ) : (
            <>
              <span>📧</span>
              <span>인증 이메일 다시 보내기</span>
            </>
          )}
        </button>

        {/* 로그인 페이지로 */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            이미 인증을 완료하셨나요?
          </p>
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm"
          >
            로그인하기 →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmailPage

