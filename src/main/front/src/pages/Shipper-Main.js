import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Shipper-Main.module.css";
import axios from "axios";

const ShipperMain = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('jwt-token');
        if (!token) {
            // 토큰이 없으면 로그인 페이지로 리디렉션
            navigate('/login');
            console.log('비정상적인 접근입니다.')
        } else {
            axios.get('http://localhost:8080/user/mainpage', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    // 사용자 이름 표시
                    console.log('안녕하세요,', response.data.name, '님?');
                    setUsername(response.data.name);
                    console.log(username);
                })
                .catch(error => {
                    // 오류 처리
                    console.error('비정상적인 접근입니다.', error);
                });
        }
    }, [navigate, username]);


    const onLogoClick = useCallback(() => {
        navigate('/Shipper/Main'); // 로고 클릭 시 '/' 경로로 이동합니다.
    }, [navigate]);

    const onListClick = useCallback(() => { // 화주 배차완료 리스트 페이지 이동
        navigate("/Shipper/List");
    }, [navigate]);

    const onDetailClick = useCallback(() => { // 화주 배차완료 리스트 페이지 이동
        navigate("/Shipper/Detail");
    }, [navigate]);

    const onCargoRegi = useCallback(() => {
        navigate('/CargoRegi'); // 로고 클릭 시 '/FindIDPW' 경로로 이동합니다
    }, [navigate]);

    return (
        <div className={styles.div}>
            <div className={styles.center}>
                <div className={styles.vectorParent}>
                    <img
                        className={styles.groupChild}
                        alt=""
                        src="/images/rectangle-10@2x.png"
                    />
                    <button className={styles.div2}>마이 페이지</button>
                </div>
                <img className={styles.moa11} alt="" src="/images/moa-1-1@2x.png" />
            </div>
            <div className={styles.groupParent}>
                <div className={styles.rectangleParent} onClick={onListClick}>
                    <div className={styles.groupItem} />
                    <div className={styles.div3} >배차 현황</div>
                    <img
                        className={styles.image11Icon}
                        alt=""
                        src="/images/image-11@2x.png"
                    />
                </div>
                <div className={styles.vectorGroup}>
                    <img
                        className={styles.groupInner}
                        alt=""
                        src="/images/rectangle-15@2x.png"
                    />
                    <div className={styles.div4}>주문 -건</div>
                    <div className={styles.div5}>배차 -건</div>
                    <div className={styles.div6}>완료 -건</div>
                    <div className={styles.parent}>
                        <div className={styles.div7}>오늘도 좋은 하루 되세요!</div>
                        <div className={styles.div8}>{username}님, 안녕하세요!</div>
                    </div>
                </div>
                <div className={styles.rectangleGroup} onClick={onCargoRegi}>
                    <div className={styles.groupItem} />
                    <div className={styles.div3}>배차 등록</div>
                    <img
                        className={styles.image12Icon}
                        alt=""
                        src="/images/image-12@2x.png"
                    />
                </div>
            </div>
            {/* AI 추천 배차 리스트 */}
            <div className={styles.groupContainer}>
                <div className={styles.container}>
                    <div className={styles.div23}>배차 현황</div>
                    <div className={styles.ellipseDiv} />
                    <div className={styles.groupChild3} />
                </div>

                {/* 배차 1개 */}
                <div className={styles.groupDiv} onClick={onDetailClick}>
                    <img
                        className={styles.rectangleIcon}
                        alt=""
                        src="/images/rectangle-57@2x.png"
                    />
                    <div className={styles.div11}>
                        <p className={styles.p}>경기 김포시 양촌</p>
                    </div>
                    <div className={styles.div12}>서울 강동 동남로</div>
                    <div className={styles.div13}>{`11톤 | 윙바디 | `}</div>
                    <div className={styles.km}>17 km</div>
                    <div className={styles.div14}>335,000 원</div>
                    <img
                        className={styles.image13Icon}
                        alt=""
                        src="/images/image-13@2x.png"
                    />
                    <div className={styles.div15}>
                        <span>{`출발지 주소 `}</span>
                        <span className={styles.span}>*</span>
                    </div>
                    <div className={styles.div16}>
                        <span>{`도착지 주소 `}</span>
                        <span className={styles.span}>*</span>
                    </div>
                </div>


            </div>
        </div>
    );
};
export default ShipperMain;
