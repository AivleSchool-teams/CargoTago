import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Join_Carrier2.module.css";
import axios from 'axios';

const JoinCarrier2 = () => {
    const navigate = useNavigate();

    const onBackClick = useCallback(() => {
        navigate("/Carrier/1");
    }, [navigate]);

    const [inputName, setInputName] = useState("");
    const [inputPhone, setInputPhone] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPw, setInputPw] = useState("");
    const [inputTransportLicense, setInputTransportLicense] = useState("");
    const [inputPwConfirm, setInputPwConfirm] = useState(""); // 비밀번호 확인을 위한 상태 추가
    const [showPwMismatch, setShowPwMismatch] = useState(false); // 비밀번호 불일치 표시를 위한 상태 추가
    const [showPwError, setShowPwError] = useState(false); // 비밀번호 형식 오류 표시를 위한 상태 추가


    const handleInputName = (e) => {
        setInputName(e.target.value);
    };
    const handleInputPhone = (e) => {
        setInputPhone(e.target.value);
    };
// 이메일 형식 확인을 위한 상태 추가
    const [showEmailError, setShowEmailError] = useState(false);

// 이메일 핸들러 수정
    const handleInputEmail = (e) => {
        setInputEmail(e.target.value);
        const re = /\S+@\S+\.\S+/; // 이메일 형식을 확인하는 정규표현식
        if(!re.test(e.target.value)) { // 입력한 값이 이메일 형식이 아니면
            setShowEmailError(true); // 에러 메시지 보이기
        } else { // 이메일 형식이 맞으면
            setShowEmailError(false); // 에러 메시지 숨기기
        }
    };
    const handleInputPw = (e) => {
        setInputPw(e.target.value);
        const re = /^(?=.*[!@#])[a-zA-Z0-9!@#]{8,16}$/; // 비밀번호 형식을 확인하는 정규표현식
        if(!re.test(e.target.value)) { // 입력한 값이 비밀번호 형식이 아니면
            setShowPwError(true); // 에러 메시지 보이기
        } else { // 비밀번호 형식이 맞으면
            setShowPwError(false); // 에러 메시지 숨기기
        }
    };
    const handleInputPwConfirm = (e) => {
        setInputPwConfirm(e.target.value);
        if(e.target.value !== inputPw) {
            setShowPwMismatch(true);
        } else {
            setShowPwMismatch(false);
        }
    };
    const handleInputTransportLicense = (e) => {
        setInputTransportLicense(e.target.value);
    };

    const onGroupContainerClick = useCallback(() => {
        if (!inputName || !inputPhone || !inputEmail || !inputPw) { // 필수 입력값 확인
            alert("모든 필수 입력란을 채워주세요.");
            return;
        }

        if (inputPw !== inputPwConfirm) { // 비밀번호 불일치 확인
            setShowPwMismatch(true);
            return;
        }

        // 추가된 부분: 이메일 형식 확인
        const emailRe = /\S+@\S+\.\S+/; // 이메일 형식을 확인하는 정규표현식
        if(!emailRe.test(inputEmail)) {
            alert("올바른 이메일 형식을 입력해주세요.");
            return;
        }

        const pwRe = /^(?=.*[!@#])[a-zA-Z0-9!@#]{8,16}$/; // 비밀번호 형식을 확인하는규표현식
        if(!pwRe.test(inputPw)) {
            alert("비밀번호는 특수문자(!,@,#)를 포함하여 8~16자를 입력해주세요.");
            return;
        }

        navigate("/Carrier/3", { state: { inputName, inputPhone, inputEmail, inputPw, inputTransportLicense } });
        console.log("click Page2 to Page3");
        console.log("Name : ", inputName);
        console.log("Phone : ", inputPhone);
        console.log("Email : ", inputEmail);
        console.log("Pw : ", inputPw);
        console.log("TransportLicense : ", inputTransportLicense);
    }, [navigate, inputName, inputPhone, inputEmail, inputPw, inputPwConfirm, inputTransportLicense]);


    return (
        <div className={styles.div}>
            <div className={styles.div1}>
                <p className={styles.p}>회원가입을 위한</p>
                <p className={styles.p}>정보를 입력해 주세요.</p>
            </div>
            <b className={styles.b}></b>
            <div className={styles.div2}>
                <ul className={styles.ul}>
                    <li>필수입력 정보입니다.</li>
                </ul>
            </div>
            <div>
                <input type="text" className={styles.child}
                       placeholder="전화번호 *"
                       tabIndex={2}
                       value={inputPhone}
                       onChange={handleInputPhone}
                />
            </div>

            <div>
                <input type="text" className={styles.item}
                       placeholder="이메일 *"
                       tabIndex={3}
                       value={inputEmail}
                       onChange={handleInputEmail}
                />
            </div>

            <div>
                <input type="text" className={styles.inner}
                       placeholder="이름(실명) *"
                       tabIndex={1}
                       value={inputName}
                       onChange={handleInputName}
                />
            </div>
            <div className={styles.rectangleDiv}/>
            <div>
                <input type="text" className={styles.child1}
                       placeholder="화물운송 자격증 *"
                       value={inputTransportLicense}
                       tabIndex={6}
                       onChange={handleInputTransportLicense}
                />
            </div>

            <div>
                <input type="password" className={styles.rectangleDiv}
                       placeholder="비밀번호 *"
                       value={inputPw}
                       tabIndex={4}
                       onChange={handleInputPw}
                />

            </div>
            <div className={styles.rectangleParent} onClick={onGroupContainerClick}>
                <div className={styles.groupChild}/>
                <div className={styles.div8}>다음</div>
            </div>
            <div style={{display: showEmailError ? 'block' : 'none'}} className={styles.divemail}>
                올바른 이메일 형식을 입력해 주세요.
            </div>
            <div style={{display: showPwError ? 'block' : 'none'}} className={styles.div9}>
                비밀번호는 특수문자(!,@,#)를 포함하여 8~16자를 입력해 주세요.
            </div>
            <div>
                <input type="password" className={styles.child2}
                       tabIndex={5}
                       value={inputPwConfirm} // 비밀번호 확인 값 바인딩
                       onChange={handleInputPwConfirm} // 비밀번호 확인 핸들러 바인딩
                       placeholder="비밀번호 확인 *"/>
            </div>
            <div style={{display: showPwMismatch ? 'block' : 'none'}} className={styles.div131}>비밀번호가 다릅니다.</div>
            <div className={styles.div12}>- 까지 입력해 주세요.</div>

            <div className={styles.div13}>
                <p className={styles.p}>이용 약관 동의</p>
            </div>
            <div className={styles.div14}>신원 확인</div>
            <div className={styles.div15}>
                <p className={styles.p}>정보 등록</p>
            </div>
            <div className={styles.ellipseDiv}/>
            <div className={styles.child3}/>
            <b className={styles.b1}>1</b>
            <div className={styles.child4}/>
            <b className={styles.b2}>3</b>
            <b className={styles.b3}>2</b>
            <div className={styles.lineDiv}/>
            <div className={styles.child5}/>
            <img className={styles.arrowIcon} onClick={onBackClick} alt="" src="/images/arrow-3@2x.png"/>
            <div className={styles.div16}>화물타고</div>
            <img className={styles.rectangleIcon} alt="" src="/images/rectangle-23@2x.png"/>
            <div className={styles.div17}>인증</div>
            <img className={styles.child6} alt="" src="/images/rectangle-23@2x.png"/>
            <div className={styles.div18}>인증</div>
        </div>
    );
};

export default JoinCarrier2;
