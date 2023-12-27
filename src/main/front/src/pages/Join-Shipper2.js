import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Join-Shipper2.module.css";

const JoinShipper2 = () => {
    const navigate = useNavigate();

    const onBackClick = useCallback(() => {
        navigate("/Shipper/1");
    }, [navigate]);

    const onGroupContainerClick = useCallback(() => {
        navigate("/Shipper/3");
    }, [navigate]);


    return (
        <div className={styles.div}>
            <img className={styles.arrowIcon} onClick={onBackClick} alt="" src="/images/arrow-3@2x.png"/>
            <div className={styles.centerd}>
                <div className={styles.div1}>화물타고</div>
                <div className={styles.div2}>
                    <p className={styles.p}>이용 약관 동의</p>
                </div>
                <div className={styles.div3}>신원 확인</div>
                <div className={styles.div4}>
                    <p className={styles.p}>정보 등록</p>
                </div>
            </div>
            <div className={styles.item}/>
            <div className={styles.inner}/>
            <b className={styles.b}>1</b>
            <div className={styles.ellipseDiv}/>
            <b className={styles.b1}>3</b>
            <b className={styles.b2}>2</b>
            <div className={styles.lineDiv}/>
            <div className={styles.child1}/>
            <div className={styles.div5}>
                <p className={styles.p}>회원가입을 위한</p>
                <p className={styles.p}>정보를 입력해 주세요.</p>
            </div>
            <b className={styles.b3}></b>
            <div className={styles.div6}>
                <ul className={styles.ul}>
                    <li>필수입력 정보입니다.</li>
                </ul>
            </div>
            <div>
                <input type="text" className={styles.rectangleDiv}
                       placeholder="전화번호 *"/>
            </div>
            <div>
                <input type="text" className={styles.child2}
                       placeholder="이메일 *"/>
            </div>
            <div>
                <input type="text" className={styles.child3}
                       placeholder="이름(실명) *"/>
            </div>
            <div>
                <input type="password" className={styles.child4}
                       placeholder="비밀번호 *"/>
            </div>


            <div className={styles.divemail}>
                올바른 이메일 형식을 입력해 주세요.
            </div>
            <div className={styles.div11}>
                비밀번호는 특수문자(!,@,#)를 포함하여 8~16자를 입력해 주세요.
            </div>
            <div>
                <input type="password" className={styles.child5}
                       placeholder="비밀번호 확인 *"/>
            </div>
            <div className={styles.div13}>비밀번호가 다릅니다.</div>
            <div className={styles.div14}>숫자만 입력해 주세요.</div>
            <img className={styles.rectangleIcon} alt="" src="/images/rectangle-23@2x.png"/>
            <div className={styles.div15}>인증</div>
            <div className={styles.rectangleParent} onClick={onGroupContainerClick}>
                <div className={styles.groupChild}/>
                <div className={styles.div16}>다음</div>
            </div>
        </div>
    );
};

export default JoinShipper2;
