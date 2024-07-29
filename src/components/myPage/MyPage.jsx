import { Header } from "../Header"
import { Footer } from "../Footer"
import './MyPage.css'
import { useState } from "react"
import { useParams } from "react-router"
import ToDoList from "./ToDoList";
import Photo from "./Photo";

import { Mini3 } from "./Mini3"
import { Diary } from "./Diary"
import { Memo } from "./Memo" 
import { Calendar } from "./calendar/Calendar";



export function MyPage(props){
    const { ID } = useParams();

    const [isDrugChecked, setIsDrugChecked] = useState(false);
    const [isCheckChecked, setIsCheckChecked] = useState(false);
    const [isCautionChecked, setIsCautionChecked] = useState(false);

    const [todolist, setTodolist] = useState([]);
    const [mini_drug, setMini_drug] = useState("");
    const [mini_check, setMini_check] = useState("");
    const [mini_caution, setMini_caution] = useState("");
    
    const mini_drugWrite = (e) => {
      setMemo(e.target.value);
    }

    const mini_checkWrite = (e) => {
      setMemo(e.target.value);
    }

    const mini_cautionWrite = (e) => {
      setMemo(e.target.value);
    }


    return(
      <div className="screen_main">
        <div className='myPage'>
          
        
          <div className='body'>
            <ToDoList ID={ID} />

            <div className="calendar_div">
              <Calendar ID={ID}  />
            </div>
            

              

            <Mini3  
              ID={ID} 
              
              isDrugChecked={isDrugChecked} isCheckChecked={isCheckChecked} isCautionChecked={isCautionChecked}
              setIsDrugChecked={setIsDrugChecked} setIsCheckChecked={setIsCheckChecked} setIsCautionChecked={setIsCautionChecked}
            />

            <Diary ID={ID}  
            />

            <Photo ID={ID}  />

            

            <Memo ID={ID}  
            />




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