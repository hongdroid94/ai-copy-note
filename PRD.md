# AI Copy Note - Product Requirements Document (PRD)

## 1. 프로젝트 개요

### 1.1 제품명
**AI Copy Note** - AI 기반 스마트 클립보드 메모 서비스

### 1.2 프로젝트 목적
클립보드에 복사된 다양한 정보(텍스트, 링크, 코드 등)를 간편하게 저장하고, Google Gemini API를 활용하여 자동으로 분류 및 정리하는 웹 기반 메모 서비스

### 1.3 타겟 사용자
- 웹 서핑 중 유용한 정보를 자주 복사하는 사용자
- 개발자, 연구원, 콘텐츠 크리에이터 등 정보 수집이 필요한 직군
- 복사한 내용을 체계적으로 정리하고 싶은 모든 사용자

---

## 2. 핵심 기능 (Core Features)

### 2.1 메모 저장 기능
- **빠른 붙여넣기**: 클립보드 내용을 원클릭으로 저장
- **수동 입력**: 직접 텍스트 입력 가능
- **타임스탬프**: 자동으로 저장 시간 기록
- **메모 편집**: 저장 후 내용 수정 가능
- **메모 삭제**: 불필요한 메모 삭제

### 2.2 AI 자동 분류 (Gemini API 활용)
- **카테고리 자동 분류**
  - 코드 스니펫
  - URL/링크
  - 할 일/작업
  - 아이디어
  - 참고 자료
  - 기타
- **태그 자동 생성**: 메모 내용 기반 관련 태그 추출
- **요약 생성**: 긴 텍스트의 경우 요약 제공
- **제목 자동 생성**: 메모 내용 기반 적절한 제목 추천

### 2.3 검색 및 필터링
- **전체 텍스트 검색**: 메모 내용 전체 검색
- **카테고리별 필터**: 특정 카테고리만 보기
- **태그별 필터**: 태그 기반 필터링
- **날짜별 필터**: 특정 기간 메모 조회

### 2.4 사용자 인증
- **이메일 로그인**: Supabase Auth 활용
- **회원가입**: 이메일 + 비밀번호

---

## 3. 기술 스택

### 3.1 Frontend
- **프레임워크**: React 18+
- **상태 관리**: React Query + Context API (또는 Zustand)
- **스타일링**: TailwindCSS + shadcn/ui
- **라우팅**: React Router v6
- **빌드 도구**: Vite

### 3.2 Backend
- **BaaS**: Supabase
  - Authentication (사용자 인증)
  - Database (PostgreSQL)
  - Storage (파일 저장, 필요시)
  - Real-time (실시간 동기화, 선택사항)

### 3.3 AI/ML
- **API**: Google Gemini API
  - 텍스트 분석
  - 카테고리 분류
  - 태그 생성
  - 요약 생성

### 3.4 배포
- **Frontend**: Vercel 또는 Netlify
- **Backend**: Supabase Cloud

---

## 4. 데이터베이스 스키마 (Supabase)

### 4.1 users 테이블
```sql
- id (uuid, primary key) - Supabase Auth와 연동
- email (text)
- created_at (timestamp)
- updated_at (timestamp)
```

### 4.2 notes 테이블
```sql
- id (uuid, primary key)
- user_id (uuid, foreign key → users.id)
- title (text) - AI 생성 또는 사용자 입력
- content (text) - 메모 본문
- category (text) - AI 분류 카테고리
- tags (text[]) - AI 생성 태그 배열
- summary (text, nullable) - AI 생성 요약
- is_favorite (boolean, default: false)
- created_at (timestamp)
- updated_at (timestamp)
```

### 4.3 categories 테이블 (선택사항)
```sql
- id (uuid, primary key)
- name (text, unique)
- color (text) - 카테고리 색상
- icon (text) - 아이콘 이름
- user_id (uuid, nullable) - 커스텀 카테고리용
```

---

## 5. 사용자 플로우

### 5.1 첫 방문 사용자
1. 랜딩 페이지 도착
2. 회원가입/로그인
3. 튜토리얼 확인 (선택)
4. 첫 메모 작성

### 5.2 메모 작성 플로우
1. 메모 입력 영역에 텍스트 붙여넣기 (Ctrl+V)
2. "저장" 버튼 클릭
3. AI 분석 중 로딩 표시
4. 자동으로 카테고리, 태그, 제목 생성
5. 메모 리스트에 추가 (실시간)
6. 수정 필요시 편집 가능

### 5.3 메모 관리 플로우
1. 메모 리스트 조회
2. 검색/필터링으로 원하는 메모 찾기
3. 메모 클릭하여 상세 보기
4. 편집/삭제/즐겨찾기 설정

---

## 6. UI/UX 디자인 방향

### 6.1 레이아웃
- **2단 레이아웃**
  - 왼쪽: 사이드바 (카테고리, 태그 필터)
  - 오른쪽: 메모 리스트 + 상세 뷰
- **반응형 디자인**: 모바일에서는 1단 레이아웃

### 6.2 주요 화면
1. **홈/대시보드**
   - 메모 입력 영역 (상단 고정)
   - 최근 메모 리스트
   - 카테고리별 통계
2. **메모 리스트**
   - 카드 또는 리스트 뷰
   - 미리보기, 카테고리 뱃지, 태그
3. **메모 상세**
   - 전체 내용
   - 편집 모드
   - 메타 정보 (생성일, 카테고리, 태그)

### 6.3 디자인 컨셉
- **모던하고 깔끔한 UI**
- **부드러운 애니메이션**
- **직관적인 인터랙션**
- **다크모드 지원**

---

## 7. Gemini API 활용 상세

