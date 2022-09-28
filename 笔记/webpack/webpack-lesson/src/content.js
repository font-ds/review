function Content() {
    var root = document.querySelector('.root')
    var content = document.createElement('div')
    content.innerText = 'Content'
    root.append(content)
}

export default Content