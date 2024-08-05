import { useNavigate } from 'react-router-dom';
//import { Header } from "../Header"
//import { Footer } from "../Footer"
import { Add } from "../Add"
import './CommunityPage.css'
//import { Cate } from "./Cate"
import { Thnumnail } from "../Thumnail"
import CategoryList from "./CategoryList"
import styled from "styled-components"

const PopBtn = styled.p`
  cursor: pointer;
  font-family: Pretendard_ExtraBold;
  font-size: 14px;  
`;

const LatBtn = styled.p`
  cursor: pointer;
  font-family: Pretendard_ExtraBold;
  font-size: 14px;
`;

const PopBtnImg = styled.img`
  cursor: pointer;
  width: 10%;
  margin-right: 5px;
  opacity: 0.5;
`;

const LatBtnImg = styled.img`
  cursor: pointer;
  width: 15%;
  margin-right: 5px;
`;

const Divider = styled.div`
  width: 50%;
  height: 3px;
  background-color: black;
  margin-top: -1px;
  margin-left: 50%;
`;

export function CommunityBoardLatest(){
    const navigate = useNavigate();

    const handlePopBtnClick = () => {
      navigate('/community/popBoard'); 
    };

    const handleWriteBtnClick = () => {
        navigate('/writing');
      }

    return(
      <div className="screen_main">
        <div className='communityHomePage'>
          
          
          <Add />
          <div className='cate_list'>
            <CategoryList />
          </div>   

          <div className='communityHomePage_contents'>
            <div className='communityHomePage_option'>
              <PopBtn onClick={handlePopBtnClick}><PopBtnImg src="src/image/communityPage/PopBtnImg.png"/>오늘의 인기글</PopBtn>
              <LatBtn><LatBtnImg src="src/image/communityPage/LatBtnImg.png"/>최신글</LatBtn>
            </div>
            <Divider /> 
            <div className='homePage_popular'>
              <ul>
                  <li>
                    <Thnumnail />
                  </li>
                  <li>
                    <Thnumnail />
                  </li>
                  <li>
                    <Thnumnail />
                  </li>
                  <li>
                    <Thnumnail />
                  </li>
                  <li>
                    <Thnumnail />
                  </li>
                  <li>
                    <Thnumnail />
                  </li>
                  <li>
                    <Thnumnail />
                  </li>
                  <li>
                    <Thnumnail />
                  </li>
                  <li>
                    <Thnumnail />
                  </li>
                  <li>
                    <Thnumnail />
                  </li>
                </ul>
            </div>
          </div>

          <button className='writeBtn' onClick={handleWriteBtnClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none"><rect width="50" height="50" fill="#FFE14F" rx="25"/><path fill="#222" d="M30.204 23.796 32 22c.545-.545.818-.818.964-1.112a2 2 0 0 0 0-1.776c-.146-.294-.419-.567-.964-1.112-.545-.545-.818-.818-1.112-.964a2 2 0 0 0-1.776 0c-.294.146-.567.419-1.112.964l-1.819 1.819a10.9 10.9 0 0 0 4.023 3.977Zm-5.477-2.523-6.87 6.87c-.426.426-.638.638-.778.9-.14.26-.199.555-.317 1.145l-.615 3.077c-.066.332-.1.498-.005.593.095.095.26.061.593-.005l3.077-.616c.59-.117.885-.176 1.146-.316.26-.14.473-.352.898-.777l6.89-6.89a12.9 12.9 0 0 1-4.02-3.98Z" clipRule="evenodd"/></svg>
          </button>

        </div>
      </div>
        
    )
}