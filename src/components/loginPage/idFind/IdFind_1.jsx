import '../Find.css';
import { Link } from 'react-router-dom'
import { useState } from 'react';

import { IdFind_2_true } from './IdFind_2_true';
import { IdFind_2_false } from './IdFind_2_false';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';



export function IdFind_1(props){
    const [sameId, setSameId] = useState(""); 
    const [name, setName] = useState("");
    const [birth, setBirth] = useState("");

    const navigate = useNavigate();

    {/* 
        확인버튼 누르면 데이터 보내주고 같은 정보가 있는지 받음. 
        없으면 false, 있으면 id를 받음.
        그래서 false라면 없음 페이지로, 있으면 있음 페이지로 id값을 넘겨주며 이동.
    */}


    const onNameHandler = (e) => {
        setName(e.target.value);
        console.log(name);
    }


    const onBirthHandler = (e) => {
        setBirth(e.target.value);
    }



    const CheckingId = (e) => {
        e.preventDefault();
    
        axios.post("https://api.wholerest.site/api/auth/findId", {
            name: name,
            dateOfBirth: birth
        })
        .then(function (response){
            console.log(response);
            console.log("아이디 찾기 성공!");
            navigate("/find/id_true" , { state: { id: response.data.msg } });
        }
        )
        .catch((error) => {
            navigate("/find/id_false");
        });


    }



    return(

        
        <div className='PasswordFind'>
                    
        
                    <div className='Find_num_i' >
                        <div id="FindNumDiv" className='nowNum1' style={{backgroundColor: '#40300E'}}>1</div>
                        <div id="FindNumDiv" className='nowNum2'>2</div>
                    </div>

                    <div className='Find_inputDiv_i'>
                        <form className='findform'>
                            <div className='inputs'>
                                <input type="text" onChange={onNameHandler} placeholder='성명'></input>
                                <input type="text" onChange={onBirthHandler} placeholder='생년월일'></input>
                            </div>
                            
                            
                            
                            <div className='submitBtn'>
                                <button style={{backgroundColor: '#E0E0E0'}}><Link to='/' style={{ textDecoration: "none"}}>취소</Link></button>
                                <button onClick={CheckingId}>확인</button>
                            </div>
                            
                        </form>
                    </div>
                </div>

                
    )
}
