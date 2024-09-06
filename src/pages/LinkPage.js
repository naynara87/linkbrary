import styles from "./LinkPage.module.scss";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LinkPage() {
  const { user } = useAuth(true);
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  // async function getMyLinks() {
  //   const res = await axios.get("/links");
  //   const nextLinks = res.data;
  //   setLinks(nextLinks);
  // }
  function handleEditClick(linkId) {
    navigate(`/links/${linkId}`);
  }

  // function handleDeleteClick(linkId) {
  //   axios.delete(`/links/${linkId}`);
  //   setLinks((prevLinks) => prevLinks.filter((link) => link.id !== linkId));
  // }

  // useEffect(() => {
  //   getMyLinks();
  // }, []);

  if (!user) {
    return null;
  }

  return (
    <>
      <section className={styles.linkHeader}>
        <form className={styles.linkInputGroup}>
          <input
            className={styles.inputText}
            type="text"
            placeholder="링크를 추가해 보세요"
          />
          <Button type="submit" size="sm" color="Primary">
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
        <div className={styles.categoryGroup}>
          <Button type="button" shape="Outline">
            전체
          </Button>
          <Button type="button" shape="Text" className="mlAuto">
            폴더추가
            <Icon type="plus" />
          </Button>
        </div>
      </section>
    </>
  );
}

export default LinkPage;
