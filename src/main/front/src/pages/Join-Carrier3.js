import {useCallback, useState} from "react";
import styles from "./Join-Carrier3.module.css";
import {useLocation, useNavigate} from "react-router-dom";
import axios from 'axios';

const JoinCarrier3 = () => {
    const navigate = useNavigate();

    const onGroupContainerClick = useCallback(() => {
        // Please sync "차주 마이페이지 > 화물차량등록페이지" to the project
    }, []);

    const onBackClick = useCallback(() => {
        navigate("/Carrier/2");
    }, [navigate]);


    const location = useLocation();
    const {inputName, inputPhone, inputEmail, inputPw, inputTransportLicense} = location.state;


    const [inputAccount, setInputAccount] = useState("");


    const onBackClickLogin = () => {
        console.log("click Page3 and Registration to Login");
        console.log("Name : ", inputName);
        console.log("Phone : ", inputPhone);
        console.log("Email : ", inputEmail);
        console.log("Pw : ", inputPw);
        console.log("CarLicense : ", inputTransportLicense);
        console.log("Account : ", inputAccount);

        axios
            .post('http://localhost:8080/auth/signup', {
                name: inputName,
                phone: inputPhone,
                email: inputEmail,
                pw: inputPw,
                transportlicense: inputTransportLicense,
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
    };

    const handleInputAccount = (e) => {
        setInputAccount(e.target.value);
    };

    return (
        <div className={styles.div}>
            <div className={styles.div1}>
                <p className={styles.p}>서류 확인을 위한</p>
                <p className={styles.p}>정보를 입력해 주세요.</p>
            </div>
            <div className={styles.div2}>
                <ul className={styles.ul}>
                    <li>필수입력 정보입니다.</li>
                </ul>
            </div>
            <div className={styles.div3}>
                <p className={styles.p}>이용 약관 동의</p>
            </div>
            <div className={styles.div4}>신원 확인</div>
            <div className={styles.div5}>
                <p className={styles.p}>정보 등록</p>
            </div>
            <div className={styles.child}/>
            <div className={styles.item}/>
            <b className={styles.b}>1</b>
            <div className={styles.inner}/>
            <b className={styles.b1}>3</b>
            <b className={styles.b2}>2</b>
            <div className={styles.lineDiv}/>
            <div className={styles.child1}/>
            <img className={styles.arrowIcon} onClick={onBackClick} alt="" src="/images/arrow-3@2x.png"/>
            <div className={styles.div6}>화물타고</div>
            <b className={styles.b3}></b>
            <div>
                <input type="text" className={styles.rectangleDiv}
                       placeholder="대표자명 *" />
            </div>
            <div>
                <input type="text" className={styles.child2}
                       placeholder="사업자 번호 *"/>
            </div>
            <div>
                <input type="text" className={styles.child3}
                       placeholder="상호명 *"/>
            </div>
            <div>
                <input type="text" className={styles.child4}
                       placeholder="사업장 주소 *"/>
            </div>

            <div>
                <input type="text" className={styles.child5}
                       placeholder="계좌 등록 *"
                       value={inputAccount}
                       onChange={handleInputAccount}
                />
            </div>


            <div className={styles.rectangleParent} onClick={onBackClickLogin}>
                <div className={styles.groupChild}/>
                <div className={styles.div12}>등록</div>
            </div>
            <div>
                <input type="text" className={styles.child6}
                       placeholder="사업자 등록증 *"/>
            </div>

            <img className={styles.rectangleIcon} alt="" src="/images/rectangle-23@2x.png"/>
            <img className={styles.child7} alt="" src="/images/rectangle-23@2x.png"/>
            <div className={styles.div14}>인증</div>
            <div className={styles.div15}>인증</div>
        </div>
    );
};

export default JoinCarrier3;
