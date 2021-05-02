import Stack from './Stack.ts';

export class BinarySearchTreeNode<T> {
  value: T;
  count: number;
  left?: BinarySearchTreeNode<T>;
  right?: BinarySearchTreeNode<T>;
  constructor(value: T) {
    this.value = value;
    this.count = 1;
  }
  
  addDuplicate() {
    this.count++;
  }
  removeDuplicate() {
    this.count--;
  }
}

export class BinarySearchTree<T> {
  root?: BinarySearchTreeNode<T>;
  size: number;
  constructor(value?: T) {
    this.size = 0;
    if (value !== undefined) {
      this.root = new BinarySearchTreeNode(value);
      this.size = 1;
    }
  }

  insert(value: T) {
    const newNode = new BinarySearchTreeNode(value);
    if (!this.root) {
      this.root = newNode;
      this.size = 1;
      return;
    }
    if (this.root.value === value) {
      this.root.addDuplicate();
      return;
    }
    let current = this.root;
    while (current) {
      if (current.value === value) {
        current.addDuplicate();
        return;
      }
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          this.size += 1;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          this.size += 1;
          return;
        }
        current = current.right;
      }
    }
  }

  find(value: T): BinarySearchTreeNode<T> | undefined {
    if (!this.root) return;
    let current: BinarySearchTreeNode<T> | undefined = this.root;
    while (current) {
      if (current.value === value) return current;
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
  }

  contains(value: T): boolean {
    return !!this.find(value);
  }

  findParent(value: T): BinarySearchTreeNode<T> | undefined {
    if (!this.root) return;
    let parent: BinarySearchTreeNode<T> | undefined;
    let current: BinarySearchTreeNode<T> | undefined = this.root;
    while (current) {
      if (current.value === value) return parent;
      parent = current;
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return;
  }

  remove(value: T): boolean {
    const toRemove = this.find(value);
    if (!toRemove || !this.root) return false;

    if (toRemove.count > 1) {
      toRemove.removeDuplicate();
      return true;
    }

    if (this.size === 1) {
      this.size = 0;
      this.root = undefined;
      return true;
    }

    const parent = this.findParent(value);

    if (!parent) {
      throw new Error('Tree is corrupted - found node to remove, but it has no parent and is not a root');
    }

    if (!toRemove.right && !toRemove.left) {
      if (toRemove.value >= parent.value) {
        parent.right = undefined;
      } else {
        parent.left = undefined;
      }
      this.size -= 1;
      return true;
    }

    if (toRemove.right && toRemove.left) {
      let smallest = toRemove.right;
      while (smallest.left) {
        smallest = smallest.left;
      }
      if (smallest.value === toRemove.right.value) {
        toRemove.value = smallest.value;
        toRemove.count = smallest.count;
        toRemove.right = toRemove.right.right;
        this.size -= 1;
        return true;
      }
      
      this.remove(smallest.value);
      toRemove.value = smallest.value;
      return true;
    }

    const next = toRemove.left ? toRemove.left : toRemove.right;
    if (toRemove === this.root) {
      this.root = next;
    } else if (parent.left === toRemove) {
      parent.left = next;
    } else if (parent.right === toRemove) {
      parent.right = next;
    }
    this.size -= 1;
    return true;
  }

  findMinimum(): T | undefined {
    let current = this.root;
    while (current?.left) {
      current = current.left;
    }
    return current?.value;
  }

  findMaximum(): T | undefined {
    let current = this.root;
    while (current?.right) {
      current = current.right;
    }
    return current?.value;
  }

  *traverseInOrder(): IterableIterator<T> {
    if (!this.root) return;
    let current: BinarySearchTreeNode<T> | undefined  = this.root;
    const collectedChildren: { [key: string]: { left: boolean, right: boolean} } = {};
    const branch: Stack<BinarySearchTreeNode<T>> = new Stack();

    while (current) {
      const key = current.value + ''
      if (!collectedChildren[key]) {
        collectedChildren[key] = { left: false, right: false };
      }
      const currentMapItem = collectedChildren[key];

      if (current.left && !currentMapItem.left) {
        console.log('goes left: ', current.value);
        branch.push(current);
        currentMapItem.left = true;
        current = current.left;
      } else if (current && current.right && !currentMapItem.right) {
        console.log('goes right: ', current.value);
        yield current.value;
        if (currentMapItem.left) {
          branch.pop();
        } else {
          branch.push(current);
        }
        currentMapItem.right = true;
        current = current.right;
      } else {
        console.log('just yields: ', current.value);
        yield current.value;
        current = branch.pop();
      }
    }
  }
}

export default BinarySearchTree;