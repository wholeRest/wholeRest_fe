//import { Header } from "../Header"
//import { Footer } from "../Footer"
import './MyPage.css'
import * as React from 'react';
import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router"
import ToDoList from "./ToDoList";
import Photo from "./Photo";

import { Mini3 } from "./Mini3"
import { Diary } from "./Diary"
import { Memo } from "./Memo" 
import { Calendar } from "./calendar/Calendar";

import axios from "axios"
import { authHttp } from '../../axios/apiUrl';


// 오늘 날짜를 yyyy-mm-dd 형식으로 반환하는 함수
const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 날짜를 yyyy-mm-dd 형식으로 변환하는 함수
const formatDate = (date) => {
  if (!date) return '';

  // date가 Date 객체가 아닌 경우, 이를 Date 객체로 변환 시도
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};




export function MyPage(props){
    const { ID } = useParams();
    
    const [nowDay, setNowDay ]= React.useState(getToday()); // 지금 선택된 날짜!

    const today = new Date();
    // 현재 날짜를 가져옵니다.

    //const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    // 원하는 형식으로 날짜를 설정합니다.
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    console.log(formattedDate);


    const [isPosted, setIsPosted] = useState(false); // post됐는지
    const [eventId, setEventId] = useState("");

    const [isDrugChecked, setIsDrugChecked] = useState(false);
    const [isCheckChecked, setIsCheckChecked] = useState(false);
    const [isCautionChecked, setIsCautionChecked] = useState(false);

    const [diary_feel, setDiary_feel] = useState('0');
    const [diary_condition, setDiary_condition] = useState('0');
    const [diary_todayDiary, setDiary_todayDiary] = useState("");
    const [diary_todayThank, setDiary_todayThank] =useState("");

    const [memo, setMemo] = useState("");

    const [mini_drug, setMini_drug] = useState([
      {content: "",
        check: false
       },
       {content: "",
        check: false
       },
       {content: "",
        check: false
       },
       {content: "",
        check: false
       },
    ]);
    const [mini_check, setMini_check] = useState([
      {content: "",
        check: false
       },
       {content: "",
        check: false
       },
       {content: "",
        check: false
       },
       {content: "",
        check: false
       },
    ]);
    const [mini_caution, setMini_caution] = useState([
      {content: "",
        check: false
       },
       {content: "",
        check: false
       },
       {content: "",
        check: false
       },
       {content: "",
        check: false
       },
    ]);


    useEffect(()=>{

      const token = sessionStorage.getItem('access');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      axios.get(`https://api.wholerest.site/api/event/date?date=${nowDay}`, config)
      .then(function (response){
        
        setDiary_feel(response.data[0].today_feel);
        console.log("들어있는 것 - today_feel: " + response.data[0].today_feel);
        console.log("diary_feel: " + diary_feel);
        setDiary_condition(response.data[0].today_condition);
        setDiary_todayDiary(response.data[0].today_routine);
        setDiary_todayThank(response.data[0].today_appreciation);
        setMemo(response.data[0].today_memo);

        setMini_drug([
          {content: response.data.medicineContent1, check: false},
          {content: response.data.medicineContent2, check: false},
          {content: response.data.medicineContent3, check: false},
          {content: response.data.medicineContent4, check: false},
        ]);

        setMini_check([
          {content: response.data.checkupContent1, check: false},
          {content: response.data.checkupContent2, check: false},
          {content: response.data.checkupContent3, check: false},
          {content: response.data.checkupContent4, check: false},
        ]);

        setMini_caution([
          {content: response.data.cautionContent1, check: false},
          {content: response.data.cautionContent2, check: false},
          {content: response.data.cautionContent3, check: false},
          {content: response.data.cautionContent4, check: false},
        ]);

        console.log(nowDay + " 선택 날짜로 get 성공");
      })
      .catch(function (error){
        console.log(error);
        console.log(nowDay + " 선택 날짜로 get 실패");
      }); 


    }, [nowDay]);



    

    const postClick = (e) => {

      //e.preventDefault();

      const token = sessionStorage.getItem('access');
      console.log("현재 토큰값 : " + token);
      const config = { headers: { Authorization: `Bearer ${token}` } };

      axios.post(`https://api.wholerest.site/api/event`, 
        { 
          date: nowDay,
          today_feel: diary_feel,
          today_condition: diary_condition,
          today_routine: diary_todayDiary,
          today_appreciation: diary_todayThank,
          today_memo: memo,
          todoContent1: "content1",
          todoContent2: "content1",
          medicineContent1: mini_drug[0].content,
          medicineContent2: mini_drug[1].content,
          medicineContent3: mini_drug[2].content,
          medicineContent4: mini_drug[3].content,
          checkupContent1: mini_check[0].content,
          checkupContent2: mini_check[1].content,
          checkupContent3: mini_check[2].content,
          checkupContent4: mini_check[3].content,
          cautionContent1: mini_caution[0].content,
          cautionContent2: mini_caution[1].content,
          cautionContent3: mini_caution[2].content,
          cautionContent4: mini_caution[3].content
        }, config)
        .then(function (response){
          console.log("전체 post 성공================");
        })
        .catch(function (error){
          console.log(error);
          console.log("전체 post 실패");
      });


    }



    const patchClick = (e) => {
      e.preventDefault(); 

      const token = sessionStorage.getItem('access');
      const config = { headers: { Authorization: `Bearer ${token}` } };




      authHttp.get(`/api/event/date?date=${nowDay}`)
        .then(function (response){
          setEventId(response.data[0].event_id);
          console.log("이벤트 아이디: " + response.data[0].event_id);

          authHttp.patch(`/api/event/${eventId}`, 
            { 
          today_feel: diary_feel,
          today_condition: diary_condition,
          today_routine: diary_todayDiary,
          today_appreciation: diary_todayThank,
          today_memo: memo,
          todoContent1: "content2",
          todoContent2: "content2",
          medicineContent1: mini_drug[0].content,
          medicineContent2: mini_drug[1].content,
          medicineContent3: mini_drug[2].content,
          medicineContent4: mini_drug[3].content,
          checkupContent1: mini_check[0].content,
          checkupContent2: mini_check[1].content,
          checkupContent3: mini_check[2].content,
          checkupContent4: mini_check[3].content,
          cautionContent1: mini_caution[0].content,
          cautionContent2: mini_caution[1].content,
          cautionContent3: mini_caution[2].content,
          cautionContent4: mini_caution[3].content
            }, config)
            .then(function (response){
              console.log("전체 patch 성공");
            })
            .catch(function (error){
              console.log("전체 patch 실패");
          });

        })
        .catch(function(error){
          console.log("event get 실패");
        });


    }



    
    const handleInputChange = (e, index, type) => {
      const { value } = e.target;
      if (type === 'drug') {
          setMini_drug(prev => prev.map((item, i) => (i === index ? value : item)));

      } else if (type === 'check') {
          setMini_check(prev => prev.map((item, i) => (i === index ? value : item)));

      } else if (type === 'caution') {
          setMini_caution(prev => prev.map((item, i) => (i === index ? value : item)));

      }
  };




    return(
      <div className="screen_main">
        <div className='myPage'>
          
          <div className='body'>
            <ToDoList ID={ID} />
            <div className='mypage_Btn'>
              <button className='saveBtn' onClick={postClick}>저장</button>
              <button className='saveBtn' onClick={patchClick}>수정</button>
            </div>

            <div className="calendar_div">
              <Calendar ID={ID} nowDay={nowDay} setNowDay={setNowDay} />
            </div>
              

            <Mini3  
              ID={ID} 
              
              isDrugChecked={isDrugChecked} isCheckChecked={isCheckChecked} isCautionChecked={isCautionChecked}
              setIsDrugChecked={setIsDrugChecked} setIsCheckChecked={setIsCheckChecked} setIsCautionChecked={setIsCautionChecked}
            />

            <Diary ID={ID}  
              diary_feel={diary_feel} diary_condition={diary_condition} diary_todayDiary={diary_todayDiary} diary_todayThank={diary_todayThank}
              setDiary_feel={setDiary_feel} setDiary_condition={setDiary_condition} 
              setDiary_todayDiary={setDiary_todayDiary} setDiary_todayThank={setDiary_todayThank}
            />

            <Photo ID={ID}  />

            

            <Memo ID={ID}  memo={memo} setMemo={setMemo}
            />




          </div>



            {/* 여기 아래는 클릭 시 나오는 모달 창 */}

            {/* Drug Modal */}
            <div className={`popupModal ${isDrugChecked ? 'checked' : ''}`}>
                    <div className="popupModal_top">
                        <p>■ 복용 해야 하는 약의 시간과 기간을 적어주세요.</p>
                        <label htmlFor='drugBtn' id='X'>X</label>
                    </div>
                    <div className="popupModal_box">
                        {mini_drug.map((drug, index) => (
                            <div className="popupModal_box_letter" key={index}>
                                <input type="checkbox" />
                                <input 
                                    type='text' 
                                    className="popupModal_box_letter_text" 
                                    value={drug}
                                    onChange={(e) => handleInputChange(e, index, 'drug')}
                                />
                            </div>
                        ))}
                    </div>
                </div>



            {/* Check Modal */}
            <div className={`popupModal ${isCheckChecked ? 'checked' : ''}`}>
                    <div className="popupModal_top">
                        <p>■ 오늘 검진 결과에 대해 적어주세요.</p>
                        <label htmlFor='checkBtn' id='X'>X</label>
                    </div>
                    <div className="popupModal_box">
                        {mini_check.map((check, index) => (
                            <div className="popupModal_box_letter" key={index}>
                                <input type="checkbox" />
                                <input 
                                    type='text' 
                                    className="popupModal_box_letter_text" 
                                    value={check}
                                    onChange={(e) => handleInputChange(e, index, 'check')}
                                />
                            </div>
                        ))}
                    </div>
                </div>




            {/* Caution Modal */}
            <div className={`popupModal ${isCautionChecked ? 'checked' : ''}`}>
                    <div className="popupModal_top">
                        <p>■ 약의 정량과 주의사항에 대해 적어주세요.</p>
                        <label htmlFor='cautionBtn' id='X'>X</label>
                    </div>
                    <div className="popupModal_box">
                        {mini_caution.map((caution, index) => (
                            <div className="popupModal_box_letter" key={index}>
                                <input type="checkbox" />
                                <input 
                                    type='text' 
                                    className="popupModal_box_letter_text" 
                                    value={caution}
                                    onChange={(e) => handleInputChange(e, index, 'caution')}
                                />
                            </div>
                        ))}
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