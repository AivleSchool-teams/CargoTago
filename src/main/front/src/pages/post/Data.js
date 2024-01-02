import axios from 'axios';

const postList = [
    {
        "id": 1,
        "title": "첫번째 게시글입니다.",
        "content": "첫번째 게시글 내용입니다.",
        "createdAt": "2020-10-25",
        "createdBy": "홍길동",
        "readCount": 6
    },
    {
        "id": 2,
        "title": "두번째 게시글입니다.",
        "content": "두번째 게시글 내용입니다.",
        "createdAt": "2020-10-25",
        "createdBy": "홍길동",
        "readCount": 5
    },
    {
        "id": 3,
        "title": "세번째 게시글입니다.",
        "content": "세번째 게시글 내용입니다.",
        "createdAt": "2020-10-25",
        "createdBy": "홍길동",
        "readCount": 1
    },
    {
        "id": 4,
        "title": "네번째 게시글입니다.",
        "content": "네번째 게시글 내용입니다.",
        "createdAt": "2020-10-25",
        "createdBy": "홍길동",
        "readCount": 2
    },
    {
        "id": 5,
        "title": "다섯번째 게시글입니다.",
        "content": "다섯번째 게시글 내용입니다.",
        "createdAt": "2020-10-25",
        "createdBy": "홍길동",
        "readCount": 4
    },
];

export function getPosts() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: postList });
        }, 1000);  // 1초 후에 postList를 반환합니다.
    });
}

const getPostByid = id => {
    const array = postList.filter(x => x.id === id);
    if (array.length === 1) {
        return array[0];
    }
    return null;
}

export {
    postList,
    getPostByid
};
