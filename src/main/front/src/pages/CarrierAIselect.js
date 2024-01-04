import {useCallback, useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CarrierAIselect.module.css";

const AI = () => {
    const navigate = useNavigate();

    const onLogoClick = useCallback(() => {
        navigate('/'); // '화물 타고' 클릭 시 '/frame' 경로로 이동.
    }, [navigate]);

    return (
        <div className={styles.ai}>
            <div className={styles.div}>
                <img className={styles.child} alt="" src="/images/rectangle-60@2x.png" />
                <div className={styles.div1}>다음</div>
                <div className={styles.item} />
                <div className={styles.rectangleParent}>
                    <div className={styles.groupChild} />
                    <div className={styles.kt}>KT 본사</div>
                    <div className={styles.kt1}>경기 성남시 분당구 불정로 90 KT빌딩</div>
                    <div className={styles.div2}>세부 주소</div>
                    <div className={styles.div3}>홍길동</div>
                    <div className={styles.groupItem} />
                    <div className={styles.div4}>010-1234-5678</div>
                    <div className={styles.div5}>
                        <span>{`출발지 주소 `}</span>
                        <span className={styles.span}>*</span>
                    </div>
                    <div className={styles.div6}>09 : 00</div>
                    <div className={styles.div7}>2023.12.20</div>
                </div>
                <div className={styles.rectangleGroup}>
                    <div className={styles.groupInner} />
                    <div className={styles.div8}>예상 시간</div>
                    <div className={styles.rectangleDiv} />
                    <div className={styles.rectangleContainer}>
                        <div className={styles.groupChild1} />
                        <div className={styles.div9}>{`총 소요시간 `}</div>
                        <div className={styles.div10}>06:00</div>
                        <div className={styles.lineDiv} />
                    </div>
                    <div className={styles.groupDiv}>
                        <div className={styles.groupChild1} />
                        <div className={styles.div11}>예상 운전 시간</div>
                        <div className={styles.div10}>03:00</div>
                        <div className={styles.lineDiv} />
                    </div>
                    <div className={styles.rectangleParent1}>
                        <div className={styles.groupChild1} />
                        <div className={styles.div13}>총 운송비</div>
                        <div className={styles.div14}>80,000 원</div>
                        <div className={styles.lineDiv} />
                    </div>
                </div>
                <div className={styles.rectangleParent2}>
                    <div className={styles.groupChild} />
                    <div className={styles.kt}>KT 본사</div>
                    <div className={styles.kt1}>경기 성남시 분당구 불정로 90 KT빌딩</div>
                    <div className={styles.div2}>세부 주소</div>
                    <div className={styles.div3}>홍길동</div>
                    <div className={styles.groupItem} />
                    <div className={styles.div4}>010-1234-5678</div>
                    <div className={styles.div5}>
                        <span>{`도착지 주소 `}</span>
                        <span className={styles.span}>*</span>
                    </div>
                    <div className={styles.div6}>12 : 00</div>
                    <div className={styles.div7}>2023.12.20</div>
                </div>
                <div className={styles.div21}>주문 정보</div>
                <div className={styles.rectangleParent3}>
                    <div className={styles.groupChild8} />
                    <div className={styles.div22}>취소</div>
                    <div className={styles.groupChild9} />
                    <div className={styles.div23}>승인</div>
                </div>
            </div>
            <div className={styles.vParent}>
                <div className={styles.div24}>화물 접수</div>
                <img className={styles.aiChild} alt="" src="/images/arrow-3@2x.png" />
                <img className={styles.moa11} onClick={onLogoClick} alt=""  src="/images/moa-1-1@2x.png" />
            </div>
        </div>
    );
};

export default AI;
