//import { Header } from "../Header"
//import { Footer } from "../Footer"
import './MyPage.css'
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




export function MyPage(props){
    const { ID } = useParams();
    

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

    const [mini_drug, setMini_drug] = useState([
      "",
      "",
      "",
      "",
    ]);
    const [mini_check, setMini_check] = useState([
      "",
      "",
      "",
      "",
    ]);
    const [mini_caution, setMini_caution] = useState([
      "",
      "",
      "",
      "",
    ]);





    useEffect(() => {
      const token = sessionStorage.getItem('access');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const fetchData = async () => {
          // try {
          //     if (!isPosted) {
          //         const postEventResponse = await axios.post('https://wholerest.site/api/event', { date: '2024-07-30' }, config);
          //         console.log("post는 성공===================================");
          //         console.log(postEventResponse.data);

          //     }
          // } catch (error) {
          //     console.error(error);
          //     console.error("응답 데이터:", error.response?.data);
          //     console.log("event post 에러발생!");
          // }

          try{
            if (!isPosted) {
              const getEventResponse = await axios.get(`https://wholerest.site/api/event/date?date=2024-07-30`, config);
              console.log("event get 성공.. getEventResponse:" +getEventResponse);
              console.log("event get 성공.. .data:" +getEventResponse.data);
              console.log("Event GET response:", JSON.stringify(getEventResponse.data, null, 2));
              
              // JSON.stringify(getEventResponse.data, null, 2) 에서 event_id의 값이 알고 싶음

              setEventId(JSON.stringify(getEventResponse.data.event_id));
              setIsPosted(true);
            }
          }
          catch (error) {
            console.error(error);7
            console.error("응답 데이터:", error.response?.data);
            console.log("event get 에러발생!");
        }

      };

      fetchData();
  }, [isPosted, formattedDate]);





  useEffect(() => {
      const token = sessionStorage.getItem('access');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const postData = async () => {
          try {
              if (eventId) {
                  const postTodoResponse = await axios.post(`https://wholerest.site/api/todo/${eventId}`, { content: "", completed: false }, config);
                  console.log("post는 성공");
                  console.log(postTodoResponse.data);

                  const postMedicineResponse = await axios.post(`https://wholerest.site/api/medicine/${eventId}`, { content: "", completed: false }, config);
                  console.log("post는 성공");
                  console.log(postMedicineResponse.data);

                  const postCheckupResponse = await axios.post(`https://wholerest.site/api/checkup/${eventId}`, { content: "", completed: false }, config);
                  console.log("post는 성공");
                  console.log(postCheckupResponse.data);

                  const postCautionResponse = await axios.post(`https://wholerest.site/api/caution/${eventId}`, { content: "", completed: false }, config);
                  console.log("post는 성공");
                  console.log(postCautionResponse.data);
              }
          } catch (error) {
              console.error(error);
              console.log("post 에러발생!");
          }
      };

      postData();
  }, [eventId]);




//     // 하루에 한번만 실행될 수 있도록!! // 
//     useEffect(() => {

  

//       const token = sessionStorage.getItem('access');

//       const config = {
//           headers: { Authorization: `Bearer ${token}` }
//       };

//       if (!isPosted) {
//       axios.post('https://wholerest.site/api/event', {
//         date: "2024-08-02"
//       }, config)
//           .then(response => {
//               console.log("post는 성공===================================");
//               console.log(response.data);
              

//           }).catch(error => {
              
//               console.error(error);
//               console.error("응답 데이터:", error.response?.data);
//               console.log("event post 에러발생!");
//             });



//       axios.get('https://wholerest.site/api/event/date?date=2024-08-02', {
//         headers: { Authorization: `Bearer ${token}` }
//     }).then(response => {
//       setEventId(response.data.event_id);
//       console.log("event get 성공+++++++++++++");
//     }).catch(error => {
      
//         console.error(error);
//         console.log("event get 에러발생!");
//     });




//     axios.post(`https://wholerest.site/api/todo/${eventId}`, 
//       { content: "", completed: false }, config)
//       .then(response => {
//           console.log("todo post는 성공");

//       }).catch(error => {
        
//           console.error(error);
//           console.log("todo 에러발생!");
//       });




      


//       axios.post(`https://wholerest.site/api/medicine/${eventId}`,
//          { content: "", completed: false }, config)
//          .then(response => {
//             console.log("medicine post는 성공");

//         }).catch(error => {
          
//             console.error(error);
//             console.log("medicine 에러발생!");
//         });

//         axios.post(`https://wholerest.site/api/checkup/${eventId}`,
//           { content: "", completed: false }, config)
//           .then(response => {
//            console.log("checjup post는 성공");

//          }).catch(error => {
           
//              console.error(error);
//              console.log("checkup 에러발생!");
//          });

//          axios.post(`https://wholerest.site/api/caution/${eventId}`,
//           { content: "", completed: false }, config)
//           .then(response => {
//            console.log("caution post는 성공");

//          }).catch(error => {
//            console.log("caution 에러발생!");
//              console.error(error);
//          });


//          setIsPosted(true);

//   }
// }, [isPosted, formattedDate]);



///////////////////////////////////////////////////

  //   // 맨 처음 들어왔을 때 post 한번만
  //   useEffect(() => {
      
  // }, [isPosted, formattedDate]);





  // useEffect(() => {
  //     const token = sessionStorage.getItem('access');
  //     const config = { headers: { Authorization: `Bearer ${token}` } };

  //     if (eventId) {
  //         axios.patch(`https://wholerest.site/api/medicine/${eventId}`, {
  //             content: "",
  //             completed: false
  //         }, config)
  //         .then(response => {
  //             console.log("미니3_약복용 수정됨.");
  //         })
  //         .catch(error => {
  //             console.log(error);
  //             console.log("미니3_약복용 수정 실패...");
  //         });
  //     }
  // }, [mini_drug, eventId]);

  // useEffect(() => {
  //     const token = sessionStorage.getItem('access');
  //     const config = { headers: { Authorization: `Bearer ${token}` } };

  //     if (eventId) {
  //         axios.patch(`https://wholerest.site/api/checkup/${eventId}`, {
  //             content: "",
  //             completed: false
  //         }, config)
  //         .then(response => {
  //             console.log("미니3_검진결과 수정됨.");
  //         })
  //         .catch(error => {
  //             console.log(error);
  //             console.log("미니3_검진결과 수정 실패...");
  //         });
  //     }
  // }, [mini_check, eventId]);

  // useEffect(() => {
  //     const token = sessionStorage.getItem('access');
  //     const config = { headers: { Authorization: `Bearer ${token}` } };

  //     if (eventId) {
  //         axios.patch(`https://wholerest.site/api/caution/${eventId}`, {
  //             content: "",
  //             completed: false
  //         }, config)
  //         .then(response => {
  //             console.log("미니3_주의사항 수정됨.");
  //         })
  //         .catch(error => {
  //             console.log(error);
  //             console.log("미니3_주의사항 수정 실패...");
  //         });
  //     }
  // }, [mini_caution, eventId]);



    
    const [memo, setMemo] = useState("");


  //   useEffect(() => {
  //     console.log("isDrugChecked:", isDrugChecked);
  //     console.log("isCheckChecked:", isCheckChecked);
  //     console.log("isCautionChecked:", isCautionChecked);
  //     console.log("diary_feel:", diary_feel);
  //     console.log("diary_condition:", diary_condition);
  //     console.log("diary_todayDiary:", diary_todayDiary);
  //     console.log("diary_todayThank:", diary_todayThank);
  //     console.log("mini_drug:", mini_drug);
  //     console.log("mini_check:", mini_check);
  //     console.log("mini_caution:", mini_caution);
  //     console.log("memo:", memo);
  // }, [isDrugChecked, isCheckChecked, isCautionChecked, diary_feel, diary_condition, diary_todayDiary, diary_todayThank, mini_drug, mini_check, mini_caution, memo]);

    
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

            <div className="calendar_div">
              <Calendar ID={ID}  />
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