import React, {useState, useEffect, useCallback} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommonTable from '../component/table/CommonTable';
import CommonTableColumn from '../component/table/CommonTableColumn';
import CommonTableRow from '../component/table/CommonTableRow';
import { getPosts } from '../api/api';  // API 호출을 위한 함수를 import합니다.
import styles from "./Post.module.css";

const PostList = () => {
    const navigate = useNavigate();
    const onLogoClick = useCallback(() => {
        navigate('/'); // 로고 클릭 시 '/' 경로로 이동합니다.
    }, [navigate]);

    const onLoginClick = useCallback(() => {
        navigate('/Login'); // 로고 클릭 시 '/Login' 경로로 이동합니다 --> 주소 수정 요망
    }, [navigate]);

    const [ Posts, setPosts ] = useState([]);

    const onCreateClick = useCallback(() => {
        navigate('/postCreate'); // '글쓰기' 버튼 클릭 시 '/postCreate' 경로로 이동합니다.
    }, [navigate]);

    useEffect(() => {
        getPosts()  // API 호출
            .then(response => {
                setPosts(response.data);  // Response를 Posts 상태에 저장합니다.
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, [ ])

    return (
        <>
            <div className={styles.child}>
                <img
                    className={styles.logoimg}
                    alt=""
                    src="/images/logo.png"
                    onClick={onLogoClick} // 이미지에 onClick 이벤트 핸들러를 추가합니다.
                />

                <button className={styles.button} onClick={onLoginClick}>
                    <img className={styles.child6} alt="" src="/images/rectangle-10@2x.png" />
                    <div className={styles.div7}>로그인</div>
                </button>
            </div>
            <div className={styles.white}/>
            <CommonTable headersName={['글번호', '제목', '작성자' ,'등록일', '조회수']}>
                {
                    Posts ? Posts.map((item) => {
                        return (
                            <CommonTableRow key={item.id}>
                                <CommonTableColumn>{ item.id }</CommonTableColumn>
                                <CommonTableColumn>
                                    <Link to={`/postView/${item.id}`}>{ item.title }</Link>
                                </CommonTableColumn>
                                <CommonTableColumn>{ item.createdBy }</CommonTableColumn>
                                <CommonTableColumn>{ item.createdAt }</CommonTableColumn>
                                <CommonTableColumn>{ item.readCount }</CommonTableColumn>
                            </CommonTableRow>
                        )
                    }) : ''
                }
            </CommonTable>
            <div className={styles.child1}>
                <button className={styles.button11} onClick={onCreateClick}>
                    <img className={styles.create} alt="" src="/images/rectangle-10@2x.png" />
                    <span className={styles.createspan} >글쓰기</span>
                </button>
            </div>

        </>
    )
}

export default PostList;
