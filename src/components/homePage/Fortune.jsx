import './Fortune.css';
import { useState } from 'react';
import { useEffect } from 'react';
import cookie1 from './포츈쿠키 1 2.png';
import cookie2 from './포츈쿠키2 2.png';
import cookie3 from './포츈쿠키 3 2.png';
import title from './text.png';
import title_after from './오늘의 행운의 메세지.png';





export function Fortune(props){

    const {cookie, setCookie} = props;
    const [fortuneMessage, setFortuneMessage] = useState([]);
    const [n, setN] = useState(10);

    const fortuneMessages = [
        ["오늘은 좋은 일이", "있을 것 같아요!", "어디든 외출해서", "상쾌한 공기를 느껴보세요."],
        ["희망은 언제나 우리 곁에", "있습니다. 오늘도", "멋진 하루 보내세요!"],
        ["작은 일에도 감사하며", "행복을 찾아보세요.", "뜻밖의 기쁨이 찾아올 거예요."],
        ["성공은 작은 노력들이", "모여 이루어집니다.", "포기하지 말고 계속하세요!"],
        ["당신은 할 수 있습니다.", "스스로를 믿고", "도전해보세요!"],

        ["매일매일이 새로운 시작", "입니다. 오늘도", "힘내세요!"],
        ["행운이 당신을 향해", "달려오고 있어요.", "준비되셨나요?"],
        ["긍정적인 마음으로", "하루를 시작해보세요.", "좋은 일이 생길 거예요!"],
        ["매 순간을 소중히", "여기며 즐기세요.", "행복이 가득할 거예요."],
        ["자신을 믿고 나아가세요.", "모든 일은", "잘 될 것입니다."],

        ["","","",""]
    ];


    const updateDataAtMidnight = () => {
        setCookie(0); // 상태를 원하는 값으로 업데이트
        localStorage.setItem('fortuneCookie', JSON.stringify(0)); // 쿠키 상태 로컬 스토리지 업데이트
        // localStorage.removeItem('fortuneCookie'); // 쿠키 상태 초기화
        localStorage.removeItem('fortuneIndex');
    };

    // 현재 시간과 자정까지 남은 시간 계산
    const getTimeUntilMidnight = () => {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0); // 자정으로 설정
        return midnight - now; // 밀리초 단위로 남은 시간 계산
    };

    
    
    useEffect(() => {
        // 페이지 로드 시 로컬 스토리지에서 쿠키 상태를 복원
        const storedCookie = JSON.parse(localStorage.getItem('fortuneCookie'));
        const storedIndex = JSON.parse(localStorage.getItem('fortuneIndex'));

        if (storedCookie !== null) {
            setCookie(storedCookie);
        }

        if (storedIndex !== null) {
            setN(storedIndex);
            setFortuneMessage(fortuneMessages[storedIndex]);
        }

        
        const timeUntilMidnight = getTimeUntilMidnight();

        
        
        // 자정이 되면 상태를 업데이트하도록 설정
        const timerId = setTimeout(() => {
            updateDataAtMidnight(); // 자정에 데이터 업데이트
            // 매일 자정마다 다시 타이머 설정
            setInterval(updateDataAtMidnight, 24 * 60 * 60 * 1000); // 하루에 한번 실행
        }, timeUntilMidnight);

        // 컴포넌트 언마운트 시 타이머 정리
        return () => clearTimeout(timerId);
    }, []);


    const fortureResult = () => {
        let randomIndex = Math.floor(Math.random() * (9 - 1 + 1))
        setN(randomIndex);
        setFortuneMessage(fortuneMessages[n]);
        localStorage.setItem('fortuneCookie', JSON.stringify(cookie));
        localStorage.setItem('fortuneIndex', JSON.stringify(n));
    };
    
    
    
    useEffect(() => {

        if(cookie !== 0){
            fortureResult();
        }
        
        
         

        console.log("현재 쿠키: " + cookie);
        console.log("현재 행운의 글귀: " + n);
    }, [cookie]);


    
    function now(){
        if(cookie === 0){
            return(
                <div className='before'>
                    <div className='fortunetitle'>
                        <img className='fortunetitle1' src={title} />
                        
                    </div>
                    <div className='cookies'>
                        <img className='cookie' onClick={() => setCookie(1)} src={cookie1} />
                        <img className='cookie' onClick={() => setCookie(2)} src={cookie2} />
                        <img className='cookie' onClick={() => setCookie(3)} src={cookie3} />
                    </div>
                </div>
            )
        }
        else {
            return(
                <div className='after'>
                    <div className='fortunetitle_after'>
                        <img className='fortunetitle1' src={title_after} />
                        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" fill="none"><rect width="37.5" height="37.5" x="1.75" y="1.987" fill="#FFE14F" rx="18.75"/><path fill="#FFD04C" fillRule="evenodd" d="M1.843 18.862a18.974 18.974 0 0 0-.093 1.875c0 10.355 8.395 18.75 18.75 18.75s18.75-8.395 18.75-18.75c0-.633-.031-1.258-.093-1.875-.94 9.475-8.934 16.875-18.657 16.875s-17.717-7.4-18.657-16.875Z" clipRule="evenodd"/><circle cx="7.375" cy="16.362" r="3.125" fill="#FF759B" fillOpacity=".2"/><circle cx="33.625" cy="16.362" r="3.125" fill="#FF759B" fillOpacity=".2"/><path fill="#52565F" stroke="#52565F" strokeLinecap="round" strokeWidth="2" d="M14.25 11.96c-1.474 0-2.607 1.228-2.607 2.666a.13.13 0 0 1-.034.091c-.017.018-.03.02-.038.02-.007 0-.02-.002-.037-.02a.129.129 0 0 1-.034-.091c0-1.63 1.265-2.89 2.75-2.89s2.75 1.26 2.75 2.89a.129.129 0 0 1-.034.091c-.017.018-.03.02-.037.02-.008 0-.021-.002-.038-.02a.13.13 0 0 1-.034-.091c0-1.438-1.133-2.667-2.607-2.667ZM26.75 11.96c-1.474 0-2.607 1.228-2.607 2.666a.13.13 0 0 1-.034.091c-.017.018-.03.02-.038.02-.007 0-.02-.002-.037-.02a.129.129 0 0 1-.034-.091c0-1.63 1.265-2.89 2.75-2.89s2.75 1.26 2.75 2.89a.129.129 0 0 1-.034.091c-.017.018-.03.02-.037.02-.008 0-.021-.002-.038-.02a.13.13 0 0 1-.034-.091c0-1.438-1.133-2.667-2.607-2.667Z"/><path fill="#52565F" fillRule="evenodd" d="M8.69 20.869a1.25 1.25 0 0 1 1.678.559c.959 1.918 4.476 4.309 10.132 4.309 5.655 0 9.173-2.391 10.132-4.31a1.25 1.25 0 1 1 2.236 1.119c-1.541 3.082-6.182 5.69-12.368 5.69-6.187 0-10.827-2.608-12.368-5.69a1.25 1.25 0 0 1 .559-1.677Z" clipRule="evenodd"/></svg>

                    </div>
                    <div className='fortune'>
                    {fortuneMessage.map((message, index) => (
                            <p key={index} className='fortuneM'>{message}</p>
                        ))}
                    </div> 
                </div>    
            )
        }
    }


    return(
        <div className='fortunediv'>
            

            {now()}
            

        </div>
    )
}

