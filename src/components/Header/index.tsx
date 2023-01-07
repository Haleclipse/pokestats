import { useContext } from 'react';
// helpers
import GameVersionContext from '@/components/Layout/gameVersionContext';
import { gameVersions, checkIfEarlierGen } from '@/helpers';
// components
import Link from 'next/link';
import Box, { BoxProps } from '@/components/Box';
import Autocomplete, { AutocompleteProps } from '@/components/Autocomplete';
// styles
import { Select } from '@/components/BaseStyles';
import { HeaderContainer, Heading, SelectContainer } from './styledHeader';
// data

interface HeaderComponentProps extends BoxProps {
  autocompleteList: AutocompleteProps['filterList'];
  pokemonGen?: string;
}

const HeaderComponent = ({
  autocompleteList,
  pokemonGen,
  ...rest
}: HeaderComponentProps): JSX.Element => {
  // game version
  const { gameVersion, setGameVersion } = useContext(GameVersionContext);

  return (
    <HeaderContainer {...rest}>
      <Box
        $constrained
        $withGutter
        direction={{ xxs: 'column', md: 'row' }}
        justify="space-between"
        align={{ xxs: 'center', md: 'flex-start' }}
        margin="auto"
      >
        <div>
          <Link href="/">
            <Heading>PokeStats</Heading>
          </Link>
          {/** Select */}
          {pokemonGen && (
            <SelectContainer direction="row" justify="flex-start">
              <label id="header_generation" htmlFor="header_gen_select">
                Game Version:
              </label>
              <Select
                aria-labelledby="header_generation"
                id="header_gen_select"
                value={gameVersion}
                onChange={e => setGameVersion(e.target.value)}
              >
                {gameVersions.map(
                  ({ name, value }, index) =>
                    !checkIfEarlierGen(pokemonGen, value) && (
                      <option key={index} value={value}>
                        {name}
                      </option>
                    ),
                )}
              </Select>
            </SelectContainer>
          )}
        </div>
        <Autocomplete
          filterList={autocompleteList}
          width="350px"
          justify="flex-end"
          align="flex-start"
          margin="none"
        />
      </Box>
    </HeaderContainer>
  );
};

export default HeaderComponent;
