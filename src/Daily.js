import React, { Component } from 'react';
import { SliderPicker } from 'react-color';
import axios from 'axios';
import SERVER_URL from './constants/server';

import Row from './Row';

const sampleDailyTasks = [
  {
    name: 'Do Dishes',
    completed: {
      sun: true,
      mon: true,
      tue: false,
      wed: true,
      thurs: false,
      fri: true,
      sat: false,
    },
    color: '#bada55',
    // TODO: add userId (from token)
    // dbID: don't care

  },
  {
    name: 'Walk Dog',
    completed: {
      sun: true,
      mon: false,
      tue: false,
      wed: true,
      thurs: true,
      fri: true,
      sat: false,
    },
    color: '#123abc',
  },
  {
    name: 'Make bed',
    completed: {
      sun: false,
      mon: true,
      tue: false,
      wed: true,
      thurs: true,
      fri: true,
      sat: false,
    },
    color: '#f1c3bd',
  },
  {
    name: 'Clean litterbox',
    completed: {
      sun: true,
      mon: true,
      tue: true,
      wed: true,
      thurs: true,
      fri: true,
      sat: true,
    },
    color: '#d4f2ec',
  },
]

export default class Daily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyTasks: [],
      newName: '',
      newColor: '#bada55',
    }
  }
  
  async componentDidMount() {
    // const res = await fetch(SERVER_URL + `/daily/${this.props.user.userId}`)
    // const tasks = await res.json();
    this.setState({
      // dailyTasks: tasks,
      dailyTasks: sampleDailyTasks,
      addNewShowing: false,
    })
  }

  handleClick = e => { 
    console.log('clicked');
    const idx = parseInt(e.target.parentElement.dataset.idx, 10);
    const day = e.target.dataset.day
    const currentTasks = this.state.dailyTasks;
    currentTasks[idx].completed[day] = !this.state.dailyTasks[idx].completed[day];
    this.setState({
      dailyTasks: currentTasks,
    });
    axios.post(SERVER_URL + `/daily/${this.state.dailyTasks[idx].id}`, { data: this.state.dailyTasks[idx] })
      .then(response => {console.log(response)})
      .catch(err => { console.log('ERROR', err);})
  }

  handleNewTask = e => {
    const currentTasks = this.state.dailyTasks;
    const newName = this.state.newName;
    const newColor = this.state.newColor;
    const newTask = {
      // userId: this.props.user.userId,
      name: newName,
      completed: {
        sun: false,
        mon: false,
        tue: false,
        wed: false,
        thurs: false,
        fri: false,
        sat: false,
      },
      color: newColor,
    }
    currentTasks.push(newTask);
    this.setState({
      dailyTasks: currentTasks,
      newName: '',
      newColor: '#bada55',
      addNewShowing: false,
    });
    const stringedTask = JSON.stringify(newTask);
    axios.post(SERVER_URL + '/daily', { data: stringedTask })
      .then(response => {console.log(response)})
      .catch(err => { console.log('ERROR', err);})
  }

  toggleModal = e => { this.setState({addNewShowing: !this.state.addNewShowing}) }

  handleTaskChange = e => { this.setState({ newName: e.target.value}) }

  handleChangeComplete = (color, e) => { this.setState({ newColor: color.hex }) }

  render() {
    const hidden = this.state.addNewShowing ? '' : 'hidden';
    const classes = `${hidden} add-new-form`;
    return(
        <main className="bullet-tasks container">
          <div className="custom-row">
            <div className="cell-header">Name</div>
            <div className="cell-header">Sun</div>
            <div className="cell-header">Mon</div>
            <div className="cell-header">Tues</div>
            <div className="cell-header">Weds</div>
            <div className="cell-header">Thur</div>
            <div className="cell-header">Fri</div>
            <div className="cell-header">Sat</div>
          </div>
          {this.state.dailyTasks.map((task, idx) => <Row key={idx} idx={idx} name={task.name} days={task.completed} color={task.color} handleClick={this.handleClick} />) }
          <a className="btn-floating waves-effect waves-light red" onClick={this.toggleModal}><i className="material-icons">add</i></a>

          <div className={classes}>
            <a onClick={this.toggleModal}>x</a>
            <div className="input-field">
              <label htmlFor="task_name">Task Name</label>
              <input id="task_name" type="text" onChange={this.handleTaskChange} value={this.state.newName} />
            </div>
            <div className="input-field">
              <SliderPicker color={this.state.newColor} onChangeComplete={ this.handleChangeComplete } />
            </div>
            <a className="waves-effect waves-light btn" onClick={this.handleNewTask}>Add Task</a>
          </div>
        </main>
      );
  }
}
