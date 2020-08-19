import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import ListAppointments from './ListAppointments';
import SearchAppointments from './SearchAppointments';
import { without, findIndex } from 'lodash';

class App extends Component {

  constructor() {
    super();
    this.state = {
      myName: 'Sumit Kumar Singh',
      authorName: 'Ray Villalobos',
      myAppointments: [],
      lastIndex: 0,
      formDisplay: false,
      orderBy: 'petName',
      orderDir: 'asc',
      queryText: '',
    };

    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);

    this.addAppointment = this.addAppointment.bind(this);

    this.changeOrder = this.changeOrder.bind(this);
    this.searchApts = this.searchApts.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }

  deleteAppointment(apt) {
    let tempApts = this.state.myAppointments;
    tempApts = without(tempApts, apt);

    this.setState({
      myAppointments: tempApts
    });
  }

  componentDidMount() {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const apts = result.map(item => {
          item.aptId = this.state.lastIndex;
          this.setState({ lastIndex: this.state.lastIndex + 1 });
          return item;
        });
        this.setState({
          myAppointments: apts
        });
      });
  }

  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay
    });
  }

  searchApts(query) {
    this.setState({ queryText: query });
  }

  changeOrder(order, dir) {
    this.setState({
      orderBy: order,
      orderDir: dir
    });
  }

  updateInfo(name, value, id) {
    let tempApts = this.state.myAppointments;
    let aptIndex = findIndex(this.state.myAppointments, {
      aptId: id
    });
    tempApts[aptIndex][name] = value;
    this.setState({
      myAppointments: tempApts
    });
  }

  addAppointment(apt) {
    let tempApts = this.state.myAppointments;
    apt.aptId = this.state.lastIndex;
    tempApts.unshift(apt);
    this.setState({
      myAppointments: tempApts,
      lastIndex: this.state.lastIndex + 1
    })
  }

  render() {
    const nameStyle = {
      float: 'right',
    }

    let order;
    let filteredApts = this.state.myAppointments;
    if (this.state.orderDir === 'asc') {
      order = 1;
    } else {
      order = -1;
    }

    filteredApts = filteredApts.sort(
      (a, b) => {
        if (a[this.state.orderBy].toLowerCase() < b[this.state.orderBy.toLowerCase()]) {
          return -1 * order;
        } else return 1 * order;
      })
      .filter(eachItem => {
        return (
          eachItem['petName'].toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem['ownerName'].toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem['aptNotes'].toLowerCase()
            .includes(this.state.queryText.toLowerCase())
        );
      });

    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <br />
                <div style={nameStyle}>
                  Practice build by : <b>{this.state.myName}</b><br />
                  Original Credits: <b>{this.state.authorName}</b>
                </div>
                <br /><br />
                <hr></hr>

                <AddAppointments
                  formDisplay={this.state.formDisplay}
                  toggleForm={this.toggleForm}
                  addAppointment={this.addAppointment} />

                <SearchAppointments
                  orderBy={this.state.orderBy}
                  orderDir={this.state.orderDir}
                  changeOrder={this.state.changeOrder}
                  searchApts={this.searchApts} />

                <ListAppointments
                  toChildApts={this.state.myAppointments}
                  deleteAppointment={this.deleteAppointment}
                  updateInfo={this.state.updateInfo}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
