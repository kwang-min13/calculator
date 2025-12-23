// Main application entry point
console.log('Engineering Calculator - Initializing...');

// App will be implemented in Phase 2 and 3
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    if (app) {
        app.innerHTML = `
      <div class="flex items-center justify-center h-full flex-col gap-4">
        <h1 class="text-4xl font-display font-bold">🧮 Engineering Calculator</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400">Phase 1 Setup Complete!</p>
        <p class="text-sm text-gray-500 dark:text-gray-500">Core logic and UI will be implemented in Phase 2 & 3</p>
      </div>
    `;
    }
});
