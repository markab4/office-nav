import React, {Component} from 'react';
import swal from 'sweetalert';
import {connect} from 'react-redux';
import {getMapInfoByID,findAreaCenter,nineFloorActive, nineFloorDestination,
  handleHighlightTwo, handleFloorSwap, movePin, getStairwayNine, getStairwayEight} from "../api/staff_api_functions";

class PinDropper extends Component{

  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
    };
  }
  //toggle click event
   eventFire(el, etype){
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      var evObj = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }

  highlightLocation(location){
    //FIX BUG FOR ROOMS. 9TH FLOOR AND MORGAN TOGGLES THE MAP SWITCH FUNCTION
    //THIS IS BECAUSE I CHECK FOR THE FIRST CHARACTER OF THE STRING.

    // console.log("highlight location with 1 parameter");


    const areaDetails = getMapInfoByID(location);
    // console.log(areaDetails);
    if(areaDetails === null){
        swal("Location Error","Person/Room is not yet in the system","warning");
        return
    }
    const areaCenter = findAreaCenter(areaDetails.shape, areaDetails.coords);

    const isNineFloor = nineFloorActive();
    const isNineFloorDestination = nineFloorDestination(areaDetails._id);

    if(isNineFloor && isNineFloorDestination){
        movePin("red", areaCenter);
    }
    else if(!isNineFloor && isNineFloorDestination){
        this.eventFire(document.getElementById('floorToggler'), 'click');
        movePin("red", areaCenter);
    }
    else if(isNineFloor && !isNineFloorDestination){
        this.eventFire(document.getElementById('floorToggler'), 'click');
        movePin("red", areaCenter);
    }
    else if(!isNineFloor && !isNineFloorDestination){
        movePin("red", areaCenter);
    }
    else{
        movePin("red", areaCenter);
    }

  }

  highlightLocation2(origin, destination){

    // console.log(this.props.object[0]); // destination
    // console.log(this.props.object[1]); // origin

    //still need to handle case where destination is different floors from origin
    if(this.props.object[0] === 'EMPTY'){
      const isNineFloor = nineFloorActive();
      const isNineFloorDestination = nineFloorDestination(this.props.object[1].location);
      handleFloorSwap(isNineFloor, isNineFloorDestination);
      handleHighlightTwo(this.props.object[1], this.props.object[0]);
    }
    else if(this.props.object[1] === 'EMPTY'){
      const isNineFloor = nineFloorActive();
      const isNineFloorDestination = nineFloorDestination(this.props.object[0].location);
      handleFloorSwap(isNineFloor, isNineFloorDestination);
      handleHighlightTwo(this.props.object[1], this.props.object[0]);
    }
    else{
      const isNineFloorOrigin = nineFloorDestination(this.props.object[1].location);
      const isNineFloorDestination = nineFloorDestination(this.props.object[0].location);
      const isNineFloor = nineFloorActive();

      if(isNineFloor && isNineFloorDestination && !isNineFloorOrigin){
        // console.log("toggle to the 8th floor");
        // console.log("map origin to 8th floor stairs");
        this.eventFire(document.getElementById('floorToggler'), 'click');
        handleHighlightTwo(this.props.object[1], getStairwayEight());
        swal("Head to the stairs!","Your destination is on the 9th floor","warning");


      }
      else if(isNineFloor && isNineFloorDestination && isNineFloorOrigin){
        // console.log("just do the regular mapping");
        handleHighlightTwo(this.props.object[1], this.props.object[0]);
      }
      else if(isNineFloor && !isNineFloorDestination && isNineFloorOrigin){
        // console.log("map origin to the 9th floor stairs");
        handleHighlightTwo(this.props.object[1], getStairwayNine());
        swal("Head to the stairs","Your destination is on the 8th floor","warning");

      }
      else if(isNineFloor && !isNineFloorDestination && !isNineFloorOrigin){
        // console.log("toggle to the 8th floor");
        // console.log("now do regular mapping");
        this.eventFire(document.getElementById('floorToggler'), 'click');
        handleHighlightTwo(this.props.object[1], this.props.object[0]);

      }
      else if(!isNineFloor && isNineFloorDestination && !isNineFloorOrigin){
        // console.log("map origin to the 8th floor stairs");
        handleHighlightTwo(this.props.object[1], getStairwayEight());
        swal("Head to the stairs","Your destination is on the 9th floor","warning");

      }
      else if(!isNineFloor && isNineFloorDestination && isNineFloorOrigin){
        // console.log("toggle map to 9th floor");
        // console.log("just do the regular mapping");
        this.eventFire(document.getElementById('floorToggler'), 'click');
        handleHighlightTwo(this.props.object[1], this.props.object[0]);

      }
      else if(!isNineFloor && !isNineFloorDestination && isNineFloorOrigin){
        // console.log("toggle map to 9th floor");
        // console.log("map origin to the 9th floor stairs");
        this.eventFire(document.getElementById('floorToggler'), 'click');
        handleHighlightTwo(this.props.object[1], getStairwayNine());
        swal("Head to the stairs","Your destination is on the 8th floor","warning");


      }
      else if(!isNineFloor && !isNineFloorDestination && !isNineFloorOrigin){
        // console.log("now do regular mapping");
        handleHighlightTwo(this.props.object[1], this.props.object[0]);

      }
      else{
        // console.log("do regular mapping");
        handleHighlightTwo(this.props.object[1], this.props.object[0]);
      }

    }


  }

  render(){
    //render just red pin
    //render just blue pin
    //render both....
    // console.log("PROP FROM PINDROPPER: ",this.props);
      if((this.props.object[0]) && (this.props.object[1])){
          return(
           <div>
          {this.highlightLocation2(this.props.object[0], this.props.object[1])}
           </div>
          )
      }

    else if(this.props.object[0]) {
        // console.log("location search 0");
        // console.log(this.props.object);
          return (
              <div>
                  {this.highlightLocation(this.props.object[0])}
              </div>
          )
      }
    else{
      return(
        <div>
        </div>
      );
    }
  }
}

function mapStateToProps(state){
  return {object: state.object}
}

export default connect(mapStateToProps)(PinDropper);