import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { useNpmPackages } from "context/NpmPackageContext";
import { useScrollTable } from "context/ScrollTableContext";

const SearchBar = (props) => {
  const { setSearchPattern } = useNpmPackages();
  const { goToTop } = useScrollTable();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPattern(e.target.value);
    goToTop();
  };

  return (
    <InputGroup {...props}>
      <InputLeftElement pointerEvents="none">
        <Icon as={FiSearch} color="muted" fontSize="lg" />
      </InputLeftElement>
      <Input
        onChange={handleSearch}
        focusBorderColor="yellow.500"
        color="yellow.500"
        width="full"
        variant="filled"
        type="text"
        placeholder="Search packages..."
        autoComplete="off"
        _placeholder={{ opacity: 1, color: "gray.500" }}
        // _focus={{
        //   borderColor: "yellow.500",
        // }}
      />
    </InputGroup>
  );
};

export default SearchBar;
