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
import React, { useState } from "react";
import slugify from "slugify";
import { GoSearch } from "react-icons/go";

const Searcher: React.FC = () => {
  const filters = ["ID", "CUIT", "Nombre de Comercio", "Solo Activos"];
  const [loading, setLoading] = useState(false);
  const handleSearch = () => {
    setLoading(true);
    console.log("Searching...");
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Stack width="60vw">
      <FormControl id="search" isDisabled={loading}>
        <Stack direction="row">
          <InputGroup size="lg">
            <Input
              pr="4.5rem"
              type="text"
              placeholder="Nombre de comercio, ID o CUIT"
              onKeyPress={(e) => e.key === "Enter" && handleSearch()} // On enter submit search
            />
            <InputRightElement width="4.5rem">
              {loading ? (
                <Button isLoading colorScheme="orange" variant="ghost" />
              ) : (
                <Icon
                  as={GoSearch}
                  rounded="md"
                  color="orange"
                  aria-label="search"
                  boxSize={5}
                  cursor="pointer"
                  onClick={handleSearch}
                />
              )}
            </InputRightElement>
          </InputGroup>
        </Stack>

        <FormHelperText>
          Intent&aacute; buscando &quot;Pancher&iacute;a El Uno&quot;
        </FormHelperText>
      </FormControl>
      <Stack direction="row" spacing={6}>
        <Text fontWeight={500}>Filtros:</Text>
        {filters.map((filter) => (
          <Checkbox key={slugify(filter)} defaultIsChecked>
            {filter}
          </Checkbox>
        ))}
      </Stack>
    </Stack>
  );
};

export default Searcher;
