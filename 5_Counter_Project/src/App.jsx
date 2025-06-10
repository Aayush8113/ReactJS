import { useState } from 'react'
import './App.css'

function App() {
  let [count, setCount] = useState(0)

  const Counter = () => setCount(count++)

  return(
    <>
      <div className="counter">
        <button onClick={Counter}>
          count is {count}
        </button>
      </div>

    </>
  )
}

export default App
