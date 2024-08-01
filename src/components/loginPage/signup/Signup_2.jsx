import '../Find.css';
import { Link } from 'react-router-dom'
import '../LoginPage.css'
import '../SignupPage.css'
import { useState } from 'react';




export function Signup_2(props){
    const {inputValue, setInputValue,
        handleChange,handleBlur,setWarning,
        inputRegexs,warning,
        signUp_N, setSignUp_N

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
                        <div id="FindNumDiv" className='nowNum2' style={{backgroundColor: '#40300E'}}>2</div>
                        <div id="FindNumDiv" className='nowNum3'>3</div>
                        <div id="FindNumDiv" className='nowNum4'>4</div>
                    </div>

                    <div className='Find_inputDiv'>
                        <form  className='findform'>
                            <div className='inputDiv_s'>

                            <div className='inputSection'>
                                <div className='A'>
                                    <input type="text" placeholder='이메일' name='email'
                                    value={inputValue.email} onChange={handleChange} onBlur={handleBlur}
                                    ></input>
                                </div>
                                <p className='warningmessage'>{ warning.email }</p>
                            </div>

                            <div className='inputSection'>
                                <div className="A" id='confirmCodeSection'>
                                    <input type="text" placeholder='인증번호' name='confirmCode'
                                    value={inputValue.confirmCode} onChange={handleChange} onBlur={handleBlur}
                                    ></input>
                                    <button id='confirmCodeCheck'>다시받기</button>
                                </div>
                                <p className='warningmessage'>{warning.confirmCode}</p>
                            </div>

                            
                                
                            

                            </div>
                            
                            
                            <div className='submitBtn'>
                                <button onClick={()=>{setSignUp_N(1)}} style={{backgroundColor: '#E0E0E0'}}>이전</button>
                                <button onClick={()=>{setSignUp_N(3)}}>다음</button>
                            </div>
                            
                        </form>
                    </div>
            </div>

        </div>
    </div>
    )
}
