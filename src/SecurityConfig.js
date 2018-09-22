/**
 * 보안 규칙에서 subject에 접근할 수 있을 지 설정한다.
 * 
 * subject를 Redux에서 접근할 수 있게 할 지 결정한다.
 * 
 * 
 */
class SecurityConfig {
    /**
     * 기본 값을 subject로 설정함
     */
    constructor() {
        this.subjectStateName = 'subject';
    }

    /**
     * Redux Store에 저장되는 사용자 정보의 state 조각의 이름을 설정한다.
     * 
     * @param {string} subjectStateName 
     */
    initialize(subjectStateName) {
        this.subjectStateName = subjectStateName;
    }

    /**
     * Selector 함수 역할
     */
    getSubjectFromState(state) {
        return state[this.subjectStateName];
    }

}

export default new SecurityConfig();