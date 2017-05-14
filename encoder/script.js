(function() {
    let textarea = document.querySelector('textarea');
    let input = document.querySelector('input');
    let btnEnc = document.querySelector('#btn-enc');
    let btnDec = document.querySelector('#btn-dec');
    let select = document.querySelector('#symbol-type');
    const emoji = [];
    const ascii = [];

    for (let i = 0; i < 10; i++) {
        ascii.push(String.fromCharCode(48 + i));
    }
    for (let i = 0; i < 26; i++) {
        ascii.push(String.fromCharCode(65 + i));
    }
    for (let j = 0; j < 26; j++) {
        ascii.push(String.fromCharCode(97 + j));
    }
    ascii.push('+');
    ascii.push('/');
    ascii.push('=');

    const targetChars = {
        emoji: '😀😁🤣😂😄😅😆😇😉😊🙂🙃😋😌😍😘😙😜😝🤑🐶🐱🐭🐹🐰🐻🐼🐨🐵🐙🐸🐽🐷🐮🦁🐯🙈🙉🙊🐒🐔🍏🍎🍐🍊🍋🍌🍉🍇🍅🥑🥝🍍🍑🍒🍈🍓🍆🥒🥕🌶🥔⚽️🏀🏈⚾️',
        chemistry: '氢氦锂铍硼碳氮氧氟氖钠镁铝硅磷硫氯氩钾钙钪钛钒铬锰铁钴镍铜锌镓锗砷硒溴铷锶钇锆钼锝钌铑钯银镉铟锡锑碲碘氙铯钡镧铪钽钨铼锇铱铂金汞',
        marsFont: '伱媞涐冇尐芼輕倯獲嘚趠躰牸侞甪吙煋喥輸兦簧孒應尨瘡祂の佲佽ゐ笕恠呿哖嗄蔭ㄝ學苌幵ф嗰甡洎哙埘堠萁僦卟認識菿乜許俓瀏侽倵拖詘徔',
        symboledEmotion: '(*￣(エ)￣) (>^ω^<)喵  (｡♥‿♥｡) （¯﹃¯）口水 (～﹃～)~zZ 囧rz _(:з」∠)_ (╥╯^╰╥) ┭┮﹏┭┮ ╭(╯^╰)╮ (￣.￣) (￣▽￣)~ *╮(￣▽￣) ╭(￣▽￣)" （￣︶￣）↗ <(￣︶￣)> ︿(￣︶￣)︿ \（￣︶￣）/ :） :-) :-D XD \(^o^)/ Y(^o^)Y (^.^)Y Ya!!(＾－＾)V m9(`Д´)  (`Д´*)9 ヽ(｀⌒´)ﾉ  (*´ﾉ皿`) (`皿´) ヽ(｀Д´)ﾉ ヽ(`З’)ﾉ d(･｀ω´･d*) :-( o(TωT)o (*T_T*) (/□＼*) (╥╯^╰╥) /(ㄒoㄒ)/ ~~T^T ╥﹏╥ ... :-O (*ﾟДﾟ*) ﾉ)ﾟДﾟ( ヽ(；´Д｀)ﾉ щ(ﾟДﾟщ) 乂(ﾟДﾟ三ﾟДﾟ)乂 Σ(oﾟдﾟoﾉ)! ?(･_･;? (⊙o⊙) o((⊙﹏⊙))o .(*⊙~⊙) (O_O)? …（⊙＿⊙；） …(⊙x⊙;) wow~⊙o⊙ (O_o)?? o_O|| (;￢＿￢) ﾍ(*–-)ﾉ  (￣o￣).zZ  ┐(ﾟ～ﾟ) ┌彡(-_-;)彡 ─=≡Σ(((つ•̀ω•́)つ ╭(′▽`)╭ (′▽`)╯ (๑´ㅂ`๑) （◐ˍ◑） (･ิω･ิ) ჰჰჰ❛‿❛ჴჴჴ (´థ౪థ） σ(ᇂдᇂ U•ェ•*U \\‵（●●）‵\\'
    };
    const emojiChars = '😀😁🤣😂😄😅😆😇😉😊🙂🙃😋😌😍😘😙😜😝🤑🐶🐱🐭🐹🐰🐻🐼🐨🐵🐙🐸🐽🐷🐮🦁🐯🙈🙉🙊🐒🐔🍏🍎🍐🍊🍋🍌🍉🍇🍅🥑🥝🍍🍑🍒🍈🍓🍆🥒🥕🌶🥔⚽️🏀🏈⚾️';

    for (let char of targetChars.emoji) {
        emoji.push(char);
    }

    let symbols = emoji;
    let encMap, decMap;
    let currentEncryptType = 0;

    function setSymbols(type = 0) {
        currentEncryptType = type;
        encMap = {};
        decMap = {};
        switch (type) {
            case 0:
                symbols = emoji;
                break;
            case 1:
                symbols = targetChars.chemistry.split('');
                break;
            case 2:
                symbols = targetChars.marsFont.split('');
                break;
            case 3:
                symbols = targetChars.symboledEmotion.split(' ');
                break;
            default:
                symbols = emoji;
        }
        ascii.forEach((char, index) => {
            encMap[char] = symbols[index];
            decMap[symbols[index]] = char;
        });
    }

    function encrypt(text = '', key = '') {
        let devider = '';
        if (currentEncryptType === 3) devider = ' ';
        if (!String.fromCodePoint) {
            alert('Your fuckint browser doesnt support ES6. Please change another one or upgrade it.');
            return '';
        }
        text = convert2Ascii(text);
        key = convert2Ascii(key);
        while (key.length < text.length) {
            key += key;
        }
        key = key.split('');
        text = text.split('').map((char, index) => {
            let sum = char.charCodeAt(0) + key[index].charCodeAt(0);
            return String.fromCharCode('0x' + sum);
        }).join('');

        text = btoa(encodeURIComponent(text));
        text = text.split('').map(char => {
            let ret = encMap[char];
            return ret;
        }).join(devider);
        return text;
    }

    function decrypt(text = '', key = '') {
        try {
            let temp = [];
            temp = devide(text).map(char => decMap[char]).join('');
            text = decodeURIComponent(atob(temp));
            let codePoints = [];
            key = convert2Ascii(key);
            for (let char of text) {
                let num = parseInt(char.codePointAt(0));
                codePoints.push(num.toString(16));
            }
            while (key.length < codePoints.length) {
                key += key;
            }
            text = codePoints.map((n, index) => {
                let codePoint = n - key[index].charCodeAt(0);
                return String.fromCharCode(codePoint);
            }).join('');
            return decodeURIComponent(atob(text));
        } catch (e) {
            alert('Wrong key, decode fail.');
            return '';
        }
    }

    function devide(text) {
        if (isEmoji(text)) {
            let ret = [];
            for (let char of text) {
                ret.push(char);
            }
            return ret;
        } else {
            let devider = getDevider(text);
            return text.split(devider);
        }
    }

    function getDevider(text) {
        // let encryptTypeItems = document.querySelectorAll('#encrypt-types input[name=type]').length;

        if (text.includes(' ')) return ' ';
        return '';
    }

    function isEmoji(text) {
        let codePoint = text.codePointAt(0);
        return targetChars.emoji.includes(String.fromCodePoint(codePoint));
    }

    function convert2Ascii(str = 'xxx') {
        return btoa(encodeURIComponent(str));
    }

    btnEnc.addEventListener('click', () => {
        let encryptType = document.querySelector('input:checked').value;
        encryptType = Number(encryptType);
        console.info(encryptType);
        setSymbols(encryptType);
        commonProcess(encrypt);
    });

    btnDec.addEventListener('click', () => {
        commonProcess(decrypt);
    });

    function commonProcess(fn) {
        let text = textarea.value;
        let key = input.value;
        if (!key) {
            alert('请输入密码');
            return;
        }
        let result = fn(text, key);

        textarea.value = result;
    }
}());
