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
    