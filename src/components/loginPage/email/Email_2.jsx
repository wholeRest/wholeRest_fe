import '../Find.css';
import { Link } from 'react-router-dom'
import '../LoginPage.css'
import '../SignupPage.css'
import { useState } from 'react';



export function Email_2(){

    return(
        
        <div className="screen_main">
        <div className="PasswordFindPage">
            <div className="FindHeader">
                <p>■ 이메일 변경하기</p>
                <button id='backBtn_toHome'><Link to='/' style={{ textDecoration: "none"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none"><path stroke="#40300E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m22.5 7.5-15 15M7.5 7.5l15 15"/></svg>
                </Link></button>
            </div>
            <div className='Find_Maincontents'>
                <div className='Find_option'>
                    
                    
                </div>

            </div>

            <div className='IdFind'>
                <div className='lines_i'>
                    <div id='lineId'></div>
                </div>

                <div className='PasswordFind'>
        
        
        <div className='Find_num_i' >
            <div id="FindNumDiv" className='nowNum1'>1</div>
            <div id="FindNumDiv" className='nowNum2' style={{backgroundColor: '#40300E'}}>2</div>
        </div>

        <div className='Find_i_resultDiv'>
        <div className='Find_i_result'>
            <p>정상적으로 변경이 완료되었습니다. </p>
        </div>
        
        <div className='submitBtn_i'>
        <button style={{backgroundColor: '#E0E0E0'}}><Link to='/' style={{ textDecoration: "none"}}>닫기</Link></button>
        </div>

        </div>

        

    </div>
            </div>

        </div>
    </div>
    )
}
