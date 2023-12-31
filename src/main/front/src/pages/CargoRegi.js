import styles from "./CargoRegi.module.css";
import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const CargoRegi = () => {
    const [location, setLocation] = useState({
        zipCode: '',
        roadAddress: '',
        detailAddress: '',
        referenceAddress: '',
    });

     const status = 0;

    const handleComplete = (data) => {
        let fullRoadAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname && /[동|로|가]$/g.test(data.bname)) {
                extraAddress += data.bname;
            }
            if (data.buildingName && data.apartment === 'Y') {
                extraAddress += extraAddress ? `, ${data.buildingName}` : data.buildingName;
            }
            fullRoadAddress += extraAddress ? ` (${extraAddress})` : '';
        }

        setLocation({
            zipCode: data.zonecode,
            roadAddress: fullRoadAddress,
            detailAddress: location.detailAddress, // 이전 상세 주소 상태 유지
            referenceAddress: extraAddress,
        });
    };

    const openPostcode = () => {
        const scriptTag = document.createElement('script');
        scriptTag.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        scriptTag.onload = () => {
            new window.daum.Postcode({
                oncomplete: handleComplete,
            }).open();
        };
        document.body.appendChild(scriptTag);
    };

    // 컴포넌트 언마운트 시 스크립트 제거
    useEffect(() => {
        return () => {
            const script = document.querySelector('script[src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"]');
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, []);


    const [address, setAddress] = useState({
        postcode: '',
        address: '',
        detailAddress: '',
        extraAddress: '',
    });

    const [currentDateTime, setCurrentDateTime] = useState();

    const handleAddress = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '' && data.apartment === 'Y') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        setAddress({
            ...address,
            postcode: data.zonecode,
            address: fullAddress,
            extraAddress: extraAddress,
        });
    };

    const loadPostcode = () => {
        const script = document.createElement('script');
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.onload = () => {
            new window.daum.Postcode({
                oncomplete: handleAddress,
            }).open();
        };
        document.body.appendChild(script);
    };

    useEffect(() => {
        return () => {
            // 컴포넌트가 언마운트 될 때 스크립트를 제거
            const script = document.querySelector('script[src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"]');
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const [selectedButton, setSelectedButton] = useState(null);

    const handleSelect = (button) => {
        setSelectedButton(button);
    }

    const buttons = ['본인이 직접 옮김', '상하차만 도움', '상하차 및 운반도움'];

    const navigate = useNavigate();

    const [username, setUsername] = useState(null);
    const [userid, setUserid] = useState(null);
    const [usertype, setUsertype] = useState(null);
    const [userphone, setUserphone] = useState(null);

    const [sectors, setSectors] = useState('');
    function handleSizeChange1(event) {
        setSectors(event.target.value);
    }



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
                    console.log('사용자 데이터:', response.data);
                    setUserid(response.data.id);
                    setUsername(response.data.name);
                    setUsertype(response.data.typed);
                    setUserphone(response.data.phone);
                })
                .catch(error => {
                    // 오류 처리
                    console.error('비정상적인 접근입니다.', error);
                });
        }
    }, [navigate]);



    const [weight, setWeight] = useState(30);
    const [textAreaValue, setTextAreaValue] = useState('');

    const handleChange = (event) => {
        setTextAreaValue(event.target.value);
    };

    const [hoveredBoxNew, setHoveredBoxNew] = useState(null);
    const [selectedBoxNew, setSelectedBoxNew] = useState(null);

    const handleMouseEnterNew = (boxName) => {
        setHoveredBoxNew(boxName);
    };

    const handleMouseLeaveNew = () => {
        setHoveredBoxNew(null);
    };

    const handleClickNew = (boxName) => {
        setSelectedBoxNew(boxName);
    };






    const [tonnage, setTonnage] = useState('');

    const [departureDateTime, setDepartureDateTime] = useState("");
    const [arrivalDateTime, setArrivalDateTime] = useState("");

    const handleDepartureDateTimePick = (event) => {
        const dateTime = event.target.value;
        setDepartureDateTime(dateTime);


    };

    const handleArrivalDateTimePick = (event) => {
        const dateTime = event.target.value;

        if (dateTime < departureDateTime) {
            alert("도착 시간은 출발 시간보다 빠를 수 없습니다.");
            setArrivalDateTime("");
        } else {
            setArrivalDateTime(dateTime);
        }
    };


    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    }
    // const [selected, setSelected] = useState('독차');

    const [selected2, setSelected2] = useState('편도');


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

    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);


    const handleCheckboxChange1 = (event) => {
        setIsChecked1(event.target.checked);
    };
    const handleCheckboxChange2 = (event) => {
        setIsChecked2(event.target.checked);
    };



    const [text, setText] = useState('');

    const handleTextareaChange = (event) => {
        setText(event.target.value);
    };

    const [selectedValue, setSelectedValue] = useState('');
    const [selectedSize, setSelectedSize] = useState('');

    function handleSelectChange(event) {
        setSelectedValue(event.target.value);
    }

    function handleSizeChange(event) {
        setSelectedSize(event.target.value);
    }

    //출발지 인풋
    const [headquarters2, setHeadquarters2] = useState('');

    const handleChange2 = (event) => {
        setHeadquarters2(event.target.value);
    };

    // 도착지 인풋
    const [headquarters3, setHeadquarters3] = useState('');

    const onBackClick = useCallback(() => {
        navigate('/Shipper/Main'); // 로고 클릭 시 '/' 경로로 이동합니다.
    }, [navigate]);

    const onLogoClick = useCallback(() => {
        navigate('/Shipper/Main'); // 로고 클릭 시 '/' 경로로 이동합니다.
    }, [navigate]);

    const handleChange3 = (event) => {
        setHeadquarters3(event.target.value);
    };

    const handleSubmit = useCallback(() => {
        if (!departureDateTime) {
            window.alert("출발 시간을 입력해주세요.");
            return;
        }
        if (!arrivalDateTime) {
            window.alert("도착 시간을 입력해주세요.");
            return;
        }
        if (!headquarters2) {
            window.alert("출발지 명을 입력해주세요.");
            return;
        }
        if (!headquarters3) {
            window.alert("도착지 명을 입력해주세요.");
            return;
        }
        if (!tonnage) {
            window.alert("차량 톤수를 입력해주세요.");
            return;
        }
        if (!selectedBox) {
            window.alert("차량 종류를 선택해주세요.");
            return;
        }
        if (!selectedSize) {
            window.alert("화물 크기를 선택해주세요.");
            return;
        }
        if (!selectedBoxNew) {
            window.alert("화물 종류를 선택해주세요.");
            return;
        }
        if (!selectedValue) {
            window.alert("수량을 선택해주세요.");
            return;
        }
        const now = new Date(); //한국은 UTC+9 시간대에 속하므로, UTC 시간으로 변환하면 한국 시간보다 9시간 빠른 시간이 나옴
        const currentDateTime = now.getFullYear() + '-' +
            ('0' + (now.getMonth()+1)).slice(-2) + '-' +
            ('0' + now.getDate()).slice(-2) + 'T' +
            ('0' + now.getHours()).slice(-2) + ':' +
            ('0' + now.getMinutes()).slice(-2) + ':' +
            ('0' + now.getSeconds()).slice(-2);

        navigate("/CargoRegiAI", { state: { userid, username, selected2, arrivalDateTime, departureDateTime, tonnage, selectedBox,
            isChecked1, isChecked2, text, selectedSize, selectedBoxNew, weight, textAreaValue, selectedValue,
            selectedButton,headquarters2, headquarters3, location,  address, currentDateTime, status,sectors} });
        
        console.log("Cargo to CargoAI");
        console.log("shipmember:", userid);
        console.log("username:", username);
        // selected : selected,
        console.log("selected2:", selected2);
        console.log("arrivalDateTime:", arrivalDateTime);
        console.log("departureDateTime:", departureDateTime);
        console.log("tonnage:", tonnage);
        console.log("selectedBox:", selectedBox);
        console.log("isChecked1:",isChecked1);
        console.log("isChecked2:", isChecked2);

        console.log("text:", text);
        console.log("selectedSize:", selectedSize);
        console.log("selectedBoxNew:", selectedBoxNew);
        console.log("weight:", weight);
        console.log("textAreaValue:", textAreaValue);
        console.log("selectedValue:", selectedValue);
        console.log("selectedButton:", selectedButton);
        console.log("headquarters2:", headquarters2);
        console.log("headquarters3:", headquarters3);
        console.log("arrival_Code:", location.zipCode);
        console.log("arrival_Address:", location.roadAddress);
        console.log("arrival_detailAddress:", location.detailAddress);
        console.log("departure_code:", address.postcode);
        console.log("departure_address:", address.address);
        console.log("departure_detailAddress:", address.detailAddress);
        console.log("currentDateTime:", currentDateTime);
        console.log("sectors: ", sectors);
    }, [navigate, userid, username, selected2, arrivalDateTime, departureDateTime, tonnage, selectedBox,
        isChecked1, isChecked2, text, selectedSize, selectedBoxNew, weight, textAreaValue, selectedValue,
        selectedButton,headquarters2, headquarters3, location,  address, currentDateTime, status,sectors]);

    return (
        <div className={styles.div}>
            <img className={styles.arrowIcon1} onClick={onBackClick} alt="" src="/images/arrow-3@2x.png"/>
            <div className={styles.div1}>
                <img className={styles.child} alt="" src="/images/R-58.png"/>
                <div className={styles.rectangleParent}>
                    <div className={styles.groupChild}/>

                    <div className={styles.kt}>
                        <input
                            tabIndex={1}
                            type="text"
                            value={headquarters2}
                            onChange={handleChange2}
                            placeholder="출발지 명을 입력하세요"
                            className={styles.kt_name}
                        />
                    </div>
                    {/*<div className={styles.kt}>KT 본사</div>*/}
                    {/*<div className={styles.kt1}>경기 성남시 분당구 불정로 90 KT빌딩</div>*/}
                    <div className={styles.div3}>{username}</div>
                    <div className={styles.groupItem}/>
                    <div className={styles.div4}>{userphone}</div>
                    <div className={styles.div5}>
                        <span>{`출발지 주소 `}</span>
                        <span className={styles.span}>*</span>
                    </div>
                </div>
                <div className={styles.rectangleGroup}>
                    <div className={styles.groupChild}/>
                    {/*<div className={styles.kt2}>KT 본사</div>*/}
                    <div className={styles.kt2}>
                        <input
                            tabIndex={3}
                            type="text"
                            value={headquarters3}
                            onChange={handleChange3}
                            placeholder="도착지 명을 입력하세요"
                            className={styles.kt_name}
                        />
                    </div>
                    {/*<div className={styles.kt3}>경기 성남시 분당구 불정로 90 KT빌딩</div>*/}
                    <div className={styles.div7}>{username}</div>
                    <div className={styles.lineDiv}/>
                    <div className={styles.div8}>{userphone}</div>
                    <div className={styles.div9}>
                        <span>{`도착지 주소 `}</span>
                        <span className={styles.span}>*</span>
                    </div>
                </div>
                <div className={styles.div10}>
                    <div className={styles.item}/>
                    <div className={styles.item}/>


                    <div className={styles.child3}/>

                    <textarea
                        tabIndex={7}
                        className={`${styles.child3}  ${styles.text_1}`}
                        value={text}
                        onChange={handleTextareaChange}
                        placeholder="차량 관련 요청사항을 입력하세요."
                    />

                    <select tabIndex={5} className={styles.child2} value={tonnage} onChange={e => setTonnage(e.target.value)}>
                        <option value="" disabled defaultSelected>톤 단위를 선택하세요</option>
                        <option value="1톤">1톤</option>
                        <option value="1.4톤">1.4톤</option>
                        <option value="2.5톤">2.5톤</option>
                        <option value="5톤">5톤</option>
                        <option value="8톤">8톤</option>
                        <option value="11톤">11톤</option>
                        <option value="25톤">25톤</option>
                    </select>


                    <div className={styles.child5}/>
                    <div className={styles.div16}>
                        <span className={styles.span1}>{`요청차량 `}</span>
                        <span className={styles.span}>*</span>
                    </div>
                    <div className={styles.div17}>
                        <span className={styles.span1}>{`차량 옵션 `}</span>
                        <span className={styles.span}>*</span>
                    </div>


                    <div>
                        <div
                            className={`${styles.child4} ${hoveredBox === '카고' ? styles.hover : ''} ${selectedBox === '카고' ? styles.selected : ''}`}
                            onMouseEnter={() => handleMouseEnter('카고')}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleClick('카고')}
                        ><img
                            className={styles.nounTruck8692971Icon}
                            alt=""
                            src="/images/nountruck869297-1@2x.png"
                        />
                            <div className={styles.div19} onMouseEnter={() => handleMouseEnter('카고')}
                                 onMouseLeave={handleMouseLeave} onClick={() => handleClick('카고')}>카고
                            </div>
                        </div>
                        <div
                            className={`${styles.child6} ${hoveredBox === '윙바디' ? styles.hover : ''} ${selectedBox === '윙바디' ? styles.selected : ''}`}
                            onMouseEnter={() => handleMouseEnter('윙바디')}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleClick('윙바디')}
                        ><img
                            className={styles.wingbody3Icon}
                            alt=""
                            src="/images/wingbody-3@2x.png"
                        />
                            <div className={styles.div20} onMouseEnter={() => handleMouseEnter('윙바디')}
                                 onMouseLeave={handleMouseLeave} onClick={() => handleClick('윙바디')}>윙바디
                            </div>
                        </div>
                        <div
                            className={`${styles.child7} ${hoveredBox === '탑' ? styles.hover : ''} ${selectedBox === '탑' ? styles.selected : ''}`}
                            onMouseEnter={() => handleMouseEnter('탑')}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleClick('탑')}
                        ><img
                            className={styles.nounTruck10818911Icon}
                            alt=""
                            src="/images/nountruck1081891-1@2x.png"
                        />
                            <div className={styles.div21} onMouseEnter={() => handleMouseEnter('탑')}
                                 onMouseLeave={handleMouseLeave} onClick={() => handleClick('탑')}>
                                탑
                            </div>
                        </div>
                    </div>
                    <div className={styles.div12_1}>
                        <input
                            tabIndex={6}
                            type="checkbox"
                            className={styles.child1}
                            checked={isChecked1}
                            onChange={handleCheckboxChange1}
                        />
                        <div className={styles.div12}>무진동</div>


                        <input
                            tabIndex={5}
                            type="checkbox"
                            className={styles.child11}
                            checked={isChecked2}
                            onChange={handleCheckboxChange2}
                        />
                        <div className={styles.div22}>냉동 / 냉장</div>


                        <div>
                            {buttons.map((button, index) => (
                                <button
                                    tabIndex={6}
                                    key={index}
                                    className={`${styles.customButton} ${selectedButton === button ? styles.selected_1 : ''}`}
                                    onClick={() => handleSelect(button)}
                                >
                                    {button}
                                </button>
                            ))}
                        </div>

                    </div>

                    <div className={styles.wingbody2}/>


                </div>
                <div className={styles.div26}>
                <div className={styles.child13}/>
                    <select
                        tabIndex={8}
                        className={styles.c2}
                        onChange={handleSizeChange}
                    >
                        <option value="" selected disabled> 화물 크기 *</option>
                        <option value="소형"> 소형</option>
                        <option value="중형"> 중형</option>
                        <option value="대형">대형</option>
                    </select>

                    <select
                        className={styles.c4}
                        onChange={handleSizeChange1}
                        tabIndex={9}
                    >
                        <option value="" selected disabled> 선호 업종 선택 *</option>
                        <option value="농림축산업"> 농림축산업</option>
                        <option value="제조업"> 제조업</option>
                        <option value="광업">광업</option>
                        <option value="도소매업"> 도소매업</option>
                        <option value="숙박 및 서비스업">숙박 및 서비스업</option>
                        <option value="기타 서비스업">기타 서비스업</option>
                        <option value="공공기관"> 공공기관</option>

                    </select>

                    <textarea className={styles.child16}/>
                    <div className={styles.div27}>상세정보</div>

                    <textarea
                        tabIndex={12}
                        className={`${styles.child16} ${styles.text_1}`}
                        value={textAreaValue}
                        onChange={handleChange}
                        placeholder="화물 관련 전달사항을 입력하세요"
                    />


                    <div className={styles.child4}/>
                    <div className={styles.child5}/>
                    <div className={styles.div16}>
                        <span className={styles.span1}>{`화물 정보 `}</span>
                        <span className={styles.span}>*</span>
                    </div>

                    <select className={styles.child15} onChange={handleSelectChange} tabIndex={10}>
                        <option value="">개수</option>
                        {Array.from({length: 30}, (_, i) => i + 1).map((num) => (
                            <option value={num} key={num}>{num}개</option>
                        ))}
                    </select>
                    <div className={styles.div351}>
                        <span>{`총 개수 `}</span>
                        <span className={styles.span}>*</span>
                    </div>

                    <div className={styles.div35}>
                        <span>{`총 중량 `}</span>
                        <span className={styles.span}>*</span>
                    </div>
                    <input type="number" className={styles.child19} value={weight} tabIndex={11}
                           onChange={(e) => setWeight(e.target.value)}/>

                    <div className={styles.div34}>톤</div>


                    <div
                        className={`${styles.child6} ${hoveredBoxNew === '박스' ? styles.hover : ''} ${selectedBoxNew === '박스' ? styles.selected : ''}`}
                        onMouseEnter={() => handleMouseEnterNew('박스')}
                        onMouseLeave={handleMouseLeaveNew}
                        onClick={() => handleClickNew('박스')}
                    ><img
                        className={styles.nounDeliveryBox63416741Icon}
                        alt=""
                        src="/images/noundeliverybox6341674-1@2x.png"
                    />
                        <div className={styles.div37} onMouseEnter={() => handleMouseEnterNew('박스')}
                             onMouseLeave={handleMouseLeaveNew} onClick={() => handleClickNew('박스')}>박스
                        </div>
                    </div>


                    <div
                        className={`${styles.child7} ${hoveredBoxNew === '기타' ? styles.hover : ''} ${selectedBoxNew === '기타' ? styles.selected : ''}`}
                        onMouseEnter={() => handleMouseEnterNew('기타')}
                        onMouseLeave={handleMouseLeaveNew}
                        onClick={() => handleClickNew('기타')}
                    >
                        <img
                            className={styles.nounMoneyBag34289061Icon}
                            alt=""
                            src="/images/nounmoneybag3428906-1@2x.png"
                        />
                        <div className={styles.div38} onMouseEnter={() => handleMouseEnterNew('기타')}
                             onMouseLeave={handleMouseLeaveNew} onClick={() => handleClickNew('기타')}>기타
                        </div>
                    </div>


                    <div
                        className={`${styles.child4} ${hoveredBoxNew === '파렛트' ? styles.hover : ''} ${selectedBoxNew === '파렛트' ? styles.selected : ''}`}
                        onMouseEnter={() => handleMouseEnterNew('파렛트')}
                        onMouseLeave={handleMouseLeaveNew}
                        onClick={() => handleClickNew('파렛트')}
                    >
                        <img
                            className={styles.nounPallet54288941Icon}
                            alt=""
                            src="/images/nounpallet5428894-1@2x.png"
                        />
                        <div className={styles.div19_1} onMouseEnter={() => handleMouseEnterNew('파렛트')}
                             onMouseLeave={handleMouseLeaveNew} onClick={() => handleClickNew('파렛트')}>파렛트
                        </div>
                    </div>


                </div>
                <div className={styles.div39}>주문 정보</div>
                <div className={styles.child23}/>


                <div className={styles.datePicker}>


                    <input
                        type="datetime-local"
                        id="departureDateTime"
                        className={styles.div40}
                        value={departureDateTime}
                        onChange={handleDepartureDateTimePick}
                    />

                    <label htmlFor="departureDateTime">
                        <img className={styles.calendar1Icon} alt="" src="/images/calendar-1@2x.png"/>
                    </label>
                </div>

                <div className={styles.child24}/>

                <div className={styles.datePicker}>
                    <input
                        type="datetime-local"
                        id="arrivalDate"
                        className={styles.div42}
                        min={departureDateTime} // 시작 날짜와 시간 이후만 선택 가능
                        value={arrivalDateTime} // 도착 시간을 상태 값으로 설정합니다.
                        onChange={handleArrivalDateTimePick}
                    />
                    <label htmlFor="arrivalDate">
                        <img className={styles.calendar2Icon} alt="" src="/images/calendar-1@2x.png"/>
                    </label>
                </div>


                <div className={styles.div44}>도착 시간</div>
                <div className={styles.div45}>출발 시간</div>

                    <div className={styles.div47}>
                        <img
                            className={styles.rectangleIcon}
                            alt=""
                            src="/images/R-57.png"
                        />
                        <div className={styles.div48}>주문 유형
                            <div
                                className={styles.div49}
                                onClick={() => setSelected2('편도')}
                            >
                                <span className={selected2 === '편도' ? styles.selectedText : styles.text}>편도</span>
                                <div className={selected2 === '편도' ? styles.c27 : styles.c28}/>
                                {selected2 === '편도' && <div className={styles.c30}/>}
                            </div>

                            <div
                                className={styles.div50}
                                onClick={() => setSelected2('왕복')}
                            >
                                <span className={selected2 === '왕복' ? styles.selectedText : styles.text}>왕복</span>
                                <div className={selected2 === '왕복' ? styles.c27 : styles.c28}/>
                                {selected2 === '왕복' && <div className={styles.c30}/>}
                            </div>


                        </div>
                        <div className={styles.child30}/>
                    </div>
                    <div className={styles.child31}/>

            </div>

            <div className={styles.div46}>화물 접수</div>

            <div className={styles.center2}>
                <div className={styles.child32}/>
                <div className={styles.div54} onClick={handleSubmit}>등록</div>

                <div className={styles.kakao}>
                    <input
                        type="text"
                        id="sample6_postcode"
                        placeholder="우편번호"
                        value={address.postcode}
                        readOnly
                        className={styles.street_number}
                    />
                    <input
                        type="text"
                        id="sample6_address"
                        placeholder="주소"
                        value={address.address}
                        readOnly
                        className={styles.kakao_text}
                    /><br/>
                    <input
                        type="button"
                        onClick={loadPostcode}
                        value="주소 찾기"
                        className={styles.postNum}
                    /><br/>
                    <input
                        tabIndex={2}
                        type="text"
                        id="sample6_detailAddress"
                        placeholder="상세주소"
                        value={address.detailAddress}
                        className={styles.address}
                        onChange={(e) => setAddress({...address, detailAddress: e.target.value})}
                    />

                </div>
                <div className={styles.kakao2}>
                    <input
                        type="text"
                        id="sample_zipCode"
                        placeholder="우편번호"
                        value={location.zipCode}
                        className={styles.street_number}
                        readOnly
                    />
                    <button onClick={openPostcode} className={styles.postNum}>주소 찾기</button>
                    <br/>
                    <input
                        type="text"
                        id="sample_roadAddress"
                        placeholder="주소"
                        value={location.roadAddress}
                        className={styles.kakao_text}
                        readOnly
                    /><br/>
                    <input
                        tabIndex={4}
                        type="text"
                        id="sample_detailAddress"
                        placeholder="상세주소"
                        className={styles.address}
                        value={location.detailAddress}
                        onChange={(e) => setLocation({...location, detailAddress: e.target.value})}
                    />

                </div>
            </div>
        </div>


    );
};

export default CargoRegi;
