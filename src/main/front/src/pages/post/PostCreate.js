import React, {useCallback, useEffect, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Editor from './EditorComponent';
import UploadFiles from './UploadFiles';
import styles from "./Post.module.css";

const PostCreate = () => {
    const navigate = useNavigate();
    const [useremail, setUseremail] = useState(null);

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
                    console.log(response.data);
                    console.log(response.data.email.split('@')[0]);

                })
                .catch(error => {
                    // 오류 처리
                    console.error('비정상적인 접근입니다.', error);
                });
        }
    }, [navigate]);

    const [id, setId] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState('자유');
    const uploadReferenece = React.createRef();

    const onLogoClick = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const onLoginClick = useCallback(() => {
        navigate('/Login');
    }, [navigate]);

    const tabs = [
        { value: '자유', text: '자유게시판' },
        { value: '화주', text: '화주게시판' },
        { value: '차주', text: '차주게시판' }
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

        const files = uploadReferenece.current.getSelectedFiles();
        console.log("첨부한 파일들:", files);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('type', type);
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }
        }
        console.log("첨부한 파일들:", formData);
        axios.post('http://localhost:8080/post', formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then(res => {
                console.log('받아옴',res.data);
                if (res.data && res.data.id) {
                    setId(res.data.id);
                    alert('저장 완료'); // 메시지 표시
                    navigate(`/Post/view/${res.data.id}`); // 페이지 이동
                } else {
                    alert('게시물을 저장하는 도중 오류가 발생하였습니다.')
                }
            })
            .catch(error => {
                console.error("There was an error!", error.response.data); // 에러 메시지 출력
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
                        <select className={styles.div14} onChange={(event) => setType(event.target.value)}>
                            {tabs.map((tab, index) => (
                                <option key={index} value={tab.value}>{tab.text}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.white}/>
                    <div className="form-group">
                        <input type="text" value={title} placeholder="제목" className={styles.formcontrol} onChange={(event) => setTitle(event.target.value)} />
                    </div>

                    <UploadFiles ref={uploadReferenece} />
                    <div className={styles.white}/>
                    <div className={styles.white}/>
                    <Editor value={content} onChange={onEditorChange} />
                    <div className={styles.submitsave} onClick={onClickSearch}>
                        <button className={styles.submitsave_button} >저장</button>
                    </div>
                    {id && <Link id="PostView" to={{ pathname: `/Post/view/${id}`, state: { _id: id } }}></Link>}
                    <div className={styles.white}/><div className={styles.white}/>
                </div>
            </div>
        </div>
    );
};

export default PostCreate;
