import '../Find.css';
import { Link } from 'react-router-dom';

export function PasswordFind_1(props){



    return(
        <>
                    
                    <div className='Find_num' >
                        <div id="FindNumDiv" className='nowNum1' style={{backgroundColor: '#40300E'}}>1</div>
                        <div id="FindNumDiv" className='nowNum2'>2</div>
                        <div id="FindNumDiv" className='nowNum3'>3</div>
                        <div id="FindNumDiv" className='nowNum4'>4</div>
                    </div>

                    <div className='Find_inputDiv'>
                        <form>
                            <div className='inputs'>
                                <input type="text" placeholder='아이디'></input>
                                <input type="text" placeholder='성명'></input>
                                <input type="text" placeholder='생년월일'></input>
                            </div>
                            
                            <div className='send_option'>
                                <div className='howsend'>
                                    <p>인증번호 전송방법</p>
                                    <div className='send_radio'>
                                        <label>
                                            <input type="radio" />휴대폰
                                        </label>
                                        <label>
                                            <input type="radio" />이메일
                                        </label>
                                    </div>
                                </div>
                                <p>선택하신 방법으로 비밀번호 변경용 인증번호가 전송됩니다.</p>
                            </div>
                            
                            <div className='submitBtn'>
                                <button style={{backgroundColor: '#757575'}}><Link to='/' style={{ textDecoration: "none"}}>취소</Link></button>
                                <button ><Link to='/find/password2' style={{ textDecoration: "none"}}>확인</Link></button>
                            </div>
                            
                        </form>
                    </div>
        </>
    )
}