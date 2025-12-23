---
description: Test-Driven Development (TDD) for Core Logic
---

# TDD (Test-Driven Development) 규칙

## 적용 범위
**UI를 제외한 모든 코어 로직은 TDD로 구현합니다.**

### TDD 적용 대상
- ✅ `src/core/` - Calculator, Parser, Evaluator
- ✅ `src/utils/` - mathFunctions, errorHandler, storage
- ❌ `src/components/` - UI 컴포넌트 (TDD 제외, 수동 테스트)

### 테스트 방식
- **코어 로직**: 자동화된 단위 테스트 (Vitest)
- **UI 컴포넌트**: 수동 테스트 (브라우저에서 직접 확인)
- **통합**: 코어 로직 통합 테스트는 자동화, UI 통합은 수동

## TDD 사이클 (Red-Green-Refactor)

### 1. 🔴 Red - 실패하는 테스트 작성
```javascript
// tests/unit/calculator.test.js
describe('Calculator', () => {
  it('should add two numbers', () => {
    const calc = new Calculator();
    calc.inputDigit('2');
    calc.inputOperator('+');
    calc.inputDigit('3');
    calc.calculate();
    expect(calc.result).toBe('5');
  });
});
```

**실행**: `npm run test` → ❌ 테스트 실패 확인

### 2. 🟢 Green - 최소한의 코드로 테스트 통과
```javascript
// src/core/Calculator.js
class Calculator {
  constructor() {
    this.result = '0';
    this.expression = '';
  }
  
  inputDigit(digit) {
    this.expression += digit;
  }
  
  inputOperator(op) {
    this.expression += op;
  }
  
  calculate() {
    // 최소 구현
    this.result = eval(this.expression.replace('+', '+')).toString();
  }
}
```

**실행**: `npm run test` → ✅ 테스트 통과

### 3. 🔵 Refactor - 코드 개선
```javascript
// src/core/Calculator.js
class Calculator {
  constructor() {
    this.result = '0';
    this.expression = '';
  }
  
  inputDigit(digit) {
    this.expression += digit;
  }
  
  inputOperator(op) {
    this.expression += ` ${op} `;
  }
  
  calculate() {
    const parser = new Parser();
    const evaluator = new Evaluator();
    const tokens = parser.tokenize(this.expression);
    const rpn = parser.parse(tokens);
    this.result = evaluator.evaluate(rpn).toString();
  }
}
```

**실행**: `npm run test` → ✅ 테스트 여전히 통과

## 개발 워크플로우

### 새 기능 추가 시
1. **테스트 먼저 작성** (Red)
2. **최소 구현** (Green)
3. **리팩토링** (Refactor)
4. **커밋**: `test: add calculator addition test` → `feat: implement calculator addition`

### 예시: sin 함수 구현

#### Step 1: 테스트 작성
```javascript
// tests/unit/mathFunctions.test.js
describe('MathFunctions', () => {
  describe('sin', () => {
    it('should calculate sin(0) in DEG mode', () => {
      expect(MathFunctions.sin(0, 'DEG')).toBe(0);
    });
    
    it('should calculate sin(30) in DEG mode', () => {
      expect(MathFunctions.sin(30, 'DEG')).toBeCloseTo(0.5, 5);
    });
    
    it('should calculate sin(π/2) in RAD mode', () => {
      expect(MathFunctions.sin(Math.PI / 2, 'RAD')).toBeCloseTo(1, 5);
    });
  });
});
```

#### Step 2: 구현
```javascript
// src/utils/mathFunctions.js
export const MathFunctions = {
  sin: (x, angleMode) => {
    const rad = angleMode === 'DEG' ? x * Math.PI / 180 : x;
    return Math.sin(rad);
  }
};
```

#### Step 3: 테스트 실행
```bash
npm run test -- mathFunctions.test.js
```

## 테스트 작성 가이드

### 테스트 구조
```javascript
describe('ClassName or ModuleName', () => {
  describe('methodName', () => {
    it('should do something specific', () => {
      // Arrange (준비)
      const input = 'test';
      
      // Act (실행)
      const result = functionUnderTest(input);
      
      // Assert (검증)
      expect(result).toBe('expected');
    });
  });
});
```

### 테스트 커버리지 목표
- **코어 로직** (`src/core/`, `src/utils/`): **90% 이상**
- **UI 컴포넌트** (`src/components/`): 자동화 테스트 없음 (수동 검증)

### 테스트 케이스 작성 원칙
1. **정상 케이스**: 예상된 입력과 출력
2. **경계 케이스**: 0, 음수, 매우 큰 수
3. **에러 케이스**: 잘못된 입력, 예외 상황
4. **엣지 케이스**: Infinity, NaN, undefined

### 예시: Parser 테스트
```javascript
describe('Parser', () => {
  describe('tokenize', () => {
    it('should tokenize simple expression', () => {
      const tokens = parser.tokenize('2 + 3');
      expect(tokens).toEqual([
        { type: 'NUMBER', value: '2' },
        { type: 'OPERATOR', value: '+' },
        { type: 'NUMBER', value: '3' }
      ]);
    });
    
    it('should handle parentheses', () => {
      const tokens = parser.tokenize('(2 + 3)');
      expect(tokens[0].type).toBe('LPAREN');
      expect(tokens[4].type).toBe('RPAREN');
    });
    
    it('should throw error for invalid characters', () => {
      expect(() => parser.tokenize('2 @ 3')).toThrow('Invalid character');
    });
  });
});
```

## 테스트 실행 명령어

```bash
# 모든 단위 테스트 실행 (코어 로직만)
npm run test

# Watch 모드 (파일 변경 시 자동 실행)
npm run test -- --watch

# 특정 파일만 테스트
npm run test -- calculator.test.js

# 커버리지 확인
npm run test -- --coverage
```

## UI 수동 테스트 가이드

### 브라우저에서 테스트
```bash
# 개발 서버 시작
npm run dev

# 브라우저에서 http://localhost:5173 접속
# 각 기능을 수동으로 테스트
```

### 테스트 체크리스트
- [ ] 숫자 입력 및 표시
- [ ] 사칙연산 동작
- [ ] 공학 함수 (sin, cos, tan, ln, log, sqrt)
- [ ] DEG/RAD 모드 전환
- [ ] 에러 처리 및 메시지 표시
- [ ] 키보드 입력 (숫자, 연산자, Enter, Escape, Backspace)
- [ ] 다크모드 전환
- [ ] 반응형 레이아웃 (모바일, 태블릿, 데스크톱)

## 커밋 전 체크리스트
- [ ] 새 기능에 대한 테스트 작성 완료
- [ ] 모든 테스트 통과 (`npm run test`)
- [ ] 코드 커버리지 목표 달성
- [ ] 테스트 코드도 린트 통과 (`npm run lint`)

## 금지 사항
❌ 테스트 없이 코어 로직 구현  
❌ 테스트를 나중에 작성하겠다는 생각  
❌ `eval()` 사용 (보안 및 테스트 어려움)  
❌ 테스트를 통과시키기 위한 하드코딩  

## 권장 사항
✅ 작은 단위로 테스트 작성  
✅ 테스트 이름은 명확하고 구체적으로  
✅ 각 테스트는 독립적으로 실행 가능해야 함  
✅ Mock/Stub은 필요한 경우에만 사용  
✅ 테스트 코드도 리팩토링 대상
