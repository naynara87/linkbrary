import style from "./FolderList.module.scss";
import Button from "./Button";
import Icon from "./Icon";
import axios from "../../lib/axios";
import { useState, useEffect } from "react";
import Modal from "./Modal";

function FolderList() {
  const [values, setValues] = useState({ name: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function getFolders() {
    const res = await axios.get(`/folders`);
    console.log(res.data);
  }

  async function handleSubmitFolder(e) {
    // e.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    try {
      const res = await axios.post(`/folders`, { name: "test2" });
      console.log(res.data, "폴더구조");
      setIsModalOpen(false);
      getFolders();
      setValues({ name: "" }); // 폼 리셋
    } catch (error) {
      console.error("폴더 추가 중 오류 발생:", error);
    }
  }

  function handleAddFolder(e) {
    e.preventDefault();
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }
  useEffect(() => {
    getFolders();
  }, []);

  const modalContents = (
    <>
      <h5 className={style.modalTitle}>폴더 추가</h5>
      <form onSubmit={handleSubmitFolder}>
        <div className={style.inputGroup}>
          <input
            className={style.inputText}
            type="text"
            placeholder="내용 입력"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
          <Button type="submit" color="Primary" size="lg">
            추가하기
          </Button>
        </div>
      </form>
    </>
  );

  return (
    <div className={style.folderGroup}>
      <Button type="button" shape="Outline">
        전체
      </Button>
      <Button
        type="button"
        shape="Text"
        className="mlAuto"
        onClick={handleAddFolder}
      >
        폴더추가
        <Icon type="plus" />
      </Button>
      {isModalOpen && (
        <Modal closeModal={closeModal} modalContents={modalContents} />
      )}
    </div>
  );
}

export default FolderList;
