# 공학용 계산기 웹앱 - 상세 작업 계획

## 📋 Phase 1: 프로젝트 초기 설정 (1-2일)

### 1.1 Git 저장소 설정
- [ ] Git 저장소 초기화 (`git init`)
- [ ] GitHub 원격 저장소 연결
- [ ] 초기 커밋 (문서 파일들)
- [ ] main 브랜치 보호 설정 (GitHub)

### 1.2 프로젝트 구조 생성
- [ ] `src/` 디렉토리 및 하위 폴더 생성
  - [ ] `src/core/` - 계산 엔진
  - [ ] `src/utils/` - 유틸리티 함수
  - [ ] `src/components/` - UI 컴포넌트
  - [ ] `src/assets/styles/` - CSS 파일
- [ ] `tests/` 디렉토리 생성
  - [ ] `tests/unit/` - 단위 테스트 (코어 로직만)
- [ ] `public/` 디렉토리 생성

### 1.3 빌드 도구 설정
- [ ] `package.json` 생성 및 기본 정보 입력
- [ ] Vite 설치 및 설정
  - [ ] `vite.config.js` 생성 (base: '/calculator/')
  - [ ] HTML 진입점 설정
- [ ] Tailwind CSS 설치 및 설정
  - [ ] `tailwind.config.js` 생성
  - [ ] `postcss.config.js` 생성
  - [ ] `src/assets/styles/main.css` 생성
- [ ] 개발 서버 실행 테스트 (`npm run dev`)

### 1.4 테스트 환경 설정
- [ ] Vitest 설치 및 설정
  - [ ] `vitest.config.js` 생성 (필요시)
  - [ ] 테스트 스크립트 추가
  - [ ] 코어 로직 테스트 디렉토리 확인 (`tests/unit/`)

### 1.5 코드 품질 도구 설정
- [ ] ESLint 설치 및 설정
  - [ ] `.eslintrc.json` 생성
  - [ ] ES2022+ 규칙 설정
- [ ] Prettier 설치 및 설정
  - [ ] `.prettierrc` 생성
  - [ ] 포맷팅 규칙 설정
- [ ] 린트 스크립트 테스트

### 1.6 GitHub Actions 설정
- [ ] `.github/workflows/` 디렉토리 생성
- [ ] `deploy.yml` 워크플로우 파일 작성
  - [ ] 빌드 Job 설정
  - [ ] 테스트 Job 설정
  - [ ] 배포 Job 설정 (GitHub Pages)
- [ ] GitHub Pages 활성화 (Settings → Pages)
- [ ] 워크플로우 테스트 (빈 커밋 push)

---

## 📋 Phase 2: 코어 로직 구현 - TDD (1주)

### 2.1 상수 및 타입 정의
- [ ] `src/utils/constants.js` 작성
  - [ ] 연산자 우선순위 정의
  - [ ] 토큰 타입 정의
  - [ ] 에러 메시지 정의
  - [ ] 버튼 레이아웃 정의

### 2.2 Token 클래스 (TDD)
- [ ] 테스트 작성: `tests/unit/token.test.js`
  - [ ] Token 생성 테스트
  - [ ] NumberToken 테스트
  - [ ] OperatorToken 테스트
  - [ ] FunctionToken 테스트
- [ ] 구현: `src/core/Token.js`
  - [ ] Token 기본 클래스
  - [ ] NumberToken 클래스
  - [ ] OperatorToken 클래스
  - [ ] FunctionToken 클래스
- [ ] 리팩토링 및 테스트 통과 확인

### 2.3 Tokenizer (TDD)
- [ ] 테스트 작성: `tests/unit/tokenizer.test.js`
  - [ ] 숫자 토큰화 테스트
  - [ ] 연산자 토큰화 테스트
  - [ ] 함수 토큰화 테스트
  - [ ] 괄호 토큰화 테스트
  - [ ] 공백 처리 테스트
  - [ ] 에러 케이스 테스트 (잘못된 문자)
- [ ] 구현: `src/core/Tokenizer.js`
  - [ ] tokenize() 메서드
  - [ ] 정규식 패턴 정의
  - [ ] 에러 처리
- [ ] 리팩토링 및 테스트 통과 확인

### 2.4 Parser - Shunting-yard (TDD)
- [ ] 테스트 작성: `tests/unit/parser.test.js`
  - [ ] 단순 수식 파싱 테스트 (2 + 3)
  - [ ] 연산자 우선순위 테스트 (2 + 3 × 4)
  - [ ] 괄호 처리 테스트 ((2 + 3) × 4)
  - [ ] 함수 파싱 테스트 (sin(30))
  - [ ] 중첩 함수 테스트 (sin(cos(45)))
  - [ ] 에러 케이스 테스트 (괄호 불일치)
