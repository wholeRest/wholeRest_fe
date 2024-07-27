import './Fortune.css';
import { useState } from 'react';




export function Fortune(){
    const [cookie, setCookie] = useState("0");

    function now(){
        if(cookie === "0"){
            return(
<div className='before'>
                    <div className='title'>
                        <h1>포춘 쿠키를 뽑아보세요</h1>
                    </div>
                    <div className='cookies'>
                        <svg onClick={() => setCookie("1")} xmlns="http://www.w3.org/2000/svg" width="41" height="41" fill="none"><rect width="37.5" height="37.5" x="1.75" y="1.987" fill="#FFE14F" rx="18.75"/><path fill="#FFD04C" fillRule="evenodd" d="M1.843 18.862a18.974 18.974 0 0 0-.093 1.875c0 10.355 8.395 18.75 18.75 18.75s18.75-8.395 18.75-18.75c0-.633-.031-1.258-.093-1.875-.94 9.475-8.934 16.875-18.657 16.875s-17.717-7.4-18.657-16.875Z" clipRule="evenodd"/><circle cx="7.375" cy="21.362" r="3.125" fill="#FF759B" fillOpacity=".2"/><circle cx="33.625" cy="21.362" r="3.125" fill="#FF759B" fillOpacity=".2"/><path fill="#52565F" fillRule="evenodd" d="M15.105 24.551a1.25 1.25 0 0 1 1.58.79c.504 1.51 1.86 2.896 3.815 2.896 1.955 0 3.311-1.386 3.814-2.895a1.25 1.25 0 1 1 2.372.79c-.747 2.241-2.878 4.605-6.186 4.605s-5.439-2.364-6.186-4.605a1.25 1.25 0 0 1 .79-1.581Z" clipRule="evenodd"/><circle cx="14.25" cy="16.987" r="2.5" fill="#52565F"/><circle cx="26.75" cy="16.987" r="2.5" fill="#52565F"/></svg>
                        <svg onClick={() => setCookie("2")} xmlns="http://www.w3.org/2000/svg" width="41" height="41" fill="none"><rect width="37.5" height="37.5" x="1.75" y="1.987" fill="#FFE14F" rx="18.75"/><path fill="#FFD04C" fillRule="evenodd" d="M1.843 18.862a18.974 18.974 0 0 0-.093 1.875c0 10.355 8.395 18.75 18.75 18.75s18.75-8.395 18.75-18.75c0-.633-.031-1.258-.093-1.875-.94 9.475-8.934 16.875-18.657 16.875s-17.717-7.4-18.657-16.875Z" clipRule="evenodd"/><circle cx="7.375" cy="21.362" r="3.125" fill="#FF759B" fillOpacity=".2"/><circle cx="33.625" cy="21.362" r="3.125" fill="#FF759B" fillOpacity=".2"/><path fill="#52565F" fillRule="evenodd" d="M15.105 24.551a1.25 1.25 0 0 1 1.58.79c.504 1.51 1.86 2.896 3.815 2.896 1.955 0 3.311-1.386 3.814-2.895a1.25 1.25 0 1 1 2.372.79c-.747 2.241-2.878 4.605-6.186 4.605s-5.439-2.364-6.186-4.605a1.25 1.25 0 0 1 .79-1.581Z" clipRule="evenodd"/><circle cx="14.25" cy="16.987" r="2.5" fill="#52565F"/><circle cx="26.75" cy="16.987" r="2.5" fill="#52565F"/></svg>
                        <svg onClick={() => setCookie("3")} xmlns="http://www.w3.org/2000/svg" width="41" height="41" fill="none"><rect width="37.5" height="37.5" x="1.75" y="1.987" fill="#FFE14F" rx="18.75"/><path fill="#FFD04C" fillRule="evenodd" d="M1.843 18.862a18.974 18.974 0 0 0-.093 1.875c0 10.355 8.395 18.75 18.75 18.75s18.75-8.395 18.75-18.75c0-.633-.031-1.258-.093-1.875-.94 9.475-8.934 16.875-18.657 16.875s-17.717-7.4-18.657-16.875Z" clipRule="evenodd"/><circle cx="7.375" cy="21.362" r="3.125" fill="#FF759B" fillOpacity=".2"/><circle cx="33.625" cy="21.362" r="3.125" fill="#FF759B" fillOpacity=".2"/><path fill="#52565F" fillRule="evenodd" d="M15.105 24.551a1.25 1.25 0 0 1 1.58.79c.504 1.51 1.86 2.896 3.815 2.896 1.955 0 3.311-1.386 3.814-2.895a1.25 1.25 0 1 1 2.372.79c-.747 2.241-2.878 4.605-6.186 4.605s-5.439-2.364-6.186-4.605a1.25 1.25 0 0 1 .79-1.581Z" clipRule="evenodd"/><circle cx="14.25" cy="16.987" r="2.5" fill="#52565F"/><circle cx="26.75" cy="16.987" r="2.5" fill="#52565F"/></svg>
                    </div>
                </div>
            )
        }
        else {
            return(
<div className='after'>
                    <div className='title'>
                        <h1>오늘의 행운의 메세지</h1>
                    </div>
                    <div className='fortune'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" fill="none"><rect width="37.5" height="37.5" x="1.75" y="1.987" fill="#FFE14F" rx="18.75"/><path fill="#FFD04C" fillRule="evenodd" d="M1.843 18.862a18.974 18.974 0 0 0-.093 1.875c0 10.355 8.395 18.75 18.75 18.75s18.75-8.395 18.75-18.75c0-.633-.031-1.258-.093-1.875-.94 9.475-8.934 16.875-18.657 16.875s-17.717-7.4-18.657-16.875Z" clipRule="evenodd"/><circle cx="7.375" cy="16.362" r="3.125" fill="#FF759B" fillOpacity=".2"/><circle cx="33.625" cy="16.362" r="3.125" fill="#FF759B" fillOpacity=".2"/><path fill="#52565F" stroke="#52565F" strokeLinecap="round" strokeWidth="2" d="M14.25 11.96c-1.474 0-2.607 1.228-2.607 2.666a.13.13 0 0 1-.034.091c-.017.018-.03.02-.038.02-.007 0-.02-.002-.037-.02a.129.129 0 0 1-.034-.091c0-1.63 1.265-2.89 2.75-2.89s2.75 1.26 2.75 2.89a.129.129 0 0 1-.034.091c-.017.018-.03.02-.037.02-.008 0-.021-.002-.038-.02a.13.13 0 0 1-.034-.091c0-1.438-1.133-2.667-2.607-2.667ZM26.75 11.96c-1.474 0-2.607 1.228-2.607 2.666a.13.13 0 0 1-.034.091c-.017.018-.03.02-.038.02-.007 0-.02-.002-.037-.02a.129.129 0 0 1-.034-.091c0-1.63 1.265-2.89 2.75-2.89s2.75 1.26 2.75 2.89a.129.129 0 0 1-.034.091c-.017.018-.03.02-.037.02-.008 0-.021-.002-.038-.02a.13.13 0 0 1-.034-.091c0-1.438-1.133-2.667-2.607-2.667Z"/><path fill="#52565F" fillRule="evenodd" d="M8.69 20.869a1.25 1.25 0 0 1 1.678.559c.959 1.918 4.476 4.309 10.132 4.309 5.655 0 9.173-2.391 10.132-4.31a1.25 1.25 0 1 1 2.236 1.119c-1.541 3.082-6.182 5.69-12.368 5.69-6.187 0-10.827-2.608-12.368-5.69a1.25 1.25 0 0 1 .559-1.677Z" clipRule="evenodd"/></svg>

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

