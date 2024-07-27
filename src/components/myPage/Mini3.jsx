import './MyPage.css';
import { useState } from "react"
import './Mini3.css'

export function Mini3(props){
    
    const{
        isDrugChecked, isCheckChecked, isCautionChecked,
        setIsDrugChecked, setIsCheckChecked, setIsCautionChecked
    } = props;

    // 모달창 체크 박스 
    const handleDrugCheckboxChange = () => {
        setIsDrugChecked(!isDrugChecked);
        
        setIsCheckChecked(false);
        setIsCautionChecked(false);
      };
      const handleCheckCheckboxChange = () => {
        setIsCheckChecked(!isCheckChecked);
    
        setIsDrugChecked(false);
        setIsCautionChecked(false);
      };
      const handleCautionCheckboxChange = () => {
        setIsCautionChecked(!isCautionChecked);
    
        setIsDrugChecked(false);
        setIsCheckChecked(false);
      };


    return(
        <div className='memoList'>  
                <input type='checkbox' className="checkBoxV" id='drugBtn' checked={isDrugChecked} onChange={handleDrugCheckboxChange} ></input>
                <label htmlFor='drugBtn' className="memo" id='drug'>
                    <div className='mypage_Minititle'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" fill="none"><circle cx="7" cy="8" r="5.25" fill="#fff" stroke="#40300E" strokeWidth=".5"/><path stroke="#40300E" strokeLinecap="round" strokeWidth=".5" d="M10 8H7.25A.25.25 0 0 1 7 7.75V5"/></svg>
                      <p className='miniTitle'>약 복용 시간</p>
                    </div>
                    <div className='contents_thum'>
                        
                    </div>
                </label>
                
                <input type='checkbox' className="checkBoxV" id='checkBtn' checked={isCheckChecked} onChange={handleCheckCheckboxChange}></input>
                <label htmlFor='checkBtn' className='memo' id='check'>
                    <div className='mypage_Minititle'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" fill="none"><rect width="9.75" height="9.75" x="1.625" y="2.125" fill="#fff" stroke="#40300E" strokeWidth=".5" rx="2"/><path stroke="#40300E" strokeLinecap="round" strokeLinejoin="round" d="M9.209 5.375 7.714 7.617A.703.703 0 0 1 6.5 7.542v0a.703.703 0 0 0-1.213-.076L3.792 9.708"/></svg>
                      <p className='miniTitle'>검진 결과</p>
                    </div>
                    <div className='contents_thum'>

                    </div>
                </label>

                <input type='checkbox' className="checkBoxV" id='cautionBtn' checked={isCautionChecked} onChange={handleCautionCheckboxChange}></input>
                <label htmlFor='cautionBtn' className='memo' id='caution'>
                    <div className='mypage_Minititle'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" fill="none"><path fill="#fff" d="m1.83 8.048 2.936-2.935c2.013.335 3.424 2.516 3.984 3.564l-3.565 3.565c-1.342.503-2.656-.21-3.145-.63-1.174-.838-.839-3.144-.21-3.564Z"/><path fill="#4B9647" d="M11.323 5.952 8.387 8.887c-2.013-.335-3.425-2.516-3.984-3.564l3.565-3.565c1.342-.503 2.656.21 3.145.63 1.174.838.839 3.144.21 3.564Z"/><path stroke="#40300E" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".5" d="m5.735 11.588 5.353-5.353a2.704 2.704 0 1 0-3.823-3.823L1.912 7.765a2.704 2.704 0 1 0 3.823 3.823Z"/><path stroke="#40300E" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".5" d="m8.387 8.887-.206-.078a6.55 6.55 0 0 1-3.568-3.277v0"/><circle cx="10.065" cy="11.823" r="1.427" fill="#fff" stroke="#EE8F84" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".5"/><path stroke="#EE8F84" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".5" d="M10.903 10.984 9.226 12.66"/></svg>
                      <p className='miniTitle'>약 주의사항</p>
                    </div>
                    
                    <div className='contents_thum'>

                    </div>
                </label>

              </div>



    )
}