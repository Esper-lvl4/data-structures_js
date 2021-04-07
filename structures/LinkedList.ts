export class LinkedList {
  head?: LinkedListPart;
  tail?: LinkedListPart;
  constructor(head?: LinkedListPart) {
    this.head = head;
    this.tail = head;
  }
  add(part: LinkedListPart) {
    if (!this.tail) {
      this.head = part;
      this.tail = part;
      return;
    }
    this.tail.next = part;
    this.tail = part;
  }
  prepend(part: LinkedListPart) {
    if (!this.head) {
      this.head = part;
      this.tail = part;
      return;
    }
    part.next = this.head;
    this.head = part;
  }
  contains(value: string): boolean {
    let current: LinkedListPart | undefined = this.head;
    while (current) {
      if (current.value === value) return true;
      current = current.next;
    }
    return false;
  }
  remove(value: string): boolean {
    if (!this.head) return false;
    if (this.head.value === value) {
      if (this.head === this.tail) {
        this.head = undefined;
        this.tail = undefined;
      } else {
        this.head = this.head.next;
      }
      return true;
    }

    if (!this.head.next) return false;
    let current: LinkedListPart | undefined = this.head.next;
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
    return true;
  }

  *traverse(): IterableIterator<string | undefined> {
    if (!this.head) return;
    let current: LinkedListPart | undefined = this.head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }

  *reverseTraversal(): IterableIterator<string | undefined> {
    if (!this.tail) return;
    let current: LinkedListPart | undefined = this.tail;
    while (current && current !== this.head) {
      let previous: LinkedListPart | undefined = this.head;
      while (previous && previous.next !== current) {
        previous = previous.next;
      }
      yield current.value;
      current = previous;
    }
    if (current) yield current.value;
  }
}

export class LinkedListPart {
  value: string;
  next?: LinkedListPart;
  constructor(value: string, next?: LinkedListPart) {
    this.value = value;
    this.next = next;
  }
}

export default LinkedList;