import {useCallback, useEffect} from "react";
import { useNavigate } from 'react-router-dom'; // v6에서는 useNavigate를 사용합니다.
import 'react-slideshow-image/dist/styles.css';
import { Fade, Zoom, Slide } from "react-slideshow-image";
import styles from "./Main.module.css";
import "./Main.css";
import {SectionsContainer, Section} from 'react-fullpage';
import axios from 'axios';

const Main = () => {


    const token = localStorage.getItem('jwt-token');


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
        if (token) {
            localStorage.removeItem('jwt-token');
            window.alert('정상적으로 로그아웃 되었습니다.')
            window.location.reload();
        } else {
            navigate('/Login'); // 로고 클릭 시 '/Login' 경로로 이동합니다 --> 주소 수정 요망
        }
    }, [navigate]);

    const onSignUpClick = useCallback(() => {
        if (token) {
            navigate('/Login');
        } else {
            navigate('/Joinmain'); //  회원가입 클릭 시 '/Joinmain' 경로로 이동합니다
        }
    }, [navigate]);

    // 메인 이미지 슬라이드 부분
    const slideImages = [
        {
            url : "/images/main1.png",
        },
        {
            url : "/images/main2.png",
        },
        {
            url : "/images/main3.png",
        },
    ];
    // 차량 이미지 슬라이드 부분
    const CargoImages = [
        {
            url : "/images/Cargo1.png",
        },
        {
            url : "/images/Cargo2.png",
        },
        {
            url : "/images/Cargo3.png",
        },
    ];
    const divStyle = {
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center',
            height : '602px',
            backgroundPosition : 'center',  // 가운데 정렬
            backgroundRepeat: 'no-repeat',  // 배경 이미지가 반복되지 않도록 설정
            backgroundSize: '100%',  // 배경 이미지의 가로 폭을 100%로 설정
            width: '100%',
        }

    const CargoStyle = {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        height : '500px',
        backgroundSize : 'contain', // 'contain'으로 수정
        backgroundPosition : 'center',  // 가운데 정렬
        backgroundRepeat: 'no-repeat',  // 배경 이미지가 반복되지 않도록 설정
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '85%',

    }

    let options = {
        anchors: ['sectionOne', 'sectionTwo', 'sectionThree','sectionFour','sectionFive'],
    };

    return (
        <div className={styles.div}>
            <SectionsContainer {...options}>
                <section>
                    <div className={styles.child}>
                        <img
                            className={styles.logoimg}
                            alt=""
                            src="/images/logo.png"
                            onClick={onLogoClick} // 이미지에 onClick 이벤트 핸들러를 추가합니다.
                        />

                        <button className={styles.button} onClick={onSignUpClick}>
                            <img className={styles.child6} alt="" src="/images/rectangle-10@2x.png" />
                            {token
                                ?<div className={styles.div7out}>메인페이지</div> // 토큰이 있으면 메인페이지 표시
                                :<div className={styles.div7}>회원가입</div>   // 토큰이 없으면 회원가입 표시
                            }
                        </button>

                        <button className={styles.button2} onClick={onLoginClick} >

                            {token
                                ?
                                <div>
                                    <img className={styles.child12} alt="" src="/images/rectangle-10.png" />
                                    <div className={styles.div12out}>로그아웃</div>
                                </div>
                                :
                                <div>
                                    <img className={styles.child12} alt="" src="/images/rectangle-10@2x.png" />
                                    <div className={styles.div12}>로그인</div>
                                </div>
                            }
                        </button>

                        {/* 메인이미지 슬라이드 부분 */}
                        <div className={styles.mainslide}>

                            <Fade>
                                {slideImages.map((image, index) => (
                                    <div key={index}>
                                        <div style={{...divStyle, backgroundImage: `url(${image.url})`}}>
                                        </div>
                                    </div>

                                ))}
                            </Fade>

                        </div>
                    </div>
                </section>
                <section>
                    <div className={styles.section2}>
                        <div>
                            {/*<img className={styles.icon} alt="" src="/images/2-1@2x.png" />*/}
                            <div className={styles.div1}>화물타고만의 특별한 서비스</div>
                            <div className={styles.aiContainer}>
                                <p className={styles.ai}>
                                    AI 기술을 활용한 화물타고의 매칭 서비스와 명확한 표준 요금제를 통해
                                    운영의 효율성을 극대화해보세요.
                                </p>
                                <p className={styles.ai}>
                                    화물타고는 책임감 있는 운영과 AI 배차 시스템을 통해 안정적이고
                                    편안한 업무 환경을 약속합니다.
                                </p>
                            </div>
                        </div>

                        <div className={styles.centerround2}>
                            <div className={styles.item}>
                                <img src="/images/page1.png" alt="" style={{height: '90%', width: '90%', borderRadius:'30px'}}/>
                            </div>
                            <div className={styles.ai1}>AI 배차 최적화</div>
                            <div className={styles.inner} />
                            <div className={styles.rectangleDiv} />
                            <div className={styles.aiContainer1}>
                                <p className={styles.ai}>{`AI 배차를 통해 최적의 차량을 추천하며, `}</p>
                                <p className={styles.ai}>
                                    희망지역과 거리까지 고려하여 효율성을 극대화합니다.
                                </p>
                            </div>
                            <div className={styles.child1}>
                                <img src="/images/page1.png" alt="" style={{height: '90%', width: '90%',borderRadius:'30px'}}/>
                            </div>
                            <div className={styles.div2}>적정 운임 추천</div>

                            <img className={styles.rectangleIcon} alt="" src="/images/rectangle-29@2x.png" />
                            <div className={styles.child2} />
                            <div className={styles.div3}>
                                <p className={styles.ai}>
                                    운임 추천 시스템이 공정한 거래를 위한 가격을 제안합니다.
                                    편리하고 합리적인 거래를 경험해보세요.
                                </p>
                            </div>
                            <div className={styles.child3}>
                            <img src="/images/page1.png" alt="" style={{height: '90%', width: '90%',borderRadius:'30px'}}/>
                            </div>
                            <div className={styles.div4}>채팅 시스템</div>
                            <div className={styles.child4}/>
                            <div className={styles.child5}/>
                            <div className={styles.div5}>
                                <p
                                    className={styles.ai}
                                >{`음성인식을 통한 채팅 시스템으로  `}</p>
                                <p className={styles.ai}>
                                    편안하고 안전하게 화주와 차주를 연결합니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>

                        <div className={styles.divCargo2}>
                            <span className={styles.spanbr2}> AI기술 </span>
                        </div>



                </section>

                <section>
                    <div>

                        <div className={styles.divCargo}>
                            <span className={styles.spanbr}>다양한 차량 옵션 :</span>
                            <span className={styles.spanbr}>&nbsp;화물에 맞는 최적의 선택</span>

                        </div>
                        {/* 차량 이미지 슬라이드 부분 */}
                        <div className={styles.subslide}>
                            <Fade>
                                {CargoImages.map((image, index) => (
                                    <div key={index}>
                                        <div style={{...CargoStyle, backgroundImage: `url(${image.url})`}}>
                                        </div>
                                    </div>
                                ))}
                            </Fade>
                        </div>
                    </div>
                </section>
                <section>
                    <div className={styles.rectangleParent}>
                        <div className={styles.groupChild}>
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
                            <div>
                                <div className={styles.div8}>서비스 소개</div>
                                <div className={styles.ktAivleschoolAllRights}>
                                    ⓒ 2024. KT-AivleSchool All rights reserved.
                                </div>
                                <div className={styles.div9}>개인정보 처리방침</div>
                                <div className={styles.div10}>이용약관</div>
                                <div className={styles.div11}>운송약관</div>
                            </div>
                        </div>
                    </div>
                </section>
            </SectionsContainer>
        </div>
    );
};

export default Main;