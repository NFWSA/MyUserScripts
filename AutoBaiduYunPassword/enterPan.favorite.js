javascript:(
function(){
    var text = window.getSelection().toString().trim();
    text = text.split(' ');
    var pwd = text[text.length - 1];
    pwd = pwd.split(':');
    pwd = pwd[pwd.length - 1];
    pwd = pwd.split('：');
    pwd = pwd[pwd.length - 1];
    text = text[0];
    window.open(text, 'AutoPwdPan=' + pwd);
}
)();