### 7.1 프롬프트 설계
```
입력: 사용자가 붙여넣은 텍스트

요청:
1. 이 텍스트의 적절한 카테고리를 다음 중 선택: 
   [코드, URL, 할일, 아이디어, 참고자료, 기타]
2. 3-5개의 관련 태그 추천
3. 20자 이내의 제목 생성
4. 100자 이내 요약 (텍스트가 200자 이상일 경우)

출력: JSON 형식
{
  "category": "...",
  "tags": ["...", "..."],
  "title": "...",
  "summary": "..."
}
```

### 7.2 API 호출 최적화
- **Debouncing**: 연속 입력 시 API 호출 최소화
- **캐싱**: 동일 내용 재분석 방지
- **에러 핸들링**: API 실패 시 기본값 제공
- **비용 관리**: API 호출 횟수 모니터링

---

## 8. 보안 및 프라이버시

### 8.1 데이터 보안
- Supabase Row Level Security (RLS) 활성화
- 사용자는 본인의 메모만 접근 가능
- API 키는 환경변수로 관리

### 8.2 프라이버시
- 사용자 데이터는 Gemini API로 전송 (분석용)
- API 전송 데이터는 저장되지 않음 (Google 정책 확인 필요)
- 프라이버시 정책 명시

---

## 9. 성능 요구사항

### 9.1 응답 시간
- 메모 저장: 1초 이내
- AI 분석: 3초 이내
- 메모 로딩: 0.5초 이내

### 9.2 동시 사용자
- 초기 목표: 100명 동시 접속

---

## 10. 개발 단계 (Phases)

### Phase 1: MVP (Minimum Viable Product) - 2-3주
- [ ] 기본 UI/UX 구현
- [ ] Supabase 설정 및 DB 스키마 생성
- [ ] 사용자 인증 (이메일 로그인)
- [ ] 메모 CRUD 기능
- [ ] Gemini API 연동 (카테고리, 태그 자동 생성)
- [ ] 기본 검색 기능

### Phase 2: 기능 개선 - 1-2주
- [ ] 제목 자동 생성
- [ ] 요약 생성
- [ ] 고급 필터링 (카테고리, 태그, 날짜)
- [ ] 즐겨찾기 기능
- [ ] 반응형 디자인 개선

### Phase 3: 추가 기능 - 2-3주
- [ ] 다크모드
- [ ] 메모 내보내기 (Markdown, JSON)
- [ ] 키보드 단축키
- [ ] 사용 통계 대시보드

### Phase 4: 최적화 및 배포 - 1주
- [ ] 성능 최적화
- [ ] 보안 강화
- [ ] 버그 수정
- [ ] 배포 및 모니터링 설정

---

## 11. 성공 지표 (Success Metrics)

### 11.1 사용자 지표
- 주간 활성 사용자 (WAU)
- 사용자 당 평균 메모 수
- 사용자 재방문율

### 11.2 기능 지표
- AI 분류 정확도 (사용자 피드백 기반)
- 평균 메모 저장 시간
- 검색 사용 빈도

### 11.3 기술 지표
- API 응답 시간
- 에러율
- Gemini API 비용

---

## 12. 리스크 및 대응 방안

### 12.1 기술적 리스크
| 리스크 | 영향도 | 대응 방안 |
|--------|--------|-----------|
| Gemini API 장애 | 높음 | 폴백 로직 구현 (기본 카테고리 할당) |
| Supabase 성능 저하 | 중간 | 쿼리 최적화, 인덱싱 |
| API 비용 초과 | 중간 | 호출 제한, 캐싱 전략 |

### 12.2 비즈니스 리스크
| 리스크 | 영향도 | 대응 방안 |
|--------|--------|-----------|
| 사용자 유입 부족 | 중간 | 마케팅 전략, 프리미엄 기능 추가 |
| 프라이버시 우려 | 높음 | 투명한 정책, 로컬 저장 옵션 |

---

## 13. 향후 확장 가능성

### 13.1 추가 기능 아이디어
- 브라우저 확장 프로그램 (Chrome Extension)
- 모바일 앱 (React Native)
- 팀 협업 기능 (메모 공유)
- 메모 간 연결 (그래프 뷰)
- OCR 기능 (이미지 내 텍스트 추출)
- 음성 메모
- 자동 번역

### 13.2 수익화 방안
- 프리미엄 플랜 (무제한 메모, 고급 AI 기능)
- API 접근 제공
- 기업용 솔루션

---

## 14. 참고 자료

### 14.1 기술 문서
- [React 공식 문서](https://react.dev)
- [Supabase 문서](https://supabase.com/docs)
- [Google Gemini API 문서](https://ai.google.dev/docs)
- [TailwindCSS 문서](https://tailwindcss.com/docs)

### 14.2 유사 서비스 분석
- Notion (메모 및 정리)
- Obsidian (로컬 노트)
- Evernote (클라우드 메모)
- Raindrop.io (북마크 관리)

---

## 15. 프로젝트 일정

```
Week 1-2: 프로젝트 설정 + 기본 UI + Supabase 설정
Week 3-4: 메모 CRUD + Gemini API 연동
Week 5: 검색/필터링 + 기능 개선
Week 6-7: 추가 기능 구현
Week 8: 테스트 + 최적화 + 배포
```

**예상 총 개발 기간: 8주 (2개월)**

---

## 부록: 환경 변수 설정

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Gemini API
VITE_GEMINI_API_KEY=your_gemini_api_key

# 기타
VITE_APP_ENV=development
```

---

**문서 버전**: 1.0  
**작성일**: 2025-10-19  
**작성자**: AI Copy Note Team  
**상태**: Draft → Review → Approved

