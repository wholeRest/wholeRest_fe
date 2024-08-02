import '../Find.css';
import { Link } from 'react-router-dom'
import '../LoginPage.css';
import '../SignupPage.css';
import { useState } from 'react';




export function PasswordFind_2(props){


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
    // 제출 로직
    // 여기서 백앤드랑 유효성 검사하고 되면 가입 성공 페이지로 넘어가면 될듯?
};




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
        value={inputValue.email} onChange={handleChange} onBlur={handleBlur}
        ></input>
    </div>
    <p className='warningmessage'>{ warning.email }</p>
</div>

<div className='inputSection'>
    <div className="A" id='confirmCodeSection'>
        <input type="text" placeholder='인증번호' name='confirmCode'
        value={inputValue.confirmCode} onChange={handleChange} onBlur={handleBlur}
        ></input>
        <button id='confirmCodeCheck'>다시받기</button>
    </div>
    <p className='warningmessage'>{warning.id}</p>
</div>


    


</div>
                            
                            
                            <div className='submitBtn'>
                                <button style={{backgroundColor: '#E0E0E0'}}><Link to='/find/password1' style={{ textDecoration: "none"}}>이전</Link></button>
                                <button ><Link to='/find/password3' style={{ textDecoration: "none"}}>다음</Link></button>
                            </div>
                            
                        </form>
                    </div>
            </div>

        </div>
    </div>
        
    )
}

