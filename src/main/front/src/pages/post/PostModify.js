import React, {useCallback, useEffect, useState, useRef} from 'react';
import {Link, useNavigate, useParams, useLocation} from 'react-router-dom';
import axios from 'axios';
import Editor from './EditorComponent';
import styles from "./Post.module.css";
import 'react-quill/dist/quill.snow.css';

const PostModify = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [post, setPost] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [username, setUsername] = useState(null);
    const [updatedContent, setUpdatedContent] = useState(''); // updatedContent를 state로 관리


    let location = useLocation();
    const currentPost = location.state ? location.state.currentPost : null;

    const onLogoClick = useCallback(() => {
        navigate('/'); // 로고 클릭 시 '/' 경로로 이동합니다.
    }, [navigate]);

    const onLoginClick = useCallback(() => {
        navigate('/Login'); // 로그인 클릭 시 '/Login' 경로로 이동합니다 --> 주소 수정 요망
    }, [navigate]);

    const tabs = [
        { value: '자유', text: '자유게시판' },
        { value: '화주', text: '화주게시판' },
        { value: '차주', text: '차주게시판' }
    ]
    useEffect(() => {
        console.log("Updated content:", updatedContent);
    }, [updatedContent]);

    useEffect(() => {
        try {
            const token = localStorage.getItem('jwt-token');
            console.log(token);
            if (!token) {
                navigate('/login');
            } else {
                // 토큰이 있으면 사용자 정보를 가져옵니다.
                axios.get('http://localhost:8080/user/mainpage', {
                    headers: {Authorization: `Bearer ${token}`}
                })
                    .then(res2 => {
                        setUsername(res2.data.email.split('@')[0]);
                        console.log(username);
                        loadPostData(username);
                    })
                    .catch(error => {
                        // 오류 처리
                        console.error('비정상적인 접근입니다.', error);
                    });
            }
        } catch (error) {
            console.error('로컬 스토리지 접근 중 오류가 발생했습니다.', error);
        }
    }, [navigate, id, currentPost]);

    const loadPostData = (currentUsername) => {
        const token = localStorage.getItem('jwt-token');
        if (!token) {
            navigate('/Login');
        }

        axios
            .get(`http://localhost:8080/post/view/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                setPost(res.data);
                setContent(res.data.content);
                setUpdatedContent(res.data.content);
            })
            .catch(error => {
                console.error('비정상적인 접근입니다.', error);
            });
    };

    const onEditorChange = (value) => {
        setUpdatedContent(value);
        console.log("Updated content:", setUpdatedContent);
    }

    const onTitleChange = (event) => {
        const value = event.target.value; // 이벤트 값 복사
        setPost({ ...post, title: value });
    }

    const onTypeChange = (event) => {
        const value = event.target.value;
        setPost(prevPost => ({ ...prevPost, type: value }));
    }

    const onSubmit = () => {
        try {
            const token = localStorage.getItem('jwt-token');
            const updatedPost = { ...post, content: updatedContent };
            axios.put(`http://localhost:8080/post/view/${id}`, updatedPost,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                })
                .then(res => {
                    if (res.data && res.data.id) {
                        alert('수정 완료!');
                        setPost(res.data);
                        navigate(`/Post/view/${res.data.id}`);
                    } else {
                        alert('게시물을 수정하는 도중 오류가 발생하였습니다.')
                    }
                })
                .catch(error => {
                    console.error('게시물 수정 중 오류가 발생했습니다.', error);
                });
        } catch (error) {
            console.error('로컬 스토리지 접근 중 오류가 발생했습니다.', error);
        }
    }

    return (
        <div>
            <div className={styles.child}>
                <img
                    className={styles.logoimg}
                    alt=""
                    src="/images/logo.png"
                    onClick={onLogoClick} // 이미지에 onClick 이벤트 핸들러를 추가합니다.
                />
                <button className={styles.button} onClick={onLoginClick}>
                    <img className={styles.child6} alt="" src="/images/rectangle-10@2x.png" />
                    <div className={styles.div7}>{username}</div>
                </button>
            </div>
            <div className={styles.white}/>
            <div className={styles.main_text}>게시글 수정</div>
            <div className={styles.option_text}>
                <div className="top-controls">
                    <img className={styles.create} alt="" src="/images/rectangle-10@2x.png" />
                    <a href="/post"><button className={styles.createspan2}>목록</button></a>
                </div>
                <div className={styles.white}/>
                <div style={{ padding: "12px" }} key={post.id}>

                    <div className={styles.container}>
                        <select className={styles.div14} value={post.type} onChange={onTypeChange}>
                            {tabs.map((tab, index) => (
                                <option key={index} value={tab.value}>{tab.text}</option> // value 수정
                            ))}
                        </select>
                    </div>
                    <div className={styles.white}/>
                    <div className="form-group">
                        <input type="text" value={post.title} placeholder="제목" className={styles.formcontrol} onChange={onTitleChange} />
                    </div>

                    <div className={styles.white}/>
                    <div className={styles.white}/>
                    <Editor value={updatedContent} onChange={onEditorChange} />
                    <div className={styles.submitsave} onClick={onSubmit}>
                        {id && <Link id="PostView" to={{ pathname: `/Post/view/${id}`, state: { _id: id } }}><button className={styles.submitsave_button} >수정</button></Link>}
                    </div>

                    <div className={styles.white}/><div className={styles.white}/>
                </div>
            </div>
        </div>
    );
};

export default PostModify;
