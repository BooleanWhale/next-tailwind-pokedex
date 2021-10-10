import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import Link from 'next/link'

export default function Home({pokemons}) {

  console.log(pokemons)

  return (
    <Layout title={'Pokedex Home'}>

      <>
        <h1 className="text-4xl mb-8 text-center">Pokedex with Next.js & Tailwind</h1>
        <div>
          <ul>
            { pokemons.map(pokemon => {
              return <li key={pokemon.number}>
                <Link href={`/pokemon?id=${pokemon.number}`}>
                  <a title={pokemon.name} className="pokebox border p-4 border-gray my-2 flex items-center text-lg rounded-md bg-gray-200 hover:bg-gray-300">
                    <img src={pokemon.image} alt={pokemon.name} className="w-20 h-20 mr-3"/>
                    <div>
                      <span className="mr-2 font-bold">#{pokemon.number}</span>
                      <span>{pokemon.name}</span>
                    </div>
                  </a>
                </Link>
              </li>
            })}
          </ul>
        </div>
      </>

      {/* still beyond the power of standard tailwind */}
      <style>{`
        .pokebox img { transition: transform ease 0.15s; }
        .pokebox:hover img { transform: rotate(12deg); }
      `}</style>
    </Layout>
  )
}

// getStaticProps tells Next.js to use the props when creating a fully static page
export async function getStaticProps(context) {

  try {
    const data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const {results} = await data.json()
    const pokemons = results.map((result, index) => {
      const number = ('00' + (index + 1)).slice(-3);
      const name = result.name[0].toUpperCase() + result.name.slice(1);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${number}.png`
      return {...result, number, image, name}
    })
    return {
      props: {pokemons}
    }
  } catch (error) {
    console.error(error);
  }

  return {
    props: {}
  }
}