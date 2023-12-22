import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Join-Shipper2.module.css";

const JoinShipper2 = () => {
    const navigate = useNavigate();

    const onBackClick = useCallback(() => {
        navigate("/Shipper/1");
    }, [navigate]);

    const onShipperJoinClick = useCallback(() => {
        navigate("/Shipper/3");
    }, [navigate]);

    return (
        <div className={styles.div}>
            <img className={styles.child} onClick={onBackClick} alt="" src="/images/arrow-3@2x.png" />
            <div className={styles.div1}>화물타고</div>
            <div className={styles.div2}>
                <p className={styles.p}>이용 약관 동의</p>
            </div>
            <div className={styles.div3}>신원 확인</div>
            <div className={styles.div4}>
                <p className={styles.p}>정보 등록</p>
            </div>
            <div className={styles.item} />
            <div className={styles.inner} />
            <b className={styles.b}>1</b>
            <div className={styles.ellipseDiv} />
            <b className={styles.b1}>3</b>
            <b className={styles.b2}>2</b>
            <div className={styles.lineDiv} />
            <div className={styles.child1} />
            <div className={styles.div5}>
                <p className={styles.p}>회원가입을 위한</p>
                <p className={styles.p}>정보를 입력해 주세요.</p>
            </div>
            <b className={styles.b3}>로그인</b>
            <div className={styles.div6}>
                <ul className={styles.ul}>
                    <li>필수입력 정보입니다.</li>
                </ul>
            </div>
            <div className={styles.rectangleDiv} />
            <div className={styles.child2} />
            <div className={styles.child3} />
            <div className={styles.child4} />
            <div className={styles.div7}>
                <span>전화번호</span>
                <span className={styles.span}>{` `}</span>
                <span className={styles.span1}>*</span>
            </div>
            <div className={styles.div8}>
                <span>{`이름(실명) `}</span>
                <span className={styles.span1}>*</span>
            </div>
            <div className={styles.div9}>
                <span>아이디</span>
                <span className={styles.span}>{` `}</span>
                <span className={styles.span1}>*</span>
            </div>
            <div className={styles.div10}>
                <span>비밀번호</span>
                <span className={styles.span}>{` `}</span>
                <span className={styles.span1}>*</span>
            </div>
            <div className={styles.div11}>
                비밀번호는 특수문자(!,@,#)를 포함하여 8~16자를 입력해 주세요.
            </div>
            <div className={styles.child5} />
            <div className={styles.div12}>
                <span>비밀번호 확인</span>
                <span className={styles.span}>{` `}</span>
                <span className={styles.span1}>*</span>
            </div>
            <div className={styles.div13}>비밀번호가 다릅니다.</div>
            <div className={styles.div14}>숫자만 입력해 주세요.</div>
            <img className={styles.rectangleIcon} alt="" src="/images/rectangle-23@2x.png" />
            <div className={styles.div15}>인증</div>
            <div className={styles.rectangleParent} onClick={onShipperJoinClick}>
                <div className={styles.groupChild} />
                <div className={styles.div16}>다음</div>
            </div>
        </div>
    );
};

export default JoinShipper2;
