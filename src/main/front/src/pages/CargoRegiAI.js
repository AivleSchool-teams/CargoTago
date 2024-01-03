import styles from "./CargoRegiAI.module.css";
import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const CargoRegiAI = () => {

    const navigate = useNavigate();
    //
    const onBackClick = useCallback(() => {
        navigate('/CargoRegi'); // 로고 클릭 시 '/' 경로로 이동합니다.
    }, [navigate]);

    return (
        <div className={styles.ai}>
            <div className={styles.vectorParent}>
                <img
                    className={styles.groupChild}
                    onClick={onBackClick}
                    alt=""
                    src="/images/arrow-3@2x.png"
                />
                <div className={styles.div}>화물 접수</div>
            </div>

            <div className={styles.aiChild}>
                {/*이 부분이 지도 길찾기 API 들어갈 부분임다!*/}
            </div>

            <div className={styles.rectangleParent}>
                <div className={styles.groupItem} />
                <button className={styles.div1}><span className={styles.divspan}>등록하기</span></button>
                <div className={styles.vectorGroup}>
                    <img
                        className={styles.groupInner}
                        alt=""
                        src="/images/rectangle-62@2x.png"
                    />
                    <div className={styles.div2}>총 거리</div>
                    <div className={styles.km}>60.5 km</div>
                    <div className={styles.div3}>1시간 30분</div>
                    <div className={styles.div4}>392,000 원</div>
                    <div className={styles.div5}> 원</div>
                    <div className={styles.div6}>소요 시간</div>
                    <div className={styles.ai1}>AI 최적 운임</div>
                    <div className={styles.div7}>최종 운임료</div>
                    <img className={styles.lineIcon} alt="" src="/images/line-12@2x.png" />
                    <div className={styles.lineDiv} />
                    <div className={styles.groupChild1} />
                </div>
            </div>
        </div>
    );
};

export default CargoRegiAI;
