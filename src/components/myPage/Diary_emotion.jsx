import './MyPage.css'


export function Diary_emotion(props){
   {/* 내 생각엔 이거 체크 박스로 보내야할것 같음. 
    하나 클릭하면 다 false되게  */}

    return(
        <div id="mypage_Diary_emotion">
            <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" fill="none"><rect width="37.5" height="37.5" x="1.75" y="1.987" fill="#FFE14F" rx="18.75"/><path fill="#FFD04C" fillRule="evenodd" d="M1.843 18.862a18.974 18.974 0 0 0-.093 1.875c0 10.355 8.395 18.75 18.75 18.75s18.75-8.395 18.75-18.75c0-.633-.031-1.258-.093-1.875-.94 9.475-8.934 16.875-18.657 16.875s-17.717-7.4-18.657-16.875Z" clipRule="evenodd"/><circle cx="7.375" cy="16.362" r="3.125" fill="#FF759B" fillOpacity=".2"/><circle cx="33.625" cy="16.362" r="3.125" fill="#FF759B" fillOpacity=".2"/><path fill="#52565F" stroke="#52565F" strokeLinecap="round" strokeWidth="2" d="M14.25 11.96c-1.474 0-2.607 1.228-2.607 2.666a.13.13 0 0 1-.034.091c-.017.018-.03.02-.038.02-.007 0-.02-.002-.037-.02a.129.129 0 0 1-.034-.091c0-1.63 1.265-2.89 2.75-2.89s2.75 1.26 2.75 2.89a.129.129 0 0 1-.034.091c-.017.018-.03.02-.037.02-.008 0-.021-.002-.038-.02a.13.13 0 0 1-.034-.091c0-1.438-1.133-2.667-2.607-2.667ZM26.75 11.96c-1.474 0-2.607 1.228-2.607 2.666a.13.13 0 0 1-.034.091c-.017.018-.03.02-.038.02-.007 0-.02-.002-.037-.02a.129.129 0 0 1-.034-.091c0-1.63 1.265-2.89 2.75-2.89s2.75 1.26 2.75 2.89a.129.129 0 0 1-.034.091c-.017.018-.03.02-.037.02-.008 0-.021-.002-.038-.02a.13.13 0 0 1-.034-.091c0-1.438-1.133-2.667-2.607-2.667Z"/><path fill="#52565F" fillRule="evenodd" d="M8.69 20.869a1.25 1.25 0 0 1 1.678.559c.959 1.918 4.476 4.309 10.132 4.309 5.655 0 9.173-2.391 10.132-4.31a1.25 1.25 0 1 1 2.236 1.119c-1.541 3.082-6.182 5.69-12.368 5.69-6.187 0-10.827-2.608-12.368-5.69a1.25 1.25 0 0 1 .559-1.677Z" clipRule="evenodd"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" fill="none"><rect width="37.5" height="37.5" x="1.75" y="1.987" fill="#FFE14F" rx="18.75"/><path fill="#FFD04C" fillRule="evenodd" d="M1.843 18.862a18.974 18.974 0 0 0-.093 1.875c0 10.355 8.395 18.75 18.75 18.75s18.75-8.395 18.75-18.75c0-.633-.031-1.258-.093-1.875-.94 9.475-8.934 16.875-18.657 16.875s-17.717-7.4-18.657-16.875Z" clipRule="evenodd"/><circle cx="7.375" cy="21.362" r="3.125" fill="#FF759B" fillOpacity=".2"/><circle cx="33.625" cy="21.362" r="3.125" fill="#FF759B" fillOpacity=".2"/><path fill="#52565F" fillRule="evenodd" d="M15.105 24.551a1.25 1.25 0 0 1 1.58.79c.504 1.51 1.86 2.896 3.815 2.896 1.955 0 3.311-1.386 3.814-2.895a1.25 1.25 0 1 1 2.372.79c-.747 2.241-2.878 4.605-6.186 4.605s-5.439-2.364-6.186-4.605a1.25 1.25 0 0 1 .79-1.581Z" clipRule="evenodd"/><circle cx="14.25" cy="16.987" r="2.5" fill="#52565F"/><circle cx="26.75" cy="16.987" r="2.5" fill="#52565F"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" fill="none"><rect width="37.5" height="37.5" x="1.75" y="1.987" fill="#FFE14F" rx="18.75"/><path fill="#FFD04C" fillRule="evenodd" d="M1.843 18.862a18.974 18.974 0 0 0-.093 1.875c0 10.355 8.395 18.75 18.75 18.75s18.75-8.395 18.75-18.75c0-.633-.031-1.258-.093-1.875-.94 9.475-8.934 16.875-18.657 16.875s-17.717-7.4-18.657-16.875Z" clipRule="evenodd"/><circle cx="14.25" cy="16.987" r="2.5" fill="#52565F"/><circle cx="26.75" cy="16.987" r="2.5" fill="#52565F"/><path fill="#52565F" fillRule="evenodd" d="M13 26.987c0-.69.56-1.25 1.25-1.25h12.5a1.25 1.25 0 1 1 0 2.5h-12.5c-.69 0-1.25-.56-1.25-1.25Z" clipRule="evenodd"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" fill="none"><rect width="37.5" height="37.5" x="1.75" y="1.987" fill="#FFE14F" rx="18.75"/><path fill="#FFD04C" fillRule="evenodd" d="M1.843 18.862a18.974 18.974 0 0 0-.093 1.875c0 10.355 8.395 18.75 18.75 18.75s18.75-8.395 18.75-18.75c0-.633-.031-1.258-.093-1.875-.94 9.475-8.934 16.875-18.657 16.875s-17.717-7.4-18.657-16.875Z" clipRule="evenodd"/><path fill="#52565F" fillRule="evenodd" d="M16.31 26.907a1.25 1.25 0 0 0 1.61-.731c.31-.824 1.19-1.69 2.58-1.69 1.39 0 2.27.866 2.58 1.69a1.25 1.25 0 0 0 2.34-.878c-.628-1.676-2.362-3.311-4.92-3.311s-4.292 1.635-4.92 3.311a1.25 1.25 0 0 0 .73 1.61Z" clipRule="evenodd"/><path fill="#9FCBF6" fillRule="evenodd" d="M14.25 38.42a18.795 18.795 0 0 1-8.75-6.431V18.306h6.25l2.5-1.32V38.42ZM26.75 38.42a18.795 18.795 0 0 0 8.75-6.431V18.306h-6.25l-2.5-1.32V38.42Z" clipRule="evenodd"/><path fill="#52565F" fillRule="evenodd" d="M14.809 14.619a1.25 1.25 0 0 1 .559 1.677l-.559 1.118a3.75 3.75 0 0 1-3.354 2.073H6.75a1.25 1.25 0 0 1 0-2.5h4.705a1.25 1.25 0 0 0 1.118-.691l.559-1.118a1.25 1.25 0 0 1 1.677-.56ZM26.191 14.619a1.25 1.25 0 0 0-.559 1.677l.559 1.118a3.75 3.75 0 0 0 3.354 2.073h4.705a1.25 1.25 0 0 0 0-2.5h-4.705a1.25 1.25 0 0 1-1.118-.691l-.559-1.118a1.25 1.25 0 0 0-1.677-.56Z" clipRule="evenodd"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" fill="none"><path fill="#FF2D67" d="M1.75 20.737c0-10.355 8.395-18.75 18.75-18.75s18.75 8.395 18.75 18.75-8.395 18.75-18.75 18.75-18.75-8.395-18.75-18.75Z"/><path fill="#F70044" fillRule="evenodd" d="M1.843 18.862a18.974 18.974 0 0 0-.093 1.875c0 10.355 8.395 18.75 18.75 18.75s18.75-8.395 18.75-18.75c0-.633-.031-1.258-.093-1.875-.94 9.475-8.934 16.875-18.657 16.875s-17.717-7.4-18.657-16.875Z" clipRule="evenodd"/><path fill="#000" fillRule="evenodd" d="M9.5 12.487a1.25 1.25 0 0 1 1.75-.25l5 3.75a1.25 1.25 0 0 1-.447 2.213l-5 1.25a1.25 1.25 0 0 1-.606-2.426l2.452-.613-2.9-2.174a1.25 1.25 0 0 1-.25-1.75ZM31.5 12.487a1.25 1.25 0 0 0-1.75-.25l-5 3.75a1.25 1.25 0 0 0 .447 2.213l5 1.25a1.25 1.25 0 0 0 .606-2.426l-2.452-.613 2.9-2.174a1.25 1.25 0 0 0 .25-1.75ZM13 23.97l3.75 3.75 3.75-3.75 3.75 3.75L28 23.97l4.634 4.633a1.25 1.25 0 0 1-1.768 1.768L28 27.505l-3.75 3.75-3.75-3.75-3.75 3.75-3.75-3.75-2.866 2.866a1.25 1.25 0 0 1-1.768-1.768L13 23.969Z" clipRule="evenodd"/><path fill="#CA0038" fillRule="evenodd" d="M24.645 9.551a1.25 1.25 0 0 1 .79 1.581l-1.25 3.75a1.25 1.25 0 0 1-2.371-.79l1.25-3.75a1.25 1.25 0 0 1 1.581-.791ZM16.355 9.551a1.25 1.25 0 0 0-.79 1.581l1.25 3.75a1.25 1.25 0 0 0 2.371-.79l-1.25-3.75a1.25 1.25 0 0 0-1.581-.791Z" clipRule="evenodd"/></svg>
        </div>
    )
}