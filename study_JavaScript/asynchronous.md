### 비동기?

<br>
- 특정 코드의 연산이 끝날 때까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 방식

<br>
<br>

> ### 🤔 비동기 처리는 왜 필요한가?

- 데이터를 서버로부터 받아오는 앱을 만든다고 가정할 때, 해당 데이터를 뿌려줘야하므로 맨 처음에 서버로부터 데이터를 받아오는 코드가 먼저 실행되어야 한다.

<br>

- 비동기로 처리하지 않고 동기적으로 구성을 하게 된다면, 데이터를 받아오기까지 기다린다음 앱이 실행되고 가져와야 할 데이터 양이 늘어날수록 앱의 실행속도는 느려질 것이다. 그럼 데이터를 가져오기까지 대기해야 한다.<br>
  👉🏻 이러한 동기처리로 인한 불편을 없애기 위해 비동기 처리가 필요하다.

<br>

### 비동기 처리 방식

<br>

### 1️⃣ 콜백함수(callback)

<br>

- **콜백함수** : 함수 안에서 어떤 특정한 시점에 호출되는 함수를 말한다. 함수의 매개변수로 전달하여 특정 시점에 콜백함수를 호출한다.

<br>

- 콜백지옥 : 비동기 처리를 위해 콜백함수를 연속으로 사용할 때 발생하는 문제를 일컫는다.

<br>

> 😓 **비동기 작업의 사용성 문제**

- 비동기 작업은 여러 작업을 동시에 수행 할 수 있는 장점이 있다. 하지만 비동기 작업이 시작되는 시점은 **함수 호출**이며, 이 함수 또한 호출 시점에 다음 작업 (콜백 함수) 도 넘겨줘야 하기 때문에 의존성이 길게 이어지게 된다. 이렇게 연속으로 사용할 때 발생하는 문제를 _콜백지옥_ 이라고 한다.

<br>

```
function test(count, bad, good) {
  count < 3 ? bad() : good();
}

const badNews = () => {
  console.log('다시 공부해오세요.');
};

const goodNews = () => {
  console.log('아주 잘했습니당.');
};

test(2, badNews, goodNews);
// output
//'다시 공부해오세요.'
```

### 📝

- test, badNews, goodNews 총 3가지 함수를 선언
- test 함수를 호출할 때 매개변수로 count 에는 숫자값, bad과 good에는 badNews 함수와 goodNews 함수를 전달

👉🏻 badNews 와 goodNews 가 **콜백함수** 이다.

- **test 함수가 먼저 호출되고, 매개변수로 들어온 count 값에 따라 badNews와 goodNews 함수 둘 중 하나가 나중에 호출된다.**

👉🏻 count 는 2로 3 미만이기 때문에 badNews 콜백함수가 실행된다.

<br>
<br>

> 만약에 비동기 처리해야할 부분이 많아 콜백함수를 많이 써야 한다면 콜백지옥에 빠질 위험이 있다. 이러한 문제 해결을 위해 **ES6 에 도입된 `promise` 와 `async/await` 를 사용할 수 있다.**

<br>
<br>

### 2️⃣ promise

- 자바스크립트에서 비동기 처리를 좀 더 편리하게 할 수 있도록 ES6에 도입된 기능

- callback 과 하는 일은 같지만 **차이점**이 있다.<br>
  👉🏻 promise 는 작업이 끝난 후 실행할 함수를 제공하는 것이 아니라, **promise 자체 메서드 `.then()` 을 호출한다**

<br>

📝 **promise** 의 기본 사용법

```
const promise1 = new Promise((resolve, reject) => {
  // 비동기 작업
});
```

> 1. 인자로 받은 특별한 함수를 공식문서에서는 `executor` 라고 부른다.
> 2. `executor` 는 첫번째 인수 `resolve` 와 두번째 인수 `reject` 를 받는다.
> 3. `resolve` 는 `executor` 내에서 호출 할 수 있는 또 다른 함수. `resolve` 를 호출하게 된다면 **비동기 작업이 성공** 했다라는 뜻이다.
> 4. `reject` 또한 `executor` 내에서 호출 할 수 있는 또 다른 함수이다. `reject` 를 호출하게 된다면 **비동기 작업이 실패** 했다는 뜻이다.

