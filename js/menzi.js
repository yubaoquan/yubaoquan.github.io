var menziWords = new Array();
menziWords[0] = "什么心态";
menziWords[1] = "...";

var func1 = function() {
	var sentence=document.getElementById("iSay").value;
	var content = document.getElementById("content");
	content.innerHTML += "<p>" + sentence + "</p>"
	content.innerHTML += "<p>" + menziWords[0] + "</p>"
}