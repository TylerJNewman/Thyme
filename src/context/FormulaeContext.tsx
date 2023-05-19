import React, { createContext, useContext } from "react";
import useSWR from "swr";
import FuzzySearch from "fuzzy-search";

const url = "https://formulae.brew.sh/api/formula.json";
const keys = ["name", "full_name"];

const FormulaeContext = createContext(null);

const FormulaeContextProvider = ({ children }) => {
  const { data, error } = useSWR(url);
  const [searchPattern, setSearchPattern] = React.useState("");

  const searcher = new FuzzySearch(data, keys, { sort: true });
  const result = searcher.search(searchPattern);

  return (
    <FormulaeContext.Provider
      value={{ data: result, error, loading: !data, setSearchPattern }}
    >
      {children}
    </FormulaeContext.Provider>
  );
};

function useFormulae() {
  const context = useContext(FormulaeContext);
  if (context === undefined) {
    throw new Error(
      "useFormulae must be used within a FormulaeContextProvider",
    );
  }
  return context;
}

export { FormulaeContext, FormulaeContextProvider, useFormulae };
