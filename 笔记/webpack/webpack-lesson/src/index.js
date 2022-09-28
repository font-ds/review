import "@babel/polyfill"
import _ from 'lodash';

import { add } from './match';
import Header from './header'
import Sidebar from './sidebar'
import Content from './content'
import avatar from './5.jpg'
import './index.scss'
import './style.css'

var img = new Image()
img.src = avatar
img.classList.add('avatar')

var root = document.querySelector('.root')
root.append(img)

Header()
Sidebar()
Content()

var btn = document.createElement('button')
btn.innerHTML = "点击"
document.body.appendChild(btn)
btn.onclick = function () {
    var div = document.createElement('div')
    div.innerHTML = "item"
    document.body.appendChild(div)
}

const arr = [
    new Promise(() => { }),
    new Promise(() => { })
]

arr.map(item => {
    console.log(item);
})

add(1, 2)

console.log(_join(['a', 'b', 'c'], '***'));