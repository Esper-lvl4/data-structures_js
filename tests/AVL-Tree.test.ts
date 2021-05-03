import { assertEquals } from "https://deno.land/std@0.84.0/testing/asserts.ts";
import AVLTree from "../structures/AVL-Tree.ts";

Deno.test("AVL Tree - methods", () => {
  const tree: AVLTree<number> = new AVLTree(13);
  tree.insert(10);
  tree.insert(15);
  tree.insert(16);
  tree.insert(11);
  tree.insert(5);
  tree.insert(4);
  tree.insert(8);

  const balances = [-1, -1, 0, 0, 0, 0, 1, 0];
  let i = 0;
  for (const node of tree.traversePreOrderNode(tree.root)) {
    console.log(`value: ${node.value}; balance: ${node.balance}`);
    assertEquals(node.balance, balances[i]);
    i++;
  }

  console.log('-----------------------');

  tree.insert(3);
  i = 0;
  const secondBalances = [-2, -2, -1, -1, 0, 0, 0, 1, 0];
  for (const node of tree.traversePreOrderNode(tree.root)) {
    console.log(`value: ${node.value}; balance: ${node.balance}`);
    assertEquals(node.balance, secondBalances[i]);
    i++;
  }
  
});