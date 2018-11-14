function createFile() {
    let array = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 10; j++) {
            array[i].push(j);
        }
    }
    return array;

}
file = createFile();
console.log(file);