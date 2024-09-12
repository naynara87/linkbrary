import { useState, useCallback, useEffect } from "react";
import axios from "../lib/axios";
import debounce from "lodash.debounce";

export const useSearchLinks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLinks, setFilteredLinks] = useState([]);

  const getSearchLinks = useCallback(async () => {
    try {
      const res = await axios.get(`/links?search=${searchTerm}`);
      setFilteredLinks(res.data.list || []);
    } catch (error) {
      console.error("링크 조회 중 오류 발생:", error);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      getSearchLinks();
    }
  }, [searchTerm, getSearchLinks]);

  const debouncedSearch = useCallback(
    debounce((term) => {
      setSearchTerm(term.toLowerCase());
    }, 300),
    []
  );

  return {
    searchTerm,
    setSearchTerm,
    filteredLinks,
    debouncedSearch,
  };
};
