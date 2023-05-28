import { useEffect } from 'react'
import ReactDOM from 'react-dom'

const useScroll = () => {
    return useEffect(() => {
        const app = ReactDOM.findDOMNode(document.querySelector('#App'))
        app.classList.add('add_scroll')
        return () => {
            app.classList.remove('add_scroll')
        }
    }, [])
}

export default useScroll
