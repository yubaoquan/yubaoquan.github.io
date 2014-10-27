var menziWords = new Array();
menziWords[0] = "什么心态";
menziWords[1] = "...";

var func1 = function() {
	var whatUSay=document.getElementById("iSay").value;
	var content = document.getElementById("content");
	whatUSay = "<p class=\"singleSentence\">你对闷子说:<br>" + whatUSay+"</p>";
	content.innerHTML += whatUSay;
	content.innerHTML += "<p class=\"peiliaoSingleSentence\">闷子对你说:<br>" + menziWords[0] + "</p>"
	content.scrollTop = content.scrollHeight;
}