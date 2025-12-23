/**
 * Display Component - shows calculation history and result
 */
export class Display {
  constructor(container) {
    this.container = container;
    this.historyElement = null;
    this.resultElement = null;
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="flex flex-col flex-1 justify-end px-6 pb-6 pt-2 relative" role="region" aria-label="Calculator display">
        <!-- Calculation History -->
        <div class="text-right mb-1 opacity-60">
          <span id="history" class="text-xl md:text-2xl font-medium tracking-wide text-slate-600 dark:text-slate-400" aria-label="Calculation history"></span>
        </div>
        
        <!-- Main Result -->
        <div class="text-right">
          <h1 id="result" class="text-6xl md:text-7xl font-bold tracking-tight leading-none break-all text-[#111418] dark:text-white" aria-live="polite" aria-atomic="true" aria-label="Calculation result">0</h1>
        </div>
      </div>
    `;

    this.historyElement = document.getElementById('history');
    this.resultElement = document.getElementById('result');
  }

  updateHistory(expression) {
    if (this.historyElement) {
      this.historyElement.textContent = expression || '';
    }
  }

  updateResult(result) {
    if (this.resultElement) {
      this.resultElement.textContent = result || '0';
      this.clearError();
    }
  }

  showError(message) {
    if (this.resultElement) {
      this.resultElement.textContent = message;
      this.resultElement.classList.add('text-rose-600', 'dark:text-rose-400');
    }
  }

  clearError() {
    if (this.resultElement) {
      this.resultElement.classList.remove('text-rose-600', 'dark:text-rose-400');
    }
  }
}
