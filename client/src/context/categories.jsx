import React, { useState, useMemo } from "react";

const CategoriesContext = React.createContext([]);

export function CategoriesProvider(props) {
  const [categories, setCategories] = useState([]);

  const value = useMemo(() => {
    return { categories, setCategories };
  }, [categories]);

  return <CategoriesContext.Provider value={value} {...props} />;
}

export function useCategories() {
  const context = React.useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories should be inside CategoriesContext");
  }
  return context;
}
