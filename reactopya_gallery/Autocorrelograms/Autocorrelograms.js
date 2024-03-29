import { PythonInterface } from 'reactopya';
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Plot from 'react-plotly.js';
const config = require('./Autocorrelograms.json');

export default class Autocorrelograms extends Component {
    static title = 'Autocorrelograms'
    static reactopyaConfig = config;
    constructor(props) {
        super(props);
        this.state = {
            firingsPath: props.firingsPath,
            samplerate: props.samplerate,
            max_samples: props.max_samples || 10000,
            bin_size_msec: props.bin_sec_msec || 2,
            max_dt_msec: props.max_dt_msec || 50,
            download_from: props.download_from,
            status: '',
            status_message: '',
            output: null
        }
    }
    componentDidMount() {
        this.pythonInterface = new PythonInterface(this, config);
        this.pythonInterface.start();
        this._updateParams();
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
        const { output } = this.state;

        return (
            <RespectStatus {...this.state}>
                <Grid container>
                    {
                        ((output || {}).autocorrelograms || []).map((ac) => (
                            <Grid item key={ac.unit_id}>
                                <CorrelogramPlot
                                    key={ac.unit_id}
                                    bin_counts={ac.bin_counts}
                                    bin_edges={ac.bin_edges}
                                    title={`Unit ${ac.unit_id}`}
                                    width={150}
                                    height={150}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
            </RespectStatus>
        )
    }
}

class RespectStatus extends Component {
    state = {}
    render() {
        switch (this.props.status) {
            case 'running':
                return <div>Running: {this.props.status_message}</div>
            case 'error':
                return <div>Error: {this.props.status_message}</div>
            case 'finished':
                return this.props.children;
            default:
                return <div>Unknown status: {this.props.status}</div>
        }
    }
}

class CorrelogramPlot extends Component {
    state = {}
    render() {
        const { bin_edges, bin_counts, title, width, height } = this.props;
        return (
            <Plot
                data={[{
                    x: bin_edges.slice(0, bin_edges.length - 1),
                    y: bin_counts,
                    type: 'bar'
                }]}
                layout={{
                    width: width,
                    height: height,
                    title: title,
                    showlegend: false,
                    bargap: 0,
                    xaxis: {
                        autorange: false,
                        range: [bin_edges[0], bin_edges[bin_edges.length - 1]],
                        showgrid: false,
                        zeroline: false,
                        showline: false,
                        ticks: '',
                        showticklabels: false
                    },
                    yaxis: {
                        autorange: true,
                        showgrid: false,
                        zeroline: false,
                        showline: false,
                        ticks: '',
                        showticklabels: false
                    },
                    margin: {
                        l: 20, r: 20, b: 0, t: 0
                    }
                }}
                config={(
                    {
                        displayModeBar: false,
                        responsive: false
                    }
                )}
            />
        );
    }
}