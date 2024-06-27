import { useSearchParams } from "react-router-dom";

const useUpdateSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (
    newParams: Record<string, string | null | undefined>
  ) => {
    // Create a new object with the existing search params
    const updatedParams = new URLSearchParams(searchParams);

    // Add the new params to the updatedParams object
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        // Remove the param if the value is null or undefined
        updatedParams.delete(key);
      } else {
        // Set the new value for the param
        updatedParams.set(key, value);
      }
    });

    // Set the new search params
    setSearchParams(updatedParams);
  };

  return {
    searchParams,
    updateSearchParams,
  };
};

export default useUpdateSearchParams;
