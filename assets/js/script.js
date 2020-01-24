$(function() {
  $('[data-toggle="tooltip"]').tooltip();
});

//////////////////////////////////////////////////////////////////////////////////////////////////
// Old Typewriter ////////////////////////////////////////////////////////////////////////////////

// var TxtType = function(el, toRotate, period) {
//   this.toRotate = toRotate;
//   this.el = el;
//   this.loopNum = 0;
//   this.period = parseInt(period, 10) || 2000;
//   this.txt = "";
//   this.tick();
//   this.isDeleting = false;
// };

// TxtType.prototype.tick = function() {
//   var i = this.loopNum % this.toRotate.length;
//   var fullTxt = this.toRotate[i];

//   if (this.isDeleting) {
//     this.txt = fullTxt.substring(0, this.txt.length - 1);
//   } else {
//     this.txt = fullTxt.substring(0, this.txt.length + 1);
//   }

//   this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

//   var that = this;
//   var delta = 200 - Math.random() * 100;

//   if (this.isDeleting) {
//     delta /= 2;
//   }

//   if (!this.isDeleting && this.txt === fullTxt) {
//     delta = this.period;
//     this.isDeleting = true;
//   } else if (this.isDeleting && this.txt === "") {
//     this.isDeleting = false;
//     this.loopNum++;
//     delta = 500;
//   }

//   setTimeout(function() {
//     that.tick();
//   }, delta);
// };

// window.onload = function() {
//   var elements = document.getElementsByClassName("typewrite");
//   for (var i = 0; i < elements.length; i++) {
//     var toRotate = elements[i].getAttribute("data-type");
//     var period = elements[i].getAttribute("data-period");
//     if (toRotate) {
//       new TxtType(elements[i], JSON.parse(toRotate), period);
//     }
//   }
//   // INJECT CSS
//   var css = document.createElement("style");
//   css.type = "text/css";
//   css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
//   document.body.appendChild(css);
// };

//////////////////////////////////////////////////////////////////////////////////////////////////
// Navbar behavior on scroll & hover /////////////////////////////////////////////////////////////
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
};

$("#navbar").hover(
  function() {
    document.getElementById("navbar").style.top = "0px";
    document.getElementById("navbar").style.transition = "ease-in-out 1s";
  },
  function() {
    document.getElementById("navbar").style.top = "-50px";
    document.getElementById("navbar").style.transition = "ease-in-out 1s";
  }
);

//////////////////////////////////////////////////////////////////////////////////////////////////
// Brad Typewriter ///////////////////////////////////////////////////////////////////////////////
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}
//////////////////////////////////////////////////////////////////////////////////////////////////
