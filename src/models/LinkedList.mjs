import Node from "./Node.mjs"

export class LinkedList {
    #count
    #head

    constructor() {
        this.#count = 0;
        this.#head = null;
    }

    push(item) {
        const node = new Node(item);
        let current;
        if (this.#head == null) {
            this.#head = node;
        } else {
            current = this.#head;
            while (current.next != null)
                current = current.next;
            current.next = node;
        }
        this.#count++;
    }

    getElementAt(index) {
        if (index >= 0 && index < this.#count) {
            let node = this.#head;
            for (let i = 0; i < index && node != null; i++)
                node = node.next;
            return node;
        }
        return undefined;
    }

    size() {
        return this.#count;
    }

    isEmpty() {
        return this.size() === 0;
    }

    getList() {
        let current = this.#head;
        let result = '';
        while (current != null) {
            result += current.getData().name + (current.next ? ' => ' : '');
            current = current.next;
        }
        return result;
    }

    bubbleSort() {
    if (!this.#head || !this.#head.next) {
        return 0;
    }

    let swapped;
    let current;
    let prev = null;
    let iterations = 0;

    do {
        swapped = false;
        current = this.#head;

        while (current.next !== prev) {
            iterations++;
            if (current.data.name > current.next.data.name) {
                // Intercambiar los datos
                let temp = current.data;
                current.data = current.next.data;
                current.next.data = temp;
                swapped = true;
            }
            current = current.next;
        }
        prev = current;
    } while (swapped);

    console.log(`BubbleSort completed with ${iterations} iterations`);
    return iterations;
}


    mergeSort() {
        if (!this.#head || !this.#head.next) {
            return 0;
        }

        let dummy = new Node(0);
        dummy.next = this.#head;
        let size = 1;
        let length = this.size();
        let iterations = { count: 0 }; // Contador de iteraciones

        while (size < length) {
            let current = dummy.next;
            let arreglo = dummy;

            while (current) {
                let left = current;
                let right = this.#split(left, size);
                current = this.#split(right, size);

                arreglo = this.#merge(left, right, arreglo, iterations);
            }

            size *= 2;
        }

        this.#head = dummy.next;
        console.log(`MergeSort completed with ${iterations.count} iterations`);
        return iterations.count; // Retornar el número de iteraciones
    }

    #merge(left, right, tail, iterations) {
        let current = tail;

        while (left && right) {
            iterations.count++; // Incrementar el contador en cada iteración
            if (left.data.name < right.data.name) {
                current.next = left;
                left = left.next;
            } else {
                current.next = right;
                right = right.next;
            }
            current = current.next;
        }

        current.next = left ? left : right;

        while (current.next) {
            current = current.next;
        }

        return current;
    }

    #split(head, size) {
        for (let i = 1; head && i < size; i++) { // Itera sobre la sublista hasta alcanzar el tamaño especificado
            head = head.next; // Avanza al siguiente nodo
        }

        if (!head) return null; // Si el final de la lista es alcanzado, retorna null

        let next = head.next; // Guarda el nodo siguiente al final de la sublista actual
        head.next = null; // Rompe la conexión de la sublista actual con el resto de la lista
        return next; // Retorna el nodo siguiente que será la cabeza de la siguiente sublista
    }

    radixSort() {
        if (this.#head === null || this.#head.next === null) {
            return 0; // Retorna 0 si la lista está vacía o tiene un solo elemento
        }

        // Encuentra la longitud máxima de los nombres
        let maxLen = this.#getMaxNameLength();
        let totalIterations = 0; // Contador de iteraciones totales

        for (let exp = maxLen - 1; exp >= 0; exp--) {
            console.log(`Sorting with exp ${exp}`);
            totalIterations += this.#countingSort(exp); // Acumula las iteraciones
        }

        return totalIterations; // Retorna el número total de iteraciones
    }

    #countingSort(exp) {
        const output = new Array(this.#count);
        const count = new Array(256).fill(0); // Array para contar ocurrencias de caracteres ASCII
        let iterations = 0; // Contador de iteraciones

        // Contar ocurrencias de caracteres en la posición dada por `exp`
        let current = this.#head;
        while (current !== null) {
            const index = this.#getCharCodeAt(current.getData().name, exp);
            count[index]++;
            current = current.next;
            iterations++;
        }

        // Ajustar el array count
        for (let i = 1; i < 256; i++) {
            count[i] += count[i - 1];
        }

        // Construir el array de salida (en orden normal para mantener el orden estable)
        const temp = new Array(this.#count); // Array temporal para almacenar elementos ordenados
        current = this.#head;
        while (current !== null) {
            const index = this.#getCharCodeAt(current.getData().name, exp);
            temp[count[index] - 1] = current; // Almacenar el nodo en el array temporal
            count[index]--;
            current = current.next;
            iterations++;
        }

        // Verifica si todos los nodos están presentes en el array temporal
        if (temp.some(node => node === undefined)) {
            console.error("Temp array contains undefined nodes:", temp);
        }

        // Actualizar la lista enlazada con los elementos ordenados
        this.#head = temp[0];
        current = this.#head;
        for (let i = 1; i < this.#count; i++) {
            if (temp[i] === undefined) {
                console.error(`Node at index ${i} is undefined. Temp array:`, temp);
                break;
            }
            current.next = temp[i];
            current = current.next;
        }
        if (current) {
            current.next = null; // Asegurar que el último nodo apunte a null
        }

        console.log(`List after countingSort with exp ${exp}: ${this.getList()}`);
        return iterations; // Retornar el número de iteraciones
    }

    #getCharCodeAt(str, pos) {
        if (pos >= str.length) {
            return 0; // Usa 0 para rellenar cadenas más cortas
        }
        return str.charCodeAt(pos);
    }

    #getMaxNameLength() {
        let maxLen = 0;
        let current = this.#head;
        while (current !== null) {
            if (current.getData().name.length > maxLen) {
                maxLen = current.getData().name.length;
            }
            current = current.next;
        }
        return maxLen;
    }
}