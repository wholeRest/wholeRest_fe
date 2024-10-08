import './LoginPage.css'
import './SignupPage.css'
import './Find.css';
import { Link } from 'react-router-dom';

import { IdFind_1 } from './idFind/IdFind_1';
import { IdFind_2_false } from './idFind/IdFind_2_false';

import { PasswordFind_1 } from './passwordFind/PasswordFind_1';
import { PasswordFind_2 } from './passwordFind/PasswordFind_2';
import { PasswordFind_3 } from './passwordFind/PasswordFind_3';
import { PasswordFind_4 } from './passwordFind/PasswordFind_4';


export function PasswordFindPage(){

    return(

        <div className="screen_main">
        <div className="PasswordFindPage">
            <div className="FindHeader">
                <p>■ 계정정보 확인 및 변경</p>
                <button id='backBtn_toHome'><Link to='/' style={{ textDecoration: "none"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none"><path stroke="#40300E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m22.5 7.5-15 15M7.5 7.5l15 15"/></svg>
                </Link></button>
            </div>
            <div className='Find_Maincontents'>
                <div className='Find_option'>
                    
                    <button><Link to='/find/id' style={{ textDecoration: "none"}}>아이디 찾기</Link></button>
                    <button>비밀번호 변경</button>
                </div>

            </div>

            <div className='PasswordFind'>
            <div className='lines'>
                <div id='linePW'></div>
                <div id='linePW'></div>
                <div id='linePW'></div>
            </div>

            <PasswordFind_1 />
            </div>

        </div>
    </div>
        
    
    )
}

