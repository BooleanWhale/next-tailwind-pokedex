import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'

export default function Home() {

  const getPokeImageUrl = (pokemonName) => `https://www.pokemon.com/us/pokedex/${pokemonName}`; 

  return (
    <Layout title={'Pokedex Home'}>

      <main>
        <h1 className="text-4xl mb-8 text-center">Pokedex with Next.js & Tailwind</h1>
      </main>

    </Layout>
  )
}

// getStaticProps tells Next.js to use the props when creating a fully static page
export async function getStaticProps(context) {

  try {
    const result = fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const {results} = await result.json()
  } catch (error) {
    console.error(error);
  }

  return {
    props: {}
  }
}