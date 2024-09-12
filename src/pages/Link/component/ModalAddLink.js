import React from "react";
import styles from "./ModalAddLink.module.scss";
import Button from "../../components/ui/Button";
import { useModal } from "../../../contexts/ModalProvider";

const ModalAddLink = ({ url, modalFolders, onAddLinkSubmit }) => {
  const { openModal, closeModal } = useModal();
  return (
    <form onSubmit={onAddLinkSubmit}>
      <div className={styles.inputGroup}>
        <p className={styles.subTitle}>{url}</p>
        <ul>
          {modalFolders.map((folder) => (
            <li key={folder.id}>
              <label>
                <span>{folder.name}</span>
                <span>{folder.id}개 링크</span>
                <input name="folder" type="radio" />
              </label>
            </li>
          ))}
        </ul>
        <Button type="submit" color="Primary" size="lg">
          추가하기
        </Button>
      </div>
    </form>
  );
};

export default ModalAddLink;
