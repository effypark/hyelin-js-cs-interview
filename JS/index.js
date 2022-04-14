// function hello(name) {
//   let _name = name; // 변수명 앞에 underscore(_)를 포함하면 private val임을 의미
//   return function () {
//     // 클로저 함수
//     console.log('Hello, ' + _name);
//   };
// }

// let hello1 = hello('혜린');
// hello1(); // output = Hello, 혜린

// console.log('first');
// setTimeout(() => {
//   console.log('second');
// }, 0);
// console.log('third');

// console.log(this === window);

let friends = {
  _name: 'hyelin',
  _mates: ['haneul', 'yerim'],
  mateCount() {
    console.log(this === window);
    console.log(this);
    this._mates.forEach((x) => console.log(this._name + 'is' + x));
  },
};

friends.mateCount();

const newNum = ([a, b] = [1, 2], { x: c } = { x: a + b }) => a + b + c;
console.log(newNum());

// 얕은 복사 slice()
// const original = ['a', 2, true, 4, 'hi'];
// const copy = original.slice();
// console.log(JSON.stringify(original) === JSON.stringify(copy)); // true
// copy.push(10);
// console.log(JSON.stringify(original) === JSON.stringify(copy)); // false
// console.log(original); // [ 'a', 2, true, 4, 'hi' ]
// console.log(copy); // [ 'a', 2, true, 4, 'hi', 10 ]

//얕은 복사 slice() - 배열 안에 객체를 수정하고자 할 때
// const original = [
//   {
//     a: 1,
//     b: 2,
//   },
//   true,
// ];
// const copy = original.slice();
// console.log(JSON.stringify(original) === JSON.stringify(copy)); // true
// // 복사된 배열에만 변경.
// copy[0].a = 99;
// copy[1] = false;
// console.log(JSON.stringify(original) === JSON.stringify(copy)); // false
// console.log(original);
// // [ { a: 99, b: 2 }, true ]
// console.log(copy);
// // [ { a: 99, b: 2 }, false ]

// // 얕은 복사 from()
// console.log(Array.from('foo'));
// // expected output: Array ["f", "o", "o"]

// console.log(Array.from([1, 2, 3], (x) => x + x));
// // expected output: Array [2, 4, 6]

// let obj = { name: 'hyelin', age: 18 };
// let copy = Object.assign({}, obj);

// console.log(obj === copy); // false (참조가 아닌 복사이므로)

// copy.name = 'park';

// console.log(obj); // { name : 'hyelin', age : 18 }
// console.log(copy); // { name : 'park', age : 18 }

// 얕은 복사 spread
let obj = { name: 'hyelin', age: 25 };
let copy = { ...obj };

console.log(obj === copy); // false (참조가 아닌 복사이므로)

copy.name = 'park';

console.log(obj); // { name : 'hyelin', age : 25 }
console.log(copy); // { name : 'park', age : 25 }
