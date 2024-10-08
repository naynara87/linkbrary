import { useState, useCallback } from "react";
import axios from "../lib/axios";
import { useModal } from "../contexts/ModalProvider";
import { useToaster } from "../contexts/ToasterProvider";

export const useAddLink = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const { closeModal } = useModal();
  const toast = useToaster();

  const onAddLinkSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { folderId, url } = values;

      if (!url || url.length === 0) {
        toast("warn", "링크를 입력하세요.");
        return;
      }

      try {
        await axios.post(`/links`, { folderId, url });
        setValues({ folderId: folderId, url: "" });
        toast("info", "링크가 성공적으로 추가되었습니다.");
      } catch (error) {
        console.error("링크 추가 중 오류 발생:", error);
        toast("warn", "링크 추가 중 오류가 발생했습니다.");
      } finally {
        closeModal();
      }
    },
    [values, closeModal]
  );

  return {
    values,
    setValues,
    onAddLinkSubmit,
  };
};
