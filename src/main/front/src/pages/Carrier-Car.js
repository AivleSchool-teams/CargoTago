import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Carrier-Car.module.css";
import axios from "axios";

const CarrierCar = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState(null);

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
                    console.log('안녕하세요,', response.data.name, '님?');
                    setUsername(response.data.name);
                    console.log(username);
                })
                .catch(error => {
                    // 오류 처리
                    console.error('비정상적인 접근입니다.', error);
                });
        }
    }, [navigate, username]);


    const onBackClick = useCallback(() => {
        navigate('/Carrier/Main'); // 로고 클릭 시 '/' 경로로 이동합니다.
    }, [navigate]);

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


    //=========================================================
    const handleSubmit = async (event) => {
        event.preventDefault();

        const now = new Date(); //한국은 UTC+9 시간대에 속하므로, UTC 시간으로 변환하면 한국 시간보다 9시간 빠른 시간이 나옴
        const currentDateTime = now.getFullYear() + '-' +
            ('0' + (now.getMonth()+1)).slice(-2) + '-' +
            ('0' + now.getDate()).slice(-2) + 'T' +
            ('0' + now.getHours()).slice(-2) + ':' +
            ('0' + now.getMinutes()).slice(-2) + ':' +
            ('0' + now.getSeconds()).slice(-2);
        console.log(userid);
        console.log(username);
        console.log(selectedButton)
        // console.log(selected);
        console.log(selected2);
        console.log(arrivalDateTime);
        console.log(departureDateTime);
        console.log(tonnage);
        console.log(selectedBox);
        console.log(isChecked1);
        console.log(isChecked2);
        console.log(isChecked3);
        console.log(text);
        console.log(selectedSize);
        console.log('selectedBoXNew' + ":" + selectedBoxNew);
        console.log(weight);
        console.log(textAreaValue);
        console.log(selectedValue);

        console.log("headquarters2"+ headquarters2);
        console.log("headquarters3"+headquarters3);

        console.log('location.zipCode'+ location.zipCode);
        console.log(location.roadAddress);
        console.log(location.detailAddress);

        console.log(address.postcode);
        console.log(address.address);
        console.log(address.detailAddress);
        console.log(currentDateTime);

        const token = localStorage.getItem('jwt-token');
        axios.post('http://localhost:8080/user/cargoregi/regi',{
                shipmember : userid,
                username : username,
                // selected : selected,
                selected2 : selected2,
                arrivalDateTime : arrivalDateTime,
                departureDateTime : departureDateTime,
                tonnage : tonnage,
                selectedBox : selectedBox,
                isChecked1 :isChecked1,
                isChecked2 : isChecked2,
                isChecked3 : isChecked3,
                text : text,
                selectedSize : selectedSize,
                selectedBoxNew : selectedBoxNew,
                weight : weight,
                textAreaValue : textAreaValue,
                selectedValue : selectedValue,
                selectedButton : selectedButton,
                headquarters2 : headquarters2,
                headquarters3 : headquarters3,
                arrival_Code : location.zipCode,
                arrival_Address : location.roadAddress,
                arrival_detailAddress : location.detailAddress,
                departure_code : address.postcode,
                departure_address : address.address,
                departure_detailAddress : address.detailAddress,
                currentDateTime: currentDateTime,

            }
            , {
                headers: {
                    'Authorization': `Bearer ${token}` // 토큰을 헤더에 추가
                }
            })
            .then(res => {
                window.alert("화물 접수가 정상적으로 등록되었습니다.")
                navigate('/Shipper/main');
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
            </div>
            
        </div>
    );
};
export default CarrierCar;
