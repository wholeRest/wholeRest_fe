import '../App.css';
import './Fixed.css';
import { New } from "./New.jsx"


export function NewsPage(){
    return(
        <div className="screen_main">
            <div className="NewsPage">
                <div className="subHeader">
                    <button>뒤로가기</button>
                </div>
                <div className='newslist'>
                    <New />
                    <New />
                    <New />
                    <New />
                    <New />
                    <New />
                    <New />
                    <New />
                    <New />
                    <New />
                </div>
                
            </div>
        </div>
        
    )
}