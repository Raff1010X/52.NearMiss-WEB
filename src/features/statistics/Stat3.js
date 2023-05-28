import React, { PureComponent } from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import CircularProgress from '@mui/material/CircularProgress'

export default class Stat3 extends PureComponent {
    render() {
        return (
            <React.Fragment>
                {!this.props.data && (
                    <div className="stats__chart">
                        <CircularProgress />
                    </div>
                )}
                {this.props.data && (
                    <div className="stats__chart chart--3">
                        <div className="stats__title">Liczba zgłoszeń</div>
                        <ResponsiveContainer width="100%" height="99%">
                            <AreaChart
                                data={this.props.data}
                                margin={{
                                    top: 80,
                                    right: 30,
                                    left: -20,
                                    bottom: 10,
                                }}
                            >
                                <CartesianGrid strokeDasharray="6 6" stroke="#00c8ff99" />
                                <XAxis dataKey="date" stroke="#009bcd" minTickGap={30} />
                                <YAxis stroke="#009bcd" />
                                <Tooltip content={<CustomTooltip />} />
                                <Area dataKey="post" type="monotone" stroke="#009bcd" fill="#00c8ff99" />
                                <Area dataKey="done" type="monotone" stroke="#009bcd" fill="#00c8ff36" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </React.Fragment>
        )
    }
}

const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
        if (!payload) return null
        return (
            <div className="stats__tooltip">
                <p className="stats__label">{`${label}`}</p>
                <p className="stats__desc">{`Zgłoszono : ${payload?.[0].value}`}</p>
                <p className="stats__desc">{`Wykonano : ${payload?.[1].value}`}</p>
            </div>
        )
    }

    return null
}
