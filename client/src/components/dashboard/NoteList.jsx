import { useState, useEffect } from 'react'
import { getNotes, deleteNote, toggleFavorite } from '../../lib/notes'
import { useToast } from '../../hooks/useToast'
import NoteCard from './NoteCard'
import DeleteConfirmModal from './DeleteConfirmModal'

function NoteList({ refreshTrigger, selectedCategory, selectedTag, searchQuery, filterFavorite, selectedDate, onEdit, onOpenCalendar }) {
  const toast = useToast()
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [sortBy, setSortBy] = useState('created_at')
  const [hasMore, setHasMore] = useState(false)
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [noteToDelete, setNoteToDelete] = useState(null)

  const ITEMS_PER_PAGE = 10

  // 메모 목록 로드 (첫 페이지)
  const loadNotes = async (reset = false) => {
    try {
      setLoading(true)
      
      const currentPage = reset ? 0 : page
      
      const options = {
        category: selectedCategory || 'all',
        tag: selectedTag,
        sortBy: sortBy,
        order: 'desc',
        limit: ITEMS_PER_PAGE,
        offset: currentPage * ITEMS_PER_PAGE,
      }

      const { data, error, hasMore: more, total: totalCount } = await getNotes(options)
      
      if (error) throw error

      // 즐겨찾기 필터 적용
      let filteredNotes = data || []
      if (filterFavorite) {
        filteredNotes = filteredNotes.filter(note => note.is_favorite)
      }

      if (reset) {
        setNotes(filteredNotes)
        setPage(0)
      } else {
        setNotes(filteredNotes)
      }

      setHasMore(more)
      setTotal(totalCount)
    } catch (error) {
      console.error('메모 로드 오류:', error)
      setNotes([])
      setHasMore(false)
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }

  // 더 보기 (다음 페이지)
  const loadMoreNotes = async () => {
    try {
      setLoadingMore(true)
      
      const nextPage = page + 1
      
      const options = {
        category: selectedCategory || 'all',
        tag: selectedTag,
        sortBy: sortBy,
        order: 'desc',
        limit: ITEMS_PER_PAGE,
        offset: nextPage * ITEMS_PER_PAGE,
      }

      const { data, error, hasMore: more } = await getNotes(options)
      
      if (error) throw error

      // 즐겨찾기 필터 적용
      let filteredNotes = data || []
      if (filterFavorite) {
        filteredNotes = filteredNotes.filter(note => note.is_favorite)
      }

      // 기존 메모에 추가
      setNotes(prevNotes => [...prevNotes, ...filteredNotes])
      setPage(nextPage)
      setHasMore(more)
    } catch (error) {
      console.error('메모 추가 로드 오류:', error)
    } finally {
      setLoadingMore(false)
    }
  }

  // 검색 필터 적용
  const filterNotesBySearch = (notesList) => {
    if (!searchQuery || searchQuery.trim() === '') {
      return notesList
    }

    const query = searchQuery.toLowerCase().trim()
    
    return notesList.filter(note => {
      // 제목에서 검색
      if (note.title && note.title.toLowerCase().includes(query)) {
        return true
      }
      
      // 내용에서 검색
      if (note.content && note.content.toLowerCase().includes(query)) {
        return true
      }
      
      // 요약에서 검색
      if (note.summary && note.summary.toLowerCase().includes(query)) {
        return true
      }
      
      // 태그에서 검색
      if (note.tags && Array.isArray(note.tags)) {
        return note.tags.some(tag => 
          tag.toLowerCase().includes(query)
        )
      }
      
      return false
    })
  }

  // 날짜 필터 적용 (로컬 시간대 사용)
  const filterNotesByDate = (notesList) => {
    if (!selectedDate) {
      return notesList
    }

    // 로컬 시간대로 날짜 문자열 생성 (YYYY-MM-DD)
    const selectedDateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
    
    return notesList.filter(note => {
      if (!note.created_at) return false
      
      // 로컬 시간대로 메모 날짜 문자열 생성
      const noteDate = new Date(note.created_at)
      const noteDateStr = `${noteDate.getFullYear()}-${String(noteDate.getMonth() + 1).padStart(2, '0')}-${String(noteDate.getDate()).padStart(2, '0')}`
      
      return noteDateStr === selectedDateStr
    })
  }

  // 초기 로드 및 필터 변경 시 로드 (첫 페이지로 리셋)
  useEffect(() => {
    loadNotes(true)
  }, [refreshTrigger, selectedCategory, selectedTag, sortBy, filterFavorite, selectedDate])

  // 메모 삭제 모달 열기
  const handleDeleteClick = (noteId) => {
    const note = notes.find(n => n.id === noteId)
    setNoteToDelete(note)
    setShowDeleteModal(true)
  }

  // 메모 삭제 확인
  const handleDeleteConfirm = async () => {
    if (!noteToDelete) return

    try {
      const { error } = await deleteNote(noteToDelete.id)
      if (error) throw error

      // 로컬 상태에서 제거
      setNotes(notes.filter(note => note.id !== noteToDelete.id))
      setTotal(prev => prev - 1)
      setShowDeleteModal(false)
      setNoteToDelete(null)
      toast.success('메모가 삭제되었습니다')
    } catch (error) {
      console.error('메모 삭제 오류:', error)
      toast.error('메모 삭제 중 오류가 발생했습니다')
      setShowDeleteModal(false)
      setNoteToDelete(null)
    }
  }

  // 삭제 모달 닫기
  const handleDeleteCancel = () => {
    setShowDeleteModal(false)
    setNoteToDelete(null)
  }

  // 즐겨찾기 토글
  const handleToggleFavorite = async (noteId, currentFavorite) => {
    try {
      const { data, error } = await toggleFavorite(noteId, currentFavorite)
      if (error) throw error

      // 로컬 상태 업데이트
      setNotes(notes.map(note => 
        note.id === noteId 
          ? { ...note, is_favorite: !currentFavorite }
          : note
      ))
    } catch (error) {
      console.error('즐겨찾기 토글 오류:', error)
      toast.error('즐겨찾기 변경 중 오류가 발생했습니다')
    }
  }

  // 검색 및 날짜 필터 적용된 메모 목록
  const searchFilteredNotes = filterNotesBySearch(notes)
  const filteredNotes = filterNotesByDate(searchFilteredNotes)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-4">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white"
          >
            <option value="created_at">최신순</option>
            <option value="updated_at">수정순</option>
            <option value="title">제목순</option>
          </select>
          
          <button
            onClick={onOpenCalendar}
            className={`px-4 py-2 border rounded-lg flex items-center gap-2 transition-all ${
              selectedDate
                ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
            title="날짜별 조회"
          >
            <span>📅</span>
            <span>
              {selectedDate
                ? `${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`
                : '날짜 선택'}
            </span>
          </button>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          {searchQuery ? (
            <>
              {filteredNotes.length}개 검색됨 / 총 {notes.length}개
            </>
          ) : (
            <>
              {notes.length} / {total}개
            </>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">메모를 불러오는 중...</p>
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-6xl mb-4">{searchQuery ? '🔍' : '📝'}</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {searchQuery ? '검색 결과가 없습니다' : '아직 메모가 없습니다'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchQuery ? '다른 검색어로 시도해보세요' : '위에서 새 메모를 작성해보세요!'}
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {filteredNotes.map((note) => (
              <NoteCard 
                key={note.id} 
                note={note}
                onDelete={handleDeleteClick}
                onToggleFavorite={handleToggleFavorite}
                onEdit={onEdit}
              />
            ))}
          </div>

          {/* 더 보기 버튼 */}
          {hasMore && (
            <div className="text-center mt-8">
              <button 
                onClick={loadMoreNotes}
                disabled={loadingMore}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
              >
                {loadingMore ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-600 dark:border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                    <span>불러오는 중...</span>
                  </>
                ) : (
                  <>
                    <span>📄</span>
                    <span>더 보기 ({total - notes.length}개 남음)</span>
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
      
      {/* 삭제 확인 모달 */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        noteTitle={noteToDelete?.title}
      />
    </div>
  )
}

export default NoteList
