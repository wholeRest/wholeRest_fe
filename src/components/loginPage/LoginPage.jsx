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
        <div className='loginPage'>
          <div className='loginPage_logo'>
            <p>온쉼표</p>
          </div>
          <div className='loginPage_loginBox'>
            <div className='loginPage_option'>
              <button onClick={nomalLogin} style={how ? {borderBottom: "solid 2px rgb(84, 51, 31)"} : {borderBottom: "none"}}>일반 회원 로그인</button>
              <button onClick={socialLodin} style={how ? {borderBottom: "none"} : {borderBottom: "solid 2px rgb(84, 51, 31)"}}>소셜 로그인</button>
            </div>
            {how ? <NomalLoginBox /> : <SocialLoginBox/>}
            
          </div>
          <div className='loginPage_plus'>
              <button>도움말 바로가기 &raquo;</button>
              <button><Link to='/signup'>회원가입 &raquo;</Link></button>
            </div>
        </div>
    )
}