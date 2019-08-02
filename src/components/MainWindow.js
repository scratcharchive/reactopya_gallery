import React, { Component } from 'react';
import * as Examples from '../../reactopya_gallery';
import { Paper, Container, Grid } from "@material-ui/core";
import LazyLoad from 'react-lazyload';

export default class MainWindow extends Component {
    state = {}
    render() {
        return (
            <div>
                <Grid container spacing={3} style={{padding:10}}>
                    {
                        Object.values(Examples).map((Example) => (
                            <Grid key={Example.title} item xs={12} xl={6}>
                                <Paper>
                                    <hr />
                                    <h2>{Example.title}</h2>
                                    <hr />
                                    <LazyLoad height={500} once overflow={true}>
                                        <Example gallery={true} />
                                    </LazyLoad>
                                </Paper>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        );
    }
}
