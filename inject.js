(function() {
	var commentsAlreadyOnPage = false;
	document.querySelectorAll('*').forEach(function(node) {
	    if (node.id == "comments6554" && node.tagName == "IFRAME") 
	    	commentsAlreadyOnPage = true;
	    	return;
	});
	
	function gel(id){
		return document.getElementById(id);
	}
	
	if (commentsAlreadyOnPage) {
		document.getElementById("comments6554").scrollIntoView();
		return;
	}
	
	var heightScript = `window.addEventListener("message", function(e){
		    var this_frame = document.getElementById("comments6554");
		    if (this_frame.contentWindow === e.source) {
		        this_frame.height = e.data.height + "px";
		        this_frame.style.height = e.data.height + "px";
		    }
		})
	`;
	
	var dragScript = `dragElement(document.getElementById("comments6554"));
	var headerElmnt;
	var closeCommentsElmnt;
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  headerElmnt = document.getElementById(elmnt.id + "header");
  closeCommentsElmnt = document.getElementById("closeComments6554");
  if (headerElmnt) {
    /* if present, the header is where you move the DIV from:*/
    headerElmnt.onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    headerElmnt.style.top = (headerElmnt.offsetTop - pos2) + "px";
    headerElmnt.style.left = (headerElmnt.offsetLeft - pos1) + "px";
    closeCommentsElmnt.style.top = (closeCommentsElmnt.offsetTop - pos2) + "px";
    closeCommentsElmnt.style.left = (closeCommentsElmnt.offsetLeft - pos1) + "px";
 }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
`;
	var removeCommentsScript = 
	`
	function gel(id){
		return document.getElementById(id);
	}
	
	var inCloseComments = false;
	
	function closeComments(){
		var header = gel("comments6554header");
        header.parentNode.removeChild(header); 
		var closeComments = gel("closeComments6554");
        closeComments.parentNode.removeChild(closeComments); 
		var comments = gel("comments6554");
		comments.parentNode.removeChild(comments);
	}
	
	function closeCommentOnMouseLeave(){
		var commentsHeader=gel('comments6554header');
		commentsHeader.style.cursor='move';
		commentsHeader.onmouseleave = function(){
			gel('closeComments6554').style.visibility='hidden';
			this.innerHTML='';
		};
	}

	function commentsHeaderMouseEnter(e){
		gel('comments6554header').innerHTML='click and hold to move';
		gel('closeComments6554').innerHTML = 'X';
	}

	function commentsHeaderMouseLeave(e){
		var rect = gel('closeComments6554').getBoundingClientRect();

		if (rect.left - e.clientX > 1){
			gel('comments6554header').innerHTML='';
			gel('closeComments6554').innerHTML = '';
		}
	}

	function closeCommentsMouseEnter(e){
		gel('closeComments6554').innerHTML = 'X';
		gel('comments6554header').innerHTML='click and hold to move';
	}
	
	function closeCommentsMouseLeave(e){
		var rect = gel('closeComments6554').getBoundingClientRect();

		if (e.clientX >= rect.left){
			gel('closeComments6554').innerHTML = '';
			gel('comments6554header').innerHTML = '';
		}
	}
	`;
	
	var prevScrollHeight = -10;
	var prevNodeNum = -10;
	var addingComments = false;
	function wait(){ //For adding the comments after page stop changing
		  var scrollHeight = document.documentElement.scrollHeight;
		  var nodeNum = document.querySelectorAll('*').length;
		  if (prevScrollHeight != scrollHeight || prevNodeNum != nodeNum){
			prevScrollHeight = scrollHeight;
			prevNodeNum = nodeNum;
		    setTimeout(wait,1500);
		  } else {
	if (addingComments) return; //Do not add comment more then once
	addingComments = true;
	
	var scripts = document.createElement('script');
	var scriptNode = document.createTextNode(heightScript + removeCommentsScript);
	scripts.appendChild(scriptNode); 
	document.body.appendChild(scripts);

	var dragHeaderdiv = document.createElement('div');
	dragHeaderdiv.style.position = 'absolute';
	dragHeaderdiv.style.top = document.documentElement.scrollHeight + "px";
	dragHeaderdiv.style.left = "10px";
	dragHeaderdiv.style.zIndex = 1000;
	dragHeaderdiv.style.cursor = "move";
	dragHeaderdiv.style.height = "40px";
	dragHeaderdiv.style.width = "539px";
	dragHeaderdiv.style.color = "magenta";
	dragHeaderdiv.style.fontSize = "16px";
	dragHeaderdiv.setAttribute("onmouseenter","commentsHeaderMouseEnter(event);");
	dragHeaderdiv.setAttribute("onmouseleave","commentsHeaderMouseLeave(event);");
	dragHeaderdiv.setAttribute("align","left");
	dragHeaderdiv.setAttribute('id', "comments6554header");

	var closeCommentsDiv = document.createElement('span');
	closeCommentsDiv.style.position = 'absolute';
	closeCommentsDiv.style.top = document.documentElement.scrollHeight + "px";
	closeCommentsDiv.style.left = "550px";
	closeCommentsDiv.style.zIndex = 1001;
	closeCommentsDiv.style.cursor = "pointer";
	closeCommentsDiv.style.height = "16px";
	closeCommentsDiv.style.width = "16px";
	closeCommentsDiv.style.color = "magenta";
	dragHeaderdiv.style.fontSize = "16px";
	closeCommentsDiv.setAttribute("onmouseenter","closeCommentsMouseEnter(event)");
	closeCommentsDiv.setAttribute("onmouseleave","closeCommentsMouseLeave(event)");
	closeCommentsDiv.setAttribute('id', "closeComments6554");
	closeCommentsDiv.setAttribute('onClick',"closeComments();");
	closeCommentsDiv.setAttribute('title',"Click to remove comments");
	closeCommentsDiv.setAttribute('align',"right");

	var iframe = document.createElement('iframe');
	iframe.style.position = 'absolute';
	iframe.style.top = document.documentElement.scrollHeight + 10 + "px";
	iframe.style.left = "0px";
	iframe.style.height = "100%";
	iframe.style.width = "30%";
	iframe.style.zIndex = 999;
	iframe.setAttribute('src', 'https://test.chinablog.xyz/addComment?id=' + window.location);
	iframe.setAttribute('frameborder',"0");
	//iframe.setAttribute('scrolling',"no");
	iframe.setAttribute('id', 'comments6554');

	//------------------ Remove second comments -------------------------------
	var commentsAlreadyOnPage = false;
	var closeCommentsFound = false;
	var commentsFound = false;
	var commentsHeaderFound = false;
	
	function removeNode(node){
		node.parentNode.removeChild(node);
	}
	
	document.querySelectorAll('*').forEach(function(node) {
	    if (node.id == "comments6554" && node.tagName == "IFRAME"){
	    	commentsAlreadyOnPage = true;
	    	if (commentsFound){//Already exists, therefore has to be removed:
	    		removeNode(node);
	    	}
	    	commentsFound = true;
	    } 
	    if (node.id == "closeComments6554" && node.tagName == "DIV"){
	    	commentsAlreadyOnPage = true;
	    	if (closeCommentsFound){//Already exists, therefore has to be removed:
	    		removeNode(node);
	    	}
	    	closeCommentsFound = true;
	    } 
	    if (node.id == "comments6554header" && node.tagName == "DIV"){
	    	commentsAlreadyOnPage = true;
	    	if (commentsHeaderFound){//Already exists, therefore has to be removed:
	    		removeNode(node);
	    	}
	    	commentsHeaderFound = true;
	    } 
	});

	if (commentsAlreadyOnPage) {
		document.getElementById("comments6554").scrollIntoView();
		return;
	}

	document.body.appendChild(dragHeaderdiv);
	document.body.appendChild(closeCommentsDiv);
	document.body.appendChild(iframe);
	
	var dragScriptEl = document.createElement('script');
	var dragScriptNode = document.createTextNode(dragScript);
	dragScriptEl.appendChild(dragScriptNode); 
	document.body.appendChild(dragScriptEl);

	document.getElementById("comments6554").scrollIntoView();
		  }
	}
wait(); //Start wait for page to finish changing and then add the comments

})();
