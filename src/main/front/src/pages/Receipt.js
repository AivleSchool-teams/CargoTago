import styles from "./Receipt.module.css";
import {useCallback, useState} from "react";
import { useNavigate } from "react-router-dom";

const AI = () => {
    const navigate = useNavigate();

    const onLogoClick = useCallback(() => {
        navigate('/'); // '화물 타고' 클릭 시 '/frame' 경로로 이동.
    }, [navigate]);

    return (
        <div className={styles.ai}>
            <img className={styles.aiChild} alt="" src="/images/rectangle-84@2x.png" />
            <div className={styles.groupParent}>
                <div className={styles.vectorParent}>
                    <img
                        className={styles.groupChild}
                        alt=""
                        src="/images/rectangle-19@2x.png"
                    />
                    <div className={styles.div}>돌아가기</div>
                </div>
                <div className={styles.vectorGroup}>
                    <img
                        className={styles.groupChild}
                        alt=""
                        src="/images/rectangle-20@2x.png"
                    />
                    <div className={styles.div1}>배차 신청</div>
                </div>
            </div>
            <div className={styles.div2}>등록시간 :</div>
            <div className={styles.groupContainer}>
                <div className={styles.groupDiv}>
                    <div className={styles.rectangleParent}>
                        <div className={styles.groupInner} />
                        <b className={styles.b}>배차완료</b>
                    </div>
                    <div className={styles.n0001}>N0001</div>
                </div>
                <div className={styles.lineDiv} />
                <div className={styles.groupChild1} />
            </div>
            <div className={styles.moa11Parent}>
                <img className={styles.moa11} onClick={onLogoClick} alt="" src="/images/moa-1-1@2x.png" />
                <img className={styles.arrowIcon} alt="" src="/images/arrow-3@2x.png" />
                <div className={styles.div3} > 인수증 </div>
            </div>
            <div className={styles.rectangleGroup}>
                <div className={styles.rectangleDiv} />
                <div className={styles.groupChild2} />
                <div className={styles.groupChild3} />
                <div className={styles.groupChild4} />
                <div className={styles.groupChild5} />
                <div className={styles.groupChild6} />
                <div className={styles.groupChild7} />
                <div className={styles.groupChild8} />
                <div className={styles.groupChild9} />
                <div className={styles.groupChild10} />
                <div className={styles.groupChild11} />
                <div className={styles.groupChild12} />
                <div className={styles.groupChild13} />
                <div className={styles.groupChild14} />
            </div>
            <div className={styles.rectangleContainer}>
                <div className={styles.groupChild15} />
                <div className={styles.groupChild16} />
                <div className={styles.groupChild17} />
                <div className={styles.groupChild12} />
                <div className={styles.groupChild19} />
                <div className={styles.groupChild11} />
                <div className={styles.groupChild21} />
                <div className={styles.groupChild14} />
            </div>
            <b className={styles.b1}>{`상차지 `}</b>
            <b className={styles.b2}>{`하차지  `}</b>
            <b className={styles.b3}>{`운송료 `}</b>
            <b className={styles.b4}>{`수수료 `}</b>
            <b className={styles.b5}>{`화물정보 `}</b>
            <b className={styles.b6}>{`결제방법  `}</b>
            <b className={styles.b7}>{`합계금액 `}</b>
            <b className={styles.b8}>{`톤수 `}</b>
            <b className={styles.b9}>{`차종 `}</b>
            <b className={styles.b10}>{`운행방법 `}</b>
            <b className={styles.b11}>{`적재중량 `}</b>
            <b className={styles.km}>71 km</b>
            <b className={styles.km1}>14 km</b>
            <b className={styles.b12}>{`경기 수원  `}</b>
            <b className={styles.b13}>1 톤</b>
            <b className={styles.b14}>{`인수증 `}</b>
            <b className={styles.b15}>70,000</b>
            <b className={styles.b16}>0</b>
            <b className={styles.b17}>70,000</b>
            <b className={styles.b18}>1 .1 톤</b>
            <b className={styles.b19}>윙바디</b>
            <b className={styles.b20}>{`편도 `}</b>
            <b className={styles.b21}>{`충남 아산 `}</b>
            <b className={styles.b22}>{`지금상 내일착 무게 `}</b>
        </div>
    );
};

export default AI;
