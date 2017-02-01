const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
    }

    append(data) {
        var node;
        if (this.length == 0){
            node = new Node(data);
            this._tail = node;
            this._head = node;
        }else{
            var node = new Node(data, this._tail);
            this._tail.next = node;
            this._tail = node;
        }
        this.length++;
        return this;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        if (this.length === 0 || index < 0 || index > this.length - 1) return undefined;

        if (index == 0) return this._head.data;

        var counter = 0;
        var currentNode = this._head;

        do{
            currentNode = currentNode.next;
            counter++;
        }while (counter < index);

        return currentNode.data;
    }

    insertAt(index, data) {
        if (this.length === 0 || index < 0 || index > this.length - 1) return this;

        if (index === 0){
            var node = new Node(data, null, this._head);
            this._head.prev = node;
            this._head = node;
            this.length++;
            return this;
        }

        var currentNode = this._head;
        var counter = 0;
        while (counter < index){
            currentNode = currentNode.next;
            counter++;
        }
        var node = new Node(data, currentNode, currentNode.next);
        currentNode.prev.next = node;
        currentNode.prev = node;
        this.length++;
        return this;
    }

    isEmpty() {
        return this.length < 1;
    }

    clear() {
        if (this.length === 0) return this;
        var currentNode = this._tail;

        while (this.length > 1){
            currentNode = currentNode.prev;
            currentNode.next.data = null;
            this.length--;
        }

        this._head.data = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        if (this.length === 0 || index < 0 || index > this.length - 1) return this;

        if (index === 0){
            this._head = this._head.next;
            this.length--;
            return this;
        }

        var currentNode = this._head;
        var counter = 0;
        while (counter < index){
            currentNode = currentNode.next;
            counter++;
        }

        currentNode.prev.next = currentNode.next;
        currentNode.next.prev = currentNode.prev;
        currentNode = null;
        this.length--;

        return this;
    }

    reverse() {
        var tail = this._tail;
        var head = this._head;

        for (var i = 0; i < this.length / 2; i++){
            var temp;
            temp = head.data;
            head.data = tail.data;
            tail.data = temp;

            head = head.next;
            tail = tail.prev;
        }

        return this;
    }

    indexOf(data) {
        var currentNode = this._head;
        for (var i = 0; i < this.length; i++){
            if(currentNode.data == data)
                return i;
            currentNode = currentNode.next;
        }
        return -1;
    }
}

module.exports = LinkedList;
