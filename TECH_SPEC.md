# 공학용 계산기 웹앱 기술 명세서 (Technical Specification)

## 문서 정보
- **프로젝트명**: Engineering Calculator Web App
- **버전**: 1.0
- **작성일**: 2025-12-23
- **관련 문서**: [PRD.md](./PRD.md)

---

## 1. 기술 스택 개요

### 1.1 프론트엔드 아키텍처
```
┌─────────────────────────────────────────┐
│         User Interface Layer            │
│  (HTML + Tailwind CSS + JavaScript)     │
├─────────────────────────────────────────┤
│       Application Logic Layer           │
│  - Calculator Engine                    │
│  - Expression Parser                    │
│  - State Management                     │
├─────────────────────────────────────────┤
│         Utility Layer                   │
│  - Math Functions                       │
│  - Error Handling                       │
│  - Storage Manager                      │
└─────────────────────────────────────────┘
```

### 1.2 선택된 기술 스택

| 카테고리 | 기술 | 버전 | 사유 |
|---------|------|------|------|
| **빌드 도구** | Vite | 5.x | 빠른 개발 서버, 최적화된 빌드 |
| **프레임워크** | Vanilla JS | ES2022+ | 경량화, 빠른 성능, 학습 곡선 낮음 |
| **CSS 프레임워크** | Tailwind CSS | 3.x | 디자인 시스템과 완벽 호환 |
| **폰트** | Google Fonts | - | Space Grotesk, Noto Sans |
| **아이콘** | Material Symbols | - | 일관된 디자인 언어 |
| **수식 파싱** | Custom Parser | - | 경량화, 커스터마이징 용이 |
| **테스트** | Vitest | Latest | Vite 네이티브 지원, 코어 로직만 |
| **린터/포매터** | ESLint + Prettier | Latest | 코드 품질 유지 |
| **배포** | Vercel | - | 무료, 자동 배포, 빠른 CDN |

---

## 2. 프로젝트 구조

### 2.1 디렉토리 구조
```
calculator/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── styles/
│   │       └── main.css          # Tailwind 진입점
│   ├── components/
│   │   ├── Display.js            # 디스플레이 컴포넌트
│   │   ├── Keypad.js             # 키패드 컴포넌트
│   │   ├── Button.js             # 버튼 컴포넌트
│   │   └── ModeToggle.js         # DEG/RAD 토글
│   ├── core/
│   │   ├── Calculator.js         # 계산기 엔진
│   │   ├── Parser.js             # 수식 파서
│   │   └── Evaluator.js          # 수식 평가기
│   ├── utils/
│   │   ├── mathFunctions.js      # 수학 함수 라이브러리
│   │   ├── errorHandler.js       # 에러 처리
│   │   ├── storage.js            # 로컬 스토리지 관리
│   │   └── constants.js          # 상수 정의
│   ├── main.js                   # 앱 진입점
│   └── index.html                # HTML 템플릿
├── tests/
│   ├── unit/
│   │   ├── calculator.test.js
│   │   ├── parser.test.js
│   │   └── mathFunctions.test.js
│   └── e2e/
│       └── calculator.spec.js
├── .eslintrc.json
├── .prettierrc
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md
```

### 2.2 파일별 책임

#### **src/main.js**
- 앱 초기화
- 이벤트 리스너 등록
- 컴포넌트 마운트

#### **src/core/Calculator.js**
- 계산기 상태 관리
- 입력 처리
- 계산 실행 조율

#### **src/core/Parser.js**
- 중위 표기법 → 후위 표기법 변환 (Shunting-yard)
- 토큰화
- 문법 검증

#### **src/core/Evaluator.js**
- 후위 표기법 평가
- 스택 기반 계산
- 결과 반환

#### **src/utils/mathFunctions.js**
- 삼각함수 (sin, cos, tan)
- 로그 함수 (ln, log)
- 기타 수학 함수 (sqrt, pow)
- 각도 변환 (deg ↔ rad)

---

## 3. 핵심 모듈 상세 설계

### 3.1 Calculator Engine (Calculator.js)

