export class ArrayList {
    constructor() {
        this.array = [];
    }

    push(data) {
        this.array.push(data);
    }

    bubbleSort() {
        let items = this.array;
        let length = items.length;
        let swap;
        let iterations = 0;

        for (let i = 0; i < length; i++) {
            for (let j = 0; j < (length - i - 1); j++) {
                iterations++;
                if (items[j].name > items[j + 1].name) {
                    swap = items[j];
                    items[j] = items[j + 1];
                    items[j + 1] = swap;
                }
            }
        }
        return iterations;
    }

    mergeSort(items = this.array, iterations = { count: 0 }) {
        if (items.length <= 1) {
            return items;
        }
        const middle = Math.floor(items.length / 2);
        const left = items.slice(0, middle);
        const right = items.slice(middle);

        return this.#merge(this.mergeSort(left, iterations), this.mergeSort(right, iterations), iterations);
    }

    #merge(left, right, iterations) {
        let result = [];
        let leftIndex = 0;
        let rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            iterations.count++;
            if (left[leftIndex].name < right[rightIndex].name) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }
        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    }

    radixSort() {
        let items = this.array;
        let maxLen = this.#getMax(items);
        let iterations = 0;
        for (let exp = maxLen - 1; exp >= 0; exp--) {
            iterations += this.#countingSort(items, exp);
        }
        return iterations;
    }

    #getMax(items) {
        let max = items[0].name.length;
        for (let i = 1; i < items.length; i++) {
            if (items[i].name.length > max) {
                max = items[i].name.length;
            }
        }
        return max;
    }

    #countingSort(array, exp) {
        let output = new Array(array.length);
        let count = new Array(256).fill(0);
        let iterations = 0;

        for (let i = 0; i < array.length; i++) {
            if (array[i] && array[i].name) {
                let num = this.#convertString(array[i].name);
                let charCode = Math.floor(num / Math.pow(256, exp)) % 256;
                count[charCode]++;
            }
            iterations++;
        }

        for (let i = 1; i < 256; i++) {
            count[i] += count[i - 1];
        }

        for (let i = array.length - 1; i >= 0; i--) {
            if (array[i] && array[i].name) {
                let num = this.#convertString(array[i].name);
                let charCode = Math.floor(num / Math.pow(256, exp)) % 256;
                output[count[charCode] - 1] = array[i];
                count[charCode]--;
            }
        }

        for (let i = 0; i < array.length; i++) {
            array[i] = output[i];
        }
        return iterations;
    }

    #convertString(word) {
        let number = 0;
        for (let i = 0; i < word.length; i++) {
            number = number * 256 + word.charCodeAt(i);
        }
        return number;
    }
}