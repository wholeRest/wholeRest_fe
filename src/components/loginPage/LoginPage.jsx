import { Link } from 'react-router-dom'
import { useState } from 'react'
import './LoginPage.css'
import { NomalLoginBox } from './NomalLoginBox'
import { SocialLoginBox } from './SocialLoginBox'

export function LoginPage(){
  const [how, setHow] = useState(true);

  const nomalLogin = () => {
    setHow(true);
  }

  const socialLodin = () => {
    setHow(false);
  }

    return(
      <div className="screen_main">
        <div className='loginPage'>
          <div className='loginlogo'>
            <div id='logoIcon'></div>
            <div id='logoText'></div>
          </div>
          <div className='loginPage_loginBox'>
            <div className='loginPage_option'>
              <button onClick={nomalLogin} style={how ? {borderBottom: "solid 2px rgb(84, 51, 31)"} : {borderBottom: "none"}}>일반 회원 로그인</button>
              <button onClick={socialLodin} style={how ? {borderBottom: "none"} : {borderBottom: "solid 2px rgb(84, 51, 31)"}}>소셜 로그인</button>
            </div>
            {how ? <NomalLoginBox /> : <SocialLoginBox/>}
            
          </div>
          <div className='loginPage_plus'>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none"><circle cx="7" cy="7" r="5.25" fill="#7E869E" fillOpacity=".25"/><path fill="#222" d="M7.583 4.083a.583.583 0 1 1-1.166 0 .583.583 0 0 1 1.166 0Z"/><path stroke="#222" d="M7 9.625V6.708c0-.644-.522-1.166-1.167-1.166M7 9.625h.875m-.875 0h-.875"/></svg>
                도움말 바로가기 &raquo;
                </button>
              <button><Link to='/signup' style={{ textDecoration: "none"}}>회원가입 &raquo;</Link></button>
            </div>
        </div>
      </div>
        
    )
}