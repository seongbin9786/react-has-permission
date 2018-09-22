import { Component } from 'react';
import PropTypes from 'prop-types';

import SecurityRuleRepository from './SecurityRuleRepository';

class HasPermission extends Component {
    state = {
        allowed: false
    }

    getAppliableRulesForPermission(permission) {
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
        securityRules.forEach(rule => {
            if (rule.judge(target)) {
                this.grantPermission();
                break;
            }
        });
    }

    grantPermission() {
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

HasPermission.PropTypes = {
    target: PropTypes.object.isRequired,
    permission: PropTypes.string.isRequired
}

export default HasPermission;