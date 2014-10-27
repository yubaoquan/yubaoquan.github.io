var func1 = function() {
	var sentence=document.getElementById("iSay").innerHTML;
	alert(sentence);
	var contentArea = document.getElementById("content");
	contentArea.value += <p>sentence</p>;
}