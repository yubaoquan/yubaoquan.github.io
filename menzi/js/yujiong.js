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
	//alert(userGender);
	if (userGender == "male") {
		return yujiongWords[1];
	}
	if (userGender == "female") {
		return yujiongWords[0];
	}
	if (userGender == "wtf") {
		return yujiongWords[2];
	}
	return "error";
}
yujiong.say = yujiongSay;