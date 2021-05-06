import Stack from "./Stack.ts";

interface RebalanceInfo<T> {
  unbalanced: AVLTreeNode<T>;
  parent?: AVLTreeNode<T>;
  child: AVLTreeNode<T>;
  grandChild: AVLTreeNode<T>;
  tree: AVLTree<T>;
}

function rebalanceRight<T>(info: RebalanceInfo<T>) {
  const { unbalanced, parent, child, grandChild, tree } = info;
  if (parent) {
    parent.left = child;
  } else {
    tree.setRoot(child);
  }
}
function rebalanceLeft<T>(info: RebalanceInfo<T>) {}
function rebalanceLeftRight<T>(info: RebalanceInfo<T>) {}
function rebalanceRightLeft<T>(info: RebalanceInfo<T>) {}

function isAVLTreeNode<T>(item: any): item is AVLTreeNode<T>  {
  if (typeof item !== 'object' || !item) return false;
  return item.value !== undefined && typeof item.count === 'number'
    && item.hasOwnProperty('left') && item.hasOwnProperty('right');
}

export class AVLTreeNode<T> {
  value: T;
  count: number;
  left?: AVLTreeNode<T>;
  right?: AVLTreeNode<T>;

  constructor(value: T) {
    this.value = value;
    this.count = 1;
  }

  get height(): number {
    return Math.max(this.leftHeight, this.rightHeight);
  }

  get leftHeight(): number {
    if (!this.left) return 0;
    const { left, right } = this.left;
    return 1 + ((left || right) ? this.left.height : 0);
  }

  get rightHeight(): number {
    if (!this.right) return 0;
    const { left, right } = this.right;
    return 1 + ((left || right) ? this.right.height : 0);
  }

  get balance(): number {
    return this.rightHeight - this.leftHeight;
  }

  addDuplicate() {
    this.count++;
  }

  removeDuplicate() {
    this.count--;
  }
}

export class AVLTree<T> {
  root?: AVLTreeNode<T>;
  size: number;

  constructor(value?: T) {
    this.size = 0;
    if (value !== undefined) {
      this.root = new AVLTreeNode(value);
      this.size = 1;
    } 
  }

  setRoot(value: T | AVLTreeNode<T>) {
    if (isAVLTreeNode(value)) {
      this.root = value;
      return;
    }
    this.root = new AVLTreeNode(value);
  }

  insert(value: T) {
    const newNode = new AVLTreeNode(value);
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
    const branch = new Stack<AVLTreeNode<T>>();

    while (current) {
      if (current.value === value) {
        current.addDuplicate();
        return;
      }
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          this.size += 1;
          this.rebalance(newNode, branch);
          return;
        }
        branch.push(current);
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          this.size += 1;
          this.rebalance(newNode, branch);
          return;
        }
        branch.push(current);
        current = current.right;
      }
    }
  }

  rebalance(startingNode: AVLTreeNode<T>, currentBranch: Stack<AVLTreeNode<T>>) {
    let current: AVLTreeNode<T> | undefined = startingNode;
    const saved: AVLTreeNode<T>[] = [];
    while (current && Math.abs(current.balance) < 2) {
      saved.push(current);
      current = currentBranch.pop();
    }
    if (!current) return;
    const unbalanced = current;
    const child = saved.pop();
    const grandChild = saved.pop();
    const parent = currentBranch.pop();
    if (!child || !grandChild) throw new Error('AVL tree is corrupted - balance is more then 2 but there is no child or grandchild of unbalanced node!');

    if (unbalanced.balance === 2 && child.balance === 1) {
      return rebalanceLeft({ unbalanced, child, grandChild, parent, tree: this });
    }

    if (unbalanced.balance === -2 && child.balance === -1) {
      return rebalanceRight({ unbalanced, child, grandChild, parent, tree: this });
    }

    if (unbalanced.balance === 2 && child.balance === -1) {
      return rebalanceRightLeft({ unbalanced, child, grandChild, parent, tree: this });
    }

    if (unbalanced.balance === -2 && child.balance === 1) {
      return rebalanceLeftRight({ unbalanced, child, grandChild, parent, tree: this });
    }
  }

  *traversePreOrder(current?: AVLTreeNode<T>): IterableIterator<T> {
    if (!current) return;
    yield current.value;
    for (const value of this.traversePreOrder(current.left)) {
      yield value;
    }
    for (const value of this.traversePreOrder(current.right)) {
      yield value;
    }
  }

  *traversePreOrderNode(current?: AVLTreeNode<T>): IterableIterator<AVLTreeNode<T>> {
    if (!current) return;
    yield current;
    for (const value of this.traversePreOrderNode(current.left)) {
      yield value;
    }
    for (const value of this.traversePreOrderNode(current.right)) {
      yield value;
    }
  }

  *traversePostOrder(current?: AVLTreeNode<T>): IterableIterator<T> {
    if (!current) return;
    for (const value of this.traversePostOrder(current.left)) {
      yield value;
    }
    for (const value of this.traversePostOrder(current.right)) {
      yield value;
    }
    yield current.value;
  }
}

export default AVLTree;