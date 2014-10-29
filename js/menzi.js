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

	var whatUSayWapper = "<p class=\"singleSentence\"><b>你</b>对<b>" + chaterName + "</b>说:<br></p>" + whatUSay;
	// whatUSay = GetContents();
	content.innerHTML += whatUSayWapper;
	var words = chaterWords[chaterID];
	var wordIndex = rdm(words.length);
	if (chaterID == "yujiong") {
		var sex = document.getElementById("sex").value;
		//alert(sex);
		var middle = parseInt(words.length / 2);
		wordIndex = rdm(middle);
		if (sex == "male") {
			alert("male");
			wordIndex += middle;
			alert(wordIndex);
		} 
	}
	//console.log(wordIndex);
	var peiliaoWord = words[wordIndex];
	if (wordIndex == 2) {
		if (whatUSay.length >=2)  {
			peiliaoWord = whatUSay.substr(whatUSay.length - 2)+ peiliaoWord;
		} else {
			peiliaoWord = "额";
		}
		
	}
	var peiliaoWordsWapper = "<p class=\"peiliaoSingleSentence\"><b>" + chaterName + "</b>对<b>你</b>说:<br></p>" + peiliaoWord;
	content.innerHTML += peiliaoWordsWapper;
	content.scrollTop = content.scrollHeight;
	document.getElementById("iSay").value = "";
}

function BindEnter(obj){
	//alert("ok");
	var button = document.getElementById('ok');
	if (sendMethod == "ce") {
		if(obj.ctrlKey&&obj.keyCode == 13){
			button.click();
		}
	} else {
		if(obj.keyCode == 13){
			button.click();
		}
	}
	
}

function selectChater(event) {
	var bodyColor = document.bgColor;
	selectedChater.style.backgroundColor=bodyColor;

	var chaterID = event.id;
	if (chaterID == "yujiong") {
		var sex = getSex();
		alert(sex);
		document.getElementById("sex").value = sex;
	}
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
	//abc();
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

function getSex() {
	var sex = prompt("请输入性别");
	if (sex == "男") {
		return "male";
	}
}

function changeSendMethod(obj) {
	sendMethod = obj.value;
	
}