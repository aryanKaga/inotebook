function edit_distance(memo, pivot1, pivot2, word1, word2) {
    if (pivot1 < 0) return pivot2 + 1; 
    if (pivot2 < 0) return pivot1 + 1; 

    if (memo[pivot1][pivot2] !== -1) {
        return memo[pivot1][pivot2];
    }

    if (word1[pivot1] === word2[pivot2]) {
        memo[pivot1][pivot2] = edit_distance(memo, pivot1 - 1, pivot2 - 1, word1, word2);
    } else {
        let replace = 1 + edit_distance(memo, pivot1 - 1, pivot2 - 1, word1, word2);
        let del = 1 + edit_distance(memo, pivot1 - 1, pivot2, word1, word2);
        let insert = 1 + edit_distance(memo, pivot1, pivot2 - 1, word1, word2);
        memo[pivot1][pivot2] = Math.min(replace, del, insert);
    }

    return memo[pivot1][pivot2];
}

var minDistance = function(word1, word2) {
    let rows = word1.length;
    let cols = word2.length;
    
    // Optimized memo initialization
    let memo = Array.from({ length: rows }, () => Array(cols).fill(-1));

    return edit_distance(memo, rows - 1, cols - 1, word1, word2);
};

export function matchedFiles({ filesArr, searchDoc, setFilesArr }) {
    const mapFile = new Map();

    if (!filesArr || filesArr.length === 0) {
        setFilesArr([]);
        console.log('Files array is empty.');
        return;
    }

    filesArr.forEach(element => {
        const score = minDistance(element.title, searchDoc);

        // Ensure array exists before pushing
        if (!mapFile.has(score)) {
            mapFile.set(score, []);
        }
        mapFile.get(score).push(element);
    });

    // Sort scores in ascending order
    const sortedKeys = [...mapFile.keys()].sort((a, b) => a - b);

    // Collect files based on sorted scores
    let newfilesArr = sortedKeys.flatMap(key => mapFile.get(key));

    console.log('New File Arr is:', newfilesArr);
    setFilesArr(newfilesArr);
}
