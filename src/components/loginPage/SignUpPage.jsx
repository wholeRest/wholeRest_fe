import './LoginPage.css'
import './SignupPage.css'
import { Link } from 'react-router-dom';

export function SignUpPage(){
    return(
        <div className="screen_main">
            <div className="SignUpPage">
                
                <div className="SignupHeader">
                    <p>■ 회원가입</p>
                    <button id='backBtn_toHome'><Link to='/' style={{ textDecoration: "none"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none"><path stroke="#40300E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m22.5 7.5-15 15M7.5 7.5l15 15"/></svg>
                    </Link></button>
                </div>
                <div className='backgroundbox'>
                    
                    
                   <div className='userInfo'>
                        <form>
                            <div className='inputDiv'>

                            <div className='inputSection'>
                                <div className="A" id='idSection'>
                                    <input type="text" placeholder='아이디'></input>
                                    <button id='idCheck'>중복확인</button>
                                </div>
                            </div>

                            <div className='inputSection'>
                                <div className='A'>
                                    <input type="text" placeholder='비밀번호'></input>
                                </div>
                                
                            </div>
                            <div className='inputSection'>
                                <div className='A'>
                                    <input type="text" placeholder='비밀번호 재확인'></input>
                                </div>
                                
                            </div>

                            <div className='inputSection'>
                                <div className='A'>
                                    <input type="text" placeholder='성명'></input>
                                </div>
                                
                            </div>

                            <div className='inputSection'>
                                <div className='A'>
                                    <input type="text" placeholder='닉네임'></input>
                                </div>
                                
                            </div>
                            
                            <div className='inputSection'>
                                <div className='A'>
                                    <input type="text" placeholder='이메일'></input>
                                </div>
                            </div>

                            <div className='inputSection'>
                                <div className='A'>
                                    <input type="text" placeholder='휴대폰 번호'></input>
                                </div>
                            </div>
                            </div>
                            
                            <button id="signupBtn">회원가입</button>
                        </form>
                   </div>
                </div>


            </div>
        </div>
    )
}
