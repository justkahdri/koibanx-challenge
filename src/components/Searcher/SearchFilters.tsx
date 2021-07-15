import React from "react";
import {
  Checkbox,
  Stack,
  Text,
  RadioGroup,
  Radio,
  CheckboxGroup,
} from "@chakra-ui/react";

type SearchFiltersProps = {
  handleCheckboxGroup: (values: string[]) => void;
  handleRadioGroup: (value: ActivityFilter) => void;
};

const SearchFilters = (props: SearchFiltersProps) => {
  const { handleCheckboxGroup, handleRadioGroup } = props;
  const defaultFilters = {
    id: "ID",
    cuit: "CUIT",
    commerce: "Nombre de Comercio",
  };

  return (
    <Stack direction="row" justifyContent="space-evenly" spacing={8}>
      <Stack
        direction={{ base: "column", md: "row" }}
        alignItems={{ base: "normal", md: "center" }}
      >
        <Text fontWeight={500}>Filtros:</Text>
        <CheckboxGroup
          onChange={handleCheckboxGroup}
          defaultValue={Object.keys(defaultFilters)}
        >
          <Stack direction="row">
            {Object.entries(defaultFilters).map(([key, value]) => (
              <Checkbox key={key} value={key}>
                {value}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      </Stack>

      <RadioGroup onChange={handleRadioGroup} defaultValue={"all"}>
        <Stack
          direction={{ base: "column", md: "row" }}
          alignItems={{ base: "normal", md: "center" }}
        >
          <Text fontWeight={500}>Activos:</Text>
          <Radio value={"all"}>Todos</Radio>
          <Radio value={"active"}>S&oacute;lo activos</Radio>
          <Radio value={"non-active"}>No activos</Radio>
        </Stack>
      </RadioGroup>
    </Stack>
  );
};

export default SearchFilters;
