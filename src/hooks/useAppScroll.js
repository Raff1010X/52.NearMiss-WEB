import { useEffect } from 'react'
import ReactDOM from 'react-dom'

const useAppScroll = () => {
    return useEffect(() => {
        const app = ReactDOM.findDOMNode(document.querySelector('#App'))
        app.scrollTo({ top: 0 })
    }, [])
}

export default useAppScroll