#### 3.1.1 클래스 구조
```javascript
class Calculator {
  constructor() {
    this.currentExpression = '';
    this.result = '0';
    this.history = [];
    this.angleMode = 'DEG'; // 'DEG' or 'RAD'
    this.error = null;
  }

  // 공개 메서드
  inputDigit(digit) { }
  inputOperator(operator) { }
  inputFunction(func) { }
  calculate() { }
  clear() { }
  backspace() { }
  toggleAngleMode() { }
  
  // 비공개 메서드
  #updateDisplay() { }
  #addToHistory(expression, result) { }
  #handleError(error) { }
}
```

#### 3.1.2 상태 관리
```javascript
// 상태 객체 구조
{
  currentExpression: '45 + sin(30)',
  result: '45.5',
  history: [
    { expression: '2 + 2', result: '4', timestamp: 1703318400000 },
    { expression: 'sin(45)', result: '0.707', timestamp: 1703318410000 }
  ],
  angleMode: 'DEG',
  error: null
}
```

### 3.2 Expression Parser (Parser.js)

#### 3.2.1 토큰화
```javascript
class Token {
  constructor(type, value) {
    this.type = type; // 'NUMBER', 'OPERATOR', 'FUNCTION', 'LPAREN', 'RPAREN'
    this.value = value;
  }
}

class Tokenizer {
  tokenize(expression) {
    // '2 + sin(45)' → [
    //   Token('NUMBER', '2'),
    //   Token('OPERATOR', '+'),
    //   Token('FUNCTION', 'sin'),
    //   Token('LPAREN', '('),
    //   Token('NUMBER', '45'),
    //   Token('RPAREN', ')')
    // ]
  }
}
```

#### 3.2.2 Shunting-yard 알고리즘
```javascript
class Parser {
  constructor() {
    this.precedence = {
      '+': 1,
      '-': 1,
      '×': 2,
      '÷': 2,
      '^': 3
    };
    this.rightAssociative = new Set(['^']);
  }

  parse(tokens) {
    const outputQueue = [];
    const operatorStack = [];
    
    // Shunting-yard 알고리즘 구현
    // 중위 표기법 → 후위 표기법 (RPN) 변환
    
    return outputQueue; // RPN 토큰 배열
  }
}
```

### 3.3 Expression Evaluator (Evaluator.js)

#### 3.3.1 RPN 평가
```javascript
class Evaluator {
  constructor(angleMode = 'DEG') {
    this.angleMode = angleMode;
  }

  evaluate(rpnTokens) {
    const stack = [];
    
    for (const token of rpnTokens) {
      if (token.type === 'NUMBER') {
        stack.push(parseFloat(token.value));
      } else if (token.type === 'OPERATOR') {
        const b = stack.pop();
        const a = stack.pop();
        stack.push(this.#applyOperator(token.value, a, b));
      } else if (token.type === 'FUNCTION') {
        const arg = stack.pop();
        stack.push(this.#applyFunction(token.value, arg));
      }
    }
    
    return stack[0];
  }

  #applyOperator(op, a, b) {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': 
        if (b === 0) throw new Error('Division by zero');
        return a / b;
      case '^': return Math.pow(a, b);
      default: throw new Error(`Unknown operator: ${op}`);
    }
  }

  #applyFunction(func, arg) {
    const angle = this.angleMode === 'DEG' ? this.#degToRad(arg) : arg;
    
    switch (func) {
      case 'sin': return Math.sin(angle);
      case 'cos': return Math.cos(angle);
      case 'tan': return Math.tan(angle);
      case 'ln': return Math.log(arg);
      case 'log': return Math.log10(arg);
      case '√': return Math.sqrt(arg);
      default: throw new Error(`Unknown function: ${func}`);
    }
  }

  #degToRad(deg) {
    return deg * Math.PI / 180;
  }
}
```

### 3.4 Math Functions (mathFunctions.js)

