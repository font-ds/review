function Sidebar() {
    var root = document.querySelector('.root')
    var sidebar = document.createElement('div')
    sidebar.innerText = 'Sidebar'
    root.append(sidebar)
}

export default Sidebar