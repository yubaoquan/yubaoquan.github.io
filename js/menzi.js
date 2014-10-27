var func1 = function() {
	var sentence=document.getElementById("iSay").value;
	//alert(sentence);
	
	var p = document.createElement("p");
	var node=document.createTextNode(sentence);
	p.appendChild(node);
	var content = document.getElementById("content");
	content.appendChild(p);
	//content.innerHTML = content.innerHTML + "<p>" + sentence + "</p>"
	//alert("ok2");
}