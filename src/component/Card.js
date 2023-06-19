import React, { useRef } from "react";
import styles from '../index.css';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            index: this.props.index,
            data: this.props.data,
            hasFocus: false,
            position: {},
            height: 0,
            offset: 0
        }
    }

    componentDidMount() {
        if (this.ref.current) {
            this.setState({
                top: this.ref.current.getBoundingClientRect().top,
                bottom: this.ref.current.getBoundingClientRect().bottom,
                height: this.ref.current.getBoundingClientRect().height
            });
            this.ref.current.addEventListener("mouseenter", this.handleMouseEnter);
        }
        window.addEventListener("mousemove", this.handleMouseMove);
        window.addEventListener("mouseup", this.handleMouseUp);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        
    }

    handleMouseDown = (event) => {
        const target = event.target.closest('div');
        const payload = {
            index: this.state.index,
            position: {
                xCoord: event.pageX, 
                yCoord: event.pageY
            }
        };
        this.props.report(event, payload);
        this.setState({
            hasFocus: true,
            anchor: {
                left: this.state.left,
                top: this.state.top,
                xCoord: event.pageX,
                yCoord: event.pageY
            },
            position: {
                xCoord: event.pageX, 
                yCoord: event.pageY
            }
        });

        const log = `card ${this.state.index} got clicked at exactly ${event.pageX} ${event.pageY}`;
        console.log(log);
    }

    handleMouseEnter = (event) => {
        try {
            if (this.props.data.isMoving) {
                console.log("card ", this.state.index, "entered from ", this.props.data.direction.dirY);
                const nOffset = (this.state.offset + this.state.height * this.props.data.direction.dirY);
                this.setState({
                    index: this.state.index + this.props.data.direction.dirY,
                    offset: nOffset
                });
            }
        }
        catch (error) {
            console.log("data not set: ", error);
        }
    }

    handleMouseMove = (event) => {
        if (this.state.hasFocus) {
            let dx = this.state.position.xCoord - event.pageX;
            let dy = this.state.position.yCoord - event.pageY;
            let dirX = (dx == 0 ? 0 : dx / Math.abs(dx));
            let dirY = (dy == 0 ? 0 : dy / Math.abs(dy));

            let distX = event.pageX - this.state.anchor.left;
            let distY = event.pageY - this.state.anchor.top;
            
            let index = Math.floor(distY / this.state.height) + this.state.index;
            const payload = {
                direction: {
                    dirX: dirX,
                    dirY: dirY
                },
                position: {
                    xCoord: event.pageX,
                    yCoord: event.pageY
                },
                targetIndex: this.state.index,
                runningIndex: (index < 0 ? 0 : index)
            }
            this.props.report(event, payload);

            let nOffset = Math.floor(distY / this.state.height) * this.state.height;
            this.setState({
                position: {
                    xCoord: event.pageX,
                    yCoord: event.pageY
                },
                offset: nOffset
            });
        }
    }

    handleMouseUp = (event) => {
        if (this.state.hasFocus) {
            const nIndex = this.props.data.runningIndex;
            const oIndex = this.state.index;
            this.setState({
                hasFocus: false,
                index: (nIndex < 0 ? this.state.index : nIndex)
            });
            this.props.report(event);
            console.log(event.target.className, oIndex, "mouseup... new index: ", (nIndex < 0 ? this.state.index : nIndex));
        }
    }

    render() {
        let cardStyle = {
            transform: `translateY(${this.state.offset}px)`
        };

        return (
            <div ref={this.ref} className="card" style={cardStyle} onMouseDown={this.handleMouseDown}>
              <p className="card_item">{this.props.content}</p>
            </div>
        );
    }
}

export default Card;