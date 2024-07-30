import './Unregister.css';
import '../Find.css';
import { Link } from 'react-router-dom';



export function Unregister_1_popup(props){

    return(
        <div className="unregisterPopupDiv">
            <div className="unregisterPopup">
            <div className="unregisterPopup_text">
                <p>정말 탈퇴를</p>
                <p>진행하시겠습니까?</p>
            </div>
            <div className="unregister_submitBtn">
                <button onClick={()=>{props.setUnregisterPopupOpen(false);}}
                 style={{backgroundColor: '#E0E0E0'}}>아니요</button>
                <button><Link to='/unregister2' style={{ textDecoration: "none"}}>네</Link></button>
            </div>
            </div>
            
        </div>
    )
}




