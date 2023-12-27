import styles from "./Consent3.module.css";

const Consent3 = () => {
    return (
        <div className={styles.div}>
            <div className={styles.child} />
            <div className={styles.div1}>화물타고 서비스 이용 약관</div>
            <div className={styles.nbsp1Container}>
                <p
                    className={styles.p}
                >{`주식회사 롤랩은 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법, 통신비밀보호법, 전기통신사업법 등 정보통신서비스제공자가 준수하여야 할 관련 법령상의 개인정보보호 규정을 준수하며, 관련 법령에 의거한 개인정보처리방침을 정하여 이용자 권익 보호에 최선을 다하고 있습니다. `}</p>
                <p className={styles.p}>&nbsp;</p>
                <p className={styles.p}>1. 개인정보 수집•이용 목적 및 항목</p>
                <p
                    className={styles.p}
                >{`① 수집•이용 목적 : 화주 및 차주회원 등록/관리, 배송비 정산, 민원사무, 실적신고 처리, `}</p>
                <p className={styles.p}>산재보험료 의무납부, 화물 배송현황 관리</p>
                <p className={styles.p}>{`② 개인정보 항목 `}</p>
                <p className={styles.p}>
                    - 화주회원 : 사업장 상호명, 사업장 주소, 사업자 등록번호, 담당자 성명,
                    연락처, 이메일
                </p>
                <p
                    className={styles.p}
                >{`- 차주회원 : 성명, 주민등록번호, 사업자 생년월일, 사업자등록증 주소, 연락처, 이메일, `}</p>
                <p className={styles.p}>
                    사업자명, 사업자 등록번호, 화물운송자격번호, 운전면허번호,
                    은행계좌번호, 차량번호, 차주 위치정보
                </p>
                <p className={styles.p}>&nbsp;</p>
                <p className={styles.p}>{`2. 개인정보 보유 및 이용기간 `}</p>
                <p
                    className={styles.p}
                >{`- 회원탈퇴 후 6개월간 보관 후 파기 단, 이용자에게 개인정보 보유기간에 대해 별도 동의를 얻은 경우, 또는 법령에 따라 일정 기간 보관의무가 있는 경우 해당 기간 동안 보관합니다. `}</p>
                <p className={styles.p}>&nbsp;</p>
                <p
                    className={styles.p}
                >{`3. 서비스 이용 과정에서 IP Address, 쿠키, 방문일시, 서비스 이용기록, 접속로그, 결제기록, 운송실적정보, 불량이용기록이 생성되어 수집될 수 있습니다. `}</p>
                <p className={styles.p}>&nbsp;</p>
                <p className={styles.p}>
                    4. 이용자는 개인정보 수집 및 이용 동의를 거부할 권리가 있습니다. 다만,
                    회원가입 시 필요한 최소한의 필수 항목에 대해 동의 거부 시 서비스
                    이용이 불가합니다.
                </p>
            </div>
        </div>
    );
};

export default Consent3;
