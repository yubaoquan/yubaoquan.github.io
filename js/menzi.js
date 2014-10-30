//陪聊根据用户所说的话进行回应;
function talk() {
	var whatUSayInfo = GetContents();
	var whatUSay = whatUSayInfo.text;
	var whatPeiliaoSay = currentPeiliao.say(whatUSay);
	refreshContent(whatUSayInfo.wrapper, whatPeiliaoSay);
}

//发送消息后,更新聊天记录,情况编辑界面;
function refreshContent(whatUSayWrapper, peiliaoWord) {
	//whatUSayWrapper = whatUSayWrapper.replace("<p", "<p class=\"whatUSay\"");
	var content = document.getElementById("content");
	content.innerHTML += "<p class=\"singleSentence\"><b>你:</b></p>";
	content.innerHTML += whatUSayWrapper;
	content.innerHTML += "<p class=\"peiliaoSingleSentence\"><b>" + currentPeiliao.name + "</b>:</p>";
	content.innerHTML += "<p class=\"peiliaoWord\">" + peiliaoWord +"</p>";
	content.scrollTop = content.scrollHeight;
	clearTextArea();
	console.log(whatUSayWrapper);
	//alert(document.getElementById("iSay").value.length);
}

//监听回车和ctrl+回车事件,实现使用textarea作为编辑界面时的发送和换行功能;
function BindEnter(obj){
	var button = document.getElementById('ok');
	if (sendMethod == "ce") {
		if(obj.ctrlKey&&obj.keyCode == 13){
			button.click();
		}
	} else if (sendMethod == "en"){
		if(obj.keyCode == 13){
			if (!obj.ctrlKey) {
				button.click();
			} else {
				document.getElementById("iSay").value += "\n";
			}
		}
	} else {
		alert("wtf");
	}
	
}

//选择陪聊;
function selectChater(element) {
	var bodyColor = document.bgColor;
	currentPeiliaoElement.style.backgroundColor=bodyColor;

	currentPeiliaoID = element.id;
	currentPeiliao = peiliaoList[element.id];
	if (currentPeiliaoID == "yujiong") {
		var sex = getSex();
		alert(sex);
		document.getElementById("sex").value = sex;
	}
	
	var imgFilePath = "../images/" + currentPeiliaoID + ".jpg";
	var imgElem = "<img id=\"a\" src=\" "+ imgFilePath+"\"/>";

	document.getElementById("hello").innerHTML = imgElem + currentPeiliao.hello;
	element.style.backgroundColor="#1ec5e5"
	currentPeiliaoElement = element;
}

//界面打开时的初始化工作;
function pageLoad() {
	currentPeiliaoElement = document.getElementById("zhoumenzi");
	selectChater(currentPeiliaoElement);
	sendMethod = "ce";
	//abc();
}

//生成[0,n)之间的随机数;
function rdm(n) {
	return Math.floor(Math.random()*n);
}

//从编辑界面中获取消息,包含消息的纯文本和带样式的文本;;
function GetContents() {
	var whatUSayInfo = new Object();
	if (sendMethod == "ck") {
		var editor = CKEDITOR.instances.iSay;
		whatUSayInfo.wrapper = editor.getData();
		whatUSayInfo.text = editor.document.getBody().getText();
	} else {
		var whatUSay=document.getElementById("iSay").value;
		whatUSayInfo.wrapper = whatUSay.replace(/[\r\n]/g,"<br>").replace(/[\n]/g,"<br>")
		whatUSayInfo.text = whatUSay;
	}
	whatUSayInfo.wrapper = "<div class=\"whatUSay\"> "+ whatUSayInfo.wrapper + "</div>";
	return whatUSayInfo;
}

//用户发送消息之后清空编辑框;
function clearTextArea() {
	if (sendMethod == "ck") {
		var editor = CKEDITOR.instances.iSay;
		editor.setData("");
	} else {
		document.getElementById("iSay").value = "";
	}
}

function getSex() {
	var sex = prompt("请输入性别");
	if (sex == "男") {
		return "male";
	}
}

//更改发送消息的快捷键方式,包含更改编辑界面,textarea和CKEditor之间互相转换;
function changeSendMethod(obj) {
	if (sendMethod == obj.value) {
		return;
	}
	var textarea = document.getElementById("iSay");
	if (obj.value == "ck") {
		var ckeditor = document.getElementById("cke_iSay");
		if (ckeditor == null) {
			CKEDITOR.replace('editor1');
		} else {
			textarea.setAttribute("style", "visibility: hidden; display: none;");
			ckeditor.setAttribute("style", "visibility: visible; display: inline;");
		}
	} else {
		if (sendMethod == "ck") {
			var ckeditor = document.getElementById("cke_iSay");
			ckeditor.setAttribute("style", "visibility: hidden; display: none;");
			textarea.setAttribute("style", "visibility: visible; display: inline;");
		}
	}
	sendMethod = obj.value;
	
}