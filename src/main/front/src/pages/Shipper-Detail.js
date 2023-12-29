import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Shipper-Detail.module.css";

const ShipperDetail = () => {
    const navigate = useNavigate();

    const onLogoClick = useCallback(() => {
        navigate('/Shipper/Main'); // 로고 클릭 시 '/' 경로로 이동합니다.
    }, [navigate]);

    const onBackClick = useCallback(() => { // 화주 메인페이지로 링크 변경 해야함.
        navigate("/Shipper/List");
    }, [navigate]);

    return (
        <div className={styles.div}>
            <div className={styles.div1}>
                <img
                    className={styles.child}
                    alt=""
                    src="/images/rectangle-58@2x.png"
                />
                <div className={styles.startloc}>
                    <div className={styles.kt}>KT 본사</div>
                    <div className={styles.kt1}>경기 성남시 분당구 불정로 90 KT빌딩</div>
                    <div className={styles.div2}>세부 주소</div>
                    <div className={styles.div3}>2023.12.28 09:00</div>
                </div>
                <div className={styles.endloc}>
                    <div className={styles.kt2}>KT 본사</div>
                    <div className={styles.kt3}>경기 성남시 분당구 불정로 90 KT빌딩</div>
                    <div className={styles.div4}>세부 주소</div>
                    <div className={styles.div5}>2023.12.28 12:00</div>
                </div>
                <div className={styles.div6}>
                  <span className={styles.txt}>
                    <ul className={styles.ul}>
                      <li>주문 유형</li>
                    </ul>
                  </span>
                        </div>
                        <div className={styles.div7}>
                  <span className={styles.txt}>
                    <ul className={styles.ul}>
                      <li>출발지 정보</li>
                    </ul>
                  </span>
                        </div>
                        <div className={styles.div8}>
                  <span className={styles.txt}>
                    <ul className={styles.ul}>
                      <li>도착지 정보</li>
                    </ul>
                  </span>
                        </div>
                        <div className={styles.div9}>
                  <span className={styles.txt}>
                    <ul className={styles.ul}>
                      <li>요청 정보</li>
                    </ul>
                  </span>
                        </div>
                        <div className={styles.div10}>
                  <span className={styles.txt}>
                    <ul className={styles.ul}>
                      <li>화물 정보</li>
                    </ul>
                  </span>
                        </div>
                        <div className={styles.div11}>
                  <span className={styles.txt}>
                    <ul className={styles.ul}>
                      <li>결제 정보</li>
                    </ul>
                  </span>
                </div>
                <div className={styles.div12}>1톤 카고</div>
                <div className={styles.cm15kg}>
                    박스 | 중형 120cm/15kg 이하 | 40 개 | 1.1 톤
                </div>
                <div className={styles.div13}>{`세부사항 : `}</div>
                <div className={styles.div14}>
                    {`계좌번호 :   `}
                    <span className={styles.span}>홍길동 국민 620000-00-000000</span>
                </div>
                <div className={styles.div15}>80,000 원</div>
                <div className={styles.div16}>편도</div>
                <div className={styles.div17}>접수 상세 정보</div>
                <div className={styles.item} />
                <div className={styles.inner} />
            </div>
            <div className={styles.div18}>
                <img
                    className={styles.rectangleIcon}
                    alt=""
                    src="/images/rectangle-57@2x.png"
                />
                <div className={styles.div19}>
                    <div className={styles.div20}>화물 현황</div>
                    <div className={styles.rectangleParent}>
                        <div className={styles.groupChild} />
                        <div className={styles.xxxXxxx}>차량번호 : 서울 XXX XXXX</div>
                        <div className={styles.div21}>차주명 : 홍길동</div>
                        <div className={styles.div22}>연락처 : 010-1234-5678</div>
                    </div>
                    <div className={styles.lineDiv} />
                    <div className={styles.child1} />
                    <div className={styles.div23}>접수 완료</div>
                    <div className={styles.div24}>배차중</div>
                    <div className={styles.div25}>배차완료</div>
                    <div className={styles.div26}>운행중</div>
                    <div className={styles.child2} />
                    <div className={styles.div27}>운송완료</div>
                </div>
                <div className={styles.div28}>
                    <div className={styles.div29}>접수일 : 2023.12.28 09:00</div>
                    <div className={styles.div30}>접수자 : 홍길동</div>
                </div>
                <div className={styles.rectangleGroup}>
                    <div className={styles.groupItem} />
                    <div className={styles.n0001}>N0001</div>
                    <div className={styles.div31}>접수완료</div>
                </div>
                <img className={styles.lineIcon} alt="" src="/images/line-37@2x.png" />
            </div>
            <img className={styles.moa11} alt="" src="/images/logo.png" onClick={onLogoClick}/>
            <img
                className={styles.arrowIcon}
                onClick={onBackClick}
                alt=""
                src="/images/arrow-3@2x.png"
            />
        </div>
    );
};
export default ShipperDetail;
