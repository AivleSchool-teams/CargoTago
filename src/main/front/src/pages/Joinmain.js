import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Joinmain.module.css";

const Joinmain = () => {
    const navigate = useNavigate();

    const onShipperJoinClick = useCallback(() => {
        navigate("/Shipper/1");
    }, [navigate]);

    const onCarrierJoinClick = useCallback(() => {
        navigate("/Carrier/1");
    }, [navigate]);

    return (
        <div className={styles.div}>
            <div className={styles.div1}>화물타고</div>
            <div className={styles.rectangleParent} onClick={onShipperJoinClick}>
                <div className={styles.groupChild} />
                <div className={styles.div2}>화주로 회원가입하기</div>
            </div>
            <div className={styles.rectangleGroup} onClick={onCarrierJoinClick}>
                <div className={styles.groupChild} />
                <div className={styles.div3}>차주로 회원가입하기</div>
            </div>
        </div>
    );
};

export default Joinmain;