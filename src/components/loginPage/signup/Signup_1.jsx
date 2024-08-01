import '../Find.css';
import { Link } from 'react-router-dom'
import '../LoginPage.css'
import '../SignupPage.css'
import { useState } from 'react';

import axios from 'axios';



export function Signup_1(props){
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
                        <div id="FindNumDiv" className='nowNum1' style={{backgroundColor: '#40300E'}}>1</div>
                        <div id="FindNumDiv" className='nowNum2'>2</div>
                        <div id="FindNumDiv" className='nowNum3'>3</div>
                        <div id="FindNumDiv" className='nowNum4'>4</div>
                    </div>

                    <div className='Find_inputDiv'>
                        <form  className='findform'>
                            <div className='inputDiv_s'>
                            <div className='inputSection'>
                                <div className="A" id='idSection'>
                                    <input type="text" placeholder='아이디' name='id'
                                    value={inputValue.id} onChange={handleChange} onBlur={handleBlur}
                                    ></input>
                                    <button id='idCheck'>중복확인</button>
                                </div>
                                <p className='warningmessage'>{warning.id}</p>
                            </div>

                            <div className='inputSection'>
                                <div className='A'>
                                    <input type="text" placeholder='성명' name='name'
                                    value={inputValue.name} onChange={handleChange} onBlur={handleBlur}
                                    ></input>
                                </div>
                                <p className='warningmessage'>{ warning.name }</p>
                            </div>
                                
                            <div className='inputSection'>
                                <div className='A'>
                                    <input type="text" placeholder='생년월일 (YYMMDD)' name='birth'
                                    value={inputValue.birth} onChange={handleChange} onBlur={handleBlur}
                                    ></input>
                                </div>
                                <p className='warningmessage'>{ warning.birth }</p>
                            </div>
                                
                                <div className='inputSection'>
                                <div className='A'>
                                    <input type="text" placeholder='닉네임' name='nickname'
                                    value={inputValue.nickname} onChange={handleChange} onBlur={handleBlur}
                                    ></input>
                                </div>
                                <p className='warningmessage'>{ warning.nickname }</p>
                            </div>

                            </div>
                            
                            
                            <div className='submitBtn'>
                                <button style={{backgroundColor: '#E0E0E0'}}><Link to='/' style={{ textDecoration: "none"}}>이전</Link></button>
                                <button onClick={()=>{setSignUp_N(2)}}>다음</button>
                            </div>
                            
                        </form>
                    </div>
            </div>

        </div>
    </div>
    )
}
