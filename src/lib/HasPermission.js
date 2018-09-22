import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SecurityConfig from './SecurityConfig';
import SecurityRuleRepository from './SecurityRuleRepository';

/**
 * 입력받은 보안 규칙을 시험하여 접근이 허가된 경우에만 children을 표시하는 컴포넌트이다.
 * 
 * Redux와 연결되어 있으며, Store에서 subject(사용자 정보 객체)를 props로 받아온다.
 */
class HasPermission extends Component {
    constructor() {
        super();

        this.state = {
            allowed: false
        };
    
        this.grantPermission = this.grantPermission.bind(this);
    }

    /**
     * Repository에서 가져온 규칙 중 적용할 수 있는 규칙만을 선별하여 배열로 반환한다.
     * 
     * @param {string} permission 보안 규칙명
     */
    getAppliableRulesForPermission(permission) {
        console.log(SecurityRuleRepository);

        return SecurityRuleRepository
            .getAllRules()
            .filter(rule => rule.satisfy(permission));
    }

    /**
     * 적용할 보안 규칙의 배열을 돌면서 대상 객체에 대해 검증한다.
     * 하나의 보안 규칙만 통과하더라도 접근이 허가된다.
     * 
     * @param {object} target 보안 규칙에서 참조할 객체
     * @param {array} securityRules 보안 규칙의 배열
     */
    judgeSecurityRules(target, securityRules) {
        // judge가 비동기 함수이기 때문에 중간에 멈추기 애매함.
        // 콜백함수를 다시 지정하는 것으로 해결할 수 있을 것 같긴 함.

        const { subject } = this.props;
        const environment = { subject, target };

        securityRules.forEach(rule => console.log('applying:', rule.print()) || rule.judge(environment, this.grantPermission));
    }

    /**
     * 접근을 허가한다.
     */
    grantPermission() {
        console.log('Permission Granted!');

        this.setState({ allowed: true });
    }

    /**
     * 컴포넌트가 mount되면 보안 규칙을 확인하고 접근 허가 여부를 계산한다.
     */
    componentDidMount() {
        const { target, permission } = this.props;

        const securityRules = this.getAppliableRulesForPermission(permission);

        this.judgeSecurityRules(target, securityRules);
    }

    render() {
        return this.state.allowed ? this.props.children : null;
    }
}

HasPermission.propTypes = {
    target: PropTypes.object.isRequired,
    permission: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    subject: SecurityConfig.getSubjectFromState(state)
});

export default connect(mapStateToProps)(HasPermission);