# AI Copy Note

AI 기반 스마트 클립보드 메모 서비스

클립보드에 복사된 다양한 정보(텍스트, 링크, 코드 등)를 간편하게 저장하고, Google Gemini API를 활용하여 자동으로 분류 및 정리하는 웹 기반 메모 서비스입니다.

## 🚀 현재 상태

### ✅ 완료된 작업

#### Phase 0 - 초기 개발
- [x] React + Vite 프로젝트 초기화
- [x] TailwindCSS 설정 및 스타일 시스템
- [x] React Router 설정
- [x] 로그인/회원가입 UI
- [x] 메인 대시보드 레이아웃
- [x] 메모 입력 컴포넌트
- [x] 메모 리스트 카드
- [x] 카테고리 사이드바
- [x] Netlify 배포 설정
- [x] **프로덕션 배포 완료** 🎉

#### Phase 1 - Gemini API 연동 ✨
- [x] Google Gemini API 패키지 설치
- [x] API 키 환경변수 설정
- [x] 텍스트 분석 유틸리티 함수
- [x] AI 자동 분류 기능 (카테고리, 태그, 제목, 요약)
- [x] AI 분석 로딩 모달
- [x] AI 분석 결과 모달
- [x] 메모 입력 컴포넌트 AI 연동
- [x] **Gemini API 배포 완료** 🤖

#### Phase 2 - Supabase 인증 🔐
- [x] Supabase 프로젝트 생성 및 설정
- [x] Supabase JS 클라이언트 설치
- [x] 인증 Context 구현
- [x] 회원가입 기능 구현
- [x] 로그인 기능 구현
- [x] 로그아웃 기능 구현
- [x] Protected Route 구현
- [x] **이메일 인증 시스템 구현** ✉️
- [x] 이메일 인증 대기 페이지
- [x] 인증 이메일 재전송 기능
- [x] 미인증 사용자 안내
- [x] **사용자 인증 시스템 완료** 🔒

#### Phase 3 - 메모 CRUD 및 고급 기능 📝
- [x] **데이터베이스 스키마 구현** (notes 테이블, RLS 정책)
- [x] **메모 CRUD 기능**
  - [x] 메모 생성 (AI 자동 분류 / 수동 입력)
  - [x] 메모 조회 (페이지네이션, 10개씩)
  - [x] 메모 수정 (AI 재분석 / 수동 수정)
  - [x] 메모 삭제 (확인 모달)
- [x] **고급 필터링 및 검색**
  - [x] 카테고리별 필터
  - [x] 태그별 필터
  - [x] 검색 기능 (제목, 내용, 요약, 태그)
  - [x] 즐겨찾기 필터
  - [x] **캘린더 기반 날짜 필터** 📅
- [x] **UI/UX 개선**
  - [x] Toast 알림 시스템 (저장/수정/삭제)
  - [x] 로딩 상태 표시
  - [x] 확인 모달 (삭제 시)
  - [x] 반응형 디자인
  - [x] 다크모드 완벽 지원
- [x] **실시간 카운트 및 통계**
  - [x] 카테고리별 메모 개수
  - [x] 태그 목록 및 개수
  - [x] **날짜별 메모 개수 (캘린더 표시)** 📊
- [x] **즐겨찾기 기능** ⭐
- [x] **메모 리스트 더보기** (무한 스크롤 대신 버튼 방식)

### 🌐 배포 정보

- **프로덕션 URL**: https://ai-copy-note.netlify.app
- **관리자 페이지**: https://app.netlify.com/projects/ai-copy-note

### 🎨 구현된 기능

1. **🔐 사용자 인증 시스템**
   - 이메일 기반 회원가입
   - **이메일 인증 시스템** ✉️
     - 회원가입 시 자동 인증 이메일 발송
     - 이메일 인증 대기 페이지
     - 인증 이메일 재전송 기능
     - 미인증 사용자 로그인 차단 및 안내
   - 이메일 로그인
   - 로그아웃 기능
   - 세션 자동 유지
   - Protected Route (로그인 필수 페이지)
   - 사용자 메뉴 (드롭다운)

