var reviews = [{
  "name": "Marshall Mixing", 
  "body": "Marshall did a great job turning a 'tin-like' sound into a warm earthy sound on a song I had recorded. Thanks!", 
  "rating": "4", 
  "reviewer": {
    "name": "Mary Jane Marcus"
  }},{
  "name": "Marshall Mixing", 
  "body": "Marshall is my favorite pro out there. Thanks!", 
  "rating": "5", 
  "reviewer": {
    "name": "Joe Schmoe"
  }},{
  "name": "Marshall Mixing", 
  "body": "Marshall is without question the best singer I've ever worked with, a true artist and a gentleman. Couldn't recommend him enough!!", 
  "rating": "4", 
  "reviewer": {
    "name": "Brian J."
  }}
]

window.onload = function(){
	var div = document.getElementById("sb_reviews_inner");
	var ul = document.getElementById("review_widget");
	for (r in reviews){
	  // get review data
	  var curr_review = reviews[r];
	  
	  // create list item
	  var curr_li = document.createElement("li");
	  curr_li.setAttribute("id", "item " + r);
	  curr_li.className += " rounded-corners";
	  
	  // reviewer name
	  var reviewer = document.createElement("p");
	  reviewer.innerHTML = curr_review.reviewer.name;
	  reviewer.style.fontStyle = "italic";
	  
	  // review body
	  var review_body = document.createElement("p");
	  review_body.innerHTML = curr_review.body;
	  
	  // rating
	  var rating = document.createElement("p");
	  rating.className += " review-stars";
	  for (var i = 0; i < curr_review.rating; i++){
		  var img = img_create("img/star-on.png");
	  	  rating.appendChild(img);
	  }
	  
	  // append all
	  curr_li.appendChild(reviewer);
	  curr_li.appendChild(review_body);
	  curr_li.appendChild(rating);
	  ul.appendChild(curr_li);
	}
	ul.firstChild.style.height = 135; // for infinite scroll
	
	// timed auto scroll, item to item
	div.scrollTop = 5;
	scrollReviews(ul.childNodes.length);
}

var REVIEW_SCROLL_DURATION = 1500;

function scrollReviews(numReviews)
{
	setTimeout(function(){
			scrollTo_new()
	}, 1000);
}


function scrollTo_new(){
    var ul = document.getElementById("review_widget");
	ul.appendChild(ul.firstChild.cloneNode(true));   
	ul.lastChild.id = "item 3";
	var container = document.getElementById("sb_reviews_inner");
	
	var maxOffset = ul.clientHeight - ul.lastChild.scrollHeight;
	
    function infScroll(idx, sofar, delay){
		setTimeout(function() {
			currItem = ul.childNodes[idx];
			if (container.scrollTop >= (sofar + currItem.scrollHeight)){
				idx = ++idx % 3;
				sofar += container.scrollTop;
				delay = 1000;
			}
			else{
				delay = 0;
				container.scrollTop += 1;
				if(container.scrollTop >= maxOffset){
					sofar = 5;
					container.scrollTop = 5;
					delay = 1000;
					idx = 0;
				}
			}
			window.requestAnimationFrame(function(){infScroll(idx, sofar, delay)}); 
		}, delay);
	}
	window.requestAnimationFrame(function(){infScroll(0, 0, 0)}, 1000); 
}


function img_create(src, alt, title) {
    var img= document.createElement('img');
    img.src = src;
    if (alt!=null) img.alt= alt;
    if (title!=null) img.title= title;
    return img;
}

function changeColor(c){
	var ul = document.getElementById('review_widget');
	var lis = ul.getElementsByTagName("li");
	for (var i = 0, len = lis.length; i < len; i++){
		console.log(i);
		lis[i].style.backgroundColor = c.value;
	}
	var pis = ul.getElementsByTagName("p");
	for (var i = 0, len = pis.length; i < len; i++){
		console.log(i);
		pis[i].style.backgroundColor = c.value;	
	}
}
 
