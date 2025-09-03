
import { Tree, prettyPrint } from './binarySearchTrees.js';
// Test all the new methods
const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const myTree = new Tree(testArray);

console.log("Original tree:");
prettyPrint(myTree.root);

// Let's also see what the sorted, unique array looks like
const sortedUnique = [...new Set(testArray)].sort((a, b) => a - b);
console.log("\nSorted array without duplicates:", sortedUnique);
console.log("Root node value:", myTree.root.data);

// Test insertion
console.log("\nAfter inserting 6:");
myTree.insert(6);
prettyPrint(myTree.root);

// Test deletion cases
console.log("\nAfter deleting leaf node 1:");
myTree.deleteItem(1);
prettyPrint(myTree.root);

console.log("\nAfter deleting node with two children (8):");
myTree.deleteItem(8);
prettyPrint(myTree.root);

console.log("\nAfter deleting node with one child (67):");
myTree.deleteItem(67);
prettyPrint(myTree.root);

// Test find
console.log("\nTesting find(9):");
const foundNode = myTree.find(9);
console.log(foundNode ? `Found: ${foundNode.data}` : "Not found");

// Test levelOrder traversal
console.log("\nLevel order traversal (Breadth-first):");
myTree.levelOrderForEach(node => console.log(node.data));

// Test depth-first traversals
console.log("\nIn-order traversal (Sorted order):");
myTree.inOrderForEach(node => console.log(node.data));

console.log("\nPre-order traversal (Root first):");
myTree.preOrderForEach(node => console.log(node.data));

console.log("\nPost-order traversal (Root last):");
myTree.postOrderForEach(node => console.log(node.data));

// Test error handling
try {
  myTree.inOrderForEach(); // Should throw error
} catch (error) {
  console.log("\nError caught:", error.message);
}


console.log("Is balanced:", myTree.isBalanced());

// Test height and depth
console.log("\nHeight of root:", myTree.height(myTree.root.data));
console.log("Depth of root:", myTree.depth(myTree.root.data));
console.log("Height of 67:", myTree.height(67));
console.log("Depth of 67:", myTree.depth(67));

// Unbalance the tree by adding many values
console.log("\nUnbalancing the tree...");
myTree.insert(100);
myTree.insert(200);
myTree.insert(300);
myTree.insert(400);

console.log("Tree after insertions:");
prettyPrint(myTree.root);
console.log("Is balanced:", myTree.isBalanced());

// Rebalance the tree
console.log("\nRebalancing the tree...");
myTree.rebalance();

console.log("Tree after rebalancing:");
prettyPrint(myTree.root);
console.log("Is balanced:", myTree.isBalanced());