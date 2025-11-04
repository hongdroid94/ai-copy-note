import { GoogleGenerativeAI } from '@google/generative-ai'

// Gemini API 초기화
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

// 카테고리 매핑
const CATEGORIES = {
  '코드': 'code',
  '링크': 'link',
  'URL': 'link',
  '할일': 'todo',
  '할 일': 'todo',
  '작업': 'todo',
  '아이디어': 'idea',
  '참고자료': 'reference',
  '참고': 'reference',
  '문서': 'reference',
  '기타': 'other'
}

/**
 * 텍스트를 분석하여 카테고리, 태그, 제목, 요약을 생성합니다
 * @param {string} content - 분석할 텍스트 내용
 * @returns {Promise<Object>} - { category, tags, title, summary }
 */
export async function analyzeNote(content) {
  try {
    if (!content || content.trim().length === 0) {
      throw new Error('내용을 입력해주세요')
    }

    // Gemini 2.5 Pro 모델 사용 (2025년 최신 안정 버전)
    // 2025년 9월 29일부로 1.5 모델은 지원 중단됨
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' })

    // 프롬프트 설계 (PRD.md 기반)
    const prompt = `
다음 텍스트를 분석하여 JSON 형식으로 응답해주세요.

텍스트:
"""
${content}
"""

요청사항:
1. 이 텍스트의 적절한 카테고리를 다음 중 하나로 선택:
   - 코드: 프로그래밍 코드, 스니펫, 기술적 내용
   - 링크: URL, 웹사이트 주소
   - 할일: 작업, 태스크, 해야할 일
   - 아이디어: 새로운 생각, 제안, 기획
   - 참고자료: 문서, 가이드, 학습 자료
   - 기타: 위 카테고리에 해당하지 않는 경우

2. 이 텍스트와 관련된 3-5개의 태그를 생성 (영문 또는 한글, # 없이)

3. 이 텍스트의 내용을 요약하는 20자 이내의 짧은 제목 생성

4. 텍스트가 200자 이상인 경우 100자 이내로 요약 (200자 미만이면 요약 생략)

JSON 형식으로만 응답하세요:
{
  "category": "카테고리",
  "tags": ["태그1", "태그2", "태그3"],
  "title": "제목",
  "summary": "요약 또는 null"
}
`.trim()

    // AI 분석 실행
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // JSON 추출 (```json ``` 마크다운 코드 블록 제거)
    let jsonText = text.trim()
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '')
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '')
    }

    // JSON 파싱
    const analysis = JSON.parse(jsonText)

    // 카테고리를 영문 ID로 변환
    const categoryId = CATEGORIES[analysis.category] || 'other'

    // 태그 앞에 # 추가
    const tagsWithHash = analysis.tags.map(tag => 
      tag.startsWith('#') ? tag : `#${tag}`
    )

    return {
      category: categoryId,
      categoryName: analysis.category,
      tags: tagsWithHash,
      title: analysis.title,
      summary: analysis.summary || null,
      rawResponse: text // 디버깅용
    }

  } catch (error) {
    console.error('Gemini API 분석 오류:', error)
    
    // 에러 시 기본값 반환
    return {
      category: 'other',
      categoryName: '기타',
      tags: ['#메모'],
      title: content.substring(0, 20).trim() + (content.length > 20 ? '...' : ''),
      summary: null,
      error: error.message
    }
  }
}

/**
 * API 키 유효성 검사
 * @returns {boolean}
 */
export function validateApiKey() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  return apiKey && apiKey.length > 0 && apiKey !== 'your_api_key_here'
}

/**
 * 간단한 테스트 함수
 */
export async function testGeminiAPI() {
  const testContent = 'React 컴포넌트 최적화를 위해 useMemo와 useCallback을 사용하는 방법'
  console.log('Gemini API 테스트 시작...')
  const result = await analyzeNote(testContent)
  console.log('분석 결과:', result)
  return result
}

