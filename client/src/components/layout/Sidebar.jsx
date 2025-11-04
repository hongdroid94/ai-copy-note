import { useState, useEffect } from 'react'
import { getNotesCountByCategory, getAllTags } from '../../lib/notes'

function Sidebar({ selectedCategory, onCategorySelect, selectedTag, onTagSelect, refreshTrigger }) {
  const [categoryCounts, setCategoryCounts] = useState({
    all: 0,
    code: 0,
    link: 0,
    todo: 0,
    idea: 0,
    reference: 0,
    other: 0,
  })
  const [tags, setTags] = useState([])

  const categories = [
    { id: 'all', name: '전체', icon: '📋' },
    { id: 'code', name: '코드', icon: '💻' },
    { id: 'link', name: '링크', icon: '🔗' },
    { id: 'todo', name: '할 일', icon: '✅' },
    { id: 'idea', name: '아이디어', icon: '💡' },
    { id: 'reference', name: '참고자료', icon: '📄' },
    { id: 'other', name: '기타', icon: '🎯' },
  ]

  // 카테고리별 개수 및 태그 로드
  const loadData = async () => {
    try {
      const [countsResult, tagsResult] = await Promise.all([
        getNotesCountByCategory(),
        getAllTags()
      ])

      if (countsResult.data) {
        setCategoryCounts(countsResult.data)
      }

      if (tagsResult.data) {
        setTags(tagsResult.data)
      }
    } catch (error) {
      console.error('사이드바 데이터 로드 오류:', error)
    }
  }

  // 초기 로드 및 메모 변경 시 로드
  useEffect(() => {
    loadData()
  }, [refreshTrigger])

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-4 flex-1 overflow-y-auto">
        {/* 카테고리 섹션 */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
            📂 카테고리
          </h2>
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className={`sidebar-item w-full ${
                  selectedCategory === category.id ? 'active' : ''
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="flex-1 text-left">{category.name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({categoryCounts[category.id] || 0})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-200 dark:border-gray-700 mb-8"></div>

        {/* 태그 섹션 */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
            🏷️ 태그
          </h2>
          <div className="space-y-2">
            {tags.length > 0 ? (
              tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onTagSelect(selectedTag === tag ? null : tag)}
                  className={`block w-full text-left px-4 py-1 text-sm rounded transition-colors ${
                    selectedTag === tag
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                      : 'text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {tag}
                </button>
              ))
            ) : (
              <p className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 italic">
                아직 태그가 없습니다
              </p>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
