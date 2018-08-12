import React, {Component} from 'react'
import Modal from 'react-modal'
import {connect} from 'react-redux'
import xIcon from '../images/close-x.png';
import {
    resetClickedArea,
    formActive,
    getAllByLocation,
    getRoomCapacity,
} from "../api/staff_api_functions";
import {bindActionCreators} from 'redux';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        backgroundColor: '#548dca',
        opacity: '0.8',
        padding: '5px 10px 15px 10px',
        boxShadow: '3px 5px 6px #ccc',
        borderRadius: '5px',
        fontFamily: 'Avenir',
        color: '#f5f6f7',
        textAlign: 'center'
    }
};

Modal.setAppElement(document.getElementById('root'));

class AreaModal extends Component {

    eventFire(el, etype) {
        if (el.fireEvent) {
            el.fireEvent('on' + etype);
        } else {
            var evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
        }
    }

    constructor() {
        super();

        this.state = {
            modalIsOpen: true
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});

    }


    afterOpenModal() {
        // references are now sync'd and can be accessed.

        const formShowing = formActive();

        if (formShowing) {
            this.eventFire(document.getElementById('hideSearchForm'), 'click');
            if ((this.props.cell.charAt(0) !== '9') && (this.props.cell.charAt(0) !== '8')) {
                // console.log("THIS IS A ROOM WE NEED WONT POPULATE PEOPLE");
                //populate row with information about the conference room
            }
            else {
                // console.log("THIS IS A OPEN DESK LOCATION... POPULATE THE PEOPLE WHO SIT THERE");

            }
        }
        else {
            if ((this.props.cell.charAt(0) !== '9') && (this.props.cell.charAt(0) !== '8')) {
                // console.log("THIS IS A ROOM WE NEED WONT POPULATE PEOPLE");
                //populate row with information about the conference room
            }
            else {
                // console.log("THIS IS A OPEN DESK LOCATION... POPULATE THE PEOPLE WHO SIT THERE");

            }
        }


    }

    closeModal() {
        this.setState({modalIsOpen: false});
        this.props.resetClickedArea();

        const formShowing = formActive();

        if (formShowing) {
            this.setState({modalIsOpen: true});
        }
        else {
            // this.eventFire(document.getElementById('showSearchForm'), 'click');
            this.setState({modalIsOpen: true});
        }

    }

    renderInformation(object) {
        // console.log(getRoomCapacity("Bryant"));
        console.log(object);
        // var noarry = extendJson();
        // console.log(noarry);
        return (
            <div key={object}>
                {object}
            </div>
        );
    }

    renderInformation2(object) {
        // console.log(getRoomCapacity("Bryant"));
        //object[0] floor
        //object[1] capacity

        if (Number.isInteger(object[0])) {
            return (
                <div key={object}>
                    <h3>Floor: {object[0]}</h3>
                    <h3>Capacity: {object[1]}</h3>

                </div>
            );
        }
        else {
            return (<p></p>)
        }
    }

    render() {
        if (this.props.cell !== '') {
            return (
                <div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        closeTimeoutMS={300}
                        contentLabel="Example Modal">

                        <img
                            className='exit'
                            src={xIcon}
                            onClick={this.closeModal}
                        />

                        <h2 ref={subtitle => this.subtitle = subtitle}>{this.props.cell}</h2>
                        <div className="informationTable">
                            {getAllByLocation(this.props.cell).map(this.renderInformation)}
                            {this.renderInformation2(getRoomCapacity(this.props.cell))}
                        </div>
                    </Modal>
                </div>

            )
        }
        else {
            return (<p></p>)
        }
        ;
    }

}

function mapStateToProps(state) {
    return {cell: state.cell}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({resetClickedArea}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaModal);

