(function() {
    let textarea = document.querySelector('textarea');
    let input = document.querySelector('input');
    let btnEnc = document.querySelector('#btn-enc');
    let btnDec = document.querySelector('#btn-dec');
    const seed = 2;

    function encrypt(text = '', key = '') {
        if (!String.fromCharCode) {
            alert('no fromcharcode');
            return '';
        }
        text = convert2Ascii(text);
        key = convert2Ascii(key);
        while (key.length < text.length) {
            key += key;
        }
        key = key.split('');
        text =  text.split('').map((char, index) => {
            let sum = char.charCodeAt(0) + key[index].charCodeAt(0);
            return String.fromCharCode('0x' + sum);
        }).join('');
        return btoa(encodeURIComponent(text));
    }

    function convert2Ascii(str = 'xxx') {
        return btoa(encodeURIComponent(str));
    }

    function decrypt(text = '', key = '') {
        try {
            text = decodeURIComponent(atob(text));
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

    btnEnc.addEventListener('click', () => {
        let text = textarea.value;
        let key = input.value;
        if (!key) {
            alert('请输入密码');
            return;
        }
        let result = encrypt(text, (key));

        textarea.value = result;

    });

    function onEncClick() {

    }

    btnDec.addEventListener('click', () => {
        let text = textarea.value;
        let key = input.value;
        if (!key) {
            alert('请输入密码');
            return;
        }
        let result = decrypt(text, (key));

        textarea.value = result;
    });
}());
