// Global variabbles
// helps with Hides the mobile menu when webpage is cliked on
var body = document.getElementById("body");
var menu_trans_y = 10;
var preloadOffSetTime = 7500;
var preloadChangeTime = 15000;
var pictureChangeTime = 15000;
var pictureArraySize = 6;
var currentPicIndex = -1;
var pictureLinkArray = ["url('../assets/pictures/bg_8.jpg')",
                        "url('../assets/pictures/bg_1.jpg')",
                        "url('../assets/pictures/bg_4.jpg')",
                        "url('../assets/pictures/bg_2.jpg')",
                        "url('../assets/pictures/bg_5.jpg')",
                        "url('../assets/pictures/bg_9.jpg')"]

// Turns the header transparent and white and appropriate changes.
function header_transparent() {

 $("#header").css('background-color', 'transparent');
 $("#header a, #header h3").css('color', 'white');
 $("#branding").css('color', 'white');
 $("#hamburger_menu").css('color', 'white');
}

// Gives header color and appropriate changes.
function header_color() {
 $("#header").css('background-color', 'white');
 $("#header a, #header h3").css('color', '#767676');
 $("#resume_link a").css('color', 'green');
 $("#hamburger_menu").css('color', '#767676');
 $("#header").css('box-shadow', '0 0 10px rgba(0,0,0,.05)');
}

// Shows dropdown munu and makes it color if hidden
function show_mobile_menu() {
 if ($("#menu_mobile").is(':hidden')) {
  $("#menu_mobile").css('display', 'block');
  header_color();
 }
}

// Hides dropdown menu if and makes menu tranparent if closed at the top.
function hide_mobile_menu() {
 if ($("#menu_mobile").is(':visible')) {
  $("#menu_mobile").css('display', 'none');

  // returns menu to transparent if we hide menu at top of page.
  if ($(window).scrollTop() <= menu_trans_y) {
   header_transparent();
  }
 }
}

// Hides the mobile menu when page is scaled up to predefined width
function width_change_action() {
 if (page_width.matches) {
  hide_mobile_menu();
 }
}

// Depending on page y position header is different.
function page_header_change() {
 if ($(window).scrollTop() <= menu_trans_y && $("#menu_mobile").is(':hidden')) {
  header_transparent();
 } else {
  header_color();
 }
}

//Preloads the next image in the hidden div
function preloadShowcasePic(){
    currentPicIndex++;
    if(currentPicIndex >= pictureArraySize)
        currentPicIndex = 0;

    if($("#showcase_1").css('visibility') == "hidden")
        $("#showcase_1").css('background-image', pictureLinkArray[currentPicIndex]);
    else
        $("#showcase_2").css('background-image', pictureLinkArray[currentPicIndex]);
}

//Runs the preload function and then very sertain interval
function preloadOffSet(){
    preloadShowcasePic();
    setInterval(preloadShowcasePic, preloadChangeTime);
}

//Function to change showcase picture,hides 1 div and shows another
function changeShowcasePic(){

    if($("#showcase_1").css('visibility') == "visible"){
        $("#showcase_1").css("visibility", "hidden");
        $("#showcase_1").css("min-height", 0+"px");
        $("#showcase_1").css("height", 0+"px");

        $("#showcase_2").css("visibility", "visible");
        $("#showcase_2").css("min-height", 600+"px");
    }
    else{
        $("#showcase_1").css("visibility", "visible");
        $("#showcase_1").css("min-height", 600+"px");
        
        $("#showcase_2").css("visibility", "hidden");
        $("#showcase_2").css("min-height", 0+"px");
        $("#showcase_1").css("height", 0+"px");
    }
}


$(document).ready(function() {
 page_header_change();
});

// Dropdown menu is shown when menu icon is clicked.
// Dropdown menu is hidden if open and anywhere is clicked
$(document).ready(function() {
 if (body.addEventListener)
  body.addEventListener("click", bodyClick, false);
 else
  body.attachEvent("onclick", bodyClick);

 function bodyClick(event) {
  var except = event.target.id;
  if (except === "hamburger_menu" && $("#menu_mobile").is(':hidden')) {
   show_mobile_menu();
  } else {
   hide_mobile_menu();
  }
 }
});

// Turn header invisible when page is at the top
$(document).ready(function() {
 $(window).scroll(function() {
  page_header_change();
 });
});

//Smoothly scolls to anchor links
$(document).ready(function() {
 let anchorlinks = document.querySelectorAll('a[href^="#"]');

 for (let item of anchorlinks) { // relitere 
  item.addEventListener('click', (e) => {
   let hashval = item.getAttribute('href');
   let target = document.querySelector(hashval);
   target.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
   });
   history.pushState(null, null, hashval);
   e.preventDefault();
  });
 }
});

//preloads the image with after a certain time passes.
$(document).ready(setTimeout(preloadOffSet, preloadOffSetTime))

//Changes the showcase picture every certain time in milliseconds
$(document).ready(setInterval(changeShowcasePic, pictureChangeTime))

//Sends Post to server when submit button is pressed,also return response
$(document).ready(function() {
 // click on button submit
 $("#submit").on('click', function() {
  // send ajax
  $.ajax({
   url: '../php/message.php', // url where to submit the request
   type: "POST", // type of action POST || GET
   dataType: 'json', // data type
   data: data = $("#contact-us").serialize(), // POST data || get data
   success: function(result) {

    if (result === "success") {

     var successMessage = "<strong>Thank You !</strong> Your message has been send.";
     $("#submitMessage").html(successMessage).css('color', 'green');

     $("#contact-us")[0].reset();
     grecaptcha.reset();
    } else {
     $("#submitMessage").html(result).css('color', 'red');
    }
   },
   error: function(xhr, resp, text) {
   }
  });

  if ($("#submitMessage").is(":hidden")) {
   $("#submitMessage").show();
  }
 });
});

var page_width = window.matchMedia("(min-width: 1000px)");
width_change_action(); // Call listener function at run time
page_width.addListener(width_change_action); // Attach listener function on state changes
