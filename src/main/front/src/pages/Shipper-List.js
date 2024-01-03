import { useCallback, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select"
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';

import { useNavigate } from "react-router-dom";

import styles from "./Shipper-List.module.css";
import axios from "axios";

const ShipperList = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState(null);
    const [userid, setUserid] = useState(null);
    const [usertype, setUsertype] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('jwt-token');
        if (!token) {
            // 토큰이 없으면 로그인 페이지로 리디렉션
            navigate('/login');
            console.log('비정상적인 접근입니다.')
        } else {
            axios.get('http://localhost:8080/user/shipper/mylist', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    // 사용자 이름 표시
                    if(response.data.length === 0) {
                        console.log('등록한 화물이 없습니다.')
                    } else {
                        console.log(response.data);
                        console.log(response.data[0].id);
                    }


                })
                .catch(error => {
                    // 오류 처리
                    console.error('비정상적인 접근입니다.', error);
                });
        }
    }, [navigate]);


    const [startDate, setStartDate] = useState(new Date("2024.01.17"));
    const [endDate, setEndDate] = useState(new Date("2024.01.20"));

    const onLogoClick = useCallback(() => {
        navigate('/Shipper/Main'); // 로고 클릭 시 '/' 경로로 이동합니다.
    }, [navigate]);
    const onBackClick = useCallback(() => {
        navigate('/Shipper/Main'); // 로고 클릭 시 '/' 경로로 이동합니다.
    }, [navigate]);

    // 검색바
    const [search, setSearch] = useState("");
    const onChange = (e) => {
        setSearch(e.target.value)
    }
    const onDetailClick = useCallback(() => {  // 화주 메인페이지로 링크 변경 해야함.
        navigate("/Shipper/Detail");
    }, [navigate]);

    // 정렬 개수 선택
    const options = [
        { value: "five", label: "5개씩 보기" },
        { value: "ten", label: "10개씩 보기" },
        { value: "fifteen", label: "15개씩 보기" },
    ]

    return (
        <div className={styles.div}>
            <div className={styles.div1}>
                <img className={styles.child} alt="" src="/images/rectangle-58@2x.png" />
                
                <div className={styles.inner}>

                    {/* 배차 1개 박스 - back 연결 필요 /링크도 연결 필요-현재는 메인으로/*/}
                    <div className={styles.rectangleParent} onClick={onDetailClick}>
                        <div className={styles.frameChild} />
                        <div className={styles.frameParent}>
                            <div className={styles.parent}>
                                <div className={styles.div2}>1톤 카고</div>
                                <div className={styles.div3}>호루, 리프트..</div>
                            </div>
                            <b className={styles.b}>80,000 원</b>
                        </div>
                        <div className={styles.startloc}>
                            <div className={styles.kt}>KT 본사</div>
                            <div className={styles.kt1}>
                                경기 성남시 분당구 불정로 90 KT빌딩
                            </div>
                            <div className={styles.div4}>2023.12.28 09:00</div>
                        </div>
                        <div className={styles.startloc1}>
                            <div className={styles.kt}>KT 본사</div>
                            <div className={styles.kt1}>
                                경기 성남시 분당구 불정로 90 KT빌딩
                            </div>
                            <div className={styles.div4}>2023.12.28 09:00</div>
                        </div>
                        <div className={styles.group}>
                            <div className={styles.div6}>홍길동</div>
                            <div className={styles.div7}>010-1234-5678</div>
                        </div>
                        <div className={styles.n0001Parent}>
                            <div className={styles.n0001}>N0001</div>
                            <div className={styles.frameItem} />
                            <div className={styles.div8}>접수완료</div>
                        </div>
                    </div>
                </div>
                
                <div className={styles.rectangleGroup}>
                    <div className={styles.groupChild} />
                    <div className={styles.div9}>접수번호</div>
                    <div className={styles.div10}>출발지 정보</div>
                    <div className={styles.div11}>도착지 정보</div>
                    <div className={styles.div12}>요청 차량 및 운임</div>
                    <div className={styles.div13}>기사 정보</div>
                </div>
                <div className={styles.container}>
                    <Select options={options} className={styles.div14} defaultValue={options[0]}/>
                </div>
                <div className={styles.groupDiv}>
                    <button className={styles.div15}>전체</button><div className={styles.groupItem} />
                    <button className={styles.div16}>접수 완료</button><div className={styles.groupInner} />
                    <button className={styles.div17}>배차중</button><div className={styles.lineDiv} />
                    <button className={styles.div18}>배차완료</button><div className={styles.groupChild1} />

                </div>
            </div>
            <div className={styles.div19}>
                <img
                    className={styles.item}
                    alt=""
                    src="/images/rectangle-571@2x.png"
                />
                <div className={styles.child1} />
                <form>
                    <div className={styles.parent1}>
                        <div className={styles.div20}>주소 검색</div>
                        <input type="text" className={styles.div21} value={search} onChange={onChange} />
                        <button
                            type={"submit"} className={styles.search1Icon}
                            style={{ backgroundImage: `url("/images/search-1@2x.png")` }}
                            alt="검색"
                        >
                        </button>
                    </div>
                    <div className={styles.parent2}>
                        <DatePicker
                            dateFormat="yyyy년 MM월 dd일"
                            className={styles.div23}
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            locale={ko}
                            selectStart
                            startDate={startDate}
                            endDate={endDate}
                            showPopperArrow={true} // 달력 화면 표시
                        />
                        <div className={styles.div22}>~</div>
                        <DatePicker
                            dateFormat="yyyy년 MM월 dd일"
                            className={styles.div24}
                            selected={endDate}
                            locale={ko}
                            onChange={(date) => setEndDate(date)}
                            selectStart
                            endDate={endDate}
                            startDate={startDate}
                            minDate={startDate}
                        />
                        <div>
                            <img
                                className={styles.calendar3Icon}
                                alt=""
                                src="/images/calendar-3@2x.png"
                                onClick={() => {}} // 빈 함수로 클릭 이벤트 처리
                            />
                            <div className={styles.div25}>접수일</div>
                        </div>
                    </div>
                </form>
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
export default ShipperList;
