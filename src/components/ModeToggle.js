/**
 * ModeToggle Component - DEG/RAD mode selector
 */
export class ModeToggle {
    constructor(container, onModeChange) {
        this.container = container;
        this.onModeChange = onModeChange;
        this.currentMode = 'DEG';
        this.init();
    }

    init() {
        this.container.innerHTML = `
      <div class="absolute top-4 left-6">
        <div class="flex h-8 items-center justify-center rounded-lg bg-[#e0e4e9] dark:bg-slate-800 p-1 w-24">
          <label class="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md has-[:checked]:bg-white dark:has-[:checked]:bg-slate-600 has-[:checked]:shadow-sm has-[:checked]:text-[#111418] dark:has-[:checked]:text-white text-[#60758a] dark:text-slate-400 text-xs font-bold transition-all">
            <span class="truncate">DEG</span>
            <input checked class="invisible w-0 absolute" name="mode-toggle" type="radio" value="DEG" />
          </label>
          <label class="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md has-[:checked]:bg-white dark:has-[:checked]:bg-slate-600 has-[:checked]:shadow-sm has-[:checked]:text-[#111418] dark:has-[:checked]:text-white text-[#60758a] dark:text-slate-400 text-xs font-bold transition-all">
            <span class="truncate">RAD</span>
            <input class="invisible w-0 absolute" name="mode-toggle" type="radio" value="RAD" />
          </label>
        </div>
      </div>
    `;

        this.attachEventListeners();
    }

    attachEventListeners() {
        const radios = this.container.querySelectorAll('input[name="mode-toggle"]');
        radios.forEach((radio) => {
            radio.addEventListener('change', (e) => {
                this.currentMode = e.target.value;
                if (this.onModeChange) {
                    this.onModeChange(this.currentMode);
                }
            });
        });
    }

    getMode() {
        return this.currentMode;
    }
}