- 위의 비동기 작업이 **성공하거나 실패** 할 때, 뒷처리를 해주어야 한다.
- promise 가 끝나고 난 다음의 동작을 설정해주어야 하는데, 바로 `.then` 메서드와 `.catch` 메서드이다.

<br>

> 1. `.then` 메서드는 해당 promise 가 >**성공**했을 때 동작을 지정한다. 인자를 함수로 받는다.
>
> 2. `.catch` 메서드는 해당 promise 가 **실패**했을 때 동작을 지정한다.
>
> 3. 위의 메서드들은 **연속적으로 호출**할 수 있다!

<br>

#### 📌`executor` 로 새로운 `promise` 를 만든 다음 `.then` 과 `.catch` 를 이용하여 후속 동작까지 지정을 해야 promise 작업을 할 수 있다.

<br>
<br>

```
const promise1 = new Promise((resolve, reject) => {
  reject();
});
promise1
  .then(() => {
    console.log("then!");
  })
  .catch(() => {
    console.log("catch!");
  });

  //output
  "catch!"
```

- .then 에 함수를 넣어주고 .catch 에도 함수를 넣어준 코드이다.
- 이 promise 에는 reject() 가 호출되었기 때문에 **실패**로 간주하여 catch 에 있는 동작만 실행한다.

```
function startAsync(age) {
  return new Promise((resolve, reject) => {
    if (age > 20) resolve();
    else reject();
  });
}

setTimeout(() => {
  const promise1 = startAsync(25);
  promise1
    .then(() => {
      console.log("1 then!");
    })
    .catch(() => {
      console.log("1 catch!");
    });
  const promise2 = startAsync(15);
  promise2
    .then(() => {
      console.log("2 then!");
    })
    .catch(() => {
      console.log("2 catch!");
    });
}, 1000);

//output
1 then!
2 catch!
```

<br>

> 1. startAsync 함수를 호출하는 순간 newPromise(...) 가 실행되어 비동기 작업이 시작된다.
>
> 2. 비동기 작업이 성공할 지, 실패할 지 장담할 수 없기 때문에 후속동작 .then 과 .catch 모두 지정해둔다.
>
> 3. promise1 의 작업은 성공하여 .then 의 작업이 실행되어 '1 then!' 이 출력. catch 의 동작은 실행하지 않는다.
>
> 4. promise2 의 작업은 실패하여 .catch 의 작업이 실행되어 '2 catch! 가 출력. then 의 동작은 실행하지 않는다.

<br>

```
function startAsync(age) {
  return new Promise((resolve, reject) => {
    if (age > 20) resolve(`${age} success`);
    else reject(new Error(`${age} is not over 20`));
  });
}

setTimeout(() => {
  const promise1 = startAsync(25);
  promise1
    .then((value) => {
      console.log(value);
    })
    .catch((error) => {
      console.error(error);
    });
  const promise2 = startAsync(15);
  promise2
    .then((value) => {
      console.log(value);
    })
    .catch((error) => {
      console.error(error);
    });
}, 1000);
```

```
//output

25 success
Error: 15 is not over 20
    at /home/taehoon/Desktop/playground-nodejs/index.js:4:17
    at new Promise (<anonymous>)
    at startAsync (/home/taehoon/Desktop/playground-nodejs/index.js:2:10)
    at Timeout._onTimeout (/home/taehoon/Desktop/playground-nodejs/index.js:17:20)
    at listOnTimeout (internal/timers.js:554:17)
    at processTimers (internal/timers.js:497:7)
```

> #### 📌 고려사항

- `executor` 내부에서 에러가 throw 되면 해당 에러로 reject 가 수행된다.
- `executor` 의 리턴 값은 무시된다.
- 첫번째 reject 나 resolve 만 유효하다. (두번 째부터는 무시. 이미 해당 함수가 호출되었다면 throw 또한 무시)

<br>

> ### 📝요약

- `promise` 는 세가지 상태를 지닌다. \*\*대기(pending), 이행(fulfilled), 거부(rejected)
- 이행 상태일 때는 `then` 동작 실행, 거부 상태일 때는 `catch` 동작 실행
  >