```javascript
export const MathFunctions = {
  // 삼각함수
  sin: (x, angleMode) => {
    const rad = angleMode === 'DEG' ? x * Math.PI / 180 : x;
    return Math.sin(rad);
  },
  
  cos: (x, angleMode) => {
    const rad = angleMode === 'DEG' ? x * Math.PI / 180 : x;
    return Math.cos(rad);
  },
  
  tan: (x, angleMode) => {
    const rad = angleMode === 'DEG' ? x * Math.PI / 180 : x;
    return Math.tan(rad);
  },
  
  // 로그 함수
  ln: (x) => {
    if (x <= 0) throw new Error('Invalid input for ln');
    return Math.log(x);
  },
  
  log: (x) => {
    if (x <= 0) throw new Error('Invalid input for log');
    return Math.log10(x);
  },
  
  // 기타
  sqrt: (x) => {
    if (x < 0) throw new Error('Invalid input for sqrt');
    return Math.sqrt(x);
  },
  
  pow: (base, exp) => Math.pow(base, exp),
  
  // 상수
  PI: Math.PI,
  E: Math.E
};
```

---

## 4. UI 컴포넌트 설계

### 4.1 Display Component

```javascript
class Display {
  constructor(container) {
    this.container = container;
    this.historyElement = null;
    this.resultElement = null;
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="flex flex-col flex-1 justify-end px-6 pb-6 pt-2 relative">
        <!-- Mode Toggle -->
        <div class="absolute top-4 left-6">
          <div id="mode-toggle"></div>
        </div>
        
        <!-- Calculation History -->
        <div class="text-right mb-1 opacity-60">
          <span id="history" class="text-xl md:text-2xl font-medium tracking-wide text-slate-600 dark:text-slate-400"></span>
        </div>
        
        <!-- Main Result -->
        <div class="text-right">
          <h1 id="result" class="text-6xl md:text-7xl font-bold tracking-tight leading-none break-all text-[#111418] dark:text-white">0</h1>
        </div>
      </div>
    `;
    
    this.historyElement = document.getElementById('history');
    this.resultElement = document.getElementById('result');
  }

  updateHistory(expression) {
    this.historyElement.textContent = expression || '';
  }

  updateResult(result) {
    this.resultElement.textContent = this.#formatResult(result);
  }

  showError(message) {
    this.resultElement.textContent = message;
    this.resultElement.classList.add('text-rose-600');
  }

  clearError() {
    this.resultElement.classList.remove('text-rose-600');
  }

  #formatResult(result) {
    // 소수점 이하 10자리까지 표시
    const num = parseFloat(result);
    if (isNaN(num)) return 'Error';
    if (!isFinite(num)) return 'Overflow';
    
    // 과학적 표기법 처리
    if (Math.abs(num) > 1e10 || (Math.abs(num) < 1e-10 && num !== 0)) {
      return num.toExponential(6);
    }
    
    // 일반 표기법
    return parseFloat(num.toFixed(10)).toString();
  }
}
```

### 4.2 Keypad Component

```javascript
class Keypad {
  constructor(container, onButtonClick) {
    this.container = container;
    this.onButtonClick = onButtonClick;
    this.init();
  }

  init() {
    const buttons = [
      // Row 1
      { label: 'AC', type: 'clear', style: 'danger' },
      { label: '( )', type: 'parenthesis', style: 'secondary' },
      { label: '%', type: 'operator', style: 'secondary' },
      { label: '÷', type: 'operator', style: 'operator' },
      
      // Row 2
      { label: 'sin', type: 'function', style: 'function' },
      { label: 'cos', type: 'function', style: 'function' },
      { label: 'tan', type: 'function', style: 'function' },
      { label: '×', type: 'operator', style: 'operator' },
      
      // Row 3
      { label: 'ln', type: 'function', style: 'function' },
      { label: 'log', type: 'function', style: 'function' },
      { label: '√', type: 'function', style: 'function' },
      { label: '-', type: 'operator', style: 'operator' },
      
      // Row 4-7
      { label: '7', type: 'digit', style: 'number' },
      { label: '8', type: 'digit', style: 'number' },
      { label: '9', type: 'digit', style: 'number' },
      { label: '+', type: 'operator', style: 'operator' },
      
      { label: '4', type: 'digit', style: 'number' },
      { label: '5', type: 'digit', style: 'number' },
      { label: '6', type: 'digit', style: 'number' },
      { label: '^', type: 'operator', style: 'function' },
      
      { label: '1', type: 'digit', style: 'number' },
      { label: '2', type: 'digit', style: 'number' },
      { label: '3', type: 'digit', style: 'number' },
      { label: 'π', type: 'constant', style: 'function' },
      
      { label: '.', type: 'digit', style: 'number' },
      { label: '0', type: 'digit', style: 'number' },
      { label: '⌫', type: 'backspace', style: 'number', icon: 'backspace' },
      { label: '=', type: 'equals', style: 'equals' }
    ];

    this.container.innerHTML = `
      <div class="w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-t-3xl p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-white/20 dark:border-slate-800/50">
        <div class="grid grid-cols-4 gap-3 h-full">
          ${buttons.map(btn => this.#createButton(btn)).join('')}
        </div>
      </div>
    `;

    this.#attachEventListeners();
  }

