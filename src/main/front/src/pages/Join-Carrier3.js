import { useCallback } from "react";
import styles from "./Join-Carrier3.module.css";
import {useNavigate} from "react-router-dom";

const JoinCarrier3 = () => {
    const navigate = useNavigate();

    const onGroupContainerClick = useCallback(() => {
        // Please sync "차주 마이페이지 > 화물차량등록페이지" to the project
    }, []);

    const onBackClick = useCallback(() => {
        navigate("/Carrier/2");
    }, [navigate]);

    return (
        <div className={styles.div}>
            <div className={styles.div1}>
                <p className={styles.p}>서류 확인을 위한</p>
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
            <div className={styles.child}/>
            <div className={styles.item}/>
            <b className={styles.b}>1</b>
            <div className={styles.inner}/>
            <b className={styles.b1}>3</b>
            <b className={styles.b2}>2</b>
            <div className={styles.lineDiv}/>
            <div className={styles.child1}/>
            <img className={styles.arrowIcon} onClick={onBackClick} alt="" src="/images/arrow-3@2x.png"/>
            <div className={styles.div6}>화물타고</div>
            <b className={styles.b3}></b>
            <div>
                <input type="text" className={styles.rectangleDiv}
                       placeholder="대표자명 *"/>
            </div>
            <div>
                <input type="text" className={styles.child2}
                       placeholder="사업자 번호 *"/>
            </div>
            <div>
                <input type="text" className={styles.child3}
                       placeholder="상호명 *"/>
            </div>
            <div>
                <input type="text" className={styles.child4}
                       placeholder="사업장 주소 *"/>
            </div>

            <div>
                <input type="text" className={styles.child5}
                       placeholder="계좌 등록 *"/>
            </div>


            <div className={styles.rectangleParent} onClick={onGroupContainerClick}>
                <div className={styles.groupChild}/>
                <div className={styles.div12}>등록</div>
            </div>
            <div>
                <input type="text" className={styles.child6}
                       placeholder="사업자 등록증 *"/>
            </div>

            <img className={styles.rectangleIcon} alt="" src="/images/rectangle-23@2x.png"/>
            <img className={styles.child7} alt="" src="/images/rectangle-23@2x.png"/>
            <div className={styles.div14}>인증</div>
            <div className={styles.div15}>인증</div>
        </div>
    );
};

export default JoinCarrier3;
