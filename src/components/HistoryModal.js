/**
 * History Modal Component
 */
export class HistoryModal {
    constructor(container, onDeleteHistory, onSelectHistory) {
        this.container = container;
        this.onDeleteHistory = onDeleteHistory;
        this.onSelectHistory = onSelectHistory;
        this.isOpen = false;
        this.render();
    }

    render() {
        this.container.innerHTML = `
      <div id="history-modal" class="absolute inset-0 z-50 transform transition-transform duration-300 translate-y-full bg-white dark:bg-slate-900 flex flex-col">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-100 dark:border-slate-800">
          <h3 class="text-xl font-bold text-slate-800 dark:text-white">History</h3>
          <div class="flex gap-2">
            <button id="clear-history-btn" class="p-2 rounded-full hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-500 transition-colors" aria-label="Clear history">
              <span class="material-symbols-outlined">delete</span>
            </button>
            <button id="close-history-btn" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors" aria-label="Close history">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        <!-- List -->
        <div id="history-list" class="flex-1 overflow-y-auto p-4 space-y-3">
          <!-- Items will be injected here -->
          <div class="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-500">
            <span class="material-symbols-outlined text-4xl mb-2">history</span>
            <p>No history yet</p>
          </div>
        </div>
      </div>
    `;

        this.modal = this.container.querySelector('#history-modal');
        this.listContainer = this.container.querySelector('#history-list');

        this.attachEventListeners();
    }

    attachEventListeners() {
        const closeBtn = this.container.querySelector('#close-history-btn');
        const clearBtn = this.container.querySelector('#clear-history-btn');

        closeBtn.addEventListener('click', () => this.close());

        clearBtn.addEventListener('click', () => {
            if (confirm('Clear all history?')) {
                this.onDeleteHistory();
                this.updateList([]);
            }
        });
    }

    open(historyItems) {
        this.updateList(historyItems);
        this.isOpen = true;
        this.modal.classList.remove('translate-y-full');
    }

    close() {
        this.isOpen = false;
        this.modal.classList.add('translate-y-full');
    }

    updateList(historyItems) {
        if (!historyItems || historyItems.length === 0) {
            this.listContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-500">
          <span class="material-symbols-outlined text-4xl mb-2">history</span>
          <p>No history yet</p>
        </div>
      `;
            return;
        }

        this.listContainer.innerHTML = historyItems.map((item, index) => `
      <div class="history-item flex flex-col p-3 rounded-xl bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer transition-colors border border-transparent hover:border-primary/20" data-index="${index}">
        <div class="text-right text-sm text-slate-500 dark:text-slate-400 mb-1 font-mono">${item.expression} =</div>
        <div class="text-right text-xl font-bold text-slate-800 dark:text-white font-mono break-all">${item.result}</div>
      </div>
    `).join('');

        // Attach click listeners to items
        this.listContainer.querySelectorAll('.history-item').forEach(el => {
            el.addEventListener('click', () => {
                const index = parseInt(el.dataset.index);
                const item = historyItems[index];
                this.onSelectHistory(item);
                this.close();
            });
        });
    }
}
