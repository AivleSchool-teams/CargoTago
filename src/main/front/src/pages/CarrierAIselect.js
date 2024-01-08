import {useCallback, useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./CarrierAIselect.module.css";
import axios from "axios";

const AI = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [username, setUsername] = useState(null);
    const [registInfoList, setRegistInfoList] = useState([]);

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

        axios.get('http://localhost:8080/user/shipper/mylist', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                const filteredData = res.data.filter(item => item.id === parseInt(id));  // id를 기반으로 데이터 필터링
                //setRegistInfoList(filteredData);  // 필터링한 데이터를 상태로 설정
                //console.log('dd',filteredData);
                               setRegistInfoList(res.data);  // 필터링한 데이터를 상태로 설정
                               console.log('dd',res.data);
            })
            .catch(error => {
                console.error('에러가 발생했습니다.', error);
            });
    }, [navigate, username, id]);

    const onLogoClick = useCallback(() => {
        navigate('/'); // '화물 타고' 클릭 시 '/frame' 경로로 이동.
    }, [navigate]);

    const onApproveClick = useCallback(() => {
        navigate('/Receipt'); // 승인 클릭 시 '/Receipt' 경로로 이동합니다
    }, [navigate]);

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
        <div>
        {registInfoList.map((registInfo, index) => (
        <div className={styles.ai}>
            <div className={styles.div}>
                <img className={styles.child} alt="" src="/images/rectangle-60@2x.png" />
                /*<div className={styles.div1}>다음</div>*/
                <div className={styles.item} />
                <div className={styles.rectangleParent}>
                    <div className={styles.groupChild} />
                    <div className={styles.kt}>{registInfo.headquarters2}</div>
                    <div className={styles.kt1}>{registInfo.departure_address}</div>
                    <div className={styles.div2}>{registInfo.departure_detailAddress}</div>
                    <div className={styles.div3}>{registInfo.shipperInfo.name}</div>
                    <div className={styles.groupItem} />
                    <div className={styles.div4}>{registInfo.shipperInfo.phone}</div>
                    <div className={styles.div5}>
                        <span>{`출발지 주소 `}</span>
                        <span className={styles.span}>*</span>
                    </div>
                    <div className={styles.div6}>
                    {
                        new Date(registInfo.departureDateTime).toLocaleString('ko-KR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                        })
                    }
                    </div>
                </div>
                <div className={styles.rectangleGroup}>
                    <div className={styles.groupInner} />
                    <div className={styles.div8}>예상 시간</div>
                    <div className={styles.div25}> {registInfo.tonnage} | {registInfo.selectedBox} | </div>
                    <div className={styles.rectangleDiv} />
                    <div className={styles.rectangleContainer}>
                        <div className={styles.groupChild1} />
                        <div className={styles.div9}>{`총 소요시간 `}</div>
                        <div className={styles.div10}>06:00</div>
                        <div className={styles.lineDiv} />
                    </div>
                    <div className={styles.groupDiv}>
                        <div className={styles.groupChild1} />
                        <div className={styles.div11}>예상 운전 시간</div>
                        <div className={styles.div10}>03:00</div>
                        <div className={styles.lineDiv} />
                    </div>
                    <div className={styles.rectangleParent1}>
                        <div className={styles.groupChild1} />
                        <div className={styles.div13}>총 운송비</div>
                        <div className={styles.div14}>{`${formatNumber(registInfo.yourcost)} 원`}</div>
                        <div className={styles.lineDiv} />
                    </div>
                </div>
                <div className={styles.rectangleParent2}>
                    <div className={styles.groupChild} />
                    <div className={styles.kt}>{registInfo.headquarters3}</div>
                    <div className={styles.kt1}>{registInfo.arrival_Address}</div>
                    <div className={styles.div2}>{registInfo.arrival_detailAddress}</div>
                    <div className={styles.div3}>{registInfo.shipperInfo.name} </div>
                    <div className={styles.groupItem} />
                    <div className={styles.div4}>{registInfo.shipperInfo.phone}</div>
                    <div className={styles.div5}>
                        <span>{`도착지 주소 `}</span>
                        <span className={styles.span}>*</span>
                    </div>
                    <div className={styles.div6}>
                    {
                    new Date(registInfo.arrivalDateTime).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                    }
                    </div>
                </div>
                <div className={styles.div21}>주문 정보</div>
                <div className={styles.rectangleParent3}>
                    <div className={styles.groupChild8} />
                    <div className={styles.div22}>취소</div>
                    <div className={styles.groupChild9} />
                    <div className={styles.div23} onClick={onApproveClick} >승인</div>
                </div>
            </div>
            <div className={styles.vParent}>
                <div className={styles.div24}>화물 접수</div>
                <img className={styles.aiChild} alt="" src="/images/arrow-3@2x.png" />
                <img className={styles.moa11} onClick={onLogoClick} alt=""  src="/images/moa-1-1@2x.png" />
            </div>
        </div>
            ))}
        </div>
    );
};

export default AI;
