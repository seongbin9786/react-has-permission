import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './example/reducers';
import App from './example/App';
import SecurityRule from './lib/SecurityRule';
import SecurityConfig from './lib/SecurityConfig';
import SecurityRuleRepository from './lib/SecurityRuleRepository';

const store = createStore(reducers);

// Redux Store에서 사용하는 사용자 객체의 이름을 설정한다. 기본값은 subject이다.
SecurityConfig.initialize('subject');

// Repository에 보안 규칙을 추가한다.
SecurityRuleRepository.addRule(new SecurityRule('EDIT_POST', 'target.authorId == subject.id', '작성자에게만 허가된 게시글 수정 권한'));
SecurityRuleRepository.addRule(new SecurityRule('VIEW_POST', 'target.postLevel == 1', '모든 사용자에게 조회가 허가된 게시글의 조회 권한'));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);