import styles from "./CargoRegiAI.module.css";
import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {useNavigate, useLocation} from "react-router-dom";
import { Map, Polyline, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';

const CargoRegiAI = () => {

    const navigate = useNavigate();

    const uselocation = useLocation();
    const { userid, username, selected2, arrivalDateTime, departureDateTime, tonnage, selectedBox,
        isChecked1, isChecked2, isChecked3, text, selectedSize, selectedBoxNew, weight, textAreaValue, selectedValue,
        selectedButton,headquarters2, headquarters3, location,  address, currentDateTime, status,newoption } = uselocation.state;

    // 초기값 설정

    const [dist, setDist] = useState(60.5);
    const [elapsed, setElapsed] = useState(90); //min
    const [aicost, setAicost] = useState();
    const [hours, setHours] = useState();
    const [mins, setMins] = useState();
    const [yourcost, setYourcost] = useState();

    const [start_lng, setStart_lng] = useState();
    const [start_lat, setStart_lat] = useState();
    const [end_lng, setEnd_lng] = useState();
    const [end_lat, setEnd_lat] = useState();
    const [durationHour, setDurationHour] = useState();
    const [durationMin, setDurationMin] = useState();
    const [distance, setDistance] = useState();

    const [map, setMap] = useState(null);
    const [linePath, setLinePath] = useState([]);
    const modelData = {
        userid,
        username, 
        selected2, 
        arrivalDateTime, 
        departureDateTime, 
        tonnage, 
        selectedBox,
        isChecked1, 
        isChecked2, 
        text, 
        selectedSize, 
        selectedBoxNew, 
        weight, 
        textAreaValue, 
        selectedValue,
        selectedButton,
        headquarters2, 
        headquarters3, 
        location,  
        address, 
        currentDateTime, 
        status,
        newoption
    };
    useEffect(() => {
        fetch('http://127.0.0.1:5000/predict1', {method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(modelData)})
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Server response was not ok.');
            }
        })
        .then(data => {
            if (data.result) {
                setAicost(data.result.toLocaleString());
            } else {
                throw new Error('Result is not defined in the response.');
            }
        })
        .catch((error) => {
            console.log(error);
            setAicost('Error: ' + error.message);
        });
    }, [])

    
    const handleInputYourcost = (e) => {
        const value = e.target.value.replace(/,/g, ''); // 콤마 제거
        if (value === '') { // 입력값이 빈 문자열인 경우
            setYourcost('');
        } else if (!isNaN(value)) { // 숫자인 경우만 상태 업데이트
            setYourcost(parseInt(value, 10));
        }
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

        console.log('d:', distance);
        console.log(durationHour);
        console.log(durationMin);
        console.log(yourcost);
        console.log(status);
        console.log(newoption);

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
            distance: distance,
            durationHour: durationHour,
            durationMin: durationMin,
            yourcost: yourcost,
            status: status,
                newoption:newoption,
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

    const onBackClick = useCallback(() => {
        navigate('/CargoRegi'); // 로고 클릭 시 '/' 경로로 이동합니다.
    }, [navigate]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('jwt-token');
            if (!token) {
                // 토큰이 없으면 로그인 페이지로 리디렉션
                navigate('/login');
                console.log('비정상적인 접근입니다.')
            } else {
                try {
                    console.log(address.address);
                    console.log(location.roadAddress);
                    const userResponse = await axios.get('http://localhost:8080/user/mainpage', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    // 첫 번째 요청이 성공적으로 완료된 후에 두 번째 요청을 시작합니다.
                    const addresses = [address.address, location.roadAddress];
                    for (const addressNow of addresses) {

                        const addressResponse = await axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
                            headers: {
                                'Authorization': 'KakaoAK feaf6d6aeaa969fa877bfa1664b25b76'
                            },
                            params: {
                                query: addressNow
                            }
                        });

                        const result = addressResponse.data.documents[0];
                        console.log(result.road_address.x); //경도
                        console.log(result.road_address.y); //위도

                        if (addressNow === address.address) {
                            setStart_lng(result.road_address.x);
                            setStart_lat(result.road_address.y);
                        } else {
                            setEnd_lng(result.road_address.x);
                            setEnd_lat(result.road_address.y);
                        }
                    }
                } catch (error) {
                    // 오류 처리
                    console.error('비정상적인 접근입니다.', error);
                }
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log(start_lat, start_lng, end_lat, end_lng);
        if (start_lng && start_lat && end_lng && end_lat) {
        axios
            .get('https://apis-navi.kakaomobility.com/v1/directions', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'KakaoAK dce62bd87374aa818125c135e4f63de9'
                }, params: {
                    origin: `${start_lng},${start_lat}`, // 출발지
                    destination: `${end_lng},${end_lat}`, // 목적지
                }
            })
            .then(response => {
                console.log(response.data.routes[0].summary.distance/1000);
                console.log(response.data.routes[0].summary.duration/3600);
                console.log()
                const roads = response.data.routes[0].sections[0].roads;
                const newPath = [];

                roads.forEach(road => {
                    for (let i = 0; i < road.vertexes.length; i += 2) {
                        newPath.push({
                            lat: road.vertexes[i + 1],
                            lng: road.vertexes[i]
                        });
                    }
                });

                setLinePath(newPath);
                setDistance((response.data.routes[0].summary.distance/1000).toFixed(2)); //km
                setDurationHour(Math.floor(response.data.routes[0].summary.duration/3600));
                setDurationMin(Math.round(response.data.routes[0].summary.duration/60) % 60);

                    });
                }
        }, [start_lat, start_lng, end_lat, end_lng]);

    useEffect(() => {
        console.log(distance, durationHour, durationMin);
    }, [map, linePath, distance, durationHour, durationMin]);


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
                {start_lng && end_lng && start_lat && end_lat && (
                    <Map
                    center={{ lat: (parseFloat(start_lat)+parseFloat(end_lat))/2, lng: (parseFloat(start_lng)+parseFloat(end_lng))/2 }}   // 지도의 중심 좌표
                    style={{ width: '690px', height: '430px' }} // 지도 크기
                    level={10}
                >
                    {linePath.length > 0 && (
                        <Polyline // 경로 표시
                            path={linePath}
                            strokeWeight={5} // 선의 두께
                            strokeColor="#FF0000" // 선의 색깔
                            strokeOpacity={0.7} // 선의 불투명도
                            strokeStyle="solid" // 선의 스타일
                        />

                    )}
                        <MapMarker position={{ lat: parseFloat(start_lat), lng: parseFloat(start_lng) }} content='출발지z' />
                        <MapMarker position={{ lat: parseFloat(end_lat), lng: parseFloat(end_lng) }} content={'도착지'} />
                </Map>
                    )}
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
                    <div className={styles.km}>{distance} km</div>
                    <div className={styles.div3}>{durationHour}시간 {durationMin}분</div>
                    <div className={styles.div4}>{aicost ? aicost.toLocaleString() : 'Calculating...'} 원</div>
                    <div className={styles.div5}>
                        <input
                            type="text"
                            className={styles.idbox}
                            value={(yourcost || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
