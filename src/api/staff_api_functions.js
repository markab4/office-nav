import $ from "jquery";
import {ROOT_URL_NOARRAY,ROOT_URL_ARRAY} from "./tokens";
import swal from "sweetalert";

export const FETCH_OBJECT = 'FETCH_OBJECT';
export const FETCH_ERROR = 'FETCH_ERROR';
export const FETCH_NO_RESULT = 'FETCH_NO_RESULT';
export const FETCH_OBJECT2 = 'FETCH_OBJECT2';
export const FETCH_ERROR2 = 'FETCH_ERROR2';
export const FETCH_NO_RESULT2 = 'FETCH_NO_RESULT2';
export const GET_CLICKED_AREA = 'GET_CLICKED_AREA';
export const RESET_ARRAY_STATE = 'RESET_ARRAY_STATE';
export const RESET_CLICKED_AREA = 'RESET_CLICKED_AREA';


export function fetchJSON(){
    var jsonInfo = null;
    //need to change url to fetch from an online server
    //an online server where staff.json will be stored
    $.ajax({
        'async': false,
        'type': "GET",
        'dataType': 'JSON',
        'url': ROOT_URL_ARRAY,
        'success': function (data) {
            jsonInfo = data;
        }
    });
    return jsonInfo.fields.staffJson;
};

export function fetchJSONnoArray(){
    const people = retrieveAllPeople();
    const rooms = retrieveAllRooms();

    var result = $.extend(people, rooms);

    return result

};

export function fetchJSONnoArray2(){


    var peopleInfo = retrieveAllPeople();
    var roomInfo = retrieveAllRooms();

    var finalJSON = {peopleInfo,roomInfo};

    // console.log(fetchJSONnoArray());

    return null
};

//returns strictly the people in the json object
export function retrieveAllPeople(){
    const jsonFile = fetchJSON();
    return jsonFile.people;
};

//returns strictly the rooms in the json object (e.g Morgan, Modern)
export function retrieveAllRooms(){
    const jsonFile = fetchJSON();
    return jsonFile.rooms;
};

//returns the person obj given a name
export function findPerson(name){
    //fetching the "people" array of the json object
    const peopleJSON = retrieveAllPeople();
    //temp var for person.
    var person = null;
    //maps out each person on the array to find a match
    $.map(peopleJSON, function(obj){
       if(obj.fullName === name){
           person = obj;
           return obj;
       }
    });
    //returns null if no person is found with that name
    return person;
};

//returns the room obj given a name
export function findRoom(roomName){
    //fetching the "rooms" array of the json object
    const roomJSON = retrieveAllRooms();
    //temp var for the room
    var room = null;
    //maps out each room on the array to find a match
    $.map(roomJSON, function(obj){
       if(obj.location === roomName){
           room = obj;
           return obj;
       }
    });
    //returns null if no room with the name is found
    return room;

};

//searches in both the people array and room array for a matching obj
export function fetchObject(name){

    const person = findPerson(name);
    const room = findRoom(name);

    // console.log("Request: ", person);
    // console.log("Request: ", room);
    //cannot find a person or a room with the name given
    if((person === null) && (room === null)){
      return {
        type: FETCH_NO_RESULT,
        payload: null
      };
    }
    //person found but room isn't -- returns person
    else if((person !== null) && (room === null)){
      return {
        type: FETCH_OBJECT,
        payload: person
      };
    }
    //room found but person isn't -- returns room
    else if((room !== null) && (person === null)){
      return {
        type: FETCH_OBJECT,
        payload: room
      };
    }
    //both a room and a person is found... what do?
    else if ((room !== null) && (person !== null)){
      return {
        type: FETCH_ERROR,
        payload: null
      };
    }
    //return null in the final case
    else{
      return {
        type: FETCH_ERROR,
        payload: null
      };
    }

};
//searches in both the people array and room array for a matching obj
export function fetchObject2(name){

    if(name === "EMPTY"){
        return{
            type: FETCH_OBJECT2,
            payload: name
        }
    }

    const person = findPerson(name);
    const room = findRoom(name);

    // console.log("Request: ", person);
    // console.log("Request: ", room);
    //cannot find a person or a room with the name given
    if((person === null) && (room === null)){
        return {
            type: FETCH_NO_RESULT2,
            payload: null
        };
    }
    //person found but room isn't -- returns person
    else if((person !== null) && (room === null)){
        return {
            type: FETCH_OBJECT2,
            payload: person
        };
    }
    //room found but person isn't -- returns room
    else if((room !== null) && (person === null)){
        return {
            type: FETCH_OBJECT2,
            payload: room
        };
    }
    //both a room and a person is found... what do?
    else if ((room !== null) && (person !== null)){
        return {
            type: FETCH_ERROR2,
            payload: null
        };
    }
    //return null in the final case
    else{
        return {
            type: FETCH_ERROR2,
            payload: null
        };
    }

};

