# Changelog

AI Copy Note 프로젝트의 변경 이력입니다.

## [v0.2.0] - 2025-10-19 - Gemini API 연동 🤖

### 추가 (Added)
- ✨ **Gemini API 통합**
  - Google Generative AI SDK 설치
  - 텍스트 분석 유틸리티 함수 구현
  - 환경변수 기반 API 키 관리
  
- 🎨 **AI 자동 분류 기능**
  - 카테고리 자동 분류 (코드, 링크, 할일, 아이디어, 참고자료, 기타)
  - 관련 태그 3-5개 자동 생성
  - 제목 자동 생성 (20자 이내)
  - 긴 텍스트 자동 요약 (200자 이상 시)

- 💫 **UI 컴포넌트**
  - `AILoadingModal`: AI 분석 중 로딩 모달 (진행률 표시)
  - `AIAnalysisModal`: AI 분석 결과 표시 모달
  - AI 자동 분류 ON/OFF 토글
  - 키보드 단축키 (Ctrl/Cmd + Enter로 저장)

- 📝 **프롬프트 엔지니어링**
  - PRD 기반 구조화된 프롬프트 설계
  - JSON 형식 응답 파싱
  - 에러 핸들링 및 폴백 로직

### 개선 (Improved)
- 🎭 애니메이션 추가 (fadeIn, bounce)
- 🎨 로딩 상태 시각화 개선
- ⚡ 진행률 시뮬레이션으로 UX 향상

### 문서 (Documentation)
- `GEMINI_SETUP.md`: Gemini API 설정 가이드
- `CHANGELOG.md`: 변경 이력 문서
- README 업데이트 (Gemini API 기능 추가)

### 배포 (Deployment)
- Netlify 환경변수에 `VITE_GEMINI_API_KEY` 설정
- 프로덕션 재배포 완료
- 배포 URL: https://ai-copy-note.netlify.app

### 기술 스택 (Tech Stack)
- `@google/generative-ai`: ^0.21.0

---

## [v0.1.0] - 2025-10-19 - 초기 개발 🚀

### 추가 (Added)
- 🎨 **기본 UI 구조**
  - React 18 + Vite 프로젝트 초기화
  - TailwindCSS 스타일링 시스템
  - React Router v6 라우팅

- 📱 **페이지 및 컴포넌트**
  - 로그인/회원가입 화면
  - 메인 대시보드 레이아웃
  - 메모 입력 컴포넌트
  - 메모 카드 리스트
  - 카테고리 사이드바

- 🎨 **디자인 시스템**
  - 카테고리별 색상 정의
  - 다크모드 지원 (CSS)
  - 반응형 레이아웃
  - 커스텀 스타일 컴포넌트

- 🚀 **배포 인프라**
  - Netlify 배포 설정 (netlify.toml)
  - Netlify MCP 연동
  - 프로덕션 배포 완료

### 문서 (Documentation)
- `PRD.md`: Product Requirements Document
- `WIREFRAME.md`: UI/UX 와이어프레임
- `DEPLOYMENT.md`: 배포 정보
- `README.md`: 프로젝트 개요

### 기술 스택 (Tech Stack)
- React 18
- Vite 7.1.10
- TailwindCSS 3.4.0
- React Router v6
- Netlify (배포)

---

**버전 관리 규칙**
- Major.Minor.Patch 형식 (Semantic Versioning)
- Major: 주요 기능 추가 또는 Breaking Changes
- Minor: 새로운 기능 추가
- Patch: 버그 수정 및 개선

