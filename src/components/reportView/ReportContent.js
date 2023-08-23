import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
    changeTableView,
    selectIndex,
    setIndex,
    selectContent,
    setContent,
    setImageSize,
    selectImageSize,
} from '../../features/register/registerSlice'

import { useNavigate } from 'react-router-dom'
import { getCommentsAsync } from './../../features/comments/commentsAPI'
import { selectComments, setReportId } from '../../features/comments/commentsSlice'

import { sendMessage, sendQuestion } from '../../features/message/messageSlice'
import AddTaskIcon from '@mui/icons-material/AddTask'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual'
import AssignmentIcon from '@mui/icons-material/Assignment'
import CircularProgress from '@mui/material/CircularProgress'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined'
import { setNewFile, setReport } from '../../features/report/reportSlice'
import { selectUser } from '../../features/login/loginSlice'
import { selectOnlineStatus } from '../../api/otherSlice'

const ReportContent = ({ reports }) => {
    const dispatch = useDispatch()
    const index = useSelector(selectIndex)
    const content = useSelector(selectContent)
    const comments = useSelector(selectComments)
    const userEmail = useSelector(selectUser).email
    const imageSize = useSelector(selectImageSize)
    const [loading, setLoading] = useState(true)
    const imageRef = useRef(null)
    const r = reports[index]
    const navigate = useNavigate()

    const online = useSelector(selectOnlineStatus)

    useEffect(() => {
        setLoading(true)
        const img = imageRef.current
        let source = process.env.PUBLIC_URL + '/upload/images/' + r['Zdjęcie'] // const image = new URL('/upload/images/' + r['Zdjęcie'], 'http://localhost:3001')
        if (r['Zdjęcie'] && img !== null) {
            img.onload = function () {
                setLoading(false)
            }
            img.src = source
        }

        if (online) dispatch(getCommentsAsync(r['Numer zgłoszenia']))
        dispatch(setReportId(r['Numer zgłoszenia']))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index])

    const newContent = (content) => {
        if (content === '--text') return '--image'
        else return '--text'
    }
    const handleClickImageChange = () => {
        dispatch(setContent(newContent(content)))
    }

    const handleClick = () => {
        dispatch(setIndex(0))
        dispatch(changeTableView(true))
    }

    const handleClickConfimation = () => {
        if (r['Status'] === 'Niewykonane') {
            dispatch(
                sendQuestion({
                    message: `Czy potwierdzasz wykonanie zgłoszenia nr ${r['Numer zgłoszenia']}`,
                    function: 'setReportExecuted',
                })
            )
        }
    }

    const isAutor = () => {
        if (r['Zgłaszający'] !== userEmail) {
            dispatch(sendMessage('Nie możesz edytować zgłoszeń innych użytkowników.'))
            return false
        }
        return true
    }
    const handleClickDelete = () => {
        if (!online) return
        if (!isAutor()) return
        dispatch(
            sendQuestion({
                message: `Czy usunąć zgłoszenie nr ${r['Numer zgłoszenia']}`,
                function: 'deleteReport',
            })
        )
    }

    const handleImageSize = () => {
        if (imageSize === 'report-view__image-img') {
            dispatch(setImageSize('report-view__image-img--large'))
        } else {
            dispatch(setImageSize('report-view__image-img'))
        }
    }

    const handleClickComments = () => {
        if (!online) return
        else navigate('/comments')
    }

    const handleClickEdit = () => {
        if (!online) return
        if (!isAutor()) return
        dispatch(setReport(r))
        dispatch(setNewFile(false))
        navigate('/editReport')
    }

    return (
        <div className="report-view__content">
            <div className="report-view__top">
                <div className="report-view__top-edge" onClick={handleClick}>
                    <i>
                        <ArrowBackIcon />
                    </i>
                </div>
                <div className="report-view__top-center">
                    <div>{r['Zagrożenie']}</div>
                    {r['Konsekwencje'] && <div>{r['Konsekwencje']} zagrożenie</div>}
                </div>

                <div className="report-view__top-edge" onClick={handleClickConfimation}>
                    {r['Status'] === 'Wykonane' && (
                        <i>
                            <DoneAllIcon htmlColor="limegreen" />
                        </i>
                    )}
                    {r['Status'] === 'Niewykonane' && (
                        <i className="report-view__top-icon--animated">
                            <AddTaskIcon />
                        </i>
                    )}
                    {r['Status'] === 'Niewykonane' && (
                        <div className="report-view__top-edge--date">
                            Zgłoś
                            <br />
                            wykonanie
                        </div>
                    )}

                    {r['Data wykonania'] && (
                        <div className="report-view__top-edge--date">
                            Wykonano
                            <br /> {r['Data wykonania']}
                        </div>
                    )}
                </div>
            </div>

            <div className="report-view__middle">
                <div className={`report-view__middle-left${content}`}>
                    <div className="report-view__image-wrapper">
                        {!r['Zdjęcie'] && (
                            <div className="report-view__image-loading">
                                <PhotoSizeSelectActualIcon fontSize="large" />
                                Brak zdjęcia
                            </div>
                        )}
                        {r['Zdjęcie'] && (
                            <div className="report-view__image-loading" style={{ display: loading ? 'flex' : 'none' }}>
                                <CircularProgress />
                                Ładuję zdjęcie...
                            </div>
                        )}
                        {r['Zdjęcie'] && (
                            <img
                                ref={imageRef}
                                className={imageSize}
                                style={{ display: loading ? 'none' : 'flex' }}
                                src=""
                                alt=""
                                onClick={handleImageSize}
                            />
                        )}
                    </div>
                </div>
                <div className={`report-view__middle-right${content}`}>
                    <div className="report-view__middle-text">
                        <h2>Dział / miejsce / czas</h2> {r['Dział']}
                        <br /> {r['Miejsce']} <br /> {r['Data zdarzenia'] + '  '}
                        {r['Godzina zdarzenia']}
                    </div>
                    <div className="report-view__middle-text">
                        <h2>Opis zagrożenia</h2> {r['Opis Zagrożenia']}
                    </div>
                    <div className="report-view__middle-text">
                        <h2>Skutek</h2> {r['Skutek']}
                    </div>
                    <div className="report-view__middle-text">
                        <h2>Działania do wykonania</h2> {r['Działania do wykonania']}
                    </div>
                </div>
            </div>

            <div className="report-view__bottom">
                <div className="report-view__bottom-text">
                    Zgłoszenie nr: {r['Numer zgłoszenia']} z dn.: {r['Data utworzenia']}
                </div>

                <div className="report-view__bottom-buttons">
                    <div className="report-view__bottom-change" onClick={handleClickImageChange}>
                        {content === '--text' && (
                            <i>
                                <PhotoSizeSelectActualOutlinedIcon />
                                Zdjęcie
                            </i>
                        )}
                        {content === '--image' && (
                            <i>
                                <AssignmentIcon />
                                Pokaż tekst
                            </i>
                        )}
                    </div>
                    <div className="report-view__bottom-delete" onClick={handleClickDelete}
                        style={!online ? { filter: 'grayscale(100%)' } : {}}
                    >
                        <i>
                            <RemoveCircleOutlineIcon />
                            Usuń
                        </i>
                    </div>
                    <div className="report-view__bottom-edit" onClick={handleClickEdit}
                        style={!online ? { filter: 'grayscale(100%)' } : {}}
                    >
                        <i>
                            <ModeEditOutlineOutlinedIcon />
                            Edytuj
                        </i>
                    </div>
                    <div className="report-view__bottom-comment" onClick={handleClickComments}
                        style={!online ? { filter: 'grayscale(100%)' } : {}}
                    >
                        <i>
                            <MapsUgcOutlinedIcon />
                            Komentuj
                        </i>
                        {online && <p>{comments.length}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportContent
