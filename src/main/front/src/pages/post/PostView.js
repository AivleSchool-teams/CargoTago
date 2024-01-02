import React, { useEffect, useState } from 'react';
import { getPostByid } from './Data';
import './Post.css';

const PostView = ({ history, location, match }) => {
    const [ Posts, setPosts ] = useState({});

    const { id } = match.params;

    useEffect(() => {
        setPosts(getPostByid(id));
    }, [id]);

    return (
        <>
            <h2 align="center">게시글 상세정보</h2>

            <div className="post-view-wrapper">
                {
                    Posts ? (
                        <>
                            <div className="post-view-row">
                                <label>게시글 번호</label>
                                <label>{ Posts.id }</label>
                            </div>
                            <div className="post-view-row">
                                <label>제목</label>
                                <label>{ Posts.title }</label>
                            </div>
                            <div className="post-view-row">
                                <label>작성자</label>
                                <label>{ Posts.createdBy }</label>
                            </div>
                            <div className="post-view-row">
                                <label>작성일</label>
                                <label>{ Posts.createdAt }</label>
                            </div>
                            <div className="post-view-row">
                                <label>조회수</label>
                                <label>{ Posts.readCount }</label>
                            </div>
                            <div className="post-view-row">
                                <label>내용</label>
                                <div>
                                    {
                                        Posts.content
                                    }
                                </div>
                            </div>
                        </>
                    ) : '해당 게시글을 찾을 수 없습니다.'
                }
                <button className="post-view-go-list-btn" onClick={() => history.goBack()}>목록으로 돌아가기</button>
            </div>
        </>
    )
}

export default PostView;