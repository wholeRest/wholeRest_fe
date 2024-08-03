import '../Find.css';
import { Link } from 'react-router-dom'
import '../LoginPage.css';
import '../SignupPage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';




export function PasswordFind_2(props){

    const navigate = useNavigate();

    const [warning, setWarning] = useState({
        email:"",
        emailId:"",
        emailAddress: "",
        confirmCode:"",
    });

    const [inputValue, setInputValue] = useState({
        email:"",
        emailId: "", // 입력된 이메일 아이디 데이터
        emailAddress: "", // 선댁된 이메일 도메인 데이터
        validEmail: true, // 이메일 인증 여부 (미구현이라 true가 초기값, 추후 리팩토링 예정)
        confirmCode:"", //이메일 인증번호

      });


      

  const inputRegexs = {
    idRegex: /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/,
    pwRegex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/,
    nicknameRegex: /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/,
    phoneNumberRegex: /0-9{1,4}/,
    birthRegex: /0-9{6}/,
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
        ...inputValue,
        [name]: value,
    });
};

const handleBlur = (e) => {
    const { name, value } = e.target;

    let warningMessage = "";
    
    if (value === "") {
        switch(name) {
            case 'email':
                warningMessage = `이메일을 입력하세요.`;
                break;
            case 'phoneNumber_2' || 'phoneNumber_3':
                warningMessage = `휴대폰 번호를 입력하세요.`;
                break;
            default:
                break;
        }
    } else {
        switch(name) {
            case 'phoneNumber_2' || 'phoneNumber_3':
                if (!inputRegexs.phoneNumberRegex.test(value)) {
                    warningMessage = "숫자만 조합, 1~4자 이내    ";
                }
                break;
            default:
                break;
        }
    }

    setWarning((prev) => ({
        ...prev,
        [name]: warningMessage,
    }));
};

const handleSubmit = (e) => {
    e.preventDefault();
    

};

// 입력받는 함수
const onEmailHandler = (event) => {
    const { value } = event.currentTarget;
    handleChange(event);
    setInputValue(prevState => ({ ...prevState, email: value })); // 수정
    console.log(inputValue);
}
const onConfirmCodeHandler = (event) => {
    const { value } = event.currentTarget;
    handleChange(event);
    setInputValue(prevState => ({ ...prevState, confirmCode: value })); // 수정
    console.log(inputValue);
}



    // 이메일로 인증번호 보냄.
    const handleverificationSend = (email) => {
        axios.post("https://wholerest.site/api/verification/send", {
            email: email
        })
        .then(function (response){
            console.log("인증코드가 전송 성공!");
            setWarning((prev) => ({ ...prev, email: "인증코드가 전송되었습니다." })); // 경고 메시지 지우기
        })
        .catch((error) => {
            console.log("인증번호 에러");
            setWarning((prev) => ({ ...prev, email: "유효한 이메일 주소를 입력해주세요." })); // 경고 메시지 설정
        });
    };

    // 인증번호 일치하나 확인
    const handleverificationCheck = (email, confirmCode) => {
        axios.post("https://wholerest.site/api/verification/check", {
            email: email,
            code: confirmCode
        })
        .then(function (response){
            console.log("인증코드 일치!");

            navigate('/find/password3');

        })
        .catch((error) => {
            console.log("인증번호 불일치");
            setWarning((prev) => ({ ...prev, email: "인증 코드가 일치하지 않습니다." })); // 경고 메시지 설정
            setInputValue((prev) => ({ ...prev, validEmail: false })); // 이메일 인증 실패
        });
    };



// 인증번호 받기
const verificationSend = (e) => {
    e.preventDefault();
    console.log("인증번호 발송됨");
    handleverificationSend(inputValue.email);

}

// 인증번호 일치하는지 검사
const verificationCheck = (e) => {
    e.preventDefault();
    console.log("인증번호 맞는지 확인 시작");
    handleverificationCheck(inputValue.email, inputValue.confirmCode);

}



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
                        <div id="FindNumDiv" className='nowNum1'>1</div>
                        <div id="FindNumDiv" className='nowNum2' style={{backgroundColor: '#40300E'}}>2</div>
                        <div id="FindNumDiv" className='nowNum3'>3</div>
                        <div id="FindNumDiv" className='nowNum4'>4</div>
                    </div>

                    <div className='Find_inputDiv'>
                        <form  className='findform'>
                        <div className='inputDiv_s'>

<div className='inputSection'>
    <div className='A'>
        <input type="text" placeholder='이메일' name='email'
        value={inputValue.email} onChange={onEmailHandler} onBlur={handleBlur}
        ></input>
        <button className='confirmCodeCheck' onClick={verificationSend}>인증 받기</button>
    </div>
    <p className='warningmessage'>{ warning.email }</p>
</div>

<div className='inputSection'>
    <div className="A" id='confirmCodeSection'>
        <input type="text" placeholder='인증번호' name='confirmCode'
        value={inputValue.confirmCode} onChange={onConfirmCodeHandler} onBlur={handleBlur}
        ></input>
        <button className='confirmCodeCheck' onClick={verificationSend}>다시받기</button>
    </div>
    <p className='warningmessage'>{warning.confirmCode}</p>
</div>


    


</div>
                            
                            
                            <div className='submitBtn'>
                                <button style={{backgroundColor: '#E0E0E0'}}><Link to='/find/password1' style={{ textDecoration: "none"}}>이전</Link></button>
                                <button onClick={verificationCheck}>다음</button>
                            </div>
                            
                        </form>
                    </div>
            </div>

        </div>
    </div>
        
    )
}


