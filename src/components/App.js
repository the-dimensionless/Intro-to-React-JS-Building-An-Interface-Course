import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import ListAppointments from './ListAppointments';
import SearchAppointments from './SearchAppointments';

class App extends Component {

  constructor() {
    super();
    this.state = {
      myName: 'Sumit Kumar Singh',
      authorName: 'Ray Villalobos'
    }
  }

  render() {
    const nameStyle = {
      float: 'right',
    }
    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <div style={nameStyle}>
                  Practice build by : <b>{this.state.myName}</b><br />
                  Original Credits: <b>{this.state.authorName}</b>
                </div>

                <AddAppointments />
                <ListAppointments />
                <SearchAppointments />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
