import '../Find.css';
import { Link } from 'react-router-dom';
import '../LoginPage.css'
import '../SignupPage.css'
import { useState } from 'react';



export function PasswordFind_1(props){


    
    const [warning, setWarning] = useState({
        id: "",
        password:"",
        passwordConfirm:"",
        name:"",
        birth:"",
        nickname:"",
        emailId:"",
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

        emailId: "", // 입력된 이메일 아이디 데이터
        emailAddress: "", // 선댁된 이메일 도메인 데이터
        validEmail: true, // 이메일 인증 여부 (미구현이라 true가 초기값, 추후 리팩토링 예정)

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
            case 'emailId':
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
    // 제출 로직
    // 여기서 백앤드랑 유효성 검사하고 되면 가입 성공 페이지로 넘어가면 될듯?
};





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
                                    <input type="text" placeholder='아이디' name='id'
                                    value={inputValue.id} onChange={handleChange} onBlur={handleBlur}
                                    ></input>
                                </div>
                                <p className='warningmessage'>{warning.id}</p>
                            </div>

                            <div className='inputSection'>
                                <div className='A'>
                                    <input type="text" placeholder='성명' name='name'
                                    value={inputValue.name} onChange={handleChange} onBlur={handleBlur}
                                    ></input>
                                </div>
                                <p className='warningmessage'>{ warning.name }</p>
                            </div>
                                
                            <div className='inputSection'>
                                <div className='A'>
                                    <input type="text" placeholder='생년월일 (YYMMDD)' name='birth'
                                    value={inputValue.birth} onChange={handleChange} onBlur={handleBlur}
                                    ></input>
                                </div>
                                <p className='warningmessage'>{ warning.birth }</p>
                            </div>
                                

                            </div>
                            
                            <div className='send_option'>
                                <div className='howsend'>
                                    <p>인증번호 전송방법</p>
                                    <div className='send_radio'>
                                        <label>
                                            <input type="radio" />휴대폰
                                        </label>
                                        <label>
                                            <input type="radio" />이메일
                                        </label>
                                    </div>
                                </div>
                                <p>선택하신 방법으로 비밀번호 변경용 인증번호가 전송됩니다.</p>
                            </div>
                            
                            <div className='submitBtn'>
                                <button style={{backgroundColor: '#E0E0E0'}}><Link to='/' style={{ textDecoration: "none"}}>취소</Link></button>
                                <button ><Link to='/find/password2' style={{ textDecoration: "none"}}>확인</Link></button>
                            </div>
                            
                        </form>
                    </div>
        </>
    )
}