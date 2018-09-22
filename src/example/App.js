import React from 'react';
import { connect } from 'react-redux';

import HasPermission from '../lib/HasPermission';
import PostDetail from './PostDetail';

/**
 * React-Has-Permission의 Root Component이다.
 * 
 * @param {object} post 게시글 객체 (Redux Store에서 받아옴)
 */
const App = ({ post }) => {
    return (
        <div>
            Hello, I'm App!
            <HasPermission target={post} permission='VIEW_POST'>
                <PostDetail post={post} />
            </HasPermission>
        </div>
    );
}

export default connect(state => ({ post: state.post }))(App);