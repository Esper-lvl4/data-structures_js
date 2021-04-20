import DoublyLinkedList, { DoublyLinkedListPart } from "./DoublyLinkedList.ts"

export interface PriorityQueueItem<T> {
  value: T,
  priority: number,
}

export class PriorityQueue<T> {
  list: DoublyLinkedList<PriorityQueueItem<T>>;
  constructor() {
    this.list = new DoublyLinkedList();
  }

  enqueue(value: T, priority?: number) {
    const prio = priority || 1;
    const toAdd = { value, priority: prio };
    if (!this.front) {
      this.list.add(toAdd);
      return;
    }
    if (this.front.priority < prio) {
      this.list.prepend({ value, priority: prio });
      return;
    }
    let current = this.list.head;
    while (current) {
      if (!current.next) {
        this.list.add(toAdd);
        break;
      }
      if (current.value.priority < prio) {
        const part = new DoublyLinkedListPart(toAdd);
        if (current.prev) current.prev.next = part;
        current.prev = part;
        this.list.size += 1;
        break;
      }
      current = current.next;
    }
  }

  dequeue(): T | undefined {
    if (!this.list.head) return;
    const value = this.list.head.value;
    this.list.remove(value);
    return value.value;
  }

  get front(): PriorityQueueItem<T> | undefined {
    return this.list.head?.value;
  }

  get size(): number {
    return this.list.size;
  }
}

export default PriorityQueue;