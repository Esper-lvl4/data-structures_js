import { assertEquals } from "https://deno.land/std@0.84.0/testing/asserts.ts";
import AVLTree from "../structures/AVL-Tree.ts";

function checkBalances(balances: number[], tree: AVLTree<number>) {
  let i = 0;
  for (const node of tree.traversePreOrderNode(tree.root)) {
    assertEquals(node.balance, balances[i], `value: ${node.value}; balance: ${node.balance}; index: ${i};\
 expectedBalance: ${balances[i]}`);
    i++;
  }
}

Deno.test("AVL Tree - Left-Right rotation", () => {
  const tree: AVLTree<number> = new AVLTree(13);

  tree.insert(10);
  checkBalances([-1, 0], tree);
  tree.insert(15);
  checkBalances([0, 0, 0], tree);
  tree.insert(16);
  checkBalances([1, 0, 1, 0], tree);
  tree.insert(11);
  checkBalances([0, 1, 0, 1, 0], tree);
  tree.insert(5);
  checkBalances([0, 0, 0, 0, 1, 0], tree);
  tree.insert(4);
  checkBalances([-1, -1, -1, 0, 0, 1, 0], tree);
  tree.insert(6);
  checkBalances([-1, -1, 0, 0, 0, 0, 1, 0], tree);
  tree.insert(7);
  console.log(tree.root?.left?.left?.right);
  checkBalances([-1, 0, -1, 0, 0, 0, 0, 1, 0], tree);
});

Deno.test("AVL Tree - Right-Left rotation", () => {
  const tree: AVLTree<number> = new AVLTree(5);

  tree.insert(2);
  checkBalances([-1, 0], tree);
  tree.insert(7);
  checkBalances([0, 0, 0], tree);
  tree.insert(1);
  checkBalances([-1, -1, 0, 0], tree);
  tree.insert(4);
  checkBalances([-1, 0, 0, 0, 0], tree);
  tree.insert(6);
  checkBalances([0, 0, 0, 0, -1, 0], tree);
  tree.insert(9);
  checkBalances([0, 0, 0, 0, 0, 0, 0], tree);
  tree.insert(3);
  checkBalances([-1, 1, 0, -1, 0, 0, 0, 0], tree);
  tree.insert(16);
  checkBalances([0, 1, 0, -1, 0, 1, 0, 1, 0], tree);
  tree.insert(15);
  checkBalances([0, 1, 0, -1, 0, 1, 0, 0, 0, 0], tree);
});