export class DoublyLinkedListPart<T> {
  value: T;
  prev?: DoublyLinkedListPart<T>;
  next?: DoublyLinkedListPart<T>;
  constructor(value: T, prev?: DoublyLinkedListPart<T>, next?: DoublyLinkedListPart<T>) {
    this.value = value;
    if (prev) this.prev = prev;
    if (next) this.next = next;
  }
}

export class DoublyLinkedList<T> {
  head?: DoublyLinkedListPart<T>;
  tail?: DoublyLinkedListPart<T>;
  size: number;
  constructor(values?: T | T[]) {
    this.size = 0;
    if (!values) return;
    if (Array.isArray(values)) {
      if (values.length === 0) return;
      if (values.length === 1) {
        this.head = new DoublyLinkedListPart(values[0]);
        this.tail = this.head;
        this.size = 1;
        return;
      }

      values.forEach(value => {
        this.size += 1;
        const part = new DoublyLinkedListPart(value);
        if (!this.tail) {
          this.head = part;
          this.tail = part;
          return;
        }
        this.tail.next = part;
        part.prev = this.tail;
        this.tail = part;
      });
      return;
    }
    this.head = new DoublyLinkedListPart(values);
    this.tail = this.head;
    this.size = 1;
  }
  add(value: T) {
    const part = new DoublyLinkedListPart(value);
    this.size += 1;
    if (!this.tail) {
      this.head = part;
      this.tail = part;
      return;
    }
    this.tail.next = part;
    part.prev = this.tail;
    this.tail = part;
  }
  prepend(value: T) {
    const part = new DoublyLinkedListPart(value);
    this.size += 1;
    if (!this.head) {
      this.head = part;
      this.tail = part;
      return;
    }
    this.head.prev = part;
    part.next = this.head;
    this.head = part;
  }
  remove(value: T): boolean {
    if (this.size === 0) return false;
    if (this.size === 1 && this.head) {
      if (this.head.value === value) {
        this.head = undefined;
        this.tail = undefined;
        this.size -= 1;
        return true;
      }
      return false;
    }

    let current = this.head;
    while (current) {
      if (current.value === value) {
        if (current.prev) current.prev.next = current.next;
        if (current.next) current.next.prev = current.prev;
        if (current === this.head) this.head = current.next;
        if (current === this.tail) this.tail = current.prev;
        current.next = undefined;
        current.prev = undefined;
        this.size -= 1;
        return true;
      } else {
        current = current.next;
      }
    }
    return false;
  }
  forEach(func: (value: T, node?: DoublyLinkedListPart<T>) => void) {
    if (!this.tail && !this.head) return;
    let current = this.head;
    while (current) {
      func(current.value, current);
      current = current.next;
    }
  }
  *traverse(): IterableIterator<T | undefined> {
    let current = this.head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
  *reverseTraverse(): IterableIterator<T | undefined> {
    let current = this.tail;
    while (current) {
      yield current.value;
      current = current.prev;
    }
  }
}

export default DoublyLinkedList;