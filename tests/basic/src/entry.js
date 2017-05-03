import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

ReactDOM.render(
  React.createElement(App, {}, 'Hello world'),
  document.getElementById('root')
)