  #createButton(config) {
    const styleClasses = this.#getButtonStyle(config.style);
    const content = config.icon 
      ? `<span class="material-symbols-outlined">${config.icon}</span>`
      : config.label;
    
    return `
      <button 
        class="${styleClasses}" 
        data-type="${config.type}" 
        data-value="${config.label}"
      >
        ${content}
      </button>
    `;
  }

  #getButtonStyle(style) {
    const baseClasses = 'h-14 md:h-16 rounded-2xl flex items-center justify-center font-bold hover:brightness-95 active:scale-95 transition-all';
    
    const styles = {
      number: 'bg-white dark:bg-slate-700 text-[#111418] dark:text-white text-2xl font-semibold shadow-sm hover:bg-gray-50 dark:hover:bg-slate-600',
      operator: 'bg-primary/10 dark:bg-primary/20 text-primary text-2xl hover:bg-primary/20 dark:hover:bg-primary/30',
      function: 'bg-[#f0f4f8] dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 text-base font-medium hover:bg-white dark:hover:bg-slate-700',
      secondary: 'bg-[#e8eef3] dark:bg-slate-800 text-[#111418] dark:text-slate-200 text-lg font-medium',
      danger: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-lg',
      equals: 'bg-primary text-white text-2xl shadow-lg shadow-primary/30 hover:bg-blue-600'
    };
    
    return `${baseClasses} ${styles[style]}`;
  }

  #attachEventListeners() {
    this.container.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', (e) => {
        const type = e.currentTarget.dataset.type;
        const value = e.currentTarget.dataset.value;
        this.onButtonClick(type, value);
      });
    });
  }
}
```

---

## 5. 데이터 흐름

### 5.1 입력 처리 플로우
```
사용자 입력 (버튼 클릭/키보드)
    ↓
Keypad Component
    ↓
Calculator.inputDigit/inputOperator/inputFunction
    ↓
currentExpression 업데이트
    ↓
Display.updateHistory
```

### 5.2 계산 실행 플로우
```
사용자 '=' 버튼 클릭
    ↓
Calculator.calculate()
    ↓
Parser.tokenize(currentExpression)
    ↓
Parser.parse(tokens) → RPN
    ↓
Evaluator.evaluate(rpnTokens)
    ↓
결과 반환 또는 에러 발생
    ↓
Display.updateResult / Display.showError
    ↓
History에 추가 (선택사항)
```

---

## 6. 에러 처리 전략

### 6.1 에러 타입 정의
```javascript
class CalculatorError extends Error {
  constructor(type, message) {
    super(message);
    this.type = type;
    this.name = 'CalculatorError';
  }
}

// 에러 타입
const ErrorTypes = {
  SYNTAX_ERROR: 'SYNTAX_ERROR',
  MATH_ERROR: 'MATH_ERROR',
  OVERFLOW_ERROR: 'OVERFLOW_ERROR'
};
```

### 6.2 에러 처리 흐름
```javascript
class ErrorHandler {
  static handle(error) {
    if (error instanceof CalculatorError) {
      switch (error.type) {
        case ErrorTypes.SYNTAX_ERROR:
          return 'Syntax Error';
        case ErrorTypes.MATH_ERROR:
          return 'Math Error';
        case ErrorTypes.OVERFLOW_ERROR:
          return 'Overflow';
        default:
          return 'Error';
      }
    }
    
    // 예상치 못한 에러
    console.error('Unexpected error:', error);
    return 'Error';
  }
}
```

---

## 7. 로컬 스토리지 관리

### 7.1 Storage Schema
```javascript
// localStorage 키: 'calculator_state'
{
  angleMode: 'DEG',
  history: [
    {
      expression: '2 + 2',
      result: '4',
      timestamp: 1703318400000
    }
  ],
  settings: {
    theme: 'auto', // 'light', 'dark', 'auto'
    maxHistoryItems: 50
  }
}
```

### 7.2 Storage Manager
```javascript
class StorageManager {
  static KEY = 'calculator_state';

