import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ImageMapper from "react-image-mapper";
import redIcon from "../images/pin icons-04.png";
import blueIcon from '../images/walkingman-01.png';
import nine from '../images/nine.png';
import eight from '../images/eightSmall.png';
import QA from '../components/QA';

import {
    ninefloormap,
    eightfloormap,
    getClickedArea,
    resetPins,
    resetClickedArea,
    formActive,
    eventFire
} from "../api/staff_api_functions";


class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFloor: false,
            showQA: false,
            activeCell: '',
        };
        this.toggleFloor = this.toggleFloor.bind(this);
        this.clicked = this.clicked.bind(this);
        this.toggleQA = this.toggleQA.bind(this);
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    clicked(area) {
        // console.log(area._id);
        this.props.resetClickedArea(area._id);
        this.props.getClickedArea(area._id);

    }

    toggleFloor(event) {
        event.preventDefault();
        this.setState({showQA: false});
        resetPins();
        this.setState({isFloor: !this.state.isFloor});
    }

    toggleQA(event) {
        event.preventDefault();
        this.setState({showQA: !this.state.showQA});
        if (formActive()) {
            eventFire(document.getElementById('hideSearchForm'), 'click');
        }
        // console.log(this.state.showQA);
    }

    render() {
        return (
            <div>
                <div className='toolbar'>
                    <img
                        src={require('../images/ICONS-03.png')}
                        className="toolbox"
                    />
                    <img
                        src={require('../images/qa-icon.png')}
                        id='toggleQA'
                        onClick={this.toggleQA}
                        className="toggle__QA"
                    />
                    <img
                        src={require('../images/toggle-stairs.png')}
                        onClick={this.toggleFloor}
                        className="toggle__floor"
                        id="floorToggler"
                    />
                </div>
                <div className="map-container">
                    <img className='compass'
                        src={require('../images/compass.png')}
                    />
                    {!(this.state.showQA) && (
                        <div>
                            <img className='pin' src={redIcon} id="redIcon"/>
                            <img className='pin' src={blueIcon} id="blueIcon"/>
                            {!(this.state.isFloor) && (
                                <div className="image--mapper">
                                    <ImageMapper src={nine} map={ninefloormap}
                                                 onClick={this.clicked}/>
                                </div>
                            )}

                            {(this.state.isFloor) && (
                                <div>
                                    <div>

                                        <ImageMapper src={eight} map={eightfloormap}
                                                     onClick={this.clicked}/>
                                    </div>
                                </div>
                            )}

                        </div>
                    )}
                    {(this.state.showQA) && (
                        <div>
                            <QA/>
                            <img className='pin' src={redIcon} id="redIcon"/>
                            <img className='pin' src={blueIcon} id="blueIcon"/>
                        </div>
                    )}
                </div>
            </div>

        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getClickedArea, resetClickedArea}, dispatch);
}

export default connect(null, mapDispatchToProps)(Map);