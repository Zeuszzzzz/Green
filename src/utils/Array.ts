export function shuffleArray(nums = [1, 2, 3, 4]) {
    let shuffledNumbers = [];
    while (nums.length > 0) {
        let rand = Math.random() * nums.length;
        shuffledNumbers.push(nums.splice(rand,1)[0]);
    }
    return shuffledNumbers;
}