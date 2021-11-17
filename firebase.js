import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAuuLVy94PUS8YtEfhibbtHewCsrImhhfM",
    authDomain: "futures-1dff5.firebaseapp.com",
    databaseURL: "https://futures-1dff5-default-rtdb.firebaseio.com",
    projectId: "futures-1dff5",
    storageBucket: "futures-1dff5.appspot.com",
    messagingSenderId: "204808828169",
    appId: "1:204808828169:web:6af7aac7a9966fa6854fd8",
    measurementId: "G-2GV70QZBQ2"
};

initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const $ = document.querySelector.bind(document);
const de = decodeURI;
const en = encodeURI;

var url = de(window.location.href).split('//')[1].split('/').slice(1);
if (url[0] == 'blog')
    url = url.slice(1);
if (url[0] == '')
    url = ['index', 'index']
if (url[1] == '')
    url[1] = 'index'
if (url[1] == 'index')
    url.push('index')
if (url[2] == '')
    url[2] = 'index'
while (url.length < 3) {
    url.push('index')
}
console.log(url)

var user = getAuth().currentUser;
console.log(user);
console.log(getAuth().currentUser);
if (user) {
    console.log(user.uid);
    var user = await getDoc(doc(db, 'user', user.uid));
    if (!user.data().auth) {
        var editsave = await getDoc(doc(db, 'source', 'editsave'));
        $('body').innerHTML += editsave.data().index;
    }
    var nav = await getDoc(doc(db, 'source', 'nav'));
    $('body').innerHTML += nav.data().index;
}

var css = doc(db, 'source', 'css');
var css = await getDoc(css);
var style = document.createElement('style');
style.innerHTML = css.data()['github_markdown'];
$('head').appendChild(style);

var aside = doc(db, 'source', 'aside');
var aside = await getDoc(aside);
$('body').innerHTML += aside.data().index;

// 1
$('body').innerHTML += '<section></section>';
const create = '파일이 존재하지 않습니다.<br><button onclick=edit()>create</button>';
async function getData() {
    var html = await getDoc(doc(db, url[0], url[1]));
    if (html.data()) {
        if (url[2] in html.data()) {
            var html = de(html.data()[url[2]].replace('%0A', ''));
            return html;
        } else
            return create;
    } else
        return create;
}
getData().then((html) => { $('section').innerHTML = html });

// 2
function edit() {
    $('section').innerHTML = '<textarea>';
    getData().then((html) => { $('textarea').value = html });
    $('textarea').style = "width:100%; height:100%;"
}

// 3
async function save() {
    var dict = await getDoc(doc(db, url[0], url[1]));
    dict = dict.data();
    dict[url[2]] = en($('textarea').value);
    dict[url[2]] = dict[url[2]].replaceAll('%0A', '');
    while (dict[url[2]].includes('%20%20')) {
        dict[url[2]] = dict[url[2]].replaceAll('%20%20', '%20');
    }
    await updateDoc(doc(db, url[0], url[1]), dict);
    await getData().then((html) => { $('section').innerHTML = html });
}

// 4
async function signin() {
    signInWithEmailAndPassword(auth, $('#id').value, $('#pw').value)
        .then((userCredential) => {
            window.location.href = window.location.href + 'futures';
        }).catch((e) => {
            $('span').classList.toggle('hide');
            // alert(e.code);
        });
}

async function signout() {
    signOut(auth).then(() => {
        alert('로그아웃 되었습니다.');
        location.reload();
    }).catch((e) => {
        alert('로그인 정보가 없습니다.');
    });
}

window.getData = getData;
window.edit = edit;
window.save = save;
window.signin = signin;
window.signout = signout;