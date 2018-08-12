import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Suggestions from "../components/Suggestions";
import {fetchObject, fetchObject2, resetPins,
    resetSearchArray} from "../api/staff_api_functions";
import swal from "sweetalert";

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            destination: '',
            origin: '',
            showDirectionSearch: false,
            hideSearchForm: false
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onInputChange2 = this.onInputChange.bind(this);

        this.getSuggestionInput = this.getSuggestionInput.bind(this);
        this.getSuggestionInput2 = this.getSuggestionInput2.bind(this);

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onFormSubmit2 = this.onFormSubmit2.bind(this);

        this.hideSearch = this.hideSearch.bind(this);
        this.showSearch = this.showSearch.bind(this);

    }

    onInputChange(event) {
        // console.log(event.target.value);
        // console.log("input change 1");
        this.setState({destination: event.target.value});
    }


    onInputChange2(event) {
        // console.log(event.target.value);
        this.setState({origin: event.target.value});
    }

    onFormSubmit(event) {
        event.preventDefault();
        resetPins();
        this.props.resetSearchArray();
        this.setState({showDirectionSearch: true});
        var result = this.props.fetchObject(this.state.destination);
        if(result.payload.location === ""){
            swal("Location Error","Person/Room is not yet in the system","warning");
        }
        this.setState({destination: ''});
        //console.log(person);

    }

    onFormSubmit2(event) {
        event.preventDefault();
        resetPins()
        this.props.resetSearchArray();
        this.setState({showDirectionSearch: true});

        //if both inserts are empty, we do nothing
        if ((this.state.origin === '') && (this.state.destination === '')) {
            return
        }
        //if origin is empty, we pass in an empty string
        else if ((this.state.origin === '') && (this.state.destination !== '')) {
            this.props.fetchObject2('EMPTY');
            this.props.fetchObject2(this.state.destination);
        }
        //if destination is empty, we pass in an empty string
        else if ((this.state.origin !== '') && (this.state.destination === '')) {
            this.props.fetchObject2(this.state.origin);
            this.props.fetchObject2('EMPTY');
        }
        else {
            this.props.fetchObject2(this.state.origin);
            this.props.fetchObject2(this.state.destination);
        }

    }

    getSuggestionInput(value) {
        // console.log(value);
        this.setState({destination: value})
    }

    getSuggestionInput2(value) {
        // console.log(value);
        this.setState({origin: value})
    }

    hideSearch(event) {
        event.preventDefault();
        this.setState({hideSearchForm: true});
        // console.log("hideSearch function called ");
    }

    showSearch(event) {
        event.preventDefault();
        this.setState({hideSearchForm: false});
        // console.log("hideSearch function called ");
    }


    render() {

        const origin = "Enter Origin";
        const destination = "Enter Destination";

        return (
            <div>
                <div className="open--tab--container">
                    {(this.state.hideSearchForm) && (
                        <img src={require('../images/arrowdown-01.png')} className="form__show__thumbnail"
                             id="showSearchForm" onClick={this.showSearch}/>
                    )}
                </div>
                <div className="form--container">
                    {!(this.state.hideSearchForm) && (
                        <div className="form" style={{"zIndex": "100"}}>
                            {!(this.state.showDirectionSearch) && (
                                <form onSubmit={this.onFormSubmit} className="locationSearch" method="GET">
                                    <table style={{'borderSpacing': "0px"}}>
                                        <tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td><img src={require('../images/nav-tab-close-white.png')}
                                                     className="form__hide__thumbnail" id="hideSearchForm"
                                                     onClick={this.hideSearch}/></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td><img src={require('../images/location-white.png')}
                                                     className="form__location__thumbnail"/></td>
                                            <td>
                                                <Suggestions alt="Submit" width="50" height="50"
                                                             className="form-control" placeholder="Get Location"
                                                             value={this.state.destination}
                                                             onChange={this.onInputChange}
                                                             getInputData={this.getSuggestionInput}
                                                             inputPlaceholder={destination}
                                                />

                                                {/*<Suggestions />*/}
                                            </td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>
                <span className="input-group-btn">
                  {/*<button type="submit" className="btn btn-secondary">*/}
                    <img src={require('../images/directions-white.jpg')} style={{'height': "50px", 'width': '50px'}}
                         onClick={this.onFormSubmit}/>
                    {/*</button>*/}
                </span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </form>)}


                            {(this.state.showDirectionSearch) && (
                                <form onSubmit={this.onFormSubmit2} id="locationSearch" method="GET">
                                    <table>
                                        <tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td><img src={require('../images/nav-tab-close-white.png')}
                                                     className="form__hide__thumbnail" id="hideSearchForm"
                                                     onClick={this.hideSearch}/></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td><img src={require('../images/icon-circle.png')}
                                                     className="form__location-circle__thumbnail"/></td>
                                            <td>
                                                <Suggestions alt="Submit" width="50" height="50"
                                                             className="form-control" placeholder="Enter Origin"
                                                             value={this.state.origin}
                                                             onChange={this.onInputChange2}
                                                             getInputData={this.getSuggestionInput2}
                                                             inputPlaceholder={origin}
                                                />
                                            </td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td><img src={require('../images/dots-white.png')}
                                                     className="form__location-circle__thumbnail"/></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td><img src={require('../images/location-white.png')}
                                                     className="form__location__thumbnail"/></td>
                                            <td>
                                                <Suggestions alt="Submit" width="50" height="50"
                                                             className="form-control" placeholder="Enter Destination"
                                                             value={this.state.destination}
                                                             onChange={this.onInputChange}
                                                             getInputData={this.getSuggestionInput}
                                                             inputPlaceholder={destination}
                                                             destinationFill={this.state.destination}
                                                />
                                            </td>
                                            <td>
                  <span className="input-group-btn">
                    <img src={require('../images/directions-white.jpg')} style={{'height': "50px", 'width': '50px'}}
                         onClick={this.onFormSubmit2}/>
                  </span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </form>
                            )}
                        </div>)}
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchObject, fetchObject2, resetSearchArray}, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);