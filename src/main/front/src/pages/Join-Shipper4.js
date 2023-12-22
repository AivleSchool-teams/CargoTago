import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Join-Shipper4.module.css";

const JoinShipper4 = () => {
    const navigate = useNavigate();

    const onBackClick = useCallback(() => {
        navigate("/Shipper/3");
    }, [navigate]);

    const onShipperJoinClick = useCallback(() => {
        navigate("/Shipper");
    }, [navigate]);

    return (
        <div className={styles.div}>
            <img className={styles.arrowIcon} onClick={onBackClick} alt="" src="/images/arrow-3@2x.png" />
            <div className={styles.div1}>화물차량등록</div>

            <div style={{ margin: '0 auto', display: 'block', textAlign: 'center', width: '100%' }}>
                <div className={styles.child6} />
                <div className={styles.child7} />
                <div className={styles.child8} />
                <div className={styles.child9} />

                <div className={styles.div7}>
                    <span>대표자명</span>
                    <span className={styles.span}>{` `}</span>
                    <span className={styles.span1}>*</span>
                </div>
                <div className={styles.div8}>
                    <span>차량종류</span>
                    <span className={styles.span1}>*</span>
                </div>
                <div className={styles.div9}>
                    <span>차량등록증</span>
                    <span className={styles.span}>{` `}</span>
                    <span className={styles.span1}>*</span>
                </div>
                <div className={styles.child11} />
                <div className={styles.div10}>
                    <span>전화번호</span>
                    <span className={styles.span}>{` `}</span>
                    <span className={styles.span1}>*</span>
                </div>
                <div className={styles.div11}>
                    <span>사업장 주소</span>
                    <span className={styles.span}>{` `}</span>
                    <span className={styles.span1}>*</span>
                </div>
                <div className={styles.child12} />
                <div className={styles.div13}>
                    <span>사업자 등록증</span>
                    <span className={styles.span}>{` `}</span>
                    <span className={styles.span1}>*</span>
                </div>
                <img className={styles.child13} alt="" src="/images/rectangle-23@2x.png" />
                <div className={styles.div14}>인증</div>
                <img className={styles.child14} alt="" src="/images/rectangle-23@2x.png" />
                <div className={styles.div15}>등록</div>
                <img className={styles.child15} alt="" src="/images/rectangle-23@2x.png" />
                <div className={styles.div16}>인증</div>

                <div className={styles.child10} />
                <div className={styles.div12} onClick={onShipperJoinClick} >등록</div>
            </div>
        </div>
    );
};

export default JoinShipper4;
