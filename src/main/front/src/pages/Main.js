import { useCallback } from "react";
import { useNavigate } from 'react-router-dom'; // v6에서는 useNavigate를 사용합니다.
import styles from "./Main.module.css";

const Main = () => {
    const onEllipse1Click = useCallback(() => {
        // Please sync "slide02" to the project
    }, []);

    const onEllipse2Click = useCallback(() => {
        // Please sync "slide03" to the project
    }, []);
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 프로그래매틱 네비게이션을 할 수 있습니다.

    const onLogoClick = useCallback(() => {
        navigate('/'); // 로고 클릭 시 '/' 경로로 이동합니다.
    }, [navigate]);

    const onLoginClick = useCallback(() => {
        navigate('/Login'); // 로고 클릭 시 '/Login' 경로로 이동합니다 --> 주소 수정 요망
    }, [navigate]);

    return (
        <div className={styles.div}>
            <div className={styles.child} />
            {/* 클릭 가능한 이미지 */}
            <img
                className={styles.moa11}
                alt=""
                src="/images/logo.png"
                onClick={onLogoClick} // 이미지에 onClick 이벤트 핸들러를 추가합니다.
            />
            <div className={styles.div8}>
                다양한 차량 옵션 : 화물에 맞는 최적의 선택
            </div>
            
            <img className={styles.icon1} alt="" src="/images/main1.png" />

            <button className={styles.button} onClick={onLoginClick}>
                <img className={styles.child6} alt="" src="/images/rectangle-10@2x.png" />
                <div className={styles.div7}>로그인</div>
            </button>
            
            <div className={styles.centerround}>
                <div className={styles.ellipseDiv} />
                <div className={styles.child7} onClick={onEllipse1Click} />
                <div className={styles.child8} onClick={onEllipse2Click} />
            </div>
            <img className={styles.icon} alt="" src="/images/2-1@2x.png" />
            <div className={styles.div1}>화물타고만의 특별한 서비스</div>
            <div className={styles.aiContainer}>
                <p className={styles.ai}>
                    AI 기술을 활용한 우리의 매칭 서비스와 명확한 표준 요금제를 통해
                    운영의 효율성을 극대화해보세요.
                </p>
                <p className={styles.ai}>
                    우리는 책임감 있는 운영과 편리한 정산 시스템을 통해 안정적이고
                    편안한 업무 환경을 약속합니다.
                </p>
            </div>

            <div className={styles.centerround2}>
                <div className={styles.item} />
                <div className={styles.ai1}>AI 배차 최적화</div>
                <div className={styles.inner} />
                <div className={styles.rectangleDiv} />
                <div className={styles.aiContainer1}>
                    <p className={styles.ai}>{`AI 배차를 통해 최적의 차량을 추천하며, `}</p>
                    <p className={styles.ai}>
                        왕복 화물 운송까지 고려하여 업무의 효율성을 극대화합니다.
                    </p>
                </div>
                <div className={styles.child1} />
                <div className={styles.div2}>적정 금액 추천</div>
                <img className={styles.rectangleIcon} alt="" src="/images/rectangle-29@2x.png" />
                <div className={styles.child2} />
                <div className={styles.div3}>
                    적정금액 추천 시스템이 공정한 거래를 위한 가격을 제안해드립니다.
                    편리하고 합리적인 거래를 경험해보세요.
                </div>
                <div className={styles.child3} />
                <div className={styles.div4}>리뷰 시스템</div>
                <div className={styles.child4} />
                <div className={styles.child5} />
                <div className={styles.div5}>
                    <p
                        className={styles.ai}
                    >{`배송 완료 후 화주에 대한 리뷰를 남겨보세요.  `}</p>
                    <p className={styles.ai}>
                        투명성을 높이며 더 나은 업무 환경을 만들어갑니다.
                    </p>
                </div>
            </div>
            <div>
                <div className={styles.child9} />
                <img className={styles.arrowIcon} alt="" src="/images/arrow-3@2x.png" />
                <div className={styles.child10} />
                <img className={styles.child11} alt="" src="/images/arrow-4@2x.png" />
                <img className={styles.icon2} alt="" src="/images/3@2x.png" />
                <img className={styles.icon3} alt="" src="/images/2@2x.png" />
                <img className={styles.icon4} alt="" src="/images/1@2x.png" />
            </div>
            <div className={styles.rectangleParent}>
                <div className={styles.groupChild} />
                <img className={styles.icon5} alt="" src="/images/1-1@2x.png" />
                <div className={styles.fax020000000Container}>
                    <p className={styles.p5}>
                        사업자 등록번호 : 000-00-00000 | 정보보호책임자 : 홍길동 |
                        화물운송주선사업자 : 제2023-00호 | 화물운송사업자 : 제2023-00호
                    </p>
                    <p className={styles.ai}>
                        통신판매업신고번호 : 제2023-서울000호 | 대표번호 : 02-000-0000 | FAX
                        : 02-000-0000 | aivle@cargotago.com
                    </p>
                </div>
                <div className={styles.div8}>서비스 소개</div>
                <div className={styles.ktAivleschoolAllRights}>
                    ⓒ 2024. KT-AivleSchool All rights reserved.
                </div>
                <div className={styles.div9}>개인정보 처리방침</div>
                <div className={styles.div10}>이용약관</div>
                <div className={styles.div11}>운송약관</div>
            </div>
        </div>
    );
};

export default Main;
