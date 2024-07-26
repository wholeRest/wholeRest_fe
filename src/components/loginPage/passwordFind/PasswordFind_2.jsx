import '../Find.css';
import { Link } from 'react-router-dom'


export function PasswordFind_2(props){


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

            <div className='Find_num' >
                        <div id="FindNumDiv" className='nowNum1' style={{backgroundColor: '#40300E'}}>1</div>
                        <div id="FindNumDiv" className='nowNum2'>2</div>
                        <div id="FindNumDiv" className='nowNum3'>3</div>
                        <div id="FindNumDiv" className='nowNum4'>4</div>
                    </div>

                    <div className='Find_inputDiv'>
                        <form>
                            <div className='inputs'>
                                <input type="text" placeholder='인증번호'></input>
                            </div>
                            
                            
                            <div className='submitBtn'>
                                <button style={{backgroundColor: '#757575'}}><Link to='/find/password1' style={{ textDecoration: "none"}}>이전</Link></button>
                                <button ><Link to='/find/password3' style={{ textDecoration: "none"}}>다음</Link></button>
                            </div>
                            
                        </form>
                    </div>
            </div>

        </div>
    </div>
        
    )
}


