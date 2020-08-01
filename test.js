function table(x) {
    let table = document.getElementById("table");
    table.rows[1].cells[1].innerText = x[0];//IPアドレス
    table.rows[2].cells[1].innerText = x[1];//サブネットマスク
    table.rows[3].cells[1].innerText = x[2];//ネットワークアドレス
    table.rows[4].cells[1].innerText = x[3] + "~" + x[4];//ホストアドレス
    table.rows[5].cells[1].innerText = x[5];//ブロードキャストアドレス
    table.rows[6].cells[1].innerText = x[6];//アドレス数
    table.rows[7].cells[1].innerText = x[7];//クラス
}
function change2(x) {
    let y = parseInt(x).toString(2);
    return y;
}
function change10(x) {
    let y = parseInt(x, 2);
    return y;
}
function changeSubnet2(x) {
    let y = x.split(".");
    for (var i = 0; i < y.length; i++) {
        y[i] = parseInt(y[i]).toString(2);
    }
    return y;
}
function solveNetwork(x, y) {
    return x & y;
}
function solveBroadcast(x, y) {
    console.log("x" + x + ":" + "y" + y)
    console.log(((~y) >>> 0).toString(2).slice(-8))
    return x | parseInt(((~y) >>> 0).toString(2).slice(-8), 2);
}
function networkAddress(x, y) {
    let z = [];
    for (var i = 0; i < x.length; i++) {

        z[i] = solveNetwork(x[i], y[i]);
    }
    return z
}
function Broadcast(x, y) {
    let z = [];
    for (var i = 0; i < x.length; i++) {
        console.log("x[i]" + x[i] + ":" + "y[i]" + y[i]);
        z[i] = solveBroadcast(parseInt(x[i],2), parseInt(y[i],2));
    }
    return z
}
function hostaddressfront(x){
    console.log("x:"+x)
    return change2(x[3]) + 0b1 >>> 0;
}
function hostaddressback(x) {
    console.log("x:"+x)
    return change2(x[3]) - 0b1 >>> 0;
}
function addressnum(x, y) {
    return y[3] - x[1] + 1;
}
function classresolve(x) {
    if (x[0] < 128) {
        return "A";
    } if (x[0] > 127 && x[0] < 192) {
        return "B";
    } if (x[0] > 191 && x[0] < 224) {
        return "C";
    }
    if (x[0] > 223 && x[0] < 240) {
        return "D";
    } else {
        return "E";
    }
}
function subnet(x) {
    let frm = document.forms["frm"];
    let index = frm.elements["subnet"].selectedIndex;
    console.log("fda" + index);
    return frm.elements["subnet"].options[index].text;
}
let x ="255";
let y ="255";
let z ="0";
let xarray =[x,x,z,z];
let yarray =[x,x,x,z];
console.log(networkAddress(xarray,yarray));