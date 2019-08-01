import React, { Component } from 'react';
import { PlotlyExample } from '../../reactopy_gallery';
import { Paper, Container } from "@material-ui/core";

export default class MainWindow extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <Container>
                    <Paper>
                        <h3>Plotly example</h3>
                        <PlotlyExample />
                    </Paper>
                </Container>
            </div>
        );
    }
}
