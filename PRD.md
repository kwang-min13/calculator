# 공학용 계산기 웹앱 PRD (Product Requirements Document)

## 1. 프로젝트 개요

### 1.1 프로젝트 명
**Engineering Calculator Web App** - 공학용 전자계산기 웹 애플리케이션

### 1.2 프로젝트 목적
모던한 디자인과 직관적인 UX를 갖춘 공학용 계산기 웹 애플리케이션을 개발하여, 학생, 엔지니어, 연구원 등이 웹 브라우저에서 손쉽게 복잡한 수학 계산을 수행할 수 있도록 한다.

### 1.3 타겟 사용자
- 공학 전공 학생
- 엔지니어 및 연구원
- 수학/과학 교육자
- 복잡한 계산이 필요한 일반 사용자

### 1.4 핵심 가치 제안
- **접근성**: 별도 설치 없이 웹 브라우저에서 즉시 사용 가능
- **모던 UI/UX**: 다크모드 지원 및 직관적인 인터페이스
- **공학 기능**: 삼각함수, 로그, 지수 등 고급 수학 함수 지원
- **반응형 디자인**: 모바일 및 데스크톱 환경 모두 지원

---

## 2. 기능 요구사항

### 2.1 핵심 기능 (MVP)

#### 2.1.1 기본 산술 연산
- **사칙연산**: 덧셈(+), 뺄셈(-), 곱셈(×), 나눗셈(÷)
- **우선순위 계산**: 괄호를 이용한 연산 순서 제어
- **퍼센트 계산**: % 연산자 지원

#### 2.1.2 공학 함수
- **삼각함수**: sin, cos, tan
- **로그 함수**: ln (자연로그), log (상용로그)
- **제곱근**: √ (루트)
- **거듭제곱**: ^ (지수 연산)
- **상수**: π (파이)

#### 2.1.3 각도 모드
- **DEG (Degree)**: 도 단위 각도 계산
- **RAD (Radian)**: 라디안 단위 각도 계산
- 모드 전환 토글 버튼

#### 2.1.4 디스플레이
- **메인 결과 표시**: 큰 폰트로 계산 결과 표시 (최대 7자리)
- **계산 히스토리**: 현재 입력 중인 수식 표시
- **실시간 업데이트**: 입력에 따른 즉각적인 화면 갱신

#### 2.1.5 입력 제어
- **AC (All Clear)**: 모든 입력 및 결과 초기화
- **Backspace**: 마지막 입력 문자 삭제
- **괄호 자동 매칭**: ( ) 버튼으로 괄호 쌍 관리
- **소수점 입력**: . 버튼

### 2.2 부가 기능 (Post-MVP)

#### 2.2.1 히스토리 기능
- 계산 기록 저장 및 조회
- 이전 계산 결과 재사용
- 히스토리 삭제 기능

#### 2.2.2 추가 공학 함수
- 역삼각함수: arcsin, arccos, arctan
- 쌍곡선 함수: sinh, cosh, tanh
- 팩토리얼: n!
- 절댓값: |x|
- 지수 함수: e^x

#### 2.2.3 메모리 기능
- M+, M-, MR, MC (메모리 저장/불러오기)

#### 2.2.4 설정
- 소수점 자릿수 설정
- 천 단위 구분 기호 표시 옵션
- 키보드 단축키 지원

---

## 3. UI/UX 디자인 사양

### 3.1 디자인 시스템

#### 3.1.1 컬러 팔레트
**라이트 모드**
- Primary: `#0d7ff2` (블루)
- Background: `#f5f7f8` (라이트 그레이)
- Text: `#111418` (다크 그레이)
- Button Background: `#ffffff` (화이트)
- Secondary Button: `#e8eef3` (라이트 그레이)
- Function Button: `#f0f4f8` (소프트 그레이)
- Error/Clear: `#fecaca` (로즈 100) / `#dc2626` (로즈 600)

**다크 모드**
- Primary: `#0d7ff2` (블루)
- Background: `#101922` (다크 블루-그레이)
- Text: `#ffffff` (화이트)
- Button Background: `#334155` (슬레이트 700)
- Secondary Button: `#1e293b` (슬레이트 800)
- Function Button: `#1e293b80` (슬레이트 800, 50% opacity)
- Keypad Background: `#0f172a80` (슬레이트 900, 50% opacity)

