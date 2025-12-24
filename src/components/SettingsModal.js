import { ThemeManager } from '../utils/themeManager.js';

/**
 * Settings Modal Component
 */
export class SettingsModal {
    constructor(container, calculator, onSettingsChange) {
        this.container = container;
        this.calculator = calculator;
        this.onSettingsChange = onSettingsChange;
        this.isOpen = false;
        this.render();
    }

    render() {
        this.container.innerHTML = `
      <div id="settings-modal" class="absolute inset-0 z-50 transform transition-transform duration-300 -translate-x-full bg-white dark:bg-slate-900 flex flex-col">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-100 dark:border-slate-800">
          <h3 class="text-xl font-bold text-slate-800 dark:text-white">Settings</h3>
          <button id="close-settings-btn" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors" aria-label="Close settings">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto p-4 space-y-6">
          
          <!-- Theme Setting -->
          <div>
            <h4 class="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Theme</h4>
            <div class="grid grid-cols-3 gap-2">
              <button class="theme-btn py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium flex flex-col items-center gap-1 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400" data-theme="auto">
                <span class="material-symbols-outlined text-lg">brightness_auto</span>
                Auto
              </button>
              <button class="theme-btn py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium flex flex-col items-center gap-1 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400" data-theme="light">
                <span class="material-symbols-outlined text-lg">light_mode</span>
                Light
              </button>
              <button class="theme-btn py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium flex flex-col items-center gap-1 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400" data-theme="dark">
                <span class="material-symbols-outlined text-lg">dark_mode</span>
                Dark
              </button>
            </div>
          </div>

          <!-- Precision Setting -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <h4 class="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Decimal Places</h4>
              <span id="precision-value" class="text-sm font-bold text-slate-800 dark:text-white">${this.calculator.settings.precision}</span>
            </div>
            <input type="range" id="precision-input" min="0" max="12" step="1" value="${this.calculator.settings.precision}" class="w-full accent-primary h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer">
          </div>

          <div class="h-px bg-gray-100 dark:bg-slate-800 my-4"></div>

          <!-- Danger Zone -->
          <div>
            <h4 class="text-sm font-semibold text-rose-500 dark:text-rose-400 uppercase tracking-wider mb-3">Danger Zone</h4>
            <button id="reset-app-btn" class="w-full py-3 px-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 font-medium hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors flex items-center justify-center gap-2">
              <span class="material-symbols-outlined">delete_forever</span>
              Reset Application
            </button>
          </div>

        </div>
      </div>
    `;

        this.modal = this.container.querySelector('#settings-modal');
        this.precisionInput = this.container.querySelector('#precision-input');
        this.precisionValue = this.container.querySelector('#precision-value');
        this.themeBtns = this.container.querySelectorAll('.theme-btn');

        this.updateThemeUI(ThemeManager.getTheme());
        this.attachEventListeners();
    }

    attachEventListeners() {
        const closeBtn = this.container.querySelector('#close-settings-btn');
        const resetBtn = this.container.querySelector('#reset-app-btn');

        closeBtn.addEventListener('click', () => this.close());

        // Precision
        this.precisionInput.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            this.precisionValue.textContent = value;
            this.calculator.settings.precision = value;
            this.calculator.saveState();
            this.onSettingsChange();
        });

        // Theme
        this.themeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.dataset.theme;
                ThemeManager.setTheme(theme);
                this.updateThemeUI(theme);

                // Save theme to settings in calculator (via storage)
                // Actually ThemeManager handles local storage for theme separately usually,
                // but we want to sync it with our centralized storage if possible,
                // OR just rely on ThemeManager.
                // Let's stick to ThemeManager for now, but maybe update calculator settings ref?
                this.calculator.settings.theme = theme;
                this.calculator.saveState();
            });
        });

        // Reset
        resetBtn.addEventListener('click', () => {
            if (confirm('This will delete all history and reset settings. Are you sure?')) {
                this.calculator.clearHistory();
                this.calculator.settings = { precision: 10, theme: 'auto' };
                this.calculator.saveState();
                ThemeManager.setTheme('auto');
                this.updateThemeUI('auto');
                this.precisionInput.value = 10;
                this.precisionValue.textContent = 10;
                this.onSettingsChange();
                this.close();
            }
        });
    }

    updateThemeUI(activeTheme) {
        this.themeBtns.forEach(btn => {
            const isSelected = btn.dataset.theme === activeTheme;
            if (isSelected) {
                btn.classList.add('bg-blue-50', 'dark:bg-blue-900/20', 'border-blue-200', 'dark:border-blue-800', 'text-blue-600', 'dark:text-blue-400');
                btn.classList.remove('text-slate-600', 'dark:text-slate-400');
            } else {
                btn.classList.remove('bg-blue-50', 'dark:bg-blue-900/20', 'border-blue-200', 'dark:border-blue-800', 'text-blue-600', 'dark:text-blue-400');
                btn.classList.add('text-slate-600', 'dark:text-slate-400');
            }
        });
    }

    open() {
        this.isOpen = true;
        this.modal.classList.remove('-translate-x-full');
    }

    close() {
        this.isOpen = false;
        this.modal.classList.add('-translate-x-full');
    }
}
