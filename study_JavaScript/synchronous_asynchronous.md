### 동기와 비동기의 차이

![](https://media.vlpt.us/images/effypark/post/0aee939b-c9f0-4b6c-a4ca-aa7de823245e/image.png)
출처 : https://learnjs.vlpt.us/async/

<br>
<br>

> ### 📌 동기(Synchronous)

- **서버에서 요청을 보낸 후 응답을 받아야만 다음 동작이 이루어지는 방식**
- 모든 일은 순차적으로 진행되며, 어떤 작업이 실행 중이라면 다음 작업은 대기하게 된다.
- 직렬적으로 테스크를 수행한다.

<br>
<br>

```
console.log('first');
console.log('second');
console.log('third');
```

<br>
<br>

> ### 📌 비동기(Asynchronous)

- **서버에서 요청을 보냈을 때 응답 상태와 상관없이 다른 동작을 수행할 수 있는 방식**

- **특정 코드의 연산이 끝날 때까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 방식이다.**

- A작업이 시작하면 동시에 B작업이 실행된다.

- 병렬적으로 테스크를 수행한다.

<br>

```
console.log('first');
setTimeout(() => {
  console.log('second');
}, 0);
console.log('third');

//output
//first
//third
//second
```

<br>
<br>

### 📝

- setTimeout() 메서드를 사용해 첫번째 인자는 콜백함수를 사용하고, 두번째 인자는 지연시간을 넣어주었다.

- 지연시간이 0이지만 `first` => `second` => `third` 순서로 출력되지 않는다.
  👉🏻 이는 setTimeout() 가 비동기적 메서드이기 때문인데,
  **비동기적 코드는 동기적 코드가 전부 실행되고나서 값을 반환한다.**

<br>
<br>

> ### 📌요약

- **동기**는 비동기보다 간단하고 직관적일 수 있지만 결과값이 주어질 때까지 다음 동작을 실행하지 못하고 대기해야 하는 문제가 있다.

- **비동기**는 동기보다 복잡하지만 결과값이 주어지는데 시간이 걸려도 그 시간동안 다른 작업을 할 수 있어 보다 효율적일 수 있다.
