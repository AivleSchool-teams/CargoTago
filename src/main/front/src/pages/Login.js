import {useCallback, useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import axios from "axios";

const Login = () => {

    const navigate = useNavigate();

    const [inputEmail, setInputEmail] = useState("");
    const [inputPw, setInputPw] = useState("");


    const handleInputEmail = (e) => {
        setInputEmail(e.target.value);
    };
    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    };

    const onLogoClick = useCallback(() => {
        navigate('/'); // 로고 클릭 시 '/frame' 경로로 이동합니다.
    }, [navigate]);

    const onJoinmainClick = useCallback(() => {
        navigate('/Joinmain'); // 로고 클릭 시 '/Join' 경로로 이동합니다
    }, [navigate]);

    const onFindidpwClick = useCallback(() => {
        navigate('/Joinmain/Findidpw'); // 로고 클릭 시 '/FindIDPW' 경로로 이동합니다
    }, [navigate]);

    const onLoginClick = () => {
        console.log("click Login to UserPage !");
        console.log("Email : ", inputEmail);
        console.log("Pw : ", inputPw);

        axios
            .post('http://localhost:8080/auth/signin', {
                email: inputEmail,
                pw: inputPw,
            })
            .then(res => {
                console.log(res.data);

                if (res.data.token) {
                    localStorage.setItem('jwt-token', res.data.token)
                    const token = localStorage.getItem('jwt-token')
                    axios
                        .get('http://localhost:8080/user/mainpage', {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        .then(response => {
                            window.alert('로그인 성공!')

                            if (res.data.typed === "Carrier") {
                                navigate("/Carrier/main");
                            } else if (res.data.typed === "Shipper") {
                                navigate("/Shipper/main");
                            }

                        })
                        .catch(error => {
                            console.error("There was an error!", error);
                            window.alert("로그인 중 에러가 발생했습니다");
                        })

                    }
                })
            .catch(error => {
                console.error("There was an error!", error);
                window.alert("로그인 중 에러가 발생했습니다");
            });




    }


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
                placeholder="이메일" // placeholder 속성으로 "아이디" 텍스트를 추가
                value={inputEmail}
                onChange={handleInputEmail}
            />

            <input
                type="password" // 비밀번호 입력란이므로 type은 "password"를 사용하여 입력 내용을 가립니다.
                className={styles.pwbox}
                placeholder="비밀번호" // placeholder 속성으로 "비밀번호" 텍스트를 추가
                value={inputPw}
                onChange={handleInputPw}
            />
            <div className={styles.inner}/>
            <div className={styles.div1} onClick={onLoginClick} >로그인
                <div className={styles.findidpw} onClick={onFindidpwClick}>
                    <span className={styles.findspan}>아이디/비밀번호</span>
                    <span>{`  찾기 `}</span>
                </div>
            </div>

            <div className={styles.lineDiv} />
            <div className={styles.div4} onClick={onJoinmainClick}>
                <span>{`계정이 없으신가요? `}</span>
                <span className={styles.span} >가입하기</span>
            </div>

        </div>
    );
};

export default Login;