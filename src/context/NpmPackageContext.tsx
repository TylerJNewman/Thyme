import React, { createContext, useContext } from "react";
import useSWR from "swr";
import debounce from "lodash.debounce";

const DEBOUNCE_TIME = 200;
const url = "https://api.npms.io/v2/search?q=";

const NpmPackageContext = createContext(null);

const NpmPackageContextProvider = ({ children }) => {
  const [searchPattern, setSearchPattern] = React.useState("react"); // Default search term
  const debouncedSearch = debounce(
    (query) => setSearchPattern(query),
    DEBOUNCE_TIME,
  );

  const { data, error } = useSWR(`${url}${searchPattern}`);

  const packages = data?.results.map((result) => ({
    name: result.package.name,
    version: result.package.version,
    description: result.package.description,
    score: result.score.final,
    // Add any other data you need from the API here...
  })) || [];

  return (
    <NpmPackageContext.Provider
      value={{
        data: packages,
        error,
        loading: !data,
        setSearchPattern: debouncedSearch,
      }}
    >
      {children}
    </NpmPackageContext.Provider>
  );
};

function useNpmPackages() {
  const context = useContext(NpmPackageContext);
  if (context === undefined) {
    throw new Error(
      "useNpmPackages must be used within a NpmPackageContextProvider",
    );
  }
  return context;
}

export { NpmPackageContext, NpmPackageContextProvider, useNpmPackages };
