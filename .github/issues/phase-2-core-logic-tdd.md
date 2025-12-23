## 작업 배경

TDD(Test-Driven Development) 방식으로 계산기의 핵심 로직을 구현합니다. 이 단계에서는 수식 파싱, 계산 엔진, 수학 함수 등 모든 코어 로직을 테스트 먼저 작성하고 구현하는 방식으로 진행하여 90% 이상의 테스트 커버리지를 달성합니다.

**TDD 원칙**: Red (실패하는 테스트) → Green (최소 구현) → Refactor (코드 개선)

## 작업 내용

### 2.1 상수 및 타입 정의
- [ ] `src/utils/constants.js` 작성
  - [ ] 연산자 우선순위 정의 (`+`: 1, `-`: 1, `×`: 2, `÷`: 2, `^`: 3)
  - [ ] 토큰 타입 정의 (NUMBER, OPERATOR, FUNCTION, LPAREN, RPAREN)
  - [ ] 에러 메시지 정의 (SYNTAX_ERROR, MATH_ERROR, OVERFLOW_ERROR)
  - [ ] 버튼 레이아웃 정의 (4×7 그리드)

### 2.2 Token 클래스 (TDD)
**Red**: 테스트 작성 `tests/unit/token.test.js`
- [ ] Token 생성 테스트
- [ ] NumberToken 테스트 (getValue()가 숫자 반환)
- [ ] OperatorToken 테스트 (precedence 속성 포함)
- [ ] FunctionToken 테스트

**Green**: 구현 `src/core/Token.js`
- [ ] Token 기본 클래스
- [ ] NumberToken 클래스 (extends Token)
- [ ] OperatorToken 클래스 (precedence 추가)
- [ ] FunctionToken 클래스

**Refactor**: 리팩토링 및 테스트 통과 확인

### 2.3 Tokenizer (TDD)
**Red**: 테스트 작성 `tests/unit/tokenizer.test.js`
- [ ] 숫자 토큰화 테스트 ("123" → NumberToken)
- [ ] 연산자 토큰화 테스트 ("+" → OperatorToken)
- [ ] 함수 토큰화 테스트 ("sin" → FunctionToken)
- [ ] 괄호 토큰화 테스트
- [ ] 공백 처리 테스트
- [ ] 에러 케이스 테스트 (잘못된 문자 "@")

**Green**: 구현 `src/core/Tokenizer.js`
- [ ] tokenize() 메서드
- [ ] 정규식 패턴 정의
- [ ] 에러 처리

**Refactor**: 리팩토링 및 테스트 통과 확인

### 2.4 Parser - Shunting-yard (TDD)
**Red**: 테스트 작성 `tests/unit/parser.test.js`
- [ ] 단순 수식 파싱 테스트 ("2 + 3" → RPN: [2, 3, +])
- [ ] 연산자 우선순위 테스트 ("2 + 3 × 4" → [2, 3, 4, ×, +])
- [ ] 괄호 처리 테스트 ("(2 + 3) × 4" → [2, 3, +, 4, ×])
- [ ] 함수 파싱 테스트 ("sin(30)")
- [ ] 중첩 함수 테스트 ("sin(cos(45))")
- [ ] 에러 케이스 테스트 (괄호 불일치)

**Green**: 구현 `src/core/Parser.js`
- [ ] parse() 메서드
- [ ] Shunting-yard 알고리즘 구현
- [ ] 연산자 우선순위 처리
- [ ] 괄호 매칭 검증

**Refactor**: 리팩토링 및 테스트 통과 확인

### 2.5 Evaluator - RPN (TDD)
**Red**: 테스트 작성 `tests/unit/evaluator.test.js`
- [ ] 기본 연산 평가 테스트 ([2, 3, +] → 5)
- [ ] 함수 평가 테스트 ([30, sin] → 0.5 in DEG)
- [ ] 각도 모드 테스트 (DEG/RAD)
- [ ] 0으로 나누기 에러 테스트
- [ ] Infinity/NaN 처리 테스트

**Green**: 구현 `src/core/Evaluator.js`
- [ ] evaluate() 메서드 (스택 기반)
- [ ] applyOperator() 메서드
- [ ] applyFunction() 메서드
- [ ] 에러 처리

**Refactor**: 리팩토링 및 테스트 통과 확인

### 2.6 Math Functions (TDD)
**Red**: 테스트 작성 `tests/unit/mathFunctions.test.js`
- [ ] sin 함수 테스트 (DEG: sin(30) ≈ 0.5, RAD: sin(π/2) ≈ 1)
- [ ] cos 함수 테스트
- [ ] tan 함수 테스트
- [ ] ln 함수 테스트 (음수 입력 시 에러)
- [ ] log 함수 테스트
- [ ] sqrt 함수 테스트 (음수 입력 시 에러)
- [ ] pow 함수 테스트

