import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Carrier-Car.module.css";
import axios from "axios";

const CarrierCar = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwt-token');
        if (!token) {
            // 토큰이 없으면 로그인 페이지로 리디렉션
            navigate('/login');
            console.log('비정상적인 접근입니다.')
        } else {
            axios.get('http://localhost:8080/user/mainpage', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    // 사용자 이름 표시
                    console.log('사용자 이름:', response.data.name);
                    setUserid(response.data.id);
                    setUsername(response.data.name);
                    setUsertype(response.data.type);
                })
                .catch(error => {
                    // 오류 처리
                    console.error('비정상적인 접근입니다.', error);
                });
        }
    }, [navigate]);


    const onBackClick = useCallback(() => {
        navigate('/Carrier/Main'); // 로고 클릭 시 '/' 경로로 이동합니다.
    }, [navigate]);

    const [username, setUsername] = useState(null);
    const [userid, setUserid] = useState(null);
    const [usertype, setUsertype] = useState(null);

    // 톤 수 드롭 박스 구현 부분
    const [tonnage, setTonnage] = useState('');
    
    // 차량 종류 구현 부분
    const [hoveredBox, setHoveredBox] = useState(null);
    const [selectedBox, setSelectedBox] = useState(null);

    const handleMouseEnter = (boxName) => {
        setHoveredBox(boxName);
    };

    const handleMouseLeave = () => {
        setHoveredBox(null);
    };

    const handleClick = (boxName) => {
        setSelectedBox(boxName);
    };

    // 차량 옵션 체크 박스 항목
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const handleCheckboxChange1 = (event) => {
        setIsChecked1(event.target.checked);
    };
    const handleCheckboxChange2 = (event) => {
        setIsChecked2(event.target.checked);
    };

    // 선호 지역 드롭 박스 항목
    const [area1, setArea1] = useState('');
    const [area2, setArea2] = useState('');
    const [distance, setDistance] = useState('');
    const [sectors, setSectors] = useState('');

    //=========================================================

    //=========================================================
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(userid);
        console.log(username);

        console.log(tonnage);
        console.log(selectedBox);
        console.log(isChecked1);
        console.log(isChecked2);
        console.log(area1);
        console.log(area2);
        console.log(distance);
        console.log(sectors);

        const token = localStorage.getItem('jwt-token');
        axios.post('http://localhost:8080/user/carrier/car',{
                carmember : userid,
                username : username,

                tonnage : tonnage,
                selectedBox : selectedBox,
                isChecked1 :isChecked1,
                isChecked2 : isChecked2,
                area1 : area1,
                area2 : area2,
                distance : distance,
                sectors : sectors,
            }
            , {
                headers: {
                    'Authorization': `Bearer ${token}` // 토큰을 헤더에 추가
                }
            })
            .then(res => {
                window.alert("차량이 정상적으로 등록되었습니다.")
                navigate('/Carrier/main');
            })
            .catch(error => {
                console.error("There was an error!", error);
                window.alert("등록 중 에러가 발생했습니다");
            });

    };


    return (
        <div className={styles.div}>
            <img className={styles.child} onClick={onBackClick} alt="" src="/images/arrow-3@2x.png" />
            <div className={styles.div1}>차량등록</div>
            <div className={styles.centeralign}>
                <div className={styles.rectangleParent}>
                    <div className={styles.groupChild} />
                    <div className={styles.div2}>
                        <span>{`차량 번호 `}</span>
                        <span className={styles.span}>*</span>
                    </div>
                </div>
                <div className={styles.rectangleGroup}>
                    <div className={styles.groupChild} />
                    <div className={styles.div2}>
                        <span>{`선호 지역1 `}</span>
                        <span className={styles.span}>*</span>
                    </div>
                </div>
                <div className={styles.rectangleContainer}>
                    <div className={styles.groupChild} />
                    <div className={styles.div2}>
                        <span>{`선호 지역2 `}</span>
                        <span className={styles.span}>*</span>
                    </div>
                </div>
                <div className={styles.groupDiv}>
                    <div className={styles.groupChild} />
                    <div className={styles.div2}>
                        <span>{`선호 이동 거리 `}</span>
                        <span className={styles.span}>*</span>
                    </div>
                </div>
                <div className={styles.groupDiv1}>
                    <div className={styles.groupChild} />
                    <div className={styles.div2}>
                        <span>{`선호 화물 종류 `}</span>
                        <span className={styles.span}>*</span>
                    </div>
                </div>
                <div className={styles.rectangleParent1} onClick={handleSubmit}>
                    <div className={styles.groupChild1} />
                    <div className={styles.div6} >등록</div>
                </div>
                <div className={styles.div7}>
                    <div className={styles.item} />
                    <div className={styles.inner} />
                    <select className={styles.div8} value={tonnage} onChange={e => setTonnage(e.target.value)}>
                        <option value="">선택하세요</option>
                        <option value="1톤">1톤</option>
                        <option value="1.4톤">1.4톤</option>
                        <option value="2.5톤">2.5톤</option>
                        <option value="5톤">5톤</option>
                        <option value="8톤">8톤</option>
                        <option value="11톤">11톤</option>
                        <option value="25톤">25톤</option>
                    </select>

                    <div className={styles.div9}>
                        <span>{`차량 톤수 `}</span>
                        <span className={styles.span}>*</span>
                    </div>
                    <div className={styles.lineDiv} />
                    <div className={styles.div10}>
                        <span>{`차량 종류 `}</span>
                        <span className={styles.span}>*</span>
                    </div>
                    <div className={styles.parent}>
                        <div className={styles.div12}>
                            <span>{`차량 옵션 `}</span>
                            <span className={styles.span}>*</span>
                        </div>

                        <div className={styles.div13}>냉동 / 냉장</div>
                        <input
                            type="checkbox"
                            className={styles.groupChild3}
                            checked={isChecked2}
                            onChange={handleCheckboxChange2}
                        />

                        <div className={styles.div11}>무진동</div>
                        <input
                            type="checkbox"
                            className={styles.groupChild2}
                            checked={isChecked1}
                            onChange={handleCheckboxChange1}
                        />
                    </div>

                    <div>
                        <div
                            className={`${styles.rectangleParent4} ${hoveredBox === '카고' ? styles.hover : ''} ${selectedBox === '카고' ? styles.selected : ''}`}
                            onMouseEnter={() => handleMouseEnter('카고')}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleClick('카고')}>
                            <img
                            className={styles.nounTruck10818911Icon}
                            alt=""
                            src="/images/nountruck869297-1@2x.png"/>
                            <div className={styles.div17} onMouseEnter={() => handleMouseEnter('카고')}
                                 onMouseLeave={handleMouseLeave} onClick={() => handleClick('카고')}>카고
                            </div>
                        </div>

                        <div
                            className={`${styles.rectangleParent3} ${hoveredBox === '윙바디' ? styles.hover : ''} ${selectedBox === '윙바디' ? styles.selected : ''}`}
                            onMouseEnter={() => handleMouseEnter('윙바디')}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleClick('윙바디')}>
                            <img
                            className={styles.wingbody3Icon}
                            alt=""
                            src="/images/wingbody-3@2x.png"/>
                            <div className={styles.div16} onMouseEnter={() => handleMouseEnter('윙바디')}
                                 onMouseLeave={handleMouseLeave} onClick={() => handleClick('윙바디')}>윙바디
                            </div>
                        </div>
                        <div
                            className={`${styles.groupChild5} ${hoveredBox === '탑' ? styles.hover : ''} ${selectedBox === '탑' ? styles.selected : ''}`}
                            onMouseEnter={() => handleMouseEnter('탑')}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleClick('탑')}>
                            <img
                            className={styles.nounTruck10818911Icon}
                            alt=""
                            src="/images/nountruck1081891-1@2x.png"/>
                            <div className={styles.div15} onMouseEnter={() => handleMouseEnter('탑')}
                                 onMouseLeave={handleMouseLeave} onClick={() => handleClick('탑')}>
                                탑
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className={styles.centeralign}>
                <div className={styles.aiContainer}>
                    <ul className={styles.ai}>
                        <li> * 아래 항목은 AI 배차 추천 시스템에 사용되는 정보 입니다.</li>
                    </ul>
                </div>
                <input className={styles.div18} placeholder="00가 0000" />

                <select className={styles.div21} value={area1} onChange={e => setArea1(e.target.value)}>
                    <option value="">지역 선택</option>
                    <option value="서울">서울</option>
                    <option value="경기도">경기도</option>
                    <option value="부산">부산</option>
                    <option value="인천">인천</option>
                    <option value="대구">대구</option>
                    <option value="대전">대전</option>
                    <option value="광주">광주</option>
                    <option value="울산">울산</option>
                    <option value="세종">세종</option>
                    <option value="충청북도">충청북도</option>
                    <option value="충청남도">충청남도</option>
                    <option value="전라북도">전라북도</option>
                    <option value="전라남도">전라남도</option>
                    <option value="경상북도">경상북도</option>
                    <option value="경상남도">경상남도</option>
                    <option value="강원도">강원도</option>
                </select>

                <select className={styles.div19} value={area2} onChange={e => setArea2(e.target.value)}>
                    <option value="">지역 선택</option>
                    <option value="서울">서울</option>
                    <option value="경기도">경기도</option>
                    <option value="부산">부산</option>
                    <option value="인천">인천</option>
                    <option value="대구">대구</option>
                    <option value="대전">대전</option>
                    <option value="광주">광주</option>
                    <option value="울산">울산</option>
                    <option value="세종">세종</option>
                    <option value="충청북도">충청북도</option>
                    <option value="충청남도">충청남도</option>
                    <option value="전라북도">전라북도</option>
                    <option value="전라남도">전라남도</option>
                    <option value="경상북도">경상북도</option>
                    <option value="경상남도">경상남도</option>
                    <option value="강원도">강원도</option>
                </select>

                <select className={styles.div20} value={distance} onChange={e => setDistance(e.target.value)}>
                    <option value="">이동 거리 선택</option>
                    <option value="장거리">장거리</option>
                    <option value="단거리">단거리</option>
                </select>

                <select className={styles.div201} value={sectors} onChange={e => setDistance(e.target.value)}>
                    <option value="">선호 업종 선택</option>
                    <option value="농림축산업">농림축산업</option>
                    <option value="제조업">제조업</option>
                    <option value="광업">광업</option>
                    <option value="건설업">건설업</option>
                    <option value="도소매업">도소매업</option>
                    <option value="숙박 및 서비스업">숙박 및 서비스업</option>
                    <option value="기타 서비스업">기타 서비스업</option>
                    <option value="공공기관">공공기관</option>
                </select>
            </div>
            
        </div>
    );
};
export default CarrierCar;
