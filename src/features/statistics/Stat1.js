import { CircularProgress } from '@mui/material'

const Stat1 = ({ data }) => {
    if (data[0] === undefined)
        return (
            <div className="stats__chart chart--1">
                <CircularProgress />
            </div>
        )
    const number = Math.round(data[0].value / 100)
    return (
        <div className="stats__chart chart--1">
            <div id="stats__text-1">
                {number}
                <div id="stats__text-2">*</div>
            </div>
            <div id="stats__text-3">* Liczba wypadków przy pracy, którym zapobiegliśmy</div>
        </div>
    )
}

export default Stat1
