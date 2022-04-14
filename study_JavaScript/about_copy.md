## 얕은 복사와 깊은 복사 - 얕은 복사 (shallow copy)

<br>

> #### 자바스크립트의 값은 "원시값" 과 "참조값" 으로 나뉜다
>
> **원시값**

- Number
- String
- Boolean
- Null
- Undefined
  > **참조값**
- Object
- Symbol
  >

<br>

#### 원시값

- 원시값은 단순 데이터, 기본 자료형을 의미
- 변수에 원시값을 저장하면 변수의 메모리 공간에 실제 데이터 값이 저장
- 할당된 변수를 조작하고자 하면, **저장된 실제 값이 조작**

<br>

#### 참조값

- 참조값은 여러 자료형으로 구성되는 메모리에 저장된 **객체**
- 변수에 객체를 저장하면 독립적인 메모리 공간에 값을 저장, 변수에 저장된 메모리 공간의 참조를 저장
- 할당된 변수를 조작하고자 하면, 객체 자체를 조작하는 것이 아닌 **해당 객체의 참조를 조작**

<br>

### 얕은 복사? 깊은 복사?

- 원시값을 복사할 때 그 값은 또 다른 독립적인 메모리 공간에 할당
- 복사를 하고 값을 수정해도 **기존 원시값을 저장한 변수에는 영향을 끼치지 않는다**
- 이렇게 실제 값을 복사하는 것을 **깊은 복사**라고 한다

<br>

- 참조값을 복사할 때 **변수가 객체의 참조를 가리키고 있기 때문에** 복사된 변수 또한 객체가 저장된 메모리 공간의 참조를 가리키고 있다
- 그래서 복사를 하고 객체를 수정하면, 두 변수는 똑같은 참조를 가리키고 있기 때문에 기존 객체를 저장한 변수에 영향을 끼친다
- 이렇게 객체의 참조값(주소값)을 복사하는 것을 **얕은 복사**라고 한다

<br>

```
const a = {
one: 1,
two: 2,
};
let b = a;
b.one = 3;
console.log(a); // { one: 3, two: 2 } 출력
console.log(b); // { one: 3, two: 2 } 출력
// 기존 값에 영향을 끼친다.
```

- 이렇게 객체를 복사할 때 `=` 를 사용해서 복사하면 **얕은 복사** 가 된다. 객체의 복사본을 수정하게 되면 원본도 함께 수정이된다. 객체는 값을 복사하는 것이 아니라, 참조를 하기 때문

<br>

### 얕은 복사 방법?

> ### 얕은 복사

- 객체를 복사할 때 기존 값과 복사된 값이 같은 참조를 가리키고 있는 것
- 객체 안에 객체가 있을 경우에 한 개의 객체라도 기존 변수의 객체를 참조하고 있다면 이를 얕은 복사라고 한다

#### Array.prototype.slice()

- 얕은 복사 방법의 대표적인 예
- `slice()` ? **start 부터 end 인덱스까지 기존 배열에서 추출하여 새로운 배열을 리턴하는 메서드**
- 만약에 start 와 end 를 설정하지 않는다면, 기존 배열을 전체 얕은 복사한다

<br>

```

const original = ['a',2,true,4,"hi"];
const copy = original.slice();
console.log(JSON.stringify(original) === JSON.stringify(copy)); // true
copy.push(10);
console.log(JSON.stringify(original) === JSON.stringify(copy)); // false
console.log(original); // [ 'a', 2, true, 4, 'hi' ]
console.log(copy); // [ 'a', 2, true, 4, 'hi', 10 ]

```

- slice() 는 기본적으로 얕은 복사를 수행

<br>

- 배열 안에 객체를 수정하고자 할 때 얕은 복사 수행

```
const original = [
{
a: 1,
b: 2,
},
true,
];
const copy = original.slice();
console.log(JSON.stringify(original) === JSON.stringify(copy)); // true
// 복사된 배열에만 변경.
copy[0].a = 99;
copy[1] = false;
console.log(JSON.stringify(original) === JSON.stringify(copy)); // false
console.log(original);
// [ { a: 99, b: 2 }, true ]
console.log(copy);
// [ { a: 99, b: 2 }, false ]

```

<br>

#### Array.prototype.concat()

- `concat()` 메서드는 기존 배열 뒤에 새로운 배열을 이어 붙여 새로운 배열을 반환

```
let arr = [0, 1, 2];
let arr2 = [3, 4, 5];

console.log(arr.concat(arr2));

// [0, 1, 2, 3, 4, 5]
```

#### Array.from()

- `from()` 메서드는 유사 배열 객체나 반복 가능한 객체(iterable object) 를 얕게 복사해서 새로운 Array 객체를 만든다

```
console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// expected output: Array [2, 4, 6]

```

<br>

#### from() 구문

`Array.from(arrayLike[, mapFn[, thisArg]])`

- 매개변수
  `arrayLike` 배열로 반환하고자 하는 유사 배열객체나 반복 가능한 객체
  `mapFn` 배열의 모든 요소에 대해 호출할 맵핑 함수 (선택 매개변수)
  `thisArg` 는 `mapFn` 실행 시에 `this` 로 사용할 값 (선택 매개변수)

- 반환 값
  새로운 Array 인스턴스

<br>

#### Object.assign()

- `Object.assign()` 에 첫번째 인자 값에 빈 객체를 주면, 구번째 값에 들어오는 출처 객체가 그대로 복사

```
let obj = { name : 'hyelin', age : 18 };
let copy = Object.assign({}, obj);

console.log(obj === copy) // false (참조가 아닌 복사이므로)

copy.name = 'park';

console.log(obj); // { name : 'hyelin', age : 18 }
console.log(copy); // { name : 'park', age : 18 }
```

- assign() 메서드는 객체 메서드로, 덮어쓸 때 사용

```
let obj1 = { name : 'hyelin', age : 18 };
let obj2 = { age : 25, job : 'student' };

Object.assign(obj1, obj2); // {name: 'hyelin', age: 25, job: 'student'}

```

- assign() 의 첫번째 인자값 위로 두번째 인자값을 덮어 써버린다

<br>

#### Spread(...) 전개 연산자를 사용한 배열 복사

- 연산자 뒤의 배열을 복사해주는 개념

```
let arr = [1, 2, 3];
let copy = [...arr];

console.log(arr === copy) // false

copy[0] = 'a';

console.log(arr) // [1, 2, 3];
console.log(copy) // ['a', 2, 3]
```

<br>

#### Spread(...) 전개 연산자를 사용한 객체 복사

```
// 얕은 복사 spread
let obj = { name: 'hyelin', age: 25 };
let copy = { ...obj };

console.log(obj === copy); // false (참조가 아닌 복사이므로)

copy.name = 'park';

console.log(obj); // { name : 'hyelin', age : 25 }
console.log(copy); // { name : 'park', age : 25 }
```
