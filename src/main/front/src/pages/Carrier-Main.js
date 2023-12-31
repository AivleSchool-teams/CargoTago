import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Carrier-Main.module.css";

const CarrierMain = () => {
    const navigate = useNavigate();

    const onLogoClick = useCallback(() => {
        navigate('/Carrier/Main'); // 로고 클릭 시 '/' 경로로 이동합니다.
    }, [navigate]);

    const onListClick = useCallback(() => { // 화주 배차완료 리스트 페이지 이동
        navigate('/Carrier/Main');
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
                    <div className={styles.div3} >운송 현황</div>
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
                    <div className={styles.parent}>
                        <div className={styles.div7}>오늘도 좋은 하루 되세요!</div>
                        <div className={styles.div8}>000님, 안녕하세요!</div>
                    </div>
                </div>
                <div className={styles.rectangleGroup}>
                    <div className={styles.groupItem} />
                    <div className={styles.div3}>신규 등록????</div>
                    <img
                        className={styles.image12Icon}
                        alt=""
                        src="/images/image-12@2x.png"
                    />
                </div>
            </div>
            {/* 일반 배차 리스트 */}
            <div className={styles.group}>
                <div className={styles.div10}>일반 차량</div>
                <div className={styles.lineDiv} />

                {/* 배차 1개 */}
                <div className={styles.vectorContainer} >
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
            {/* AI 추천 배차 리스트 */}
            <div className={styles.groupContainer}>
                <div className={styles.container}>
                    <div className={styles.div23}>내 주변 차량</div>
                    <div className={styles.ellipseDiv} />
                    <div className={styles.groupChild3} />
                    <div className={styles.ai}>AI 추천</div>
                    <div className={styles.groupChild4} />
                    <div className={styles.div24}>?</div>
                    <div
                        className={styles.hoverIcon}
                        alt="">
                        <span className={styles.hoverIcon_text}>  AI 배차 추천은 생각중입니다. AI 배차 추천은 생각중입니다.</span><br/>
                        <span className={styles.hoverIcon_text}>  AI 배차 추천은 생각중입니다. </span>
                    </div>
                </div>

                {/* 배차 1개 */}
                <div className={styles.groupDiv} onClick={onListClick}>
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
                    <div className={styles.groupChild2} />
                </div>


            </div>
        </div>
    );
};
export default CarrierMain;