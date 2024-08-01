import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'
import usericon from './User_alt_fill.png';
import lockicon from './Lock@3x.png';
import axios from 'axios';
import { useState } from 'react';
// import { useDispatch } from 'react-redux';



export function NomalLoginBox(props){
  const [data, setData] = useState(null);
  const {navigate, ID, password, isUser, setID, setPassword, setIsUser} = props;


  
  

  {/* 있는 정보면 setIsUser를 true로 */}

  const login = (e) => {
    e.preventDefault();
    console.log("함수 실행!");
    
  axios.post('https://wholerest.site/api/auth/login', {
    userId: "test",
    password: "1234",
  })
  .then(function (response) {
    setData(response.data);
    console.log(response.data);

    //let token = response.data.accessToken;
    //sessionStorage.setItem("access", token); // 키, 토큰 

    //가져오기
    /// let sessionData = sessionStorage.getItem("access"); /// 

    console.log("로그인 성공");

  })
  .catch(function (error) {
    console.log(error);
    console.log("로그인 실패");
  });
  }


    // const dispatch = useDispatch();


    const onIdHandler = (event) => {
      setEmail(event.currentTarget.value);
  }
  const onPasswordHandler = (event) => {
      setPassword(event.currentTarget.value);
  }

  /*
  
    const onSubmitHandler = (e) => {
      e.preventDefault();
      
      console.log("입력한 아이디: " + ID);
      console.log("입력한 비번 : " + password);

      let body = {
        "userId": ID,
        "password" : password
      }

      dispatch(loginUser(body));
    } 
*/





    return(
        <div className='loginPage_nomalLogin'>
                {/* <form onSubmit={onSubmitHandler}> */}
                <form>
                  <div className='loginPage_inputBox'>
                    <input type="text" name="id" placeholder='아이디' onChange={onIdHandler}></input>
                    <input type="password" name="password" placeholder='비밀번호' onChange={onPasswordHandler}></input>
                    <img id='usericon' scr={usericon} />
                    <img id='lockicon' scr={lockicon} />
                  </div>
                  <div className='loginPage_find'>
                    <button><Link to='/find/id' style={{ textDecoration: "none"}}>아이디찾기</Link></button>
                    <button><Link to='/find/password1' style={{ textDecoration: "none"}}>비밀번호찾기</Link></button>
                  </div>
                  <button type="submit" id='loginButton1' onClick={login} >로그인!!!!!</button>
                  <button type="submit" id='loginButton' ><Link to='/home'>로그인</Link></button>
                </form>
                
            </div>
    )

}