export function resetSearchArray(){
    return{
        type: RESET_ARRAY_STATE,
        payload: []
    }
}

export function getClickedArea(area){
    return {
        type: GET_CLICKED_AREA,
        payload: area
    }
}

export function resetClickedArea(){
    return {
        type: RESET_CLICKED_AREA,
        payload: ''
    }
}


//returns the location attribute of either a person or room
export function getLocation(object){

    return object.location;

};

//highlights a location on a map given the location parsed.
//TODO function since have to understand the jquery plugin...
export function highlightLocation(location){
    //using the jquery plugin
    //highlight where <area title === location/>
    //maybe implement a way to click somewhere to remove highlight?
};

export function highlightTwoLocation(location1, location2){

    highlightLocation(location1);
    //might need to change colors between location1 and origin
    //this is the skeleton implementation
    highlightLocation(location2);

    //implement a way to remove the highlight upon clicking out
};

export function findAreaCenter(shape,coords){
    var coordsArray = coords,
        center = [];
    if (shape === 'circle') {
        // For circle areas the center is given by the first two values
        center = [coordsArray[0], coordsArray[1]];
    } else {
        // For rect and poly areas we need to loop through the coordinates
        var coord, minX, maxX, minY, maxY;
        minX = maxX = parseInt(coordsArray[0], 10);
        minY = maxY = parseInt(coordsArray[1], 10);
        for (var i = 0, l = coordsArray.length; i < l; i++) {
            coord = parseInt(coordsArray[i], 10);
            if (i%2 === 0) { // Even values are X coordinates
                if (coord < minX) {
                    minX = coord;
                } else if (coord > maxX) {
                    maxX = coord;
                }
            } else { // Odd values are Y coordinates
                if (coord < minY) {
                    minY = coord;
                } else if (coord > maxY) {
                    maxY = coord;
                }
            }
        }
        center = [parseInt((minX + maxX) / 2, 10), parseInt((minY + maxY) / 2, 10)];
    }
    return center;
};


// mouseOverHighlight();
//TODO FUNCTIONS
//get location attribute from object
//highlight one location based on the object's location attribute
//highlight two location based on start and end object locations
//look into twitter bootstrap for modal overlay?
//implement write functions -- write to json
    //add new person
    //remove person
//path implementation -- when?

export function getMapInfoByID(id){
    const ninethFloorAreas = ninefloormap.areas;
    const eightFloorAreas = eightfloormap.areas;

    for(var i = 0; i < ninethFloorAreas.length; ++ i){
        if(ninethFloorAreas[i]._id === id){
            return ninethFloorAreas[i];
        }
    }

    for(var i = 0; i < eightFloorAreas.length; ++ i){
        if(eightFloorAreas[i]._id === id){
            return eightFloorAreas[i];
        }
    }
    return null;
}

export function nineFloorActive(){
    const x = document.getElementsByName("9floor");

    if (x.length === 0){
        return false
    }
    else{
        return true
    }
}

export function nineFloorDestination(destination){
    //need to check if something is in 9th floor

    const destinationObj = findRoom(destination);
    const locationFloor = destination.charAt(0);


    //this is a person
    if(destinationObj === null){
        if(locationFloor === '9'){
            return true
        }
        else{
            return false
        }
    }
    else{
        if(locationFloor === '9'){
            return true
        }
        else if((locationFloor !== '9')&&(destinationObj.floor === '9')){
            return true
        }
        else if(destinationObj.floor === '9'){
            return true
        }
        else{
            return false
        }
    }

}


export function eventFire(el, etype){
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
        } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}

