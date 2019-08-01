import { PythonInterface } from 'reactopy';
import React, { Component } from 'react';
import Plot from 'react-plotly.js';

export default class PlotlyExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noise_level: 1,
            series: null
        }
        this.pythonInterface = new PythonInterface(this, 'reactopy_examples', 'PlotlyExample');
        this.pythonInterface.syncStateToJavaScriptState(['noise_level']);
        this.pythonInterface.syncPythonStateToState(['series']);
    }
    componentDidMount() {
        this.pythonInterface.start();
        this._updateParams();
        setTimeout(() => {
            this.setState({noise_level: 25});
        }, 1000);
    }
    componentDidUpdate() {
        this.pythonInterface.update();
    }
    componentWillUnmount() {
        this.pythonInterface.stop();
    }
    _updateParams() {
    }
    render() {
        const { series } = this.state;
        if (!series) {
            return <div>Loading...</div>;
        }
        let data = [];
        let all_amplitudes = [];
        for (let i=0; i<series.length; i++) {
            let S = series[i];
            let x = [];
            let y = [];
            let color = 'green';
            for (let j = 0; j < S.times.length; j++) {
                x.push(S.times[j]);
                y.push(S.amplitudes[j]);
                all_amplitudes.push(S.amplitudes[j]);
            }
            data.push({
                x: x, y: y,
                color: color,
                type: 'scatter',
                mode: 'markers',
                hoverinfo: 'skip'
            })
        }

        let yrange = [Math.min(...all_amplitudes), Math.max(...all_amplitudes)];
        yrange = [Math.min(yrange[0], 0), Math.max(yrange[1], 0)];

        return <Plot
            data={data}
            layout={{
                width: '100%',
                height: '100%',
                title: '',
                showlegend: false,
                xaxis: {
                    autorange: true,
                    // range: [0, numTimepoints - 1],
                    showgrid: false,
                    zeroline: false,
                    showline: false,
                    ticks: '',
                    showticklabels: false
                },
                yaxis: {
                    autorange: false,
                    range: yrange,
                    showgrid: true,
                    zeroline: true,
                    showline: false,
                    // ticks: '',
                    showticklabels: true
                },
                margin: {
                    l: 50, r: 50, b: 50, t: 50
                }
            }}
            config={(
                {
                    displayModeBar: false,
                    responsive: false
                }
            )}
        />
    }
}