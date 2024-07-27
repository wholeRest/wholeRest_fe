import '../App.css'
import './NewsPage.css'
import './Fixed.css'

import { Link } from 'react-router-dom'


export function New(){
    {/*
        클릭하면 해당 페이지로 가야함. 
        페이지정보가 필요함. (커뮤니티 게시글, 마이페이지)    

        큰 제목 / 작은 내용
    */}




    return(
        <div className="newDiv">
            <div className="newInfo">
                <div className="newBig">
                    <p>내 게시글에 댓글이 달렸어요.</p>
                </div>
                <div className="newSmall">
                    <p>네모: ㅇㅇㅇ</p>
                </div>
            </div>
            
        </div>
    )
}