  static save(state) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save state:', e);
    }
  }

  static load() {
    try {
      const data = localStorage.getItem(this.KEY);
      return data ? JSON.parse(data) : this.#getDefaultState();
    } catch (e) {
      console.warn('Failed to load state:', e);
      return this.#getDefaultState();
    }
  }

  static clear() {
    localStorage.removeItem(this.KEY);
  }

  static #getDefaultState() {
    return {
      angleMode: 'DEG',
      history: [],
      settings: {
        theme: 'auto',
        maxHistoryItems: 50
      }
    };
  }
}
```

---

## 8. 테스트 전략

### 8.1 단위 테스트 (Vitest)

#### 8.1.1 Calculator 테스트
```javascript
import { describe, it, expect, beforeEach } from 'vitest';
import { Calculator } from '../src/core/Calculator';

describe('Calculator', () => {
  let calc;

  beforeEach(() => {
    calc = new Calculator();
  });

  it('should perform basic addition', () => {
    calc.inputDigit('2');
    calc.inputOperator('+');
    calc.inputDigit('3');
    calc.calculate();
    expect(calc.result).toBe('5');
  });

  it('should handle operator precedence', () => {
    calc.inputDigit('2');
    calc.inputOperator('+');
    calc.inputDigit('3');
    calc.inputOperator('×');
    calc.inputDigit('4');
    calc.calculate();
    expect(calc.result).toBe('14'); // 2 + (3 × 4)
  });

  it('should calculate sin in DEG mode', () => {
    calc.angleMode = 'DEG';
    calc.inputFunction('sin');
    calc.inputDigit('30');
    calc.calculate();
    expect(parseFloat(calc.result)).toBeCloseTo(0.5, 2);
  });
});
```

#### 8.1.2 Parser 테스트
```javascript
describe('Parser', () => {
  it('should tokenize expression correctly', () => {
    const tokens = tokenizer.tokenize('2 + 3');
    expect(tokens).toEqual([
      { type: 'NUMBER', value: '2' },
      { type: 'OPERATOR', value: '+' },
      { type: 'NUMBER', value: '3' }
    ]);
  });

  it('should convert to RPN', () => {
    const tokens = tokenizer.tokenize('2 + 3 × 4');
    const rpn = parser.parse(tokens);
    // Expected: [2, 3, 4, ×, +]
    expect(rpn.map(t => t.value)).toEqual(['2', '3', '4', '×', '+']);
  });
});
```

### 8.2 UI 수동 테스트 (자동화 없음)

#### 8.2.1 기본 기능 테스트 시나리오
```
테스트 시나리오 1: 기본 계산
1. 개발 서버 실행 (npm run dev)
2. 브라우저에서 http://localhost:5173 접속
3. "숫자 7" 버튼 클릭
4. "+" 버튼 클릭
5. "숫자 3" 버튼 클릭
6. "=" 버튼 클릭
7. 결과 "10" 표시 확인

테스트 시나리오 2: 공학 함수
1. DEG 모드 확인
2. "sin" 버튼 클릭
3. "4", "5" 버튼 순차 클릭
4. "=" 버튼 클릭
5. 결과 "0.707..." 표시 확인

테스트 시나리오 3: 에러 처리
1. "1", "0" 버튼 클릭
2. "÷" 버튼 클릭
3. "0" 버튼 클릭
4. "=" 버튼 클릭
5. "Math Error" 메시지 표시 확인
6. "AC" 버튼으로 초기화 확인

