import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function Header({ onSearch, filterFavorite, onToggleFavorite }) {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    if (onSearch) {
      onSearch(query)
    }
  }

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (!error) {
      navigate('/login')
    }
  }

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          AI Copy Note
        </h1>
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="검색..."
              className="w-full px-4 py-2 pl-10 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* 사용자 메뉴 */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <span className="text-2xl">👤</span>
            <span className="text-sm text-gray-700 dark:text-gray-300 hidden md:block">
              {user?.email}
            </span>
          </button>

          {/* 드롭다운 메뉴 */}
          {showUserMenu && (
            <>
              {/* 배경 오버레이 */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowUserMenu(false)}
              />
              
              {/* 메뉴 */}
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-20 overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.email}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    로그인됨
                  </p>
                </div>
                
                <div className="py-2">
                  <button
                    onClick={() => {
                      if (onToggleFavorite) {
                        onToggleFavorite()
                      }
                      setShowUserMenu(false)
                    }}
                    className={`w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 ${
                      filterFavorite ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''
                    }`}
                  >
                    <span>{filterFavorite ? '⭐' : '☆'}</span>
                    <span>즐겨찾기만 보기</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowUserMenu(false)
                      // 설정 페이지로 이동 (향후 구현)
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                  >
                    <span>⚙️</span>
                    <span>설정</span>
                  </button>
                  
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
                  >
                    <span>🚪</span>
                    <span>로그아웃</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
