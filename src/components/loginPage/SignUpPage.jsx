import './LoginPage.css'
import './SignupPage.css'

export function SignUpPage(){
    

    return(
        <div className="screen_main">
            <div className="SignUpPage">
                <div className='loginlogo'>
                    <div id='logoIcon'></div>
                    <div id='logoText'></div>
                </div>
                <div className='backgroundbox'>
                    <div className='login_title'>
                        <h1>회원가입</h1>
                    </div>
                    
                   <div className='userInfo'>
                        <form>
                            <div className='inputDiv'>
                            <div className='inputSection'>
                                <p className='Q'>아이디</p>
                                <div className="A">
                                    <input type='text' ></input>
                                    <button id='idCheck'>중복확인</button>
                                </div>
                                
                            </div>
                            <div className='inputSection'>
                                <p className='Q'>비밀번호</p>
                                <div className='A'>
                                <input type='text' className="A"></input>
                                </div>
                                
                            </div>
                            <div className='inputSection'>
                                <p className='Q'>닉네임</p>
                                <div className='A'>
                                <input type='text' className="A"></input>
                                </div>
                                
                            </div>
                            <div className='inputSection'>
                                <p className='Q'>성명</p>
                                <div className='A'>
                                <input type='text' className="A"></input>
                                </div>
                                
                            </div>
                            <div className='inputSection'>
                            <p className='Q'>이메일</p>
                            <div className='A'>
                            <input type='email'  className="A"></input>@
                                <select>
                                    <option value='naver.com'>naver.com</option>
                                    <option value='gmail.com'>gmail.com</option>
                                </select>  
                                </div>
                                
                            </div>
                            <div className='inputSection'>
                            <p className='Q'>휴대폰 번호</p>
                            <div className='A'>
                            <select  className="A">
                                    <option value='010'>010</option>
                                    <option value='011'>011</option>
                                </select>-
                                <input type="text" minLength="2" maxLength="4"></input>-
                                <input type="text" minLength="2" maxLength="4"></input>
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
