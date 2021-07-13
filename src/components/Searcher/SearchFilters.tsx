import React, { ChangeEventHandler } from "react";
import { Checkbox, Stack, Text } from "@chakra-ui/react";

type SearchFiltersProps = {
  filters: { id: string; cuit: string; commerce: string; active: string };
  toggleFilter: ChangeEventHandler<HTMLInputElement>;
};

const SearchFilters = ({ filters, toggleFilter }: SearchFiltersProps) => {
  return (
    <Stack direction={["column", "row"]} spacing={6}>
      <Text fontWeight={500}>Filtros:</Text>
      {Object.entries(filters).map(([key, value]) => (
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
  );
};

export default SearchFilters;
