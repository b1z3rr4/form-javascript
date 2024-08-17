const meuarray = Array.from({
    length: 10, 
});

const obj = { a: 1, b: 2, c: 3 };

const arrayFromValues = Array.from(Object.values(obj));

const minhaString = String(1).repeat(11);

// const meuNovoArray = [];

// arrayFromValues.forEach((item) => {
//     meuNovoArray.push(item);
// })

const meuNovoArray = arrayFromValues.map((item) => {
    return item + 5
})

console.log(meuNovoArray);