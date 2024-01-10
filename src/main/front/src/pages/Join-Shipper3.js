import {useCallback, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Join-Shipper3.module.css";
import axios from "axios";


const JoinShipper3 = () => {

    const navigate = useNavigate();

    const onBackClick = useCallback(() => {
        navigate("/Shipper/2");
    }, [navigate]);


    const location = useLocation();
    const { inputName, inputPhone, inputEmail, inputPw } = location.state;


    const [inputCname, setInputCname] = useState("");
    const [inputAccount, setInputAccount] = useState("");


    const onBackClickLogin = useCallback(() => {
        navigate("/Login", { state: { inputName, inputPhone, inputEmail, inputPw, inputCname, inputAccount } });
        console.log("click login");
        console.log("Name : ", inputName);
        console.log("Phone : ", inputPhone);
        console.log("Email : ", inputEmail);
        console.log("Pw : ", inputPw);
        console.log("Cname: ", inputCname);
        console.log("Account : ", inputAccount);

        axios
            .post('http://localhost:8080/auth/signup/shipper', {
                name: inputName,
                phone: inputPhone,
                email: inputEmail,
                pw: inputPw,
                cname: inputCname,
                account: inputAccount,
            })
            .then(response => {
                console.log(response.data);
                window.alert("사용자 등록이 성공적으로 완료되었습니다");
                navigate("/Login");
                {/*
                // 서버로부터의 응답에 따라 다른 메시지 설정
                if (response.data === 1) {
                    window.alert("사용자 등록이 성공적으로 완료되었습니다");
                    navigate("/Login");
                } else if (response.data === 0) {
                    window.alert("사용자 ID가 이미 존재합니다");
                }
                */}
            })
            .catch(error => {
                console.error("There was an error!", error);
                window.alert("등록 중 에러가 발생했습니다");
            });
    });

    const handleInputCname = (e) => {
        setInputCname(e.target.value);
    };

    const handleInputAccount = (e) => {
        setInputAccount(e.target.value);
    };

    return (
        <div className={styles.div}>
            <img className={styles.arrowIcon} onClick={onBackClick} alt="" src="/images/arrow-3@2x.png"/>
            <img className={styles.child} alt="" src="/images/rectangle-23@2x.png"/>
            <div className={styles.item}/>
            <div className={styles.div1}>화물타고</div>
            <div className={styles.centered}>
                <div className={styles.div2}>
                    <p className={styles.p}>이용 약관 동의</p>
                </div>
                <div className={styles.div3}>신원 확인</div>
                <div className={styles.div4}>
                    <p className={styles.p}>정보 등록</p>
                </div>
            </div>
            <div className={styles.ellipseDiv}/>
            <div className={styles.child1}/>
            <b className={styles.b}>1</b>
            <div className={styles.child2}/>
            <b className={styles.b1}>3</b>
            <b className={styles.b2}>2</b>
            <div className={styles.lineDiv}/>
            <div className={styles.child3}/>

            <div className={styles.div5}>
                <p className={styles.p}>서류 확인을 위한</p>
                <p className={styles.p}>정보를 입력해 주세요.</p>
            </div>
            <div className={styles.div6}>
                <ul className={styles.ul}>
                    <li>필수입력 정보입니다.</li>
                </ul>
            </div>
            <b className={styles.b3}></b>
            <div>
                <input type="text" className={styles.rectangleDiv}
                       placeholder="대표자명 *"
                       tabIndex={2}
                />

            </div>
            <div>
                <input type="text" className={styles.child4}
                       placeholder="사업자 등록 번호 *"
                       tabIndex={3}
                />
            </div>
            <div>
                <input type="text" className={styles.child5}
                       placeholder="상호명 *"
                       value={inputCname}
                       onChange={handleInputCname}
                       tabIndex={1}
                />

            </div>
            <div>
                <input type="text" className={styles.child6}
                       placeholder="사업장 주소 *"
                       tabIndex={4}
                />
            </div>
            <div className={styles.child7}/>


            <div>
                <input type="text" className={styles.child8}
                       tabIndex={6}
                       placeholder="계좌 등록 *"
                       value={inputAccount}
                       onChange={handleInputAccount}
                />
            </div>

            <div className={styles.div12} onClick={onBackClickLogin}>등록</div>
            {/*<div>*/}
            {/*    <input type="text" className={styles.child9}*/}
            {/*           tabIndex={5}*/}
            {/*           placeholder="사업자 등록증 *"/>*/}
            {/*</div>*/}

            <img className={styles.rectangleIcon} alt="" src="/images/rectangle-23@2x.png"/>
            <div className={styles.div14}>인증</div>
            <img className={styles.child11} alt="" src="/images/rectangle-23@2x.png"/>
            <div className={styles.div16}>인증</div>
        </div>
    );
};

export default JoinShipper3;
