import { Diary_emotion } from './Diary_emotion';
import './MyPage.css';
import { useState } from 'react';
import './Diary.css'

export function Diary(props){
    

    const {
        diary_feel, diary_condition, diary_todayDiary, diary_todayThank,
        setDiary_feel, setDiary_condition, setDiary_todayDiary, setDiary_todayThank
    } = props;


    const todaydiary = ( e ) => {
        setDiary_todayDiary(e.target.value);
    }

    const todaythank = ( e ) => {
        setDiary_todayThank(e.target.value);
    }
    
    return(
        <div className='myPage_Diary'>
            <div className='mypage_title'>
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none"><rect width="10" height="14" x="6.5" y="7.811" fill="#FFE14F" rx="2"/><rect width="13.542" height="17.708" x="6.75" y="4.978" stroke="#40300E" strokeWidth="1.2" rx="2"/><path stroke="#40300E" strokeLinecap="round" strokeWidth="1.2" d="M16.125 11.228V9.144M4.667 10.186h4.166M4.667 14.353h4.166M4.667 18.52h4.166"/></svg>
                <p>TODAY'S DIARY</p>
            </div>

            <div className="mypage_Diary_contents">

                <div className="mypage_Diary_feel">
                    <p className="Diary_title">■ 오늘의 기분은 어떤가요?</p>
                    <Diary_emotion  diary={diary_feel} setDiary={setDiary_feel} />
                </div>

                <div className="mypage_Diary_condition">
                    <p className="Diary_title">■ 오늘의 몸 상태는 어떤가요?</p>
                    <Diary_emotion  diary={diary_condition} setDiary={setDiary_condition} />
                </div>

                <div className="mypage_Diary_TodayDiaryDiv">
                    <p className="Diary_title">■ 오늘 하루 일과는 어땠나요?</p>
                    <textarea className='diaryWriteBox' rows="5" placeholder='내용 입력하기' 
                    onChange={todaydiary} value={diary_todayDiary}>
                        
                    </textarea>
                </div>

                <div className='mypage_Diary_TodayThankDiv'>
                    <p className="Diary_title">■ 오늘 감사한 일이 있었나요?</p>
                    <textarea className='diaryWriteBox' rows="3" placeholder='내용 입력하기' 
                    onChange={todaythank} value={diary_todayThank}>
                        
                    </textarea>
                </div>

            </div>

        </div>
    )
}