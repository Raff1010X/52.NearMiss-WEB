import React from 'react'
import { CircularProgress } from '@mui/material'

const Stat7 = ({ data }) => {
    if (!data)
        return (
            <div className="stats__chart">
                <CircularProgress />
            </div>
        )
    return (
        <div className="stats__chart chart--7">
            <div className="stats__title">Top 10</div>
            <div className="stats__top10">
                {data.map((el, ind) => {
                    return (
                        <div key={ind}>
                            {ind + 1}
                            {'. '}
                            {el.email} {': '}
                            {el['Liczba zgłoszeń']}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Stat7
