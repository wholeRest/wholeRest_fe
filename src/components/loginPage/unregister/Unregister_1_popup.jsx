import './Unregister.css';
import '../Find.css';
import { Link } from 'react-router-dom';
import { authHttp } from '../../../axios/apiUrl';
import { useNavigate } from 'react-router-dom';


export function Unregister_1_popup(props){
    const {password, passwordConfirm} = props;

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();

        authHttp.delete('/api/auth/deleteUser', {
            pw: password,
            pwConfirm: passwordConfirm
        })
        .then(function(response) {
            console.log(password + " 계정이 성공적으로 삭제되었습니다.");
            navigate('/unregister2');
        })
        .catch(function (error) {
            console.log(error);
            console.log(password + "탈퇴 실패");
        });
    }

  


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
                <button onClick={handleSubmit}>네</button>
            </div>
            </div>
            
        </div>
    )
}




