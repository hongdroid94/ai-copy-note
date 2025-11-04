import { useState } from 'react'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import NoteInput from '../components/dashboard/NoteInput'
import NoteList from '../components/dashboard/NoteList'
import NoteEditModal from '../components/dashboard/NoteEditModal'
import CalendarFilter from '../components/dashboard/CalendarFilter'

function DashboardPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTag, setSelectedTag] = useState(null)
  const [editingNote, setEditingNote] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterFavorite, setFilterFavorite] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [showCalendar, setShowCalendar] = useState(false)

  // 메모 저장 완료 시 호출
  const handleNoteSaved = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  // 카테고리 선택
  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setSelectedTag(null) // 카테고리 변경 시 태그 필터 초기화
  }

  // 태그 선택
  const handleTagSelect = (tag) => {
    setSelectedTag(tag)
  }

  // 메모 수정 시작
  const handleEditNote = (note) => {
    setEditingNote(note)
    setShowEditModal(true)
  }

  // 메모 수정 완료
  const handleEditSaved = () => {
    setRefreshTrigger(prev => prev + 1)
    setShowEditModal(false)
    setEditingNote(null)
  }

  // 수정 모달 닫기
  const handleCloseEditModal = () => {
    setShowEditModal(false)
    setEditingNote(null)
  }

  // 검색
  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  // 즐겨찾기 필터 토글
  const handleToggleFavorite = () => {
    setFilterFavorite(prev => !prev)
  }

  // 캘린더 열기
  const handleOpenCalendar = () => {
    setShowCalendar(true)
  }

  // 캘린더 닫기
  const handleCloseCalendar = () => {
    setShowCalendar(false)
  }

  // 날짜 선택
  const handleDateSelect = (date) => {
    setSelectedDate(date)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header 
        onSearch={handleSearch} 
        filterFavorite={filterFavorite}
        onToggleFavorite={handleToggleFavorite}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          selectedTag={selectedTag}
          onTagSelect={handleTagSelect}
          refreshTrigger={refreshTrigger}
        />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <NoteInput onNoteSaved={handleNoteSaved} />
            <NoteList 
              refreshTrigger={refreshTrigger}
              selectedCategory={selectedCategory}
              selectedTag={selectedTag}
              searchQuery={searchQuery}
              filterFavorite={filterFavorite}
              selectedDate={selectedDate}
              onEdit={handleEditNote}
              onOpenCalendar={handleOpenCalendar}
            />
          </div>
        </main>
      </div>
      
      {/* 메모 수정 모달 */}
      <NoteEditModal
        isOpen={showEditModal}
        onClose={handleCloseEditModal}
        note={editingNote}
        onSaved={handleEditSaved}
      />

      {/* 캘린더 필터 모달 */}
      <CalendarFilter
        isOpen={showCalendar}
        onClose={handleCloseCalendar}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />
    </div>
  )
}

export default DashboardPage
