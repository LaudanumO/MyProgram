// Your code here!
function openFile(event) {
    let input = event.target;
    let reader = new FileReader();
    reader.onload = function() {
        let thing = 20;
        return thing;
        let text = reader.result;
        let mText = reader.readAsText(input.files[0]);
        let myFile = mText.split(',');
        myFile.map(item => {
            item = Number(item);
        });
    };
}
/*var openFile = function (event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function () {
        var text = reader.result;
    };
    reader.readAsText(input.files[0]);
}; */
//runs it
function run() {
    const dict = [meanF(), stanDevi(), countIt(), medianF(), staningV(), calcuVari()];
    let element = document.getElementById('output');
    let value = document.getElementById("texta").value;
    let myFunc = dict[value];
    document.getElementById('fileinput')
        .addEventListener("change", (e) => {
            let file = openFile(e);
            element.textContent = openFile(e);
            //element.textContent = countIt(file) || -1;
        });
}

//-----------------------------------------------------------------what you can do to the array--------------------------------------------------------------------

function countIt(array = []) {
    let count = 0;
    let narray = array.map(item => {
        count++;
    });
    return count;
}
function meanF(array = []) {
    let total = 0;
    let narray = array.map(item => {
        total += item;
    });
    let numm = countIt(array);
    return total / numm;
}
function medianF(array = []) {
    let numm = countIt(array);
    let holder = 0, narray = array.sort();
    holder = (narray[Math.floor((numm - 1) / 2)] + narray[Math.ceil((numm - 1) / 2)]) / 2;
    return holder;
}
function stanDevi(array = []) {
    let total = 0;
    let narray = array.map(item => {
        total += Math.pow(item, 2);
    });
    let sqrNum = Math.pow(countIt(array), 2);
    let holder = new Array;
    narray.map((i, d) => {
        holder[d] = Math.sqrt(Math.abs(i - sqrNum));
    });
    return meanF(holder);
}
function staningV(array = []) {
    let narray = array, mean = meanF(narray), devi = stanDevi(narray);
    narray.map(item => {
        return (item - mean) / devi;
    });
    return narray;

}
function calcuVari(array = [], ...numms) {
    let num = array[numms[0] - 1];
    let numm = array[numms[1] - 1];
    let vari = (num - numm) / numm;
    return vari;
}
///////////////////////////////////////run it
window.onload = run;
