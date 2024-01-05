import styles from "./CargoRegiAI.module.css";
import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {useNavigate, useLocation} from "react-router-dom";

const CargoRegiAI = () => {

    const navigate = useNavigate();

    const uselocation = useLocation();
    const { userid, username, selected2, arrivalDateTime, departureDateTime, tonnage, selectedBox,
        isChecked1, isChecked2, isChecked3, text, selectedSize, selectedBoxNew, weight, textAreaValue, selectedValue,
        selectedButton,headquarters2, headquarters3, location,  address, currentDateTime, status } = uselocation.state;

    // 초기값 설정


    const [dist, setDist] = useState(60.5);
    const [elapsed, setElapsed] = useState(90); //min
    const [aicost, setAicost] = useState(392000);
    const [hours, setHours] = useState();
    const [mins, setMins] = useState();
    const [yourcost, setYourcost] = useState();

    useEffect(() => {
        setHours(parseInt(elapsed / 60));
        setMins(elapsed % 60);
    }, [elapsed]);

    const handleInputYourcost = (e) => {
        setYourcost(e.target.value)
    };

    const handleSubmit = () => {
        if (!yourcost) {
            window.alert("최종 운임료를 입력해주세요.");
            return;
        }
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

        console.log('d:', dist);
        console.log(elapsed);
        console.log(aicost);
        console.log(yourcost);
        console.log(status);

        const token = localStorage.getItem('jwt-token');
        axios.post('http://localhost:8080/user/cargoregi/regi', {
            shipmember: userid,
            username: username,
            // selected : selected,
            selected2: selected2,
            arrivalDateTime: arrivalDateTime,
            departureDateTime: departureDateTime,
            tonnage: tonnage,
            selectedBox: selectedBox,
            isChecked1: isChecked1,
            isChecked2: isChecked2,
            isChecked3: isChecked3,
            text: text,
            selectedSize: selectedSize,
            selectedBoxNew: selectedBoxNew,
            weight: weight,
            textAreaValue: textAreaValue,
            selectedValue: selectedValue,
            selectedButton: selectedButton,
            headquarters2: headquarters2,
            headquarters3: headquarters3,
            arrival_Code: location.zipCode,
            arrival_Address: location.roadAddress,
            arrival_detailAddress: location.detailAddress,
            departure_code: address.postcode,
            departure_address: address.address,
            departure_detailAddress: address.detailAddress,
            currentDateTime: currentDateTime,
            dist: dist,
            elapsed: elapsed,
            yourcost: yourcost,
            status: status,
        }
            , {
                headers: {
                    Authorization: `Bearer ${token}` // 토큰을 헤더에 추가
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

    console.log('l:',location);
    console.log('a:',address);
    const onBackClick = useCallback(() => {
        navigate('/CargoRegi'); // 로고 클릭 시 '/' 경로로 이동합니다.
    }, [navigate]);

    return (
        <div className={styles.ai}>
            <div className={styles.vectorParent}>
                <img
                    className={styles.groupChild}
                    onClick={onBackClick}
                    alt=""
                    src="/images/arrow-3@2x.png"
                />
                <div className={styles.div}>화물 접수</div>
            </div>

            <div className={styles.aiChild}>
                {/*이 부분이 지도 길찾기 API 들어갈 부분임다!*/}
            </div>

            <div className={styles.rectangleParent}>
                <div className={styles.groupItem} />
                <button className={styles.div1} onClick={handleSubmit}><span className={styles.divspan}>등록하기</span></button>
                <div className={styles.vectorGroup}>
                    <img
                        className={styles.groupInner}
                        alt=""
                        src="/images/rectangle-62@2x.png"
                    />
                    <div className={styles.div2}>총 거리</div>
                    <div className={styles.km}>{dist} km</div>
                    <div className={styles.div3}>{hours}시간 {mins}분</div>
                    <div className={styles.div4}>{aicost.toLocaleString()} 원</div>
                    <div className={styles.div5}>
                        <input
                            type="text"
                            className={styles.idbox}
                            //placeholder="입력"
                            value={yourcost}
                            onChange={handleInputYourcost}
                        />원
                    </div>
                    <div className={styles.div6}>소요 시간</div>
                    <div className={styles.ai1}>AI 최적 운임</div>
                    <div className={styles.div7}>최종 운임료</div>
                    <img className={styles.lineIcon} alt="" src="/images/line-12@2x.png"/>
                    <div className={styles.lineDiv} />
                    <div className={styles.groupChild1} />
                </div>
            </div>
        </div>
    );
};

export default CargoRegiAI;
