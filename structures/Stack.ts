import LinkedList from './LinkedList.ts';

export class Stack<T> {
  list: LinkedList<T>;
  constructor() {
    this.list = new LinkedList();
  }
  push(value: T) {
    this.list.prepend(value);
  }
  pop(): T | undefined {
    if (!this.list.head) return;
    const value = this.list.head.value;
    this.list.remove(value);
    return value;
  }
  get front(): T | undefined {
    return this.list.head?.value;
  }
  get size(): number {
    return this.list.size;
  }
}

export default Stack;