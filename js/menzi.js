var menziWords = new Array();
menziWords[0] = "什么心态";
menziWords[1] = "...";

var hello = new Object();
hello["zhoumenzi"] = "你好,我是周闷子 ⊙ˍ⊙ 很高兴陪你聊天";
hello["yujiong"] = "(╯‵□′)╯︵┻━┻";
var selectedChater = document.getElementById("zhoumenzi");

var func1 = function() {
	var whatUSay=document.getElementById("iSay").value;
	var content = document.getElementById("content");
	whatUSay = "<p class=\"singleSentence\">你对闷子说:<br>" + whatUSay+"</p>";
	content.innerHTML += whatUSay;
	content.innerHTML += "<p class=\"peiliaoSingleSentence\">闷子对你说:<br>" + menziWords[0] + "</p>"
	content.scrollTop = content.scrollHeight;
}

function BindEnter(obj){
	//alert("ok");
	var button = document.getElementById('ok');
	if(obj.keyCode == 13){
		button.click();
	}
}

function selectChater(event) {
	//alert(event.innerHTML);
	if (selectedChater != null) {
		selectedChater.style.backgroundColor="white";
	}
	
	var chaterID = event.id;
	var helloSentence = hello[chaterID];
	document.getElementById("hello").innerHTML = helloSentence;
	event.style.backgroundColor="#1ec5e5"
	selectedChater = event;
}