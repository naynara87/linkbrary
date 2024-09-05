import Button from "../components/ui/Button";
import styles from "./HomePage.module.scss";
import mainImg from "../styles/images/landing/banner.png";
import infoImg1 from "../styles/images/landing/img1.png";
import infoImg2 from "../styles/images/landing/img2.png";
import infoImg3 from "../styles/images/landing/img3.png";
import infoImg4 from "../styles/images/landing/img4.png";

function HomePage() {
  return (
    <>
      <section className={styles.topBanner}>
        <h2 className={styles.title}>
          <em>세상의 모든 정보</em>를<br />
          쉽게 저장하고
          <br />
          관리해 보세요
        </h2>
        <Button
          className="mxAuto"
          size="Lg"
          color="Primary"
          type="button"
          style={{ width: "300px" }}
        >
          링크 추가하기
        </Button>
        <div className={styles.imgContainer}>
          <img src={mainImg} alt="메인이미지" />
        </div>
      </section>
      <section className={styles.serviceInfo}>
        <div className={styles.infoWrap}>
          <div className={styles.infoText}>
            <h3>
              <em className={styles.point1}>원하는 링크</em>를<br />
              저장하세요
            </h3>
            <p>
              나중에 읽고 싶은 글, 다시 보고 싶은 영상,
              <br />
              사고 싶은 옷, 기억하고 싶은 모든 것을
              <br />한 공간에 저장하세요.
            </p>
          </div>
          <div className={styles.infoImg}>
            <img src={infoImg1} alt="이미지1" />
          </div>
        </div>
        <div className={`${styles.infoWrap} ${styles.reverse}`}>
          <div className={styles.infoText}>
            <h3>
              링크를 폴더로
              <br />
              <em className={styles.point2}>관리</em>하세요
            </h3>
            <p>
              나만의 폴더를 무제한으로 만들고
              <br />
              다양하게 활용할 수 있습니다.
            </p>
          </div>
          <div className={styles.infoImg}>
            <img src={infoImg2} alt="이미지2" />
          </div>
        </div>
        <div className={styles.infoWrap}>
          <div className={styles.infoText}>
            <h3>
              저장한 링크를
              <br />
              <em className={styles.point3}>공유</em>해 보세요
            </h3>
            <p>
              여러 링크를 폴더에 담고 공유할 수<br />
              있습니다. 가족, 친구, 동료들에게 쉽고
              <br />
              빠르게 링크를 공유해 보세요.
            </p>
          </div>
          <div className={styles.infoImg}>
            <img src={infoImg3} alt="이미지3" />
          </div>
        </div>
        <div className={`${styles.infoWrap} ${styles.reverse}`}>
          <div className={styles.infoText}>
            <h3>
              저장한 링크를
              <br />
              <em className={styles.point4}>검색</em>해 보세요
            </h3>
            <p>
              중요한 정보들을 검색으로 쉽게
              <br />
              찾아보세요.
            </p>
          </div>
          <div className={styles.infoImg}>
            <img src={infoImg4} alt="이미지4" />
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
