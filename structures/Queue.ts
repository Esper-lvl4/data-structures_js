import DoublyLinkedList from "./DoublyLinkedList.ts";

export class Queue<T> {
  list: DoublyLinkedList<T>;
  constructor() {
    this.list = new DoublyLinkedList();
  }
  enqueue(value: T) {
    this.list.add(value);
  }
  dequeue(): T | undefined {
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

export default Queue;