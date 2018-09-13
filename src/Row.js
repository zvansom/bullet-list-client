import React from 'react'

const Row = props => (
  <div className="custom-row" data-idx={props.idx}>
    <div className="cell">{props.name}</div>
    <div 
      className="cell daily-checkbox"
      data-day="sun"
      onClick={props.handleClick}
      style={{background: props.days.sun ? props.color : 'none' }}>
    </div>
    <div 
      className="cell daily-checkbox" 
      data-day="mon"
      onClick={props.handleClick}
      style={{background: props.days.mon ? props.color : 'none' }}> 
    </div>
    <div 
      className="cell daily-checkbox" 
      data-day="tue"
      onClick={props.handleClick}
      style={{background: props.days.tue ? props.color : 'none' }}>
    </div>
    <div 
      className="cell daily-checkbox" 
      data-day="wed"
      onClick={props.handleClick}
      style={{background: props.days.wed ? props.color : 'none' }}>  
    </div>
    <div 
      className="cell daily-checkbox" 
      data-day="thurs"
      onClick={props.handleClick}
      style={{background: props.days.thurs ? props.color : 'none' }}>
    </div>
    <div 
      className="cell daily-checkbox" 
      data-day="fri"
      onClick={props.handleClick}
      style={{background: props.days.fri ? props.color : 'none' }}>
    </div>
    <div 
      className="cell daily-checkbox" 
      data-day="sat"
      onClick={props.handleClick}
      style={{background: props.days.sat ? props.color : 'none' }}>
    </div>
  </div>
)

export default Row;