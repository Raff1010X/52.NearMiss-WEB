import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserIsLogged } from '../login/loginSlice'
import { resetReport, resetUri } from '../report/reportSlice'

import { useNavigate } from 'react-router-dom'

import Button from '../../components/button/Button'
import AddCommentIcon from '@mui/icons-material/AddComment'

const Description = () => {
    const dispatch = useDispatch()
    const ref = useRef(null)

    const callback = (entry) => {
        if (entry[0].isIntersecting) ref.current.classList.add('description-animation')
    }

    const observer = new IntersectionObserver(callback, {
        root: ref.current,
        threshold: 0.3,
    })

    useEffect(() => {
        observer.observe(ref.current)
        const referance = ref.current
        return () => observer.unobserve(referance)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const isUserLogged = useSelector(selectUserIsLogged)
    const navigate = useNavigate()

    const handleClick = () => {
        dispatch(resetUri())
        dispatch(resetReport())
        isUserLogged ? navigate('/report') : navigate('/login')
    }

    return (
        <div id="description" ref={ref}>
            <div id="description__texts">
                <div id="description__text-1">
                    <p>Co to jest zdarzenie potencjalnie wypadkowe?</p>
                </div>
                <div id="description__text-2">
                    <p>Po co rejestrować zdarzenia potencjalnie wypadkowe?</p>
                </div>
                <div id="description__text-3">
                    <p>Jak zgłosić zdarzenie potencjalnie wypadkowe?</p>
                </div>
            </div>
            <Button id="description__button" onClick={handleClick} icon={<AddCommentIcon />}>
                Zgłoś zagrożenie
            </Button>
        </div>
    )
}

export default Description
