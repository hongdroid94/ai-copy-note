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
   - 에러 메시지 표시
   - 반응형 디자인
   - 다크모드 지원

3. **메인 대시보드**
   - 2단 레이아웃 (사이드바 + 메인 영역)
   - 로그인한 사용자만 접근 가능
   - 사용자 정보 표시 (Header)
   - 메모 입력 영역
   - 카테고리별 필터 (전체, 코드, 링크, 할 일, 아이디어, 참고자료, 기타)
   - 태그 필터
   - 메모 카드 리스트 (더미 데이터)

4. **🤖 AI 자동 분류 기능 (Gemini API)**
   - 메모 내용 자동 분석
   - 카테고리 자동 분류
   - 관련 태그 3-5개 자동 생성
   - 제목 자동 생성 (20자 이내)
   - 긴 텍스트 자동 요약 (200자 이상 시)
   - 실시간 진행률 표시
   - 분석 결과 미리보기 모달

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

## 🚧 다음 단계

### Phase 1: MVP 구현 (2-3주)

- [ ] Supabase 프로젝트 생성 및 설정
- [ ] 데이터베이스 스키마 구현
  - [ ] users 테이블
  - [ ] notes 테이블
  - [ ] categories 테이블
- [ ] 사용자 인증 구현
  - [ ] 이메일 로그인
  - [ ] 회원가입
  - [ ] 로그아웃
- [ ] 메모 CRUD 기능
  - [ ] 메모 생성
  - [ ] 메모 조회
  - [ ] 메모 수정
  - [ ] 메모 삭제
- [ ] Gemini API 연동
  - [ ] API 키 설정
  - [ ] 텍스트 분석 프롬프트 설계
  - [ ] 카테고리 자동 분류
  - [ ] 태그 자동 생성
- [ ] 기본 검색 기능

### Phase 2: 기능 개선 (1-2주)

- [ ] 제목 자동 생성
- [ ] 긴 텍스트 요약 생성
- [ ] 고급 필터링
  - [ ] 카테고리별 필터
  - [ ] 태그별 필터
  - [ ] 날짜별 필터
- [ ] 즐겨찾기 기능
- [ ] 모바일 반응형 개선

### Phase 3: 추가 기능 (2-3주)

- [ ] 다크모드 토글 기능
- [ ] 메모 내보내기 (Markdown, JSON)
- [ ] 키보드 단축키
- [ ] 사용 통계 대시보드

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
- 🔄 **Phase 3**: 메모 CRUD 기능 (진행 예정)
- ⏳ **Phase 4**: 고급 기능 및 최적화

## 📸 스크린샷

배포된 사이트에서 확인 가능합니다: https://ai-copy-note.netlify.app

## 📄 라이선스

개인 프로젝트

---

**개발 시작일**: 2025-10-19  
**최종 업데이트**: 2025-10-19  
**상태**: Phase 2 완료 - 인증 시스템 구현 완료! 🎉

