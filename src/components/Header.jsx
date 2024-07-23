import '../App.css'
import { Link } from 'react-router-dom'

export function Header(){

    return(
      <div className='screen_header'>
        <div className='header'>
            <div className='up'>
              <button className='logo'>
                <Link to='home'>
                  <div className='logoImg'>
                    <div id='logoIcon'></div>
                    <div id='logoText'></div>
                  </div>
                </Link>
              </button>
              <div className='help'>
                <Link to='/news'>
              <svg className='bellIcon' xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none"><path fill="#40300E" fillRule="evenodd" d="M15.042 4.2A6.32 6.32 0 0 0 6.22 9.288l-.263 2.36-.022.197A7.5 7.5 0 0 1 4.87 14.87l-.602 1.004-.016.025c-.277.462-.507.845-.652 1.162-.147.32-.254.667-.17 1.03.066.28.21.536.417.736.268.26.62.346.971.385.346.038.793.038 1.331.038H18.851c.539 0 .985 0 1.331-.038.35-.04.703-.126.971-.385a1.5 1.5 0 0 0 .417-.736c.084-.363-.023-.71-.17-1.03-.145-.317-.375-.7-.652-1.162l-.016-.025-.602-1.004-.101-.17a7.5 7.5 0 0 1-.964-2.854l-.022-.197-.053-.48c-.313.104-.643.17-.985.195l.044.395v.004l.024.206a8.501 8.501 0 0 0 1.198 3.413l.002.003.602 1.003c.297.494.497.83.616 1.09.12.262.112.354.105.386a.5.5 0 0 1-.14.245c-.022.023-.097.077-.384.109-.284.031-.675.032-1.251.032H6.179c-.576 0-.966 0-1.25-.032-.288-.032-.362-.086-.386-.109a.5.5 0 0 1-.139-.245c-.007-.032-.015-.124.105-.386.12-.26.32-.596.616-1.09l.602-1.003.002-.004c.051-.085.08-.131.106-.178a8.5 8.5 0 0 0 1.092-3.234l.024-.206v-.004l.263-2.36a5.32 5.32 0 0 1 7.12-4.407c.2-.294.439-.56.708-.793Zm1.801 1.196a2.091 2.091 0 0 0-.79.631 5.306 5.306 0 0 1 1.73 3.347c.354-.013.685-.114.973-.281a6.301 6.301 0 0 0-1.913-3.697Z" clipRule="evenodd"/><path stroke="#40300E" strokeLinecap="round" d="M9.481 19.173c.179.775.57 1.46 1.117 1.949.545.488 1.214.753 1.902.753s1.357-.265 1.902-.753c.546-.489.939-1.174 1.117-1.95"/><circle cx="17.708" cy="7.292" r="2.083" fill="#40300E"/></svg>
              </Link>
              </div>
            </div>
            <div className='down'>
              <p>날씨정보</p>
            </div>
          </div>
      </div>
        
    )
}