import React, {
  unstable_ConcurrentMode as ConcurrentMode,
  Component,
  Suspense,
} from 'react'
import {unstable_createRoot as createRoot} from 'react-dom'

const Tilt = React.lazy(() => import('./tilt'))

class App extends Component {
  state = {showTilt: false}
  toggleTilt = () => this.setState(({showTilt}) => ({showTilt: !showTilt}))
  render() {
    const {showTilt} = this.state
    return (
      <div>
        <label>
          show tilt
          <input
            type="checkbox"
            checked={showTilt}
            onChange={this.toggleTilt}
          />
        </label>

        <div style={{height: 150, width: 200}} className="totally-centered">
          {showTilt ? (
            <Suspense maxDuration={1000} fallback="loading...">
              <Tilt>
                <div className="totally-centered">vanilla-tilt.js</div>
              </Tilt>
            </Suspense>
          ) : null}
        </div>
      </div>
    )
  }
}

createRoot(document.getElementById('root')).render(
  <ConcurrentMode>
    <App />
  </ConcurrentMode>,
)
