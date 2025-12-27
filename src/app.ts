class Solution {
	getConcatenation(nums: number[]): number[] {
		/*
		* unlike java we don't need to specify a size while initializing an array
		* arrays in typescript are dynamic in size
		* unlike in java where it is a fixed size
		* */
		let returnArray: number[] = [];
		for (let i = 0; i < nums.length; i++) {

			returnArray[i] = nums[i];
			returnArray[nums.length + i] = nums[i];
		}
		return returnArray;
	}

	/*
	* a cleaner way to do this will be using the concat method => return nums.concat(nums);
	* or using the spread operator => return [...nums, ...nums];
	* */

	twoSum(nums: number[], target: number): number[] {
		let map = new Map<number, number>();
		for (let i = 0; i < nums.length; i++) {
			let checkValue = target - nums[i];
			if (map.has(checkValue)) {
				let returnIndex = map.get(checkValue);
				if (returnIndex != undefined) {
					return [returnIndex, i];
				}
			} else {
				map.set(nums[i], i);
			}
		}
		return [];
	}
}

let solutionClass = new Solution();
console.log(solutionClass.getConcatenation([1, 2, 3, 4]));
console.log(solutionClass.twoSum([1, 2, 3, 4], 8));
console.log("Hello")
