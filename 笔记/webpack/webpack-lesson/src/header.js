function Header() {
    var root = document.querySelector('.root')
    var header = document.createElement('div')
    header.innerText = 'Header'
    root.append(header)
}

export default Header