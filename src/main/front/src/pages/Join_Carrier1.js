import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Join-Shipper1.module.css";

const JoinCarrier1 = () => {

    const [isAgreed0, setIsAgreed0] = useState(false);
    const [isAgreed1, setIsAgreed1] = useState(false); // 첫 번째 체크박스의 상태 변수
    const [isAgreed2, setIsAgreed2] = useState(false); // 두 번째 체크박스의 상태 변수
    const [isAgreed3, setIsAgreed3] = useState(false); // 세 번째 체크박스의 상태 변수
    const [isAgreed4, setIsAgreed4] = useState(false); // 세 번째 체크박스의 상태 변수
    const [isAgreed5, setIsAgreed5] = useState(false); // 세 번째 체크박스의 상태 변수
    const [isAllAgreed, setIsAllAgreed] = useState(false); // 모두 동의 체크박스의 상태 변수

    useEffect(() => {
        if (isAgreed0) {
            setIsAgreed1(true);
            setIsAgreed2(true);
            setIsAgreed3(true);
            setIsAgreed4(true);
            setIsAgreed5(true);
        } else {
            setIsAgreed1(false);
            setIsAgreed2(false);
            setIsAgreed3(false);
            setIsAgreed4(false);
            setIsAgreed5(false);
        }
    }, [isAgreed0]);



    const navigate = useNavigate();

    const onBackClick = useCallback(() => {
        navigate("/Joinmain");
    }, [navigate]);

    const onShipperJoinClick = useCallback(() => {
        if (isAgreed1 && isAgreed2 && isAgreed3) {
            navigate("/Carrier/2");
        } else {
            alert("필수 약관에 동의해야 합니다."); // 필수 약관에 동의하지 않은 경우 알림 표시
        }
    }, [navigate, isAgreed1, isAgreed2, isAgreed3]);

    const handleAgreementChange = useCallback(() => {
        setIsAllAgreed((prevState) => !prevState); // 모두 동의 체크박스 상태 토글
        // 다른 체크박스 상태를 모두 전체 동의 체크박스와 동일하게 설정
        setIsAgreed0((prevState) => !prevState);
        setIsAgreed1((prevState) => !prevState);
        setIsAgreed2((prevState) => !prevState);
        setIsAgreed3((prevState) => !prevState);
        setIsAgreed4((prevState) => !prevState);
        setIsAgreed5((prevState) => !prevState);
    }, []);

    const openPopup = useCallback(() => {
        // 팝업 창 열기
        window.open("/Carrier/3", "_blank", "width=600,height=400"); //여기 링크만 바꾸면됨
    }, []);

    const openPopup1 = useCallback(() => {
        // 팝업 창 열기
        window.open("/Carrier/3", "_blank", "width=600,height=400"); //여기 링크만 바꾸면됨
    }, []);

    const openPopup2 = useCallback(() => {
        // 팝업 창 열기
        window.open("/Carrier/3", "_blank", "width=600,height=400"); //여기 링크만 바꾸면됨
    }, []);


    return (
        <div className={styles.div}>
            <img
                className={styles.arrowIcon}
                onClick={onBackClick}
                alt=""
                src="/images/arrow-3@2x.png"
            />
            <div className={styles.div12}>화물타고</div>
            <div className={styles.div1}>
                <ul className={styles.ul}>
                    <li>계정 서비스 약관에 동의해주세요</li>
                </ul>
            </div>
            <div className={styles.child}/>
            <div className={styles.div2}>약관 동의</div>

            <div className={styles.div3}>
                <label>
                    <input
                        type="checkbox"
                        className={styles.frameChild}
                        checked={isAllAgreed}
                        onChange={handleAgreementChange}
                    />
                    모두 동의 합니다.
                </label>
            </div>

            <div className={styles.inner1}>
                <div className={styles.frameChild}/>
            </div>
            <div className={styles.inner}>
                <div className={styles.frameChild}/>
            </div>
            <div className={styles.item}/>
            <div className={styles.lineDiv}/>
            <div className={styles.child1}/>
            <div className={styles.child2}/>

            <div className={styles.div4}>
                <label>
                    <input
                        type="checkbox"
                        className={styles.frameChild}
                        checked={isAgreed1}
                        onChange={() => setIsAgreed1((prevState) => !prevState)}
                    />
                    [필수] 트럭타고 서비스 이용 약관 동의<span className={styles.popupText} onClick={openPopup}>
                    [약관]
                </span>
                </label>

            </div>

            <div className={styles.div5}>
                <label>
                    <input
                        type="checkbox"
                        className={styles.frameChild}
                        checked={isAgreed2}
                        onChange={() => setIsAgreed2((prevState) => !prevState)}
                    />
                    [필수] 개인 정보 수집 이용 동의<span className={styles.popupText} onClick={openPopup1}>
                    [약관]</span>

                </label>
            </div>

            <div className={styles.div6}>
                <label>
                    <input
                        type="checkbox"
                        className={styles.frameChild}
                        checked={isAgreed3}
                        onChange={() => setIsAgreed3((prevState) => !prevState)}
                    />
                    [필수] 개인 정보 제3자 제공에 관한 동의
                    <span className={styles.popupText} onClick={openPopup2}>
                        [약관]</span>
                </label>
            </div>

            <div className={styles.div7}>
                <label>
                    <input
                        type="checkbox"
                        className={styles.frameChild}
                        checked={isAgreed4}
                        onChange={() => setIsAgreed4((prevState) => !prevState)}
                    />
                    [선택] 마케팅 활용을 위한 개인정보 수집 및 이용 동의
                </label>
            </div>

            <div className={styles.div8}>
                <label>
                    <input
                        type="checkbox"
                        className={styles.frameChild}
                        checked={isAgreed5}
                        onChange={() => setIsAgreed5((prevState) => !prevState)}
                    />
                    [선택] 광고성 정보 수신 동의
                </label>
            </div>

            <img
                className={styles.arrowIcon}
                alt=""
                src="/images/arrow-2@2x.png"
            />
            <div className={styles.div9}>
                <p className={styles.p}>이용 약관 동의</p>
            </div>
            <div className={styles.div10}>신원 확인</div>
            <div className={styles.div11}>
                <p className={styles.p}>정보 등록</p>
            </div>
            <div className={styles.ellipseDiv}/>
            <div className={styles.child3}/>
            <b className={styles.b}>1</b>
            <div className={styles.child4}/>
            <b className={styles.b1}>3</b>
            <b className={styles.b2}>2</b>
            <div className={styles.child5}/>
            <div className={styles.child6}/>
            <div
                className={styles.rectangleParent}
                onClick={onShipperJoinClick}
            >
                <div className={styles.groupChild}/>
                <div className={styles.div13}>다음</div>
            </div>
        </div>
    );
};

export default JoinCarrier1;
