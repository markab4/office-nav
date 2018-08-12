# Office Navigation App

This is an office navigation app developed for the Sapient Razorfish (Publicis.Sapient) New York office during the summer of 2018 by tech interns Mark Abramov, Ted Chen, Jack Dishman, and Megan Massey.

This app was developed as a method of improving office culture. We had discovered through user interviews that both long-term legacy employees as well as newer hires were not aware of where other members of their teams sat or where the conference rooms were located. The facilities staff had also reported they had needed an app like this developed for the new office for several years to help visitors find conference rooms and people's seats more easily.

A live version of this app can be found at http://bit.ly/office-nav, and for security reasons can only be accessed while on the Sapient Razorfish NY office wi-fi network.

### Features
  - Locate conference rooms and see their capacities
  - Find employees in the office and those who sit near them
  - Switch between the eighth and ninth floors
  - Locate office facilities such as kitchen and restrooms
  - Auto-complete search, pre-populating the form with a list of locations
  - Provide answers to Frequently Asked Questions through the office handbook
  - Real-time updates of seating charts through the Contentful content infrastructure

### Privacy
Due to employee privacy concerns, all employees names and API tokens have been excluded from this repository. 

### Tech

Our office navigation app takes advantage of a number of technologies:

* [Contentful](https://www.contentful.com/) - Cloud-based content infrastructure platform to securely host employee information and allow real-time updates of seating
* [React/Redux](https://github.com/reduxjs/react-redux)
* HTML5/CSS
* [jQuery](http://jquery.com/)
* [Node Package Manager](https://www.npmjs.com/)

### Installation

```sh
$ git clone https://github.com/markab4/office-nav.git
$ cd office-nav
$ npm install
$ npm start
```
