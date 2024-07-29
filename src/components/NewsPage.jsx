import '../App.css';
import './NewsPage.css'
import './Fixed.css';
import { New } from "./New.jsx"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export function NewsPage(){

    const navigate = useNavigate();


    
    return(
        <div className="full_screen">
            <div className="NewsPage">
                <div className="subHeader">
                    <button onClick={()=>navigate(-1)}>뒤로가기</button>
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