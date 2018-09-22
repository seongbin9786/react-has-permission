import SecurityRule from "./SecurityRule";

/**
 * 보안 규칙을 담는 리포지터리 클래스이다.
 */
class SecurityRuleRepository {
    constructor() {
        this.rules = [];
    }

    getAllRules() {
        return this.rules;
    }

    addRule(rule) {
        if (!(rule instanceof SecurityRule))
            throw Error('Rule to add - is not a SecurityRule instance');
            
        this.rules.push(rule);
    }
}

export default new SecurityRuleRepository();