# React-Has-Permission

React 환경에서 권한에 따른 컴포넌트 표시를 달리 하는 `<HasPermission>` 컴포넌트를 제공합니다. 권한 정의 방법과 권한 관리 방법 등의 기능을 갖는 유틸 클래스도 같이 제공합니다.

## 기본 개념

Spring Backend에서 적용하고 있는 [AbacSpringSecurity Repository](https://github.com/mostafa-eltaher/AbacSpringSecurity)의 개념을 그대로 React에 적용하였으므로, 위의 Repository를 참고하시면 이해에 도움이 될 것 같습니다. 

## NPM Library

해당 Repository는 npm library를 제공하지 않습니다. 해당 Repository가 예제 코드가 시작점입니다. 해당 Repository는 `CRA`로 생성하였습니다.

## 예제 실행 방법

```
clone https://github.com/seongbin9786/react-has-permission
npm i
npm start
```

## 사용 방법 Part 1 - 컴포넌트 사용 예시

```js
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
```

## 사용 방법 Part 1 - 권한 정의

1. SecurityRule 객체 정의

```js
const editPost = new SecurityRule('EDIT_POST', 'target.authorId == subject.id', '작성자에게만 허가된 게시글 수정 권한');
```

```js
    /**
     * 
     * @param {string} permission 이 보안 규칙이 대응하는 접근 권한
     * @param {string} condition 이 보안 규칙이 평가할 JS 표현식
     * @param {string} name 이 보안 규칙의 이름
     * @param {string} desc 이 보안 규칙의 설명
     */
    constructor(permission, condition, name = '[no-name]', desc = '[no-desc]') {
        
        if (!(permission && condition)) throw Error('Bad SecurityRule');

        this.permission = permission;
        this.condition = condition;
        this.name = name;
        this.desc = desc;
    }
```

2. `SecurityRuleRepository.addRule`로 Rule을 Repository에 추가. 

```js
SecurityRuleRepository.addRule(editPost);
```

## 의존성

redux, react-redux, jexl(JS 표현식 처리를 위함)

## Redux의 필요성

보안 규칙의 평가 과정에서 사용자 객체(기본값으로 `subject`라는 변수 이름을 사용)에 접근해야 합니다. 이 때 `<HasPermission />` 컴포넌트가 `connect` 함수를 통해 사용자 객체를 받아오게 됩니다. 그 외의 Redux 관련 코드는 없습니다.
