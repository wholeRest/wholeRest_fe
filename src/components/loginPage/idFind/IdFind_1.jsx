import '../Find.css';
import { Link } from 'react-router-dom'
import { useState } from 'react';

import { IdFind_2_true } from './IdFind_2_true';
import { IdFind_2_false } from './IdFind_2_false';



export function IdFind_1(props){
    const [sameId, setSameId] = useState(""); 

    {/* 
        확인버튼 누르면 데이터 보내주고 같은 정보가 있는지 받음. 
        없으면 false, 있으면 id를 받음.
        그래서 false라면 없음 페이지로, 있으면 있음 페이지로 id값을 넘겨주며 이동.
    */}

    const CheckingId = () => {
        setSameId("ABCD1234");


        return(
            sameId ? <IdFind_2_true sameId={sameId} /> : <IdFind_2_false />
        )
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
                                <input type="text" placeholder='성명'></input>
                                <input type="text" placeholder='생년월일'></input>
                            </div>
                            
                            
                            
                            <div className='submitBtn'>
                                <button style={{backgroundColor: '#E0E0E0'}}><Link to='/' style={{ textDecoration: "none"}}>취소</Link></button>
                                <button ><Link to='/find/id_false' style={{ textDecoration: "none"}}>확인</Link></button>
                            </div>
                            
                        </form>
                    </div>
                </div>

                
    )
}
