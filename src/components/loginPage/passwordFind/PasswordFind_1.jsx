import '../Find.css';
import { Link } from 'react-router-dom';
import '../LoginPage.css'
import '../SignupPage.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export function PasswordFind_1(props){

const [id, setid] = useState("");
const [ name, setName] = useState("");
const [birth, setBirth] = useState("");

const navigate = useNavigate();


const handleSubmit = (e) => {
    e.preventDefault();
   
    axios.post("https://wholerest.site/api/auth/beforeChangePw", {
        userId: id,
        name: name,
        dateOfBirth: birth
    })
    .then(function (response){
        console.log(response);
        console.log("사용자 확인 성공!");
        
        let token = response.data.token;
        sessionStorage.setItem("access", token); // 키, 토큰

        navigate("/find/password2");
    }
    )
    .catch((error) => {
        alert("입력하신 정보의 사용자를 찾을 수 없습니다.");
    });

};

const onIdHandler = (e) => {
    setid(e.target.value);
}
const onNameHandler = (e) => {
    setName(e.target.value);
}
const onBirthHandler = (e) => {
    setBirth(e.target.value);
}




    return(
        <>
                    
                    <div className='Find_num' >
                        <div id="FindNumDiv" className='nowNum1' style={{backgroundColor: '#40300E'}}>1</div>
                        <div id="FindNumDiv" className='nowNum2'>2</div>
                        <div id="FindNumDiv" className='nowNum3'>3</div>
                        <div id="FindNumDiv" className='nowNum4'>4</div>
                    </div>

                    <div className='Find_inputDiv'>
                        <form  className='findform'>
                        <div className='inputDiv_s'>
                            <div className='inputSection'>
                                <div className="A" id='idSection'>
                                    <input type="text" placeholder='아이디'onChange={onIdHandler} 
                                    ></input>
                                </div>
                            </div>

                            <div className='inputSection'>
                                <div className='A'>
                                    <input type="text" placeholder='성명' onChange={onNameHandler}
                                    ></input>
                                </div>
                            </div>
                                
                            <div className='inputSection'>
                                <div className='A'>
                                    <input type="text" placeholder='생년월일 (YYMMDD)' onChange={onBirthHandler}
                                    ></input>
                                </div>
                            </div>
                                

                            </div>
                            
                            
                            <div className='submitBtn'>
                                <button style={{backgroundColor: '#E0E0E0'}}><Link to='/' style={{ textDecoration: "none"}}>취소</Link></button>
                                <button onClick={handleSubmit}>확인</button>
                            </div>
                            
                        </form>
                    </div>
        </>
    )
}