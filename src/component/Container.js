import ReactDOM from 'react-dom';
import React from "react";
import Card from "./Card";

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canPortal: false,
            isMoving: false,
            target: null,
            data: null,
            cards: []
        };

        // bindings
        this.handleMNotification = this.handleMNotification.bind(this);
    }

    handleMNotification(event, payload) {
        if (event.type === "mousedown") {
            
            console.log("here", event.target.firstChild.innerHTML);
            this.setState({
                target: event.target,
                targetIndex: payload.index,
                targetAnchor: event.target.getBoundingClientRect().top,
                runningIndex: payload.index,
                position: {
                    xCoord: payload.position.xCoord,
                    yCoord: payload.position.yCoord
                }
            });

            document.addEventListener("mousemove", (e) => {
                let distY = event.pageY - event.target.getBoundingClientRect().top;
                let cardStyle = {
                    position: "absolute",
                    top: event.target.getBoundingClientRect().top + distY,
                    left: event.target.getBoundingClientRect().left
                }
                let card = 
                    <div className="card" style={cardStyle}>
                        <p className="card_item">replacement</p>
                    </div>

                this.setState({
                })
            })

            document.addEventListener("mouseup", () => {
                this.setState({
                    canPortal: false,
                    data: {
                        isMoving: false,
                        targetIndex: -1,
                        runningIndex: this.state.data.runningIndex,
                        position: {},
                        direction: 0
                    }
                });
                this.state.target.style.visibility = "visible";
            })
        }
        else if (event.type === "mousemove") {
            this.setState({
                data: {
                    isMoving: true,
                    targetIndex: payload.targetIndex,
                    runningIndex: payload.runningIndex,
                    position: payload.position,
                    direction: payload.direction
                }
            })
        }
    }

    createCard(data) {
        const element = 
            <Card
            content={this.state.target.firstChild.innerHTML}
            report={this.handleMNotification}
            index={this.state.runningIndex}
            data={this.state.data}
            />
    }

    render() {
        let portal;
        if (this.state.target) {
            portal = ReactDOM.createPortal(this.state.transcientTarget, document.body);
        }
        
        return (
            <div id="container">
              <Card
              content="This is a React list item"
              report={this.handleMNotification}
              index={0}
              data={this.state.data}
              />

              <Card
              content="This is another React list item"
              report={this.handleMNotification}
              index={1}
              data={this.state.data}
              />

              <Card
              content="This is yet another React list item"
              report={this.handleMNotification}
              index={2}
              data={this.state.data}
              />

            <Card
              content="This is (you guessed it) a React list item"
              report={this.handleMNotification}
              index={3}
              data={this.state.data}
              />

            <Card
              content="This is not a React list item (no, wait... it is)"
              report={this.handleMNotification}
              index={4}
              data={this.state.data}
              />

            <Card
              content="Enouhg with the React lists... I'm bored"
              report={this.handleMNotification}
              index={5}
              data={this.state.data}
              />

            <Card
              content="What do you mean?! You can never get enought React"
              report={this.handleMNotification}
              index={6}
              data={this.state.data}
              />

            <Card
              content="Hey, what about Angular?! Oh nvm :/}"
              report={this.handleMNotification}
              index={7}
              data={this.state.data}
              />

              {this.state.canPortal && portal}

            </div>
        );
    }
}

export default Container;