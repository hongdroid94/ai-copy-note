function NoteCard({ note, onDelete, onToggleFavorite, onEdit }) {
  // 카테고리 아이콘 매핑
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

  // 시간 포맷팅
  const formatTime = (timestamp) => {
    const now = new Date()
    const created = new Date(timestamp)
    const diffMs = now - created
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return '방금 전'
    if (diffMins < 60) return `${diffMins}분 전`
    if (diffHours < 24) return `${diffHours}시간 전`
    if (diffDays < 7) return `${diffDays}일 전`
    
    // 7일 이상이면 날짜 표시
    return created.toLocaleDateString('ko-KR', { 
      month: 'short', 
      day: 'numeric' 
    })
  }

  // 내용 미리보기 (summary가 있으면 summary, 없으면 content)
  const getPreview = () => {
    if (note.summary) return note.summary
    return note.content.length > 100 
      ? note.content.substring(0, 100) + '...' 
      : note.content
  }

  return (
    <div className="card p-5 mb-4 hover:scale-[1.01] transition-transform">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <span>{getCategoryIcon(note.category)}</span>
            {note.title}
          </h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {note.tags && note.tags.length > 0 ? (
              note.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded"
                >
                  {tag}
                </span>
              ))
            ) : (
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded italic">
                태그 없음
              </span>
            )}
          </div>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">
          {formatTime(note.created_at)}
        </span>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
        {getPreview()}
      </p>
      
      <div className="flex items-center gap-3 text-gray-400">
        <button 
          onClick={() => onToggleFavorite(note.id, note.is_favorite)}
          className={`hover:text-yellow-500 transition-colors ${note.is_favorite ? 'text-yellow-500' : ''}`}
          title={note.is_favorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
        >
          {note.is_favorite ? '⭐' : '☆'}
        </button>
        <button 
          className="hover:text-blue-500 transition-colors"
          title="수정"
          onClick={() => onEdit(note)}
        >
          ✏️
        </button>
        <button 
          onClick={() => onDelete(note.id)}
          className="hover:text-red-500 transition-colors"
          title="삭제"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

export default NoteCard
