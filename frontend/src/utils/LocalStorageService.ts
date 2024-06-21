export class LocalStorageService<T = unknown> {
  private readonly _key: string;

  constructor(key: string) {
    this._key = key;
  }

  setItem(item: T) {
    localStorage.setItem(this._key, JSON.stringify(item));
  }

  getItem(): T | null {
    const data = localStorage.getItem(this._key);

    if (data === null) return null;

    try {
      return JSON.parse(data);
    } catch (err) {
      return data as T;
    }
  }

  removeItem(): void {
    localStorage.removeItem(this._key);
  }
}