- `promise` 는 비동기 작업을 생성/시작 하는 부분 (newPromise(...)) 와 비동기 작업의 후속 조치 `then` 과 `catch` 를 분리하여 지정함으로써 유연한 설계를 가능하게 한다.

<br>
<br>

### 3️⃣ async function (& await)

- 기존에 promise 로 비동기 처리를 했다면 **async&await** 를 써서 더 간단하게 비동기 처리를 할 수 있다. then 과 catch 로 제어를 했다면 async function 을 쓸 때엔 `await` 를 쓸 수 있다.

- async 의 리턴 값은 promise. promise 의 then 과 catch 메서드로 제어하지 않고, `await` 을 사용한다.

- `await` 는 **_promise 가 이행되던지, 실패하던지 작업이 끝날 때까지 기다리는 함수이다. _** **async** 안에서만 사용할 수 있다.

<br>

```
function setTimeoutPromise(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), ms);
  });
}

async function startAsync(age) {
  if (age > 20) return `${age} success`;
  else throw new Error(`${age} is not over 20`);
}

async function startAsyncJobs() {
  await setTimeoutPromise(1000);
  const promise1 = startAsync(25);
  try {
    const value = await promise1;
    console.log(value);
  } catch (e) {
    console.error(e);
  }
  const promise2 = startAsync(15);
  try {
    const value = await promise2;
    console.log(value);
  } catch (e) {
    console.error(e);
  }
}

startAsyncJobs();

```

<br>

- ouput 은 위에 promise 를 사용해서 출력된 값과 동일하다.

> 1. setTimeoutPromise 함수는 setTimeout () 을 활용하여 ms 이후 resolve 를 호출한다.
> 2. resolve 함수가 호출되어 then 동작 실행
> 3. startAsyncJobs 라는 async function 을 만들고 async 함수 내에 `await` 을 사용한다.
> 4. promise 로 비동기 작업을 했을 때 then 과 catch 작업 모두 이 `await` 내에 있다.

#### await

> 1. await 는 Promise 가 완료될 때까지 기다린다. setTimeoutPromise 의 executor 에서 resolve 함수가 호출될 때까지 기다리고, 그동안 startAsyncJobs 의 작업은 멈춰있다.
>
> 2. await 는 Promise 가 resolve 한 값을 내놓는데, async 함수 내부에서는 리턴 값을 **resolve 로 간주**하므로 `${age} success` 가 value 로 들어온다.
>
> => `await` 는 `then` 과 `catch` 동작 모두 알아서 간주해서 처리한다. 그래서 promise 의 then 과 catch 없이도 작업 처리를 한다.
>
> 3.  Promise 에서 reject 가 발생하면 예외가 발생한다. => 예외처리를 하기 위해 `try-catch` 를 사용한다. reject 로 넘긴 error 는 catch 로 넘어가 에러 처리를 진행.

<br>

> ### 📝 요약

- 가장 최근에 나온 비동기 처리 문법인 async / await 는 `callback` 이나 `promise` 의 단점을 해소하고자, 간편하게 하고자 만들어졌다.
  >
- `callback` 이나 `promise` 의 경우 콜백 지옥, then이 꼬리를 꼬리를 물고 나올 수 있기 때문에 의존성이 길어지는 단점이 있다. `async / await` 은 promise 의 then 지옥의 가능성이 없고 promise 에 비해 코드 가독성이 좋다.
  >
- `await` 로 `promise` 리턴 값을 받아올 수 있다.
  >
- promise는 catch() 로 에러 핸들링이 가능하지만 async / await 는 따로 에러를 핸들링 할 수 없기 때문에 `try-catch` 문으로 에러를 핸들링 해주어야 한다. <br>
  👉 catch 문에서는 try 내부에 발생하는 모든 에러에 접근할 수 있다.
  >
- 에러 위치를 찾기 쉽다.

<br>

> #### promise 의 then, async / await 의 용도는 같다. 하지만 간결성, 에러 핸들링, 에러 위치 확인 측면에서 차이가 있다. <br>
>
> 또한 async / await 는 디버그를 할 때 then 과 달리 정확한 위치를 지정할 수 있다.
