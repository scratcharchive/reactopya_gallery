import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { isNumber } from 'util';
import { TableBody, TableRow, TableCell, Table, Grid } from '@material-ui/core';

export default class InputSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textValue: props.value
        }
    }

    componentDidMount() {
        this.setState({
            textValue: this.props.value
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.value != prevProps.value) {
            this.setState({
                textValue: this.props.value
            });
        }
    }

    _setValue = (val) => {
        const { min, max, value } = this.props;

        if (!isNumber(val)) return;

        if (val < min) {
            val = min;
        } else if (val > max) {
            val = max;
        }

        if (val != value) {
            this.props.onChange && this.props.onChange(val);
        }
    }

    handleSliderChange = (event, newValue) => {
        this._setValue(newValue);
    };

    handleInputChange = event => {
        const { min, max } = this.props;

        let val = event.target.value;
        this.setState({ textValue: val });
        if (val === '') return;
        if (isNaN(val)) return;

        val = +val;
        if ((min <= val) && (val <= max)) {
            this._setValue(val);
        }
    };

    // handleBlur = () => {
    //     const { min, max, value } = this.props;
    //     if (value < min) {
    //         this._setValue(min);
    //     } else if (value > max) {
    //         this._setValue(max);
    //     }
    // };

    render() {
        const { label, min, max, step, value } = this.props;
        const { textValue } = this.state;

        const rootStyle = {width: 250};
        const inputStyle = {width: 42}

        return (
            <div style={rootStyle}>
                <Typography id="input-slider" gutterBottom>
                    {label}
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    {/* <Grid item>
                        <VolumeUp />
                    </Grid> */}
                    <Grid item xs>
                        <Slider
                            min={min}
                            max={max}
                            step={step}
                            value={typeof value === 'number' ? value : 0}
                            onChange={this.handleSliderChange}
                            aria-labelledby="input-slider"
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            style={inputStyle}
                            value={textValue}
                            margin="dense"
                            onChange={this.handleInputChange}
                            onBlur={this.handleBlur}
                            inputProps={{
                                step: step,
                                min: min,
                                max: max,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}
