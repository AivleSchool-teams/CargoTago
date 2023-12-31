import { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Shipper-Detail.module.css";
// chat socket
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
import axios from "axios";
const socket = io.connect('http://localhost:4000');

const room = '1'

const ShipperDetail = () => {
    const [role, setRole] = useState('shipper');

    const { id } = useParams();
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [registInfoList, setRegistInfoList] = useState([]);
    const [carrierInfoList, setCarrierInfoList] = useState([]);
    const [carriercarInfoList, setCarriercarInfoList] = useState([]);
    const [showChat, setShowChat] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('jwt-token');
        if (!token) {
            navigate('/login');
            console.log('비정상적인 접근입니다.')
        } else {
            getUserInfo(token);
            getUserShipperList(token);
            getCarrierInfo(token);
            getCarriercarInfo(token);
        }
    }, [navigate, username, id]);

    const getUserInfo = (token) => {
        axios.get('http://localhost:8080/user/mainpage', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setUsername(response.data.name);
                console.log('안녕하세요,', response.data.name, '님?');
            })
            .catch(error => {
                console.error('비정상적인 접근입니다.', error);
            });
    }

    const getUserShipperList = (token) => {
        axios.get('http://localhost:8080/user/shipper/mylist', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                const filteredData = res.data.filter(item => item.id === parseInt(id));
                setRegistInfoList(filteredData);
                console.log('filterd',filteredData);
                const carNum = filteredData[0].carrierInfo.carMember;
                const username = filteredData[0].carrierInfo.name;
                getCarrierInfo(token, carNum);
                getCarriercarInfo(token,username);
            })
            .catch(error => {
                console.error('에러가 발생했습니다.', error);
            });
    }
    const getCarrierInfo = (token, carNum) => {
        axios.get(`http://localhost:8080/user/${carNum}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setCarrierInfoList(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error(`carMemberId에 해당하는 CarrierCarInfo 데이터를 가져오는 데 실패했습니다.`, error);
            });
    }

    const getCarriercarInfo = (token, username) => {
        console.log('namesss:', username);
        axios.get(`http://localhost:8080/user/carrierInfo/${username}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setCarriercarInfoList(response.data);
                console.log("확인용 "+ username )
                console.log('dzmdk',response.data);
            })
            .catch(error => {
                console.error(`CarrierInfo 데이터를 가져오는 데 실패했습니다.`, error);
            });
    }



    const onLogoClick = useCallback(() => {
        navigate('/Shipper/Main'); // 로고 클릭 시 '/' 경로로 이동합니다.
    }, [navigate]);

    const onBackClick = useCallback(() => { // 화주 메인페이지로 링크 변경 해야함.
        navigate("/Shipper/List");
    }, [navigate]);

    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    const joinRoom = (e) => {
        e.preventDefault();
        if (username !== '' && room !== '') {
            socket.emit('join_room', { room: '1', username }); // room을 '1'로 고정합니다.
            setShowChat(true);
            navigate("/chat"); // 채팅방에 입장한 후 /chat 으로 이동합니다.
        } else {
            setErrorMsg('사용자 이름을 입력해주세요.'); // 사용자 이름이 비어있을 경우의 에러 메시지입니다.
        }
    };

    return (
        <div>
            {registInfoList.map((registInfo, index) => (
                <div className={styles.div}>

                    <div className={styles.div1}>
                        <img
                            className={styles.child}
                            alt=""
                            src="/images/rectangle-58@2x.png"
                        />
                        <button className={styles.chat} onClick={joinRoom}>
                            <div className={styles.chatItem} />
                            <div className={styles.chatdiv}>채팅창</div>
                        </button>

                        <div className={styles.startloc}>
                            <div className={styles.kt}>{registInfo.headquarters2}</div>
                            <div className={styles.kt1}>{registInfo.departure_address}</div>
                            <div className={styles.div2}>{registInfo.departure_detailAddress}</div>
                            <div className={styles.div3}>
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
                        <div className={styles.endloc}>
                            <div className={styles.kt2}>{registInfo.headquarters3}</div>
                            <div className={styles.kt3}>{registInfo.arrival_Address}</div>
                            <div className={styles.div4}>{registInfo.arrival_detailAddress}</div>
                            <div className={styles.div5}>
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
                        <div className={styles.div6}>
                  <span className={styles.txt}>
                    <ul className={styles.ul}>
                      <li>주문 유형</li>
                    </ul>
                  </span>
                        </div>
                        <div className={styles.div7}>
                  <span className={styles.txt}>
                    <ul className={styles.ul}>
                      <li>출발지 정보</li>
                    </ul>
                  </span>
                        </div>
                        <div className={styles.div8}>
                  <span className={styles.txt}>
                    <ul className={styles.ul}>
                      <li>도착지 정보</li>
                    </ul>
                  </span>
                        </div>
                        <div className={styles.div9}>
                  <span className={styles.txt}>
                    <ul className={styles.ul}>
                      <li>요청 정보</li>
                    </ul>
                  </span>
                        </div>
                        <div className={styles.div10}>
                  <span className={styles.txt}>
                    <ul className={styles.ul}>
                      <li>화물 정보</li>
                    </ul>
                  </span>
                        </div>
                        <div className={styles.div11}>
                  <span className={styles.txt}>
                    <ul className={styles.ul}>
                      <li>결제 정보</li>
                    </ul>
                  </span>
                        </div>
                        <div className={styles.div12}>{registInfo.tonnage} {registInfo.selectedBox}</div>
                        <div className={styles.div131}>{registInfo.text}</div>
                        <div className={styles.cm15kg}>
                            종류 : {registInfo.selectedBoxNew} | 크기 : {registInfo.selectedSize} | 수량 : {registInfo.selectedValue}개 | 총 중량 : {registInfo.weight}톤
                        </div>
                        <div className={styles.div13}>{registInfo.textAreaValue}</div>
                        <div className={styles.div14}>
                            {`계좌번호 :   `}
                            <span className={styles.span}>{carrierInfoList.name}   {carrierInfoList.account}</span>
                        </div>
                        <div className={styles.div15}>{`${formatNumber(registInfo.yourcost)} 원`}</div>
                        <div className={styles.div16}>{registInfo.selected2}</div>
                        <div className={styles.div17}>접수 상세 정보</div>
                        <div className={styles.item} />
                        <div className={styles.inner} />
                    </div>
                    <div className={styles.div18}>
                        <img
                            className={styles.rectangleIcon}
                            alt=""
                            src="/images/rectangle-57@2x.png"
                        />
                        <div className={styles.div19}>
                            <div className={styles.div20}>화물 현황</div>
                            <div className={styles.rectangleParent}>
                                <div className={styles.groupChild}/>
                                <div className={styles.xxxXxxx}>차량번호 : {carriercarInfoList.carnumber}</div>
                                <div className={styles.div21}>차주명 : {carrierInfoList.name}</div>
                                <div className={styles.div22}>연락처 : {carrierInfoList.phone}</div>
                            </div>
                            <div className={styles.lineDiv}/>
                            <div className={styles.child1}/>
                            <div className={styles.div23} style={registInfo.status === 0 ? {color: 'var(--color-cornflowerblue)'} : {}}>접수 완료</div>
                            <div className={styles.div24} style={registInfo.status === 1 ? {color: 'var(--color-cornflowerblue)'} : {}}>배차 완료</div>
                            <div className={styles.div25} style={registInfo.status === 2 ? {color: 'var(--color-cornflowerblue)'} : {}}>운송 완료</div>

                        </div>
                        <div className={styles.div28}>
                            <div className={styles.div29}>
                                접수일 : {
                                new Date(registInfo.currentDateTime).toLocaleString('ko-KR', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                })
                            }
                            </div>
                            <div className={styles.div30}>접수자 : {registInfo.username}</div>
                        </div>
                        <div className={styles.rectangleGroup}>
                            <div className={styles.groupItem} />
                            <div className={styles.n0001}>N000{registInfo.id}</div>
                            <div className={styles.div31}>
                                {registInfo.status === 0 ? '접수 완료' :
                                    registInfo.status === 1 ? '배차 완료' :
                                        '운송 완료'}
                            </div>
                        </div>
                        <img className={styles.lineIcon} alt="" src="/images/line-37@2x.png"/>
                    </div>
                    <img className={styles.moa11} alt="" src="/images/logo.png" onClick={onLogoClick}/>
                    <img
                        className={styles.arrowIcon}
                        onClick={onBackClick}
                        alt=""
                        src="/images/arrow-3@2x.png"
                    />
                </div>
            ))}
        </div>
    );
};
export { socket, room, ShipperDetail as default };

