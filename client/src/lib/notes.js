import { supabase } from './supabase'

/**
 * 메모 생성
 * @param {Object} noteData - { title, content, category, tags, summary }
 * @returns {Promise<Object>} - { data, error }
 */
export const createNote = async (noteData) => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('로그인이 필요합니다')
    }

    const { data, error } = await supabase
      .from('notes')
      .insert([
        {
          user_id: user.id,
          title: noteData.title,
          content: noteData.content,
          category: noteData.category,
          tags: noteData.tags || [],
          summary: noteData.summary || null,
          is_favorite: false,
        }
      ])
      .select()
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('메모 생성 오류:', error)
    return { data: null, error }
  }
}

/**
 * 메모 목록 조회
 * @param {Object} options - { category, tag, sortBy, order, limit, offset }
 * @returns {Promise<Object>} - { data, error, hasMore }
 */
export const getNotes = async (options = {}) => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('로그인이 필요합니다')
    }

    const limit = options.limit || 10
    const offset = options.offset || 0

    let query = supabase
      .from('notes')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)

    // 카테고리 필터
    if (options.category && options.category !== 'all') {
      query = query.eq('category', options.category)
    }

    // 태그 필터
    if (options.tag) {
      query = query.contains('tags', [options.tag])
    }

    // 정렬
    const sortBy = options.sortBy || 'created_at'
    const order = options.order || 'desc'
    query = query.order(sortBy, { ascending: order === 'asc' })

    // 페이지네이션
    query = query.range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) throw error

    // 더 많은 데이터가 있는지 확인
    const hasMore = count > offset + limit

    return { data, error: null, hasMore, total: count }
  } catch (error) {
    console.error('메모 조회 오류:', error)
    return { data: null, error, hasMore: false, total: 0 }
  }
}

/**
 * 메모 상세 조회
 * @param {string} noteId - 메모 ID
 * @returns {Promise<Object>} - { data, error }
 */
export const getNote = async (noteId) => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('id', noteId)
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('메모 상세 조회 오류:', error)
    return { data: null, error }
  }
}

/**
 * 메모 수정
 * @param {string} noteId - 메모 ID
 * @param {Object} updates - 수정할 필드
 * @returns {Promise<Object>} - { data, error }
 */
export const updateNote = async (noteId, updates) => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', noteId)
      .select()
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('메모 수정 오류:', error)
    return { data: null, error }
  }
}

/**
 * 메모 삭제
 * @param {string} noteId - 메모 ID
 * @returns {Promise<Object>} - { data, error }
 */
export const deleteNote = async (noteId) => {
  try {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', noteId)

    if (error) throw error

    return { data: true, error: null }
  } catch (error) {
    console.error('메모 삭제 오류:', error)
    return { data: null, error }
  }
}

/**
 * 즐겨찾기 토글
 * @param {string} noteId - 메모 ID
 * @param {boolean} isFavorite - 즐겨찾기 상태
 * @returns {Promise<Object>} - { data, error }
 */
export const toggleFavorite = async (noteId, isFavorite) => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .update({ is_favorite: !isFavorite })
      .eq('id', noteId)
      .select()
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('즐겨찾기 토글 오류:', error)
    return { data: null, error }
  }
}

/**
 * 메모 검색
 * @param {string} searchTerm - 검색어
 * @returns {Promise<Object>} - { data, error }
 */
export const searchNotes = async (searchTerm) => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('로그인이 필요합니다')
    }

    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('메모 검색 오류:', error)
    return { data: null, error }
  }
}

/**
 * 카테고리별 메모 개수 조회
 * @returns {Promise<Object>} - { data, error }
 */
export const getNotesCountByCategory = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('로그인이 필요합니다')
    }

    const { data, error } = await supabase
      .from('notes')
      .select('category')
      .eq('user_id', user.id)

    if (error) throw error

    // 카테고리별 개수 집계
    const counts = {
      all: data.length,
      code: 0,
      link: 0,
      todo: 0,
      idea: 0,
      reference: 0,
      other: 0,
    }

    data.forEach(note => {
      if (counts[note.category] !== undefined) {
        counts[note.category]++
      }
    })

    return { data: counts, error: null }
  } catch (error) {
    console.error('카테고리별 개수 조회 오류:', error)
    return { data: null, error }
  }
}

/**
 * 모든 태그 목록 조회
 * @returns {Promise<Object>} - { data, error }
 */
export const getAllTags = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('로그인이 필요합니다')
    }

    const { data, error } = await supabase
      .from('notes')
      .select('tags')
      .eq('user_id', user.id)

    if (error) throw error

    // 모든 태그를 평탄화하고 중복 제거
    const allTags = data
      .flatMap(note => note.tags || [])
      .filter((tag, index, self) => self.indexOf(tag) === index)
      .sort()

    return { data: allTags, error: null }
  } catch (error) {
    console.error('태그 목록 조회 오류:', error)
    return { data: null, error }
  }
}

/**
 * 날짜별 메모 개수 조회 (특정 월)
 * @param {number} year - 연도
 * @param {number} month - 월 (1-12)
 * @returns {Promise<Object>} - { data: { date: count }, error }
 */
export const getNotesCountByDate = async (year, month) => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('로그인이 필요합니다')
    }

    // 해당 월의 시작일과 종료일
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0, 23, 59, 59)

    const { data, error } = await supabase
      .from('notes')
      .select('created_at')
      .eq('user_id', user.id)
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString())

    if (error) throw error

    // 날짜별로 개수 집계
    const countByDate = {}
    data.forEach(note => {
      const date = new Date(note.created_at)
      const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
      countByDate[dateKey] = (countByDate[dateKey] || 0) + 1
    })

    return { data: countByDate, error: null }
  } catch (error) {
    console.error('날짜별 메모 개수 조회 오류:', error)
    return { data: null, error }
  }
}

