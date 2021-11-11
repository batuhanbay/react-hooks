// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import { ErrorBoundary } from 'react-error-boundary';
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'

function PokemonInfo({pokemonName}) {

  const [state, setState] = React.useState({status:"idle", pokemon:null, error:null});
  const {status, pokemon, error} = state;
  React.useEffect(() => {
    if(!pokemonName){
      return;
    }
    setState({status:"pending"});
    fetchPokemon(pokemonName).then(
      pokemonData => {
        setState({status:"resolved",pokemon:pokemonData })
      },
      error => {
        setState({status:"rejected", error:error})
      }
    )
  }, [pokemonName])
  if(status === "idle"){
    return 'Submit a pokemon'
  }else if(status === "pending"){
    return <PokemonInfoFallback name={pokemonName} />
  }else if(status === "rejected"){
    return <ErrorFallback error={error}/>
  }else if(status === "resolved"){
    return <PokemonDataView pokemon={pokemon} />
  }
}
function ErrorFallback({error}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  const handleResetErrorBoundary = () => {
    setPokemonName("");
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleResetErrorBoundary} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
