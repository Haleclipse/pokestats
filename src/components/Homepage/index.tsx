import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
// heplpers
import { staggerInitialVariant, fadeInUpVariant } from '@/helpers';
// types
import type { PokestatsHomepageProps } from '@/pages/index';
import type { Pokemon, PokemonType } from '@/types';
// styles
import { Container, GithubLink, ScrollDown, ListContainer } from './styledHomepage';
import { MainHeading, Button } from '@/components/BaseStyles';
// components
import Autocomplete from '@/components/Autocomplete';
import Particles from '@/components/Particles';
import PokemonList from './PokemonList';
import TypeList from './TypeList';
// icons
import Github from 'public/static/iconLibrary/github.svg';

const Homepage = ({ allPokemon, pokemonTypes }: PokestatsHomepageProps): JSX.Element => {
  // router
  const router = useRouter();

  const routeRandom = () => {
    if (process.env.NODE_ENV === 'production' && window?.plausible)
      window.plausible('Random Pokemon');
    router.push(`/pokemon/${allPokemon[Math.floor(Math.random() * allPokemon.length)].name}`);
  };

  const githubClick = () => {
    if (process.env.NODE_ENV === 'production' && window?.plausible)
      window.plausible('Github Homepage');
  };

  return (
    <AnimatePresence>
      <GithubLink
        href="https://github.com/andreferreiradlw/pokestats"
        target="_blank"
        rel="noopener"
        initial="hidden"
        animate="show"
        whileHover="hover"
        whileTap="tap"
        variants={fadeInUpVariant}
        key="homepage-github"
        onClick={githubClick}
      >
        <Github />
      </GithubLink>
      <Container
        flexheight="100vh"
        $constrained
        $withGutter
        initial="hidden"
        animate="show"
        variants={staggerInitialVariant}
        key="homepage-container"
      >
        <MainHeading variants={fadeInUpVariant} key="homepage-heading">
          PokeStats
        </MainHeading>
        <Autocomplete
          filterList={[...allPokemon, ...pokemonTypes]}
          variants={fadeInUpVariant}
          key="homepage-autocomplete"
        />
        <Button onClick={routeRandom} $dark variants={fadeInUpVariant} key="homepage-random-btn">
          Random Pokemon!
        </Button>
        <ScrollDown variants={fadeInUpVariant} key="homepage-scroll-down" />
      </Container>
      <ListContainer flexgap="2em" flexpadding="3em 0">
        <TypeList types={pokemonTypes} />
        <PokemonList pokemon={allPokemon} key="homepage-pokemon-list" />
      </ListContainer>
      <Particles key="homepage-particles" />
    </AnimatePresence>
  );
};

export default Homepage;
