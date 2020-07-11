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
