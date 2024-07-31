import { Link } from 'react-router-dom'
import './LoginPage.css'
import usericon from './User_alt_fill.png';
import lockicon from './Lock@3x.png';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';



export function NomalLoginBox(props){
  const [data, setData] = useState(null);
  const {ID, password, isUser, setID, setPassword, setIsUser} = props;

  axios.post('/api/auth/login', {
    userId: ID,
    password: password,
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  

  {/* 있는 정보면 setIsUser를 true로 */}

  const login = () => {
    

    if(isUser === true){
      navigate('/home');
    }
    else{
      console.log("로그인 실패");
      navigate('/');
    }
  }


    const dispatch = useDispatch();


    const onIdHandler = (event) => {
      setEmail(event.currentTarget.value);
  }
  const onPasswordHandler = (event) => {
      setPassword(event.currentTarget.value);
  }
  
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






    return(
        <div className='loginPage_nomalLogin'>
                <form onSubmit={onSubmitHandler}>
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
                  <button type="submit" id='loginButton' >로그인</button>
                </form>
                
            </div>
    )

}