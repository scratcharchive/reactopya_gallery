import React, { Component } from 'react';
import * as Examples from '../../reactopy_gallery';
import { Paper, Container } from "@material-ui/core";

export default class MainWindow extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <Container>
                    {
                        Object.values(Examples).map((Example) => (
                            <Paper key={Example.title}>
                                <hr />
                                <h2>{Example.title}</h2>
                                <hr />
                                <Example gallery={true} />
                            </Paper>
                        ))
                    }
                </Container>
            </div>
        );
    }
}
