/**
 * Theme Manager - handles dark mode
 */
export class ThemeManager {
    static init() {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

        // Apply initial theme
        this.applyTheme(prefersDark.matches ? 'dark' : 'light');

        // Listen for system theme changes
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
    }

    static toggle() {
        const isDark = document.documentElement.classList.contains('dark');
        this.applyTheme(isDark ? 'light' : 'dark');
    }
}
