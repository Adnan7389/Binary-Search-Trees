import { Tree, prettyPrint } from './binarySearchTrees.js';

describe('Binary Search Tree Implementation', () => {
  let bst;

  beforeEach(() => {
    // Create a fresh BST for each test
    const testArray = [50, 30, 70, 20, 40, 60, 80];
    bst = new Tree(testArray);
  });

  describe('Tree Construction', () => {
    test('should build a balanced BST from array', () => {
      expect(bst.root.data).toBe(50);
      expect(bst.root.left.data).toBe(30);
      expect(bst.root.right.data).toBe(70);
    });

    test('should remove duplicates and sort array', () => {
      const arrayWithDuplicates = [5, 3, 7, 3, 5, 8, 5];
      const uniqueBST = new Tree(arrayWithDuplicates);
      
      // Should have 4 unique elements: [3, 5, 7, 8]
      const values = [];
      uniqueBST.inOrderForEach(node => values.push(node.data));
      expect(values).toEqual([3, 5, 7, 8]);
    });

    test('should handle empty array', () => {
      const emptyBST = new Tree([]);
      expect(emptyBST.root).toBeNull();
    });
  });

  describe('Insert Operation', () => {
    test('should insert values correctly', () => {
      bst.insert(35);
      expect(bst.find(35)).not.toBeNull();
      expect(bst.root.left.right.data).toBe(40); // Right child of 30
    });

    test('should not insert duplicates', () => {
      const initialSize = getTreeSize(bst);
      bst.insert(50); // Duplicate of root
      expect(getTreeSize(bst)).toBe(initialSize); // Size should not change
    });

    test('should maintain BST property after insertion', () => {
      bst.insert(25);
      // 25 should be left child of 30
      expect(bst.root.left.left.right.data).toBe(25);
    });
  });

  describe('Delete Operation', () => {
    test('should delete leaf nodes', () => {
      bst.deleteItem(20);
      expect(bst.find(20)).toBeNull();
      expect(bst.root.left.left).toBeNull();
    });

    test('should delete nodes with one child', () => {
      // Add a node to make 40 have one child
      bst.insert(35);
      bst.deleteItem(40);
      expect(bst.find(40)).toBeNull();
      expect(bst.root.left.right.data).toBe(35);
    });

    test('should delete nodes with two children', () => {
      bst.deleteItem(30);
      expect(bst.find(30)).toBeNull();
      // Should be replaced by inorder successor (35 if we had it, or 40)
      expect(bst.root.left.data).toBe(40);
    });

    test('should handle deleting non-existent values', () => {
      const initialSize = getTreeSize(bst);
      bst.deleteItem(999);
      expect(getTreeSize(bst)).toBe(initialSize); // Size should not change
    });
  });

  describe('Find Operation', () => {
    test('should find existing nodes', () => {
      const foundNode = bst.find(50);
      expect(foundNode).not.toBeNull();
      expect(foundNode.data).toBe(50);
    });

    test('should return null for non-existent values', () => {
      expect(bst.find(999)).toBeNull();
    });

    test('should return the actual node object', () => {
      const node = bst.find(30);
      expect(node).toHaveProperty('data');
      expect(node).toHaveProperty('left');
      expect(node).toHaveProperty('right');
    });
  });

  describe('Tree Traversals', () => {
    test('levelOrderForEach should traverse breadth-first', () => {
      const result = [];
      bst.levelOrderForEach(node => result.push(node.data));
      // Level order: 50, 30, 70, 20, 40, 60, 80
      expect(result).toEqual([50, 30, 70, 20, 40, 60, 80]);
    });

    test('inOrderForEach should return sorted order', () => {
      const result = [];
      bst.inOrderForEach(node => result.push(node.data));
      expect(result).toEqual([20, 30, 40, 50, 60, 70, 80]);
    });

    test('preOrderForEach should traverse root first', () => {
      const result = [];
      bst.preOrderForEach(node => result.push(node.data));
      // Pre-order: 50, 30, 20, 40, 70, 60, 80
      expect(result).toEqual([50, 30, 20, 40, 70, 60, 80]);
    });

    test('postOrderForEach should traverse root last', () => {
      const result = [];
      bst.postOrderForEach(node => result.push(node.data));
      // Post-order: 20, 40, 30, 60, 80, 70, 50
      expect(result).toEqual([20, 40, 30, 60, 80, 70, 50]);
    });

    test('should throw error if no callback provided', () => {
      expect(() => bst.levelOrderForEach()).toThrow('Callback function is required');
      expect(() => bst.inOrderForEach()).toThrow('Callback function is required');
    });
  });

  describe('Height and Depth Calculations', () => {
    test('should calculate height correctly', () => {
      // Root height should be 2 (longest path: 50 -> 70 -> 80)
      expect(bst.height(50)).toBe(2);
      // Leaf height should be 0
      expect(bst.height(20)).toBe(0);
    });

    test('should calculate depth correctly', () => {
      // Root depth should be 0
      expect(bst.depth(50)).toBe(0);
      // Depth of direct children should be 1
      expect(bst.depth(30)).toBe(1);
      expect(bst.depth(70)).toBe(1);
      // Depth of leaves should be 2
      expect(bst.depth(20)).toBe(2);
    });

    test('should return null for non-existent values', () => {
      expect(bst.height(999)).toBeNull();
      expect(bst.depth(999)).toBeNull();
    });
  });

  describe('Balance Checking', () => {
    test('should identify balanced trees', () => {
      expect(bst.isBalanced()).toBe(true);
    });

    test('should identify unbalanced trees', () => {
      // Make tree unbalanced by adding many values to one side
      bst.insert(90);
      bst.insert(100);
      bst.insert(110);
      expect(bst.isBalanced()).toBe(false);
    });

    test('should check balance at every node, not just root', () => {
      // Create a truly unbalanced tree by manual insertion
      // Start with empty tree and insert in sorted order (worst case)
      const manualUnbalancedBST = new Tree([]);
      
      // Insert values in sorted order to create a linked list (unbalanced)
      [5, 10, 20, 30, 40, 50, 60].forEach(val => {
        manualUnbalancedBST.insert(val);
      });
      
      expect(manualUnbalancedBST.isBalanced()).toBe(false);
    });
  });

  describe('Rebalancing', () => {
    test('should rebalance an unbalanced tree', () => {
      // Make tree unbalanced
      bst.insert(90);
      bst.insert(100);
      bst.insert(110);
      expect(bst.isBalanced()).toBe(false);

      // Rebalance
      bst.rebalance();
      expect(bst.isBalanced()).toBe(true);
    });

    test('should maintain all values after rebalancing', () => {
      const valuesBefore = [];
      bst.inOrderForEach(node => valuesBefore.push(node.data));
      
      bst.rebalance();
      
      const valuesAfter = [];
      bst.inOrderForEach(node => valuesAfter.push(node.data));
      
      expect(valuesAfter).toEqual(valuesBefore);
    });

    test('should produce a balanced tree structure', () => {
      bst.insert(90);
      bst.insert(100);
      bst.rebalance();
      
      // Check that left and right subtrees have similar heights
      const leftHeight = bst.height(bst.root.left.data);
      const rightHeight = bst.height(bst.root.right.data);
      expect(Math.abs(leftHeight - rightHeight)).toBeLessThanOrEqual(1);
    });
  });

  describe('Edge Cases', () => {
    test('should handle single node trees', () => {
      const singleNodeBST = new Tree([42]);
      expect(singleNodeBST.root.data).toBe(42);
      expect(singleNodeBST.isBalanced()).toBe(true);
      expect(singleNodeBST.height(42)).toBe(0);
      expect(singleNodeBST.depth(42)).toBe(0);
    });

    test('should handle operations on empty trees', () => {
      const emptyBST = new Tree([]);
      expect(emptyBST.find(42)).toBeNull();
      expect(emptyBST.isBalanced()).toBe(true);
      expect(() => emptyBST.levelOrderForEach(() => {})).not.toThrow();
    });

    test('should handle large numbers', () => {
      bst.insert(1000);
      bst.insert(-50);
      expect(bst.find(1000)).not.toBeNull();
      expect(bst.find(-50)).not.toBeNull();
    });
  });
});

// Helper function to get the size of the tree (number of nodes)
function getTreeSize(tree) {
  let size = 0;
  tree.inOrderForEach(() => size++);
  return size;
}