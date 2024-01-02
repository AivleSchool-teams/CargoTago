import styles from "./CargoRegi.module.css";
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const CargoRegi = () => {

    const [weight, setWeight] = useState(45);
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
        const [date, time] = dateTime.split('T');
        const [hour, minute] = time.split(':');
        const newTime = `${date}T${parseInt(hour)}:${minute}`;
        setDepartureDateTime(newTime);
    };

    const handleArrivalDateTimePick = (event) => {
        const dateTime = event.target.value;
        const [date, time] = dateTime.split('T');
        const [hour, minute] = time.split(':');
        const newTime = `${date}T${parseInt(hour)}:${minute}`;

        if (newTime < departureDateTime) {
            alert("도착 시간은 출발 시간보다 빠를 수 없습니다.");
            setArrivalDateTime("");
        } else {
            const arrivalDateTime = new Date(newTime).toISOString();
            setArrivalDateTime(newTime);
            console.log(newTime);
        }
    };


    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    }
    const [selected, setSelected] = useState('독차');
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
    const [isChecked3, setIsChecked3] = useState(false);

    const handleCheckboxChange1 = (event) => {
        setIsChecked1(event.target.checked);
    };
    const handleCheckboxChange2 = (event) => {
        setIsChecked2(event.target.checked);
    };

    const handleCheckboxChange3 = (event) => {
        setIsChecked3(event.target.checked);
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
    const id = 1; // 임의의 id
    const username = "songhyunsung"; // 임의의 username
    //=========================================================
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(id);
        console.log(username);
        console.log(selected);
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
        axios.post('http://localhost:8080/api/actual-endpoint',{
            id : id,
            username : username,
            selected : selected,
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
            selectedValue : selectedValue

        })
            .catch(error => {
                console.error("There was an error!", error);
                window.alert("등록 중 에러가 발생했습니다");
            });

    };


    return (
        <div className={styles.div}>
            <div className={styles.div1}>
                <img className={styles.child} alt="" src="/images/R-58.png"/>
                <div className={styles.rectangleParent}>
                    <div className={styles.groupChild}/>
                    <div className={styles.kt}>KT 본사</div>
                    <div className={styles.kt1}>경기 성남시 분당구 불정로 90 KT빌딩</div>
                    <div className={styles.div2}>세부 주소</div>
                    <div className={styles.div3}>홍길동</div>
                    <div className={styles.groupItem}/>
                    <div className={styles.div4}>010-1234-5678</div>
                    <div className={styles.div5}>
                        <span>{`출발지 주소 `}</span>
                        <span className={styles.span}>*</span>
                    </div>
                </div>
                <div className={styles.rectangleGroup}>
                    <div className={styles.groupChild}/>
                    <div className={styles.kt2}>KT 본사</div>
                    <div className={styles.kt3}>경기 성남시 분당구 불정로 90 KT빌딩</div>
                    <div className={styles.div6}>세부주소</div>
                    <div className={styles.div7}>홍길동</div>
                    <div className={styles.lineDiv}/>
                    <div className={styles.div8}>010-1234-5678</div>
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
                        className={`${styles.child3}  ${styles.text_1}`}
                        value={text}
                        onChange={handleTextareaChange}
                        placeholder="여기에 입력하세요."
                    />

                    <div className={styles.div14}>1톤</div>


                    <select className={styles.child2} value={tonnage} onChange={e => setTonnage(e.target.value)}>
                        <option value="">선택하세요</option>

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
                        <span>{`요청 차량 `}</span>
                        <span className={styles.span}>*</span>
                    </div>
                    <div className={styles.div17}>
                        <span>{`차량 옵션 `}</span>
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
                            type="checkbox"
                            className={styles.child1}
                            checked={isChecked1}
                            onChange={handleCheckboxChange1}
                        />
                        <div className={styles.div12}>무진동</div>


                        <input
                            type="checkbox"
                            className={styles.child11}
                            checked={isChecked2}
                            onChange={handleCheckboxChange2}
                        />
                        <div className={styles.div22}>냉동</div>


                        <input
                            type="checkbox"
                            className={styles.child12}
                            checked={isChecked3}
                            onChange={handleCheckboxChange3}
                        />
                        <div className={styles.div25}>냉장</div>
                    </div>


                    <div className={styles.wingbody2}/>


                </div>
                <div className={styles.div26}>
                    <div className={styles.child13}/>


                    <span>{`크기 `}</span>
                    <span className={styles.span}>*</span>
                    <select
                        className={styles.child2}
                        onChange={handleSizeChange}
                    >
                        <option value=""> 크기 *</option>
                        <option value="small"> 소형</option>
                        <option value="medium"> 중형</option>
                        <option value="large">대형</option>
                    </select>


                    <div className={styles.child15}/>

                    <textarea className={styles.child16}/>
                    <div className={styles.div27}>상세정보</div>

                    <textarea
                        className={`${styles.child16} ${styles.text_1}`}
                        value={textAreaValue}
                        onChange={handleChange}
                        placeholder="세부 내용."
                    />


                    <div className={styles.child4}/>
                    <div className={styles.child5}/>
                    <div className={styles.div16}>
                        <span>{`화물 정보 `}</span>
                        <span className={styles.span}>*</span>
                    </div>

                    <select
                        className={styles.child15}
                        onChange={handleSelectChange}
                    >
                        <option value="">수량 * </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>

                    <div className={styles.div35}>
                        <span>{`총 중량 `}</span>
                        <span className={styles.span}>*</span>
                    </div>
                    <input type="number" className={styles.child19} value={weight}
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
            </div>
            <div className={styles.div46}>화물 접수</div>
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
                <div className={styles.div51}>혼적 여부</div>
                <div
                    className={styles.div52}
                    onClick={() => setSelected('독차')}
                >
                    <span className={selected === '독차' ? styles.selectedText : styles.text}>독차</span>
                    <div className={selected === '독차' ? styles.c27 : styles.c28}/>
                    {selected === '독차' && <div className={styles.c29}/>}
                </div>
                <div
                    className={styles.div53}
                    onClick={() => setSelected('혼적')}
                >
                    <span className={selected === '혼적' ? styles.selectedText : styles.text}>혼적</span>
                    <div className={selected === '혼적' ? styles.c27 : styles.c28}/>
                    {selected === '혼적' && <div className={styles.c29}/>}
                </div>

                <div className={styles.child30}/>
            </div>
            <div className={styles.child31}/>
            <img className={styles.arrowIcon} alt="" src="/images/arrow-3@2x.png"/>
            <div className={styles.child32}  onClick={handleSubmit}/>
            <div className={styles.div54} onClick={handleSubmit}>등록</div>

            <img className={styles.moa11} alt="" src="/images/1-1@2x.png"/>


            <div className={styles.container}>

            </div>


        </div>


    );
};

export default CargoRegi;
