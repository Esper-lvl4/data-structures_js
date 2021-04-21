export class TrieNode {
  value: string | null;
  children: { [key: string]: TrieNode };
  parent?: TrieNode;
  constructor(value: string | null, parent?: TrieNode) {
    this.value = value;
    this.children = {};
    this.parent = parent;
  }

  addChildNode(char: string) {
    this.children[char] = new TrieNode(char, this);
  }
}

export class Trie {
  root: TrieNode;
  constructor() {
    this.root = new TrieNode(null);
  }

  insert(value: string) {
    let current = this.root;
    for (let i = 0; i < value.length; i++) {
      if (!current.children[value[i]]) {
        current.addChildNode(value[i]);
      }
      current = current.children[value[i]];
    }
  }

  insertMany(values: string[]) {
    values.forEach(value => this.insert(value));
  }

  stringExists(value: string): boolean {
    if (value.length === 0) return false;

    let current = this.root;
    for (let i = 0; i < value.length; i++) {
      if (!current.children[value[i]]) return false;
      current = current.children[value[i]];
    }
    return true;
  }
}

export default Trie;