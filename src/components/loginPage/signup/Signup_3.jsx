import '../Find.css';
import { Link } from 'react-router-dom'
import '../LoginPage.css'
import '../SignupPage.css'
import { useState } from 'react';
import { useEffect } from 'react';



export function Signup_3(props){
    const {inputValue, setInputValue,
        handleChange,handleBlur,setWarning,
        inputRegexs,warning,handleSubmit,
        signUp_N, setSignUp_N,
        isNextEnabled, setIsNextEnabled,

    } = props;

    useEffect(() => {
        const isAllValid = inputValue.password && inputValue.correctpasswordConfirm &&
            !warning.password &&
            inputValue.passwordConfirm && !warning.passwordConfirm 

        setIsNextEnabled(prev => ({ ...prev, third: isAllValid }));
    }, [inputValue, warning, setIsNextEnabled]);

    // 입력받는 함수
    const onPasswordHandler = (event) => {
        const { value } = event.currentTarget;
        handleChange(event);
        setInputValue(prevState => ({ ...prevState, password: value })); // 수정
        console.log(inputValue);
    }
    const onPasswordConfirmHandler = (event) => {
        const { value } = event.currentTarget;
        handleChange(event);
        setInputValue(prevState => ({ ...prevState, passwordConfirm: value })); // 수정
        console.log(inputValue);
    }

    


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
                        <div id="FindNumDiv" className='nowNum3' style={{backgroundColor: '#40300E'}}>3</div>
                        <div id="FindNumDiv" className='nowNum4'>4</div>
                    </div>

                    <div className='Find_inputDiv'>
                        <form  className='findform'>
                            <div className='inputDiv_s'>

                            <div className='inputSection'>
                                <div className='A'>
                                    <input type="text" placeholder='비밀번호' name='password'
                                    value={inputValue.password} onChange={onPasswordHandler} onBlur={handleBlur}
                                    ></input>
                                </div>
                                <p className='warningmessage'>{ warning.password }</p>
                            </div>
                            
                            <div className='inputSection'>
                                <div className="A">
                                    <input type="text" placeholder='비밀번호 확인' name='passwordConfirm'
                                    value={inputValue.passwordConfirm} onChange={onPasswordConfirmHandler} onBlur={handleBlur}
                                    ></input>
                                </div>
                                <p className='warningmessage'>{warning.passwordConfirm}</p>
                            </div>

                            
                                
                            

                            </div>
                            
                            
                            <div className='submitBtn'>
                                <button onClick={()=>{setSignUp_N(2)}} style={{backgroundColor: '#E0E0E0'}}>이전</button>
                                <button onClick={handleSubmit}>다음</button>
                                
                            </div>
                            
                        </form>
                    </div>
            </div>

        </div>
    </div>
    )
}
