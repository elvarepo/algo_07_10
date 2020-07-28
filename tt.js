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

// Longest Polindrom Substring
function longestPalindromicSubstring(string) {
  let curLongest = [0, 1];
	for(let i = 1; i < string.length; i++){
		let odd = getLongestPalindrom(string, i - 1, i + 1);
		let even = getLongestPalindrom(string, i - 1, i);
		let longest = odd[1] - odd[0] > even[1] - even[0] ? odd : even;
		curLongest = curLongest[1] - curLongest[0] > longest[1] - longest[0] ? curLongest : longest;
	}
	return string.slice(curLongest[0], curLongest[1]);
}

function getLongestPalindrom(string, leftIdx, rightIdx){
	while(leftIdx >= 0 && rightIdx < string.length){
		if(string[leftIdx] !== string[rightIdx]) break;
		leftIdx--;
		rightIdx++;
	}
	return [leftIdx + 1, rightIdx];
}

// Balanced Brackets
function balancedBrackets(string) {
  let stack = [];
	let matchBrackets = {')':'(',']':'[','}':'{'};
	for(let i = 0; i < string.length; i++){
		if(matchBrackets[string[i]]){
      if(stack.length == 0) return false;
			if(matchBrackets[string[i]] == stack[stack.length -1]) {
				stack.pop();
			} else {
				return false
			}
		} else if(string[i] == '(' || string[i] == '{' || string[i] == '[' ){
			stack.push(string[i]);
		}
	}
		return stack.length == 0;
}

// Boggle Board
function boggleBoard(board, words) {
  let trie = new Trie3();
	for(let word of words){
		trie.add(word);
	}
	let finalWords = {};
	let visited = board.map(row => row.map(letter => false));
	for(let i = 0; i < board.length; i++){
		for(let j = 0; j < board[i].length; j++){
			if(trie.root[board[i][j]] && visited[i][j] == false){
			explore(i, j, board, trie.root, visited, finalWords);
			}
		}
	}
	return Object.keys(finalWords);
}
function explore(i, j, board, node, visited, finalWords){
	if(visited[i][j]) return;
	let char = board[i][j];
	if(!node[char]) return;
	visited[i][j] = true;
	node = node[char];
	if('*' in node) finalWords[node['*']] = true;
	let neighbors = getNeighbors(i, j, board);
	for(let n of neighbors){
		explore(n[0], n[1], board, node, visited, finalWords);
	}
	visited[i][j] = false;
}

function getNeighbors(i, j, board){
	let neighbors = [];
	if(i > 0 && j > 0) {
		neighbors.push([i - 1, j - 1]);
	}
	if(i > 0 && j < board[0].length - 1){
		neighbors.push([i - 1, j + 1]);
	}
	if(i < board.length - 1 && j < board[0].length - 1){
		neighbors.push([i + 1, j + 1]);
	}
	if(i < board.length - 1 && j > 0){
		neighbors.push([i + 1, j - 1]);
	}
	if(i > 0){
		neighbors.push([i - 1, j])
	}
	if(i < board.length - 1){
		neighbors.push([i + 1, j])
	}
	if(j > 0){
		neighbors.push([i, j - 1])
	}
	if(j < board[0].length - 1){
		neighbors.push([i, j + 1]);
	}
	return neighbors;
}

class Trie3{
	constructor(){
		this.root = {};
		this.endSymbol = "*"
	}
	add(word){
		let cur = this.root;
		for(let char of word){
			if(!cur[char]) cur[char] = {};
			cur = cur[char];
		}
		cur[this.endSymbol] = word;
	}
}

// Reverse string
function reverse(str){
  if(str.length == 1 && str.length ==0) return true;
  let left = 0;
  let right = str.length - 1;
  while(left < right){
    if(str[left] !== str[right]) return false;
    left++;
    right--
  }
  return true;
}

// Find Missing Number between two arrays
function findMissing(arr1, arr2){
  if(arr1.length < arr2.length) return findMissing(arr2, arra1)
  if(arr1.length == 0 && arr2.length ==0) return 'no missing number';
  if(arr1.length == 0 || arr2.length ==1) return arr2[0];
  if(arr1.length == 1 || arr2.length ==0) return arr1[0];
  let obj = {};
  for(let i = 0; i < arr2.length; i++){
    obj[arr2[i]] = i;
  }
  for(let i = 0; i < arr1.length; i++){
    if(!(arr1[i] in obj)) {
      return arr1[i];
    }
  }
  return "no missing number";
}

