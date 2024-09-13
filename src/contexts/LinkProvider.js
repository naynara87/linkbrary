import { createContext, useState, useContext } from "react";
import axios from "../lib/axios";

const LinkContext = createContext();

export function LinkProvider({ children }) {
  const [folders, setFolders] = useState([]);
  const [idFolders, setIdFolders] = useState([]);
  const [folderName, setFolderName] = useState("");

  const fetchFolders = async () => {
    try {
      const res = await axios.get("/folders");
      setFolders(res.data);
      console.log("다시 조회");
    } catch (error) {
      console.error("폴더 조회 중 오류 발생:", error);
    }
  };
  const fetchFolderById = async (folderId) => {
    try {
      const res = await axios.get(`/folders/${folderId}`);
      setIdFolders([res.data]);
      setFolderName(res.data.name);
      console.log("폴더 아이디 조회");
    } catch (error) {
      console.error("특정 폴더 조회 중 오류 발생:", error);
    }
  };

  const deleteFolderById = async (folderId) => {
    try {
      await axios.delete(`/folders/${folderId}`);
      await fetchFolderById(folderId);
    } catch (error) {
      console.error("폴더 삭제 중 오류 발생:", error);
    }
  };

  const deleteLinkById = async (linkId) => {
    try {
      await axios.delete(`/links/${linkId}`);
    } catch (error) {
      console.error("링크 삭제 중 오류 발생:", error);
      throw error;
    }
  };

  return (
    <LinkContext.Provider
      value={{
        folders,
        idFolders,
        folderName,
        fetchFolders,
        fetchFolderById,
        deleteFolderById,
        deleteLinkById,
      }}
    >
      {children}
    </LinkContext.Provider>
  );
}

export const useLink = () => {
  return useContext(LinkContext);
};