**Green**: 구현 `src/utils/mathFunctions.js`
- [ ] 삼각함수 구현 (각도 변환 포함)
- [ ] 로그 함수 구현
- [ ] 기타 함수 구현
- [ ] 각도 변환 유틸리티 (degToRad, radToDeg)

**Refactor**: 리팩토링 및 테스트 통과 확인

### 2.7 Calculator Engine (TDD)
**Red**: 테스트 작성 `tests/unit/calculator.test.js`
- [ ] 숫자 입력 테스트
- [ ] 연산자 입력 테스트
- [ ] 함수 입력 테스트
- [ ] 계산 실행 테스트 (Parser + Evaluator 통합)
- [ ] 초기화 테스트 (AC)
- [ ] 백스페이스 테스트
- [ ] 각도 모드 전환 테스트
- [ ] 에러 상태 테스트

**Green**: 구현 `src/core/Calculator.js`
- [ ] 상태 관리 (expression, result, angleMode)
- [ ] inputDigit() 메서드
- [ ] inputOperator() 메서드
- [ ] inputFunction() 메서드
- [ ] calculate() 메서드 (Parser + Evaluator 사용)
- [ ] clear() 메서드
- [ ] backspace() 메서드
- [ ] toggleAngleMode() 메서드

**Refactor**: SOLID 원칙 검토 및 리팩토링

### 2.8 Error Handler (TDD)
**Red**: 테스트 작성 `tests/unit/errorHandler.test.js`
- [ ] 에러 타입별 처리 테스트
- [ ] 에러 메시지 포맷팅 테스트

**Green**: 구현 `src/utils/errorHandler.js`
- [ ] CalculatorError 클래스
- [ ] ErrorHandler 클래스
- [ ] 에러 타입 정의

**Refactor**: 리팩토링 및 테스트 통과 확인

### 2.9 Storage Manager (TDD)
**Red**: 테스트 작성 `tests/unit/storage.test.js`
- [ ] 저장 테스트
- [ ] 불러오기 테스트
- [ ] 기본값 반환 테스트
- [ ] 에러 처리 테스트

**Green**: 구현 `src/utils/storage.js`
- [ ] StorageInterface 추상 클래스 (DIP 원칙)
- [ ] LocalStorageAdapter 클래스
- [ ] save(), load(), clear() 메서드

**Refactor**: 리팩토링 및 테스트 통과 확인

## 인수 조건 (Acceptance Criteria)

### 필수 조건
- [ ] 모든 코어 로직 모듈에 대한 단위 테스트가 작성됨
- [ ] `npm run test` 실행 시 모든 테스트가 통과함 (✅ 100%)
- [ ] 테스트 커버리지가 90% 이상임 (`npm run test -- --coverage`)
- [ ] SOLID 원칙이 준수됨 (특히 SRP, DIP)
- [ ] ESLint 에러가 없음 (`npm run lint`)
- [ ] 복잡한 수식 계산이 정확함 (예: "2 + 3 × 4" = 14, "sin(45)" ≈ 0.707 in DEG)

### 검증 방법
1. **테스트 실행 및 커버리지 확인**
   ```bash
   npm run test
   npm run test -- --coverage
   # Coverage: Statements 90%+, Branches 90%+, Functions 90%+, Lines 90%+
   ```

2. **통합 테스트 (Calculator 클래스)**
   ```javascript
   const calc = new Calculator();
   calc.inputDigit('2');
   calc.inputOperator('+');
   calc.inputDigit('3');
   calc.inputOperator('×');
   calc.inputDigit('4');
   calc.calculate();
   console.log(calc.result); // "14"
   ```

3. **공학 함수 테스트**
   ```javascript
   calc.angleMode = 'DEG';
   calc.inputFunction('sin');
   calc.inputDigit('45');
   calc.calculate();
   console.log(calc.result); // "0.707..."
   ```

4. **에러 처리 테스트**
   ```javascript
   calc.inputDigit('10');
   calc.inputOperator('÷');
   calc.inputDigit('0');
   calc.calculate();
   console.log(calc.error); // "Math Error"
   ```

### 코드 품질 기준
- [ ] 각 클래스는 단일 책임을 가짐 (SRP)
- [ ] 의존성은 추상화에 의존함 (DIP)
- [ ] 모든 public 메서드에 JSDoc 주석 추가
- [ ] 테스트 코드도 린트 통과

## 참고 문서
- [TECH_SPEC.md](../TECH_SPEC.md) - 섹션 3: 핵심 모듈 상세 설계
- [docs/rules/tdd.md](../docs/rules/tdd.md) - TDD 가이드
- [docs/rules/solid.md](../docs/rules/solid.md) - SOLID 원칙

## 예상 소요 시간
**1주 (5-7일)**

## 라벨
`phase-2` `core-logic` `tdd` `priority-high`
