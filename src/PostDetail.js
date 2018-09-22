import React from 'react';
import HasPermission from './HasPermission';

const PostDetail = ({ post }) => {

    const { author, title, content } = post;
    
    return (
        <div>
            <div>Author: {author}</div>
            <div>Title: {title}</div>
            <div>Content: {content}</div>
            <HasPermission target={post} permission='EDIT_POST'>
                <button>게시글 수정하기</button>
            </HasPermission>
        </div>
    );
}

export default PostDetail;