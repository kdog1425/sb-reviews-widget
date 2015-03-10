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
	var cssTextDict = createCssText();
	createPreviewElements();
	createCustomizationElements();
	var sb_reviews_bg_color = document.getElementById("sb_reviews_widget").getAttribute("data");
	refreshEmbedCode(sb_reviews_bg_color, cssTextDict);
	updateCss(cssTextDict);
	updateReviewsList(cssTextDict);
}

function updateReviewsList(cssTextDict){
	// populate reviews list
	var sb_reviews_list = document.getElementById("sb_reviews_list");
	for (r in reviews){
	  // get review data
	  var curr_review = reviews[r];
	  
	  // create list item
	  var curr_li = document.createElement("li");
	  curr_li.setAttribute("id", "item " + r);
	  curr_li.style.cssText += cssTextDict["cssText_li"];
	  curr_li.style.cssText += cssTextDict["cssText_roundCorners"];
	  
	  // reviewer name
	  var reviewer = document.createElement("p");
	  reviewer.style.cssText += cssTextDict["cssText_p"];
	  reviewer.innerHTML = curr_review.reviewer.name;
	  reviewer.style.fontStyle = "italic";
	  
	  // review body
	  var review_body = document.createElement("p");
	  review_body.innerHTML = curr_review.body;
	  review_body.style.cssText += cssTextDict["cssText_reviewBody"];
	  
	  // rating
	  var rating = document.createElement("p");
	  rating.style.cssText += cssTextDict["cssText_reviewStars"];
	  for (var i = 0; i < curr_review.rating; i++){
		  var img = img_create("img/star-on.png");
	  	  rating.appendChild(img);
	  }

	  var backlinkHtml = "<a  style=\"text-decoration: none; color: #aaa\" href=\"http://soundbetter.com\"> ...Read More</a>";
	  
	  // append all
	  curr_li.appendChild(reviewer);
	  curr_li.appendChild(rating);
	  curr_li.appendChild(review_body);
	  sb_reviews_list.appendChild(curr_li);	  

	  // line clamping
	  var containerHeight = 60;
	  var totalHeight = reviewer.clientHeight + rating.clientHeight + review_body.clientHeight;
	  while (totalHeight > containerHeight) {
		review_body.innerText = review_body.innerText.replace(/\W*\s(\S)*$/, '...');
		totalHeight = review_body.clientHeight + reviewer.clientHeight + rating.clientHeight;
	  }
	  review_body.innerHTML = review_body.innerHTML.replace('...', backlinkHtml);
	}
}

function updateCss(cssTextDict){
	updateElementStyle("sb_badgeImg", cssTextDict["cssText_sbBadge"]);
	updateElementStyle("sb_reviews_widget", cssTextDict["cssText_sbReviewsWidget"]);
	updateElementStyle("sb_embed_preview", cssTextDict["cssText_sbEmbedPreview"]);
	updateElementStyle("sb_reviews_outer", cssTextDict["cssText_sbReviewsOuter"]);
	updateElementStyle("sb_reviews_inner", cssTextDict["cssText_sbReviewsInner"]);
	updateElementStyle("sb_reviews_list", cssTextDict["cssText_sbReviewsList"]);
	updateElementStyle("sb_customization_section", cssTextDict["cssText_sbCustomizationSection"]);
}

function createPreviewElements(){
	var mainDiv = document.getElementById("sb_reviews_widget");
	if (mainDiv){
		var sb_embed_preview = createElement("div", "sb_embed_preview") 
		mainDiv.appendChild(sb_embed_preview);
		var sb_badge_a = createElement("a", "sb_badge");
		sb_badge_a.setAttribute("href", "http://soundbetter.com");
		var sb_badge_img = createElement("img", "sb_badgeImg");
		sb_badge_img.setAttribute("src", "img/SoundBetterBadge.png");
		sb_badge_a.appendChild(sb_badge_img);
		sb_embed_preview.appendChild(sb_badge_a);
		var sb_reviews_list = createElement("ul","sb_reviews_list");
		var sb_reviews_inner = createElement("div","sb_reviews_inner");
		var sb_reviews_outer = createElement("div","sb_reviews_outer");
		sb_reviews_outer.appendChild(sb_reviews_inner);
		sb_reviews_inner.appendChild(sb_reviews_list);
		sb_embed_preview.appendChild(sb_reviews_outer);
	}
	else{
		console.log("'sb_reviews_widget' div not in html!");
	}
}

