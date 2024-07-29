import './LoginPage.css'
import './SignupPage.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function SignUpPage(){
    const [warning, setWarning] = useState({
        id: "",
        password:"",
        passwordConfirm:"",
        name:"",
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


      /*
      // 들어온 값
      const id = document.getElementById('id');
      const password = document.getElementById('password');
      const passwordConfirm = document.getElementById('passwordConfirm');
      const name = document.getElementById('name');
      const nickname = document.getElementById('nickname');
      const emailId = document.getElementById('emailId');
      const emailAddress = document.getElementById('emailAddress');
      const phoneNumber_1 = document.getElementById('phoneNumber_1');
      const phoneNumber_2 = document.getElementById('phoneNumber_2');
      const phoneNumber_3 = document.getElementById('phoneNumber_3');

      // 값이 들어왔는 지
      if(id.value == ""){
        setWarning.id("아이디를 입력하세요.");
      }
      else{
        setWarning.id("");
      }

      if(password.value == ""){
        setWarning.password("비밀번호를 입력하세요.");
      }
      else{
        setWarning.password("");
      }

      if(passwordConfirm.value == ""){
        setWarning.passwordConfirm("비밀번호를 다시 입력하세요.");
      }
      else{
        setWarning.passwordConfirm("");
      }

      if(name.value == ""){
        setWarning.name("이름을 입력하세요.");
      }
      else{
        setWarning.name("");
      }

      if(nickname.value == ""){
        setWarning.nickname("닉네임을 입력하세요.");
      }
      else{
        setWarning.nickname("");
      }

      if(emailId.value == ""){
        setWarning.email("이메일을 입력하세요.");
      }
      else{
        setWarning.email("");
      }

      if(phoneNumber_1.value == "" || phoneNumber_2.value == "" || phoneNumber_3 == ""){
        setWarning.phoneNumber("휴대폰 번호를 입력하세요.");
      }
      else{
        setWarning.phoneNumber("");
      }

      const submitRequirements = // 아래 조건을 모두 충족할 시 제출 버튼 활성화.
    inputValue.id && // 아이디가 입력되었는가?
    inputValue.validId && // 아이디가 정규식에 부합하는가?
    inputValue.nonIdDuplication && // 아이디가 중복되지 않았는가?

    inputValue.password && // 비밀번호가 입력되었는가?
    inputValue.validPassword && // 비밀번호가 정규식에 부합하는가?

    inputValue.passwordConfirm && // 비밀번호가 입력되었는가?
    inputValue.correctpasswordConfirm && // 비밀번호 확인이 비밀번호화 일치하는가?

    inputValue.name && // 이름이 입력되었는가?

    inputValue.nickname && // 닉네임이 입력되었는는가?
    inputValue.nonNicknameDuplication && // 닉네입이 중복되지 않았는가?

    inputValue.emailId && // 이메일 아이디를 입력하였는가?
    inputValue.emailAddress && // 이메일 도메인 주소를  선택하였는가?
    inputValue.validEmail && // 이메일이 인증되었는가? (추후 리팩토링 예정)

    inputValue.phoneNumber_1 && // 이메일 아이디를 입력하였는가?
    inputValue.phoneNumber_2 && // 이메일 도메인 주소를  선택하였는가?
    inputValue.phoneNumber_3 && // 이메일이 인증되었는가? (추후 리팩토링 예정)
    
    inputValue.agree; // 정보제공에 동의 하였는가



    

    // 정규식 모음 객체
  const inputRegexs = {
    // 아이디 : 문자로 시작하여, 영문자, 숫자, 하이픈(-), 언더바(_)를 사용하여 3~20자 이내
    idRegex: /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/,
    // 비밀번호 : 최소 8자 이상, 최소한 하나의 대문자, 하나의 소문자, 하나의 숫자, 하나의 특수문자를 포함, 공백 허용하지 않음
    pwRegex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/,
    // 닉네임 : 영어 대/소문자, 숫자, 한글 자모음 조합, 2~10자 이내
    nicknameRegex: /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/,
  };

  // 조건
  if(!idRegex.test(id.value)){
    setWarning.id("문자로 시작하여, 영문자, 숫자, 하이픈(-), 언더바(_)를 사용하여 3~20자 이내");
  }

  if(!pwRegex.test(password.value)){
    setWarning.password("최소 8자 이상, 최소한 하나의 대문자, 하나의 소문자, 하나의 숫자, 하나의 특수문자를 포함, 공백 허용하지 않음");
  }

  if(!nicknameRegex.test(nickname.value)){
    setWarning.nickname("영어 대/소문자, 숫자, 한글 자모음 조합, 2~10자 이내");
  }

  if(password.value === passwordConfirm.value){
    setWarning.passwordConfirm("비밀번호가 일치하지 않습니다.");
  }



  
  // 조건에 부합하지 않는 경우 빨간글씨 경고 문구
  const [alertMessage, setAlertMessage] = useState({
    id: "",
    pw: "",
    pwCheck: "",
    nickname: "",
    email: "",
    agree: "",
  });

  // 조건에 부합할 경우 초록글씨 경고 문구
  const [passMessage, setPassMessage] = useState({
    id: "",
    pw: "",
    pwCheck: "",
    nickname: "",
    email: "",
    agree: "",
  });
    
  */

  const inputRegexs = {
    idRegex: /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/,
    pwRegex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/,
    nicknameRegex: /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/,
    phoneNumberRegex: /0-9{1,4}/,
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
                warningMessage = `이름을 입력하세요.`;
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
        <div className="screen_main">
            <div className="SignUpPage">
                
                <div className="SignupHeader">
                    <p>■ 회원가입</p>
                    <button id='backBtn_toHome'><Link to='/' style={{ textDecoration: "none"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none"><path stroke="#40300E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m22.5 7.5-15 15M7.5 7.5l15 15"/></svg>
                    </Link></button>
                </div>
                <div className='backgroundbox'>
                    
                    
                   <div className='userInfo'>
                        <form>
                            <div className='inputDiv'>

                            <div className='inputSection'>
                                <div className="A" id='idSection'>
                                    <input type="text" placeholder='아이디' name='id'
                                    value={inputValue.id} onChange={handleChange} onBlur={handleBlur}
                                    ></input>
                                    <button id='idCheck'>중복확인</button>
                                </div>
                                <p className='warningmessage'>{warning.id}</p>
                            </div>

                            <div className='inputSection'>
                                <div className='A'>
                                    <input type="text" placeholder='비밀번호' name='password'
                                    value={inputValue.password} onChange={handleChange} onBlur={handleBlur}
                                    ></input>
                                </div>
                                <p className='warningmessage'>{ warning.password }</p>
                            </div>
                            <div className='inputSection'>
                                <div className='A'>
                                    <input type="text" placeholder='비밀번호 재확인' name='passwordConfirm'
                                    value={inputValue.passwordConfirm} onChange={handleChange} onBlur={handleBlur}
                                    ></input>
                                </div>
                                <p className='warningmessage'>{ warning.passwordConfirm }</p>
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
                                    <input type="text" placeholder='닉네임' name='nickname'
                                    value={inputValue.nickname} onChange={handleChange} onBlur={handleBlur}
                                    ></input>
                                </div>
                                <p className='warningmessage'>{ warning.nickname }</p>
                            </div>
                            
                            <div className='inputSection'>
                                <div className='A'>
                                    <input type="text" placeholder='이메일' name='emailId'
                                    value={inputValue.emailId} onChange={handleChange} onBlur={handleBlur}
                                    ></input>
                                    @ 
                                    <select style={{marginLeft:"3px"}} name='emailAddress'
                                    value={inputValue.emailAddress} onChange={handleChange} onBlur={handleBlur}
                                    >
                                        <option value="gmail.com">gmail.com</option>
                                        <option value="naver.com">naver.com</option>
                                        <option value="daum.net">daum.net</option>
                                        <option value="hanmail.net">hanmail.net</option>
                                        <option value="hotmail.com">hotmail.com</option>
                                        <option value="yahoo.com">yahoo.com</option>
                                        <option value="nate.com">nate.com</option>
                                        <option value="kakao.com">kakao.com</option>
                                    </select>
                                </div>
                                <p className='warningmessage'>{ warning.emailId }</p>
                            </div>

                            <div className='inputSection'>
                                <div className='A'>
                                    <select name='phoneNumber_1'
                                    value={inputValue.phoneNumber_1} onChange={handleChange} onBlur={handleBlur}
                                    >
                                        <option value="010">010</option>
                                        <option value="011">011</option>
                                    </select>
                                    -
                                    <input type="text" placeholder='휴대폰 번호' name='phoneNumber_2' maxLength='4' 
                                    value={inputValue.phoneNumber_2} onChange={handleChange} onBlur={handleBlur}
                                    ></input>
                                    -
                                    <input type="text" placeholder='휴대폰 번호' name='phoneNumber_3' maxLength='4' 
                                    value={inputValue.phoneNumber_3} onChange={handleChange} onBlur={handleBlur}
                                    ></input>
                                </div>
                                <div className='phoneWarningDiv'>
                                    <p className='warningmessage' id='wp2'>{ warning.phoneNumber_2}</p>
                                    <p className='warningmessage' id='wp3'>{ warning.phoneNumber_3}</p>
                                </div>
                                
                            </div>


                            </div>
                            
                            <button id="signupBtn">회원가입</button>
                        </form>
                   </div>
                </div>


            </div>
        </div>
       
    )
}
