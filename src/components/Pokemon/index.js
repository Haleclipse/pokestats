import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
// action
import { fetchPokemonData } from './pokemonSlice'
// components
import Layout from '../Layout'
import Loading from '../Loading'
import Box from '../Box'
import Details from './Details'
import Breeding from './Breeding'
import Training from './Training'
import BaseStats from './BaseStats'
// styles
import { ImageContainer, Image } from './StyledPokemon'

export default function Homepage() {
  // router
  const router = useRouter()
  // dispatch
  const dispatch = useDispatch()
  // pokemon selector
  const pokemonInfo = useSelector((state) => state.pokemon.info)
  // data
  const { id } = pokemonInfo.data

  // fetch pokemon data
  useEffect(() => {
    const pokemon = router.query.id
    pokemon && dispatch(fetchPokemonData(pokemon))
  }, [router])

  // error handling
  useEffect(() => {
    if (pokemonInfo.error.status !== 'OK') {
      router.push('/404')
    }
  }, [pokemonInfo.error])

  return (
    <Layout withHeader>
      {pokemonInfo.isLoading ? (
        <Loading />
      ) : (
        <>
          <Box
            as="section"
            direction={{ xxs: 'column', lg: 'row' }}
            align="flex-start"
            justify="flex-start"
            margin="1rem 0"
            constrained
          >
            <Details
              sizes={5}
              align="flex-start"
              margin={{ xxs: '0 0 2rem', lg: '0' }}
            />
            <ImageContainer sizes={7} margin={{ xxs: '0 0 2rem', lg: '0' }}>
              <Image
                src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
              />
            </ImageContainer>
          </Box>
          <Box
            as="section"
            direction={{ xxs: 'column', md: 'row' }}
            align="flex-start"
            justify="flex-start"
            margin="1rem 0"
            constrained
          >
            <Breeding margin={{ xxs: '0 0 2rem', md: '0' }} />
            <Training margin={{ xxs: '0 0 2rem', md: '0' }} />
            <Box>Typing</Box>
          </Box>
          <Box
            as="section"
            direction={{ xxs: 'column', lg: 'row' }}
            align="flex-start"
            justify="flex-start"
            margin="1rem 0"
            constrained
          >
            <BaseStats margin={{ xxs: '0 0 2rem', lg: '0' }} />
            <Box>Sprites</Box>
          </Box>
        </>
      )}
    </Layout>
  )
}
