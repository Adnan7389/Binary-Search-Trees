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