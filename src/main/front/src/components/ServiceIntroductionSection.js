import styles from "./ServiceIntroductionSection.module.css";

const ServiceIntroductionSection = () => {
  return (
    <div className={styles.rectangleParent}>
      <div className={styles.groupChild} />
      <img className={styles.icon} alt="" src="/1-12@2x.png" />
      <div className={styles.fax020000000Container}>
        <p className={styles.p}>
          사업자 등록번호 : 000-00-00000 | 정보보호책임자 : 홍길동 |
          화물운송주선사업자 : 제2023-00호 | 화물운송사업자 : 제2023-00호
        </p>
        <p className={styles.fax}>
          통신판매업신고번호 : 제2023-서울000호 | 대표번호 : 02-000-0000 | FAX :
          02-000-0000 | aivle@cargotago.com
        </p>
      </div>
      <div className={styles.div}>서비스 소개</div>
      <div className={styles.ktAivleschoolAllRights}>
        ⓒ 2024. KT-AivleSchool All rights reserved.
      </div>
      <div className={styles.div1}>개인정보 처리방침</div>
      <div className={styles.div2}>이용약관</div>
      <div className={styles.div3}>운송약관</div>
    </div>
  );
};

export default ServiceIntroductionSection;
