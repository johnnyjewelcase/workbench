document.getElementById("button1").addEventListener("click", function() {
  document.getElementById("box").style.height = "250px";
});

document.getElementById("button2").addEventListener("click", function() {
  document.getElementById("box").style.backgroundColor = "blue";
});

document.getElementById("button3").addEventListener("click", function() {
  var opacity = 1;
  var timer = setInterval(function() {
    if (opacity < 0.1) {
      clearInterval(timer);
      callback();
    }
    document.getElementById("box").style.opacity = opacity;
    opacity -= 0.1;
  }, 50);
});

document.getElementById("button5").addEventListener("click", function() {
  document.getElementById("box").style.border = "thick dotted pink";
});

document.getElementById("button6").addEventListener("click", function() {
  document.getElementById("box").style.transform = "rotate(45deg)";
});

document.getElementById("button4").addEventListener("click", function() {
  document.getElementById("box").style.height = "150px";
  document.getElementById("box").style.backgroundColor = "orange";
  document.getElementById("box").style.opacity = 1;
  document.getElementById("box").style.border = "none";
  document.getElementById("box").style.transform = "rotate(0deg)";
});
