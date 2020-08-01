document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("form").addEventListener("submit", function (e) {
        const form = document.forms.frm;
        const ip = [form.ipaddress1.value, form.ipaddress2.value, form.ipaddress3.value, form.ipaddress4.value];
        const select = form.subnet.value;
        const ipaddress = ip.toString;
        const subnetmask = subnet("subnet");
        const networkaddress = networkAddress(ip, changecomma(select));
        const broadCastaddress = Broadcast(ip, changecomma(select));
        const hostfront = hostaddressfront(networkaddress);
        const hostback = hostaddressback(broadCastaddress);
        const addressNum = addressnum(subnetmask);
        const classvalue = classresolve(ip);
        if(subnetmask.match(/[0-9]+/)[0]==32){
            const ans =[ip,subnetmask,"ー","ー","ー","ー",addressNum,"ー"];
            table(ans);
        }else{
            const ans = [ip.join("."), subnetmask, networkaddress.join("."), hostfront.join("."), hostback.join("."), broadCastaddress.join("."), addressNum, classvalue];
            table(ans);
        }
        
        
        
    }, false);
}, false)

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
function changecomma(x) {
    let y = x.split(".");
    return y;
}
function solveNetwork(x, y) {
    return x & y;
}
function solveBroadcast(x, y) {
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
        z[i] = solveBroadcast(x[i], y[i]);
    }
    return z
}
function hostaddressfront(x){
    let y =Array.from(x);
    let text =change2(y[3]) + 0b1 >>> 0;
    y[3]=text;
    return y;
}
function hostaddressback(x) {
    let y =Array.from(x);
    let text = change2(y[3]) - 0b1 >>> 0;
    y[3]=parseInt(text,2);
    return y;
}
function addressnum(x) {
    let text = x.match(/[0-9]+/);
    return Math.pow(2,32-text);
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
    return frm.elements["subnet"].options[index].text;
}