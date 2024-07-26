import { Link } from 'react-router-dom'
import './LoginPage.css'

export function NomalLoginBox(){
    return(
        <div className='loginPage_nomalLogin'>
                <form>
                  <div className='loginPage_inputBox'>
                    <input type="text" name="id" placeholder='아이디'></input>
                    <input type="password" name="password" placeholder='비밀번호'></input>
                  </div>
                  <div className='loginPage_find'>
                    <button><Link to='/find/id' style={{ textDecoration: "none"}}>아이디찾기</Link></button>
                    <button><Link to='/find/password1' style={{ textDecoration: "none"}}>비밀번호찾기</Link></button>
                  </div>
                  <button type="submit" id='loginButton'><Link to='home' style={{ textDecoration: "none"}}>로그인</Link></button>
                </form>
                
            </div>
    )

}