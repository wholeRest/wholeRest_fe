import { Header } from "../Header"
import { Footer } from "../Footer"
import { Add } from "../Add"
import './HomePage.css'
import { Thnumnail } from "../Thumnail"

export function HomePage(){

    return(
      <div className="screen_main">
        <div className='homePage'>
          

          <Add />

          <div className="bannerDiv1">
            <div className="banner1">
              <p id='ex'>Banner1</p>
            </div>
            <div className="banner1_num">
              . . .
            </div>
          </div>

          <div className="bannerDiv2">
            <div className="banner2">
              <p id='ex'>Banner2</p>
            </div>
          </div>

          <div className='homePage_contents'>
            <div className='homePage_popularcontents'>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="18" fill="none"><path fill="#FF7979" d="M6.545.75 5.346 3.2a17.185 17.185 0 0 1-3.395 4.707l-.158.15a4.672 4.672 0 0 0-1.417 3.298v.157a6.003 6.003 0 0 0 3.675 5.592l.227.096a5.898 5.898 0 0 0 4.612 0h.052a6.125 6.125 0 0 0 3.684-5.696V7.706a7.551 7.551 0 0 1-3.841 3.868h-.053c-.052 0-.665.254-.927 0a.665.665 0 0 1-.053-.875l.061-.044h.044a4.76 4.76 0 0 0 1.068-6.449C7.787 2.474 6.545.75 6.545.75Z"/></svg>
              <p>오늘의 인기글</p>
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
                

                
                  
              </ul>
            </div>
          </div>

          
        </div>
      </div>
        
    )
}