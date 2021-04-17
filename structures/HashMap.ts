export class HashMap<T> {
  map: Map<string, T | T[]>;
  isImperfect: boolean; 
  constructor(isImperfect?: boolean) {
    this.map = new Map();
    this.isImperfect = isImperfect || false;
  }
  set(key: string, value: T) {
    const item = this.map.get(key)
    if (item === undefined) {
      this.map.set(key, this.isImperfect ? [value] : value);
      return;
    }
    if (this.isImperfect && Array.isArray(item)) {
      item.push(value);
    } else {
      this.map.set(key, value);
    }
  }
  get(key: string): T | T[] | undefined {
    return this.map.get(key);
  }
}

export default HashMap;