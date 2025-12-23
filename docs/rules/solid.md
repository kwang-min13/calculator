---
description: SOLID Principles for Clean Architecture
---

# SOLID 원칙

## 개요
모든 코어 로직 구현 시 SOLID 원칙을 준수하여 유지보수성, 확장성, 테스트 용이성을 확보합니다.

---

## S - Single Responsibility Principle (단일 책임 원칙)

> 클래스는 단 하나의 책임만 가져야 하며, 변경의 이유도 단 하나여야 한다.

### ✅ Good Example
```javascript
// Calculator.js - 계산기 상태 관리만 담당
class Calculator {
  constructor() {
    this.expression = '';
    this.result = '0';
  }
  
  inputDigit(digit) {
    this.expression += digit;
  }
  
  calculate() {
    const parser = new Parser();
    const evaluator = new Evaluator();
    // 파싱과 평가는 각각의 클래스에 위임
    const tokens = parser.tokenize(this.expression);
    const rpn = parser.parse(tokens);
    this.result = evaluator.evaluate(rpn);
  }
}

// Parser.js - 수식 파싱만 담당
class Parser {
  tokenize(expression) { /* ... */ }
  parse(tokens) { /* ... */ }
}

// Evaluator.js - 수식 평가만 담당
class Evaluator {
  evaluate(rpnTokens) { /* ... */ }
}
```

### ❌ Bad Example
```javascript
// Calculator.js - 너무 많은 책임
class Calculator {
  constructor() {
    this.expression = '';
    this.result = '0';
  }
  
  inputDigit(digit) { /* ... */ }
  
  // 파싱 로직 (별도 클래스로 분리해야 함)
  tokenize(expression) { /* ... */ }
  parse(tokens) { /* ... */ }
  
  // 평가 로직 (별도 클래스로 분리해야 함)
  evaluate(rpnTokens) { /* ... */ }
  
  // UI 업데이트 (UI 레이어에서 처리해야 함)
  updateDisplay() { /* ... */ }
  
  // 스토리지 저장 (별도 클래스로 분리해야 함)
  saveToLocalStorage() { /* ... */ }
}
```

---

## O - Open/Closed Principle (개방/폐쇄 원칙)

> 확장에는 열려있고, 수정에는 닫혀있어야 한다.

### ✅ Good Example
```javascript
// MathFunction.js - 기본 인터페이스
class MathFunction {
  execute(value, angleMode) {
    throw new Error('Must implement execute method');
  }
}

// SinFunction.js
class SinFunction extends MathFunction {
  execute(value, angleMode) {
    const rad = angleMode === 'DEG' ? value * Math.PI / 180 : value;
    return Math.sin(rad);
  }
}

// CosFunction.js
class CosFunction extends MathFunction {
  execute(value, angleMode) {
    const rad = angleMode === 'DEG' ? value * Math.PI / 180 : value;
    return Math.cos(rad);
  }
}

// FunctionRegistry.js - 새 함수 추가 시 기존 코드 수정 불필요
class FunctionRegistry {
  constructor() {
    this.functions = new Map();
  }
  
  register(name, functionClass) {
    this.functions.set(name, functionClass);
  }
  
  execute(name, value, angleMode) {
    const func = this.functions.get(name);
    if (!func) throw new Error(`Unknown function: ${name}`);
    return func.execute(value, angleMode);
  }
}

// 사용
const registry = new FunctionRegistry();
registry.register('sin', new SinFunction());
registry.register('cos', new CosFunction());
// 새 함수 추가 시 기존 코드 수정 없이 확장 가능
registry.register('tan', new TanFunction());
```

### ❌ Bad Example
```javascript
// Evaluator.js - 새 함수 추가 시 기존 코드 수정 필요
class Evaluator {
  applyFunction(func, arg, angleMode) {
    // 새 함수 추가할 때마다 이 메서드를 수정해야 함
    switch (func) {
      case 'sin':
        const rad1 = angleMode === 'DEG' ? arg * Math.PI / 180 : arg;
        return Math.sin(rad1);
      case 'cos':
        const rad2 = angleMode === 'DEG' ? arg * Math.PI / 180 : arg;
        return Math.cos(rad2);
      // 새 함수 추가 시 여기를 수정해야 함
      case 'tan':
        const rad3 = angleMode === 'DEG' ? arg * Math.PI / 180 : arg;
        return Math.tan(rad3);
      default:
        throw new Error(`Unknown function: ${func}`);
    }
  }
}
```