- [ ] 구현: `src/core/Parser.js`
  - [ ] parse() 메서드
  - [ ] Shunting-yard 알고리즘
  - [ ] 연산자 우선순위 처리
  - [ ] 괄호 매칭 검증
- [ ] 리팩토링 및 테스트 통과 확인

### 2.5 Evaluator - RPN (TDD)
- [ ] 테스트 작성: `tests/unit/evaluator.test.js`
  - [ ] 기본 연산 평가 테스트
  - [ ] 함수 평가 테스트
  - [ ] 각도 모드 테스트 (DEG/RAD)
  - [ ] 0으로 나누기 에러 테스트
  - [ ] Infinity/NaN 처리 테스트
- [ ] 구현: `src/core/Evaluator.js`
  - [ ] evaluate() 메서드
  - [ ] 스택 기반 계산
  - [ ] applyOperator() 메서드
  - [ ] applyFunction() 메서드
  - [ ] 에러 처리
- [ ] 리팩토링 및 테스트 통과 확인

### 2.6 Math Functions (TDD)
- [ ] 테스트 작성: `tests/unit/mathFunctions.test.js`
  - [ ] sin 함수 테스트 (DEG/RAD)
  - [ ] cos 함수 테스트
  - [ ] tan 함수 테스트
  - [ ] ln 함수 테스트 (음수 에러)
  - [ ] log 함수 테스트
  - [ ] sqrt 함수 테스트 (음수 에러)
  - [ ] pow 함수 테스트
- [ ] 구현: `src/utils/mathFunctions.js`
  - [ ] 삼각함수 구현
  - [ ] 로그 함수 구현
  - [ ] 기타 함수 구현
  - [ ] 각도 변환 유틸리티
- [ ] 리팩토링 및 테스트 통과 확인

### 2.7 Calculator Engine (TDD)
- [ ] 테스트 작성: `tests/unit/calculator.test.js`
  - [ ] 숫자 입력 테스트
  - [ ] 연산자 입력 테스트
  - [ ] 함수 입력 테스트
  - [ ] 계산 실행 테스트
  - [ ] 초기화 테스트 (AC)
  - [ ] 백스페이스 테스트
  - [ ] 각도 모드 전환 테스트
  - [ ] 에러 상태 테스트
- [ ] 구현: `src/core/Calculator.js`
  - [ ] 상태 관리 (expression, result, angleMode)
  - [ ] inputDigit() 메서드
  - [ ] inputOperator() 메서드
  - [ ] inputFunction() 메서드
  - [ ] calculate() 메서드
  - [ ] clear() 메서드
  - [ ] backspace() 메서드
  - [ ] toggleAngleMode() 메서드
- [ ] 리팩토링 및 SOLID 원칙 검토
- [ ] 테스트 통과 확인

### 2.8 Error Handler (TDD)
- [ ] 테스트 작성: `tests/unit/errorHandler.test.js`
  - [ ] 에러 타입별 처리 테스트
  - [ ] 에러 메시지 포맷팅 테스트
- [ ] 구현: `src/utils/errorHandler.js`
  - [ ] CalculatorError 클래스
  - [ ] ErrorHandler 클래스
  - [ ] 에러 타입 정의
- [ ] 리팩토링 및 테스트 통과 확인

### 2.9 Storage Manager (TDD)
- [ ] 테스트 작성: `tests/unit/storage.test.js`
  - [ ] 저장 테스트
  - [ ] 불러오기 테스트
  - [ ] 기본값 반환 테스트
  - [ ] 에러 처리 테스트
- [ ] 구현: `src/utils/storage.js`
  - [ ] StorageInterface 추상 클래스
  - [ ] LocalStorageAdapter 클래스
  - [ ] save() 메서드
  - [ ] load() 메서드
  - [ ] clear() 메서드
- [ ] 리팩토링 및 테스트 통과 확인

---

## 📋 Phase 3: UI 컴포넌트 구현 (3-4일)

### 3.1 기본 HTML 구조
- [ ] `src/index.html` 작성
  - [ ] 메타 태그 설정
  - [ ] Google Fonts 로드
  - [ ] Material Symbols 로드
  - [ ] 앱 컨테이너 div
  - [ ] 스크립트 로드

### 3.2 CSS 스타일 설정
- [ ] `src/assets/styles/main.css` 작성
  - [ ] Tailwind directives
  - [ ] 커스텀 CSS 변수
  - [ ] 다크모드 스타일
  - [ ] 애니메이션 정의

### 3.3 Theme Manager
- [ ] `src/utils/themeManager.js` 작성
  - [ ] 시스템 다크모드 감지
  - [ ] 테마 적용 함수
  - [ ] 테마 전환 함수
  - [ ] 로컬 스토리지 연동

