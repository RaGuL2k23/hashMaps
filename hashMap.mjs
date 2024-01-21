import { LinkedList } from "./linkedList.mjs";

class HashMap {
    constructor() {
      this.length = 0;
      this.capacity = 16;
      this.buckets = new Array(this.capacity);
      this.loadFactor = 0.75;
    }
  
    hash(string) {
      let primeNO = 31,
        hashCode = 0;
      for (let i = 0; i < string.length; i++) {
        hashCode = primeNO * hashCode + string.charCodeAt(i);
      }
      return parseInt(hashCode % this.capacity);
    }
    // calculates bucket index with key and store key,value
    // in the bucke
    set(key, value) {
      let index = this.hash(key),
        list = this.buckets[index];
      if (list == undefined) {
        // adds new linked list item
        let ll = new LinkedList();
        this.length++;
        ll.append(value, key);
        this.buckets[index] = ll;
      } else if (typeof list == "object") {
        console.log(list, index);
        if (this.has(key)) {
          // seraches through nested lists and modifies values
          alert("modifying existing key's value");
          let ptr = list.head;
          console.log(ptr);
          while (ptr) {
            if (key == ptr.key) {
              ptr.value = value;
            }
            ptr = ptr.next;
          }
        } else {
          // if not found in linked list append at last
          list.append(value, key);
          this.length++;
        }
      }
  
      if (this.length / this.buckets.length > this.loadFactor) {
        this.grow();
      }
    }
    grow() {
      this.capacity *= 2;
    }
    get(key) {
      for (let lists of h.buckets) {
        if (lists != undefined && lists.head != null) {
          //all lists will have head , shouldn't be null
          if (key == lists.head.key) {
            // for getting values
            return lists.head.value;
          }
          let ptr = lists.head;
          while (ptr) {
            if (ptr.key == key) return ptr.value;
            ptr = ptr.next;
          }
        }
      }
      return null;
    }
    has(key) {
      for (let lists of h.buckets) {
        if (lists != undefined && lists.head != null) {
          if (key == lists.head.key) {
            return true;
          }
          let ptr = lists.head;
          while (ptr) {
            if (ptr.key == key) return true;
            ptr = ptr.next;
          }
        }
      }
      return false;
    }
    remove(key) {
      if (this.has(key)) {
        let index = this.hash(key); // definitely sits in the hashed index;
        let target = this.buckets[index]; // target => Linked list
        if (typeof target === "object") {
          let value = this.get(key);
          console.log(target, index, value);
          if (target.contains(value)) {
            let indexOfTargetElement = target.find(value); // returns index of the list holdig value
            target.removeAt(indexOfTargetElement); // removes the node / nested list;
            this.length--;
            return true;
          }
        }
      }
      return false;
    }
    clear() {
      this.capacity = 16;
      this.buckets = new Array(this.capacity);
    }
    keys() {
      let keys = [];
      for (let list of this.buckets) {
        if (list != undefined && list.head != null) {
          // console.log(list);
          let ptr = list.head;// or say node
          while(ptr){
            // also finds nested list keys
            keys.push(ptr.key);
            ptr=ptr.next;
          }
        }
      }
      return keys;
    }
    values() {
      let values = [];
      for (let list of this.buckets) {
        if (list != undefined && list.head != null) {
          // console.log(list);
          let ptr = list.head;// or say node
          while(ptr){
            // also finds nested list values
            values.push(ptr.value);
            ptr=ptr.next;
          }
        }
      }
      return values;
    }
    entries() {
      let entries =`[ `;
      h.buckets.forEach((list) => { 
        if (list != undefined && list.head != null){
          let ptr = list.head;// or say node
          while(ptr){
            // also finds nested list values
            console.log(`[${ptr.key},${ptr.value}]`)
            // console.log(Object.values(ptr).filter(e => e!=null))
             entries+=` ,  [${ptr.key},${ptr.value}]`;
            ptr=ptr.next;
          }
          if(!ptr) entries+=` ]`
        }
      });
      return  `[ `+entries.slice(4,);
    }
  }
  let h;
  h = new HashMap();
  h.set("rad", "df");
  h.set("hda", "addf");
  h.set("rafd", 484);
  // h.remove("hda");
  // h.remove("rad");
  // h.remove("rad");
  console.log(h.entries());
  console.log(h.buckets);
  