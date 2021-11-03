// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

// Custom Hook
const useLocalStorageState = (key,defaultValue='') => {
  //Passing a function to useState, React will only call the function when it needs the initial value (which is when the component is initially rendered).
  //if the initial value for your state is computationally expensive use function for initialSate
  const [state, setState] = React.useState(() =>  window.localStorage.getItem(key) || defaultValue);

  React.useEffect(()=> {
    window.localStorage.setItem(key, state)
  },[key, state])

  return [state, setState];
}

function Greeting({initialName = ''}) {

  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