### 3.4 Display Component
- [ ] `src/components/Display.js` 작성
  - [ ] Display 클래스
  - [ ] init() 메서드 - HTML 생성
  - [ ] updateHistory() 메서드
  - [ ] updateResult() 메서드
  - [ ] showError() 메서드
  - [ ] clearError() 메서드
  - [ ] formatResult() 메서드 (숫자 포맷팅)

### 3.5 ModeToggle Component
- [ ] `src/components/ModeToggle.js` 작성
  - [ ] ModeToggle 클래스
  - [ ] init() 메서드 - HTML 생성
  - [ ] 라디오 버튼 이벤트 리스너
  - [ ] 모드 변경 콜백

### 3.6 Button Component
- [ ] `src/components/Button.js` 작성
  - [ ] Button 클래스
  - [ ] 버튼 타입별 스타일 정의
  - [ ] createButton() 메서드
  - [ ] 이벤트 리스너 연결

### 3.7 Keypad Component
- [ ] `src/components/Keypad.js` 작성
  - [ ] Keypad 클래스
  - [ ] init() 메서드 - 버튼 그리드 생성
  - [ ] 버튼 레이아웃 정의 (4×7)
  - [ ] 버튼 클릭 이벤트 처리
  - [ ] 콜백 함수 연결

### 3.8 Keyboard Handler
- [ ] `src/utils/keyboardHandler.js` 작성
  - [ ] KeyboardHandler 클래스
  - [ ] 키보드 이벤트 리스너
  - [ ] 키 매핑 (숫자, 연산자, 특수키)
  - [ ] Calculator 인스턴스 연동

### 3.9 Main App Integration
- [ ] `src/main.js` 작성
  - [ ] Calculator 인스턴스 생성
  - [ ] 컴포넌트 초기화
  - [ ] 이벤트 리스너 연결
  - [ ] ThemeManager 초기화
  - [ ] KeyboardHandler 초기화
  - [ ] 초기 상태 설정

---

## 📋 Phase 4: UI 통합 및 수동 테스트 (2-3일)

### 4.1 코어 로직 통합 테스트
- [ ] Calculator 클래스 통합 테스트
  - [ ] Parser + Evaluator 통합 동작 확인
  - [ ] 복잡한 수식 계산 테스트
  - [ ] 에러 처리 통합 테스트
- [ ] 테스트 커버리지 확인
  - [ ] 코어 로직 90% 이상 달성 확인
  - [ ] 누락된 테스트 케이스 추가

### 4.2 UI 수동 테스트 (자동화 없음)
- [ ] 기본 계산 플로우 수동 테스트
  - [ ] 숫자 입력 → 연산자 → = 버튼
  - [ ] 결과 표시 확인
  - [ ] AC 버튼으로 초기화
- [ ] 공학 함수 수동 테스트
  - [ ] sin, cos, tan 함수 동작 확인
  - [ ] ln, log, sqrt 함수 동작 확인
  - [ ] DEG/RAD 모드 전환 확인
- [ ] 에러 처리 수동 테스트
  - [ ] 0으로 나누기 에러 메시지
  - [ ] 잘못된 수식 입력 처리
  - [ ] 에러 후 복구 동작
- [ ] 키보드 입력 수동 테스트
  - [ ] 숫자 키 입력
  - [ ] 연산자 키 입력 (+, -, *, /)
  - [ ] Enter 키로 계산
  - [ ] Escape 키로 초기화
  - [ ] Backspace 키로 삭제

### 4.3 접근성 수동 검증
- [ ] ARIA 속성 추가
  - [ ] 버튼에 aria-label 추가
  - [ ] 디스플레이에 aria-live 추가
  - [ ] 역할 정의 (role) 추가
- [ ] 키보드 네비게이션 수동 테스트
  - [ ] Tab 키로 포커스 이동 확인
  - [ ] Enter/Space로 버튼 활성화 확인
  - [ ] 포커스 표시 스타일 확인
- [ ] 스크린 리더 수동 테스트 (선택사항)
  - [ ] NVDA 또는 VoiceOver로 테스트
  - [ ] 버튼 레이블 읽기 확인
  - [ ] 결과 변경 알림 확인

### 4.4 크로스 브라우저 수동 테스트
- [ ] Chrome 테스트 (최신 버전)
  - [ ] 기본 기능 동작 확인
  - [ ] 다크모드 전환 확인
- [ ] Firefox 테스트
  - [ ] 기본 기능 동작 확인
  - [ ] 레이아웃 깨짐 확인
- [ ] Safari 테스트 (가능한 경우)
  - [ ] 기본 기능 동작 확인
  - [ ] iOS Safari 호환성 확인
- [ ] Edge 테스트
  - [ ] 기본 기능 동작 확인
- [ ] 모바일 브라우저 테스트
  - [ ] Chrome Android 테스트
  - [ ] iOS Safari 테스트 (가능한 경우)

