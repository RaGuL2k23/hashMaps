class Node {
  constructor(value, key) {
    this.value = value;
    this.next = null;
    this.key = key;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(value, key) {
    // just going to **append** key and value to linkedlist no other opereation
    const newNode = new Node(value, key);

    if (!this.head) {
      this.head = newNode; // head and tail pointing the same node initially
      this.tail = newNode; // head and tail hold {first , last} values of list ;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  prepend(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  at(index) {
    if (!this.head) alert("list empty append items");
    let ptr = this.head;
    for (let i = 0; i < index; i++) {
      ptr = ptr.next;
    }
    console.log(`----->element at index "${index}" is "${ptr.value}" `);
  }
  print() {
    if (!this.size) alert("cannot perform print List empty");
    else if (this.size) {
      let ptr = this.head;
      for (let i = 0; i < this.size; i++) {
        console.log(`-----> index "${i}" "${ptr.value}" `);
        ptr = ptr.next;
      }
    }
  }

  pop() {
    if (!this.tail || this.size == 0) {
      alert("cannot perform pop List empty");
      this.tail = null;
    } else if (this.size > 0) {
      let elementBeforeTail = this.head;
      for (let i = 0; i < this.size - 2; i++) {
        elementBeforeTail = elementBeforeTail.next;
      }
      this.tail = null;
      elementBeforeTail.next = null;
      this.tail = elementBeforeTail;
      this.size--;
    }
  }

  find(value) {
    if (!this.head) {
      alert("list empty append items");
      this.head = null;
    }
    let ptr = this.head;
    for (let i = 0; i < this.size; i++) {
      if (ptr.value == value) {
        console.log(`List contains ${value} found at index ${i} `);
        return i;
      } else {
        ptr = ptr.next;
      }
    }
    if (!ptr) console.log("List does not contain", value);
  }
  contains(value) {
    let ptr = this.head;
    while (ptr) {
      if (value == ptr.value) return true;
      ptr = ptr.next;
    }
    return false;
  }
  toString() {
    if (!this.size) alert("cannot perform print List empty");
    else {
      let str = "";
      let ptr = this.head;
      for (let i = 0; i <= this.size; i++) {
        if (ptr == null) str += `--> ${ptr}  `;
        else {
          str += `-->  "${ptr.value}" `;
          ptr = ptr.next;
        }
      }
      return str.slice(3);
    }
  }

  insertAt(value, index) {
    let newNode = new Node(value);
    if (index <= 0) {
      this.prepend(value);
      return;
    } else if (index == this.size - 1) {
      this.append(value);
      return;
    } else if (index > this.size)
      console(`stack size is ${this.size} anyways adding at last`);
    let prevPtr,
      ptr = this.head;
    for (let i = 0; i < index; i++) {
      prevPtr = ptr;
      if (prevPtr.next != null) {
        ptr = ptr.next;
      } else {
        break;
      }
    }

    newNode.next = prevPtr.next;
    prevPtr.next = newNode;
    this.size++;
  }

  removeAt(index) {
    if (index == 0) {
      let ptr = this.head;
      this.head = ptr.next;
      ptr = null;
      this.size--;
      console.log("list emptied");
      return;
    } else if (index == this.size - 1) {
      this.pop();
      return;
    } else if (index > this.size || index < 0) {
      alert(`size of list is ${this.size}`);
      return;
    }
    let prevPtr,
      ptr = this.head;
    for (let i = 0; i < index; i++) {
      prevPtr = ptr;
      ptr = ptr.next;
    }
    prevPtr.next = ptr.next;
    // ptr = null; //guy removed anyways
    // console.log(prevPtr, ptr);
    this.size--;
  }
}
  export {LinkedList}
  
  // l = new LinkedList();
  // l.append(1);
  // l.append(2);
  // l.append(3);
  // l.append(4);
  // l.prepend(0);
  // l.at(3);
  // console.log("already create a list name --> l u can create your own with ");
  // console.log("new LinkedList()");
  