import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import VolumeUp from '@material-ui/icons/VolumeUp';

export default class InputSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue
        }
    }

    _setValue = (val) => {
        if (val != this.state.value) {
            this.setState({value: val});
            this.props.onChange && this.props.onChange(val);
        }
    }

    handleSliderChange = (event, newValue) => {
        this._setValue(newValue);
    };

    handleInputChange = event => {
        this._setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    handleBlur = () => {
        if (this.state.value < min) {
            this._setValue(min);
        } else if (this.state.value > max) {
            this._setValue(max);
        }
    };
    
    render() {
        const { label, min, max, step } = this.props;
        const { value } = this.state;

        // const classes = useStyles();
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
                            value={value}
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
