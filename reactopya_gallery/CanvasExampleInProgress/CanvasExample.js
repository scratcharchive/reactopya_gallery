import { PythonInterface } from 'reactopya';
import React, { Component } from 'react';
import CanvasWidget from './CanvasWidget';

export default class CanvasExample extends Component {
    static title = 'Dust fight'
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        this.pythonInterface = new PythonInterface(this, require('./CanvasExample.json'));
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
            <CanvasWidget/>
        )
    }
}
