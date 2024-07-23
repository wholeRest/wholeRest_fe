import { Header } from "../Header"
import { Footer } from "../Footer"
import { Add } from "../Add"
import './ComunityPage.css'
import { Cate } from "./Cate"
import { Thnumnail } from "../Thumnail"


export function ComunityPage(){

 

    return(
      <div className="screen_main">
        <div className='comunityHomePage'>
          
          
          <Add />
          
          <div className='comunityHomePage_CategoryBox'>
            <div  className="CategoryBox_row">
              <Cate />
              <Cate />
              <Cate />
              <Cate />
              <Cate />
              <Cate />
            </div>
            <div  className="CategoryBox_row">
              <Cate />
              <Cate />
              <Cate />
              <Cate />
              <Cate />
              <Cate />
            </div>
            
          </div>

          <div className='comunityHomePage_contents'>
            <div className='comunityHomePage_option'>
              <button>이번주 인기글</button>
              <button>최신글</button>
            </div>
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
                </ul>
            </div>
          </div>

          <button className='writeBtn'>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none"><rect width="50" height="50" fill="#FFE14F" rx="25"/><path fill="#222" fill-rule="evenodd" d="M30.204 23.796 32 22c.545-.545.818-.818.964-1.112a2 2 0 0 0 0-1.776c-.146-.294-.419-.567-.964-1.112-.545-.545-.818-.818-1.112-.964a2 2 0 0 0-1.776 0c-.294.146-.567.419-1.112.964l-1.819 1.819a10.9 10.9 0 0 0 4.023 3.977Zm-5.477-2.523-6.87 6.87c-.426.426-.638.638-.778.9-.14.26-.199.555-.317 1.145l-.615 3.077c-.066.332-.1.498-.005.593.095.095.26.061.593-.005l3.077-.616c.59-.117.885-.176 1.146-.316.26-.14.473-.352.898-.777l6.89-6.89a12.9 12.9 0 0 1-4.02-3.98Z" clipRule="evenodd"/></svg>
          </button>

        </div>
      </div>
        
    )
}