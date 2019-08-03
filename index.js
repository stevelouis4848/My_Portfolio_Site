// helps with Hides the mobile menu when webpage is cliked on
var body = document.getElementById("body");

//shows the mobile menu when called.
function show_mobile_menu()
{
	var menu_toggle = document.getElementById("toggle");
		if(menu_toggle.checked == false)			
			menu_toggle.checked = true;		
}

//hides the mobile menu when called.
function hide_mobile_Menu()
{
	var menu_toggle = document.getElementById("toggle");
		if(menu_toggle.checked == true)			
			menu_toggle.checked = false;		
}

// Hides the mobile menu when webpage is cliked on
if(body.addEventListener)
  body.addEventListener("click", bodyClick, false);
else
  body.attachEvent("onclick", bodyClick);

function bodyClick(event){
  var except = event.target.id;
	console.log(except);
	if(except === "hamburger_menu_item" || except === "toggle" ){
		return false;
	}
	else{
		hide_mobile_Menu();
	}
}

//keeps header in place when scrolling happens due to menu click

// Deals with hiding the header when scrolling in mobile view.
var x = window.matchMedia("(max-width: 900px)")
var prevScrollpos = window.pageYOffset;

//Smoothly scolls to anchor links
let anchorlinks = document.querySelectorAll('a[href^="#"]')
 
for (let item of anchorlinks) { // relitere 
	item.addEventListener('click', (e)=> {
		let hashval = item.getAttribute('href')
		let target = document.querySelector(hashval)
		target.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		})
		history.pushState(null, null, hashval)
		e.preventDefault()
	})
}
	
/*
		
		var menu_clicked = false;
		function menu_keep_header()
	{
	menu_clicked = true;
	}
		
		window.onscroll = function() {
	var currentScrollPos = window.pageYOffset;
		
	// Scrolling down show entire header in any screen size
	// else if scrolling up in specify screen size and not due to menu selection then hide header
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header").style.top = "0";
  } 
	else if(x.matches && menu_clicked == false) {
    document.getElementById("header").style.top = "-1px";
  }
	else if(menu_clicked == true){
		menu_clicked = false;
	}
  prevScrollpos = currentScrollPos;
}
*/
