import React, { FC, MutableRefObject, useRef, useState } from "react";
import {
  Input,
  Stack,
  FormControl,
  InputGroup,
  InputRightElement,
  FormHelperText,
  Icon,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";

import { GoSearch } from "react-icons/go";
import SearchFilters from "./SearchFilters";

type SearcherProps = {
  handleSearch: (query: string, filters: TFilters) => void;
  loading: boolean;
};

const Searcher: FC<SearcherProps> = (props: SearcherProps) => {
  const { handleSearch, loading } = props;
  const [invalid, setInvalid] = useState<string | false>(false);
  const searchInput = useRef() as MutableRefObject<HTMLInputElement>;

  const [filters, setFilters] = useState<TFilters>({
    byInput: ["id", "cuit", "commerce"],
    byActivity: "all",
  });

  const setInputFilters = (checked: string[]) => {
    setFilters((activeFilters) => ({
      ...activeFilters,
      byInput: checked,
    }));
  };

  const setActivityFilters = (selected: ActivityFilter) => {
    setFilters((activeFilters) => ({
      ...activeFilters,
      byActivity: selected,
    }));
  };

  // Validation for Search input & filters selected
  const validateSearch = (input: string) => {
    if (input.length < 2) {
      setInvalid(
        "Por favor ingrese 2 o más caracteres para iniciar la búsqueda." // Invalid error message
      );
      return false; // Returns false if too short
    } else if (!filters.byInput.length) {
      setInvalid(
        "Por favor seleccione alguna de las opciones de búsqueda." // Invalid error message
      );
      return false; // Returns false if there aren't filters selected
    } else {
      setInvalid(false); // If valid there is no message
      return true; // Returns valid
    }
  };

  // Wrapper function validates before handling search
  const wrapperSearch = () => {
    if (validateSearch(searchInput.current.value)) {
      handleSearch(searchInput.current.value, filters);
    }
  };

  return (
    <Stack width="60vw">
      <FormControl
        id="search"
        isDisabled={loading}
        isInvalid={!!invalid}
        onChange={() => validateSearch(searchInput.current.value)}
      >
        <Stack direction="row">
          <InputGroup size="lg">
            <Input
              ref={searchInput}
              pr="4.5rem"
              type="text"
              placeholder="Nombre de comercio, ID o CUIT"
              onKeyPress={(e) => e.key === "Enter" && wrapperSearch()} // On "enter" submit search
            />
            <InputRightElement width="4.5rem">
              {loading ? (
                <Button isLoading colorScheme="orange" variant="ghost" /> // Submition animated button
              ) : (
                <Icon
                  as={GoSearch}
                  rounded="md"
                  color="orange"
                  aria-label="search"
                  boxSize={5}
                  cursor="pointer"
                  onClick={() => wrapperSearch()} // Search Button
                />
              )}
            </InputRightElement>
          </InputGroup>
        </Stack>

        {invalid ? (
          <FormErrorMessage>{invalid}</FormErrorMessage>
        ) : (
          <FormHelperText>
            Intent&aacute; buscando &quot;Pancher&iacute;a el Uno&quot;
          </FormHelperText>
        )}
      </FormControl>

      <SearchFilters
        handleCheckboxGroup={setInputFilters}
        handleRadioGroup={setActivityFilters}
      />
    </Stack>
  );
};

export default Searcher;
