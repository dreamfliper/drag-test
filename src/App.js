import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  state = { db }

  onDragOverHandler = (i, dragOver, time) => () =>
    this.setState(onDragOverStateFn(i, dragOver, time))

  render() {
    const { db } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {Object.entries(db).map(([i, { dragOver, time }]) => (
          <p
            key={i}
            draggable
            onDragOver={this.onDragOverHandler(i, dragOver, time)}
            onDragEnd={log(i, 'onDragEnd')}
            className={`box ${dragOver ? 'move' : ''}`}
          >
            {i}
          </p>
        ))}
      </div>
    )
  }
}

export default App

const db = Array.from(Array(5).keys()).reduce(
  (acc, i) => ({ ...acc, [i]: { draggable: '', time: 0 } }),
  {}
)

const log = (...args) => () => console.log(...args)

const onDragOverStateFn = (i, dragOver, time) => ({ db }) =>
  time + 500 - Date.now() < 0 && {
    db: { ...db, [i]: { dragOver: !dragOver, time: Date.now() } },
  }

// function throttle(fn, wait, i) {
//   let time = Date.now()
//   return function() {
//     if (time + wait - Date.now() < 0) {
//       fn()
//       time = Date.now()
//     }
//   }
// }
