import DoublyLinkedList from "./DoublyLinkedList.ts";

export class Queue<T> {
  list: DoublyLinkedList<T>;
  size: number;
  constructor() {
    this.size = 0;
    this.list = new DoublyLinkedList();
  }
  enqueue(value: T) {
    this.list.add(value);
    this.size += 1;
  }
  dequeue(): T | undefined {
    if (!this.list.head) return;
    const value = this.list.head.value;
    this.list.remove(value);
    this.size -= 1;
    return value;
  }
  get front(): T | undefined {
    return this.list.head?.value;
  }
}

export default Queue;