테스트 시나리오 4: 키보드 입력
1. 키보드로 "2" 입력
2. 키보드로 "+" 입력
3. 키보드로 "3" 입력
4. Enter 키 입력
5. 결과 "5" 표시 확인
6. Escape 키로 초기화 확인
```

#### 8.2.2 크로스 브라우저 테스트
- **Chrome**: 기본 기능 동작 확인
- **Firefox**: 기본 기능 동작 확인
- **Safari**: 기본 기능 동작 확인 (가능한 경우)
- **Edge**: 기본 기능 동작 확인
- **모바일**: 터치 인터랙션 확인

#### 8.2.3 반응형 디자인 테스트
- **모바일 (320px)**: 버튼 크기, 터치 타겟 확인
- **태블릿 (768px)**: 레이아웃 확인
- **데스크톱 (1024px+)**: 최대 너비, 그림자 효과 확인

---

## 9. 빌드 및 배포 설정

### 9.1 Vite 설정 (vite.config.js)
```javascript
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html')
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
});
```

### 9.2 Tailwind 설정 (tailwind.config.js)
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#0d7ff2',
        'background-light': '#f5f7f8',
        'background-dark': '#101922',
      },
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'body': ['Noto Sans', 'sans-serif'],
      },
      borderRadius: {
        'DEFAULT': '0.25rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px'
      },
    },
  },
  plugins: [],
}
```

### 9.3 Package.json
```json
{
  "name": "engineering-calculator",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "lint": "eslint src --ext .js",
    "format": "prettier --write \"src/**/*.{js,css,html}\""
  },
  "devDependencies": {
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "postcss": "^8.4.32",
    "prettier": "^3.1.1",
    "tailwindcss": "^3.4.0",
    "vite": "^5.0.8",
    "vitest": "^1.0.4"
  }
}
```

### 9.4 GitHub Pages 설정

#### Vite 설정에 base 경로 추가
```javascript
// vite.config.js에 추가
export default defineConfig({
  base: '/calculator/', // GitHub Pages repository name
  // ... 기존 설정
});
```

---

## 10. 성능 최적화

### 10.1 번들 크기 최적화
- **Tree Shaking**: 미사용 코드 제거
- **Code Splitting**: 필요시 동적 임포트
- **Minification**: Terser로 압축
- **Tailwind Purge**: 미사용 CSS 클래스 제거

### 10.2 런타임 최적화
- **Debouncing**: 연속 입력 시 계산 지연
- **Memoization**: 반복 계산 결과 캐싱
- **Virtual DOM 없음**: Vanilla JS로 직접 DOM 조작

### 10.3 로딩 최적화
- **Font Display**: `font-display: swap` 사용
- **Preconnect**: Google Fonts에 preconnect
- **Lazy Loading**: 히스토리 모달 등 지연 로딩

---

## 11. 접근성 구현

### 11.1 ARIA 속성
```html
<!-- Display -->
<div role="region" aria-label="Calculator display">
  <div id="result" aria-live="polite" aria-atomic="true">0</div>
</div>

<!-- Buttons -->
<button 
  aria-label="Number 7"
  role="button"
  tabindex="0"
>7</button>

<button 
  aria-label="Clear all"
  role="button"
  tabindex="0"
>AC</button>
```

### 11.2 키보드 네비게이션
```javascript
class KeyboardHandler {
  static init(calculator) {
    document.addEventListener('keydown', (e) => {
      // 숫자 입력
      if (/^[0-9.]$/.test(e.key)) {
        calculator.inputDigit(e.key);
      }
      
      // 연산자
      const operatorMap = {
        '+': '+',
        '-': '-',
        '*': '×',
        '/': '÷',
        '^': '^'
      };
      if (operatorMap[e.key]) {
        e.preventDefault();
        calculator.inputOperator(operatorMap[e.key]);
      }
      
      // 특수 키
      if (e.key === 'Enter') {
        e.preventDefault();
        calculator.calculate();
      }
      if (e.key === 'Escape') {
        calculator.clear();
      }
      if (e.key === 'Backspace') {
        e.preventDefault();
        calculator.backspace();
      }
    });
  }
}
```

---

## 12. 다크모드 구현

### 12.1 테마 감지 및 적용
```javascript
class ThemeManager {
  static init() {
    // 시스템 설정 감지
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 초기 테마 적용
    this.applyTheme(prefersDark.matches ? 'dark' : 'light');
    
    // 시스템 설정 변경 감지
    prefersDark.addEventListener('change', (e) => {
      this.applyTheme(e.matches ? 'dark' : 'light');
    });
  }

  static applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // 로컬 스토리지에 저장
    StorageManager.save({ ...StorageManager.load(), theme });
  }

  static toggle() {
    const isDark = document.documentElement.classList.contains('dark');
    this.applyTheme(isDark ? 'light' : 'dark');
  }
}
```