export function handleFloorSwap(isNineFloor, isNineFloorDestination){

  if(isNineFloor && isNineFloorDestination){
      return
  }
  else if(!isNineFloor && isNineFloorDestination){
    eventFire(document.getElementById('floorToggler'), 'click');
    return
  }
  else if(isNineFloor && !isNineFloorDestination){
    eventFire(document.getElementById('floorToggler'), 'click');
    return
  }
  else if(!isNineFloor && !isNineFloorDestination){
    return
  }
  else{
    return
  }
}

export function resetPins(){
    let redPin = document.getElementById('redIcon');
    let bluePin = document.getElementById('blueIcon');

    redPin.style.left = "-1000px";
    bluePin.style.left = "-1000px";

}

export function movePin(color, coords){
    let icon = (color === 'red') ? document.getElementById('redIcon') : document.getElementById('blueIcon');
    let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    let top = coords[1] + 145;
    let left = coords[0] - 15;
    if (w>1202) left += (w-1202)/2;
    icon.style.top=top + "px";
    icon.style.left=left +"px";
}

export function getStairwayNine(){
    const rooms = retrieveAllRooms();

    for(var i = 0; i < rooms.length; ++i){
        if(rooms[i].location === "Stairway-9"){
            return rooms[i]
        }
    }

}

export function getStairwayEight(){
  const rooms = retrieveAllRooms();

  for(var i = 0; i < rooms.length; ++i){
    if(rooms[i].location === "Stairway-8"){
      return rooms[i]
    }
  }

}

export function handleHighlightTwo(originobj, destinationobj){
  if(originobj === "EMPTY"){
    // console.log("ORIGIN IS EMPTY: 1ST BOX EMPTY");
    const areaDetails = getMapInfoByID(destinationobj.location);
    if(areaDetails === null){
        swal("Location Error","Person/Room is not yet in the system","warning");
        return
    }
    const areaCenter = findAreaCenter(areaDetails.shape, areaDetails.coords);
    movePin("red", areaCenter);
  }
  else if (destinationobj === "EMPTY"){
    // console.log("DESTINATION IS EMPTY: 2ND BOX EMPTY");
    const areaDetails = getMapInfoByID(originobj.location);

    if(areaDetails === null){
        swal("Location Error","Person/Room is not yet in the system","warning");
        return
    }

    const areaCenter = findAreaCenter(areaDetails.shape, areaDetails.coords);
    movePin("blue", areaCenter);
  }
  else if ((destinationobj === "EMPTY")&&(originobj === "EMPTY")){
    return
  }
  else{
    // console.log("BOTH PARAMETERS FULFILLED.");
    const areaDetails = getMapInfoByID(originobj.location);
    const areaDetails2 = getMapInfoByID(destinationobj.location);

    if(areaDetails === null){
        swal("Location Error","Origin is not yet in the system","warning");
        return
    }
    else if(areaDetails2 === null){
        swal("Location Error","Destination is not yet in the system","warning");
        return
    }
    else if((areaDetails === null) && (areaDetails2 === null)){
        swal("Location Error","Location is not yet in the system","warning");
        return
    }


    const areaCenter = findAreaCenter(areaDetails.shape, areaDetails.coords);
    const areaCenter2 = findAreaCenter(areaDetails2.shape, areaDetails2.coords);
    //move pin based on if search was empty or not...

    movePin("blue", areaCenter);
    movePin("red", areaCenter2);
  }
}

export function formActive(){
    const formDocument = document.getElementById('showSearchForm');

    if(formDocument === null){
        return true
    }
    else{
        return false
    }

}

export function getAllByLocation(location){
    const peopleList = retrieveAllPeople();
    var peopleArray = [];

    if(peopleList === null || peopleList === undefined){
        return peopleArray
    }


    for(var i = 0; i < peopleList.length; ++i){
        if (peopleList[i].location === location){
            peopleArray.push(peopleList[i].fullName)
        }
    }
    return peopleArray

}

export function getRoomCapacity(location){

    const roomList = retrieveAllRooms();
    var roomDetails = [];

    for(var i = 0; i < roomList.length; ++i){
        if (roomList[i].location === location){
            roomDetails.push(Number(roomList[i].floor));
            roomDetails.push(Number(roomList[i].capacity));
        }
    }

    // console.log(roomDetails);

    return roomDetails;

}

