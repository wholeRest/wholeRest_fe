//import { Header } from "../Header"
//import { Footer } from "../Footer"
import { Add } from "../Add"
import './HomePage.css'
import { Fortune } from "./Fortune.jsx" 
import { Thnumnail } from "../Thumnail"

import { useState } from "react"


export function HomePage(){
  const [cookie, setCookie] = useState(0);

    return(
      <div className="screen_main">
        <div className='homePage'>
          

          <Add />

          

          <div className="bannerDiv2">
            <div className="banner2">
              <p id='ex'>Banner2</p>
              {/* 배너 누르면 사용 설명 팝업이나 페이지 이동 */}


            </div>
          </div>

          <Fortune cookie={cookie} setCookie={setCookie}  />

          <div className='homePage_contents'>
            <div className='homePage_popularcontents'>
              <svg className='homePage_popularcontents_title'  xmlns="http://www.w3.org/2000/svg" width="92" height="22" fill="none"><path fill="#FF7979" d="m11.045 2.249-1.199 2.45a17.185 17.185 0 0 1-3.395 4.708l-.158.148a4.672 4.672 0 0 0-1.417 3.299v.158a6.003 6.003 0 0 0 3.675 5.59l.227.097a5.898 5.898 0 0 0 4.612 0h.052a6.125 6.125 0 0 0 3.684-5.696V9.205a7.552 7.552 0 0 1-3.841 3.868h-.053c-.052 0-.665.253-.927 0a.665.665 0 0 1-.053-.875l.061-.044h.044a4.76 4.76 0 0 0 1.068-6.449 110.792 110.792 0 0 0-2.38-3.456Z"/><path fill="#40300E" d="M27.204 12.707H28.8v2.532h-1.596v-2.532Zm.804-5.688c2.376 0 4.152 1.212 4.152 3.06 0 1.872-1.776 3.072-4.152 3.072-2.376 0-4.152-1.2-4.152-3.072 0-1.848 1.776-3.06 4.152-3.06Zm0 1.26c-1.524 0-2.58.672-2.58 1.8 0 1.152 1.056 1.812 2.58 1.812s2.58-.66 2.58-1.812c0-1.128-1.056-1.8-2.58-1.8Zm-5.016 6.708h10.056v1.296H22.992v-1.296Zm12.275-6.312h7.668v1.26h-7.668v-1.26Zm-1.248 1.98h10.068v1.26H34.02v-1.26Zm1.248-4.08h1.584v2.772h-1.584V6.575Zm-.108 6.012h7.74v2.952h-6.132v.984h-1.596v-2.112h6.132v-.624H35.16v-1.2Zm.012 3.648h8.052v1.212h-8.052v-1.212Zm13.463-9.048c1.752 0 3.06 1.14 3.06 2.736 0 1.608-1.308 2.748-3.06 2.748-1.74 0-3.072-1.14-3.072-2.748 0-1.596 1.332-2.736 3.072-2.736Zm0 1.368c-.852 0-1.5.504-1.5 1.368 0 .876.648 1.38 1.5 1.38s1.5-.504 1.5-1.38c0-.864-.648-1.368-1.5-1.368Zm4.104-2.112h1.596v11.148h-1.596V6.443Zm-7.44 8.892-.192-1.284c1.956 0 4.68-.024 7.02-.372l.12 1.152c-2.412.48-5.028.504-6.948.504Zm21.138-8.868h1.608v7.98h-1.608v-7.98Zm-5.796 9.636h7.68v1.272h-7.68v-1.272Zm0-2.46h1.596v2.976H60.64v-2.976Zm1.356-6.48c1.704 0 3.012 1.176 3.012 2.82 0 1.632-1.308 2.82-3.012 2.82s-3.024-1.188-3.024-2.82c0-1.644 1.32-2.82 3.024-2.82Zm0 1.38c-.828 0-1.464.528-1.464 1.44 0 .9.636 1.428 1.464 1.428.816 0 1.452-.528 1.452-1.428 0-.912-.636-1.44-1.452-1.44ZM77.5 6.455h1.608v11.112H77.5V6.455Zm-3.276 1.152h1.584c0 3.396-1.152 6.18-5.1 8.088l-.828-1.272c3.192-1.536 4.344-3.552 4.344-6.528v-.288Zm-3.756 0h4.512v1.26h-4.512v-1.26Zm11.651-.708h7.044v1.26h-7.044v-1.26Zm-1.224 3.468H90.95v1.26H80.894v-1.26Zm7.308-3.468h1.572v.756c0 .792 0 1.8-.288 3.084l-1.572-.144c.288-1.26.288-2.16.288-2.94v-.756Zm-6.192 5.484h7.728v3.132h-6.12v1.128h-1.596v-2.304h6.132v-.72H82.01v-1.236Zm.012 3.876h8.004v1.236h-8.004v-1.236Z"/></svg>
            
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