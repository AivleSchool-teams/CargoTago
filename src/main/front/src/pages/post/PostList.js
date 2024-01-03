import React, {useState, useEffect, useCallback} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Pagination from './Pagination.js';
import styles from "./Post.module.css";

const PostList = (props) => {
    const navigate = useNavigate();
    const onLogoClick = useCallback(() => {
        navigate('/'); // 로고 클릭 시 '/' 경로로 이동합니다.
    }, [navigate]);

    const onLoginClick = useCallback(() => {
        navigate('/Login'); // 로그인 클릭 시 '/Login' 경로로 이동합니다 --> 주소 수정 요망
    }, [navigate]);

    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [username, setUsername] = useState(null); // 사용자 이름을 저장할 상태를 추가합니다.

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

        axios
            .get('http://localhost:8080/post', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res.data);
                const sortedPosts = res.data.sort((a, b) =>
                    moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
                );
                setPosts(sortedPosts);
            })
            .catch(error => {
                // 오류 처리
                console.error('비정상적인 접근입니다.', error);
            });
    }, []);
    {/*
            const fetchUser = async () => {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                let res = await axios.get('http://localhost:8080/user', config); // 사용자 정보를 가져오는 API 주소를 적절하게 수정해주세요.
                // '@' 앞부분만 보이게 사용자 이름을 설정합니다.
                setUsername(res.data.username.split('@')[0]);
                console.log(res.data);
            }
            fetchUser();

            const fetchPosts = async () => {
                let res = await axios.get('http://localhost:3000/post');
                setPosts(res.data);
            }

            fetchPosts();
        }
    }, []);
    */}

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className={styles.child}>
                <img
                    className={styles.logoimg}
                    alt=""
                    src="/images/logo.png"
                    onClick={onLogoClick}
                />

                <button className={styles.button} onClick={onLoginClick}>
                    <img className={styles.child6} alt="" src="/images/rectangle-10@2x.png" />
                    <div className={styles.div7}>{username}</div> {/* 사용자 이름을 출력합니다. */}
                </button>
            </div>
            <div className={styles.white}/>
            <div>
                <div className={styles.main_text}>문의게시판</div>
                <div className="lf-contents pd12">
                    <div>
                        <img className={styles.create} alt="" src="/images/rectangle-10@2x.png" />
                        <a href="/Post/create"><button className={styles.createspan}>글쓰기</button></a>
                    </div>
                    <div style={{ padding: "0 12px" }}>
                        <table className={styles.tableStyle}>
                            <colgroup>
                                <col width="5%" />
                                <col width="*" />
                                <col width="50%" />
                                <col width="*" />
                                <col width="*" />
                                <col width="*" />
                                <col width="*" />
                            </colgroup>
                            <thead>
                            <tr style={{letterSpacing: '1.5px'}}>
                                <th>번호</th>
                                <th>게시판종류</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>작성일시</th>
                                <th>조회수</th>
                                <th>첨부</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentPosts.map((post, index) => (
                                <tr key={post.id ? post.id : index}>
                                    <td>{post.id}</td>
                                    <td>{post.type}</td>
                                    <td>
                                        <Link to={{pathname: `/post/view/${post.id}`, state: { id: post.id } }}>
                                            {post.title}
                                        </Link>
                                    </td>
                                    <td>{post.createdBy.split('@')[0]}</td>
                                    <td>{moment(post.date).format('YYYY-MM-DD')}</td>
                                    <td>{post.readCount}</td>
                                    <td>
                                        {post.fileList && post.fileList.length > 0 &&
                                            <img src="/images/board_attach.gif" />
                                        }
                                    </td>
                                </tr>
                            ))}
                            </tbody>

                        </table>
                    </div>

                    <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} currentPage={currentPage} paginate={paginate}></Pagination>
                </div>
            </div>
            <div className={styles.rectangleParent}>
                <div className={styles.groupChild}>
                    <img className={styles.icon5} alt="" src="/images/1-1@2x.png" />
                    <div className={styles.fax020000000Container}>
                        <p className={styles.p5}>
                            사업자 등록번호 : 000-00-00000 | 정보보호책임자 : 홍길동 |
                            화물운송주선사업자 : 제2023-00호 | 화물운송사업자 : 제2023-00호
                        </p>
                        <p className={styles.ai}>
                            통신판매업신고번호 : 제2023-서울000호 | 대표번호 : 02-000-0000 | FAX
                            : 02-000-0000 | aivle@cargotago.com
                        </p>
                    </div>
                    <div>
                        <div className={styles.div8}>서비스 소개</div>
                        <div className={styles.ktAivleschoolAllRights}>
                            ⓒ 2024. KT-AivleSchool All rights reserved.
                        </div>
                        <div className={styles.div9}>개인정보 처리방침</div>
                        <div className={styles.div10}>이용약관</div>
                        <div className={styles.div11}>운송약관</div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PostList;
