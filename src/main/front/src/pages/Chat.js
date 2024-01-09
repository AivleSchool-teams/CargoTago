import React, {useCallback, useEffect, useRef, useState} from 'react';
// import ScrollToBottom from "react-scroll-to-bottom";
import { Message } from './component/Message';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import io from 'socket.io-client';
import styles from "./Chat.module.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import MicIcon from '@material-ui/icons/Mic';
import IconButton from '@material-ui/core/IconButton';
import { socket as socket1, room as room1, default as ShipperDetail } from './Shipper-Detail';
import { socket as socket2, room as room2, default as CarrierDetail } from './Carrier-Detail';

//import { socket, room, default as ShipperDetail } from './Shipper-Detail';
import axios from "axios";

function Chat() {

    const navigate = useNavigate();

    const [username, setUsername] = useState(null);
    const [socket, setSocket] = useState(io.connect('http://localhost:4000'));
    const [room, setRoom] = useState(1);


    useEffect(() => {
        console.log(username,'zz');
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
                    setUsername(response.data.name);


                    if (response.data.typed === "Shipper") {
                        setSocket(socket1);
                        setRoom(room1);
                    } else {
                        setSocket(socket2);
                        setRoom(room2);
                    }

                })
                .catch(error => {
                    // 오류 처리
                    console.error('비정상적인 접근입니다.', error);
                });
        }
    }, []);




    const inputRef = useRef();
    const [messageList, setMessageList] = useState([]);
    const messageBottomRef = useRef(null);
    // const socket = io.connect('http://localhost:4000');
    const sendMessage = async () => {
        const currentMsg = inputRef.current.value;
        if (currentMsg !== '') {
            console.log(username,'zz');
            const messageData = {
                room: room,
                message: currentMsg,
                author: username,
                time:
                    new Date(Date.now()).getHours() +
                    ':' +
                    new Date(Date.now()).getMinutes(),
            };
            await socket.emit('send_message', messageData);
            setMessageList((list) => [...list, messageData]);
            inputRef.current.value = '';
        }
    };
    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);
    useEffect(() => {
        messageBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messageList]);

    const { transcript, resetTranscript } = useSpeechRecognition();
    const [isListening, setIsListening] = useState(false);
    const toggleListening = () => {
        setIsListening(!isListening);
        if (isListening) {
            SpeechRecognition.stopListening();
            inputRef.current.value = transcript;
        } else {
            resetTranscript();
            SpeechRecognition.startListening({ continuous: true });
        }
    };


    const onBackClick = useCallback(() => { // 화주 상세페이지 db연결 후 해당 번호로 이동되게 변경 필요
        navigate("/Shipper/Detail");
    }, [navigate]);

    return (
        <div className={styles.div}>
            <img className={styles.child} alt="" src="/images/rectangle-63@2x.png" />
            {/* <div className={styles.inner} /> */}
            <div className={styles.inner}>
                {messageList.map((messageContent) => {
                    return (
                        <Message
                            messageContent={messageContent}
                            username={username}
                            key={uuidv4()}
                        />
                    );
                })}
                <div ref={messageBottomRef} />
            </div>
            <div className = {styles.div3}>
                <IconButton onClick={toggleListening}>
                    <MicIcon />
                </IconButton>
            </div>
            <div className={styles.chatInputBox}>
                <input
                    className={styles.item} alt="" style={{backgroundImage: "url(/images/rectangle-57@2x.png)",  backgroundSize: "cover", backgroundPosition: "center"}}
                    ref={inputRef}
                    type='text'
                    placeholder='메세지를 입력해주세요'
                    onKeyPress={(event) => {
                        event.key === 'Enter' && sendMessage();
                    }}
                />
                <SendButton className={styles.b} onClick={sendMessage}>
                    <span>전송</span>
                </SendButton>
            </div>
            {/* </div> */}
            <img className={styles.moa11} alt="" src="/images/logo.png"/>
            <img
                className={styles.arrowIcon}
                onClick={onBackClick}
                alt=""
                src="/images/arrow-3@2x.png"
            />

        </div>
        // <RoomContainer>
        //   <RoomHeader>
        //     <RoomTitle>{room}번 채팅방</RoomTitle>
        //   </RoomHeader>
        //   <RoomBody>
        //     <MessageBox>
        //       {messageList.map((messageContent) => {
        //         return (
        //           <Message
        //             messageContent={messageContent}
        //             username={username}
        //             key={uuidv4()}
        //           />
        //         );
        //       })}
        //       <div ref={messageBottomRef} />
        //     </MessageBox>
        //   </RoomBody>
        //   <ChatInputBox>
        //     <ChatInput
        //       ref={inputRef}
        //       type='text'
        //       placeholder='메세지를 입력해주세요'
        //       onKeyPress={(event) => {
        //         event.key === 'Enter' && sendMessage();
        //       }}
        //     />
        //     <ChatButton onClick={sendMessage}>▹</ChatButton>
        //   </ChatInputBox>
        // </RoomContainer>
    );
}

export default Chat;


const SendButton = styled.button`
  background-color: #00498c; // 버튼의 배경색입니다
  border: none; // 버튼 테두리를 없앱니다
  color: white; // 버튼 텍스트의 색상입니다
  padding: 5px 10px; // 버튼 내부의 여백입니다
  text-align: center; // 텍스트를 가운데로 정렬합니다
  text-decoration: none; // 텍스트에 밑줄을 없앱니다
  display: inline-block; // 버튼을 인라인-블록 요소로 만듭니다
  font-size: 16px; // 텍스트 크기를 설정합니다
  margin: 4px 2px; // 버튼의 외부 여백입니다
  cursor: pointer; // 마우스를 올렸을 때 커서 모양을 변경합니다
  transition-duration: 0.4s; // 전환 효과의 지속 시간을 설정합니다
  border-radius: 10px; // 버튼의 모서리를 둥글게 만듭니다
  &:hover {
    background-color: #d3e8fb; // 마우스를 올렸을 때 버튼의 배경색을 변경합니다
    color: black; // 마우스를 올렸을 때 텍스트 색상을 변경합니다
  }
`;

const RoomContainer = styled.div`
  width: 50%;
  max-width: 600px;
  @media screen and (max-width: 550px) {
    width: 90%;
  }
  height: 440px;
`;

const RoomHeader = styled.div`
  height: 40px;
  border-radius: 6px 6px 0 0;
  background: #355463;
  position: relative;
`;

const RoomTitle = styled.p`
  margin: 0;
  display: block;
  padding: 0 1em 0 2em;
  color: #fff;
  font-weight: 700;
  line-height: 45px;
`;

const RoomBody = styled.div`
  height: 360px;
  border: 1px solid #355463;
  background: #fff;
  position: relative;
`;

const MessageBox = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-top: 5px;
`;

const ChatInputBox = styled.div`
  height: 40px;
  border: 1px solid #355463;
  border-top: none;
  display: flex;
  border-radius: 0 0 6px 6px;
`;

const ChatInput = styled.input`
  height: 100%;
  flex: 85%;
  border: 0;
  padding: 0 0.7em;
  font-size: 1em;
  border-right: 1px dotted #355463;
  outline: none;
  background: transparent;
`;

const ChatButton = styled.button`
  border: 0;
  display: grid;
  place-items: center;
  cursor: pointer;
  flex: 15%;
  height: 100%;
  background: transparent;
  outline: none;
  font-size: 25px;
  transition: all 0.5s;
  color: lightgray;
  &:hover {
    background: steelblue;
    transition: all 0.5s;
  }
  &:active {
    background: darkblue;
    /* transition: all 0.5s; */
    font-size: 0.5rem;
  }
`;