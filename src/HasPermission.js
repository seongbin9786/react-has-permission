import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SecurityConfig from './SecurityConfig';
import SecurityRuleRepository from './SecurityRuleRepository';

class HasPermission extends Component {
    constructor() {
        super();

        this.state = {
            allowed: false,
            subject: {
                id: 1,
            }
        };
    
        this.grantPermission = this.grantPermission.bind(this);
    }

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

    grantPermission() {
        console.log('Permission Granted!');

        this.setState({ allowed: true });
    }

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