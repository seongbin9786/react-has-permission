import SecurityRule from "./SecurityRule";

class SecurityRuleRepository {
    constructor() {
        this.rules = [];

        this.addRule(new SecurityRule('EDIT_POST', 'target.authorId == subject.id', '작성자에게만 허가된 게시글 수정 권한'));
        this.addRule(new SecurityRule('VIEW_POST', 'target.postLevel == 1', '모든 사용자에게 조회가 허가된 게시글의 조회 권한'));
    }

    getAllRules() {
        return this.rules;
    }

    addRule(rule) {
        this.rules.push(rule);
    }
}

export default new SecurityRuleRepository();