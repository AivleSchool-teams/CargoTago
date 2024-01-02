import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Post.module.css';

const PostCreate = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const onTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const onContentChange = (e) => {
        setContent(e.target.value);
    };

    const onSubmit = () => {
        // 여기서 API를 호출하여 게시글을 저장합니다.
        axios.post('http://localhost:3000/post', { title, content })
            .then(() => {
                // 저장 후에는 게시글 목록 페이지로 이동합니다.
                navigate('/post');
            })
            .catch(error => {
                console.error('Error creating post:', error);
            });
    };

    return (
        <div>
            <h1>게시글 작성</h1>
            <input type="text" value={title} onChange={onTitleChange} placeholder="제목" />
            <textarea value={content} onChange={onContentChange} placeholder="내용" />
            <button onClick={onSubmit}>저장</button>
        </div>
    );
};

export default PostCreate;