function createCustomizationElements(){
	var mainDiv = document.getElementById("sb_reviews_widget");
	if (mainDiv){
		var sb_customization_section = createElement("div", "sb_customization_section"); 
		mainDiv.appendChild(sb_customization_section);
		var backgroundColor = createElement("p", "sb_bgColor_control");
		backgroundColor.innerHTML = "Change background: <input class=\"color\"onchange=\"changeColor(this)\">";
		var js_widget_code = createElement("p", "");
		js_widget_code.innerHTML = "Paste this code to load the widget scripts:";
		var js_textarea = createElement("textarea", "sb_embed_code_js");
		var html_widget_code = createElement("p", "");
		html_widget_code.innerHTML = "Paste this code where you want the widget:";
		var html_textarea = createElement("textarea", "sb_embed_code_html");
		sb_customization_section.appendChild(backgroundColor);
		sb_customization_section.appendChild(js_widget_code);
		sb_customization_section.appendChild(js_textarea);
		sb_customization_section.appendChild(html_widget_code);
		sb_customization_section.appendChild(html_textarea);
	}
	else{
		console.log("'sb_reviews_widget' div not in html!");
	}
}

function img_create(src, alt, title) {
    var img= document.createElement('img');
    img.src = src;
    if (alt!=null) img.alt= alt;
    if (title!=null) img.title= title;
    return img;
}

function changeColor(c){
	var div_outer = document.getElementById('sb_reviews_outer');
	div_outer.style.backgroundColor = c.value;
	refreshEmbedCode(c.value);
}
 
function refreshEmbedCode(c, cssTextDict){
	var js = document.getElementById("sb_embed_code_js");
	var html = document.getElementById("sb_embed_code_html");
	js.innerHTML = "<script src=\"soundbetter_reviews.js\"></script><script type=\"text/javascript\" src=\"jscolor/jscolor.js\"></script>";
	html.innerHTML = "<div data=" + c + " id=\"sb_reviews_widget\"></div>";
}

function createElement(type, id){
	var newElement = document.createElement(type);
	newElement.setAttribute("id",id);
	return newElement;
}


function scrollReviews(numReviews)
{
	var sb_review_list = document.getElementById("sb_review_list");
	sb_review_list.firstChild.style.height = 135; // for infinite scroll
	setTimeout(function(){
			scrollToNextReview()
	}, 1000);
}

function updateElementStyle(id, cssString){
	var curr = document.getElementById(id);
	if (curr){
		curr.style.cssText += cssString;
	}
}

function createCssText(){
	var cssTextDict = {}
	cssTextDict["cssText_roundCorners"] = "-moz-border-radius: 5px;-webkit-border-radius: 5px;-khtml-border-radius: 5px;border-radius: 5px;";
	cssTextDict["cssText_sbReviewsWidget"] = "width: 260px; height: 500px; background: rgba(224, 220, 230, 0.48); -moz-border-radius: 5px;-webkit-border-radius: 5px;-khtml-border-radius: 5px;border-radius: 5px; border: 1px solid #fff;";

	cssTextDict["cssText_sbEmbedPreview"] = "border-bottom: 1px solid #f8f8f8; padding-bottom: 5px; width:inherit;height:60%;";

	cssTextDict["cssText_sbBadge"] =  "padding-top: 5px; padding-bottom: 10px;display: block;margin-left: auto;margin-right: auto; height: 30%;";

	cssTextDict["cssText_sbReviewsOuter"] = "width: 90%; height: 60%; position: relative; margin: 0px auto; border: 1px solid #ddd; border-radius: 3px; overflow-y: scroll;";

	cssTextDict["cssText_sbReviewsInner"] = "width: 90%; height: auto; margin: 0 auto; padding-bottom: 15px;";

	cssTextDict["cssText_sbReviewsList"] = "text-align: left !important; list-style: none; list-style-position:inside; margin:0; padding:0; line-height: 1.0;";

	cssTextDict["cssText_li"] = "margin: 5px;font-family: Verdana, Arial, sans-serif; font-weight: 3; font-size: 80%; line-height: inherit; border-bottom: 1px solid #fbfbfb;";

	cssTextDict["cssText_p"] = "opacity: 1.0; padding-bottom: 2px; margin-bottom:2px; height: 10px;";

	cssTextDict["cssText_reviewBody"] = "opacity: 1.0; margin-top: 2px; margin-bottom: 7px;";

	cssTextDict["cssText_reviewStars"] = "margin-bottom: 2px; margin-top: 1px;";

	cssTextDict["cssText_sbCustomizationSection"] = "height: 50%; padding-top: 5px; text-align: center; font-family: Georgia; font-weight: 3; font-size: 80%;";
	return cssTextDict;
}