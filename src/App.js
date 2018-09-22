import React from 'react';
import HasPermission from './HasPermission';
import PostDetail from './PostDetail';

const post = {
    authorId: 1,
    author: 'Seongbin Kim',
    postLevel: 1,
    title: 'hello',
    content: 'world'
};

const App = () => {
    return (
        <div>
            Hello, I'm App!
            <HasPermission target={post} permission='VIEW_POST'>
                <PostDetail post={post} />
            </HasPermission>
        </div>
    );
}

export default App;