### 4.5 반응형 디자인 수동 검증
- [ ] 모바일 뷰포트 테스트 (320px ~ 480px)
  - [ ] 버튼 크기 및 간격 확인
  - [ ] 텍스트 가독성 확인
  - [ ] 터치 타겟 크기 확인 (최소 44px)
- [ ] 태블릿 뷰포트 테스트 (768px ~ 1024px)
  - [ ] 레이아웃 확인
  - [ ] 중앙 정렬 확인
- [ ] 데스크톱 뷰포트 테스트 (1024px+)
  - [ ] 최대 너비 제한 확인 (max-w-md)
  - [ ] 그림자 효과 확인
- [ ] 가로/세로 모드 전환 테스트
  - [ ] 모바일 가로 모드
  - [ ] 태블릿 세로 모드

---

## 📋 Phase 5: 최적화 및 배포 (1-2일)

### 5.1 성능 최적화
- [ ] Lighthouse 점수 측정
  - [ ] Performance 90+ 목표
  - [ ] Accessibility 90+ 목표
  - [ ] Best Practices 90+ 목표
- [ ] 번들 크기 최적화
  - [ ] Tree shaking 확인
  - [ ] Tailwind CSS purge 확인
  - [ ] 미사용 코드 제거
- [ ] 로딩 시간 최적화
  - [ ] Font display swap
  - [ ] Preconnect 설정

### 5.2 코드 품질 검토
- [ ] ESLint 에러 0개 확인
- [ ] Prettier 포맷팅 적용
- [ ] 테스트 커버리지 확인
  - [ ] 코어 로직 90% 이상
  - [ ] 유틸리티 85% 이상
- [ ] SOLID 원칙 준수 검토

### 5.3 문서 업데이트
- [ ] README.md 최종 업데이트
  - [ ] 배포 URL 추가
  - [ ] 스크린샷 추가
  - [ ] 사용법 업데이트
- [ ] CHANGELOG.md 작성
- [ ] 주석 및 JSDoc 추가

### 5.4 GitHub Pages 배포
- [ ] 빌드 테스트 (`npm run build`)
- [ ] 로컬 프리뷰 테스트 (`npm run preview`)
- [ ] main 브랜치 push
- [ ] GitHub Actions 워크플로우 실행 확인
- [ ] 배포 완료 확인
- [ ] 실제 URL 접속 테스트

### 5.5 최종 검증
- [ ] 모든 기능 동작 확인
- [ ] 에러 없이 실행 확인
- [ ] 다크모드 전환 확인
- [ ] 모바일 반응형 확인
- [ ] 성능 지표 확인

---

## 📋 Phase 6: Post-MVP 기능 (선택사항)

### 6.1 히스토리 기능
- [x] 계산 기록 저장
- [x] 히스토리 모달 UI
- [x] 기록 재사용 기능
- [x] 기록 삭제 기능

### 6.2 추가 공학 함수
- [x] 역삼각함수 (arcsin, arccos, arctan)
- [x] 쌍곡선 함수 (sinh, cosh, tanh)
- [x] 팩토리얼 (n!)
- [x] 절댓값 (|x|)

### 6.3 메모리 기능
- [x] M+ (메모리 추가)
- [x] M- (메모리 빼기)
- [x] MR (메모리 불러오기)
- [x] MC (메모리 초기화)

### 6.4 설정 기능
- [x] 소수점 자릿수 설정
- [x] 천 단위 구분 기호
- [x] 테마 수동 선택 (라이트/다크/자동)

---

## 🎯 우선순위 및 예상 소요 시간

| Phase | 우선순위 | 예상 시간 | 의존성 |
|-------|---------|----------|--------|
| Phase 1 | 🔴 필수 | 1-2일 | 없음 |
| Phase 2 | 🔴 필수 | 1주 | Phase 1 |
| Phase 3 | 🔴 필수 | 3-4일 | Phase 2 |
| Phase 4 | 🔴 필수 | 2-3일 | Phase 3 |
| Phase 5 | 🔴 필수 | 1-2일 | Phase 4 |
| Phase 6 | 🟡 선택 | 1주+ | Phase 5 |

**총 예상 시간**: 2-3주 (MVP 완성 기준)

---

## 📝 체크리스트 사용법

1. **작업 시작 전**: 해당 항목을 `[/]`로 표시
2. **작업 완료 후**: 해당 항목을 `[x]`로 표시
3. **TDD 준수**: 코어 로직은 반드시 테스트 먼저 작성
4. **커밋 단위**: 각 하위 항목 완료 시 커밋
5. **코드 리뷰**: SOLID 원칙 준수 여부 확인

---

**문서 버전**: 1.0  
**최종 수정일**: 2025-12-23  
**관련 문서**: [PRD.md](./PRD.md), [TECH_SPEC.md](./TECH_SPEC.md), [개발 규칙](./docs/rules/README.md)
