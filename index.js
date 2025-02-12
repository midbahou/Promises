function greeting() {
    // [1] Some code here
    sayHi();
    // [2] Some code here
  }
  function sayHi() {
    return "Hi!";
  }
  
  // Invoke the `greeting` function
  greeting();
  
  // [3] Some code here


// ================= Promises =============

// creating a promise

const myPromise = new Promise((resolve, reject) => {
    let value = true;

    if (value) {
        resolve ("DATA IS BACK!")
    } else {
        reject("REJECT ERROR!")
    }
});

myPromise
    .then(result => console.log(result)) // resolve
    .catch(error => console.log(error)) // reject
    .finally(result => console.log("RUNS ANYWAYS!")); // completed


const myPromise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = false;
        if (success) {
            resolve("Guess this works!")
        }else{
            reject("ERROR!")
        }
    }, 1000);
})

console.log(typeof myPromise1);

myPromise1 
    .then(x => x + 'Again?')
    .then(x => x + 'Third time!')
    .then(x => x + 'Promises are cool.')
    .then(result => console.log(result))
    .catch(err => console.log(err));
    


// fetch("https://jsonplaceholder.typicode.com/todos") // step1
//     .then((response) => response.json()) // step 2
//     .then((json) => console.log(json)); // step 3


// ================================================
new Promise((resolve, reject) => {
    console.log("Initial");

    resolve();
})

.then(() => {
    throw new Error("something failed");

    console.log("Do this");
})
.catch(() => {
    console.error("Do that");
})
.then(() => {
    console.log("Do this, no matter what happen before");
    throw new Error("Error");

})
.catch(() => console.error("Also catch errors"));


// Composition Tools
const func1 = () => {
    return new Promise((resolve) => 
        setTimeout(() => resolve("result1"), 100));
};

const func2 = (prev) => {
   return new Promise((resolve) => 
    setTimeout(() => resolve(prev + " result2"), 500));
};

const func3 = (prev) => {
   return new Promise((resolve) => 
    setTimeout(() => resolve(prev + " result3!"), 50));
}
const func4 = () => new Promise((resolve, reject) => setTimeout(() => reject("Error!"), 300)); // To show all of them we have to use the allSettled method


//* === Concurrently: fire all at the same time then give me the result in one line
Promise.all([func1(), func2(), func3()])
    .then(result => console.log(result))
    .catch((e) => console.error(e))

Promise.allSettled([func1(), func2(), func3(), func4()]) // 
    .then(result => console.log(result))
    .catch((e) => console.error(e))


//* ======== Sequentially: depend on each other
Promise.resolve()
    .then(func1)
    .then(func2)
    .then(func3)
    .then(result => console.log(result))
    .catch(e => console.error(e));




// Promise.any
const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve) => setTimeout(resolve, 1000, 'quick'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));

const promises = [promise1, promise2, promise3];

Promise.any(promises).then((value) => console.log(value));


// Promise.race
const promise4 = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, 'one');
  });
  
  const promise5 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'two');
  });
  
  Promise.race([promise4, promise5]).then((value) => {
    console.log(value);
    // Both resolve, but promise2 is faster
  });
  // Expected output: "two"



// ====

function saySomething(message){
    console.log(message);
    throw new Error("Error in say something")
}

// const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const wait = (ms) => new Promise((resolve, reject) => {
    try {
        setTimeout(resolve, ms);
    } catch (e) {
        reject(e);
    }
});

wait(5000)
  .then(() => saySomething("5 seconds"))
  .catch(e => console.error(e));


// So the microtask queue is really a way of prioritizing asynchronous tasks, ensuring the higher-priority asynchronous tasks (like promises) execute before lower priority ones (like setTimeout). 
wait(0).then(() => console.log("Cat")); 

Promise.resolve()
  .then(() => console.log("Dog"))
  .then(() => console.log("Cow"));

console.log("Bird");
// result: Bird (synchronous), Dog-Cow(micro tasks), Cat(task)