import { useState } from "react"
import { Unregister_1_popup } from "./Unregister_1_popup"
import '../Find.css';
import './Unregister.css';

import { Link } from 'react-router-dom';

export function Unregister_1(){
    const [unregisterPopupOpen, setUnregisterPopupOpen ] = useState(false);
    const [password, setPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();


    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onPasswordConfirmHandler = (event) => {
        setPasswordConfirm(event.currentTarget.value);
    }


    return(

    <div className="screen_main">
        <div className="PasswordFindPage">
            <div className="FindHeader">
                <p>■ 회원 탈퇴하기</p>
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
                        <div id="FindNumDiv" className='nowNum1' style={{backgroundColor: '#40300E'}}>1</div>
                        <div id="FindNumDiv" className='nowNum2'>2</div>
                    </div>

                    <div className='Find_inputDiv_i'>
                        <form className='findform'>
                            <div className='inputs'>
                                <input type="text" placeholder='비밀번호' onChange={onPasswordHandler}></input>
                                <input type="text" placeholder='비밀번호 확인' onChange={onPasswordConfirmHandler}></input>
                            </div>
                            
                            
                            
                            <div className='submitBtn'>
                                <button style={{backgroundColor: '#E0E0E0'}}><Link to='/' style={{ textDecoration: "none"}}>취소</Link></button>
                                <button type='button' onClick={()=>setUnregisterPopupOpen(true)}>다음</button>
                            </div>
                            
                        </form>
                    </div>
                </div>


                </div>

                


                {
                    unregisterPopupOpen && (
                        <>
                        <Unregister_1_popup unregisterPopupOpen={unregisterPopupOpen} setUnregisterPopupOpen={setUnregisterPopupOpen} 
                        password={password} passwordConfirm={passwordConfirm}
                        /> 
                        </>
                    
                    )
                }

        </div>

        {
                    unregisterPopupOpen && (
                        <>
                        <div className="unregisterBlack"></div>
                        </>
                    
                    )
                }

        
    </div>
    )
}