2. **로그인/회원가입 화면**
   - 이메일/비밀번호 입력 폼
   - 유효성 검사
   - Toast 알림으로 에러/성공 메시지 표시
   - 반응형 디자인
   - 다크모드 지원

3. **📝 메모 관리 (CRUD)**
   - **메모 생성**
     - AI 자동 분류 (Gemini API)
     - 수동 입력 모드 (카테고리, 태그 직접 선택)
     - 실시간 진행률 표시
     - AI 분석 결과 미리보기
   - **메모 조회**
     - 페이지네이션 (10개씩 더보기)
     - 실시간 카운트 표시
     - 로딩 상태 표시
   - **메모 수정**
     - AI 재분석 기능
     - 수동 수정 (제목, 카테고리, 태그, 내용)
     - 수정 모달
   - **메모 삭제**
     - 삭제 확인 모달
     - Toast 알림

4. **🔍 검색 및 필터링**
   - **실시간 검색** (제목, 내용, 요약, 태그)
   - **카테고리 필터** (전체, 코드, 링크, 할일, 아이디어, 참고자료, 기타)
   - **태그 필터** (클릭 한 번으로 필터링)
   - **즐겨찾기 필터** ⭐
   - **📅 캘린더 날짜 필터**
     - 월별 캘린더 표시
     - 날짜별 메모 개수 표시
     - 메모가 있는 날짜만 클릭 가능
     - 시간대 정확성 보장 (로컬 타임존)
   - **정렬 옵션** (최신순, 수정순, 제목순)

5. **📊 실시간 통계 및 카운트**
   - 카테고리별 메모 개수
   - 태그 목록 및 개수
   - 날짜별 메모 개수 (캘린더)
   - 검색 결과 카운트
   - 전체 메모 개수

6. **🤖 AI 자동 분류 (Gemini 2.5 Pro)**
   - 메모 내용 자동 분석
   - 카테고리 자동 분류 (6가지)
   - 관련 태그 3-5개 자동 생성
   - 제목 자동 생성 (20자 이내)
   - 긴 텍스트 자동 요약 (200자 이상 시)
   - 실시간 진행률 표시
   - 분석 결과 미리보기 모달

7. **🎨 UI/UX**
   - **Toast 알림 시스템** (성공/오류/정보/경고)
   - **확인 모달** (삭제 시)
   - **로딩 애니메이션** (분석/저장)
   - **반응형 디자인** (모바일/태블릿/데스크톱)
   - **다크모드** 완벽 지원
   - **키보드 단축키** (Ctrl/Cmd + Enter: 저장)
   - **무한 스크롤 대신 더보기 버튼**

## 📋 문서

- [PRD.md](./PRD.md) - Product Requirements Document
- [WIREFRAME.md](./WIREFRAME.md) - UI/UX 와이어프레임
- [DEPLOYMENT.md](./DEPLOYMENT.md) - 배포 정보
- [GEMINI_SETUP.md](./GEMINI_SETUP.md) - Gemini API 설정 가이드
- [SUPABASE_AUTH.md](./SUPABASE_AUTH.md) - Supabase 인증 시스템 문서
- [EMAIL_VERIFICATION.md](./EMAIL_VERIFICATION.md) - **이메일 인증 시스템 문서** ✉️
- [client/README.md](./client/README.md) - 프론트엔드 상세 문서

## 🛠️ 기술 스택

### Frontend
- React 18
- Vite
- TailwindCSS
- React Router v6

### Backend
- Supabase (Authentication ✅, Database 예정, Storage 예정)

### AI/ML
- Google Gemini API (gemini-2.5-pro)

### 배포
- Netlify

## 🚧 다음 단계 (Optional)

