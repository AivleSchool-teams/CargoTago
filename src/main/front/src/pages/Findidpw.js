import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Findidpw.module.css";

const Findidpw = () => {
    const navigate = useNavigate();

    const onLogoClick = useCallback(() => {
        navigate('/'); // 로고 클릭 시 '/frame' 경로로 이동합니다.
    }, [navigate]);

    const onLoginClick = useCallback(() => {
        navigate('/Login'); // 로고 클릭 시 '/Join' 경로로 이동합니다
    }, [navigate]);



    return (
        <div className={styles.div}>
            <img
                className={styles.Login_logo}
                alt="logo"
                src="/images/logo.png"
                onClick={onLogoClick} />

            <p className={styles.div4}>
                <span className={styles.spanbr}>회원 가입시 입력하신 이메일 주소를 입력하시면,</span>
                <span className={styles.spanbr}>해당 이메일로 아이디 및 비밀번호 변경 링크를 </span>보내드립니다.
            </p>


            <input
                type="text" // 아이디 입력란이므로 type은 "text"를 사용합니다.
                className={styles.idbox}
                placeholder="이메일" // placeholder 속성으로 "아이디" 텍스트를 추가
            />
            <div className={styles.CenterDiv}>
                <div className={styles.left} onClick={onLoginClick}>
                    <div className={styles.leftinner} />
                    <div className={styles.leftbox}>취소</div>
                </div>
                <div className={styles.right}>
                    <div className={styles.rightinner} />
                    <div className={styles.rightbox}>계정 찾기</div>
                </div>
            </div>
            <div className={styles.lineDiv} />

        </div>
    );
};

export default Findidpw;