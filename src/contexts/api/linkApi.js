import axios from "../../lib/axios";

// 폴더 영역

// 폴더 조회하기
export const getFolders = async () => {
  const response = await axios.get("/folders");
  return response.data;
};

// 폴더 추가하기
export const createFolder = async (folderData) => {
  const response = await axios.post("/folders", folderData);
  return response.data;
};

// 특정 폴더 조회하기
export const getFolderById = async (folderId) => {
  const response = await axios.get(`/folders/${folderId}`);
  return response.data;
};

// 특정 폴더 삭제하기
export const deleteFolderById = async (folderId) => {
  await axios.delete(`/folders/${folderId}`);
};

// 특정 폴더 수정하기
export const updateFolderById = async (folderId, folderData) => {
  const response = await axios.put(`/folders/${folderId}`, folderData);
  return response.data;
};

// 링크 영역

// 폴더 내부 링크 조회하기
export const getLinks = async (folderId) => {
  const response = await axios.get(`/folders/${folderId}/links`);
  return response.data;
};

// 링크 추가하기
export const createLink = async (linkData) => {
  const response = await axios.post("/links", linkData);
  return response.data;
};

// 특정 링크 정보 조회하기
export const getLinkById = async (linkId) => {
  const response = await axios.get(`/links/${linkId}`);
  return response.data;
};

// 즐겨찾기 링크 가져오기
export const getFavoriteLinks = async () => {
  const response = await axios.get("/favorites");
  return response.data;
};

// 특정 링크 수정하기
export const updateLink = async (linkId, linkData) => {
  const response = await axios.put(`/links/${linkId}`, linkData);
  return response.data;
};

// 특정 링크 삭제하기
export const deleteLink = async (linkId) => {
  await axios.delete(`/links/${linkId}`);
};

// 링크 즐겨찾기 상태 수정하기
export const toggleFavoriteLink = async (linkId, favorite) => {
  const response = await axios.put(`/links/${linkId}/favorite`, { favorite });
  return response.data;
};
