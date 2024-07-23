import './LoginPage.css'
import './SignupPage.css'


export function PasswordFindPage(){
    return(
        <div className="screen_main">
        <div className="PasswordFindPage">
            <div className='loginlogo'>
                <div id='logoIcon'></div>
                <div id='logoText'></div>
            </div>
            <div className='backgroundbox'>
                <div className='login_title'>
                    <h1>비밀번호 찾기</h1>
                </div>

                <div className='userInfo'>
                    <form>
                    <div className="inputDiv">
                        <div className="inputSection">
                            <p className='Q'>아이디</p>
                            <div className="A">
                                <input type='text' ></input>
                            </div>
                        </div>
                        <div className="inputSection">
                            <p className='Q'>이름</p>
                            <div className="A">
                                <input type='text' ></input>
                            </div>
                        </div>
                        <div className="inputSection">
                            <p className='Q'>휴대폰 번호</p>
                            <div className="A">
                                <input type='text' ></input>
                            </div>
                        </div>
                    </div>
                    <button id='findBtn'>찾기</button>
                    </form>
                    
                </div>
            </div>   
        </div>
    </div>
    )
}

