// 연산자 우선순위
export const PRECEDENCE = {
  '+': 1,
  '-': 1,
  '×': 2,
  '÷': 2,
  '^': 3,
};

// 토큰 타입
export const TokenType = {
  NUMBER: 'NUMBER',
  OPERATOR: 'OPERATOR',
  FUNCTION: 'FUNCTION',
  LPAREN: 'LPAREN',
  RPAREN: 'RPAREN',
};

// 에러 타입
export const ErrorType = {
  SYNTAX_ERROR: 'SYNTAX_ERROR',
  MATH_ERROR: 'MATH_ERROR',
  OVERFLOW_ERROR: 'OVERFLOW_ERROR',
};

// 에러 메시지
export const ERROR_MESSAGES = {
  [ErrorType.SYNTAX_ERROR]: 'Syntax Error',
  [ErrorType.MATH_ERROR]: 'Math Error',
  [ErrorType.OVERFLOW_ERROR]: 'Overflow',
};

// 버튼 레이아웃 (5×8 그리드)
export const BUTTON_LAYOUT = [
  // Row 1
  { label: 'MC', type: 'memory', style: 'secondary' },
  { label: 'MR', type: 'memory', style: 'secondary' },
  { label: 'M+', type: 'memory', style: 'secondary' },
  { label: 'M-', type: 'memory', style: 'secondary' },
  { label: 'AC', type: 'clear', style: 'danger' },
  // Row 2
  { label: 'sinh', type: 'function', style: 'function' },
  { label: 'cosh', type: 'function', style: 'function' },
  { label: 'tanh', type: 'function', style: 'function' },
  { label: '( )', type: 'parenthesis', style: 'secondary' },
  { label: '÷', type: 'operator', style: 'operator' },
  // Row 3
  { label: 'sin⁻¹', value: 'asin', type: 'function', style: 'function' },
  { label: 'cos⁻¹', value: 'acos', type: 'function', style: 'function' },
  { label: 'tan⁻¹', value: 'atan', type: 'function', style: 'function' },
  { label: '%', type: 'operator', style: 'secondary' },
  { label: '×', type: 'operator', style: 'operator' },
  // Row 4
  { label: 'sin', type: 'function', style: 'function' },
  { label: 'cos', type: 'function', style: 'function' },
  { label: 'tan', type: 'function', style: 'function' },
  { label: 'x!', value: 'fact', type: 'function', style: 'function' },
  { label: '-', type: 'operator', style: 'operator' },
  // Row 5
  { label: 'ln', type: 'function', style: 'function' },
  { label: 'log', type: 'function', style: 'function' },
  { label: '√', type: 'function', style: 'function' },
  { label: '|x|', value: 'abs', type: 'function', style: 'function' },
  { label: '+', type: 'operator', style: 'operator' },
  // Row 6
  { label: '7', type: 'digit', style: 'number' },
  { label: '8', type: 'digit', style: 'number' },
  { label: '9', type: 'digit', style: 'number' },
  { label: '^', type: 'operator', style: 'function' },
  { label: 'π', type: 'constant', style: 'function' },
  // Row 7
  { label: '4', type: 'digit', style: 'number' },
  { label: '5', type: 'digit', style: 'number' },
  { label: '6', type: 'digit', style: 'number' },
  { label: '.', type: 'digit', style: 'number' },
  { label: '⌫', type: 'backspace', style: 'number', icon: 'backspace' },
  // Row 8
  { label: '1', type: 'digit', style: 'number' },
  { label: '2', type: 'digit', style: 'number' },
  { label: '3', type: 'digit', style: 'number' },
  { label: '0', type: 'digit', style: 'number' },
  { label: '=', type: 'equals', style: 'equals' },
];
