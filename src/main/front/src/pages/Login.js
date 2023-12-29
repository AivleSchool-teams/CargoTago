import {useCallback, useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
    const navigate = useNavigate();

    const [inputEmail, setInputEmail] = useState("");
    const [inputPw, setInputPw] = useState("");


    const onLogoClick = useCallback(() => {
        navigate('/'); // 로고 클릭 시 '/frame' 경로로 이동합니다.
    }, [navigate]);

    const onJoinmainClick = useCallback(() => {
        navigate('/Joinmain'); // 로고 클릭 시 '/Join' 경로로 이동합니다
    }, [navigate]);

    const onFindidpwClick = useCallback(() => {
        navigate('/Joinmain/Findidpw'); // 로고 클릭 시 '/FindIDPW' 경로로 이동합니다
    }, [navigate]);
    {/*
    const onLoginClick = () => {
        console.log("click Login to UserPage !");
        console.log("Email : ", inputEmail);
        console.log("Pw : ", inputPw);

        axios
            .post('http://localhost:8080/api/user/login', {
                email: inputEmail,
                pw: inputPw,
            })
            .then((res => {

            })
        navigate('/user/page');
    }, [navigate]);
    */}

    return (
        <div className={styles.div}>
            <img
                className={styles.Login_logo}
                alt="logo"
                src="/images/logo.png"
                onClick={onLogoClick} />
            <input
                type="text" // 아이디 입력란이므로 type은 "text"를 사용합니다.
                className={styles.idbox}
                placeholder="아이디" // placeholder 속성으로 "아이디" 텍스트를 추가
            />

            <input
                type="password" // 비밀번호 입력란이므로 type은 "password"를 사용하여 입력 내용을 가립니다.
                className={styles.pwbox}
                placeholder="비밀번호" // placeholder 속성으로 "비밀번호" 텍스트를 추가
            />
            <div className={styles.inner} />
            <div className={styles.div1}>로그인
                <div className={styles.findidpw} onClick={onFindidpwClick}>
                    <span className={styles.findspan}>아이디/비밀번호</span>
                    <span>{`  찾기 `}</span>
                </div>
            </div>

            <div className={styles.lineDiv} />
            <div className={styles.div4} onClick={onJoinmainClick}>
                <span>{`계정이 없으신가요? `}</span>
                <span className={styles.span}>가입하기</span>
            </div>

        </div>
    );
};

export default Login;