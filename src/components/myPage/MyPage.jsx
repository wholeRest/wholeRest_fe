import { Header } from "../Header"
import { Footer } from "../Footer"
import './MyPage.css'
import { useState } from "react"
import ToDoList from "./ToDoList";



export function MyPage(){
    const [isDrugChecked, setIsDrugChecked] = useState(false);
    const [isCheckChecked, setIsCheckChecked] = useState(false);
    const [isCautionChecked, setIsCautionChecked] = useState(false);


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
      <div className="screen_main">
        <div className='myPage'>
          
        <ToDoList />
          <div className='body'>
            <div className='myPage_plan'>
              <p className="mypage_title">PLANS OF THIS WEEK</p>
              <ul>
                <li>
                  -
                </li>
                <li>
                  +
                </li>
              </ul>
            </div>

            <div className='myPage_mid'>
              <div className='schedule'>
                <div className='title'>
                  <p>SCHEDULE</p>
                  <p>날짜</p>
                </div>
                <div className='calendar'>

                </div>
                <button id='scheduleBtn'>+</button>
              </div>

              <div className='memoList'>  
                <input type='checkbox' className="checkBoxV" id='drugBtn' checked={isDrugChecked} onChange={handleDrugCheckboxChange} ></input>
                <label htmlFor='drugBtn' className="memo" id='drug'>
                  <p>약 복용 시간</p>
                  </label>
                
                <input type='checkbox' className="checkBoxV" id='checkBtn' checked={isCheckChecked} onChange={handleCheckCheckboxChange}></input>
                <label htmlFor='checkBtn' className='memo' id='check'>
                  <p>검진 결과</p>
                
                </label>
                <input type='checkbox' className="checkBoxV" id='cautionBtn' checked={isCautionChecked} onChange={handleCautionCheckboxChange}></input>
                <label htmlFor='cautionBtn' className='memo' id='caution'>
                  <p>약 주의사항</p>
                
                </label>

              </div>
            </div>

            <div className='myPage_Diary'>
              <div className='mypage_title'>
                <p>TODAY'S DIARY</p>
              </div>
              <div className="mypage_Diary_up">
                <div className="mypage_Diary_Imoge">
                  <div className="kibun">
                    <p className="Diary_title">오늘의 기분은 어떤가요?</p>
                  </div>
                  <div className="condition">
                    <p className="Diary_title">오늘의 컨디션은 어떤가요?</p>
                  </div>
                </div>
                <div className='kamsa'>
                  <p className="Diary_title">오늘 감사한 일이 있었나요?</p>
                </div>
              </div>
              <div className="mypage_Diary_down">
                <p className="Diary_title">오늘 하루 일과는 어땠나요?</p>
              </div>
            </div>

            <div className="mypage_Photo">
              <p className="mypage_title">TODAY'S PHOTO</p> 
              <div className="mypage_Photo_contents">
                <div className="mypage_Photos">
                  <div className="photo">
                    <div className="picture">
                      n
                    </div>
                    <div className="picture_info">
                      <p>내용을 입력하세요</p>
                    </div>
                  </div>
                  <div className="photo">
                    <div className="picture">

                    </div>
                    <div className="picture_info">
                      <p>내용을 입력하세요</p>
                    </div>
                  </div>
                  <div className="photo">
                    <div className="picture">

                    </div>
                    <div className="picture_info">
                      <p>내용을 입력하세요</p>
                    </div>
                  </div>
                </div>
                <div className="mypage_Photo_Add">
                  <button className="AddBtn">+</button>
                </div>
              </div>
            </div>

            <div className="mypage_Memo">
              <p className="mypage_title">TODAY'S MEMO</p>
              <div className="mypage_Memo_box">

              </div>
            </div>




          </div>



            {/* 여기 아래는 클릭 시 나오는 모달 창 */}

            <div className={`popupModal ${isDrugChecked ? 'checked' : ''}`}>
              <div className="popupModal_top">
                <p>■ 복용 해야 하는 약의 시간과 기간을 적어주세요.</p>
                <label htmlFor='drugBtn' id='X'>X</label>
              </div>
              <div className="popupModal_box">
                <div className="popupModal_box_letter">
                  <input type="checkbox"></input>
                  <input type='text' className="popupModal_box_letter_text"></input>
                </div>
                <div className="popupModal_box_letter">
                  <input type="checkbox"></input>
                  <input type='text' className="popupModal_box_letter_text"></input>
                </div>
                <div className="popupModal_box_letter">
                  <input type="checkbox"></input>
                  <input type='text' className="popupModal_box_letter_text"></input>
                </div>
                <div className="popupModal_box_letter">
                  <input type="checkbox"></input>
                  <input type='text' className="popupModal_box_letter_text"></input>
                </div>
              </div>
            </div>

            <div className={`popupModal ${isCheckChecked ? 'checked' : ''}`}>
              <div className="popupModal_top">
                <p>■ 오늘 검진 결과에 대해 적어주세요.</p>
                <label htmlFor='checkBtn' id='X'>X</label>
              </div>
              <div className="popupModal_box">
                <div className="popupModal_box_letter">
                  <input type="checkbox"></input>
                  <input type='text' className="popupModal_box_letter_text"></input>
                </div>
                <div className="popupModal_box_letter">
                  <input type="checkbox"></input>
                  <input type='text' className="popupModal_box_letter_text"></input>
                </div>
                <div className="popupModal_box_letter">
                  <input type="checkbox"></input>
                  <input type='text' className="popupModal_box_letter_text"></input>
                </div>
                <div className="popupModal_box_letter">
                  <input type="checkbox"></input>
                  <input type='text' className="popupModal_box_letter_text"></input>
                </div>
              </div>
            </div>

            <div className={`popupModal ${isCautionChecked ? 'checked' : ''}`}>
              <div className="popupModal_top">
                <p>■ 약의 정량과 주의사항에 대해 적어주세요.</p>
                <label htmlFor='cautionBtn' id='X'>X</label>
              </div>
              <div className="popupModal_box">
                <div className="popupModal_box_letter">
                  <input type="checkbox"></input>
                  <input type='text' className="popupModal_box_letter_text"></input>
                </div>
                <div className="popupModal_box_letter">
                  <input type="checkbox"></input>
                  <input type='text' className="popupModal_box_letter_text"></input>
                </div>
                <div className="popupModal_box_letter">
                  <input type="checkbox"></input>
                  <input type='text' className="popupModal_box_letter_text"></input>
                </div>
                <div className="popupModal_box_letter">
                  <input type="checkbox"></input>
                  <input type='text' className="popupModal_box_letter_text"></input>
                </div>
              </div>
            </div>

            {/* 여기까지가 모달창 내용 */}






          <button className='writeBtn'>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none"><rect width="50" height="50" fill="#FFE14F" rx="25"/><path stroke="#40300E" strokeLinecap="round" strokeWidth="2" d="M25 14.75v20.5M35.25 25h-20.5"/></svg>
          </button>

        </div>
      </div>
        
    )
}