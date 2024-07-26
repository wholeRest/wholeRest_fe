import { Link } from 'react-router-dom'
import './LoginPage.css'
import usericon from './User_alt_fill.png';
import lockicon from './Lock@3x.png';



export function NomalLoginBox(){
    return(
        <div className='loginPage_nomalLogin'>
                <form>
                  <div className='loginPage_inputBox'>
                    <input type="text" name="id" placeholder='아이디'></input>
                    <input type="password" name="password" placeholder='비밀번호'></input>
                    <img id='usericon' scr={usericon} />
                    <img id='lockicon' scr={lockicon} />
                  </div>
                  <div className='loginPage_find'>
                    <button><Link to='/Idfind'>아이디찾기</Link></button>
                    <button><Link to='/Passwdfind'>비밀번호찾기</Link></button>
                  </div>
                  <button type="submit" id='loginButton'><Link to='home'>로그인</Link></button>
                </form>
            </div>
    )

}