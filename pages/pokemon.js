import React, { Component } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'

export default function pokemon({ pokemon }) {

  console.log(pokemon)

  return <Layout title={pokemon.name}>
    <h1 className="text-4xl mb-2 text-center">{pokemon.name} #{pokemon.number}</h1>
    <img src={pokemon.image} alt={pokemon.name} className="mx-auto"/>
    <div className="pokebox border p-4 border-gray my-2 text-lg rounded-md bg-gray-200">
      <p className="text-2xl mt-4 mb-7 italic px-8">{pokemon.description}</p>
      <p><span className="font-bold mr-2">Weight:</span> {pokemon.weight}kg</p>
      <p><span className="font-bold mr-2">Size:</span> {pokemon.height}"</p>
      <h2 className="text-2xl mt-6 mb-2">Types</h2>
      {pokemon.types.map(type => {
        return <span key={type.type.name} className={`type-${type.type.name} py-2 px-4 my-2 mr-2 items-center rounded-md inline-block text-white`}>{type.type.name}</span>
      })}
    </div>
    <p className='mt-10 text-center'>
      <Link href="/">
        <a className="text-2xl underline" title="home">Home</a>
      </Link>
    </p>

    <style>{`
      .type-grass { background: green; }
      .type-fire { background: OrangeRed; }
      .type-water { background: DodgerBlue; }
      .type-electric { background: yellow; }
      .type-normal { background: BurlyWood; }
      .type-fighting { background: Brown; }
      .type-flying { background: DeepSkyBlue; }
      .type-ice { background: CadetBlue; }
      .type-rock { background: Sienna; }
      .type-ground { background: peru; }
      .type-steel { background: LightSteelBlue; }
      .type-dragon { background: indigo; }
      .type-dark { background: DarkSlateGray; }
      .type-fairy { background: HotPink; }
      .type-psychic { background: MediumOrchid; }
      .type-ghost { background: MediumPurple; }
      .type-poison { background: Purple; }
      .type-bug { background: YellowGreen; }
    `}</style>
  </Layout>
}

// getServerSideProps tells Next.js to render the page on the request with a query as the props
export async function getServerSideProps({query}) {

  const id = query.id

  try {
    const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await result.json()
    const number = ('00' + (id)).slice(-3);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${number}.png`
    const dex = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
    const pokemonData = await dex.json();
    const description = pokemonData.flavor_text_entries[0].flavor_text;
    return {
      props: { 
        pokemon: {...pokemon, number, image, name, id, description}
      }
    }
  } catch (error) {
    console.error(error);
  }

} 
