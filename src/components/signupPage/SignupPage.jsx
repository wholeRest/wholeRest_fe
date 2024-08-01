import '../loginPage/Find.css';
import { Link } from 'react-router-dom'
import '../loginPage/LoginPage.css'
import '../loginPage/SignupPage.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Signup_1 } from '../loginPage/signup/Signup_1';
import { Signup_2 } from '../loginPage/signup/Signup_2';
import { Signup_3 } from '../loginPage/signup/Signup_3';
import { Signup_4 } from '../loginPage/signup/Signup_4';


import axios from 'axios';



export function SignupPage(){
    const [signUp_N, setSignUp_N] = useState(1);
    const navigate = useNavigate();

    
    const [warning, setWarning] = useState({
        id: "",
        password:"",
        passwordConfirm:"",
        name:"",
        birth:"",
        nickname:"",
        email:"",
        confirmCode:"",
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

        email:"",
        confirmCode:"",
        emailId: "", // 입력된 이메일 아이디 데이터
        emailAddress: "", // 선댁된 이메일 도메인 데이터
        validEmail: true, // 이메일 인증 여부 (미구현이라 true가 초기값, 추후 리팩토링 예정)

        phoneNumber_1: "", // 휴대폰 번호
        phoneNumber_2: "", // 휴대폰 번호
        phoneNumber_3: "", // 휴대폰 번호

        agree: false, // 정보 제공 동의 여부
      });

      {/*

      useEffect(() => {
        console.log("====================================");
        console.log("id:", inputValue.id);
        console.log("password:", inputValue.password);
        console.log("passwordConfirm:", inputValue.passwordConfirm);
        console.log("name:", inputValue.name);
        console.log("birth:", inputValue.birth);
        console.log("nickname:", inputValue.nickname);
        console.log("email:", inputValue.email);
        console.log("email:", inputValue.confirmCode);
        console.log("phoneNumber_2:", inputValue.mini_caution);
        console.log("phoneNumber_3:", inputValue.mini_check);
    }, [inputValue.id, inputValue.password, inputValue.passwordConfirm, inputValue.name, 
        inputValue.birth, inputValue.nickname, inputValue.email, inputValue.confirmCode,
        inputValue.phoneNumber_2, inputValue.phoneNumber_3]);
  

      */}

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
            case 'confirmCode':
                warningMessage = `인증번호를 입력하세요.`;
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
    
    axios.post("https://wholerest.site/api/auth/signUp", {
        userId:inputValue.id,
        name: inputValue.name, 
        password: inputValue.password,
        nickName: inputValue.nickname,
        email: inputValue.email,
        phoneNumber: "01012345678",
        dateOfBirth: inputValue.birth
    })
    .then(function (response){
        
        console.log("회원가입 성공!");
        setSignUp_N(4);
    }
    )
    .catch((error) => {
        console.log(inputValue);
        console.log("회원가입 실패...");
        alert("회원가입 실패" + error);
      });


};

const signUp_Pages = () => {
    switch(signUp_N) {
        case 1:
            return(
                <Signup_1 
                inputValue={inputValue} setInputValue={setInputValue}
                handleChange={handleChange} handleBlur={handleBlur} setWarning={setWarning} 
                inputRegexs={inputRegexs} warning={warning} 
                handleSubmit={handleSubmit}
                    
                signUp_N={signUp_N} setSignUp_N={setSignUp_N}
                />
            )
        break;

        case 2:
            return(
                <Signup_2 
                inputValue={inputValue} setInputValue={setInputValue}
                handleChange={handleChange} handleBlur={handleBlur} setWarning={setWarning} 
                inputRegexs={inputRegexs} warning={warning}  
                handleSubmit={handleSubmit}

                signUp_N={signUp_N} setSignUp_N={setSignUp_N}
            />
            )
            
        break;

        case 3:
            return(
                <Signup_3 
                inputValue={inputValue} setInputValue={setInputValue}
                handleChange={handleChange} handleBlur={handleBlur} setWarning={setWarning} 
                inputRegexs={inputRegexs} warning={warning} 
                handleSubmit={handleSubmit}

                signUp_N={signUp_N} setSignUp_N={setSignUp_N}
            />  
            )
            
        break;

        case 4:
            return(
                <Signup_4 
                inputValue={inputValue} setInputValue={setInputValue}
                handleChange={handleChange} handleBlur={handleBlur} setWarning={setWarning} 
                inputRegexs={inputRegexs} warning={warning} 
                handleSubmit={handleSubmit}

                signUp_N={signUp_N} setSignUp_N={setSignUp_N}
            />
            )
            
        break;
    }

    if (signUp_N) {
      return <button style={{ margin: 10 }}>Logout</button>;
    } else {
      return <button style={{ margin: 10 }}>Login</button>;
    }
  };





    return(
        <>
            {signUp_Pages()}
        </>
    )
}