export function extendJson(){
    const people = retrieveAllPeople();
    const rooms = retrieveAllRooms();

    var result = $.extend(people, rooms);

    // console.log(result);
    return result
}


export const ninefloormap = {
    name: '9floor',
    _id: '9floor',
    className: 'map',
    areas:[
        {_id:'9NW1',shape:'rect', coords: [168,106,3,58]},
        {_id:'9NW2',shape:'rect', coords: [3,107,119,151]},
        {_id:'9NW3',shape:'rect', coords: [3,152,119,197]},
        {_id:'9NW4',shape:'rect', coords: [3,199,119,226]},
        {_id:'9NW5',shape:'rect', coords: [3,227,119,269]},
        {_id:'9W1',shape:'rect', coords: [3,270,119,315]},
        {_id:'9W2',shape:'rect', coords: [3,316,119,360]},
        {_id:'9W3',shape:'rect', coords: [3,361,119,391]},
        {_id:'9W4',shape:'rect', coords: [3,392,119,434]},
        {_id:'9W5',shape:'rect', coords: [3,435,119,479]},
        {_id:'9SW1',shape:'rect', coords: [3,480,119,524]},
        {_id:'9SW2',shape:'rect', coords: [3,525,119,551]},
        {_id:'9SW3',shape:'rect', coords: [3,552,119,595]},
        {_id:'9SW4',shape:'rect', coords: [3,596,119,643]},
        {_id:'9SW5',shape:'rect', coords: [168,692,3,644]},
        {_id:'9NM1',shape:'rect', coords: [144,132,194,195]},
        {_id:'9NM2',shape:'rect', coords: [195,132,240,195]},
        {_id:'9NM3',shape:'rect', coords: [241,132,287,195]},
        {_id:'9NM4',shape:'rect', coords: [288,132,331,195]},
        {_id:'9NM5',shape:'rect', coords: [332,132,378,195]},
        {_id:'9NM6',shape:'rect', coords: [379,132,423,195]},
        {_id:'9NM7',shape:'rect', coords: [424,132,476,195]},
        {_id:'9NM8',shape:'rect', coords: [477,132,530,195]},
        {_id:'9NM9',shape:'rect', coords: [531,132,565,195]},
        {_id:'9NM10',shape:'rect', coords: [566,132,603,195]},
        {_id:'9NM11',shape:'rect', coords: [604,132,658,195]},
        {_id:'North Kitchen',shape:'rect', coords: [714,132,765,199]},
        {_id:'9NM12',shape:'rect', coords: [766,132,819,199]},
        {_id:'9NM13',shape:'rect', coords: [820,132,864,199]},
        {_id:'9NM14',shape:'rect', coords: [865,132,913,199]},
        {_id:'9NM15',shape:'rect', coords: [914,132,954,199]},
        {_id:'9NM16',shape:'rect', coords: [955,132,1002,199]},
        {_id:'9NM17',shape:'rect', coords: [1003,132,1055,199]},
        {_id:'9NE1',shape:'rect', coords: [1030,107,1199,58]},
        {_id:'9NE2',shape:'rect', coords: [1079,151,1199,108]},
        {_id:'9NE3',shape:'rect', coords: [1079,152,1199,199]},
        {_id:'9NE4',shape:'rect', coords: [1079,225,1199,200]},
        {_id:'9NE5',shape:'rect', coords: [1079,226,1199,269]},
        {_id:'9E1',shape:'rect', coords: [1079,270,1199,316]},
        {_id:'9E2',shape:'rect', coords: [1079,317,1199,361]},
        {_id:'9E3',shape:'rect', coords: [1079,389,1199,362]},
        {_id:'9E4',shape:'rect', coords: [1079,390,1199,434]},
        {_id:'9E5',shape:'rect', coords: [1079,435,1199,478]},
        {_id:'9SE1',shape:'rect', coords: [1079,479,1199,524]},
        {_id:'9SE2',shape:'rect', coords: [1079,525,1199,550]},
        {_id:'9SE3',shape:'rect', coords: [1079,551,1199,595]},
        {_id:'9SE4',shape:'rect', coords: [1079,596,1199,640]},
        {_id:'9SE5',shape:'rect', coords: [1085,641,1199,691]},
        {_id:'9SM1',shape:'rect', coords: [144,554,195,621]},
        {_id:'9SM2',shape:'rect', coords: [196,554,240,621]},
        {_id:'9SM3',shape:'rect', coords: [241,554,288,621]},
        {_id:'9SM4',shape:'rect', coords: [289,554,330,621]},
        {_id:'9SM5',shape:'rect', coords: [331,554,378,621]},
        {_id:'9SM6',shape:'rect', coords: [379,554,423,621]},
        {_id:'9SM7',shape:'rect', coords: [424,554,470,621]},
        {_id:'9SM8',shape:'rect', coords: [471,554,515,621]},
        {_id:'9SM9',shape:'rect', coords: [516,554,561,621]},
        {_id:'9SM10',shape:'rect', coords: [562,554,607,621]},
        {_id:'9SM11',shape:'rect', coords: [608,554,659,621]},
        {_id:'9SM12',shape:'rect', coords: [873,567,914,621]},
        {_id:'9SM13',shape:'rect', coords: [915,567,960,621]},
        {_id:'9SM14',shape:'rect', coords: [961,567,1008,621]},
        {_id:'9SM15',shape:'rect', coords: [1009,567,1055,621]},
        {_id:'Morgan',shape:'rect', coords: [181,226,235,296]},
        {_id:'Cooper',shape:'rect', coords: [236,226,289,296]},
        {_id:'New',shape:'rect', coords: [289,224,345,296]},
        {_id:'Frick',shape:'rect', coords: [345,226,399,296]},
        {_id:'Whitney',shape:'rect', coords: [400,226,454,296]},
        {_id:'Modern',shape:'rect', coords: [475,225,534,296]},
        {_id:'Guggenhiem',shape:'rect', coords: [535,225,587,296]},
        {_id:'Metropolitan',shape:'rect', coords: [588,225,648,296]},
        {_id:'Empire',shape:'rect', coords: [750,225,812,296]},
        {_id:'Rockefeller',shape:'rect', coords: [813,225,874,296]},
        {_id:'Gracie',shape:'rect', coords: [894,225,925,260]},
        {_id:'Tavern',shape:'rect', coords: [894,261,925,295]},
        {_id:'Bryant',shape:'rect', coords: [926,225,1021,295]},
        {_id:'G.W. Bridge',shape:'rect', coords: [143,325,168,359]},
        {_id:'Lincoln',shape:'rect', coords: [143,360,168,393]},
        {_id:'Holland',shape:'rect', coords: [143,394,168,425]},
        {_id:'Williamsburg',shape:'rect', coords: [1024,326,1055,359]},
        {_id:'Manhattan',shape:'rect', coords: [1024,360,1055,392]},
        {_id:'Brooklyn',shape:'rect', coords: [1024,393,1055,426]},
        {_id:'Limelight',shape:'rect', coords: [201,456,255,526]},
        {_id:'Roxy',shape:'rect', coords: [256,456,311,526]},
        {_id:'Kitchen',shape:'rect', coords: [ 366,454,422,526]},
        {_id:'South Kitchen',shape:'rect', coords: [ 751,453,876,515]},
        {_id:'Tunnel',shape:'rect', coords: [312,456,366,526]},
        {_id:'CBGB',shape:'rect', coords: [425,456,456,490]},
        {_id:'Webster',shape:'rect', coords: [425,491,456,525]},
        {_id:'Birdland',shape:'rect', coords: [474,456,534,525]},
        {_id:'Bluenote',shape:'rect', coords: [535,456,589,525]},
        {_id:'Vanguard',shape:'rect', coords: [590,464,652,525]},
        {_id:'Pan Am',shape:'rect', coords: [977,58,1029,107]},
        {_id:'Reservoir',shape:'rect', coords: [655,58,756,106]},
        {_id:'Battery',shape:'rect', coords: [672,642,759,691]},
        {_id:'Union',shape:'rect', coords: [1055,524,895,456]},
        {_id:'Bathroom-9',shape:'rect', coords: [546,316,658,433]},
        {_id:'Stairway-9',shape:'rect', coords: [755,519,876,564]},
        {_id:'Elevators-9',shape:'rect', coords: [658,313,759,439]},
        {_id:'Reception',shape:'rect', coords: [653,457,753,528]},
        {_id:'9N1',shape:'rect', coords: [459,58,514,108]},
        {_id:'9N2',shape:'rect', coords: [515,58,560,108]},
        {_id:'9N3',shape:'rect', coords: [561,58,607,108]},
        {_id:'9N4',shape:'rect', coords: [608,58,654,108]},
        {_id:'9S1',shape:'rect', coords: [458,641,515,691]},
        {_id:'9S2',shape:'rect', coords: [516,641,561,691]},
        {_id:'9S3',shape:'rect', coords: [562,641,606,691]},
        {_id:'9S4',shape:'rect', coords: [607,641,671,691]},
        {_id:'9ON1',shape:'rect', coords: [169,58,205,106]},
        {_id:'9ON2',shape:'rect', coords: [206,58,241,106]},
        {_id:'9ON3',shape:'rect', coords: [242,58,277,106]},
        {_id:'9ON4',shape:'rect', coords: [278,58,312,106]},
        {_id:'9ON5',shape:'rect', coords: [313,58,348,106]},
        {_id:'9ON6',shape:'rect', coords: [349,58,384,106]},
        {_id:'9ON7',shape:'rect', coords: [385,58,420,106]},
        {_id:'9ON8',shape:'rect', coords: [422,58,458,106]},
        {_id:'9ON9',shape:'rect', coords: [757,58,796,107]},
        {_id:'9ON10',shape:'rect', coords: [797,58,832,107]},
        {_id:'9ON11',shape:'rect', coords: [834,58,869,107]},
        {_id:'9ON12',shape:'rect', coords: [870,58,905,107]},
        {_id:'9ON13',shape:'rect', coords: [906,58,940,107]},
        {_id:'9ON14',shape:'rect', coords: [941,58,976,107]},
        {_id:'9OS1',shape:'rect', coords: [169,641,205,692]},
        {_id:'9OS2',shape:'rect', coords: [206,641,241,692]},
        {_id:'9OS3',shape:'rect', coords: [242,641,277,692]},
        {_id:'9OS4',shape:'rect', coords: [278,641,313,692]},
        {_id:'9OS5',shape:'rect', coords: [314,641,348,692]},
        {_id:'9OS6',shape:'rect', coords: [349,641,384,692]},
        {_id:'9OS7',shape:'rect', coords: [385,641,420,692]},
        {_id:'9OS8',shape:'rect', coords: [422,641,457,692]},
        {_id:'9OS9',shape:'rect', coords: [760,641,814,691]},
        {_id:'9OS10',shape:'rect', coords: [815,641,869,691]},
        {_id:'9OS11',shape:'rect', coords: [870,641,905,691]},
        {_id:'9OS12',shape:'rect', coords: [906,641,940,691]},
        {_id:'9OS13',shape:'rect', coords: [941,641,976,691]},
        {_id:'9OS14',shape:'rect', coords: [977,641,1012,691]},
        {_id:'9OS15',shape:'rect', coords: [1013,641,1048,691]},
        {_id:'9OS16',shape:'rect', coords: [1049,641,1084,691]}
    ]
};

