import React, { FC, MutableRefObject, useRef, useState } from "react";
import {
  Input,
  Stack,
  Checkbox,
  FormControl,
  InputGroup,
  InputRightElement,
  FormHelperText,
  Icon,
  Button,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";

import { GoSearch } from "react-icons/go";

type SearcherProps = {
  handleSearch: (query: string, filters: string[]) => void;
  loading: boolean;
};

const Searcher: FC<SearcherProps> = (props: SearcherProps) => {
  const { handleSearch, loading } = props;
  const [invalid, setInvalid] = useState<string | false>(false);
  const searchInput = useRef() as MutableRefObject<HTMLInputElement>;
  const listedFilters = {
    id: "ID",
    cuit: "CUIT",
    commerce: "Nombre de Comercio",
    active: "Solo Activos",
  };
  const [activeFilters, setActiveFilters] = useState(
    Object.keys(listedFilters)
  );

  const toggleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.currentTarget;
    if (checked) {
      setActiveFilters((activeFilters) => [...activeFilters, value]);
    } else {
      setActiveFilters((activeFilters) =>
        activeFilters.filter((f) => f !== value)
      );
    }
  };

  // Validation for Search input & filters selected
  const validateSearch = (input: string) => {
    if (input.length < 2) {
      setInvalid(
        "Por favor ingrese 2 o más caracteres para iniciar la búsqueda." // Invalid error message
      );
      return false; // Returns false if too short
    } else if (
      !activeFilters.length ||
      (activeFilters[0] === "active" && activeFilters.length === 1)
    ) {
      setInvalid(
        "Por favor seleccione alguno de las opciones de búsqueda." // Invalid error message
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
      handleSearch(searchInput.current.value, activeFilters);
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
      <Stack direction="row" spacing={6}>
        <Text fontWeight={500}>Filtros:</Text>
        {Object.entries(listedFilters).map(([key, value]) => (
          <Checkbox
            key={key}
            value={key}
            defaultIsChecked
            onChange={toggleFilter}
          >
            {value}
          </Checkbox>
        ))}
      </Stack>
    </Stack>
  );
};

export default Searcher;
