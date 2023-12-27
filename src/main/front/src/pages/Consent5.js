import styles from "./Consent5.module.css";

const Consent5 = () => {
    return (
        <div className={styles.div}>
            <div className={styles.child} />
            <div className={styles.div1}>화물타고 서비스 이용 약관</div>
            <div className={styles.brokarryContainer}>
                <p className={styles.p}>
                    ㈜롤랩은 정보통신망의 이용촉진 및 정보보호 등에 관한 법률 제50조
                    제1항에 따라 광고성 정보를 전송하기 위해 수신자의 사전 동의를 받고
                    있으며, 수신 동의여부를 정기적으로 확인합니다.
                </p>
                <p className={styles.p}>&nbsp;</p>
                <p className={styles.p}>
                    광고성 정보 수신에 동의하실 경우, ㈜롤랩이 제공하는 Brokarry 이벤트 및
                    혜택 정보에 대한 광고성 정보가 전자우편(e-mail), 문자(SMS) 및 APP
                    Push를 통해 발송됩니다.
                </p>
                <p className={styles.p}>&nbsp;</p>
                <p className={styles.p}>
                    단, 정산 정보, 화물등록 알림 등 광고성 정보 이외의 의무적으로
                    안내되어야 하는 정보성 내용은 수신동의 여부와 무관하게 제공됩니다.
                </p>
                <p className={styles.p}>&nbsp;</p>
                <p className={styles.p}>
                    수신동의 의사표시 이후에라도 1533-3456(고객센터 등)를 통해 이용자의
                    의사에 따라 수신동의 상태를 변경(동의/철회)할 수 있습니다.
                </p>
            </div>
        </div>
    );
};

export default Consent5;
