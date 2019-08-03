<script>
// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementByTag("header").style.padding = "30px 10px";
    document.getElementById("branding").style.fontSize = "25px";
  } else {
    document.getElementByTag("header").style.padding = "80px 10px";
    document.getElementById("branding").style.fontSize = "35px";
  }
}
</script>
