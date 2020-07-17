function groupAnagrams(words) {
    let obj = {}
    let res = [];
    for (let i = 0; i < words.length; i++) {
        if (!obj[words[i].length]) {
            obj[words[i].length] = [words[i]]
        } else {
            obj[words[i].length].push(words[i])
        }
    }
    for (let h in obj) {
        var pattern = obj[h][0].split('').sort().join('');
        var arr = []
        for (var i = 1; i < obj[h].length; i++) {
            var val = obj[h][i];
            if (val.split('').sort().join('') == pattern) {
                arr.push(val);
            }
        }
        res.push(arr);
    }
    return res
}

function largestRange(array) {
    let bestRange = [];
    let longestLength = 0;
    let obj = {}
    for (let n of array) {
        obj[n] = true;
    }

    for (let n of array) {
        if (!obj[n]) continue;
        obj[n] = false;

        let curLength = 1;
        let left = n - 1;
        let right = n + 1;
        while (left in obj) {
            obj[left] = false;
            curLength++;
            left--;
            console.log(left, obj);
        }
        while (right in obj) {
            obj[right] = false;
            curLength++;
            right++;
        }
        if (curLength > longestLength) {
            longestLength = curLength;
            bestRange = [left + 1, right - 1];
        }
    }
    return bestRange;
}

// Apartment Hunting
function apartmentHunting(blocks, reqs) {
  let minFromBlocks = reqs.map(r => getMinDistance(blocks, r))
  let maxAtBloacks = getMaxDistance(blocks, minFromBlocks);
  return getIdxAtMinVal(maxAtBloacks);
}
function getMinDistance(blocks, req){
  let minDistance = new Array(blocks.length);
  let minReqIdx = Infinity;
  for(let i = 0; i < blocks.length; i++){
    if(blocks[i][req]) minReqIdx = i;
    minDistance[i] = Math.abs(i - minReqIdx);
  }
  for(let i = blocks.length - 1; i >= 0; i--){
    if(blocks[i][[req]]) minReqIdx = i;
    minDistance[i] = Math.min(minDistance[i],Math.abs(i - minReqIdx) )
  }
  return minDistance;
}
function getMaxDistance(blocks, minDistance){
  let maxDistanceAtBlocks = new Array(blocks.length);
  for(let i = 0; i < blocks.length; i++){
    let minDisAtBlock = minDistance.map(distances => distances[i]);
    maxDistanceAtBlocks[i] = Math.max(...minDisAtBlock);
  }
  return maxDistanceAtBlocks;
}
function getIdxAtMinVal(arr){
  let idx = 0;
  let minVal = Infinity;
  for(let i = 0; i < arr.length; i++){
    let curVal = arr[i];
    if(curVal < minVal){
	minVal = curVal;
	idx = i;
     }
  }
  return idx;
}

// Flatten Binary Tree
function flattenBinaryTree(root) {
  let inOrderNodes = getNodesInOrder(root,[]);
  for(let i = 0; i < inOrderNodes.length - 1; i++){
    let leftNode = inOrderNodes[i];
    let rightNode = inOrderNodes[i + 1];
    leftNode.right = rightNode;
    rightNode.left = leftNode;
  }
  return inOrderNodes[0]
}
function getNodesInOrder(tree, array){
  if(tree !== null){
		getNodesInOrder(tree.left, array);
    array.push(tree);
    getNodesInOrder(tree.right, array)
	}
  return array;
}

// Iterative In-order Traversal
function iterativeInOrderTraversal(tree, callback) {
  let preNode = null;
  let curNode = tree;
  while(curNode !== null){
    let nextNode;
    if(preNode === null || preNode === curNode.parent){
      if(curNode.left !== null){
        nextNode = curNode.left;
      } else {
        callback(curNode);
        nextNode = curNode.right !== null ? curNode.right : curNode.parent;
      }
    } else if(preNode === curNode.left){
      callback(curNode);
      nextNode = curNode.right !== null ? curNode.right : curNode.parent;
    } else {
      nextNode = curNode.parent;
    }
    preNode = curNode;
    curNode = nextNode;
  }
}

// Water Area
function waterArea(heights) {
  let max = new Array(heights.length).fill(0);
	let leftMax = 0;
	for(let i = 0; i < heights.length; i++){
		let height = heights[i];
		max[i] = leftMax;
		leftMax = Math.max(leftMax, height);
	}
	let rightMax = 0;
	for(let i = heights.length - 1; i >= 0; i--){
		let height = heights[i];
		let minHeight = Math.min(rightMax, max[i]);
		if(height < minHeight){
			max[i] = minHeight - height;
		} else {
			max[i] = 0;
		}
		rightMax = Math.max(rightMax, height);
	}
	return max.reduce((a,b) => a + b, 0)
}

// Accounts Merge
var accountsMerge = function(accounts) {
    const uf = new UnionFind(accounts.length);
    const emails = {};
    const names = {};


    for (let i = 0; i < accounts.length; i++) {
        let acct = accounts[i];
        names[i] = acct[0];

        for (let j = 1; j < acct.length; j++) {
            if (acct[j] in emails) {
                var idx = emails[acct[j]]
                uf.union(idx, i);
            } else {
                emails[acct[j]] = i;
            }
        }
    }

    const disjointSets = {};
    for (let i = 0; i < accounts.length; i++) {
        let acct = accounts[i];
        let parent = uf.find(i);

        if (!disjointSets[parent]) {
            disjointSets[parent] = new Set();
        }

        for (let j = 1; j < acct.length; j++) {
            disjointSets[parent].add(acct[j]);
        }
    }

    const res = [];
    const keys = Object.keys(disjointSets);

    for (let i = 0; i < keys.length; i++) {
        let sortedEmails = [...disjointSets[keys[i]]].sort();
        res.push([names[keys[i]], ...sortedEmails]);
    }

    return res;
};

class UnionFind {
    constructor(size) {
        this.parents = new Array(size);

        for (let i = 0; i < size; i++) {
            this.parents[i] = i;
        }
    }

    find(x) {
        if (this.parents[x] !== x) {
            this.parents[x] = this.find(this.parents[x]);
        }

        return this.parents[x];
    }
    union(a, b) {
        let parentA = this.find(a);
        let parentB = this.find(b);

        if (parentA !== parentB) {
            this.parents[parentA] = parentB;
        }
    }
};
