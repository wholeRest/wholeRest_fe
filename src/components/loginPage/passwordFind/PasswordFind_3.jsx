import '../Find.css';
import { Link } from 'react-router-dom'
import '../LoginPage.css'
import '../SignupPage.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export function PasswordFind_3(props){

    const navigate = useNavigate();

    
    const [warning, setWarning] = useState({
        id: "",
        password:"",
        passwordConfirm:"",
        name:"",
        birth:"",
        nickname:"",
        email:"",
        emailId:"",
        emailAddress: "",
        confirmCode:"",
        phoneNumber_2:"",
        phoneNumber_3:"",
    });

    const [inputValue, setInputValue] = useState({
        id: "", // 입력된 아이디 데이터
        validId: false, // 아이디 정규식 충족 여부
        nonIdDuplication: false, // 아이디 중복확인 여부

        password: "", // 입력된 패스워드 데이터
        validPassword: false, // 패스워드 정규식 충족 여부

        passwordConfirm: "", // 입력된 패스워드 확인 데이터
        correctpasswordConfirm: false, // 패드워드 데이터와 일치하는지 여부

        name: "", // 입력된 사용자 이름 데이터

        birth: "", 

        nickname: "", // 입력된 닉네임 데이터
        validNickname: false, // 닉네임 정규식 충족 여부
        nonNicknameDuplication: false, // 닉네입 중복확인 여부

        email:"",
        emailId: "", // 입력된 이메일 아이디 데이터
        emailAddress: "", // 선댁된 이메일 도메인 데이터
        validEmail: true, // 이메일 인증 여부 (미구현이라 true가 초기값, 추후 리팩토링 예정)
        confirmCode:"", //이메일 인증번호

        phoneNumber_1: "", // 휴대폰 번호
        phoneNumber_2: "", // 휴대폰 번호
        phoneNumber_3: "", // 휴대폰 번호

        agree: false, // 정보 제공 동의 여부
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
            case 'id':
                warningMessage = `아이디를 입력하세요.`;
                break;
            case 'password':
                warningMessage = `비밀번호를 입력하세요.`;
                break;
            case 'passwordConfirm':
                warningMessage = `비밀번호를 다시 입력하세요.`;
                break;
            case 'name':
                warningMessage = `성명을 입력하세요.`;
                break;
            case 'birth':
                warningMessage = `생년월일을 입력하세요.`;
                break;
            case 'nickname':
                warningMessage = `닉네임을 입력하세요.`;
                break;
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
            case 'id':
                if (!inputRegexs.idRegex.test(value)) {
                    warningMessage = "문자로 시작하여, 영문자, 숫자, 하이픈(-), 언더바(_)를 사용하여 3~20자 이내";
                }
                break;
            case 'password':
                if (!inputRegexs.pwRegex.test(value)) {
                    warningMessage = "최소 8자 이상, 최소한 하나의 대문자, 하나의 소문자, 하나의 숫자, 하나의 특수문자를 포함, 공백 허용하지 않음";
                }
                break;
            case 'passwordConfirm':
                if (value !== inputValue.password) {
                    warningMessage = "비밀번호가 일치하지 않습니다.";
                }
                break;
            case 'birth':
                if (!inputRegexs.birthRegex.test(value)) {
                    warningMessage = "숫자로 YYMMDD 형식에 맞게.";
                }
                break;
            case 'nickname':
                if (!inputRegexs.nicknameRegex.test(value)) {
                    warningMessage = "영어 대/소문자, 숫자, 한글 자모음 조합, 2~10자 이내";
                }
                break;
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


    let token = sessionStorage.getItem("access");

    axios.post("https://api.wholerest.site/api/auth/pwReset", {
        newPw: inputValue.password,
        newPwConfirm: inputValue.passwordConfirm,
        resetToken: token
    })
    .then(function (response){
        // 토큰 지우기
        sessionStorage.removeItem("access");
        
        console.log("비번 변경 성공!");
        navigate('/find/password4');
    }
    )
    .catch((error) => {
        
       
        alert("비번 변경 실패" + error);
    });
};



// 입력받는 함수
const onPasswordHandler = (event) => {
    const { value } = event.currentTarget;
    handleChange(event);
    setInputValue(prevState => ({ ...prevState, password: value })); // 수정
    console.log(inputValue);
}
const onPasswordConfirmHandler = (event) => {
    const { value } = event.currentTarget;
    handleChange(event);
    setInputValue(prevState => ({ ...prevState, passwordConfirm: value })); // 수정
    console.log(inputValue);
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
                        <div id="FindNumDiv" className='nowNum2'>2</div>
                        <div id="FindNumDiv" className='nowNum3' style={{backgroundColor: '#40300E'}}>3</div>
                        <div id="FindNumDiv" className='nowNum4'>4</div>
                    </div>

                    <div className='Find_inputDiv'>
                        <form  className='findform'>
                            <div className='inputDiv_s'>

                            <div className='inputSection'>
                                <div className='A'>
                                    <input type="text" placeholder='비밀번호' name='password'
                                    value={inputValue.password} onChange={onPasswordHandler} onBlur={handleBlur}
                                    ></input>
                                </div>
                                <p className='warningmessage'>{ warning.password }</p>
                            </div>
                            
                            <div className='inputSection'>
                                <div className="A">
                                    <input type="text" placeholder='비밀번호 확인' name='passwordConfirm'
                                    value={inputValue.passwordConfirm} onChange={onPasswordConfirmHandler} onBlur={handleBlur}
                                    ></input>
                                </div>
                                <p className='warningmessage'>{warning.passwordConfirm}</p>
                            </div>

                            
                                
                            

                            </div>
                            
                            
                            <div className='submitBtn'>
                                <button style={{backgroundColor: '#E0E0E0'}}><Link to='/find/password2' style={{ textDecoration: "none"}}>이전</Link></button>
                                <button onClick={handleSubmit}>다음</button>
                            </div>
                            
                        </form>
                    </div>
            </div>

        </div>
    </div>
    )
}
