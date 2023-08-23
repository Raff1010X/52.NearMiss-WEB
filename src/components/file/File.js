import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    setUri,
    selectUri,
    setReport,
    selectReport,
    uriBlank,
    selectNewFile,
    setNewFile,
} from '../../features/report/reportSlice'
import { sendMessage } from '../../features/message/messageSlice'

import Resizer from 'react-image-file-resizer'

import FileOpenIcon from '@mui/icons-material/FileOpen'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import './file.css'

const File = () => {
    const [style, setStyle] = useState('file__label')
    const uri = useSelector(selectUri)
    const fileName = useSelector(selectReport)['Zdjęcie']
    const newFile = useSelector(selectNewFile)
    const refFile = useRef()
    const imageRef = useRef()
    const dispatch = useDispatch()

    const dispatchAll = (uri, name) => {
        dispatch(setUri(uri))
        dispatch(setReport({ Zdjęcie: name }))
        dispatch(setNewFile(true))
    }

    const handleFileChanged = (e) => {
        const file = e.target.files[0]
        const random =
            new Date().getTime() + Math.floor(Math.random() * 100000) + file.name.slice(file.name.lastIndexOf('.'))
        if (file) {
            try {
                Resizer.imageFileResizer(
                    file,
                    500,
                    500,
                    'JPEG',
                    70,
                    0,
                    (uri) => {
                        dispatchAll(uri, random)
                    },
                    'base64'
                )
            } catch (err) {
                dispatch(sendMessage(`Błąd kompresji pliku: ${err}`))
            }
        }
    }

    useEffect(() => {
        if (fileName) {
            setStyle('file__label file__label--bottom')
            if (!newFile) {
                const img = imageRef.current
                const source = process.env.PUBLIC_URL + '/upload/images/' + fileName
                if (fileName && img !== null) {
                    img.src = source
                }
            }
        } else {
            setStyle('file__label')
        }
    }, [dispatch, fileName, newFile])

    const handleClickFile = (e) => {
        if (fileName) {
            e.preventDefault()
            imageRef.current.src = uriBlank
            refFile.current.value = ''
            dispatchAll(uriBlank, '')
        }
    }

    return (
        <React.Fragment>
            <div className="file">
                <img className="file__img" src={uri} alt="" ref={imageRef} />
                <label className={style} htmlFor="file" onClick={(e) => handleClickFile(e)}>
                    {!fileName && (
                        <>
                            <FileOpenIcon />
                            Wybierz
                            <br />
                            zdjęcie
                        </>
                    )}
                    {fileName && (
                        <>
                            <DeleteForeverIcon />
                            Usuń
                            <br />
                            zdjęcie
                        </>
                    )}
                </label>
                <input
                    ref={refFile}
                    type="file"
                    id="file"
                    onChange={(e) => handleFileChanged(e)}
                    accept="image/gif, image/jpg, image/jpeg, image/png"
                />
            </div>
        </React.Fragment>
    )
}

export default File
