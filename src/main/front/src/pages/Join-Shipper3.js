import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Join-Shipper3.module.css";

const JoinShipper3 = () => {
    const navigate = useNavigate();

    const onBackClick = useCallback(() => {
        navigate("/Shipper/2");
    }, [navigate]);

    const onShipperJoinClick = useCallback(() => {
        navigate("/Shipper/4");
    }, [navigate]);

    return (
        <div className={styles.div}>

            <div className={styles.div1}>
                <p className={styles.p}>회원가입을 위한</p>
                <p className={styles.p}>정보를 입력해 주세요.</p>
            </div>
            <div className={styles.div2}>
                <ul className={styles.ul}>
                    <li>필수입력 정보입니다.</li>
                </ul>
            </div>
            <div className={styles.div3}>
                <p className={styles.p}>이용 약관 동의</p>
            </div>
            <div className={styles.div4}>신원 확인</div>
            <div className={styles.div5}>
                <p className={styles.p}>정보 등록</p>
            </div>
            <div className={styles.child} />
            <div className={styles.item} />
            <b className={styles.b}>1</b>
            <div className={styles.inner} />
            <b className={styles.b1}>3</b>
            <b className={styles.b2}>2</b>
            <div className={styles.lineDiv} />
            <div className={styles.child1} />

            <div className={styles.div6}>화물타고</div>
            <b className={styles.b3}>로그인</b>
            <div className={styles.rectangleDiv} />
            <div className={styles.child2} />
            <div className={styles.child3} />
            <div className={styles.child4} />
            <div className={styles.div7}>
                <span>대표자명</span>
                <span className={styles.span}>{` `}</span>
                <span className={styles.span1}>*</span>
            </div>
            <div className={styles.div8}>
                <span>{`상호명 `}</span>
                <span className={styles.span1}>*</span>
            </div>
            <div className={styles.div9}>
                <span>사업자번호</span>
                <span className={styles.span}>{` `}</span>
                <span className={styles.span1}>*</span>
            </div>
            <div className={styles.child5} />
            <div className={styles.div10}>
                <span>계좌 등록</span>
                <span className={styles.span}>{` `}</span>
                <span className={styles.span1}>*</span>
            </div>
            <div className={styles.div11}>
                <span>사업장 주소</span>
                <span className={styles.span}>{` `}</span>
                <span className={styles.span1}>*</span>
            </div>
            <div className={styles.rectangleParent} onClick={onShipperJoinClick}>
                <div className={styles.groupChild} />
                <div className={styles.div12}>다음</div>
            </div>
            <div className={styles.child6} />
            <div className={styles.div13}>
                <span>사업자 등록증</span>
                <span className={styles.span}>{` `}</span>
                <span className={styles.span1}>*</span>
            </div>
            <img className={styles.rectangleIcon} alt="" src="/images/rectangle-23@2x.png" />
            <div className={styles.div14}>인증</div>
        </div>
    );
};

export default JoinShipper3;
