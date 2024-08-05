import './MyInfoPage.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';



export function MyInfoPage(){

    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.removeItem('access');
        navigate('/');
    }





    return(
        <div className="screen_main">
            <div className='MyInfoPage'>    
                <div className='profile'>
                    <div className='myProfile'>
                        <div className='myprofile_info'>
                            <div id='profileImg'>

                            </div>
                            <div className='my'>
                                <p className='myName'>김네모</p>
                                <p className='myNum'>010-2342-1839</p>
                            </div>
                        </div>
                        <div className='myprofile_manage'>
                        <button className='manageBtn'>관리</button>
                        </div>
                        
                    </div>
                    <div className='number'>
                        <p className='mynumber'>010-2294-3949</p>
                        <p className='numberQ'>아직 이 번호를 사용하시나요?</p>

                        <div className='number_optionBtn'>
                            <button className='numberBtn'>
                                유지하기
                            </button>
                            <button className='numberBtn'>
                                변경하기
                            </button>
                        </div>
                    </div>
                </div>

                <div className='MyInfoPage_menu'>
                    <p className='MyInfoPage_menu_Cate'>계정</p>
                    <button>아이디</button>
                    <button>비밀번호 변경</button>
                    <button><Link to='/email1' style={{ textDecoration: "none"}}>이메일 변경</Link></button>
                </div>

                <div className='MyInfoPage_menu'>
                    <p className='MyInfoPage_menu_Cate'>커뮤니티</p>
                    <button>이용 제한 내역</button>
                    <button>커뮤니티 이용규칙</button>
                    <button>내가 쓴 글</button>
                    <button>내가 단 댓글</button>
                </div>

                <div className='MyInfoPage_menu'>
                    <p className='MyInfoPage_menu_Cate'>앱 설정</p>
                    <button>암호 잠금</button>
                    <button>암림 설정</button>
                    <button></button>
                </div>

                <div className='MyInfoPage_menu'>
                    <p className='MyInfoPage_menu_Cate'>이용 안내</p>
                    <button>앱 버전</button>
                    <button>문의하기</button>
                    <button>공지사항</button>
                    <button>서비스 이용약관</button>
                    <button>개인정보 처리방침</button>
                </div>

                <div className='MyInfoPage_menu'>
                    <p className='MyInfoPage_menu_Cate'>기타</p>
                    <button>정보 동의 설정</button>
                    <button><Link to='/unregister1' style={{ textDecoration: "none"}}>회원 탈퇴</Link></button>
                    <button onClick={logout}>로그아웃</button>
                </div>
                
            </div>
        </div>
        
    )
}


