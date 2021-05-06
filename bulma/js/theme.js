const targetNode = document.getElementById('mkdocs-search-results');
const config = { attributes: true, childList: true, subtree: true };
var observer = new MutationObserver(function(mutations) {
  var hasUpdates = false;
  for (var index = 0; index < mutations.length; index++) {
    var mutation = mutations[index];
    if (mutation.type === 'childList' && mutation.addedNodes.length) { 
    	hasUpdates = true
      break;
    }
  }
  if (hasUpdates) {
  		var body = document.querySelector('.content');
		if ( targetNode.firstChild.nodeName != "P"){
			body.style.display = "none";
			targetNode.style.display = "block";
		}else{
			targetNode.style.display = "none";
			body.style.display = "block";
	    }
	}
});
// Setup a timer
var timeout;
// Setup the breakpoint variable
var breakpoint;
// Get the current breakpoint
var getBreakpoint = function () {
	return window.getComputedStyle(document.body, ':before').content.replace(/\"/g, '');
};
var side = document.getElementById('nav-toc');
var search = document.getElementById('nav-search');

window.addEventListener('load', function ( event ) {
  // Calculate breakpoint on page load
  breakpoint = getBreakpoint();
  switch(breakpoint) {
	case 'xsmall':
	case 'small':
	case 'medium':
		side.classList.add('quickview');	
		side.classList.remove('sticky');
	break;		
	case 'large':
		side.classList.remove('quickview');
		side.classList.add('sticky');
	break;
  }
});

search.addEventListener("click", function(e){
	document.getElementsByClassName('search')[0].classList.toggle("show");
});

// Listen for resize events
window.addEventListener('resize', function ( event ) {
	breakpoint = getBreakpoint();
	if (timeout) {
		window.cancelAnimationFrame(timeout);
	}
	timeout = window.requestAnimationFrame(function () {
		switch(breakpoint) {
			case 'small':
			case 'medium':
				side.classList.add('quickview');	
				side.classList.remove('sticky');
			break;		
			case 'large':
				side.classList.remove('quickview');
				side.classList.add('sticky');
			break;
		}
	});
}, false);

(function() {
  observer.observe(targetNode, config);
  
  var quickviews = bulmaQuickview.attach();
  
	// Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

  var selects = document.getElementsByTagName('h2');
  var sections = {};
  for(var i = 0; i < selects.length; i++){
    sections[selects[i].id] = selects[i].offsetTop;  
  };
  
  var tocLinks = side.getElementsByClassName('h2');
  for(var i = 0; i < tocLinks.length; i++){
    tocLinks[i].addEventListener("click", function(e) {
		side.classList.remove('is-active');
	});
  };
  
  
  window.onscroll = function() {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    for (var key in sections) {
	
      if (sections[key] <= scrollPosition) {
     
        var t = document.querySelector('#nav-toc ul li a.current');
        if (t !== null) t.setAttribute('class', '');
		
        var t2 = side.querySelector('#nav-toc ul li a[href*="#'+key+'"]');
        if (t2 !== null) t2.setAttribute('class', 'current');
			
      }
    }
  };
})();