### Phase 4: 추가 기능 및 최적화

- [ ] **메모 내보내기** 📤
  - [ ] Markdown 형식
  - [ ] JSON 형식
  - [ ] CSV 형식
- [ ] **사용 통계 대시보드** 📊
  - [ ] 일별/주별/월별 메모 작성 통계
  - [ ] 가장 많이 사용한 카테고리/태그
  - [ ] 메모 작성 시간대 분석
- [ ] **메모 공유 기능** 🔗
  - [ ] 링크로 메모 공유
  - [ ] 읽기 전용/편집 가능 권한
- [ ] **백업 및 복원** 💾
  - [ ] 자동 백업
  - [ ] 수동 백업
  - [ ] 백업 복원
- [ ] **성능 최적화** ⚡
  - [ ] 이미지 레이지 로딩
  - [ ] 코드 스플리팅
  - [ ] 메모리 최적화
- [ ] **모바일 앱** 📱
  - [ ] React Native 버전
  - [ ] PWA 지원

### Phase 5: 고급 AI 기능

- [ ] **AI 추천 시스템** 🎯
  - [ ] 관련 메모 추천
  - [ ] 태그 추천
  - [ ] 카테고리 자동 제안
- [ ] **스마트 검색** 🔍
  - [ ] 자연어 검색
  - [ ] 유사 메모 검색
- [ ] **AI 요약 기능 강화** 📝
  - [ ] 여러 메모 통합 요약
  - [ ] 주간/월간 요약 보고서

## 🏃‍♂️ 로컬 개발 환경 실행

### 1. 의존성 설치

```bash
cd ai_copy_note/client
npm install
```

### 2. 환경변수 설정

`client/.env` 파일을 생성하고 다음 환경변수를 설정하세요:

```env
# Google Gemini API
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Supabase
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

자세한 설정 방법:
- Gemini API: [GEMINI_SETUP.md](./GEMINI_SETUP.md)
- Supabase: [SUPABASE_AUTH.md](./SUPABASE_AUTH.md)

### 3. 개발 서버 실행

```bash
npm run dev
# 브라우저에서 http://localhost:5173 접속
```

## 📦 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 🎯 프로젝트 목표

- ✅ **Phase 0**: 기본 UI 구조 및 배포 (완료)
- ✅ **Phase 1**: Gemini API 연동 (완료) 🎉
- ✅ **Phase 2**: Supabase 인증 시스템 (완료) 🔐
- ✅ **Phase 3**: 메모 CRUD 및 고급 기능 (완료) 🎊
- ⏳ **Phase 4**: 추가 기능 및 최적화 (선택 사항)

## 📸 스크린샷

배포된 사이트에서 확인 가능합니다: https://ai-copy-note.netlify.app

## 🏆 주요 기능 하이라이트

### 1️⃣ AI 자동 분류
- Gemini 2.5 Pro API로 메모 자동 분석
- 카테고리, 태그, 제목 자동 생성
- 긴 텍스트는 자동 요약

### 2️⃣ 강력한 검색 및 필터
- 실시간 검색 (제목, 내용, 태그)
- 카테고리, 태그, 즐겨찾기 필터
- 📅 캘린더 기반 날짜 필터 (날짜별 메모 개수 표시)

### 3️⃣ 완벽한 UX
- Toast 알림 시스템
- 다크모드 지원
- 반응형 디자인
- 키보드 단축키

### 4️⃣ 안전한 데이터 관리
- Supabase 인증 및 데이터베이스
- 이메일 인증 시스템
- Row Level Security (RLS)

## 📄 라이선스

개인 프로젝트

---

**개발 시작일**: 2025-10-19  
**최종 업데이트**: 2025-10-19  
**상태**: Phase 3 완료 - MVP 기능 구현 완료! 🎊

**GitHub**: https://github.com/hongdroid94/ai-copy-note  
**프로덕션**: https://ai-copy-note.netlify.app

