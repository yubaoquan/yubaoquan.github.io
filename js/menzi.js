var menziWords = new Array();
menziWords[0] = "什么心态";
menziWords[1] = "...";

var yujiongWords = new Array();
yujiongWords[0] = "摸摸头";
yujiongWords[1] = "老娘抽死你丫的!";
yujiongWords[2] = "→_→";

var wuyaWords = new Array();
wuyaWords[0] = "卧槽!";
wuyaWords[1] = "我勒个去!";

var chaterWords = new Object();
chaterWords["zhoumenzi"] = menziWords;
chaterWords["yujiong"] = yujiongWords;
chaterWords["wuya"] = wuyaWords;

var chaterNames = new Object();
chaterNames["zhoumenzi"] = "周闷子";
chaterNames["yujiong"] = "玉扃";
chaterNames["wuya"] = "乌小六";

var hello = new Object();
hello["zhoumenzi"] = "你好,我是周闷子 ⊙ˍ⊙ 很高兴陪你聊天";
hello["yujiong"] = "我就是热情如火的玉扃!(╯‵□′)╯︵┻━┻";
hello["wuya"] = "卧槽!卧槽!hhhhuuuooo!"
var selectedChater;

var func1 = function() {
	var whatUSay=document.getElementById("iSay").value;
	var content = document.getElementById("content");
	var chaterName;
	var chaterID;
	if (typeof(selectedChater) == "undefined") {
		chaterName = chaterNames["zhoumenzi"];
		chaterID = "zhoumenzi";
	} else {
		chaterName = chaterNames[selectedChater.id];
		chaterID = selectedChater.id;
	}
	//whatUSay = whatUSay.replace(new RegExp(">","g"), "&gt").replace(new RegExp("<","g"), "&lt");
	whatUSay = whatUSay.replace(/[\r\n]/g,"<BR>").replace(/[\n]/g,"<BR>");
	console.log(whatUSay);
	whatUSay = "<p class=\"singleSentence\"><b>你</b>对<b>" + chaterName + "</b>说:<br></p>" + whatUSay;
	// whatUSay = GetContents();
	content.innerHTML += whatUSay;
	var words = chaterWords[chaterID];
	var wordIndex = rdm(words.length);
	//console.log(wordIndex);
	content.innerHTML += "<p class=\"peiliaoSingleSentence\"><b>" + chaterName + "</b>对<b>你</b>说:<br></p>" + words[wordIndex];
	content.scrollTop = content.scrollHeight;
	document.getElementById("iSay").value = "";
}

function BindEnter(obj){
	//alert("ok");
	var button = document.getElementById('ok');
	if(obj.keyCode == 13){
		//button.click();
	}
}

function selectChater(event) {
	var bodyColor = document.bgColor;
	selectedChater.style.backgroundColor=bodyColor;

	var chaterID = event.id;
	// var chaterImg = document.getElementById("a");
	// var imgSrc = "../images/" + chaterID + ".jpg";
	// chaterImg.src = imgSrc;
	var imgStr = "<img id=\"a\" src=\"../images/"+ chaterID +".jpg\"/>";

	var helloSentence = hello[chaterID];
	document.getElementById("hello").innerHTML = imgStr + helloSentence;
	event.style.backgroundColor="#1ec5e5"
	selectedChater = event;
}

function pageLoad() {
	selectedChater = document.getElementById("zhoumenzi");
	selectChater(selectedChater);
}

function rdm(n) {
	return Math.floor(Math.random()*n);
}

function GetContents() {
	// Get the editor instance that you want to interact with.
	var editor = CKEDITOR.instances.editor1;
	// Get editor contents
	return editor.getData();
}