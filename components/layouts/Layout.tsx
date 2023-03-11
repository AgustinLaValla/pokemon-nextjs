import Head from 'next/head';
import React from 'react'
import Navbar from '../UI/Navbar';

type Props = {
  title?: string;
  children: JSX.Element | JSX.Element[];
}

const Layout: React.FC<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon APP'}</title>
        <meta name='author' content='Agustin La Valla' />
        <meta name='description' content={`Information about pokemon: ${title}`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
      </Head>

      <Navbar />
      <main
        style={{
          padding: '0px 1.25rem'
        }}
      >
        {children}
      </main>
    </>
  )
}

export default Layout