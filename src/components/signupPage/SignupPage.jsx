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

// 12345aaQQ!

export function SignupPage(){
    const [signUp_N, setSignUp_N] = useState(1);
    const navigate = useNavigate();

    const [isNextEnabled, setIsNextEnabled] = useState({
        first: false, second: false, third: false
    });
    
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
        validEmail: false, // 이메일 인증 여부 (미구현이라 true가 초기값, 추후 리팩토링 예정)

        phoneNumber: "01022345678",
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
    birthRegex: /^\d{6}$/ ,
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



    // 아이디 중복확인
    const handleDuplicationCheck = (id) => {
        axios.post("https://api.wholerest.site/api/auth/duplicationCheck", {
            userId: id
        })
        .then(function (response){
            console.log("중복 안됨 성공!");
            setWarning((prev) => ({ ...prev, id: "" })); // 경고 메시지 지우기
            alert("사용 가능한 아이디입니다.");
            setInputValue((prev) => ({ ...prev, nonIdDuplication: true })); // 중복 확인 성공
        })
        .catch((error) => {
            console.log("중복됨.....");
            setWarning((prev) => ({ ...prev, id: "이미 존재하는 아이디입니다." })); // 경고 메시지 설정
            setInputValue((prev) => ({ ...prev, nonIdDuplication: false })); // 중복 확인 실패
        });
    };

    // 이메일로 인증번호 보냄.
    const handleverificationSend = (email) => {
        axios.post("https://api.wholerest.site/api/verification/send", {
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
        axios.post("https://api.wholerest.site/api/verification/check", {
            email: email,
            code: confirmCode
        })
        .then(function (response){
            console.log("인증코드 일치!");
            setSignUp_N(3);
            setWarning((prev) => ({ ...prev, email: "이메일 인증에 성공하였습니다." })); // 경고 메시지 지우기
            setInputValue((prev) => ({ ...prev, validEmail: true })); // 이메일 인증 성공
        })
        .catch((error) => {
            console.log("인증번호 불일치");
            setWarning((prev) => ({ ...prev, email: "인증 코드가 일치하지 않습니다." })); // 경고 메시지 설정
            setInputValue((prev) => ({ ...prev, validEmail: false })); // 이메일 인증 실패
        });
    };



const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post("https://api.wholerest.site/api/auth/signUp", {
        userId: inputValue.id,
        name: inputValue.name, 
        password: inputValue.password,
        nickName: inputValue.nickname,
        email: inputValue.email,
        phoneNumber: inputValue.phoneNumber,
        dateOfBirth: inputValue.birth
    })
    .then(function (response){
        
        console.log("회원가입 성공!");
        setSignUp_N(4);
    }
    )
    .catch((error) => {
        /*
        console.log("회원가입 실패...");

        console.log("Input Values:");
        console.log("ID:", inputValue.id +" (" + typeof inputValue.id);
        console.log("Name:", inputValue.name +" (" + typeof inputValue.name);
        console.log("Password:", inputValue.password +" (" + typeof inputValue.password);
        console.log("NickName:", inputValue.nickname +" (" + typeof inputValue.nickname);
        console.log("Email:", inputValue.email +" (" + typeof inputValue.email);
        console.log("Date of Birth:", inputValue.birth +" (" + typeof inputValue.birth);
        console.log("Phone Number:", inputValue.phoneNumber +" (" + typeof inputValue.phoneNumber);
        console.log("=================");
        */
       
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
                isNextEnabled={isNextEnabled} setIsNextEnabled={setIsNextEnabled}
                handleDuplicationCheck={handleDuplicationCheck}
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
                isNextEnabled={isNextEnabled} setIsNextEnabled={setIsNextEnabled}
                handleverificationSend={handleverificationSend} handleverificationCheck={handleverificationCheck}
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
                isNextEnabled={isNextEnabled} setIsNextEnabled={setIsNextEnabled}

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
                isNextEnabled={isNextEnabled} setIsNextEnabled={setIsNextEnabled}

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
