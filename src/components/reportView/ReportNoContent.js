import { useSelector } from 'react-redux'
import { selectContent, selectNodata } from '../../features/register/registerSlice'
import AddTaskIcon from '@mui/icons-material/AddTask'
import AssignmentIcon from '@mui/icons-material/Assignment'
import CircularProgress from '@mui/material/CircularProgress'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined'

const ReportNoContent = () => {
    const noData = useSelector(selectNodata)
    const content = useSelector(selectContent)
    const skeleton = <div className="skeleton"></div>
    return (
        <div className="report-view">
            {noData && (
                <div className="report-view__no-content">
                    Brak wyników
                    <br />
                    wyszukiwania
                </div>
            )}

            {!noData && (
                <div className="report-view__content">
                    <div className="report-view__top">
                        <div className="report-view__top-edge">
                            <i>
                                <ArrowBackIcon />
                            </i>
                        </div>
                        <div className="report-view__top-center">
                            <div>
                                <div className="skeleton" style={{ width: '35vw', height: '4rem' }}></div>
                            </div>
                        </div>

                        <div className="report-view__top-edge">
                            <i className="report-view__top-icon--animated">
                                <AddTaskIcon />
                            </i>
                            <div className="report-view__top-edge--date">
                                Zgłoś
                                <br />
                                wykonanie
                            </div>
                        </div>
                    </div>

                    <div className="report-view__middle">
                        <div className={`report-view__middle-left${content}`}>
                            <div className="report-view__image-wrapper">
                                <div className="report-view__image-loading">
                                    <CircularProgress />
                                    Ładuję zdjęcie...
                                </div>
                            </div>
                        </div>
                        <div className={`report-view__middle-right${content}`}>
                            <div className="report-view__middle-text">
                                <h2>Dział / miejsce / czas</h2> {skeleton}
                            </div>
                            <div className="report-view__middle-text">
                                <h2>Opis zagrożenia</h2> {skeleton}
                            </div>
                            <div className="report-view__middle-text">
                                <h2>Skutek</h2> {skeleton}
                            </div>
                            <div className="report-view__middle-text">
                                <h2>Działania do wykonania</h2> {skeleton}
                            </div>
                        </div>
                    </div>

                    <div className="report-view__bottom">
                        <div className="report-view__bottom-text">
                            <div className="skeleton" style={{ width: '28ch' }}></div>
                        </div>
                        <div className="report-view__bottom-buttons">
                            <div className="report-view__bottom-change">
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
                            <div className="report-view__bottom-delete">
                                <i>
                                    <RemoveCircleOutlineIcon />
                                    Usuń
                                </i>
                            </div>
                            <div className="report-view__bottom-edit">
                                <i>
                                    <ModeEditOutlineOutlinedIcon />
                                    Edytuj
                                </i>
                            </div>
                            <div className="report-view__bottom-comment">
                                <i>
                                    <MapsUgcOutlinedIcon />
                                    Komentuj
                                </i>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ReportNoContent
