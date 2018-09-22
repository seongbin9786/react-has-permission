import React from 'react';
import HasPermission from '../lib/HasPermission';

/**
 * 게시글의 상세 화면을 표현하는 Presentational Component이다.
 * post 객체를 전달받아 표시한다.
 * 
 * @param {object} post
 */
const PostDetail = ({ post }) => {

    if (!post) return null;

    const { author, title, content } = post;
    
    return (
        <div>
            <div>Author: {author}</div>
            <div>Title: {title}</div>
            <div>Content: {content}</div>
            <HasPermission target={post} permission='EDIT_POST'>
                <span>우측의 버튼은 수정 권한이 있는 경우만 보임 =></span>
                <button>수정</button>
            </HasPermission>
        </div>
    );
}

export default PostDetail;