---

## 13. 보안 고려사항

### 13.1 입력 검증
```javascript
class InputValidator {
  static validateExpression(expression) {
    // 허용된 문자만 포함되었는지 확인
    const allowedChars = /^[0-9+\-×÷^().sincotanlgπ\s]+$/;
    if (!allowedChars.test(expression)) {
      throw new CalculatorError(ErrorTypes.SYNTAX_ERROR, 'Invalid characters');
    }
    
    // 길이 제한
    if (expression.length > 1000) {
      throw new CalculatorError(ErrorTypes.SYNTAX_ERROR, 'Expression too long');
    }
    
    return true;
  }
}
```

### 13.2 XSS 방지
```javascript
// textContent 사용 (innerHTML 금지)
display.resultElement.textContent = result; // ✅ Safe
// display.resultElement.innerHTML = result; // ❌ Dangerous

// 사용자 입력을 직접 eval() 하지 않음
// eval(userInput); // ❌ Never do this
```

---

## 14. 개발 워크플로우

### 14.1 Git 브랜치 전략
```
main (프로덕션)
  ↑
develop (개발)
  ↑
feature/calculator-engine
feature/ui-components
feature/testing
```

### 14.2 커밋 컨벤션
```
feat: Add calculator engine
fix: Fix division by zero error
docs: Update tech spec
style: Format code with Prettier
test: Add parser unit tests
refactor: Optimize evaluator performance
```

### 14.3 CI/CD 파이프라인
```yaml
# .github/workflows/deploy.yml
name: Build and Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint code
        run: npm run lint
      
      - name: Run tests
        run: npm run test
      
      - name: Build project
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
  
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 15. 모니터링 및 분석

### 15.1 에러 로깅
```javascript
class ErrorLogger {
  static log(error, context) {
    const errorData = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: Date.now(),
      userAgent: navigator.userAgent
    };
    
    // 개발 환경: 콘솔 출력
    if (import.meta.env.DEV) {
      console.error('Error logged:', errorData);
    }
    
    // 프로덕션: 외부 서비스 전송 (선택사항)
    // sendToErrorTracking(errorData);
  }
}
```

### 15.2 사용자 분석 (선택사항)
```javascript
// Google Analytics 4 통합
class Analytics {
  static trackCalculation(expression, result) {
    if (window.gtag) {
      gtag('event', 'calculation', {
        expression_length: expression.length,
        has_functions: /sin|cos|tan|ln|log/.test(expression)
      });
    }
  }

  static trackError(errorType) {
    if (window.gtag) {
      gtag('event', 'error', {
        error_type: errorType
      });
    }
  }
}
```

---

## 16. 향후 확장 계획

### 16.1 Phase 2 기능
- **그래프 기능**: 함수 그래프 시각화
- **단위 변환**: 길이, 무게, 온도 등
- **통계 함수**: 평균, 표준편차 등
- **행렬 계산**: 행렬 연산 지원

### 16.2 기술적 개선
- **PWA 지원**: 오프라인 사용, 설치 가능
- **Web Workers**: 복잡한 계산을 백그라운드에서 처리
- **WebAssembly**: 고성능 수학 연산
- **클라우드 동기화**: 계산 기록 클라우드 저장

---

## 부록

### A. 참고 라이브러리
- **Math.js**: 고급 수학 라이브러리 (필요시)
- **Decimal.js**: 정밀한 소수점 연산 (필요시)
- **Fraction.js**: 분수 연산 (필요시)

### B. 유용한 리소스
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Vitest Guide](https://vitest.dev/)
- [Playwright Docs](https://playwright.dev/)
- [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### C. 코드 스타일 가이드
- **들여쓰기**: 2 spaces
- **따옴표**: Single quotes
- **세미콜론**: 사용
- **네이밍**:
  - 클래스: PascalCase
  - 함수/변수: camelCase
  - 상수: UPPER_SNAKE_CASE
  - Private 메서드: #prefix

---

**문서 버전**: 1.0  
**최종 수정일**: 2025-12-23  
**작성자**: Engineering Team  
**검토자**: [검토 대기]
