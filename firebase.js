import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

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
console.log(url)

var css = doc(db, 'source', 'css');
var css = await getDoc(css);
var style = document.createElement('style');
style.innerHTML = css.data()['github_markdown'];
$('head').appendChild(style);

async function getData() {
    var html = doc(db, url[0], url[1]);
    var html = await getDoc(html);
    var html = de(html.data()[url[2]].replace('%0A', ''));
    return html;
}
getData().then((html) => { $('body').innerHTML = html });

function edit() {
    $('section').innerHTML = '<textarea>';
    getData().then((html) => { $('textarea').value = html });
    $('textarea').style = "width:100%; height:100%;"
    console.log(this)
    this.classList.toggle('hide');
}

async function save() {
    var dict = {};
    dict[url[2]] = en($('textarea').value);
    dict[url[2]] = dict[url[2]].replaceAll('%0A', '');
    while (dict[url[2]].includes('%20%20')) {
        dict[url[2]] = dict[url[2]].replaceAll('%20%20', '%20');
    }
    await updateDoc(doc(db, url[0], url[1]), dict);
    await getData().then((html) => { $('body').innerHTML = html });
    console.log(this)
    this.classList.toggle('hide');
}
window.getData = getData;
window.edit = edit;
window.save = save;