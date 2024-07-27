import { Link } from 'react-router-dom'
import './LoginPage.css'


export function SocialLoginBox(){

    return(
        <div className='loginPage_socialLogin'>
            <div className='loginPage_social_option'>
                <button className="naverLoginBtn">
                    <div className="sociallogin_iconBack" id="naverIconBack">
                        <svg id="naverIconBack" xmlns="http://www.w3.org/2000/svg" width="13" height="15" fill="none"><path fill="#fff" d="M12.625 15H9.52L4.266 7.363h-.098V15H.457V.86h3.164l5.176 7.597h.117V.859h3.711V15Z"/></svg>
                    </div>
                    NAVER로 로그인
                    </button>
                <button className="googleLoginBtn">
                    <div className="sociallogin_iconBack">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill="#4285F4" d="M22.501 12.233c0-.863-.071-1.493-.226-2.147h-10.06v3.897h5.905c-.119.968-.762 2.427-2.19 3.407l-.02.13 3.18 2.415.22.021c2.024-1.831 3.191-4.526 3.191-7.723Z"/><path fill="#34A853" d="M12.215 22.5c2.893 0 5.321-.933 7.095-2.543l-3.381-2.567c-.905.618-2.12 1.05-3.714 1.05a6.438 6.438 0 0 1-6.096-4.363l-.125.01-3.307 2.508-.044.118c1.762 3.43 5.381 5.787 9.572 5.787Z"/><path fill="#FBBC05" d="M6.12 14.077A6.347 6.347 0 0 1 5.763 12c0-.723.13-1.423.345-2.077l-.006-.139-3.349-2.548-.11.05A10.339 10.339 0 0 0 1.502 12c0 1.692.417 3.29 1.143 4.713l3.476-2.636Z"/><path fill="#EB4335" d="M12.215 5.56c2.012 0 3.369.852 4.143 1.563L19.38 4.23c-1.857-1.692-4.274-2.73-7.166-2.73-4.19 0-7.81 2.357-9.572 5.787l3.465 2.636a6.465 6.465 0 0 1 6.107-4.363Z"/></svg>
                    </div>
                    GOOGLE로 로그인
                    </button>
            </div>
            
        </div>
    )
}