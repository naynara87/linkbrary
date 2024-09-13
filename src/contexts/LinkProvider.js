// LinkContext.js
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import axios from "../lib/axios";
import { useToaster } from "../contexts/ToasterProvider";

const LinkContext = createContext();

export const useLinkContext = () => {
  return useContext(LinkContext);
};

export const LinkProvider = ({ children }) => {
  const [links, setLinks] = useState([]);
  const [folders, setFolders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [values, setValues] = useState({ folderId: null, url: "" });
  const toast = useToaster();

  const getFolders = useCallback(async () => {
    try {
      const url = values.folderId ? `/folders/${values.folderId}` : `/folders`;
      const res = await axios.get(url);
      setFolders(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (error) {
      console.error("폴더 조회 중 오류 발생:", error);
      toast("warn", "폴더 조회 중 오류가 발생했습니다.");
    }
  }, [values.folderId, toast]);

  const getSearchLinks = useCallback(async () => {
    try {
      const res = await axios.get(`/links?search=${searchTerm}`);
      setFilteredLinks(res.data.list || []);
    } catch (error) {
      console.error("링크 조회 중 오류 발생:", error);
      toast("warn", "링크 조회 중 오류가 발생했습니다.");
    }
  }, [searchTerm, toast]);

  const addLink = useCallback(async () => {
    const { folderId, url } = values;
    try {
      await axios.post(`/links`, { folderId, url });
      setValues((prevValues) => ({ ...prevValues, url: "" }));
      toast("info", "링크가 성공적으로 추가되었습니다.");
    } catch (error) {
      console.error("링크 추가 중 오류 발생:", error);
      toast("warn", "링크 추가 중 오류가 발생했습니다.");
    }
  }, [values, toast]);

  // useEffect(() => {
  //   if (searchTerm) {
  //     getSearchLinks();
  //   } else {
  //     getFolders();
  //   }
  // }, [searchTerm, getSearchLinks, getFolders]);

  return (
    <LinkContext.Provider
      value={{
        links,
        folders,
        filteredLinks,
        values,
        setValues,
        getFolders,
        addLink,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </LinkContext.Provider>
  );
};