#### 3.1.2 타이포그래피
- **Display Font**: Space Grotesk (제목, 숫자)
  - Main Result: 6xl (3.75rem / 60px), Bold
  - History: 2xl (1.5rem / 24px), Medium
- **Body Font**: Noto Sans (버튼, UI 텍스트)
  - Button Text: lg-2xl, Semibold/Bold
  - Small Text: xs-sm, Medium

#### 3.1.3 레이아웃
- **최대 너비**: 448px (max-w-md)
- **화면 구성**:
  1. Header (64px): 메뉴, 타이틀, 히스토리 아이콘
  2. Display Area (가변): 각도 모드 토글, 계산 히스토리, 메인 결과
  3. Keypad Area (고정): 7행 × 4열 버튼 그리드

#### 3.1.4 컴포넌트 스타일

**버튼**
- Border Radius: `1rem` (2xl)
- Height: 56px (h-14) / 64px (h-16, md 이상)
- Gap: 12px (gap-3)
- Transition: `all 0.2s ease`
- Hover: `brightness-95`
- Active: `scale-95`

**버튼 타입별 스타일**
1. **숫자 버튼** (0-9, .):
   - Light: `bg-white`, `shadow-sm`
   - Dark: `bg-slate-700`
   - Text: `text-2xl`, `font-semibold`

2. **연산자 버튼** (+, -, ×, ÷):
   - Light: `bg-primary/10`, `text-primary`
   - Dark: `bg-primary/20`
   - Hover: `bg-primary/20` (Light), `bg-primary/30` (Dark)

3. **공학 함수 버튼** (sin, cos, tan, ln, log, √, ^, π):
   - Light: `bg-[#f0f4f8]`, `text-slate-600`
   - Dark: `bg-slate-800/50`, `text-slate-400`
   - Hover: `bg-white` (Light), `bg-slate-700` (Dark)

4. **AC 버튼**:
   - Light: `bg-rose-100`, `text-rose-600`
   - Dark: `bg-rose-900/30`, `text-rose-400`

5. **= 버튼**:
   - `bg-primary`, `text-white`
   - Shadow: `shadow-lg shadow-primary/30`

**디스플레이 영역**
- Backdrop Blur: `backdrop-blur-sm`
- Background: `bg-white/50` (Light), `bg-slate-900/50` (Dark)
- Border: `border-t border-white/20` (Light), `border-slate-800/50` (Dark)
- Shadow: `0 -4px 20px rgba(0,0,0,0.05)`

### 3.2 반응형 디자인
- **모바일 우선**: 320px ~ 448px
- **태블릿**: 768px 이상 (md breakpoint)
  - 버튼 높이 증가 (h-16)
  - 폰트 크기 증가 (text-7xl)
- **데스크톱**: 중앙 정렬, 최대 너비 제한, 그림자 효과

### 3.3 인터랙션
- **버튼 피드백**:
  - Hover: 밝기 감소 (brightness-95)
  - Active: 스케일 축소 (scale-95)
  - Transition: 0.2초 ease
- **모드 전환**: 라디오 버튼 스타일 토글, 부드러운 전환 애니메이션
- **키보드 지원**: 숫자, 연산자, Enter(=), Backspace, Escape(AC)

---

## 4. 기술 스택

### 4.1 프론트엔드
- **HTML5**: 시맨틱 마크업
- **CSS3**: Tailwind CSS (CDN 또는 빌드 시스템)
- **JavaScript (ES6+)**: 바닐라 JS 또는 React/Vue 프레임워크

### 4.2 폰트 및 아이콘
- **Google Fonts**:
  - Space Grotesk (300, 400, 500, 600, 700)
  - Noto Sans (400, 500, 700)
- **Material Symbols Outlined**: 아이콘 (menu, history, backspace, add, remove)

### 4.3 빌드 도구 (선택사항)
- **Vite** 또는 **Create React App**: 개발 서버 및 빌드
- **PostCSS**: Tailwind CSS 처리
- **ESLint + Prettier**: 코드 품질 관리

### 4.4 배포
- **Vercel** / **Netlify**: 정적 사이트 호스팅
- **GitHub Pages**: 무료 호스팅 옵션

---

## 5. 계산 로직 요구사항

