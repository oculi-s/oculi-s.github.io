import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

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

var url = decodeURI(window.location.href).replace('.html', '').split('//')[1].split('/').slice(1);
if (url[0] == '')
  url = ['futures']
if (url[1] == 'index')
  url.push('index')
if (url[2] == '')
  url.push('index')

var css = doc(db, url[0], 'css');
var css = await getDoc(css);
var style = document.createElement('style');
style.innerHTML = css.data()['github_markdown'];
$('head').appendChild(style);

var html = doc(db, url[0], url[1]);
var html = await getDoc(html);
var html = decodeURI(html.data()[url[2]].replace('\n','').replace('\t','').replace(' ',''))
$('body').innerHTML = html;

function edit(){
  $('section').innerHTML = '<textarea>';
  $('textarea').innerHTML = html;
  $('textarea').style = "width:100%; height:100%;"
}

function save(){
  var dict = {}
  dict[url[2]] = encodeURI($('textarea').innerHTML);
  // await setDoc(doc(db, url[0], url[1]), dict);
}
