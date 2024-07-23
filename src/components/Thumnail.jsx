import '../App.css'
import { Link } from 'react-router-dom'
import thumImg from './메모지 패턴_썸네일.png';

export function Thnumnail(){

    return(
        <Link to='/post' id='thum' style={{ textDecoration: "none"}}>
            <div className='Thumnail_content' >
            
            <div className='info'>
                <div className='info_top'>
                    <div className='title'>
                        제목
                    </div>
                    <div className='cate'>
                        | ㅇㅇ게시판
                    </div>
                </div>
                <div className='info_mid'>
                    <p>내용입력하세요</p>
                </div>
                <div className='info_bottom'>
                    <div className='info_bottom_left'>
                        <svg className='good' xmlns="http://www.w3.org/2000/svg" width="11" height="12" fill="none"><path stroke="#FF7979" strokeLinecap="round" d="M3.35 10H1.5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.85a.15.15 0 0 1 .15.15v3.7a.15.15 0 0 1-.15.15ZM3.5 6 4.622 3.33A1 1 0 0 0 4.7 2.94v-1.34a.6.6 0 0 1 .6-.6v0a1.2 1.2 0 0 1 1.2 1.2v3.085M5.533 6h3.603a1 1 0 0 1 .953 1.301l-.947 3a1 1 0 0 1-.954.7H5.924a1 1 0 0 1-.678-.266l-.103-.095a1 1 0 0 0-.678-.265H3.5"/></svg>
                        <p className='good'>1</p>
                        <svg className='respones' xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none"><path fill="#98BB85" d="m.66 3.387-.474-.16.473.16Zm.608 5.13-.353-.354.353.353Zm4.615-.933v-.5.5Zm.209 0 .015.499-.015-.5Zm2.907-2.908.5.015-.5-.015Zm0-.416.5-.016-.5.016ZM6.092 1.353l.015-.5-.015.5Zm-3.556.157.16.474-.16-.474Zm-.629 6.367.354.354-.354-.354Zm.707-.293v-.5.5ZM.504 4.75l-.5-.007.5.007Zm.5.008c.008-.63.042-.954.129-1.21l-.947-.32c-.143.419-.173.886-.182 1.515l1 .015ZM0 4.753V5.6h1v-.848H0ZM0 5.6v1.983h1V5.601H0Zm0 1.983v.614h1v-.614H0Zm0 .614c0 .846 1.023 1.27 1.622.672l-.707-.707a.059.059 0 0 1 .054-.011.059.059 0 0 1 .03.046H.001Zm1.622.672.639-.64-.707-.706-.64.639.708.707Zm4.261-1.786H2.614v1h3.27v-1Zm.193 0a7.228 7.228 0 0 1-.193 0v1l.224-.001-.03-1ZM8.5 4.66a2.5 2.5 0 0 1-2.423 2.422l.03 1A3.5 3.5 0 0 0 9.499 4.69l-1-.03Zm.001-.193-.001.193 1 .03.001-.223h-1Zm-.001-.193.001.193h1c0-.105 0-.168-.002-.224l-1 .03ZM6.076 1.852A2.5 2.5 0 0 1 8.5 4.275l1-.03A3.5 3.5 0 0 0 6.106.852l-.03 1Zm-.193 0h.193l.03-1h-.223v1Zm-1.133 0h1.133v-1H4.75v1Zm-2.054.132c.372-.126.85-.133 2.054-.133v-1c-1.123 0-1.808-.007-2.375.186l.321.947ZM1.133 3.548a2.5 2.5 0 0 1 1.563-1.564l-.321-.947a3.5 3.5 0 0 0-2.19 2.19l.948.32ZM2.26 8.23a.5.5 0 0 1 .353-.147v-1a1.5 1.5 0 0 0-1.06.44l.707.707ZM.5 4.25A.502.502 0 0 0 0 4.753h1a.498.498 0 0 1-.498.498v-1Zm-.497.491a.498.498 0 0 1 .498-.49v1a.502.502 0 0 0 .501-.495l-1-.015Z"/></svg>
                        <p className='respones'>1</p>
                    </div>
                    <div className='info_bottom_right'>
                        <p> 07/20 </p> 
                        <p> | 10:30 </p> 
                        <p> | 익명 </p>
                    </div>
                </div>
            </div>
            <div className='Thumnail_Img'>
                <img id='thumImg' src={thumImg} width='100%' height='100%' />
            </div>
        </div>
        </Link>
    )


}

