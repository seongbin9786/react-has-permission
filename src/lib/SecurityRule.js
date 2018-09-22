import jexl from 'jexl';

/**
 * 보안 규칙 단위 클래스이다.
 */
class SecurityRule {

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

    /**
     * 해당 보안 규칙이 특정 권한에 대한 것인지 여부를 반환
     * 
     * @param {string} permission 이 보안 규칙이 적용될 수 있는지 확인할 대상 권한명
     */
    satisfy(permission) {
        return this.permission === permission;
    }

    /**
     * 해당 규칙을 평가하고 접근이 허가된 경우 콜백 함수를 호출한다.
     * 
     * @param {object} environment 보안 규칙에서 접근할 객체를 담은 컨텍스트
     * @param {function} successCallback 접근이 허가된 경우 실행될 함수
     */
    judge(environment, successCallback) {

        console.log('environment:', environment);

        // Call eval in specific context [= target]
        // JS 표현식 처리를 위해 jexl 라이브러리를 사용함
        jexl.eval(this.condition, environment)
            .then(() => console.log('Applied:', this.print()) || successCallback())
            .catch(error => error); // hide error
    }

    /**
     * 해당 규칙의 이름과 설명을 출력한다.
     */
    print() {
        return `SecurityRule { name: ${this.name}, desc: ${this.desc} }`;
    }
}

export default SecurityRule;