//Kepps header when scrolling hapends to navigation link anchor
      //html
      <ul id="menu" onclick="menu_keep_header()">
      //css 
      $(document).ready(function(){
      //keeps header in place when scrolling happens due to menu click
      // Deals with hiding the header when scrolling in mobile view.
      var x = window.matchMedia("(max-width: 900px)")
      var prevScrollpos = window.pageYOffset;

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
      else if(x.matches && menu_clicked === false) {
        document.getElementById("header").style.top = "-1px";
      }
      else if(menu_clicked === true){
        menu_clicked = false;
      }
      prevScrollpos = currentScrollPos;
      }
      });
      
      // extra social logs with link
      // html
      <a href = "https://plus.google.com/118247682491473545617" target="_blank"><i id="google_plus_logo" class="fab fa-google-plus-square fa-3x"></i></a>
      <a href = "https://www.facebook.com/steve.louis.9" target="_blank"><i id="facebook_logo" class="fab fa-facebook-square fa-3x"></i></a>
      <a href = "https://twitter.com/The_GreatSteveo" target="_blank"><i id="twitter_logo" class="fab fa-twitter-square fa-3x"></i></a>
      
      //php debug sennding mail
      echo json_encode("to:\n$to_1 and $to_2\nsubject:\n$subject\nbody:\n$body\nheaders:\n$headers\n\n");        
      else{

            foreach($emails_arr as $key => $email_to){

                  mail($email_to, "Contact form submission: hard code","Hello hard code 2:28","From: testServer\n");
            }
      }

// to see if element is in view and then manuplate it (not finished CAREFUL)

      //Bring the section tittles out
function is_element_in_view(el){
		
	number_of_elements = el.length;
	
	// empty array to store the visible elements
	var visible_elements = []; 	
	visible_elements_count = 0;
	
	for(i = 0; i < number_of_elements; i++){
		console.log("In loop");
		// Gets the boundary of the element in the client view
		var el_bound = el[i].getBoundingClientRect();
		
		// Tells whether the element is within the client's view
		if(	el_bound.top >=0 && 
			el_bound.left >= 0 && 
			el_bound.bottom <= $(window).height() &&
			el_bound.right <=  $(window).width()
		){
				console.log("got one");
				visible_elements[visible_elements_count] = el[i];
				visible_elements_count += 1;
		}
	}
	
	return visible_elements;
}

//Updates if an element is visible or not 
function on_visibility_change(el){
	var old_visibility;
	
	return function (){		
				
		var visibility;	
		
		var visibile_objects = is_element_in_view(el);
		
		if( visibile_objects.length > 0)
			visibility = true;	
		else
			visibility = false;
					
		if(old_visibility != visibility)
			old_visibility = visibility;
	}		
}

var handler = function(){
		
		var titles = document.getElementsByClassName("main_sections_content_wrapper");
		var titles_length = titles.length;
			
		var visible_titles = is_element_in_view(titles);
			
		//var non_visible_titles = titles.filter(title => visible_titles.indexOf(title) === -1);	
		
		var visible_titles_length = visible_titles.length;
		
		console.log(titles);
		console.log("visible " + visible_titles.length)

		for(i = 0;i < titles_length; i++){
			for(j = 0; j < visible_titles_length; j++){
				
				var index = visible_titles[j];
				var current_title = titles[index]; 
				
				if(titles[i] == current_title){
					
					$(titles[i]).children('h3').style.display = "block";	
					console.log("visible");
					console.log((titles[i]).children('h3'));
				}
				else{
					$(titles[i]).children('h3').style.display = "none";	
				}		
			}
		} 
	};

$(window).on('DOMContentLoaded load resize scroll', handler)
