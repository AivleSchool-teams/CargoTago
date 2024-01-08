import styles from "./Receipt.module.css";
import {useCallback, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const AI = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [username, setUsername] = useState(null);
    const [useremail, setUseremail] = useState(null);
    const [registInfo, setRegistInfo] = useState([]);

    const ids = id.padStart(4, '0');
    const onLogoClick = useCallback(() => {
        navigate('/'); // '화물 타고' 클릭 시 '/frame' 경로로 이동.
    }, [navigate]);

    const onBackClick = useCallback(() => {
        navigate('/Carrier/AIselect'); // <- 클릭 시 '/CarrierAIselect' 경로로 이동합니다
    }, [navigate]);

    const onReturnClick = useCallback(() => {
        navigate('/Carrier/AIselect'); // <- 클릭 시 '/CarrierAIselect' 경로로 이동합니다
    }, [navigate]);

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
                    setUseremail(response.data.email);
                    console.log(username);
                    console.log('zzzzz',response.data.email);
                })
                .catch(error => {
                    // 오류 처리
                    console.error('비정상적인 접근입니다.', error);
                });
        }

        axios.get(`http://localhost:8080/carrier/recipt/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data);
                setRegistInfo(res.data);
                console.log(typeof(id));


            })
            .catch(error => {
                console.error('에러가 발생했습니다.', error);
            });
    }, [navigate, username, id]);


    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    const onApproveClick = useCallback((registInfo) => {
        const token = localStorage.getItem('jwt-token');
        axios.post(`http://localhost:8080/carrier/approve/${registInfo.id}`, useremail,
            {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'text/plain'
            }
        })
            .then(res => {
                if (res.data === 0) {
                    window.alert('이미 배차된 화물입니다.');
                    navigate('/Carrier/main');
                } else {
                    window.alert('배차 승인이 완료되었습니다.');
                    navigate('/Carrier/main'); // 승인 클릭 시 '/Carrier/main' 경로로 이동합니다!
                }
            })
            .catch(error => {
                console.error('이미 배차된 화물입니다.', error);
                navigate('/Carrier/main');
                // status가 0이 아닌 경우 '이미 배차된 화물입니다' 라는 메시지 출력하고
                // 메인페이지로 돌려보내자.
            });
    }, [navigate, useremail]);


    return (
        <div>

        <div className={styles.ai}>
            <div className={styles.aidiv}>
                <img className={styles.aiChild} alt="" src="/images/rectangle-84@2x.png" />
                <div className={styles.groupParent}>
                    <div className={styles.vectorParent}>
                        <img
                            className={styles.groupChild}
                            alt=""
                            src="/images/rectangle-19@2x.png"
                        />
                        <div className={styles.div} onClick={onBackClick} >돌아가기</div>
                    </div>
                    <div className={styles.vectorGroup}>
                        <img
                            className={styles.groupChild}
                            alt=""
                            src="/images/rectangle-20@2x.png"
                        />
                        <div className={styles.div1} onClick={() => onApproveClick(registInfo)}>배차 신청</div>
                    </div>
                </div>
                <div className={styles.div2}>
                    등록일 :{
                    new Date(registInfo.currentDateTime).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    })
                }
                </div>
                <div className={styles.groupContainer}>
                    <div className={styles.groupDiv}>
                        <div className={styles.rectangleParent}>
                            <div className={styles.groupInner} />
                            <b className={styles.b}>배차완료</b>
                        </div>
                        <div className={styles.n0001}>N{ids}</div>
                    </div>
                    <div className={styles.lineDiv} />
                    <div className={styles.groupChild1} />
                </div>
                <div className={styles.rectangleGroup}>
                    <div className={styles.rectangleDiv} />
                    <div className={styles.groupChild2} />
                    <div className={styles.groupChild3} />
                    <div className={styles.groupChild4} />
                    <div className={styles.groupChild5} />
                    <div className={styles.groupChild6} />
                    <div className={styles.groupChild7} />
                    <div className={styles.groupChild8} />
                    <div className={styles.groupChild9} />
                    <div className={styles.groupChild10} />
                    <div className={styles.groupChild11} />
                    <div className={styles.groupChild12} />
                    <div className={styles.groupChild13} />
                    <div className={styles.groupChild14} />
                </div>
                <div className={styles.rectangleContainer}>
                    <div className={styles.groupChild15} />
                    <div className={styles.groupChild16} />
                    <div className={styles.groupChild17} />
                    <div className={styles.groupChild12} />
                    <div className={styles.groupChild19} />
                    <div className={styles.groupChild11} />
                    <div className={styles.groupChild21} />
                    <div className={styles.groupChild14} />
                </div>

                <b className={styles.b1}>{`상차지  `}</b>
                <b className={styles.b2}>{`하차지  `}</b>
                <b className={styles.b3}>{`운송료 `}</b>
                <b className={styles.b4}>{`수수료 `}</b>
                <b className={styles.b5}>{`화물정보 `}</b>
                <b className={styles.b6}>{`결제방법  `}</b>
                <b className={styles.b7}>{`합계금액  `}</b>
                <b className={styles.b8}>{`톤수 `}</b>
                <b className={styles.b9}>{`차종 `}</b>
                <b className={styles.b10}>{`운행방법 `}</b>
                <b className={styles.b11}>{`적재중량 `}</b>
                <b className={styles.b12}>{registInfo.departure_address}</b>
                <b className={styles.b13}>{registInfo.tonnage}</b>
                <b className={styles.b14}>{`인수증 `}</b>
                <b className={styles.b15}>
                    {registInfo.yourcost ? `${formatNumber(registInfo.yourcost)} 원` : '로딩 중...'}
                </b>
                <b className={styles.b16}>0</b>
                <b className={styles.b17}>
                    {registInfo.yourcost ? `${formatNumber(registInfo.yourcost)} 원` : '로딩 중...'}
                </b>
                <b className={styles.b18}>{registInfo.weight}톤</b>
                <b className={styles.b19}>{registInfo.selectedBox}</b>
                <b className={styles.b20}>{registInfo.selected2}</b>
                <b className={styles.b21}>{registInfo.arrival_Address}</b>
                <b className={styles.b22}>종류 : {registInfo.selectedBoxNew} , 크기 : {registInfo.selectedSize} , 수량 : {registInfo.selectedValue}개 , 총 중량 : {registInfo.weight}톤</b>

            </div>
            <div className={styles.moa11Parent}>
                <img className={styles.moa11} onClick={onLogoClick} alt="" src="/images/moa-1-1@2x.png" />
                <img className={styles.arrowIcon} onClick={onBackClick} alt="" src="/images/arrow-3@2x.png" />
                <div className={styles.div3} > 인수증 </div>
            </div>
        </div>

        </div>
    );
};

export default AI;
