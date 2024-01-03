import React, { useState } from 'react';
import { useEffect } from 'react';

const Map = () => {
    const [address, setAddress] = useState({
        postcode: '',
        address: '',
        detailAddress: '',
        extraAddress: '',
    });

    const handleAddress = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '' && data.apartment === 'Y') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        setAddress({
            ...address,
            postcode: data.zonecode,
            address: fullAddress,
            extraAddress: extraAddress,
        });
    };

    const loadPostcode = () => {
        const script = document.createElement('script');
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.onload = () => {
            new window.daum.Postcode({
                oncomplete: handleAddress,
            }).open();
        };
        document.body.appendChild(script);
    };

    useEffect(() => {
        return () => {
            // 컴포넌트가 언마운트 될 때 스크립트를 제거
            const script = document.querySelector('script[src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"]');
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <div>
            <input
                type="text"
                id="sample6_postcode"
                placeholder="우편번호"
                value={address.postcode}
                readOnly
            />
            <input
                type="button"
                onClick={loadPostcode}
                value="우편번호 찾기"
            /><br/>
            <input
                type="text"
                id="sample6_address"
                placeholder="주소"
                value={address.address}
                readOnly
            /><br/>
            <input
                type="text"
                id="sample6_detailAddress"
                placeholder="상세주소"
                value={address.detailAddress}
                onChange={(e) => setAddress({ ...address, detailAddress: e.target.value })}
            />
            <input
                type="text"
                id="sample6_extraAddress"
                placeholder="참고항목"
                value={address.extraAddress}
                readOnly
            />
        </div>
    );
};

export default Map;
