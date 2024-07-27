import './LoginPage.css'
import './SignupPage.css'
import { Link } from 'react-router-dom';

import { IdFind_1 } from './idFind/IdFind_1'

export function IdFindPage(){
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
                    
                        <button>아이디 찾기</button>
                        <button><Link to='/find/password1' style={{ textDecoration: "none"}}>비밀번호 변경</Link></button>
                    </div>

                </div>

                <div className='IdFind'>
                    <div className='lines_i'>
                        <div id='lineId'></div>
                    </div>

                    <IdFind_1 />
                </div>

            </div>
        </div>
    )
}
