class BSTNode {
  constructor({ key, value, parent, left, right }) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(Node = BSTNode) {
    this.Node = Node;
    this._count = 0;
    this._root = undefined;
  }

  insert(key, value = true) {

    if (this._root === undefined) {
      this._root = new this.Node({key, value, undefined, undefined, undefined});
      this._count += 1;
      return 
    } 
    
    let node = this._root;
    while (node) {
      if (node.key === key) {
        node.value = value
        return
      } else if (node.key > key && node.left != undefined) {
        node = node.left;
      } else if (node.key < key && node.right != undefined) {
        node = node.right
      } else {
        const newNode = new this.Node({key, value, node, undefined, undefined})
        this._count += 1
        if (key > node.key) {
          node.right = newNode;
        } else {
          node.left = newNode;
        }
        return
      }
    }
  }

  insertHelper(targetKey, currNode, newValue) {
    if (targetKey === currNode.key) {
      currNode.value = newValue;
      return 
    } else if (currNode.key > targetKey && currNode.left != undefined) {
      this.insertHelper(targetKey, currNode.left, newValue);
    } else if  (currNode.key < targetKey && currNode.right != undefined) {
      this.insertHelper(targetKey, currNode.right, newValue);
    } else { // curr.left or curr.right is undefined

      const newNode = new this.Node({targetKey, newValue, currNode, undefined, undefined});
      if (targetKey < currNode.key) {
        currNode.left = newNode;
      } else {
        currNode.right = newNode;
      }
      this._count += 1
    }
  }

  lookup(key) {
    let node = this._root;

    while (node) {
      if (key < node.key) {
        node = node.left;
      } else if (key > node.key) {
        node = node.right;
      } else { // equal
        return node.value;
      }
    }
  }

  delete(key) {
    // TODO (tests first!)
  }

  count() {
    return this._count;
  }

  forEach(callback) {
    // This is a little different from the version presented in the video.
    // The form is similar, but it invokes the callback with more arguments
    // to match the interface for Array.forEach:
    //   callback({ key, value }, i, this)
    const visitSubtree = (node, callback, i = 0) => {
      if (node) {
        i = visitSubtree(node.left, callback, i);
        callback({ key: node.key, value: node.value }, i, this);
        i = visitSubtree(node.right, callback, i + 1);
      }
      return i;
    }
    visitSubtree(this._root, callback)
  }
}

export default BinarySearchTree;