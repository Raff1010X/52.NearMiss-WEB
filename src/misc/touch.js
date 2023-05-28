import ReactDOM from 'react-dom'

export const touchMoves = (e, touchStart) => {
    try {
        if (e.target.className.includes('MuiSlider')) return
    } catch {}
    const prevIcon = ReactDOM.findDOMNode(document.getElementById('prev-icon'))
    const nextIcon = ReactDOM.findDOMNode(document.getElementById('next-icon'))
    if (touchStart - 150 > e.changedTouches[0].clientX) {
        prevIcon.style.display = 'flex'
        prevIcon.style.top = `${e.changedTouches[0].clientY}px`
        prevIcon.style.left = `${e.changedTouches[0].clientX}px`
    } else {
        prevIcon.style.display = 'none'
    }
    if (touchStart + 150 < e.changedTouches[0].clientX) {
        nextIcon.style.display = 'flex'
        nextIcon.style.top = `${e.changedTouches[0].clientY}px`
        nextIcon.style.left = `${e.changedTouches[0].clientX}px`
    } else {
        nextIcon.style.display = 'none'
    }
}

export const touchEnds = () => {
    const prevIcon = ReactDOM.findDOMNode(document.getElementById('prev-icon'))
    const nextIcon = ReactDOM.findDOMNode(document.getElementById('next-icon'))
    prevIcon.style.display = 'none'
    nextIcon.style.display = 'none'
}
