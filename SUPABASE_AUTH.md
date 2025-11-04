# Supabase 인증 시스템 구현 문서

## 📋 개요

AI Copy Note 프로젝트에 Supabase를 활용한 이메일 기반 인증 시스템을 구현했습니다.

## 🗄️ Supabase 프로젝트 정보

- **프로젝트 이름**: ai-copy-note
- **프로젝트 ID**: hmfjchghejzevgfgqjot
- **리전**: ap-northeast-2 (서울)
- **상태**: ACTIVE_HEALTHY
- **데이터베이스**: PostgreSQL 17.6.1
- **생성일**: 2025-10-19

### API 정보

- **URL**: https://hmfjchghejzevgfgqjot.supabase.co
- **Anon Key**: (환경변수로 관리)

## 🏗️ 구조

### 1. Supabase 클라이언트 설정

**파일**: `client/src/lib/supabase.js`

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})
```

### 2. 인증 Context

**파일**: `client/src/contexts/AuthContext.jsx`

React Context API를 사용하여 전역 인증 상태를 관리합니다.

**제공되는 기능**:
- `user`: 현재 로그인된 사용자 정보
- `loading`: 인증 상태 로딩 여부
- `signUp(email, password)`: 회원가입
- `signIn(email, password)`: 로그인
- `signOut()`: 로그아웃

### 3. Protected Route

**파일**: `client/src/components/auth/ProtectedRoute.jsx`

로그인이 필요한 페이지를 보호하는 컴포넌트입니다.

- 로그인하지 않은 사용자를 자동으로 로그인 페이지로 리다이렉트
- 로딩 중에는 스피너 표시

## 📱 구현된 페이지

### 1. 회원가입 페이지 (`/signup`)

**파일**: `client/src/pages/SignupPage.jsx`

**기능**:
- 이메일, 비밀번호, 비밀번호 확인 입력
- 유효성 검사 (비밀번호 일치, 최소 6자 등)
- 회원가입 성공 시 로그인 페이지로 자동 이동
- 에러 메시지 표시

**유효성 검사**:
- 모든 필드 필수 입력
- 비밀번호 일치 확인
- 비밀번호 최소 6자 이상

### 2. 로그인 페이지 (`/login`)

**파일**: `client/src/pages/LoginPage.jsx`

**기능**:
- 이메일, 비밀번호 입력
- 로그인 성공 시 대시보드로 자동 이동
- 이미 로그인된 상태면 대시보드로 리다이렉트
- 에러 메시지 표시 (잘못된 인증 정보, 이메일 미인증 등)

**에러 처리**:
- `Invalid login credentials`: 이메일 또는 비밀번호 오류
- `Email not confirmed`: 이메일 인증 필요

### 3. 대시보드 페이지 (`/dashboard`)

**파일**: `client/src/pages/DashboardPage.jsx`

- `ProtectedRoute`로 보호됨
- 로그인한 사용자만 접근 가능
- 로그아웃 기능 제공 (Header)

### 4. Header 컴포넌트

**파일**: `client/src/components/layout/Header.jsx`

**기능**:
- 사용자 이메일 표시
- 사용자 메뉴 (드롭다운)
- 로그아웃 버튼

## 🌍 환경변수

### 로컬 개발 (`.env`)

```env
# Supabase
VITE_SUPABASE_URL=https://hmfjchghejzevgfgqjot.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Netlify 환경변수

Netlify 프로젝트 설정에 다음 환경변수가 설정되어 있습니다:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🔐 보안

### Anon Key 사용

- Public key이므로 클라이언트에서 안전하게 사용 가능
- Row Level Security (RLS)로 데이터 접근 제어
- 민감한 작업은 서버 사이드에서 처리

### Row Level Security (RLS)

Supabase의 PostgreSQL RLS 정책으로 데이터를 보호합니다.

**기본 정책**:
- 사용자는 자신의 데이터만 읽고 쓸 수 있음
- 관리자는 모든 데이터에 접근 가능

## 🚀 사용 방법

### 회원가입

1. `/signup` 페이지 접속
2. 이메일과 비밀번호 입력
3. 비밀번호 확인
4. "가입하기" 버튼 클릭
5. (선택) 이메일 확인 (Supabase 설정에 따라)
6. 자동으로 로그인 페이지로 이동

### 로그인

1. `/login` 페이지 접속
2. 이메일과 비밀번호 입력
3. "로그인하기" 버튼 클릭
4. 자동으로 대시보드로 이동

### 로그아웃

1. 대시보드에서 우측 상단 사용자 아이콘 클릭
2. 드롭다운 메뉴에서 "로그아웃" 클릭
3. 자동으로 로그인 페이지로 이동

## 📦 의존성

```json
{
  "@supabase/supabase-js": "^2.x.x"
}
```

## 🐛 알려진 이슈

현재 알려진 이슈가 없습니다.

## 🔮 향후 개선사항

1. **소셜 로그인**
   - Google OAuth
   - GitHub OAuth

2. **비밀번호 재설정**
   - 이메일을 통한 비밀번호 재설정 기능

3. **프로필 관리**
   - 사용자 프로필 정보 수정
   - 아바타 업로드

4. **이메일 인증**
   - 회원가입 시 이메일 인증 필수화
   - 인증 링크 재전송 기능

5. **세션 관리**
   - 다중 기기 로그인 관리
   - 활성 세션 목록 및 로그아웃 기능

## 📚 참고 자료

- [Supabase Auth 문서](https://supabase.com/docs/guides/auth)
- [Supabase JS 클라이언트](https://supabase.com/docs/reference/javascript/auth-signup)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## 🎯 테스트

### 로컬 테스트

```bash
cd client
npm run dev
```

1. http://localhost:5173/signup 접속
2. 회원가입 테스트
3. 로그인 테스트
4. 대시보드 접근 테스트
5. 로그아웃 테스트

### 프로덕션 테스트

1. https://ai-copy-note.netlify.app/signup 접속
2. 위와 동일한 테스트 수행

## ✅ 완료된 작업

- [x] Supabase 프로젝트 생성
- [x] Supabase 클라이언트 설정
- [x] 인증 Context 구현
- [x] 회원가입 페이지 구현
- [x] 로그인 페이지 구현
- [x] Protected Route 구현
- [x] 로그아웃 기능 구현
- [x] Netlify 환경변수 설정
- [x] 프로덕션 배포

---

**최종 업데이트**: 2025-10-19
**버전**: 1.0.0

