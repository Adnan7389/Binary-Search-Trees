# Binary-Search-Trees
```markdown
# Binary Search Trees Project

A comprehensive implementation of balanced binary search trees in JavaScript, featuring all essential operations and traversal methods.

## Features

### Core Data Structures
- **Node Class**: Fundamental building block with data, left, and right pointers
- **Tree Class**: Manages the BST with automatic balancing capabilities

### Operations
- **Insertion**: Add new values while maintaining BST properties
- **Deletion**: Remove nodes with support for all three cases (leaf, single child, two children)
- **Search**: Find nodes by value with O(log n) efficiency
- **Rebalancing**: Automatically balance unbalanced trees

### Traversal Methods
- **Level Order**: Breadth-first traversal using iterative queue approach
- **In Order**: Depth-first traversal that returns values in sorted order
- **Pre Order**: Root-first depth-first traversal
- **Post Order**: Root-last depth-first traversal

### Tree Analysis
- **Height Calculation**: Find the longest path from any node to a leaf
- **Depth Calculation**: Measure distance from root to any node
- **Balance Checking**: Verify if tree meets balance conditions at every node

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd binary-search-trees

# Install dependencies (if using Jest for testing)
npm install
```

## Usage

```javascript
import { Tree, prettyPrint } from './binarySearchTrees.js';

// Create a balanced BST from an array
const numbers = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const bst = new Tree(numbers);

// Visualize the tree
prettyPrint(bst.root);

// Insert new values
bst.insert(100);
bst.insert(200);

// Delete values
bst.deleteItem(23);

// Check if tree is balanced
console.log('Is balanced:', bst.isBalanced());

// Rebalance if needed
if (!bst.isBalanced()) {
    bst.rebalance();
}

// Traverse the tree
console.log('In-order traversal:');
bst.inOrderForEach(node => console.log(node.data));

// Find nodes
const found = bst.find(67);
console.log('Found node:', found ? found.data : 'Not found');

// Get height and depth
console.log('Height of root:', bst.height(bst.root.data));
console.log('Depth of value 8:', bst.depth(8));
```

## API Reference

### Tree Constructor
```javascript
const bst = new Tree(array); // Creates balanced BST from array
```

### Main Methods
- `insert(value)` - Insert a new value
- `deleteItem(value)` - Remove a value
- `find(value)` - Find and return node
- `isBalanced()` - Check if tree is balanced
- `rebalance()` - Rebalance the tree
- `height(value)` - Get height of node
- `depth(value)` - Get depth of node

### Traversal Methods
- `levelOrderForEach(callback)` - Breadth-first traversal
- `inOrderForEach(callback)` - Sorted order traversal
- `preOrderForEach(callback)` - Root-first traversal
- `postOrderForEach(callback)` - Root-last traversal

## Example Output

```
      4
    /   \
   2     6
  / \   / \
 1   3 5   7

Level Order: [4, 2, 6, 1, 3, 5, 7]
In Order: [1, 2, 3, 4, 5, 6, 7]
Pre Order: [4, 2, 1, 3, 6, 5, 7]
Post Order: [1, 3, 2, 5, 7, 6, 4]
```

## Time Complexity

| Operation | Average Case | Worst Case |
|-----------|-------------|------------|
| Insert    | O(log n)    | O(n)       |
| Delete    | O(log n)    | O(n)       |
| Search    | O(log n)    | O(n)       |
| Traversal | O(n)        | O(n)       |
| Rebalance | O(n)        | O(n)       |

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

The test suite includes comprehensive unit tests for all functionality including edge cases and error handling.

## Key Features

- **Automatic Duplicate Handling**: Removes duplicates during tree construction
- **Self-Balancing**: Built-in rebalancing functionality
- **Comprehensive API**: Full set of BST operations
- **Visualization**: Built-in pretty print for tree visualization
- **Error Handling**: Proper error messages for invalid operations

## Learning Objectives

This project demonstrates:
- Binary search tree data structure
- Tree traversal algorithms
- Recursive programming patterns
- Balance maintenance in BSTs
- Time complexity analysis
- Test-driven development

## License

MIT License - feel free to use this code for learning and development purposes.
```