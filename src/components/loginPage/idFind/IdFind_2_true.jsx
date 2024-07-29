import '../Find.css';
import { Link } from 'react-router-dom';


export function IdFind_2_true(props){
    {/* 일치하는 아이디를 받아와야함. */}



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
                    
                    <button>아이디 찾기</button>
                    <button><Link to='/find/password1' style={{ textDecoration: "none"}}>비밀번호 변경</Link></button>
                </div>

            </div>

            <div className='IdFind'>
                <div className='lines_i'>
                    <div id='lineId'></div>
                </div>

                <div className='PasswordFind'>
        
        <div className='Find_num' >
            <div id="FindNumDiv" className='nowNum1'>1</div>
            <div id="FindNumDiv" className='nowNum2' style={{backgroundColor: '#40300E'}}>2</div>
        </div>
        
        <div className='Find_i_resultDiv'>
        <div className='Find_i_result'>
            <p>아이디 찾기 결과는 아래와 같습니다.</p>
            <p>아이디 : {props.sameId}</p>
        </div>

        <div className='submitBtn'>
        <button style={{backgroundColor: '#757575'}}><Link to='/' style={{ textDecoration: "none"}}>닫기</Link></button>
        </div>
        </div>
        
        
    </div>
            </div>

        </div>
    </div>

    
    )
}

