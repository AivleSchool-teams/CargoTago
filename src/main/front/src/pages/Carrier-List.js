import { useCallback, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select"
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';

import { useNavigate } from "react-router-dom";

import styles from "./Shipper-List.module.css";
import axios from "axios";

const CarrierList = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [userphone, setUserphone] = useState(null);
    const [useraccount, setUseraccount] = useState(null);
    const [usercarnumber, setUsercarnumber] = useState(null);

    const [registInfoList, setRegistInfoList] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('jwt-token');
        if (!token) {
            // 토큰이 없으면 로그인 페이지로 리디렉션
            navigate('/login');
            console.log('비정상적인 접근입니다.')
        } else {
            axios.get('http://localhost:8080/user/carrier/mylist', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {

                    axios
                        .get('http://localhost:8080/user/carrier/mypage', {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        .then(res => {
                            setUsername(res.data.name);
                            setUserphone(res.data.phone);
                            setUseraccount(res.data.account);
                        })
                        .catch(error => {
                            // 오류 처리
                            console.error('비정상적인 접근입니다.', error);
                        });
                    // 사용자 이름 표시
                    if(response.data.length === 0) {
                        console.log('배차 승인한 화물이 없습니다.')
                    } else {
                        console.log(response.data);
                        setRegistInfoList(response.data);
                    }

                })
                .catch(error => {
                    // 오류 처리
                    console.error('비정상적인 접근입니다.', error);
                });
        }
    }, [navigate]);

    const onLogoClick = useCallback(() => {
        navigate('/Carrier/Main'); // 로고 클릭 시 '/' 경로로 이동합니다.
    }, [navigate]);
    const onBackClick = useCallback(() => {
        navigate('/Carrier/Main'); // 로고 클릭 시 '/' 경로로 이동합니다.
    }, [navigate]);

    // 검색바
    const [search, setSearch] = useState("");

    const onChange = (e) => {
        setSearch(e.target.value);
    };

    const onSearch = (e) => {
        e.preventDefault();
        // If search is empty, refresh the page
        if (search === "") {
            window.location.reload();
        } else {
            setRegistInfoList(registInfoList.filter(registInfo => {
                for (let key in registInfo) {
                    if (String(registInfo[key]).includes(search)) {
                        return true;
                    }
                }
                return false;
            }));
        }
    };

    const onDetailClick = useCallback((registInfo) => {
        navigate(`/Carrier/Detail/${registInfo.id}`);
    }, [navigate]);

    // 정렬 개수 선택
    const options = [
        { value: "five", label: "5개씩 보기" },
        { value: "ten", label: "10개씩 보기" },
        { value: "fifteen", label: "15개씩 보기" },
    ]

    const [departureDate, setDepartureDate] = useState("");
    const [arrivalDate, setArrivalDate] = useState("");

    const handleDepartureDatePick = (event) => {
        setDepartureDate(event.target.value);
    };

    const handleArrivalDatePick = (event) => {
        setArrivalDate(event.target.value);
    };

    const [a, setA] = useState(4);

    const handleClick = (value) => {
        setA(value);
    }
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    const options1 = [
        { value: 3, label: "3개씩 보기" },
        { value: 5, label: "5개씩 보기" },
        { value: 10, label: "10개씩 보기" },
    ];

    const [itemCount, setItemCount] = useState(options1[1].value); // 기본값으로 options 배열의 첫 번째 요소의 value를 사용합니다.
    const handleSelectChange = (selectedOption) => {
        setItemCount(selectedOption.value);
    }


    return (
        <div className={styles.div}>

            <div className={styles.div1}>
                <img className={styles.child} alt="" src="/images/rectangle-58@2x.png"/>

                <div className={styles.inner}>

                    {/* 배차 1개 박스 - back 연결 필요 /링크도 연결 필요-현재는 메인으로/*/}
                    {registInfoList
                        .filter(registInfo => {
                            // status 조건 체크
                            const statusCondition = a === 4 ? true : registInfo.status === a;

                            // 선택된 출발날짜와 도착날짜 사이의 데이터 선택
                            const selectedDepartureDate = departureDate ? new Date(departureDate) : null;
                            const selectedArrivalDate = arrivalDate ? new Date(arrivalDate) : null;
                            const registDepartureDate = new Date(registInfo.departureDateTime);
                            const registArrivalDate = new Date(registInfo.arrivalDateTime);

                            // 시간 부분을 제거하고 날짜만 비교
                            if (selectedDepartureDate) selectedDepartureDate.setHours(0, 0, 0, 0);
                            if (selectedArrivalDate) selectedArrivalDate.setHours(0, 0, 0, 0);
                            registDepartureDate.setHours(0, 0, 0, 0);
                            registArrivalDate.setHours(0, 0, 0, 0);

                            const dateCondition = selectedDepartureDate && selectedArrivalDate ?
                                (selectedDepartureDate <= registDepartureDate && registDepartureDate <= selectedArrivalDate &&
                                    selectedDepartureDate <= registArrivalDate && registArrivalDate <= selectedArrivalDate) : true;

                            return statusCondition && dateCondition;
                        }).slice(0, itemCount)
                        .map((registInfo, index) => (
                                <div key={index}  className={styles.rectangleParent} onClick={() => onDetailClick(registInfo)}>
                                    <div className={styles.frameChild}/>
                                    <div className={styles.frameParent}>
                                        <div className={styles.parent}>
                                            <div
                                                className={styles.div2}>{`${registInfo.tonnage}  ${registInfo.selectedBox}  `}</div>

                                            <div className={styles.div3}>
                                                {registInfo.isChecked1 && registInfo.isChecked2 ? '냉동 / 냉장, 무진동' :
                                                    (registInfo.isChecked1 ? '냉동 / 냉장' :
                                                        (registInfo.isChecked2 ? '무진동' : ''))}
                                            </div>
                                        </div>
                                        <b className={styles.b}>{`${formatNumber(registInfo.yourcost)} 원`}</b>
                                    </div>
                                    <div className={styles.startloc}>
                                        <div className={styles.kt}>{registInfo.headquarters2}</div>
                                        <div className={styles.kt1}>
                                            {registInfo.departure_address}
                                        </div>
                                        <div className={styles.div4}>접수일 : {
                                            new Date(registInfo.departureDateTime).toLocaleString('ko-KR', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })
                                        }</div>
                                    </div>
                                    <div className={styles.startloc1}>
                                        <div className={styles.kt}>{registInfo.headquarters3}</div>
                                        <div className={styles.kt1}>
                                            {registInfo.arrival_Address}
                                        </div>
                                        <div className={styles.div4}>접수일 : {
                                            new Date(registInfo.arrivalDateTime).toLocaleString('ko-KR', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })
                                        }</div>
                                    </div>
                                    <div className={styles.group}>
                                        <div className={styles.div6}>{username}</div>
                                        <div className={styles.div7}>{userphone}</div>
                                    </div>
                                    <div className={styles.n0001Parent}>
                                        <div className={styles.n0001}>N{registInfo.id.toString().padStart(4, '0')}</div>
                                        <div className={styles.frameItem}/>
                                        <div className={styles.div8}>
                                            {registInfo.status === 0 ? '접수 완료' :
                                                registInfo.status === 1 ? '배차 완료' :
                                                    '운송 완료'}
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                </div>

                <div className={styles.rectangleGroup}>
                    <div className={styles.groupChild}/>
                    <div className={styles.div9}>접수번호</div>
                    <div className={styles.div10}>출발지 정보</div>
                    <div className={styles.div11}>도착지 정보</div>
                    <div className={styles.div12}>요청 차량 및 운임</div>
                    <div className={styles.div13}>기사 정보</div>
                </div>
                <div className={styles.container}>
                    <Select options={options1} className={styles.div14} onChange={handleSelectChange} defaultValue={options1[0]}/>
                </div>
                <div className={styles.groupDiv}>
                    <button className={`${styles.div15} ${a === 4 ? styles.active : ''}`}
                            onClick={() => handleClick(4)}>전체
                    </button>
                    <div className={styles.groupItem}/>
                    <button className={`${styles.div16} ${a === 1 ? styles.active : ''}`}
                            onClick={() => handleClick(1)}>배차 완료
                    </button>
                    <div className={styles.groupInner}/>
                    <button className={`${styles.div17} ${a === 2 ? styles.active : ''}`}
                            onClick={() => handleClick(2)}>운송 완료
                    </button>
                    <div className={styles.lineDiv}/>
                </div>
            </div>
            <div className={styles.div19}>
                <img
                    className={styles.item}
                    alt=""
                    src="/images/rectangle-571@2x.png"
                />
                <div className={styles.child1}/>
                <form  onSubmit={onSearch}>
                    <div className={styles.parent1}>
                        <div className={styles.div20}>주소 검색</div>
                        <input type="text" className={styles.div21} value={search} onChange={onChange}/>


                        <button
                            type={"submit"} className={styles.search1Icon}
                            style={{backgroundImage: `url("/images/search-1@2x.png")`}}
                            alt="검색"
                        >
                        </button>
                    </div>
                    <div className={styles.parent2}>

                        <div className={styles.div22}>~</div>

                        <div>
                            <img
                                className={styles.calendar3Icon}
                                alt=""
                                src="/images/calendar-3@2x.png"
                                onClick={() => {
                                }} // 빈 함수로 클릭 이벤트 처리
                            />
                            <div className={styles.div25}>접수일</div>
                        </div>
                    </div>
                </form>

                <div className={styles.datePicker}>
                    <input
                        type="date"
                        id="departureDate"
                        className={styles.div40}
                        value={departureDate}
                        onChange={handleDepartureDatePick}
                    />
                </div>


                <div className={styles.datePicker}>
                    <input
                        type="date"
                        id="arrivalDate"
                        className={styles.div42}
                        min={departureDate} // 시작 날짜 이후만 선택 가능
                        value={arrivalDate} // 도착 날짜를 상태 값으로 설정합니다.
                        onChange={handleArrivalDatePick}
                    />
                </div>


            </div>
            <img className={styles.icon} alt="" src="/images/1-1@2x.png" onClick={onLogoClick}/>
            <img
                className={styles.arrowIcon}
                onClick={onBackClick}
                alt=""
                src="/images/arrow-3@2x.png"
            />

        </div>
    );
};
export default CarrierList;