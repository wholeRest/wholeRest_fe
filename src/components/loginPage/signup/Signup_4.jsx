
import '../Find.css';
import { Link } from 'react-router-dom'
import '../LoginPage.css'
import '../SignupPage.css'
import { useState } from 'react';





export function Signup_4(props){
    const {inputValue, setInputValue,
        handleChange,handleBlur,setWarning,
        inputRegexs,warning


    } = props;
    

    

    return(
        <div className="screen_main">
        <div className="PasswordFindPage">
            <div className="FindHeader">
                <p>■ 회원가입</p>
                <button id='backBtn_toHome'><Link to='/' style={{ textDecoration: "none"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none"><path stroke="#40300E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m22.5 7.5-15 15M7.5 7.5l15 15"/></svg>
                </Link></button>
            </div>
            <div className='Find_Maincontents'>
                <div className='Find_option'>
                    
                </div>

            </div>

            <div className='PasswordFind'>
            <div className='lines'>
                <div id='linePW'></div>
                <div id='linePW'></div>
                <div id='linePW'></div>
            </div>

            <div className='Find_num' >
                        <div id="FindNumDiv" className='nowNum1'>1</div>
                        <div id="FindNumDiv" className='nowNum2'>2</div>
                        <div id="FindNumDiv" className='nowNum3'>3</div>
                        <div id="FindNumDiv" className='nowNum4' style={{backgroundColor: '#40300E'}}>4</div>
                    </div>

                    <div className='Find_inputDiv'>
                        <form  className='findform'>
                            <div>
                                <p>회원가입이 정상적으로 완료되었습니다.</p>
                            </div>
                            
                            
                            <div className='submitBtn'>
                                <button style={{backgroundColor: '#E0E0E0'}}><Link to='/find/password3' style={{ textDecoration: "none"}}>이전</Link></button>
                                <button ><Link to='/' style={{ textDecoration: "none"}}>완료</Link></button>
                            </div>
                            
                        </form>
                    </div>
            </div>

        </div>
    </div>
    )
}
