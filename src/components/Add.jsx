import '../App.css';
import { useEffect } from 'react';



export function Add() {
    useEffect(() => {
        const script1 = document.createElement('script');
        script1.src = 'https://ads-partners.coupang.com/g.js';
        script1.async = true;

        const script2 = document.createElement('script');
        script2.innerHTML = `
            new PartnersCoupang.G({
                id: 797959,
                template: "carousel",
                trackingCode: "AF6175455",
                width: "352",
                height: "60",
                tsource: ""
            });
        `;

        const addDiv = document.querySelector('.add');
        addDiv.appendChild(script1);
        addDiv.appendChild(script2);

        // Cleanup function to remove the scripts when the component unmounts
        return () => {
            addDiv.removeChild(script1);
            addDiv.removeChild(script2);
        };
    }, []);

    return (
        <div className='add'>
            {/* 광고가 이 div 안에 렌더링됩니다 */}
        </div>
    );
}