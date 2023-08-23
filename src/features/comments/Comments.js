import { useEffect, useState, useCallback } from 'react'
import { sendMessage, sendQuestion } from '../message/messageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectIndex, selectReports } from '../register/registerSlice'
import { selectComments } from '../comments/commentsSlice'
import { selectUser } from '../login/loginSlice'
import { postCommentsAsync, patchCommentsAsync } from './commentsAPI'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { is } from '../../misc/validate'
import { selectOnlineStatus } from '../../api/otherSlice'

import useAppScroll from '../../hooks/useAppScroll'
import useScroll from '../../hooks/useScroll'

import Button from '../../components/button/Button'
import TextArea from '../../components/textarea/TextArea'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'

import './comments.css'

const Comments = () => {
    useScroll()
    useAppScroll()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const reports = useSelector(selectReports)
    const index = useSelector(selectIndex)
    const r = reports[index]
    const comments = useSelector(selectComments)
    const user = useSelector(selectUser)
    const [selected, setSelected] = useState(-1)
    const [commentsRender, setCommentsRender] = useState(-1)
    const [commentValue, setCommentValue] = useState()
    const refcommentInput = useRef(null)
    const online = useSelector(selectOnlineStatus)

    const checkValidyty = () => {
        return is.notLess(refcommentInput)
    }

    const toggleMenu = useCallback((e) => {
        let leftShift = 0
        if (window.innerWidth > 1350) leftShift = Math.round(window.innerWidth - 1350) / 2
        const menu = document.getElementById('comments__menu')
        menu.style.top = e.target.offsetTop - e.target.scrollTop + 'px'
        menu.style.left = -leftShift + e.clientX + 'px'
        menu.classList.toggle('comments__menu--visible')
    }, [])

    const handleClickSelect = useCallback(
        (e) => {
            const numer = e.target.getAttribute('data-numer')
            const wpis = comments.filter((el) => el['Numer komentarza'] === Number(numer))[0]['Wpis']
            setSelected(numer)
            setCommentValue(wpis)
            toggleMenu(e)
        },
        [comments, toggleMenu]
    )

    useEffect(() => {
        const comentsComponent = comments.map((el) => (
            <div
                data-numer={el['Numer komentarza']}
                key={el['Numer komentarza']}
                className={
                    el['Numer komentarza'] === Number(selected) ? 'comment__container--selected' : 'comment__container'
                }
                onClick={handleClickSelect}
            >
                <div data-numer={el['Numer komentarza']} className="comment__text">
                    {el['Wpis']}
                </div>
                <div data-numer={el['Numer komentarza']} className="comment__text-autor">
                    Nr: {el['Numer komentarza']}, {el['Autor']}, {el['Data']}
                </div>
            </div>
        ))
        setCommentsRender(comentsComponent)
    }, [comments, handleClickSelect, selected])

    const handleClickBack = () => {
        navigate('/register')
    }

    const toggleAddEdit = useCallback(() => {
        const form = document.getElementById('comments__add-edit')
        if (form.classList.contains('comments__add-edit--visible')) {
            form.classList.remove('comments__add-edit--visible')
            form.classList.add('comments__add-edit--hidden')
        } else {
            form.classList.add('comments__add-edit--visible')
            form.classList.remove('comments__add-edit--hidden')
        }
    }, [])

    const handleClickAdd = () => {
        setSelected(-1)
        setCommentValue('')
        toggleAddEdit()
    }

    const checkUser = useCallback(() => {
        if (user.email !== comments.filter((el) => el['Numer komentarza'] === Number(selected))[0]['Autor']) {
            dispatch(sendMessage('Nie możesz edytować wpisów innych użytkowników'))
            return true
        }
        return false
    }, [comments, dispatch, selected, user.email])

    const handleClickEdit = (e) => {
        if (checkUser()) return
        toggleMenu(e)
        toggleAddEdit()
    }

    const handleClickChangeComment = () => {
        if (checkValidyty()) {
            if (selected === -1) {
                const data = {
                    'Numer zgloszenia': r['Numer zgłoszenia'],
                    'Adres email': user.email,
                    Komentarz: commentValue,
                }
                dispatch(postCommentsAsync(data)) // new
            } else {
                const data = {
                    id: selected,
                    Komentarz: commentValue,
                }
                dispatch(patchCommentsAsync(data)) // edited
            }
            toggleAddEdit()
        }
    }

    const handleClickDelete = (e) => {
        if (checkUser()) return
        dispatch(
            sendQuestion({
                message: `Czy potwierdzasz usunięcie komentarza nr ${selected}`,
                function: 'deleteComment',
            })
        )
        toggleMenu(e)
    }

    useEffect(() => {
        if (!r) navigate('/')
    }, [navigate, r])

    return (
        <div className="comments">
            {/* menu */}
            <div id="comments__menu" className="comments__menu--hidden">
                <div onClick={handleClickEdit}>
                    <ModeEditOutlineOutlinedIcon />
                    Edytuj
                </div>
                <div onClick={handleClickDelete}>
                    <RemoveCircleOutlineIcon />
                    Usuń
                </div>
            </div>
            {/* container */}
            <div className="comments__container">
                <div id="comments__head" className="report-view__top">
                    {/* header */}
                    <div className="report-view__top-edge" onClick={handleClickBack}>
                        <i>
                            <ArrowBackIcon />
                        </i>
                    </div>
                    <div className="report-view__top-center">
                        {r && (
                            <div>
                                Komentarze do zgłoszenia <br />
                                nr {r['Numer zgłoszenia']}
                            </div>
                        )}
                    </div>

                    {!online ? (
                        <div className="report-view__top-edge">
                            <i className="report-view__top-icon">
                                <MapsUgcOutlinedIcon />
                            </i>
                            
                            <div className="report-view__top-edge--date">
                                Brak połączenia
                                <br />
                                z serwerem
                            </div>
                        </div>
                    ) : (
                        <div className="report-view__top-edge" onClick={handleClickAdd}>
                            <i className="report-view__top-icon--animated">
                                <MapsUgcOutlinedIcon />
                            </i>

                            <div className="report-view__top-edge--date">
                                Dodaj
                                <br />
                                komentarz
                            </div>
                        </div>
                    )}

                    {/* comment form */}
                    <div id="comments__add-edit" className="comments__add-edit--hidden">
                        <div className="comments__head">{selected === -1 ? 'Nowy komentarz' : 'Edytuj komentarz'}</div>
                        <div className="comments__input">
                            <TextArea
                                reff={refcommentInput}
                                id="comments__input"
                                placeholder="Wpisz treść komentarza"
                                label="Treść komentarza"
                                className="report__textarea"
                                value={commentValue}
                                maxLen={255}
                                setFn={setCommentValue}
                            />
                        </div>
                        <div className="comments__buttons">
                            <Button onClick={handleClickChangeComment}>
                                {selected === -1 ? 'Dodaj komentarz' : 'Zapisz zmiany'}
                            </Button>
                            <Button onClick={toggleAddEdit}>Anuluj</Button>
                        </div>
                    </div>
                </div>
                {/* comments */}
                {comments.length !== 0 ? (
                    commentsRender
                ) : (
                    <div id="comments__no-content" className="report-view__no-content">
                        Brak komentarzy
                    </div>
                )}
            </div>
        </div>
    )
}

export default Comments
