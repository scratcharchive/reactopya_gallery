import { PythonInterface } from 'reactopya';
import React, { Component } from 'react';
import ElectrodeGeometryWidget from './ElectrodeGeometryWidget';

export default class ElectrodeGeometry extends Component {
    static title = 'Electrode geometry'
    constructor(props) {
        super(props);
        this.state = {
            path: 'sha1dir://0ba09f6658e767d4e70055773805a8d939a9a4c6.paired_mea64c/20160415_patch2/geom.csv',
            download_from: 'spikeforest.public',
            status: '',
            status_message: '',
            locations: null,
            labels: null
        }
    }
    componentDidMount() {
        this.pythonInterface = new PythonInterface(this, require('./ElectrodeGeometry.json'));
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
        const { locations, labels } = this.state;
        return (
            <RespectStatus {...this.state}>
                <ElectrodeGeometryWidget
                    locations={locations}
                    labels={labels}
                />
            </RespectStatus>
        )
    }
}

class RespectStatus extends Component {
    state = {  }
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