### 5.1 수식 파싱
- **중위 표기법 → 후위 표기법**: Shunting-yard 알고리즘 사용
- **연산자 우선순위**:
  1. 괄호: `( )`
  2. 함수: `sin`, `cos`, `tan`, `ln`, `log`, `√`
  3. 거듭제곱: `^`
  4. 곱셈/나눗셈: `×`, `÷`
  5. 덧셈/뺄셈: `+`, `-`

### 5.2 계산 정확도
- **부동소수점 처리**: JavaScript `Number` 타입 사용
- **정밀도**: 최대 15자리 유효숫자
- **반올림**: 표시 시 소수점 이하 10자리까지 표시, 이후 반올림
- **오버플로우/언더플로우**: `Infinity`, `-Infinity`, `NaN` 처리

### 5.3 에러 처리
- **문법 오류**: "Syntax Error" 표시
- **수학적 오류**: "Math Error" 표시 (예: 0으로 나누기, 음수의 로그)
- **오버플로우**: "Overflow" 표시

### 5.4 각도 변환
- **DEG → RAD**: `radian = degree × π / 180`
- **RAD → DEG**: `degree = radian × 180 / π`

---

## 6. 사용자 시나리오

### 6.1 시나리오 1: 기본 계산
1. 사용자가 웹앱 접속
2. "7 + 3 × 2" 입력
3. "=" 버튼 클릭
4. 결과 "13" 표시 (곱셈 우선 계산)

### 6.2 시나리오 2: 공학 함수 사용
1. 각도 모드를 "DEG"로 설정
2. "sin(45) + 10" 입력
3. "=" 버튼 클릭
4. 결과 "10.707" 표시 (sin(45°) ≈ 0.707)

### 6.3 시나리오 3: 괄호 사용
1. "(2 + 3) × 4" 입력
2. "=" 버튼 클릭
3. 결과 "20" 표시

### 6.4 시나리오 4: 에러 처리
1. "10 ÷ 0" 입력
2. "=" 버튼 클릭
3. "Math Error" 표시

### 6.5 시나리오 5: 다크모드 전환
1. 시스템 다크모드 활성화
2. 웹앱이 자동으로 다크 테마로 전환
3. 모든 색상이 다크 팔레트로 변경

---

## 7. 성능 요구사항

### 7.1 응답 시간
- **버튼 클릭 → 화면 업데이트**: < 50ms
- **계산 실행**: < 100ms (복잡한 수식 포함)
- **초기 로딩**: < 2초 (3G 네트워크 기준)

### 7.2 최적화
- **코드 스플리팅**: 필요시 동적 임포트
- **이미지 최적화**: 아이콘은 SVG 또는 웹폰트 사용
- **CSS 최적화**: 미사용 Tailwind 클래스 제거 (PurgeCSS)

### 7.3 브라우저 호환성
- **Chrome**: 최신 버전 및 2개 이전 버전
- **Firefox**: 최신 버전 및 2개 이전 버전
- **Safari**: 최신 버전 및 1개 이전 버전
- **Edge**: 최신 버전
- **모바일**: iOS Safari 14+, Chrome Android 90+

---

## 8. 접근성 (Accessibility)

### 8.1 WCAG 2.1 준수
- **Level AA** 기준 충족

### 8.2 키보드 네비게이션
- **Tab**: 버튼 간 이동
- **Enter/Space**: 버튼 활성화
- **숫자 키**: 직접 입력
- **연산자 키**: +, -, *, / 입력
- **Escape**: AC (초기화)
- **Backspace**: 마지막 문자 삭제

### 8.3 스크린 리더 지원
- **ARIA 레이블**: 모든 버튼에 명확한 레이블
- **역할 정의**: `role="button"`, `role="region"`
- **상태 알림**: 계산 결과 변경 시 `aria-live="polite"`

### 8.4 색상 대비
- **텍스트 대비**: 최소 4.5:1 (WCAG AA)
- **버튼 대비**: 최소 3:1
- **다크모드**: 충분한 대비 유지

---

## 9. 보안 및 개인정보

### 9.1 데이터 저장
- **로컬 스토리지**: 계산 히스토리 저장 (선택사항)
- **쿠키**: 사용하지 않음
- **서버 전송**: 없음 (완전한 클라이언트 사이드 앱)

### 9.2 입력 검증
- **XSS 방지**: 사용자 입력을 직접 HTML로 렌더링하지 않음
- **인젝션 방지**: `eval()` 사용 금지, 안전한 파싱 라이브러리 사용

---

## 10. 테스트 계획

