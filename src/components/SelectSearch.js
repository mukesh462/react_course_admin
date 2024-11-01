import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import useApi from "./useApi";

const SelectSearch = ({
  onChange,
  value,
  isMulti = true,
  placeholder = "Select options...",
  url = "",
}) => {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState(""); // Track the search text
  const apis = useApi();

  // Fetch data from the API whenever searchText changes
  useEffect(() => {
    const fetchOptions = async () => {
      if (!searchText) return; // Don't fetch if search text is empty
      setIsLoading(true);
      try {
        const response = await apis.request("post", url, {
          search: searchText,
        });
        const data = response.data.map((item) => ({
          value: item._id,
          label: item.name,
        }));
        setOptions(data);
      } catch (error) {
        console.error("Error fetching options:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOptions();
  }, [searchText]); // Only re-fetch when searchText changes

  return (
    <Select
      options={options}
      isMulti={isMulti}
      isLoading={isLoading}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className="mt-2 block w-full border rounded-md p-2"
      onInputChange={(inputValue) => setSearchText(inputValue)} // Update search text on input change
    />
  );
};

export default SelectSearch;
