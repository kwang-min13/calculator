// Import core logic
import { Calculator } from './core/Calculator.js';

// Import components
import { Display } from './components/Display.js';
import { Keypad } from './components/Keypad.js';
import { ModeToggle } from './components/ModeToggle.js';
import { HistoryModal } from './components/HistoryModal.js';
import { SettingsModal } from './components/SettingsModal.js';

// Import utilities
import { ThemeManager } from './utils/themeManager.js';
import { KeyboardHandler } from './utils/keyboardHandler.js';

console.log('Engineering Calculator - Initializing...');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  // Clear loading message
  app.innerHTML = `
    <div class="relative flex h-screen w-full flex-col overflow-hidden max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark">
      <!-- Header -->
      <div class="flex items-center p-4 pb-2 justify-between shrink-0 z-10">
        <div id="settings-toggle-btn" class="text-[#111418] dark:text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors">
          <span class="material-symbols-outlined">menu</span>
        </div>
        <h2 class="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Engineering</h2>
        <div id="history-toggle-btn" class="flex size-12 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors text-[#111418] dark:text-white">
          <span class="material-symbols-outlined">history</span>
        </div>
      </div>

      <!-- Display Area -->
      <div id="display-container"></div>

      <!-- Mode Toggle (will be inserted into display) -->
      <div id="mode-toggle-container"></div>

      <!-- Keypad Area -->
      <div id="keypad-container"></div>

      <!-- History Modal Container -->
      <div id="history-modal-container"></div>

      <!-- Settings Modal Container -->
      <div id="settings-modal-container"></div>
    </div>
  `;

  // Initialize Calculator Engine
  const calculator = new Calculator();

  // Initialize Display
  const displayContainer = document.getElementById('display-container');
  const display = new Display(displayContainer);

  // Initialize Mode Toggle
  const modeToggleContainer = document.getElementById('mode-toggle-container');
  new ModeToggle(modeToggleContainer, (mode) => {
    calculator.toggleAngleMode();
    console.log(`Angle mode changed to: ${mode}`);
  });

  // Move mode toggle into display area
  const displayArea = displayContainer.querySelector('.flex.flex-col');
  if (displayArea) {
    displayArea.appendChild(modeToggleContainer.firstElementChild);
  }

  // Initialize Keypad
  const keypadContainer = document.getElementById('keypad-container');
  new Keypad(keypadContainer, (type, value) => {
    handleButtonClick(type, value);
  });

  // Initialize History Modal
  const historyModalContainer = document.getElementById('history-modal-container');
  const historyModal = new HistoryModal(
    historyModalContainer,
    () => {
      calculator.clearHistory();
    },
    (item) => {
      calculator.expression = item.expression;
      calculator.result = item.result;
      calculator.error = null;
      updateDisplay();
    }
  );

  // History Toggle Event
  const historyBtn = document.getElementById('history-toggle-btn');
  if (historyBtn) {
    historyBtn.addEventListener('click', () => {
      historyModal.open(calculator.history);
    });
  }

  // Initialize Settings Modal
  const settingsModalContainer = document.getElementById('settings-modal-container');
  const settingsModal = new SettingsModal(
    settingsModalContainer,
    calculator,
    () => {
      updateDisplay();
    }
  );

  // Settings Toggle Event
  const settingsBtn = document.getElementById('settings-toggle-btn');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      settingsModal.open();
    });
  }

  // Initialize Theme Manager
  ThemeManager.init();

  // Initialize Keyboard Handler
  new KeyboardHandler(calculator, display);

  // Button click handler
  function handleButtonClick(type, value) {
    switch (type) {
      case 'digit':
        calculator.inputDigit(value);
        break;
      case 'operator':
        calculator.inputOperator(value);
        break;
      case 'function':
        calculator.inputFunction(value);
        break;
      case 'constant':
        if (value === 'π') {
          calculator.inputDigit(Math.PI.toString());
        }
        break;
      case 'parenthesis':
        // Toggle between ( and )
        calculator.inputParenthesis();
        break;
      case 'clear':
        calculator.clear();
        break;
      case 'backspace':
        calculator.backspace();
        break;
      case 'equals':
        calculator.calculate();
        break;
      case 'memory':
        if (value === 'M+') calculator.memoryAdd();
        else if (value === 'M-') calculator.memorySubtract();
        else if (value === 'MR') calculator.memoryRecall();
        else if (value === 'MC') calculator.memoryClear();
        break;
    }

    updateDisplay();
  }

  // Update display
  function updateDisplay() {
    display.updateHistory(calculator.expression);
    if (calculator.error) {
      display.showError(calculator.result);
    } else {
      display.updateResult(calculator.result);
    }
  }

  // Initial display
  updateDisplay();

  console.log('✅ Calculator initialized successfully!');
});