---

## L - Liskov Substitution Principle (리스코프 치환 원칙)

> 하위 타입은 상위 타입을 대체할 수 있어야 한다.

### ✅ Good Example
```javascript
// Token.js - 기본 토큰 클래스
class Token {
  constructor(value) {
    this.value = value;
  }
  
  getValue() {
    return this.value;
  }
}

// NumberToken.js
class NumberToken extends Token {
  constructor(value) {
    super(value);
  }
  
  getValue() {
    return parseFloat(this.value); // 숫자로 변환
  }
}

// OperatorToken.js
class OperatorToken extends Token {
  constructor(value, precedence) {
    super(value);
    this.precedence = precedence;
  }
  
  getValue() {
    return this.value; // 문자열 그대로 반환
  }
  
  getPrecedence() {
    return this.precedence;
  }
}

// 사용 - Token 타입을 기대하는 곳에 하위 타입 사용 가능
function processToken(token) {
  console.log(token.getValue()); // 모든 Token 하위 타입에서 작동
}

processToken(new Token('test'));
processToken(new NumberToken('42'));
processToken(new OperatorToken('+', 1));
```

### ❌ Bad Example
```javascript
// 하위 클래스가 상위 클래스의 계약을 위반
class Token {
  getValue() {
    return this.value;
  }
}

class BrokenToken extends Token {
  getValue() {
    // 상위 클래스와 다른 동작 (배열 반환)
    return [this.value, this.type]; // ❌ 계약 위반
  }
}

// 사용 시 문제 발생
function processToken(token) {
  const value = token.getValue();
  console.log(value.toUpperCase()); // BrokenToken에서 에러 발생
}
```

---

## I - Interface Segregation Principle (인터페이스 분리 원칙)

> 클라이언트는 사용하지 않는 인터페이스에 의존하지 않아야 한다.

### ✅ Good Example
```javascript
// 작은 인터페이스로 분리
class Tokenizable {
  tokenize(expression) {
    throw new Error('Must implement tokenize');
  }
}

class Parsable {
  parse(tokens) {
    throw new Error('Must implement parse');
  }
}

// Parser는 두 인터페이스 모두 구현
class Parser extends Tokenizable {
  tokenize(expression) { /* ... */ }
}

class ShuntingYardParser extends Parsable {
  parse(tokens) { /* ... */ }
}

// 클라이언트는 필요한 인터페이스만 의존
class ExpressionValidator {
  constructor(tokenizer) {
    this.tokenizer = tokenizer; // Tokenizable만 필요
  }
  
  validate(expression) {
    const tokens = this.tokenizer.tokenize(expression);
    // 검증 로직
  }
}
```

### ❌ Bad Example
```javascript
// 거대한 인터페이스
class MathProcessor {
  tokenize(expression) { /* ... */ }
  parse(tokens) { /* ... */ }
  evaluate(rpn) { /* ... */ }
  format(result) { /* ... */ }
  validate(expression) { /* ... */ }
}

// 클라이언트가 필요 없는 메서드까지 의존
class ExpressionValidator {
  constructor(processor) {
    this.processor = processor; // MathProcessor 전체에 의존
  }
  
  validate(expression) {
    // tokenize만 필요하지만 전체 인터페이스에 의존
    const tokens = this.processor.tokenize(expression);
  }
}
```

---

## D - Dependency Inversion Principle (의존성 역전 원칙)

> 고수준 모듈은 저수준 모듈에 의존하지 않아야 하며, 둘 다 추상화에 의존해야 한다.

