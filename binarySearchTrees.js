class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        // Remove duplicates and sort the array
        const uniqueArray = [...new Set(array)].sort((a, b) => a - b);
        // Set root to the return value of buildTree
        this.root = this.buildTree(uniqueArray);
    }

    buildTree(sortedArray) {
    if (sortedArray.length === 0) return null;

    const mid = Math.floor(sortedArray.length / 2);
    const newNode = new Node(sortedArray[mid]);
    
    newNode.left = this.buildTree(sortedArray.slice(0, mid));
    newNode.right = this.buildTree(sortedArray.slice(mid + 1));

    return newNode;
  }

  insert(value) {
    this.root = this.#insertRec(this.root, value);
  }

  #insertRec(node, value) {
    // Base case: null node, create new node
    if (node === null) {
      return new Node(value);
    }
    // No duplicates: skip if value exists
    if (value === node.data) {
      return node;
    }
    // Traverse left or right based on value
    if (value < node.data) {
      node.left = this.#insertRec(node.left, value);
    } else {
      node.right = this.#insertRec(node.right, value);
    }
    return node;
  }

  deleteItem(value) {
    this.root = this.#deleteRec(this.root, value);
  }

  #deleteRec(node, value) {
    // Base case: node not found or empty tree
    if (node === null) {
      return null;
    }
    // Find the node to delete
    if (value < node.data) {
      node.left = this.#deleteRec(node.left, value);
    } else if (value > node.data) {
      node.right = this.#deleteRec(node.right, value);
    } else {
      // Node found: handle deletion cases
      // Case 1: Leaf node
      if (node.left === null && node.right === null) {
        return null;
      }
      // Case 2: Node with one child
      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      }
      // Case 3: Node with two children
      const successor = this.#findMin(node.right);
      node.data = successor.data;
      node.right = this.#deleteRec(node.right, successor.data);
    }
    return node;
  }

  #findMin(node) {
    // Find the smallest value in the subtree (leftmost node)
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  find(value) {
    return this.#findRecursive(this.root, value);
  }

  #findRecursive(node, value) {
    if (node === null) {
      return null; // Value not found
    }

    if (value === node.data) {
      return node; // Found it!
    }

    // Recursively search left or right subtree
    if (value < node.data) {
      return this.#findRecursive(node.left, value);
    } else {
      return this.#findRecursive(node.right, value);
    }
  }

  levelOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback function is required');
    }

    if (this.root === null) return;

    const queue = [this.root];

    while (queue.length > 0) {
      const currentNode = queue.shift(); // Get first node from queue
      callback(currentNode);

      // Add children to the end of the queue
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
  }

  levelOrderForEachRecursive(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback function is required');
    }

    const processLevel = (nodes) => {
      if (nodes.length === 0) return;

      const nextLevel = [];
      
      // Process all nodes at current level
      for (const node of nodes) {
        callback(node);
        
        // Collect children for next level
        if (node.left !== null) nextLevel.push(node.left);
        if (node.right !== null) nextLevel.push(node.right);
      }

      // Process next level
      processLevel(nextLevel);
    };

    if (this.root !== null) {
      processLevel([this.root]);
    }
  }

  inOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback function is required');
    }
    this.#inOrderRecursive(this.root, callback);
  }

  #inOrderRecursive(node, callback) {
    if (node === null) return;

    this.#inOrderRecursive(node.left, callback); // Left
    callback(node);                              // Root
    this.#inOrderRecursive(node.right, callback); // Right
  }

  preOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback function is required');
    }
    this.#preOrderRecursive(this.root, callback);
  }

  #preOrderRecursive(node, callback) {
    if (node === null) return;

    callback(node);                              // Root
    this.#preOrderRecursive(node.left, callback); // Left
    this.#preOrderRecursive(node.right, callback); // Right
  }

  postOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback function is required');
    }
    this.#postOrderRecursive(this.root, callback);
  }

  #postOrderRecursive(node, callback) {
    if (node === null) return;

    this.#postOrderRecursive(node.left, callback); // Left
    this.#postOrderRecursive(node.right, callback); // Right
    callback(node);                                // Root
  }

  height(value) {
    const node = this.find(value);
    if (node === null) return null;
    return this.#calculateHeight(node);
  }

  #calculateHeight(node) {
    if (node === null) return -1;
    const leftHeight = this.#calculateHeight(node.left);
    const rightHeight = this.#calculateHeight(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(value) {
    return this.#calculateDepth(this.root, value, 0);
  }

  #calculateDepth(node, value, currentDepth) {
    if (node === null) return null;
    if (value === node.data) return currentDepth;
    if (value < node.data) {
      return this.#calculateDepth(node.left, value, currentDepth + 1);
    } else {
      return this.#calculateDepth(node.right, value, currentDepth + 1);
    }
  }

  isBalanced() {
    return this.#checkBalance(this.root) !== -1;
  }

  #checkBalance(node) {
    if (node === null) return 0;
    const leftHeight = this.#checkBalance(node.left);
    const rightHeight = this.#checkBalance(node.right);
    if (leftHeight === -1 || rightHeight === -1) return -1;
    if (Math.abs(leftHeight - rightHeight) > 1) return -1;
    return Math.max(leftHeight, rightHeight) + 1;
  }

  rebalance() {
    const values = [];
    this.inOrderForEach(node => values.push(node.data));
    this.root = this.buildTree(values);
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

export { Node, Tree, prettyPrint };



// Import or include your Tree class and prettyPrint function here
// (Assuming they're in the same file for this example)

// Function to generate random array
function generateRandomArray(length, max) {
  return Array.from({ length }, () => Math.floor(Math.random() * max));
}

// Main driver function
function demonstrateBST() {
  console.log("=== BINARY SEARCH TREE DEMONSTRATION ===\n");
  
  // 1. Create array of random numbers < 100
  const randomArray = generateRandomArray(15, 100);
  console.log("1. Generated random array:", randomArray);
  
  // 2. Create BST from random array
  const bst = new Tree(randomArray);
  console.log("2. Created BST from array");
  prettyPrint(bst.root);
  
  // 3. Confirm tree is balanced
  console.log("3. Is tree balanced?", bst.isBalanced());
  
  // 4. Print elements in different orders
  console.log("\n4. Tree Traversals:");
  
  console.log("Level Order:");
  const levelOrder = [];
  bst.levelOrderForEach(node => levelOrder.push(node.data));
  console.log(levelOrder);
  
  console.log("Pre Order:");
  const preOrder = [];
  bst.preOrderForEach(node => preOrder.push(node.data));
  console.log(preOrder);
  
  console.log("Post Order:");
  const postOrder = [];
  bst.postOrderForEach(node => postOrder.push(node.data));
  console.log(postOrder);
  
  console.log("In Order (Sorted):");
  const inOrder = [];
  bst.inOrderForEach(node => inOrder.push(node.data));
  console.log(inOrder);
  
  // 5. Unbalance the tree by adding numbers > 100
  console.log("\n5. Unbalancing the tree...");
  const largeNumbers = [150, 200, 250, 300, 350, 400];
  largeNumbers.forEach(num => {
    bst.insert(num);
    console.log(`Inserted ${num}`);
  });
  
  console.log("Tree after inserting large numbers:");
  prettyPrint(bst.root);
  
  // 6. Confirm tree is unbalanced
  console.log("6. Is tree balanced after large inserts?", bst.isBalanced());
  
  // 7. Balance the tree
  console.log("\n7. Rebalancing the tree...");
  bst.rebalance();
  console.log("Tree after rebalancing:");
  prettyPrint(bst.root);
  
  // 8. Confirm tree is balanced again
  console.log("8. Is tree balanced after rebalance?", bst.isBalanced());
  
  // 9. Print elements in different orders again
  console.log("\n9. Tree Traversals after rebalance:");
  
  console.log("Level Order:");
  const levelOrder2 = [];
  bst.levelOrderForEach(node => levelOrder2.push(node.data));
  console.log(levelOrder2);
  
  console.log("Pre Order:");
  const preOrder2 = [];
  bst.preOrderForEach(node => preOrder2.push(node.data));
  console.log(preOrder2);
  
  console.log("Post Order:");
  const postOrder2 = [];
  bst.postOrderForEach(node => postOrder2.push(node.data));
  console.log(postOrder2);
  
  console.log("In Order (Sorted):");
  const inOrder2 = [];
  bst.inOrderForEach(node => inOrder2.push(node.data));
  console.log(inOrder2);
  
  // Bonus: Demonstrate other methods
  console.log("\n=== BONUS: ADDITIONAL OPERATIONS ===");
  
  // Find operation
  const searchValue = randomArray[Math.floor(randomArray.length / 2)];
  const foundNode = bst.find(searchValue);
  console.log(`\nFind ${searchValue}:`, foundNode ? `Found (${foundNode.data})` : "Not found");
  
  // Height and depth
  console.log(`Height of root: ${bst.height(bst.root.data)}`);
  console.log(`Depth of root: ${bst.depth(bst.root.data)}`);
  
  // Delete operation
  const deleteValue = randomArray[0];
  console.log(`\nDeleting ${deleteValue}...`);
  bst.deleteItem(deleteValue);
  console.log(`In-order after deleting ${deleteValue}:`);
  const afterDelete = [];
  bst.inOrderForEach(node => afterDelete.push(node.data));
  console.log(afterDelete);
}

// Run the demonstration
demonstrateBST();