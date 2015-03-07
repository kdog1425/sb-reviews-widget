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
	var ul = document.getElementById("reviews_ul");
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
    var ul = document.getElementById("reviews_ul");
	ul.appendChild(ul.firstChild.cloneNode(true));   
	ul.lastChild.id = "item 3";
	var container = document.getElementById("sb_reviews_inner");
	console.log(container.scrollTop, ul.clientHeight, ul.lastChild.clientHeight);
	
	var maxOffset = ul.clientHeight - ul.lastChild.scrollHeight;
	
    function infScroll(idx, sofar, delay){
		setTimeout(function() {
			currItem = ul.childNodes[idx];
			//console.log(idx, container.scrollTop, currItem.scrollHeight);
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

function scrollTo(toReview, numReviews, lastScroll, container, duration) {
	console.log("toReview:", toReview, "numReviews:", numReviews, "duration:", duration);
	if (toReview % numReviews == 0){
		container.scrollTop = 0;
		toReview = toReview % numReviews;
		duration = REVIEW_SCROLL_DURATION;
		lastScroll = -1;
	}
	
	var id = "item " + (toReview % numReviews);
	var li = document.getElementById(id);
	var to = li.offsetTop;
	console.log("curr top: ", container.scrollTop);
	console.log("scrolling to: ", to);
	if (container.scrollTop >= to || container.scrollTop == lastScroll){
		  console.log("reached item!!");
		  console.log("lastScroll:", lastScroll);
		  
	}
	else{
		//var style = window.getComputedStyle(li);
		//var margin = style.getPropertyValue('margin').replace(/[^-\d\.]/g, '');
		var difference = to - container.scrollTop;
		var perTick = difference / duration * 10;
	
		setTimeout(function() {
			lastScroll = container.scrollTop;
			console.log("lastScroll:", lastScroll);
			container.scrollTop = container.scrollTop + perTick;
			scrollTo(toReview, numReviews, lastScroll, container, duration - 10);
		}, 10);
	}
}

function cycle(numReviews, container){
	/*
	var ul = document.getElementById("reviews_ul");
	var firstli = ul.firstChild;
	var lastli = ul.lastChild;
	var firstid = firstli.id.replace("item ","");
	var lastid = lastli.id.replace("item ","");
	
	ul.removeChild(firstli);
	firstli.id = "item " + (++lastid % numReviews);
	ul.appendChild(firstli);
	lastid;
	return lastid;
	*/
}

function img_create(src, alt, title) {
    var img= document.createElement('img');
    img.src = src;
    if (alt!=null) img.alt= alt;
    if (title!=null) img.title= title;
    return img;
}
 
