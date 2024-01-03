import React, {useCallback, useEffect, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Post.module.css';
import Editor from './EditorComponent';
import UploadFiles from './UploadFiles';
import styles from "./Post.module.css";

const PostCreate = () => {
    const navigate = useNavigate();

    const [useremail, setUseremail] = useState(null);
    const [Posts, setPosts] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('jwt-token');
        console.log(token);
        if (!token) {
            // 토큰이 없으면 로그인 페이지로 리디렉션
            navigate('/login');
            console.log('비정상적인 접근입니다.')
        } else {
            axios.get('http://localhost:8080/user/mainpage', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {

                    setUseremail(response.data.email.split('@')[0]);
                    console.log(useremail);

                })
                .catch(error => {
                    // 오류 처리
                    console.error('비정상적인 접근입니다.', error);
                });
        }
    }, [navigate, useremail]);

    const [id, setId] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState('자유');
    const uploadReferenece = React.createRef();

    const onLogoClick = useCallback(() => {
y    }, [navigate]);

    const onLoginClick = useCallback(() => {
        navigate('/Login');
    }, [navigate]);

    const tabs = [
        { value: '자유', text: '자유' },
        { value: '화주', text: '화주' },
        { value: '차주', text: '차주' }
    ]

    const onClickSearch = () => {
        if (title.trim() === '') {
            alert('제목을 입력해주세요');
            return;
        }

        if (content.trim() === '') {
            alert('내용을 입력해주세요');
            return;
        }

        console.log({title, content, type});
        const token = localStorage.getItem('jwt-token');
        axios.post('http://localhost:8080/post', {
                title: title,
                content: content,
                type: type
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res.data);

                if (res.data && res.data.id) {
                    alert('저장 완료');
                    setId(res.data.id);
                    navigate(`/Post/view/${res.data.id}`);
                } else {
                    alert('게시물을 저장하는 도중 오류가 발생하였습니다.')
                }

            })
            .catch(error => {
                console.error("There was an error!", error);
            });
    }

    const onEditorChange = (value) => {
        setContent(value)
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
                    <div className={styles.div7}>{useremail}</div>
                </button>
            </div>
            <div className={styles.white}/>
            <div className={styles.main_text}>게시글 작성</div>
            <div className={styles.option_text}>
                <div className="top-controls">
                    <img className={styles.create} alt="" src="/images/rectangle-10@2x.png" />
                    <a href="/post"><button className={styles.createspan2}>목록</button></a>
                </div>
                <div className={styles.white}/>
                <div style={{ padding: "12px" }}>

                    <div className={styles.container}>
                        {/* LFSelect 컴포넌트를 select 태그로 대체 */}
                        <select className={styles.div14} onChange={(event) => setType(event.target.value)}>
                            {tabs.map((tab, index) => (
                                <option key={index} value={tab.value}>{tab.text}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="text" value={title} placeholder="제목" className="form-control" onChange={(event) => setTitle(event.target.value)} />
                    </div>

                    <UploadFiles ref={uploadReferenece} />
                    <Editor value={content} onChange={onEditorChange} />

                    <div className="text-center pd12">
                        <button className="lf-button primary" onClick={onClickSearch}>저장</button>
                    </div>

                    {id && <Link id="PostView" to={{ pathname: `/Post/view/${id}`, state: { _id: id } }}></Link>}

                </div>
            </div>
        </div>
    );
};

export default PostCreate;
