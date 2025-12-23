## 작업 배경

Phase 2에서 구현한 코어 로직을 사용자가 실제로 사용할 수 있도록 UI 컴포넌트를 구현합니다. 이 단계에서는 디자인 시스템을 따라 Display, Keypad, Button 등의 컴포넌트를 만들고, 코어 로직과 통합하여 완전한 계산기 앱을 완성합니다.

**주의**: UI 컴포넌트는 TDD를 적용하지 않으며, 브라우저에서 수동으로 테스트합니다.

## 작업 내용

### 3.1 기본 HTML 구조
- [ ] `src/index.html` 작성
  - [ ] DOCTYPE 및 기본 메타 태그 설정
  - [ ] Google Fonts 로드 (Space Grotesk, Noto Sans)
  - [ ] Material Symbols 아이콘 로드
  - [ ] 앱 컨테이너 div (`id="app"`)
  - [ ] main.js 스크립트 로드

### 3.2 CSS 스타일 설정
- [ ] `src/assets/styles/main.css` 작성
  - [ ] Tailwind directives (`@tailwind base, components, utilities`)
  - [ ] 커스텀 CSS 변수 (컬러, 간격 등)
  - [ ] 다크모드 스타일 (`.dark` 클래스 기반)
  - [ ] 애니메이션 정의 (버튼 hover, active 효과)

### 3.3 Theme Manager
- [ ] `src/utils/themeManager.js` 작성
  - [ ] 시스템 다크모드 감지 (`prefers-color-scheme`)
  - [ ] 테마 적용 함수 (`applyTheme()`)
  - [ ] 테마 전환 함수 (`toggle()`)
  - [ ] 로컬 스토리지 연동 (테마 설정 저장)

### 3.4 Display Component
- [ ] `src/components/Display.js` 작성
  - [ ] Display 클래스 생성
  - [ ] `init()` 메서드 - HTML 템플릿 생성 및 DOM 삽입
  - [ ] `updateHistory()` 메서드 - 계산 히스토리 표시
  - [ ] `updateResult()` 메서드 - 계산 결과 표시
  - [ ] `showError()` 메서드 - 에러 메시지 표시 (빨간색)
  - [ ] `clearError()` 메서드 - 에러 스타일 제거
  - [ ] `formatResult()` private 메서드 - 숫자 포맷팅 (과학적 표기법, 소수점 처리)

### 3.5 ModeToggle Component
- [ ] `src/components/ModeToggle.js` 작성
  - [ ] ModeToggle 클래스 생성
  - [ ] `init()` 메서드 - DEG/RAD 라디오 버튼 HTML 생성
  - [ ] 라디오 버튼 change 이벤트 리스너 추가
  - [ ] 모드 변경 콜백 함수 연결 (Calculator.toggleAngleMode)

### 3.6 Button Component
- [ ] `src/components/Button.js` 작성
  - [ ] Button 클래스 생성
  - [ ] 버튼 타입별 스타일 정의 (number, operator, function, danger, equals)
  - [ ] `createButton()` 메서드 - 버튼 HTML 생성
  - [ ] 이벤트 리스너 연결 (click)

### 3.7 Keypad Component
- [ ] `src/components/Keypad.js` 작성
  - [ ] Keypad 클래스 생성
  - [ ] `init()` 메서드 - 4×7 버튼 그리드 생성
  - [ ] 버튼 레이아웃 정의 (AC, (), %, ÷, sin, cos, tan, ..., 0-9, =)
  - [ ] 버튼 클릭 이벤트 처리 (data-type, data-value 사용)
  - [ ] 콜백 함수 연결 (Calculator 메서드 호출)

### 3.8 Keyboard Handler
- [ ] `src/utils/keyboardHandler.js` 작성
  - [ ] KeyboardHandler 클래스 생성
  - [ ] 키보드 이벤트 리스너 (`keydown`)
  - [ ] 키 매핑 정의 (0-9, +, -, *, /, ^, Enter, Escape, Backspace)
  - [ ] Calculator 인스턴스 연동

### 3.9 Main App Integration
- [ ] `src/main.js` 작성
  - [ ] Calculator 인스턴스 생성
  - [ ] Display 컴포넌트 초기화
  - [ ] ModeToggle 컴포넌트 초기화
  - [ ] Keypad 컴포넌트 초기화
  - [ ] 이벤트 리스너 연결 (버튼 클릭 → Calculator 메서드 → Display 업데이트)
  - [ ] ThemeManager 초기화
  - [ ] KeyboardHandler 초기화
  - [ ] 초기 상태 설정 (result: "0", angleMode: "DEG")

## 인수 조건 (Acceptance Criteria)

### 필수 조건
- [ ] `npm run dev` 실행 시 브라우저에서 계산기 UI가 표시됨
- [ ] 모든 버튼이 정상적으로 렌더링됨 (4×7 그리드)
- [ ] 버튼 클릭 시 숫자/연산자가 디스플레이에 표시됨
- [ ] "=" 버튼 클릭 시 계산 결과가 표시됨
- [ ] "AC" 버튼 클릭 시 초기화됨
- [ ] DEG/RAD 모드 전환이 동작함
- [ ] 키보드 입력이 정상 작동함 (숫자, 연산자, Enter, Escape, Backspace)
- [ ] 다크모드 전환이 정상 작동함 (시스템 설정 자동 감지)
- [ ] 반응형 디자인이 적용됨 (모바일, 태블릿, 데스크톱)

### 수동 테스트 시나리오
1. **기본 계산 테스트**
   - "7" + "+" + "3" + "=" → 결과 "10" 표시
   - "AC" 클릭 → "0"으로 초기화

2. **공학 함수 테스트**
   - DEG 모드 확인
   - "sin" + "45" + "=" → 결과 "0.707..." 표시

3. **에러 처리 테스트**
   - "10" + "÷" + "0" + "=" → "Math Error" 표시
   - "AC" 클릭 → 에러 해제 및 "0"으로 초기화

4. **키보드 입력 테스트**
   - 키보드로 "2" + "+" + "3" 입력
   - Enter 키 → 결과 "5" 표시
   - Escape 키 → "0"으로 초기화

5. **다크모드 테스트**
   - 시스템 다크모드 활성화 → UI가 다크 테마로 전환
   - 모든 컬러가 다크 팔레트 사용

6. **반응형 테스트**
   - 모바일 (320px): 버튼 크기 적절, 터치 타겟 44px 이상
   - 태블릿 (768px): 중앙 정렬, 레이아웃 유지
   - 데스크톱 (1024px+): 최대 너비 제한 (max-w-md), 그림자 효과

### 디자인 검증
- [ ] 디자인 파일 (`docs/design/screen.png`)과 일치함
- [ ] 컬러 팔레트가 정확함 (Primary: #0d7ff2, Background-light: #f5f7f8, Background-dark: #101922)
- [ ] 폰트가 정확함 (Space Grotesk, Noto Sans)
- [ ] 버튼 스타일이 일치함 (border-radius, shadow, hover/active 효과)

## 참고 문서
- [TECH_SPEC.md](../TECH_SPEC.md) - 섹션 4: UI 컴포넌트 설계
- [docs/design/code.html](../docs/design/code.html) - 디자인 레퍼런스 코드
- [docs/design/screen.png](../docs/design/screen.png) - 최종 디자인 스크린샷

## 예상 소요 시간
**3-4일**

## 라벨
`phase-3` `ui` `components` `priority-high`
