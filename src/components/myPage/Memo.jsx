import './MyPage.css';
import './Memo.css'
import { useState } from 'react';

export function Memo(props){

    const{memo, setMemo} = props;

    const memoWrite = (e) => {
        setMemo(e.target.value);
    }

    return(
        <div className="mypage_Memo">
            <div className='mypage_title'>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" fill="none"><rect width="11.458" height="13.542" x="5.208" y="8.833" fill="url(#a)" rx="2"/><path stroke="#40300E" strokeLinecap="round" strokeWidth="1.2" d="M8.334 15.083h6.25M8.334 11.958H12.5M8.334 18.208H12.5M19.792 14.042v2.333c0 2.828 0 4.243-.879 5.121-.878.879-2.293.879-5.121.879h-2.583c-2.829 0-4.243 0-5.122-.879-.878-.878-.878-2.293-.878-5.121v-6.75c0-2.828 0-4.243.878-5.121.879-.879 2.293-.879 5.122-.879H12.5M18.75 3.625v6.25M21.875 6.75h-6.25"/><defs><linearGradient id="a" x1="5.208" x2="16.667" y1="15.604" y2="15.604" gradientUnits="userSpaceOnUse"><stop stopColor="#FFE14F"/><stop offset=".514" stopColor="#FFE14F"/></linearGradient></defs></svg>
            <p className="mypage_title">TODAY'S MEMO</p>
            </div>
            
            <div className="mypage_Memo_box">
                <textarea className='memoWriteBox' rows='8' onChange={memoWrite}
                value={memo}>
                    
                </textarea>

            </div>
        </div>
    )
}


