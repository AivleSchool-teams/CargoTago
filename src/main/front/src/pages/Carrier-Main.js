import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Carrier-Main.module.css";
import axios from "axios";

const CarrierMain = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState(null);

    //화주가 등록한 화물 리스트
    const [registInfoList, setRegistInfoList] = useState([]);

    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: '', lng: '' },
    });

    const [fetchLocation, setFetchLocation] = useState(false);


    // 위치 정보 가져오기
    useEffect(() => {
        const onSuccess = location => {
            setLocation({
                loaded: true,
                coordinates: {
                    lat: location.coords.latitude,
                    lng: location.coords.longitude,
                },
            });  // 메시지 표시
        };

        const onError = error => {
            setLocation({
                loaded: true,
                error: error.message,
            });
        };

        if (!navigator.geolocation) {
            onError({ message: 'Geolocation not supported' });
        } else {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }
    }, [fetchLocation]);



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

        axios.get('http://localhost:8080/user/carrier/alllist', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                setRegistInfoList(res.data);
                console.log(res.data);
                console.log(typeof(res.data));
            })
    }, [navigate, username]);

    const onListClick = useCallback(() => { // 차주 배차완료 리스트 페이지 이동
        navigate('/Carrier/Main');
    }, [navigate]);

    const onCarClick = useCallback(() => { // 차주 차량 등록 페이지 이동
        navigate('/Carrier/Car');
    }, [navigate]);
    const onPostClick = useCallback(() => { // 화주 배차완료 리스트 페이지 이동
        navigate("/Post");
    }, [navigate]);

    const onDetailClick = useCallback((registInfo) => {
        navigate(`/Carrier/AIselect/${registInfo.id}`);
    }, [navigate]);

    const onListClickOrig = useCallback(() => {
        navigate('/Carrier/List');
    })


    const onGeoClick = useCallback(() =>{
        axios.post('http', {
            lat: location.coordinates.lat,
            lng: location.coordinates.lng,
        })
            .then(res => {

            })
    })


    return (
        <div className={styles.div}>
            <div className={styles.center}>
                <div className={styles.vectorParent}>
                    <img
                        className={styles.groupChild}
                        alt=""
                        src="/images/rectangle-10@2x.png"
                    />
                    <button className={styles.div2} onClick={onPostClick}>게시판</button>
                </div>
                <img onClick={() => setFetchLocation(!fetchLocation)} className={styles.moa11} alt="" src="/images/moa-1-1@2x.png" />
            </div>
            <div className={styles.groupParent}>
                <div className={styles.rectangleParent} onClick={onListClickOrig}>
                    <div className={styles.groupItem} />
                    <div className={styles.div3} >운송 현황</div>
                    <img
                        className={styles.image11Icon}
                        alt=""
                        src="/images/notetime.png"
                    />
                </div>
                <div className={styles.vectorGroup}>
                    <img
                        className={styles.groupInner}
                        alt=""
                        src="/images/rectangle-15@2x.png"
                    />
                    <div className={styles.parent}>
                        <div className={styles.div7}>오늘도 좋은 하루 되세요!</div>
                        <div className={styles.div8}>
                            {username}님, 안녕하세요!
                        </div>
                    </div>
                </div>
                <div className={styles.rectangleGroup} onClick={onCarClick}>
                    <div className={styles.groupItem} />
                    <div className={styles.div3}>차량등록</div>
                    <img
                        className={styles.image12Icon}
                        alt=""
                        src="/images/notepen.png"
                    />
                </div>
            </div>
            {/* 일반 배차 리스트 */}
            <div className={styles.group}>
                <div className={styles.div10}>일반 차량</div>
                <div className={styles.lineDiv} />


                {/* 배차 1개 */}
                {registInfoList.map((registInfo, index) => (
                <div key={index} className={styles.vectorContainer} onClick={() => onDetailClick(registInfo)}>
                    <img
                        className={styles.rectangleIcon}
                        alt=""
                        src="/images/rectangle-57@2x.png"
                    />
                    <div className={styles.div11}>{registInfo.departure_address}</div>
                    <div className={styles.div12}>{registInfo.arrival_Address}</div>
                    <div className={styles.div13}>{`${registInfo.tonnage} | ${registInfo.selectedBox} | `}</div>
                    <div className={styles.km}>{registInfo.distance} km</div>
                    <div className={styles.div14}>{registInfo.yourcost} 원</div>
                    <img
                        className={styles.image13Icon}
                        alt=""
                        src="/images/image-13@2x.png"
                    />
                    <div className={styles.div15}>
                        <span>{`출발지 주소 `}</span>
                        <span className={styles.span}>*</span>
                    </div>
                    <div className={styles.div16}>
                        <span>{`도착지 주소 `}</span>
                        <span className={styles.span}>*</span>
                    </div>
                </div>
                ))}

            </div>
            {/* AI 추천 배차 리스트 */}

            {/*<div className={styles.groupContainer}>*/}
            {/*    <div className={styles.container}>*/}
            {/*        <div className={styles.div23}>내 주변 차량</div>*/}
            {/*        <div className={styles.ellipseDiv} />*/}
            {/*        <div className={styles.groupChild3} />*/}
            {/*        <div className={styles.ai}>AI 추천</div>*/}
            {/*        <div className={styles.groupChild4} />*/}
            {/*        <div className={styles.div24}>?</div>*/}
            {/*        <div*/}
            {/*            className={styles.hoverIcon}*/}
            {/*            alt="">*/}
            {/*            <span className={styles.hoverIcon_text}>  AI 배차 추천은 생각중입니다. AI 배차 추천은 생각중입니다.</span><br/>*/}
            {/*            <span className={styles.hoverIcon_text}>  AI 배차 추천은 생각중입니다. </span>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    /!* 배차 1개 *!/*/}
            {/*    {registInfoList.map((registInfo, index) => (*/}
            {/*    <div key={index}  className={styles.groupDiv} onClick={() => onListClick(registInfo.id)}>*/}
            {/*        <img*/}
            {/*            className={styles.rectangleIcon}*/}
            {/*            alt=""*/}
            {/*            src="/images/rectangle-57@2x.png"*/}
            {/*        />*/}
            {/*        <div className={styles.div11} onClick={onGeoClick}>*/}
            {/*            <p className={styles.p}>경기 김포시ㅇㅇ 양촌</p>*/}
            {/*        </div>*/}
            {/*        <div className={styles.div12}>서울 강동 동남로</div>*/}
            {/*        <div className={styles.div13}>{`11톤 | 윙바디 | `}</div>*/}
            {/*        <div className={styles.km}>17 km</div>*/}
            {/*        <div className={styles.div14}>335,000 원</div>*/}
            {/*        <img*/}
            {/*            className={styles.image13Icon}*/}
            {/*            alt=""*/}
            {/*            src="/images/image-13@2x.png"*/}
            {/*        />*/}
            {/*        <div className={styles.div15}>*/}
            {/*            <span>{`출발지 주소 `}</span>*/}
            {/*            <span className={styles.span}>*</span>*/}
            {/*        </div>*/}
            {/*        <div className={styles.div16}>*/}
            {/*            <span>{`도착지 주소 `}</span>*/}
            {/*            <span className={styles.span}>*</span>*/}
            {/*        </div>*/}
            {/*        <div className={styles.groupChild2} />*/}
            {/*    </div>*/}
            {/*    ))}*/}


            {/*</div>*/}
        </div>
    );
};
export default CarrierMain;