### 10.1 단위 테스트
- **계산 로직**: 모든 수학 함수 및 연산자 테스트
- **파싱 로직**: 다양한 수식 입력 케이스 테스트
- **각도 변환**: DEG/RAD 모드 전환 테스트

### 10.2 통합 테스트
- **UI 인터랙션**: 버튼 클릭 → 계산 → 결과 표시 플로우
- **에러 처리**: 잘못된 입력에 대한 에러 메시지 표시

### 10.3 E2E 테스트
- **사용자 시나리오**: 6장의 시나리오 자동화 테스트
- **크로스 브라우저**: Playwright 또는 Cypress 사용

### 10.4 수동 테스트
- **UI/UX 검증**: 디자인 가이드 준수 확인
- **접근성 테스트**: 키보드 네비게이션, 스크린 리더 테스트
- **반응형 테스트**: 다양한 디바이스 크기에서 확인

---

## 11. 마일스톤 및 일정

### Phase 1: MVP 개발 (2주)
- **Week 1**:
  - [ ] 프로젝트 셋업 및 디자인 시스템 구축
  - [ ] 기본 UI 레이아웃 구현
  - [ ] 숫자 입력 및 디스플레이 기능
- **Week 2**:
  - [ ] 기본 산술 연산 로직 구현
  - [ ] 공학 함수 구현 (sin, cos, tan, ln, log, √, ^)
  - [ ] DEG/RAD 모드 전환
  - [ ] 에러 처리

### Phase 2: 고도화 (1주)
- [ ] 히스토리 기능 추가
- [ ] 키보드 입력 지원
- [ ] 접근성 개선
- [ ] 단위 테스트 작성

### Phase 3: 배포 및 최적화 (1주)
- [ ] E2E 테스트
- [ ] 성능 최적화
- [ ] 크로스 브라우저 테스트
- [ ] 배포 (Vercel/Netlify)

---

## 12. 성공 지표 (KPI)

### 12.1 기술적 지표
- **Lighthouse 점수**: 90점 이상 (Performance, Accessibility, Best Practices)
- **번들 크기**: < 100KB (gzip 압축 후)
- **초기 로딩 시간**: < 2초

### 12.2 사용자 지표 (배포 후)
- **일일 활성 사용자**: 100명 (첫 달 목표)
- **평균 세션 시간**: > 2분
- **재방문율**: > 30%

---

## 13. 참고 자료

### 13.1 디자인 레퍼런스
- 제공된 디자인 파일: `screen.png`, `code.html`
- Material Design 3 가이드라인
- iOS/Android 네이티브 계산기 앱

### 13.2 기술 문서
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MDN Web Docs - Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)
- [Shunting-yard Algorithm](https://en.wikipedia.org/wiki/Shunting-yard_algorithm)

### 13.3 접근성 가이드
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

---

## 14. 부록

### 14.1 버튼 레이아웃 (4×7 그리드)

```
┌────────┬────────┬────────┬────────┐
│   AC   │  ( )   │   %    │   ÷    │
├────────┼────────┼────────┼────────┤
│  sin   │  cos   │  tan   │   ×    │
├────────┼────────┼────────┼────────┤
│   ln   │  log   │   √    │   -    │
├────────┼────────┼────────┼────────┤
│   7    │   8    │   9    │   +    │
├────────┼────────┼────────┼────────┤
│   4    │   5    │   6    │   ^    │
├────────┼────────┼────────┼────────┤
│   1    │   2    │   3    │   π    │
├────────┼────────┼────────┼────────┤
│   .    │   0    │   ⌫    │   =    │
└────────┴────────┴────────┴────────┘
```

### 14.2 컬러 코드 참조표

| 용도 | 라이트 모드 | 다크 모드 |
|------|------------|-----------|
| Primary | `#0d7ff2` | `#0d7ff2` |
| Background | `#f5f7f8` | `#101922` |
| Text | `#111418` | `#ffffff` |
| Number Button | `#ffffff` | `#334155` |
| Operator Button | `#e3f2fd` | `#0d7ff233` |
| Function Button | `#f0f4f8` | `#1e293b80` |
| AC Button | `#fecaca` / `#dc2626` | `#7f1d1d4d` / `#fca5a5` |
| Equals Button | `#0d7ff2` | `#0d7ff2` |

---

**문서 버전**: 1.0  
**작성일**: 2025-12-23  
**작성자**: Product Team  
**승인자**: [승인 대기]
