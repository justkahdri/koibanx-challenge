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
} from "@chakra-ui/react";

import { GoSearch } from "react-icons/go";

type SearcherProps = {
  handleSearch: (query: string, filters: string[]) => void;
  loading: boolean;
};

const Searcher: FC<SearcherProps> = (props: SearcherProps) => {
  const { handleSearch, loading } = props;
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

  return (
    <Stack width="60vw">
      <FormControl id="search" isDisabled={loading}>
        <Stack direction="row">
          <InputGroup size="lg">
            <Input
              ref={searchInput}
              pr="4.5rem"
              type="text"
              placeholder="Nombre de comercio, ID o CUIT"
              onKeyPress={
                (e) =>
                  e.key === "Enter" &&
                  handleSearch(e.currentTarget.value, activeFilters) // TODO Validation for search
              } // On "enter" submit search
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
                  onClick={() =>
                    handleSearch(searchInput.current.value, activeFilters)
                  } // Search Button
                />
              )}
            </InputRightElement>
          </InputGroup>
        </Stack>

        <FormHelperText>Intent&aacute; buscando Xunlei Limited</FormHelperText>
      </FormControl>
      <Stack direction="row" spacing={6}>
        <Text fontWeight={500}>Filtros:</Text>
        {Object.entries(listedFilters).map(([key, val]) => (
          <Checkbox
            key={key}
            value={key}
            defaultIsChecked
            onChange={toggleFilter}
          >
            {val}
          </Checkbox>
        ))}
      </Stack>
    </Stack>
  );
};

export default Searcher;
