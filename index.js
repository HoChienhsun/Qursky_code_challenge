const async = require("async");

let isSubset= function(input_1,input_2){
    let set1 = new Set(input_1);
    let set2 = new Set(input_2);
    if(set2.size>set1.size) return false;
    var difference = new Set([...set2].filter(x => !set1.has(x)));
    // find the elements of input_2/set2 but not be included in input1/set1
    return (difference.size>0)?false:true;
}


async function createArrayOfFunction(y){
    let arr=[];
    let x = 4;
    promise = function(x,i){
        return new Promise(function(resolve, reject) {
            resolve(x+i);
        })
    }
    for(let i=0;i<y;i++){
        arr[i] = await promise(x,i);
    }
    console.log(arr);
}


class LRU {
    constructor(max=10) {
        this.max = max;
        this.cache = new Map();
    }
    get(key) {
        let item = this.cache.get(key);
        this.last = new Date();
        if (item)  // delete the previos one and insert again
        {
            this.cache.delete(key); 
            this.cache.set(key, item);
            return item;
        }
        else return -1
    }
    set(key, value, weight) {
        let lastElement = this.cache.get(this._first());
        if (this.cache.has(key)){ // delete the previos one and insert again
            this.cache.delete(key);
        }
        else if (this.cache.size === this.max) { // delete the oldest data
            this.cache.delete(this._first());
        }
        let newValue = {};
        let currentDate = new Date();
        newValue.time = currentDate; // record the time of each element in the map
        newValue.value = value;
        newValue.weight = (lastElement)?weight/Math.log(currentDate-lastElement.time):weight/-100;
        //if there is a first element in the map, we cacluate is weight, otherwise, it's weight/-100
        this.cache.set(key, newValue);
        //insert the new value
        this.cache.set(this._first(), {
            "time":this.cache.get(this._first()).time,
            "value":this.cache.get(this._first()).value,
            "weight":weight/-100
        });
        //update value of the last first element in the map 
    }
    _first(){
        return this.cache.keys().next().value;
    }
}


function main(){
    // Question 1
    let array_1 = [1,2,3,5,6];
    let array_2 = [7,3,2];
    if(isSubset(array_1,array_2)) console.log("yes, array_2 is a subset of array_1");
    else console.log("no, array_2 is not a subset of array_1");   
   
    // Question 2
    createArrayOfFunction(10);
   
    // Question 3
    let cache = new LRU(3);
    cache.set(6, 6, 5)
    cache.set(2, 3, 5)
    cache.set(1, 3, 5)
    cache.set(4, 3, 5)
    cache.set(5, 3, 5)
    cache.get(4)

}

main();
