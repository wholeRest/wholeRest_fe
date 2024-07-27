import '../App.css';
import './NewsPage.css'
import './Fixed.css';
import { New } from "./New.jsx"
import { Link } from 'react-router-dom';


export function NewsPage(){




    
    return(
        <div className="full_screen">
            <div className="NewsPage">
                <div className="subHeader">
                    <button><Link to='/home' style={{ textDecoration: "none"}}>뒤로가기</Link></button>
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