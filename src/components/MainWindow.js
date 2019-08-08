import React, { Component } from 'react';
import * as Examples from '../../reactopya_gallery';
import { Paper, Container, Grid } from "@material-ui/core";

class LazyLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasBeenVisible: false
        };
        this.unmounted = false;
    }

    async componentDidMount() {
        this.startChecking();
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    componentDidUpdate(prevProps, prevState) {
    }

    startChecking() {
        this.doCheck();
        if (this.state.hasBeenVisible) return;
        if (this.unmounted) return;
        setTimeout(() => {
            this.startChecking();
        },1000);
    }

    doCheck() {
        if (this.state.hasBeenVisible) return;
        if (this.isInViewport(this.container)) {
            this.setState({hasBeenVisible: true});
        }
    }

    isInViewport(elem) {
        var bounding = elem.getBoundingClientRect();
        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    render() {
        if (!this.state.hasBeenVisible) {
            return (
                <div className="lazyloader" ref={el => (this.container = el)}></div>
            )
        }
        else {
            return this.props.children;
        }
    }
}

export default class MainWindow extends Component {
    state = {}
    render() {
        return (
            <div style={{overflowX: 'hidden', margin: 10, padding: 20, background: 'lightblue'}}>
                <Grid container style={{}}>
                    {
                        Object.values(Examples).map((Example) => (
                            <Grid key={Example.title} item xs={12} md={6} xl={4}>
                                <Paper style={{padding: 20, margin: 10, minHeight: 800}}>
                                    <hr />
                                    <h2>{Example.title}</h2>
                                    <hr />
                                    <LazyLoader>
                                        <Example {...((Example.reactopyaConfig||{}).galleryProps||{})} />
                                    </LazyLoader>
                                </Paper>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        );
    }
}
