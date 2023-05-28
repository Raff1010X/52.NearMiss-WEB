import React, { PureComponent } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { CircularProgress } from '@mui/material'

const COLORS = ['#00c8ff99', '#00c8ff36']

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)
    return (
        <text x={x} y={y} fill={'#009bcd'} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    )
}

export default class Stat2 extends PureComponent {
    render() {
        return (
            <React.Fragment>
                {!this.props.data && (
                    <div className="stats__chart">
                        <CircularProgress />
                    </div>
                )}
                {this.props.data && (
                    <div className="stats__chart">
                        <div className="stats__title">Zgłoszenia</div>
                        <ResponsiveContainer width="100%" height="85%">
                            <PieChart>
                                <Pie
                                    data={this.props.data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={'80%'}
                                    innerRadius={'30%'}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {this.props.data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div id="stats__label--right">
                            Wykonane {this.props.data[0].value} <br />
                            {Math.round(
                                (this.props.data[0].value / (this.props.data[0].value + this.props.data[1].value)) * 100
                            )}
                            %
                        </div>
                        <div id="stats__label--left">
                            Niewykonane {this.props.data[1].value}
                            <br />
                            {Math.round(
                                (this.props.data[1].value / (this.props.data[0].value + this.props.data[1].value)) * 100
                            )}
                            %
                        </div>
                    </div>
                )}
            </React.Fragment>
        )
    }
}
