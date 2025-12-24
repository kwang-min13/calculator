/**
 * Storage Interface (for Dependency Inversion Principle)
 */
export class StorageInterface {
  save(key, value) {
    throw new Error('save() must be implemented');
  }

  load(key) {
    throw new Error('load() must be implemented');
  }

  clear(key) {
    throw new Error('clear() must be implemented');
  }
}

/**
 * LocalStorage Adapter
 */
export class LocalStorageAdapter extends StorageInterface {
  save(key, value) {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }

  load(key) {
    try {
      if (typeof localStorage === 'undefined') return null;
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn('Failed to load from localStorage:', e);
      return null;
    }
  }

  clear(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('Failed to clear localStorage:', e);
    }
  }
}

/**
 * Storage Manager
 */
export class StorageManager {
  static KEY = 'calculator_state';

  constructor(storage = new LocalStorageAdapter()) {
    this.storage = storage;
  }

  saveState(state) {
    this.storage.save(StorageManager.KEY, state);
  }

  loadState() {
    return this.storage.load(StorageManager.KEY) || this.getDefaultState();
  }

  clearState() {
    this.storage.clear(StorageManager.KEY);
  }

  getDefaultState() {
    return {
      angleMode: 'DEG',
      history: [],
      settings: {
        theme: 'auto',
        precision: 10,
        maxHistoryItems: 50,
      },
    };
  }
}
