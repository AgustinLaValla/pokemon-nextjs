import Image from 'next/image';
import NextLink from 'next/link';
import { useTheme, Spacer, Text, Link } from '@nextui-org/react';

const Navbar = () => {

  const { theme } = useTheme();


  return (
    <div style={{
      display: 'flex',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'start',
      padding: '0px 3rem 0 2rem',
      position: 'sticky',
      top: '0',
      left: '0',
      zIndex: 999,
      backgroundColor: theme?.colors.gray50.value || '#ECEDEE',
      color:'black'
    }}>
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
        alt="App icon"
        width={70}
        height={70}
      />

      <NextLink href="/" passHref legacyBehavior>
        <Link>
          <Text color='white' h2>P</Text>
          <Text color='white' h3>okémon</Text>
        </Link>
      </NextLink>

      <Spacer css={{ flex: 1 }} />

      <NextLink href="/favorites" passHref legacyBehavior>
        <Link css={{ marginRight: '0.625rem' }}>
          <Text color='white' h3>Favorites</Text>
        </Link>
      </NextLink>

    </div>
  )
}

export default Navbar;