import {useCallback, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Join-Shipper3.module.css";


const JoinShipper3 = () => {

    const navigate = useNavigate();

    const onBackClick = useCallback(() => {
        navigate("/Shipper/2");
    }, [navigate]);


    const location = useLocation();
    const { inputId, inputPw } = location.state;


    const [inputCname, setInputCname] = useState("");
    const [inputHname, setInputHname] = useState("");
    const [inputHnumber, setInputHnumber] = useState("");

    const onBackClickLogin = useCallback(() => {
        navigate("/Login", { state: { inputId, inputPw, inputCname, inputHname, inputHnumber } });
        console.log("click login");
        console.log("Id : ", inputId);
        console.log("PW : ", inputPw);
        console.log("Cname : ", inputCname);
        console.log("Hname : ", inputHname);
        console.log("Hnumber : ", inputHnumber);
    }, [navigate, inputId, inputPw, inputCname, inputHname, inputHnumber]);
    const handleInputCname = (e) => {
        setInputCname(e.target.value);
    };

    const handleInputHname = (e) => {
        setInputHname(e.target.value);
    };

    const handleInputHnumber = (e) => {
        setInputHnumber(e.target.value);
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
                       value={inputHname}
                       onChange={handleInputHname}
                />

            </div>
            <div>
                <input type="text" className={styles.child4}
                       placeholder="사업자 등록 번호 *"
                       value={inputHnumber}
                       onChange={handleInputHnumber}
                />
            </div>
            <div>
                <input type="text" className={styles.child5}
                       placeholder="상호명 *"
                       value={inputCname}
                       onChange={handleInputCname}/>
            </div>
            <div>
                <input type="text" className={styles.child6}
                       placeholder="사업장 주소 *"/>
            </div>
            <div className={styles.child7}/>


            <div>
                <input type="text" className={styles.child8}
                       placeholder="계좌 등록 *"/>
            </div>

            <div className={styles.div12} onClick={onBackClickLogin}>등록</div>
            <div>
                <input type="text" className={styles.child9}
                       placeholder="사업자 등록증 *"/>
            </div>

            <img className={styles.rectangleIcon} alt="" src="/images/rectangle-23@2x.png"/>
            <div className={styles.div14}>인증</div>
            <img className={styles.child10} alt="" src="/images/rectangle-23@2x.png"/>
            <div className={styles.div15}>인증</div>
            <img className={styles.child11} alt="" src="/images/rectangle-23@2x.png"/>
            <div className={styles.div16}>인증</div>
        </div>
    );
};

export default JoinShipper3;
