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
        this.root = buildTree(uniqueArray);
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