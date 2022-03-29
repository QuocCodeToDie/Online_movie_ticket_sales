function show_register() {
    var mainTitle = document.getElementById("main-title");
    var Title = document.getElementById("register-title");

    mainTitle.style.display = "none";
    Title.style.display = "block";


    // phan noi dung
    var content = document.getElementById("register-box");
    content.style.display = "block";

    var button = document.getElementById("register").style.display = "none";
    var button = document.getElementById("info").style.display = "none";
    var button = document.getElementById("support").style.display = "none";
    // var button_info = document.getElementById("info").style.display = "none";
    // var button_support = document.getElementById("support").style.display = "none";
}

function show_info() {
    var mainTitle = document.getElementById("main-title");
    var Title = document.getElementById("info-title");

    mainTitle.style.display = "none";
    Title.style.display = "block";


    // phan noi dung
    var content = document.getElementById("info-box");
    content.style.display = "block";

    var button = document.getElementById("register").style.display = "none";
    var button = document.getElementById("info").style.display = "none";
    var button = document.getElementById("support").style.display = "none";
    // var button_info = document.getElementById("info").style.display = "none";
    // var button_support = document.getElementById("support").style.display = "none";
}

function show_chatBot() {
    var mainTitle = document.getElementById("main-title");
    var Title = document.getElementById("cinemaBot-title");

    mainTitle.style.display = "none";
    Title.style.display = "block";


    // phan noi dung
    var content = document.getElementById("chatBot-box");
    content.style.display = "grid";

    var button = document.getElementById("register").style.display = "none";
    var button = document.getElementById("info").style.display = "none";
    var button = document.getElementById("support").style.display = "none";
    // var button_info = document.getElementById("info").style.display = "none";
    // var button_support = document.getElementById("support").style.display = "none";
}

function backSide() {
    var mainTitle = document.getElementById("main-title");
    mainTitle.style.display = "block";
    var Title = document.getElementById("register-title").style.display = "none";
    var Title = document.getElementById("info-title").style.display = "none";
    var Title = document.getElementById("cinemaBot-title").style.display = "none";

    // phan noi dung
    var content = document.getElementById("info-box").style.display = "none";
    var content = document.getElementById("register-box").style.display = "none";
    var content = document.getElementById("chatBot-box").style.display = "none";
    // phan button
    var button = document.getElementById("register").style.display = "block";
    var button = document.getElementById("info").style.display = "block";
    var button = document.getElementById("support").style.display = "block";

}


know = {
    "hello": "hi",
    "how are you?": "good",
    "ok": ":)"
};


function talk() {
    var user = document.getElementById("userBox").value;
    document.getElementById("userBox").value = "";
    document.getElementById("chatLog-rep").innerHTML += user + "<br>";
    // var user_rep = document.getElementById("chatLog-rep");
    // var node = document.createElement(user);
    // var p = document.createElement("p");
    // p.appendChild(node);
    // user_rep.appendChild(p);


    if (user in know) {
        document.getElementById("chatLog").innerHTML += know[user] + "<br>";
    } else {
        document.getElementById("chatLog").innerHTML += "Xem thông tin chi tiết ở: dongbacinema.com/htkh<br>";
    }
}