javascript:(
function(){
    var text = window.getSelection().toString().trim();
    text = text.split('\n');
    var pwd = text[text.length - 1];
    pwd = pwd.split(String.fromCharCode(160));
    pwd = pwd[pwd.length - 1];
    pwd = pwd.split(':');
    pwd = pwd[pwd.length - 1];
    pwd = pwd.split('：');
    pwd = pwd[pwd.length - 1];
    text = text[0];
    text = text.split(String.fromCharCode(160))[0];
    text = text.split(':');
    console.log(text);
    if (text.length > 1)
        text = text[text.length - 1];
    else
        text = text[0];
    console.log(text);
    text = text.split('：');
    if (text.length > 1)
        text = text[text.length - 1];
    else
        text = text[0];
    if (!text.includes("/"))
        text = "https://pan.baidu.com/s/" + text;
    else
        text = "https:" + text;
    window.open(text, 'AutoPwdPan=' + pwd);
}
)();
