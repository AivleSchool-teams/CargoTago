import React, {useCallback, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

import styles from './Post.module.css';

const PostView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [currentPosts, setCurrentPosts] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [isWriter, setIsWriter] = useState(false);
    const [username, setUsername] = useState(null);

    const onLogoClick = useCallback(() => {
        navigate('/'); // 로고 클릭 시 '/' 경로로 이동합니다.
    }, [navigate]);

    const onLoginClick = useCallback(() => {
        navigate('/Login'); // 로그인 클릭 시 '/Login' 경로로 이동합니다 --> 주소 수정 요망
    }, [navigate]);


    useEffect(() => {
        const token = localStorage.getItem('jwt-token');
        if (!token) {
            navigate('/Login');
        } else {
            // 토큰이 있으면 사용자 정보를 가져옵니다.
            axios.get('http://localhost:8080/user/mainpage', {
                headers: {Authorization: `Bearer ${token}`}
            })
                .then(res2 => {
                    setUsername(res2.data.email.split('@')[0]);
                    console.log(username);
                })
                .catch(error => {
                    // 오류 처리
                    console.error('비정상적인 접근입니다.', error);
                });


        }
    });


    useEffect(() => {
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
                console.log('받아온 데이터', res.data);


                    setCurrentPosts([res.data]);
                    //setFileList(res.data.result.fileList);

                    //const loggedInUser = /* 로그인한 사용자 아이디를 가져옵니다. */
                    //    setIsWriter(loggedInUser === res.data.result.createdBy);

            })



    }, [id]);

    const onClickDeleteNotice = () => {
        if (window.confirm('삭제 하시겠습니까?')) {
            const token = localStorage.getItem('jwt-token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            axios.delete(`/Post/delete/${id}`, config).then((res) => {
                if (res.data && res.data.ok === 1) {
                    alert('삭제 완료');
                    navigate('/post');
                }
            });
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
            <div className={styles.main_text}>게시글 상세정보</div>

            <div className="container" style={{ overflow: 'auto' }}>
                <div className="lf-contents pd12">
                    {/* align-right */}
                    <div className="top-controls">
                        <a href="/post"><button className="lf-button primary float-right">목록으로</button></a>
                    </div>
                    <div style={{ padding: "12px" }}>
                        {currentPosts.map((post) => (
                            <table className="notice-table" key={post.id}>
                            <colgroup>
                                <col width="10%" />
                                <col width="40%" />
                                <col width="10%" />
                                <col width="40%" />
                            </colgroup>

                            <thead>
                            <tr>
                                <th>게시판종류</th>
                                <td colSpan="3">{post.type}</td>
                            </tr>
                            <tr>
                                <th>제목</th>
                                <td colSpan="3">{post.title}</td>
                            </tr>
                            <tr>
                                <th>작성자</th>
                                <td>{post.createdBy}</td>
                                <th>작성일시</th>
                                <td>{moment(post.date).format('YYYY-MM-DD')}</td>
                            </tr>
                            <tr>
                                <th>첨부파일</th>
                                <td colSpan="3">
                                    {fileList.map((name, index) => (
                                        <span key={index}> <a href={'/uploads/' + name} target="_blank">{name}</a> |</span>
                                    ))}
                                </td>
                            </tr>

                            </thead>
                            <tbody>
                            <tr>
                                <td className="notice-contents" colSpan="4" dangerouslySetInnerHTML={{
                                    __html: post.content
                                }}></td>
                            </tr>
                            </tbody>
                        </table>
                        ))}
                    </div>
                    {
                        isWriter &&
                        currentPosts.map((post) => (
                            <div className="text-center mb8" key={post.id}>
                                <button className="lf-button dark-gray" onClick={onClickDeleteNotice}>삭제</button>
                                <Link to={{ pathname: '/PostsModify', state: { _id: post._id } }}><button className="lf-button primary ml8">수정</button></Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default PostView;