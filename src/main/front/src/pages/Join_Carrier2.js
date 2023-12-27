import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Join_Carrier2.module.css";

const JoinCarrier2 = () => {
    const navigate = useNavigate();

    const onGroupContainerClick = useCallback(() => {
        navigate("/Carrier/3");
    }, [navigate]);

    const onBackClick = useCallback(() => {
        navigate("/Carrier/1");
    }, [navigate]);

    return (
        <div className={styles.div}>
            <div className={styles.div1}>
                <p className={styles.p}>회원가입을 위한</p>
                <p className={styles.p}>정보를 입력해 주세요.</p>
            </div>
            <b className={styles.b}></b>
            <div className={styles.div2}>
                <ul className={styles.ul}>
                    <li>필수입력 정보입니다.</li>
                </ul>
            </div>
            <div>
                <input type="text" className={styles.child}
                       placeholder="전화번호 *"/>
            </div>

            <div>
                <input type="text" className={styles.item}
                       placeholder="이메일 *"/>
            </div>

            <div>
                <input type="text" className={styles.inner}
                       placeholder="이름(실명) *"/>
            </div>
            <div className={styles.rectangleDiv}/>
            {/*
            <div className={styles.div3}>
                <span>전화번호</span>
                <span className={styles.span}>{` `}</span>
                <span className={styles.span1}>*</span>
            </div>

            <div className={styles.div4}>
                <span>{`이름(실명) `}</span>
                <span className={styles.span1}>*</span>
            </div>

            <div className={styles.div5}>
                <span>아이디</span>
                <span className={styles.span}>{` `}</span>
                <span className={styles.span1}>*</span>
            </div>

            */}
            <div>
                <input type="text" className={styles.child1}
                       placeholder="화물운송 자격증 *"/>
            </div>
            {/*
            <div className={styles.div6}>
                <span>화물운송 자격증</span>
                <span className={styles.span}>{` `}</span>
                <span className={styles.span1}>*</span>
            </div>
            */}
            <div>
                <input type="password" className={styles.rectangleDiv}
                       placeholder="비밀번호 *"/>
                {/*
                <span>비밀번호</span>
                <span className={styles.span}>{` `}</span>
                <span className={styles.span1}>*</span>
                */}
            </div>
            <div className={styles.rectangleParent} onClick={onGroupContainerClick}>
                <div className={styles.groupChild}/>
                <div className={styles.div8}>다음</div>
            </div>
            <div className={styles.divemail}>
                올바른 이메일 형식을 입력해 주세요.
            </div>
            <div className={styles.div9}>
                비밀번호는 특수문자(!,@,#)를 포함하여 8~16자를 입력해 주세요.
            </div>
            <div>
                <input type="password" className={styles.child2}
                       placeholder="비밀번호 확인 *"/>
            </div>
            {/*
            <div className={styles.div10}>
                <span>비밀번호 확인</span>
                <span className={styles.span}>{` `}</span>
                <span className={styles.span1}>*</span>
            </div>
            */}
            <div className={styles.div11}>비밀번호가 다릅니다.</div>
            <div className={styles.div12}>숫자만 입력해 주세요.</div>

            <div className={styles.div13}>
                <p className={styles.p}>이용 약관 동의</p>
            </div>
            <div className={styles.div14}>신원 확인</div>
            <div className={styles.div15}>
                <p className={styles.p}>정보 등록</p>
            </div>
            <div className={styles.ellipseDiv}/>
            <div className={styles.child3}/>
            <b className={styles.b1}>1</b>
            <div className={styles.child4}/>
            <b className={styles.b2}>3</b>
            <b className={styles.b3}>2</b>
            <div className={styles.lineDiv}/>
            <div className={styles.child5}/>
            <img className={styles.arrowIcon} onClick={onBackClick} alt="" src="/images/arrow-3@2x.png"/>
            <div className={styles.div16}>화물타고</div>
            <img className={styles.rectangleIcon} alt="" src="/images/rectangle-23@2x.png"/>
            <div className={styles.div17}>인증</div>
            <img className={styles.child6} alt="" src="/images/rectangle-23@2x.png"/>
            <div className={styles.div18}>인증</div>
        </div>
    );
};

export default JoinCarrier2;
