import '../Find.css';
import { Link } from 'react-router-dom';


export function IdFind_2_false(){


    return(

        <div className="screen_main">
        <div className="PasswordFindPage">
            <div className="FindHeader">
                <p>■ 계정정보 확인 및 변경</p>
                <button id='backBtn_toHome'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none"><path stroke="#40300E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m22.5 7.5-15 15M7.5 7.5l15 15"/></svg>
                </button>
            </div>
            <div className='Find_Maincontents'>
                <div className='Find_option'>
                    
                    <button>아이디 찾기</button>
                    <button><Link to='PasswordFindPage' style={{ textDecoration: "none"}}>비밀번호 변경</Link></button>
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

        <div>
            입력된 정보의 아이디를 찾지 못했습니다. 
        </div>
        
        <div className='submitBtn'>
        <button style={{backgroundColor: '#757575'}}><Link to='/find/id' style={{ textDecoration: "none"}}>취소</Link></button>
        </div>

    </div>
            </div>

        </div>
    </div>
    
    )
}