export const eightfloormap = {
    name: '8floor',
    id: '8floor',
    className:'map',
    areas:[
        {_id:'8S1',shape:'rect', coords: [219,573,262,677]},
        {_id:'8S2',shape:'rect', coords: [263,573,303,676]},
        {_id:'8S3',shape:'rect', coords: [346,676,303,573]},
        {_id:'8S4',shape:'rect', coords: [347,573,385,677]},
        {_id:'8S5',shape:'rect', coords: [386,573,434,676]},
        {_id:'8S6',shape:'rect', coords: [435,573,473,676,495,699]},
        {_id:'8S7',shape:'rect', coords: [472,573,517,677]},
        {_id:'8S8',shape:'rect', coords: [517,573,561,676]},
        {_id:'8S9',shape:'rect', coords: [562,573,600,677]},
        {_id:'8S10',shape:'rect', coords: [802,573,853,677]},
        {_id:'8S11',shape:'rect', coords: [853,573,903,677,1197,720]},
        {_id:'8S12',shape:'rect', coords: [903,573,941,677]},
        {_id:'8S13',shape:'rect', coords: [942,573,992,677]},
        {_id:'8S14',shape:'rect', coords: [992,573,1025,677]},
        {_id:'8S15',shape:'rect', coords: [1025,573,1071,677]},
        {_id:'8S16',shape:'rect', coords: [1072,573,1110,677]},
        {_id:'8S17',shape:'rect', coords: [1111,573,1172,677]},
        {_id:'8OS1',shape:'rect', coords: [600,574,651,677]},
        {_id:'8OS2',shape:'rect', coords: [753,573,802,677]},
        {_id:'8SM1',shape:'rect', coords: [87,493,164,528]},
        {_id:'8SM2',shape:'rect', coords: [164,530,81,562]},
        {_id:'8SM3',shape:'rect', coords: [81,564,163,597]},
        {_id:'8SM4',shape:'rect', coords: [316,556,236,516]},
        {_id:'8SM5',shape:'rect', coords: [317,516,345,556]},
        {_id:'8SM6',shape:'rect', coords: [345,515,421,556]},
        {_id:'8SM7',shape:'rect', coords: [502,556,421,515]},
        {_id:'8NW1',shape:'rect', coords: [19,70,111,109]},
        {_id:'8NW2',shape:'rect', coords: [19,110,112,159]},
        {_id:'8NW3',shape:'rect', coords: [19,160,112,212]},
        {_id:'8NW4',shape:'rect', coords: [19,213,111,221]},
        {_id:'8NW5',shape:'rect', coords: [19,222,112,254]},
        {_id:'8NW6',shape:'rect', coords: [19,255,112,278]},
        {_id:'8N1',shape:'rect', coords: [113,70,153,125]},
        {_id:'8N2',shape:'rect', coords: [153,70,193,125]},
        {_id:'8N3',shape:'rect', coords: [194,71,244,124]},
        {_id:'8N4',shape:'rect', coords: [121,136,154,209]},
        {_id:'8N5',shape:'rect', coords: [154,136,174,209]},
        {_id:'8N6',shape:'rect', coords: [175,136,219,209]},
        {_id:'8N7',shape:'rect', coords: [219,136,247,209]},
        {_id:'8N8',shape:'rect', coords: [248,137,291,195]},
        {_id:'8N9',shape:'rect', coords: [291,137,312,195]},
        {_id:'8N10',shape:'rect', coords: [312,137,355,195]},
        {_id:'8N11',shape:'rect', coords: [356,137,380,195]},
        {_id:'8N12',shape:'rect', coords: [381,137,405,195]},
        {_id:'8N13',shape:'rect', coords: [522,190,563,268]},
        {_id:'8N14',shape:'rect', coords: [406,137,452,195]},
        {_id:'8N15',shape:'rect', coords: [483,137,506,195]},
        {_id:'8N16',shape:'rect', coords: [123,229,160,310]},
        {_id:'8N17',shape:'rect', coords: [323,205,447,232]},
        {_id:'8N18',shape:'rect', coords: [469,202,501,259]},
        {_id:'8ON1',shape:'rect', coords: [421,73,469,121]},
        {_id:'8ON2',shape:'rect', coords: [470,73,504,121]},
        {_id:'8ON3',shape:'rect', coords: [504,73,539,121]},
        {_id:'8ON4',shape:'rect', coords: [541,73,574,121]},
        {_id:'8ON5',shape:'rect', coords: [575,73,606,121]},
        {_id:'8ON6',shape:'rect', coords: [676,73,706,120]},
        {_id:'8ON7',shape:'rect', coords: [707,73,741,120]},
        {_id:'8ON8',shape:'rect', coords: [789,120,742,72]},
        {_id:'8ON9',shape:'rect', coords: [789,72,826,120]},
        {_id:'8ON10',shape:'rect', coords: [827,72,861,120]},
        {_id:'8ON11',shape:'rect', coords: [861,72,896,120]},
        {_id:'8ON12',shape:'rect', coords: [930,72,963,120]},
        {_id:'8ON13',shape:'rect', coords: [963,73,995,119]},
        {_id:'8ON14',shape:'rect', coords: [963,73,995,119]},
        {_id:'8ON15',shape:'rect', coords: [1027,72,1057,120]},
        {_id:'8ON16',shape:'rect', coords: [1057,72,1105,120]},
        {_id:'8ON17',shape:'rect', coords: [1106,71,1139,120]},
        {_id:'8ON18',shape:'rect', coords: [1140,72,1173,120]},
        {_id:'8E2',shape:'rect', coords: [1124,173,1174,210]},
        {_id:'8E3',shape:'rect', coords: [1124,211,1173,242]},
        {_id:'8E4',shape:'rect', coords: [1124,242,1173,280]},
        {_id:'8E5',shape:'rect', coords: [1125,281,1173,313]},
        {_id:'8E6',shape:'rect', coords: [1125,314,1173,347]},
        {_id:'8E7',shape:'rect', coords: [1124,348,1173,378]},
        {_id:'8E8',shape:'rect', coords: [1125,379,1173,413]},
        {_id:'8E9',shape:'rect', coords: [1125,414,1173,441]},
        {_id:'8E1',shape:'rect', coords: [1173,172,1123,121]},
        {_id:'Brooklyn Bridge',shape:'rect', coords: [245,73,333,121]},
        {_id:'Intrepid',shape:'rect', coords: [334,73,419,121]},
        {_id:'Empire State Bldg',shape:'rect', coords: [607,73,641,120]},
        {_id:'MSG',shape:'rect', coords: [168,261,203,300]},
        {_id:'Central Park',shape:'rect', coords: [237,300,204,261]},
        {_id:'Columbus Circle',shape:'rect', coords: [305,261,369,300]},
        {_id:'Broadway',shape:'rect', coords: [370,261,434,300]},
        {_id:'Coney Island',shape:'rect', coords: [455,260,487,299]},
        {_id:'G.C.T',shape:'rect', coords: [488,261,519,299]},
        {_id:'Fulton',shape:'rect', coords: [19,279,71,313]},
        {_id:'South Street Seaport',shape:'rect', coords: [19,313,71,346]},
        {_id:'Wall Street',shape:'rect', coords: [19,346,71,457]},
        {_id:'Staten Island',shape:'poly', coords: [94,351,129,352,160,355,158,375,148,392,136,404,119,409,102,413,95,413]},
        {_id:'Bedford',shape:'poly', coords: [212,482,234,480,236,506,215,507]},
        {_id:'BQE',shape:'poly', coords: [235,481,254,478,254,506,237,506]},
        {_id:'Navy Yard',shape:'poly', coords: [254,477,291,471,291,504,255,505]},
        {_id:'Paramount',shape:'rect', coords: [342,445,389,483]},
        {_id:'Promenade',shape:'rect', coords: [390,445,435,505]},
        {_id:'Second Story',shape:'rect', coords: [502,446,644,557]},
        {_id:'Academy',shape:'rect', coords: [938,487,1000,558]},
        {_id:'Gowanus',shape:'rect', coords: [1001,487,1066,558]},
        {_id:'Garden',shape:'rect', coords: [1067,487,1123,558]},
        {_id:'Cyclone',shape:'rect', coords: [1125,487,1171,558]},
        {_id:'Prospect',shape:'rect', coords: [652,574,752,677]},
        {_id:'8SWF1',shape:'rect', coords: [19,458,71,498]},
        {_id:'8SWF2',shape:'rect', coords: [19,499,71,533]},
        {_id:'8SWF3',shape:'rect', coords: [19,533,71,566]},
        {_id:'8SWF4',shape:'rect', coords: [19,567,71,613]},
        {_id:'8SWF5',shape:'rect', coords: [89,613,19,668]},
        {_id:'8SWF6',shape:'rect', coords: [90,613,127,667]},
        {_id:'8SWF7',shape:'poly', coords: [129,613,159,667]},
        {_id:'Stairway-8',shape:'rect', coords: [742,514,856,559]},
        {_id:'Dante Skidmore',shape:'rect', coords: [238,261,271,300]},
        {_id:'Ginny Pil',shape:'rect', coords: [272,261,304,300]},
        {_id:'Chrysler Bldg',shape:'rect', coords: [642,73,675,120]},
        {_id:'Bathroom-8',shape:'rect', coords: [562,314,656,412]},
        {_id:'Elevators-8',shape:'rect', coords: [657,313,736,412]},
        {_id:'Cafeteria',shape:'rect', coords: [874,446,727,513]},
    ]
}


