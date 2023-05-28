import React, { PureComponent } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Text } from 'recharts'
import CircularProgress from '@mui/material/CircularProgress'

export default class Stat6 extends PureComponent {
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
                        <div className="stats__title">Liczba zarejestrowanych zgłoszeń</div>
                        <ResponsiveContainer width="100%" height="99%">
                            <BarChart
                                data={this.props.data}
                                maxBarSize={60}
                                margin={{
                                    top: 80,
                                    right: 30,
                                    left: -20,
                                    bottom: 10,
                                }}
                            >
                                <CartesianGrid strokeDasharray="6 6" stroke="#00c8ff99" vertical={false} />
                                <XAxis dataKey="Dział" minTickGap={25} tick={<CustomAxisLabel />} />
                                <YAxis stroke="#009bcd" />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar
                                    dataKey="Liczba zgłoszeń przez dział"
                                    fill="#00c8ff99"
                                    label={{ position: 'top', fill: '#009bcd' }}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </React.Fragment>
        )
    }
}

const CustomAxisLabel = ({ x, y, payload }) => {
    if (!payload) return null
    return (
        <Text x={x} y={y} width={75} textAnchor="middle" verticalAnchor="start" fill="#009bcd">
            {payload.value}
        </Text>
    )
}

const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
        if (!payload) return null
        return (
            <div className="stats__tooltip">
                <p className="stats__label">{`${label}`}</p>
                <p className="stats__desc">{`Zgłoszono: ${payload[0].value}`}</p>
            </div>
        )
    }

    return null
}