// Sum to Target
function matchPair(arr, target){
  if(target == 0 ) return "target number is zero";
  if(arr.length < 2) return "array length is less than two"
  let obj = {};
  for(let i = 0; i < arr.length; i++){
    let dif = target - arr[i];
    if(dif in obj && obj[dif] !== i){
      return [dif, arr[i]]
    }
    obj[arr[i]] = i;
  }
  return "No matched pairs";
}

// branch sums
class BianryTree{
  constructor(value){
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
function branchSums(root) {
  let res = [];
  dfs(root, res, 0)
  return res;
}
function dfs(root,res, sum){
  if(!root) return;
  sum += root.value;
  if(!root.left && !root.right) {
    res.push(sum);
    return;
  }
  dfs(root.left, res, sum)
  dfs(root.right, res, sum)
}


// node Depths
function nodeDepths(root) {
  // let depthSum = dfs(root, 0);
  // return  depthSum;
	return dfs0(root, 0)
}
 function dfs0(node, res){
	if(!node) return 0;
	return res + dfs0(node.left, res + 1) + dfs0(node.right, res + 1)
 }

var maxPathSum1 = function(root) {
  return helper(root)[1];
};

function helper(root) {
  if (!root) {
    return [-Infinity, -Infinity];
  }
  const left = helper(root.left);
  const right = helper(root.right);
  const localMax = root.val + Math.max(left[0], right[0], 0);
  const globalMax = Math.max(root.val + left[0] + right[0], localMax, left[1], right[1]);
  return [localMax, globalMax];
}

//  Right Sibling Tree
function rightSiblingTree(root) {
  mutate(root, null, null);
	return root;
}
function mutate(node, parent, isLeftChild){
	if(node === null) return;
	let {left, right} = node
	mutate(left, node, true);
	if(parent == null){   
		node.right = null;
	} else if(isLeftChild){   
		node.right = parent.right;
	} else {			
		if(parent.right === null){
			node.right = null;
		} else {
			node.right = parent.right.left;
		}
	}
	mutate(right, node, false)
}
// 


//  Min Number of Jumps
function minNumberOfJumps(array) {
  let chainEnd = 0;
	let farthest = 0;
	let jumps = 0;
	for (let i = 0; i < array.length - 1; i++) {
    console.log(i, chainEnd,farthest);
		if (i + array[i] > farthest) farthest = i + array[i];
		if (i === chainEnd) {
			jumps++;
			chainEnd = farthest;
		}
      console.log(i, chainEnd,farthest, jumps);
      console.log();
	}
	return jumps;
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


// island size
function islandsSize(matrix){
  if(matrix.length == 0) return 0;
  let res = [];
  let r = matrix.length, c = matrix[0].length;
  let grid = matrix.slice()
  for(let i = 0; i < r; i++){
    for(let j = 0; j < c; j++){
      if(grid[i][j] == 1){
        res.push( dfs(grid, i,j) );
      }
    }
  }
  return res;
} 
function dfs(grid, i, j){

  if(i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] !== 1) return 0;
  grid[i][j] = 0;
  return 1 + dfs(grid, i - 1, j) + dfs(grid, i + 1, j)
           + dfs(grid, i, j - 1) + dfs(grid, i, j + 1)
           + dfs(grid, i - 1, j - 1) + dfs(grid, i + 1, j + 1)
           + dfs(grid, i + 1, j - 1) + dfs(grid, i - 1, j + 1)
}


// Goat Latin
var toGoatLatin2 = function(S) {   //  this is mine
    let s = S.split(' ');
    for(let i = 0; i < s.length; i++){
        if(!isVowel(s[i])){
            s[i] = s[i].substr(1) + s[i][0];
        }
        s[i] += 'ma'
        for (let j = 0; j <= i; j++) {
                   s[i] += 'a'
               }
    }
    return s.join(' ');
};

function isVowel(word){
    let c = word[0].toLowerCase();
    return (c == "a" ||c == "e" || c == "i"|| c == "o" || c == "u" )
}

// Integer to Roman
var intToRoman11 = function(num) {
    let values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    let index = 0;
    let romanNum = "";

    while (num > 0) {
        if (num >= values[index]) {
            num -= values[index];
            romanNum += symbols[index];
        } else index++;
    }
    return romanNum;
};


// Maximum Difference Between Nodes and Ancestor
var maxAncestorDiff = function(root) {
    if (!root) return 0;
    return traverse(root, root.val, root.val)
    
};

var traverse = function(node, min, max){
    if (!node) return max - min
    
    if (node.val < min) min = node.val
    if (node.val > max) max = node.val
    
    let left = traverse(node.left, min, max)
    let right = traverse(node.right, min, max)
    
    return Math.max(left, right)
}
