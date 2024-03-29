import { PythonInterface } from 'reactopya';
import React, { Component } from 'react';
import Plot from 'react-plotly.js';

export default class PlotlyExample extends Component {
    static title = 'Plotly example'
    render() {
        return (
            <AutoSizer>
                <PlotlyExampleInner {...this.props} />
            </AutoSizer>
        );
    }
}

class PlotlyExampleInner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: null
        }
    }
    componentDidMount() {
        this.pythonInterface = new PythonInterface(this, require('./PlotlyExample.json'));
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
        const { series } = this.state;
        if (!series) {
            return <div>Loading...</div>;
        }
        let data = [];
        let all_y = [];
        for (let i=0; i<series.length; i++) {
            let S = series[i];
            let x = [];
            let y = [];
            let color = colorArr[i % colorArr.length];
            for (let j = 0; j < S.x.length; j++) {
                x.push(S.x[j]);
                y.push(S.y[j]);
                all_y.push(S.y[j]);
            }
            data.push({
                x: x, y: y,
                type: 'scatter',
                mode: 'line',
                hoverinfo: 'skip',
                line: {
                    color: color
                }
            });
        }

        let yrange = [Math.min(...all_y), Math.max(...all_y)];
        yrange = [Math.min(yrange[0], 0), Math.max(yrange[1], 0)];

        return <Plot
            data={data}
            layout={{
                width: this.props.width || '100%',
                height: 500,
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

class AutoSizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: null
        };
    }

    async componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.resetWidth);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resetWidth);
    }

    resetWidth = () => {
        this.setState({
            width: null
        });
    }

    async componentDidUpdate(prevProps, prevState) {
        if (!this.state.width) {
            this.updateDimensions();
        }
    }

    updateDimensions() {
        if (this.state.width !== this.container.offsetWidth) {
            this.setState({
                width: this.container.offsetWidth // see render()
            });
        }
    }

    render() {
        let { width } = this.state;
        if (!width) width=300;

        const elmt = React.Children.only(this.props.children)

        return (
            <div className="determiningWidth" ref={el => (this.container = el)}>
                <elmt.type {...elmt.props} width={this.state.width}>{elmt.children}</elmt.type>
            </div>
        );
    }
}

const colorArr = [
    "#19e64B",
    "#3cb44b",
    "#bfef45",
    "#42d4f4",
    "#4363d8",
    "#911eb4",
    "#f032e6",
    "#ffe119"
];