// Your code here!
function oDisplay(narray = [], oNarray = []) {
    var ds = 600;
    var myD3 = d3.select("body")
        .append("svg")
        .attr("width", ds)
        .attr("height", ds);
    let array = narray;
    let oArray = oNarray;
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
    var counter = 0;
    let x = meanF(array) * 10;
    let v = meanF(oArray) * 10;
    let doFunc;
    if (array.length == 150) {
        doFunc = setInterval(function () { makeItems(array, oArray); }, 50);
    }    
    function makeItems(array, oArray) {
        if (counter == 150) {
            clearInterval(doFunc);
            return;
        }
        let keep = array[counter] * 60;
        let kee = oArray[counter] * 60;
        counter = counter + 1;
        if (keep >= 0 && kee >= 0) {
            myD3.append("rect")
                .attr("x", ds / 2)
                .attr("y", ds / 2 - kee)
                .attr("width", keep)
                .attr("height", kee)
                .attr("strokeWidth", 1)
                .attr("stroke", "pink")
                .attr("fill", "none");
        }
        if (keep < 0 && kee >= 0) {
            myD3.append("rect")
                .attr("x", ds / 2 + keep)
                .attr("y", ds / 2 - kee)
                .attr("width", Math.abs(keep))
                .attr("height", kee)
                .attr("strokeWidth", 1)
                .attr("stroke", "pink")
                .attr("fill", "none");
        }
        if (keep >= 0 && kee < 0) {
            myD3.append("rect")
                .attr("x", ds / 2)
                .attr("y", ds / 2)
                .attr("width", keep)
                .attr("height", Math.abs(kee))
                .attr("strokeWidth", 1)
                .attr("stroke", "pink")
                .attr("fill", "none");
        }
        if (keep < 0 && kee < 0) {
            myD3.append("rect")
                .attr("x", ds / 2 + keep)
                .attr("y", ds / 2)
                .attr("width", Math.abs(keep))
                .attr("height", Math.abs(kee))
                .attr("strokeWidth", 1)
                .attr("stroke", "pink")
                .attr("fill", "none");
        }
        let nummm = counter * 20;
        let string = "mudbrown";
        myD3.append("circle")
            .attr("cx", ds / 2 + keep)
            .attr("cy", ds / 2 - kee)
            .attr("r", 1)
            .style("fill", string);
    }

}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Run it++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function tsvToJSON(tsv) {
    var lines = tsv.replace(/\t\r/g, '').replace(/\r/g, '').split("\n");
    var headers = lines[0].toUpperCase().split(/,|\t/);
    var result = {};
    headers.forEach((e) => { result[e] = []; })
    for (var i = 1; i < lines.length; i++) {
        var currentline = lines[i].split(/,|\t/);
        if (currentline.length === headers.length) {
            headers.forEach((d, i) => {
                result[headers[i]].push(currentline[i]);
            });
        }
    }
    return result;
}
function typF(array, num) {
    if (num == '1') {
        return array;
    }
    if (num == '2') {
        return stanningV(array);
    } else {
        return -1;
    }
}
function chooseFunc(thing, numm, thing2 = []) {
   if (numm == 1) {
        return calcuVari(thing, thing2);
    } else if (numm == 2) {
        oDisplay(thing, thing2);
        return correl(thing, thing2);
    }else if (numm == 3) {
        return thing;
    } else { return -1 }
}
//runs it
function run() {
    let element = document.getElementById('output');
    var input;
    var input2;
    let helder = new Array;
    let helder2 = new Array;
    document.getElementById('fileinput')
        .addEventListener("change", (e) => {
            input = e.target;
        });
    document.getElementById('butt')
        .addEventListener("click", (e) => {
                let col = (document.getElementById('textaria').value);
                let col2 = (document.getElementById('textaria2').value);
                col = col.split(',');
                col2 = col2.split(',');
                let holde;
                let headers;
                let reader = new FileReader();
                reader.onload = function () {
                    let tsv = reader.result;
                    let lines = tsv.replace(/\t\r/g, '').replace(/\r/g, '').split("\n");
                    headers = lines[0].toUpperCase().split(/,|\t/);
                    holde = tsvToJSON(tsv);
                    helder = holde[headers[Number(col[1]) - 1]].map(item => { return Number(item); });
                    helder2 = holde[headers[Number(col2[1]) - 1]].map(item => { return Number(item); });
                    
                };
            
            reader.readAsText(input.files[0]);
            document.getElementById('but')
                .addEventListener("click", (e) => {
                    document.getElementById('but')
                        .removeEventListener("click", e => { });
                    let type1 = (document.getElementById('textaria').value);
                    let type2 = (document.getElementById('textaria2').value);
                    type1 = type1.split(',');
                    type2 = type2.split(',');
                    let holder = typF(helder, type1[0]);
                    let holder2 = typF(helder2, type2[0]);
                    let myText = "A:" + headers[Number(type1[1]) - 1] + " Mean" + meanF(holder) + " St. Deviation:" + stanDevi(holder) + " Median:" + medianF(holder);
                    let myText2 = "B:" + headers[Number(type2[1]) - 1] + " Mean" + meanF(holder2) + " St. Deviation:" + stanDevi(holder2) + " Median:" + medianF(holder2);
                    
                    let title = document.getElementById('title');
                    let title2 = document.getElementById('title2');
                    title.innerText = myText;
                    title2.innerText = myText2;                
                    //if(valu == 1){holder = }
                    oDisplay(stanningV(holder), stanningV(holder2));
                });
        });
}
    


//-----------------------------------------------------------------what you can do to the array--------------------------------------------------

function meanF(array = []) {
    let total = 0;
    let narray = array.map(item => {
        total += item;
    });
    let numm = array.length;
    return total / numm;
}   
function medianF(array = []) {
    let numm = array.length;
    let holder = 0, narray = array.sort();
    holder = (narray[Math.floor((numm - 1) / 2)] + narray[Math.ceil((numm - 1) / 2)]) / 2;
    return holder;
}
function stanDevi(array = []) {
    let narray = array.map(item => {
        return Math.pow(item, 2);
    }); 
    let sqrNum = Math.pow(array.length, 2);
    let holder = new Array;
    narray.map((i, d) => {
        holder[d] = Math.sqrt(Math.abs(i - sqrNum));
    });
    let resuoul = meanF(holder);
    return resuoul;
}
function stanningV(array = []) {
    let narray = array;
    let mean = meanF(narray);
    narray = narray.map(item => {
        return item - mean;
    });
    return narray;

}
function calcuVari(array = [], oArray = array) {
    let devi = stanDevi(array), oDevi = stanDevi(oArray);
    let mean = meanF(array), oMean = meanF(oArray);
    let holder = 0;
    let narray = array.map((i, d) => {
        holder += array[d] * oArray[d];
    });
    holder = holder / (array.length - 2);
    return holder;
}
function correl(array = [], oArray = []) {
    let narray = stanningV(array), oNarray = stanningV(oArray);
    let holder = calcuVari(narray, oNarray);
    return holder;
}
////////////////////////////////////////////////////////////run it////////////////////////////////////////////////////////////////////////////////
window.onload = run;
