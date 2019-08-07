import React, { Component } from 'react';
import { CanvasPainter, MouseHandler } from "../common/CanvasPainter";

class PieceOfDust {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
    x() {
        return this._x;
    }
    y() {
        return this._y;
    }
    paint(painter) {
        painter.fillRect(this.x()-3, this.y()-3, 6, 6, 'gray');
    }
}

class Kooble {
    constructor(x, y, color, orientX, orientY, velocity) {
        this._x = x;
        this._y = y;
        this._orientX = orientX;
        this._orientY = orientY;
        this._color = color;
        this._velocity = velocity;
    }
    x() {
        return this._x;
    }
    y() {
        return this._y;
    }
    orientX() {
        return this._orientX;
    }
    orientY() {
        return this._orientY;
    }
    color() {
        return this._color;
    }
    velocity() {
        return this._velocity;
    }
    paint(painter) {
        let r = 16;
        painter.fillEllipse([this.x() + this.orientX()*r -r/2, this.y() + this.orientY()*r -r/2, r, r], 'black');
        painter.fillEllipse([this.x() -r, this.y()-r, 2*r, 2*r], this.color());
    }
    evolve(elapsed) {
        let dx = (elapsed/1000) * this.velocity() * this.orientX();
        let dy = (elapsed/1000) * this.velocity() * this.orientY();
        this._x += dx;
        this._y += dy;
        if ((this._y > 600) && (this._y + this._orientY * 3000000 > 600)) {
            this._orientX *= -1;
            this._orientY *= -1;
            this._velocity *= 1;
        }
        if ((this._y < 0) && (this._y + this._orientY * 3000000 < 0)) {
            this._orientX *= -1;
            this._orientY *= -1;
            this._velocity *= 1;
        }
    }
}

function initDustPieces(opts) {
    const { width, height, spawn_zone_height } = opts;
    let ret = [];
    let num = 1000;
    for (let i = 0; i < num; i++) {
        let x = Math.random()*width;
        let y = spawn_zone_height + Math.random()*(height - 2*spawn_zone_height);
        ret.push(new PieceOfDust(x, y));
    }
    return ret;
}

function initKoobles(opts) {
    const { width, height, spawn_zone_height } = opts;
    let ret = [];
    {
        let num = 4;
        for (let i = 0; i < num; i++) {
            let x = Math.random()*width;
            let y = spawn_zone_height / 2;
            ret.push(new Kooble(x, y, 'red', 0, 1, 100));
        }
    }
    {
        let num = 4;
        for (let i = 0; i < num; i++) {
            let x = Math.random()*width;
            let y = spawn_zone_height / 2;
            ret.push(new Kooble(x, height - y, 'blue', 0, -1, 100));
        }
    }
    return ret;
}

class CanvasWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trigger: 0
        };

        this.timer = new Date();

        this.opts = {
            width: 800,
            height: 600,
            spawn_zone_height: 100
        };
        this.canvasRef = React.createRef();
        this.mouseHandler = new MouseHandler();

        this.mouseHandler.onMousePress(this.handleMousePress);
        this.mouseHandler.onMouseRelease(this.handleMouseRelease);
        this.mouseHandler.onMouseMove(this.handleMouseMove);

        this.dust_pieces = initDustPieces(this.opts);
        this.koobles = initKoobles(this.opts);

        this.unmounted = false;
    }

    componentDidMount() {
        this.repaint();
        this.startIterating();
    }

    componentDidUpdate() {
        this.repaint()
    }
    
    componentWillUnmount() {
        this.unmounted = true;
    }

    startIterating() {
        this.doIterate();
        if (this.unmounted) return;
        setTimeout(() => {
            this.startIterating();
        },1);
    }

    doIterate() {
        this.setState({trigger: this.state.trigger + 1});
    }

    repaint = () => {
        const { width, height, spawn_zone_height } = this.opts;
        const canvas = this.canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        this.mouseHandler.setElement(canvas);

        let painter = new CanvasPainter(ctx);
        let W = width;
        let H = height;

        painter.clearRect(0, 0, W, H);
        painter.setPen({color: 'black', width: 4});
        painter.drawRect(0, 0, W, H);

        // spawn zone lines
        painter.setPen({color: 'red', width: 4});
        painter.drawLine(0, spawn_zone_height, W, spawn_zone_height);
        painter.setPen({color: 'blue', width: 4});
        painter.drawLine(0, H - spawn_zone_height, W, H - spawn_zone_height);

        let elapsed = (new Date() - this.timer);
        this._evolve_koobles(elapsed);
        this.timer = new Date();

        this._draw_dust(painter);
        this._draw_koobles(painter);
    }

    handleMousePress = (X) => {
    }

    handleMouseRelease = (X) => {
    }

    handleMouseMove = (X) => {
    }

    _draw_dust(painter) {
        this.dust_pieces.forEach((dp) => {dp.paint(painter);});
    }

    _draw_koobles(painter) {
        this.koobles.forEach((kk) => {kk.paint(painter);});
    }

    _evolve_koobles(elapsed) {
        this.koobles.forEach((kk) => {kk.evolve(elapsed);});
    }

    render() {
        const { width, height, spawn_zone_height } = this.opts;

        // We'll need to think of a better way to do this
        setTimeout(this.repaint, 100);

        let canvas = <canvas
            ref={this.canvasRef}
            width={width}
            height={height}
            onMouseDown={this.mouseHandler.mouseDown}
            onMouseUp={this.mouseHandler.mouseUp}
            onMouseMove={this.mouseHandler.mouseMove}
        />

        return canvas;
    }
}
 
export default CanvasWidget;