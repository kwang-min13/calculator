import { BUTTON_LAYOUT } from '../utils/constants.js';

/**
 * Keypad Component - calculator button grid
 */
export class Keypad {
    constructor(container, onButtonClick) {
        this.container = container;
        this.onButtonClick = onButtonClick;
        this.init();
    }

    init() {
        const buttonsHTML = BUTTON_LAYOUT.map((btn) => this.createButton(btn)).join('');

        this.container.innerHTML = `
      <div class="w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-t-3xl p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-white/20 dark:border-slate-800/50">
        <div class="grid grid-cols-4 gap-3 h-full">
          ${buttonsHTML}
        </div>
      </div>
    `;

        this.attachEventListeners();
    }

    createButton(config) {
        const styleClasses = this.getButtonStyle(config.style);
        const content = config.icon
            ? `<span class="material-symbols-outlined">${config.icon}</span>`
            : config.label;

        return `
      <button 
        class="${styleClasses}" 
        data-type="${config.type}" 
        data-value="${config.label}"
        aria-label="${this.getAriaLabel(config)}"
      >
        ${content}
      </button>
    `;
    }

    getButtonStyle(style) {
        const baseClasses =
            'h-14 md:h-16 rounded-2xl flex items-center justify-center font-bold hover:brightness-95 active:scale-95 transition-all';

        const styles = {
            number:
                'bg-white dark:bg-slate-700 text-[#111418] dark:text-white text-2xl font-semibold shadow-sm hover:bg-gray-50 dark:hover:bg-slate-600',
            operator:
                'bg-primary/10 dark:bg-primary/20 text-primary text-2xl hover:bg-primary/20 dark:hover:bg-primary/30',
            function:
                'bg-[#f0f4f8] dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 text-base font-medium hover:bg-white dark:hover:bg-slate-700',
            secondary:
                'bg-[#e8eef3] dark:bg-slate-800 text-[#111418] dark:text-slate-200 text-lg font-medium',
            danger: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-lg',
            equals:
                'bg-primary text-white text-2xl shadow-lg shadow-primary/30 hover:bg-blue-600',
        };

        return `${baseClasses} ${styles[style]}`;
    }

    getAriaLabel(config) {
        const labels = {
            AC: 'Clear all',
            '⌫': 'Backspace',
            '=': 'Equals',
            '( )': 'Parentheses',
            π: 'Pi',
        };
        return labels[config.label] || `${config.type} ${config.label}`;
    }

    attachEventListeners() {
        this.container.querySelectorAll('button').forEach((button) => {
            button.addEventListener('click', (e) => {
                const type = e.currentTarget.dataset.type;
                const value = e.currentTarget.dataset.value;
                this.onButtonClick(type, value);
            });
        });
    }
}
