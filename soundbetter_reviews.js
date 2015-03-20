
var SB_REVIEWS = [];
var SB_CONTROLS = [];

window.onload = function(){
	var sb_reviews_widget = document.getElementById("sb_reviews_widget");
	if (sb_reviews_widget){
		SB_REVIEWS = getReviews();
	}
	else{
		console.log("'sb_reviews_widget' div not in html!");
	}
}

function getReviews(){
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET","http://localhost:3000/review_widget/fetch_reviews.json",true);
	xmlhttp.send();
	xmlhttp.onreadystatechange=function()
	  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	SB_REVIEWS = eval(xmlhttp.responseText);
	    	createWidget();
	    }
	  }
}

function createWidget(){
	var cssTextDict = createCssText();
	createPreviewElements(sb_reviews_widget);
	createCustomizationElements(sb_reviews_widget);
	SB_CONTROLS["color"] = sb_reviews_widget.dataset.color;
	SB_CONTROLS["autoscroll"] = sb_reviews_widget.dataset.autoscroll;
	refreshEmbedCode(SB_CONTROLS);
	updateCss(cssTextDict);
	updateReviewsList(cssTextDict);
	scrollReviews();
}

function updateReviewsList(cssTextDict){
	// populate reviews list
	var sb_reviews_list = document.getElementById("sb_reviews_list");
	for (r in SB_REVIEWS){
	  // get review data
	  var curr_review = SB_REVIEWS[r];
	  
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
	updateElementStyle("autoscroll_checkbox", cssTextDict["cssText_checkbox"]);
}

function createPreviewElements(mainDiv){
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

function createCustomizationElements(mainDiv){
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

	//<input type="checkbox" id="xxx" name="xxx" onclick="calc();"/>
	var scroll_p = createElement("p", "");
	scroll_p.style.cssText += ""
	var scroll_span = createElement("span","scroll_span_text");
	scroll_span.innerHTML = "Infinite autoscroll On/Off";
	scroll_p.appendChild(scroll_span);
	var scrollCheckBox = createElement("input","autoscroll_checkbox");
	scroll_p.appendChild(scrollCheckBox);
	scrollCheckBox.type = "checkbox";
	scrollCheckBox.setAttribute("onclick", "scrollFunc()");

	sb_customization_section.appendChild(scroll_p);
	sb_customization_section.appendChild(backgroundColor);
	sb_customization_section.appendChild(js_widget_code);
	sb_customization_section.appendChild(js_textarea);
	sb_customization_section.appendChild(html_widget_code);
	sb_customization_section.appendChild(html_textarea);
	
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
	SB_CONTROLS["color"] = '#' + c.value;
	refreshEmbedCode();
}
 
function refreshEmbedCode(){
	var js = document.getElementById("sb_embed_code_js");
	var html = document.getElementById("sb_embed_code_html");
	js.innerHTML = "<script src=\"soundbetter_reviews.js\"></script><script type=\"text/javascript\"></script>";
	html.innerHTML = "<div data-autoscroll= " + SB_CONTROLS["autoscroll"] + " data-color=" + SB_CONTROLS["color"] + " id=\"sb_reviews_widget\"></div>";
}

function createElement(type, id){
	var newElement = document.createElement(type);
	newElement.setAttribute("id",id);
	return newElement;
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

	cssTextDict["cssText_sbReviewsWidget"] = "width: 260px; height: 480px; background: rgba(224, 220, 230, 0.48); -moz-border-radius: 5px;-webkit-border-radius: 5px;-khtml-border-radius: 5px;border-radius: 5px; border: 1px solid #fff;";

	cssTextDict["cssText_sbEmbedPreview"] = "border-bottom: 1px solid #f8f8f8; padding-bottom: 5px; width:inherit; height:50%;";

	cssTextDict["cssText_sbBadge"] =  "padding-top: 5px; padding-bottom: 10px;display: block;margin-left: auto;margin-right: auto; height: 30%;";

	cssTextDict["cssText_sbReviewsOuter"] = "width: 90%; height: 60%; position: relative; margin: 0px auto; border: 1px solid #ddd; border-radius: 3px; overflow-y: scroll;";

	cssTextDict["cssText_sbReviewsInner"] = "width: 85%; height: auto; margin: 0 auto; padding-bottom: 15px;";

	cssTextDict["cssText_sbReviewsList"] = "text-align: left !important; list-style: none; list-style-position:inside; margin:0; padding:0; line-height: 1.0;";

	cssTextDict["cssText_li"] = "margin: 5px; font-family: Verdana, Arial, sans-serif; font-weight: 3; font-size: 80%; line-height: inherit; border-bottom: 1px solid #fbfbfb;";

	cssTextDict["cssText_p"] = "opacity: 1.0; padding-bottom: 2px; margin-bottom:2px; height: 10px;";

	cssTextDict["cssText_reviewBody"] = "opacity: 1.0; margin-top: 2px; margin-bottom: 7px;";

	cssTextDict["cssText_reviewStars"] = "margin-bottom: 4px; margin-top: 1px;";

	cssTextDict["cssText_sbCustomizationSection"] = "height: 50%; padding-top: 5px; text-align: center; font-family: Georgia; font-weight: 3; font-size: 80%;";

	cssTextDict["cssText_checkbox"] = "width: 18px; height: 18px; background: #00dd00; position: relative; margin-left: 20px;";
	return cssTextDict;
}

function getDirectChildrenByTagName(elem, tagname) {
    var allChildren = elem.children, wantedChildren=[], i, L;
    tagname = tagname.toUpperCase();
    for(i=0, L=allChildren.length; i<L; i++) {
        if (allChildren[i].tagName.toUpperCase() == tagname) {
            wantedChildren.push(allChildren[i]);
        }
    }
    return wantedChildren;
}

function scrollReviews()
{
	var sb_review_list = document.getElementById("sb_reviews_list");
	var numReviews = getDirectChildrenByTagName(sb_reviews_list, "LI");
	var frame = document.getElementById("sb_reviews_outer");
	sb_review_list.firstChild.style.height = frame.clientHeight + 'px';; // for infinite scroll
	var container = document.getElementById("sb_reviews_outer");
	setTimeout(function(){
		var ul = document.getElementById("sb_reviews_list");
		ul.appendChild(ul.firstChild.cloneNode(true));   
		ul.lastChild.id = "item " + numReviews;
		scrollToNextReview()
	}, 1000);
}

function scrollToNextReview(){
	var ul = document.getElementById("sb_reviews_list");
	var container = document.getElementById("sb_reviews_outer");
	var maxOffset = ul.clientHeight - ul.lastChild.scrollHeight;
	function infScroll(idx, sofar, delay){
		if (SB_CONTROLS["autoscroll"] !== ""){
			setTimeout(function() {
				currItem = ul.childNodes[idx];

				// item reached top of container
				if (container.scrollTop  >= (sofar + currItem.scrollHeight + 15)){
					delay = 1000;
					sofar = container.scrollTop;
					idx = ++idx % 3;
					
					// rewind to start if needed
					if(container.scrollTop  >= maxOffset){
						sofar = 0;
						container.scrollTop = 0;
						idx = 0;
					}
				}
				else{
					// keep scrolling
					delay = 0;
					container.scrollTop += 1;
				} 
				window.requestAnimationFrame(function(){infScroll(idx, sofar, delay)});
			}, delay);
		}
	}
	window.requestAnimationFrame(function(){infScroll(0, 0, 0)}, 1000); 
}

function scrollFunc(){
	if (SB_CONTROLS["autoscroll"] == true){
		scrollOff();
	}
	else{
		scrollOn();
	}
	refreshEmbedCode(SB_CONTROLS);
}

function scrollOn(){
	SB_CONTROLS["autoscroll"] = true;
	var container = document.getElementById("sb_reviews_outer");
	container.style.overflowY = "hidden";
	scrollToNextReview();
}

function scrollOff(){
	SB_CONTROLS["autoscroll"] = "";
	var container = document.getElementById("sb_reviews_outer");
	container.scrollTop = 0;
	container.style.overflowY = "scroll";
}

(function () {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }
  if(!window.requestAnimationFrame)
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      },
      timeToCall);
      lastTime = currTime + timeToCall;
      return id;
  };
  if(!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
  };
}());

// window.requestAnimFrame = (function(){
//   return  window.requestAnimationFrame       ||
//           window.webkitRequestAnimationFrame ||
//           window.mozRequestAnimationFrame    ||
//           function( callback ){
//             window.setTimeout(callback, 1000 / 60);
//           };
// })();