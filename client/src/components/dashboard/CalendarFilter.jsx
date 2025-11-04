import { useState, useEffect } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek } from 'date-fns'
import { ko } from 'date-fns/locale'
import { getNotesCountByDate } from '../../lib/notes'

function CalendarFilter({ isOpen, onClose, selectedDate, onDateSelect }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [notesCountByDate, setNotesCountByDate] = useState({})
  const [loading, setLoading] = useState(false)

  // 날짜별 메모 개수 로드
  useEffect(() => {
    if (isOpen) {
      loadNotesCount()
    }
  }, [currentMonth, isOpen])

  const loadNotesCount = async () => {
    setLoading(true)
    try {
      const year = currentMonth.getFullYear()
      const month = currentMonth.getMonth() + 1
      const { data, error } = await getNotesCountByDate(year, month)
      
      if (error) throw error
      
      setNotesCountByDate(data || {})
    } catch (error) {
      console.error('날짜별 메모 개수 로드 오류:', error)
      setNotesCountByDate({})
    } finally {
      setLoading(false)
    }
  }

  // 캘린더에 표시할 날짜들 계산
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const calendarStart = startOfWeek(monthStart, { locale: ko })
  const calendarEnd = endOfWeek(monthEnd, { locale: ko })
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  // 이전/다음 달로 이동
  const handlePrevMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1))
  }

  // 날짜 선택
  const handleDateClick = (date) => {
    const dateKey = format(date, 'yyyy-MM-dd')
    // 메모가 있는 날짜만 선택 가능
    if (notesCountByDate[dateKey]) {
      onDateSelect(date)
      onClose()
    }
  }

  // 날짜별 메모 개수 가져오기
  const getCountForDate = (date) => {
    const dateKey = format(date, 'yyyy-MM-dd')
    return notesCountByDate[dateKey] || 0
  }

  // 오늘 날짜로 이동
  const handleToday = () => {
    setCurrentMonth(new Date())
  }

  // 선택된 날짜 초기화
  const handleClearSelection = () => {
    onDateSelect(null)
    onClose()
  }

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full animate-fadeIn">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <span>📅</span>
              날짜별 메모 조회
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 월 네비게이션 */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="이전 달"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {format(currentMonth, 'yyyy년 M월', { locale: ko })}
              </h3>
              <button
                onClick={handleToday}
                className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                오늘
              </button>
            </div>

            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="다음 달"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Calendar Body */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {/* 요일 헤더 */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
                  <div
                    key={day}
                    className={`text-center text-sm font-semibold py-2 ${
                      index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* 날짜 그리드 */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => {
                  const count = getCountForDate(day)
                  const hasNotes = count > 0
                  const isCurrentMonth = isSameMonth(day, currentMonth)
                  const isSelected = selectedDate && isSameDay(day, selectedDate)
                  const isToday = isSameDay(day, new Date())

                  return (
                    <button
                      key={index}
                      onClick={() => handleDateClick(day)}
                      disabled={!hasNotes}
                      className={`
                        relative aspect-square rounded-lg p-2 text-sm font-medium transition-all
                        ${!isCurrentMonth && 'text-gray-400 dark:text-gray-600'}
                        ${isCurrentMonth && !hasNotes && 'text-gray-500 dark:text-gray-400 cursor-default'}
                        ${hasNotes && 'cursor-pointer hover:scale-105'}
                        ${isSelected && 'bg-blue-500 text-white ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-800'}
                        ${!isSelected && hasNotes && isCurrentMonth && 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/40'}
                        ${isToday && !isSelected && 'ring-2 ring-gray-400 dark:ring-gray-500'}
                      `}
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <span>{format(day, 'd')}</span>
                        {hasNotes && (
                          <span className={`text-xs ${isSelected ? 'text-white' : 'text-green-600 dark:text-green-400'}`}>
                            {count}개
                          </span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* 범례 */}
              <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded"></div>
                  <span>메모 있음</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-500 rounded"></div>
                  <span>선택됨</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 border-2 border-gray-400 dark:border-gray-500 rounded"></div>
                  <span>오늘</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between gap-3">
          <button
            onClick={handleClearSelection}
            className="btn-secondary"
          >
            날짜 필터 해제
          </button>
          <button
            onClick={onClose}
            className="btn-primary"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}

export default CalendarFilter

