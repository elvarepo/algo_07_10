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
