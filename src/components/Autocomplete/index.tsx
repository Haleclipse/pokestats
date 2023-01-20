import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
// helpers
import { removeDash, prefixId, fadeInDownVariant } from '@/helpers';
// types
import type { Pokemon, PokemonType } from '@/types';
import type { BoxProps } from '@/components/Box';
// styles
import {
  Container,
  Input,
  ListWrapper,
  OptionWrapper,
  OptionImg,
  Option,
  PokeID,
} from './styledAutoComplete';
// components
import { AnimatePresence } from 'framer-motion';
import Box from '@/components/Box';
import TypeIcon from '@/components/TypeIcon';

export interface AutocompleteProps extends BoxProps {
  filterList: (PokemonType | Pokemon)[];
}

const Autocomplete = ({
  filterList,
  flexalign = 'stretch',
  flexdirection = 'row',
  flexmargin = '0 auto',
  ...rest
}: AutocompleteProps): JSX.Element => {
  // router
  const router = useRouter();
  // search state
  const [search, setSearch] = useState('');
  // filtered state
  const [filtered, setFiltered] = useState<AutocompleteProps['filterList']>([]);
  // active sugestion
  const [activeOption, setActiveOption] = useState(-1);

  // reset states
  const resetStates = (): void => {
    setSearch('');
    setFiltered([]);
    setActiveOption(-1);
  };

  // reset states on load and unmount
  useEffect(() => {
    // on load
    resetStates();
    // unmount
    return () => resetStates();
  }, []);

  // input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
    handleFilter(e.target.value.toLowerCase());
  };

  // filter by option
  const handleFilter = (value: string): void => {
    if (value) {
      const filteredList = filterList.filter(
        item =>
          removeDash(item.name).toLowerCase().includes(value) ||
          item.id.toString().includes(value.toString()),
      );
      // update filtered state with first 4 options
      setFiltered(filteredList.slice(0, 4));
    } else {
      // set filtered state to empty array
      setFiltered([]);
    }
  };

  // key pressed
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLAnchorElement>): void => {
    // enter
    if (e.key === 'Enter' && filtered[0] !== undefined) {
      activeOption === -1
        ? // trigger router for first suggestion
          router.push(`/${filtered[0].assetType}/${filtered[0].name}`)
        : // trigger router for active option
          router.push(`/${filtered[activeOption].assetType}/${filtered[activeOption].name}`);
      // clean filtered state
      resetStates();
    } // up arrow
    else if (e.key === 'ArrowUp') {
      // stop window from scrolling
      e.preventDefault();
      if (activeOption === -1) {
        return;
      }
      // decrement the index
      setActiveOption(activeOption - 1);
    }
    // down arrow
    else if (e.key === 'ArrowDown') {
      // stop window from scrolling
      e.preventDefault();
      if (activeOption + 1 === filtered.length) {
        // last option, do nothing
        return;
      }
      // increment the index
      setActiveOption(activeOption + 1);
    } else {
      // reset active option
      setActiveOption(-1);
    }
  };

  return (
    <Container
      flexalign={flexalign}
      flexdirection={flexdirection}
      flexmargin={flexmargin}
      {...rest}
    >
      <label htmlFor="autocomplete" id="autocomplete_label" aria-hidden="true">
        Search Pokestats
      </label>
      <Input
        type="text"
        autoComplete="off"
        placeholder="Search PokeStats"
        id="autocomplete"
        aria-labelledby="autocomplete_label"
        value={search}
        onChange={e => handleInputChange(e)}
        onKeyDown={e => handleKeyDown(e)}
        $isOpen={!!filtered?.length}
      />
      <AnimatePresence>
        {!!filtered?.length && (
          <ListWrapper
            initial="hidden"
            animate="show"
            whileTap="tap"
            exit="exit"
            variants={fadeInDownVariant}
            key="autocomplete-list-wrapper"
          >
            {filtered.map(({ assetType, name, id }, i) => (
              <OptionWrapper
                href={`/${assetType}/${name}`}
                key={`${assetType}-${id}-${name}-${i}`}
                onClick={() => resetStates()}
                onFocus={() => setActiveOption(i)}
                onKeyDown={e => handleKeyDown(e)}
                ref={currOption => currOption && i === activeOption && currOption.focus()}
              >
                <Box flexdirection="row" flexjustify="flex-start" flexgap="1em">
                  {assetType === 'type' && <TypeIcon type={name} />}
                  {assetType === 'pokemon' && (
                    <OptionImg
                      src={`https://raw.githubusercontent.com/andreferreiradlw/pokestats_media/main/assets/images/${prefixId(
                        id,
                      )}.png`}
                    />
                  )}
                  <Option>{removeDash(name)}</Option>
                </Box>
                {assetType === 'pokemon' && <PokeID>{`#${id}`}</PokeID>}
              </OptionWrapper>
            ))}
          </ListWrapper>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Autocomplete;