### ✅ Good Example
```javascript
// 추상화 (인터페이스)
class StorageInterface {
  save(key, value) {
    throw new Error('Must implement save');
  }
  
  load(key) {
    throw new Error('Must implement load');
  }
}

// 저수준 모듈 - LocalStorage 구현
class LocalStorageAdapter extends StorageInterface {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  load(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
}

// 저수준 모듈 - SessionStorage 구현
class SessionStorageAdapter extends StorageInterface {
  save(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  
  load(key) {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
}

// 고수준 모듈 - 추상화에 의존
class HistoryManager {
  constructor(storage) {
    this.storage = storage; // StorageInterface에 의존
  }
  
  saveHistory(history) {
    this.storage.save('calculator_history', history);
  }
  
  loadHistory() {
    return this.storage.load('calculator_history') || [];
  }
}

// 사용 - 구현체를 쉽게 교체 가능
const historyManager1 = new HistoryManager(new LocalStorageAdapter());
const historyManager2 = new HistoryManager(new SessionStorageAdapter());
```

### ❌ Bad Example
```javascript
// 고수준 모듈이 저수준 모듈에 직접 의존
class HistoryManager {
  constructor() {
    // LocalStorage에 직접 의존 (교체 불가능)
  }
  
  saveHistory(history) {
    localStorage.setItem('calculator_history', JSON.stringify(history));
  }
  
  loadHistory() {
    const data = localStorage.getItem('calculator_history');
    return data ? JSON.parse(data) : [];
  }
}

// SessionStorage로 변경하려면 HistoryManager 코드를 수정해야 함
```

---

## 적용 체크리스트

### 코드 작성 전
- [ ] 이 클래스/함수의 단일 책임이 명확한가?
- [ ] 새 기능 추가 시 기존 코드 수정이 필요한가?
- [ ] 의존성을 추상화로 표현할 수 있는가?

### 코드 리뷰 시
- [ ] 각 클래스가 하나의 책임만 가지는가? (SRP)
- [ ] 확장 시 기존 코드 수정이 필요한가? (OCP)
- [ ] 하위 타입이 상위 타입을 대체할 수 있는가? (LSP)
- [ ] 불필요한 메서드에 의존하고 있지 않은가? (ISP)
- [ ] 구체적인 구현이 아닌 추상화에 의존하는가? (DIP)

### 리팩토링 신호
- 🚨 클래스가 100줄 이상 → SRP 위반 가능성
- 🚨 switch/if-else가 많음 → OCP 위반 가능성
- 🚨 하위 클래스에서 예외 발생 → LSP 위반 가능성
- 🚨 사용하지 않는 메서드가 많음 → ISP 위반 가능성
- 🚨 구체 클래스를 직접 생성 → DIP 위반 가능성

---

## 실전 예시: Calculator 클래스 리팩토링

### Before (SOLID 위반)
```javascript
class Calculator {
  calculate(expression) {
    // 파싱 (SRP 위반)
    const tokens = expression.split(' ');
    
    // 평가 (SRP 위반)
    let result = 0;
    // ... 복잡한 로직
    
    // 저장 (DIP 위반 - localStorage 직접 사용)
    localStorage.setItem('last_result', result);
    
    return result;
  }
}
```

### After (SOLID 준수)
```javascript
class Calculator {
  constructor(parser, evaluator, storage) {
    this.parser = parser;       // DIP - 추상화에 의존
    this.evaluator = evaluator; // DIP - 추상화에 의존
    this.storage = storage;     // DIP - 추상화에 의존
  }
  
  calculate(expression) {
    const tokens = this.parser.tokenize(expression);  // SRP - 파싱 위임
    const rpn = this.parser.parse(tokens);            // SRP - 파싱 위임
    const result = this.evaluator.evaluate(rpn);      // SRP - 평가 위임
    this.storage.save('last_result', result);         // SRP - 저장 위임
    return result;
  }
}
```

---

## 참고 자료
- [SOLID Principles - Wikipedia](https://en.wikipedia.org/wiki/SOLID)
- [Clean Code by Robert C. Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [Refactoring Guru - SOLID](https://refactoring.guru/design-patterns/solid-principles)
