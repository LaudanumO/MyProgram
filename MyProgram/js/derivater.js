
function run() {
    let polyn = document.getElementById("textaria").value;
    let button = document.getElementById("butt");
    button.addEventListener("click", (e) => { runIt(polyn);});
}
function runIt(polyn) {
        ds = 400;
        let myD3 = d3.select("body")
            .append("svg")
            .attr("width", ds)
            .attr("height", ds);
        display();
        function display() {
            myD3.append("line")
                .attr("x1", ds / 2)
                .attr("y1", 0)
                .attr("x2", ds / 2)
                .attr("y2", ds)
                .attr("strokeWidth", 2)
                .attr("stroke", "black");
            myD3.append("line")
                .attr("x1", 0)
                .attr("y1", ds / 2)
                .attr("x2", ds)
                .attr("y2", ds / 2)
                .attr("strokeWidth", 2)
                .attr("stroke", "black");
            let keeper = [];
            for (let i = -1 * (ds / 4); i <= ds / 4; i++) {
                keeper.push(eval(i, polyn));
            }
            keeper = scaleIt(keeper,ds);
            for (let i = -1 * (ds / 4); i <= ds / 4; i++) {
                setTimeout(doD3, 500)
                function doD3() {
                    myD3.append("circle")
                        .attr("cx", ds / 2 + (i * 2))
                        .attr("cy", ds / 2 - (keeper[i + (ds / 4)] * 2))
                        .attr("r", 1)
                        .attr("fill", "green");
                }
            }
            
        }
}
function scaleIt(array, _ds) {
    let df = _ds / 4;
    let kep = (array[array.length - 1] - array[0]) + array[array.length - 1];
    for (let i = 0; i < array.length; i++) {
        array[i] = (array[i] - (-1 * df)) / ((df) - (-1 * df)) * kep;
    }
    return array;
}
//_________________________________________________________________functions_____________________________________________________________________________________________________________
function operator(op, keepe, x) {
    let kep1 = keepe[keepe.length - 2];
    let kep2 = keepe[keepe.length - 1];
    if (op == '/' || op == '*') {
        if (kep1 = 'x') {
            keepe[keepe.length - 2] = kep2;
        } else if (kep2 == 'x') {
            keepe[keepe.length - 2] = kep1;
        } else {
            if (op == '*') {
                keepe[keepe.length - 2] = kep1 * kep2;
            } else {
                keepe[keepe.length - 2] = kep1 / kep2;
            }
        }
        keepe.pop();                  
    }
    if (op == '^') {
        if (kep1 == 'x') {
            keepe[keepe.length - 2] = Math.pow(x, kep2 - 1) * kep2;
            keepe.pop();
        }
        else {
            keepe[keepe.length - 2] = Math.pow(kep1, kep2);
            keepe.pop();
        }
    }
    }
function addSects(sects) {
    let keeper = 0
    for (let i = 0; i < sects.length; i++) {
        if (sects[i] == '-') {
            continue;
        }
        if (sects[i - 1] == '-') {
            keeper -= Number(sects[i]);
        } else {
            keeper += Number(sects[i]);
        }
    } 
    return keeper;
}
function sectEval(x, sects) {
    let bigKeeper = [];
    for (let i = 0; i < sects.length; i++) {
        let sect = sects[i];
        let len = sect.length;
        if (sect != '-') {
            for (let j = 0; j < len; j++) {
                if (isNaN(sect[j])) {
                    continue;
                }
                sect[j] = Number(sect[j]);
            }
            let keeper = [];
            for (let j = 0; j < len; j++) {
                if (isNaN(sect[j]) && sect[j] != 'x') {
                    operator(sect[j], keeper, x);
                }
                else {
                    keeper.push(sect[j])
                }
            }            
            sect = keeper;
        }
        bigKeeper.push(sect);
    }
    return addSects(bigKeeper);
}
function ifX(array) {
    for (let i = 0; i <= array.length; i++) {
        if (array[i] == 'x') {
            return array;
        }
    }
    return null;
}
function checkForNone(polyn) {// section without an x
    let keeper = [];
    let sectKeepe = [];
    polyn = polyn.split(' ');
    for (let i = 0; i < polyn.length; i++) {
        if (polyn[i].charCodeAt(0) == 43 || polyn[i].charCodeAt(0) == 45) {// '+' || '-'
            if (polyn[i].charCodeAt(0) == 45) {
                sectKeepe.push("-");
            }
            let keee = keeper;
            keeper = [];
            for (let j = 0; j <= keee.length - 1; j++) { keeper.push(keee[j]); }
            sectKeepe.push(keeper);
            keeper = [keee[keee.length - 1]];
        } else {
            keeper.push(polyn[i]);
        }
    }
    sectKeepe.push(ifX(keeper));
    return sectKeepe;
}
function eval(x, polyn) {
    let sectKeepe = checkForNone(polyn);
    return sectEval(x, sectKeepe);
}
window.onload = run;