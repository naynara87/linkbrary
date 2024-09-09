import styles from "./LinkPage.module.scss";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import axios from "../lib/axios";
import { useAuth } from "../contexts/AuthProvider";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardGroup from "../components/ui/CardGroup";
import Pagination from "../components/ui/Pagination";
import FolderList from "../components/ui/FolderList";

function LinkPage() {
  const { user } = useAuth(true);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    folderId: "",
    url: "",
  });
  const params = useParams();
  const linkId = params.id;

  async function handleSubmit(e) {
    e.preventDefault();
    const { folderId, url } = values;
    await axios.post(`/links`, {
      folderId: "1",
      url: "https://www.youtube.com/",
    });
    setValues({ folderId: "", url: "" });
  }

  async function getLink() {
    const res = await axios.get(`/links`);
    console.log(res.data, "data");
    console.log(res.data.list, "리스트");
    const { folderId, url } = res.data.list;
    setValues({ folderId, url });
  }

  useEffect(() => {
    getLink();
    if (!user) {
      // navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <section className={styles.linkHeader}>
        <form className={styles.linkInputGroup} onSubmit={handleSubmit}>
          <input
            className={styles.inputText}
            type="text"
            placeholder="링크를 추가해 보세요"
          />
          <Button
            type="submit"
            size="sm"
            color="Primary"
            aria-label="즐겨찾기 버튼"
          >
            추가하기
          </Button>
        </form>
      </section>
      <section className={styles.linkContents}>
        <form className={styles.linkSearchGroup}>
          <input
            className={styles.linkSearch}
            placeholder="링크를 검색해 보세요."
          />
        </form>
        <FolderList />
        <CardGroup />
        <Pagination />
      </section>
    </>
  );
}

export default LinkPage;
