export class LinkedList<T> {
  head?: LinkedListPart<T>;
  tail?: LinkedListPart<T>;
  size: number;
  constructor(values?: T | T[]) {
    this.size = 0;
    if (!values) return;
    if (Array.isArray(values)) {
      if (values.length === 0) return;
      if (values.length === 1) {
        this.head = new LinkedListPart(values[0]);
        this.tail = this.head;
        this.size = 1;
        return;
      }
      let previous: LinkedListPart<T> | null = null
      values.forEach(value => {
        this.size += 1;
        if (!previous) {
          this.head = new LinkedListPart(value);
          previous = this.head;
          return;
        }
        const newPart = new LinkedListPart(value);
        previous.next = newPart;
        previous = newPart;
      });
      this.tail = previous ? previous : this.head;
      return;
    }
    this.head = new LinkedListPart(values);
    this.tail = this.head;
    this.size = 1;
  }
  add(value: T) {
    const part = new LinkedListPart(value);
    this.size += 1;
    if (!this.tail) {
      this.head = part;
      this.tail = part;
      return;
    }
    this.tail.next = part;
    this.tail = part;
  }
  prepend(value: T) {
    const part = new LinkedListPart(value);
    this.size += 1;
    if (!this.head) {
      this.head = part;
      this.tail = part;
      return;
    }
    part.next = this.head;
    this.head = part;
  }
  contains(value: T): boolean {
    let current: LinkedListPart<T> | undefined = this.head;
    while (current) {
      if (current.value === value) return true;
      current = current.next;
    }
    return false;
  }
  remove(value: T): boolean {
    if (!this.head) return false;
    if (this.head.value === value) {
      if (this.head === this.tail) {
        this.head = undefined;
        this.tail = undefined;
        this.size = 0;
      } else {
        this.head = this.head.next;
        this.size -= 1;
      }
      return true;
    }

    if (!this.head.next) return false;
    let current: LinkedListPart<T> | undefined = this.head.next;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }
    if (!current.next) return false;
    if (current.next === this.tail) {
      this.tail = current;
      this.tail.next = undefined;
    } else {
      current.next = current.next.next;
    }
    this.size -= 1;
    return true;
  }

  *traverse(): IterableIterator<T | undefined> {
    if (!this.head) return;
    let current: LinkedListPart<T> | undefined = this.head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }

  *reverseTraversal(): IterableIterator<T | undefined> {
    if (!this.tail) return;
    let current: LinkedListPart<T> | undefined = this.tail;
    while (current && current !== this.head) {
      let previous: LinkedListPart<T> | undefined = this.head;
      while (previous && previous.next !== current) {
        previous = previous.next;
      }
      yield current.value;
      current = previous;
    }
    if (current) yield current.value;
  }
}

export class LinkedListPart<T> {
  value: T;
  next?: LinkedListPart<T>;
  constructor(value: T, next?: LinkedListPart<T>) {
    this.value = value;
    this.next = next;
  }
}

export default LinkedList;