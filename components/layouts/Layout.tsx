import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react'
import Navbar from '../UI/Navbar';

type Props = {
  title?: string;
  children: JSX.Element | JSX.Element[];
}

const origin = typeof window === 'undefined' ? '' : window.location.origin;

const Layout: React.FC<Props> = ({ title, children }) => {

  return (
    <>
      <Head>
        <title>{title || 'Pokemon APP'}</title>
        <meta name='author' content='Agustin La Valla' />
        <meta name='description' content={`Information about pokemon: ${title}`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />

        <meta property="og:title" content={`Information about pokemon: ${title}`} />
        <meta property="og:description" content={`Page about ${title}`} />
        <meta property='og:image' content={`${origin}/imgs/pokemon.jpeg`} />
      </Head>

      <div style={{ height: '100vh' }}>
        <Navbar />
        <main
          style={{
            padding: '0px 1.25rem'
          }}
        >
          {children}
        </main>

      </div>
    </>
  )
}

export default Layout