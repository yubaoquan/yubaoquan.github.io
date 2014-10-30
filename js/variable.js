//==============================创建闷子角色==================================
var zhoumenzi = {};

//闷子的名字;
zhoumenzi.name = "周闷子";

//闷子的欢迎语;
zhoumenzi.hello = "你好,我是周闷子 ⊙ˍ⊙ 很高兴陪你聊天";

//闷子的台词;
var menziWords = [];
menziWords[0] = "什么心态";
menziWords[1] = "...";
menziWords[2] = "你一脸!";
zhoumenzi.words = menziWords;

//闷子的说话方式;
function menziSay(whatUSay) {
	var words = menziWords;
	var wordIndex = rdm(words.length);
	var peiliaoWord = words[wordIndex];
	if (wordIndex == 2) {
		if (whatUSay.length >=2 && whatUSay.substr(whatUSay.length - 2).indexOf(">") == -1) {
			peiliaoWord = whatUSay.substr(whatUSay.length - 2)+ peiliaoWord;
		} else {
			peiliaoWord = "额";
		}
	}
	return peiliaoWord;
}
zhoumenzi.say = menziSay;

//=========================创建玉扃角色=======================================
var yujiong = {};

//玉扃的名字;
yujiong.name = "玉扃";

//玉扃的欢迎语;
yujiong.hello = "我就是热情如火的玉扃!(╯‵□′)╯︵┻━┻";

//玉扃的台词;
var yujiongWords = [];
yujiongWords[0] = "摸摸头";
yujiongWords[1] = "老娘抽死你丫的!";
yujiongWords[2] = "→_→";
yujiong.words = yujiongWords;

//玉扃的说话方式;
function yujiongSay(whatUSay) {
	return "developing";
}
yujiong.say = yujiongSay;

//=========================创建乌鸦角色=======================================
var wuya = {};

//乌鸦的名字:
wuya.name = "乌小六";

//乌鸦的欢迎语;
wuya.hello = "卧槽!卧槽!hhhhuuuooo!";

//乌鸦的台词;
var wuyaWords = [];
wuyaWords[0] = "卧槽!";
wuyaWords[1] = "我勒个去!";
wuya.words = wuyaWords;

//乌鸦早安语;
var wuyaMorning = [];
wuyaMorning[0] = "好个屁";
wuyaMorning[1] = "好个蛋";
wuyaMorning[2] = "好个屌";
wuyaMorning[3] = "好你妹";
wuya.morningWords = wuyaMorning;

//乌鸦的说话方式;
function wuyaSay(whatUSay) {
	if (whatUSay.indexOf("早上好") != -1)  {
		return getASentence(wuyaMorning);
	} else {
		return getASentence(wuyaWords);
	}
}
wuya.say = wuyaSay;

//=========================将以上角色添加到到陪聊列表中========================
var peiliaoList = {};
peiliaoList.zhoumenzi = zhoumenzi;
peiliaoList.yujiong = yujiong;
peiliaoList.wuya = wuya;

//=========================全局变量============================================
//发送信息是的快捷键方式;
var sendMethod = "ce";
//当前被选中的陪聊在html中的节点;
var currentPeiliaoElement;
//当前被选中的陪聊的ID;
var currentPeiliaoID;
//当前被选中的陪聊;
var currentPeiliao;
//陪聊的语句数组,后续改为陪聊的说话方法;
var words;

function getASentence (words) {
	var index = rdm(words.length);
	return words[index];
}
