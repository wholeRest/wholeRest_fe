// src/components/RootRouter.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {RootLayout_after, RootLayout_MyInfo} from './RootLayout';
//import ErrorPage from './ErrorPage';
import { LoginPage } from '../components/loginPage/LoginPage';
import { HomePage } from '../components/homePage/HomePage';
import { MyPage } from '../components/myPage/MyPage';
import { ComunityPagePopularity } from '../components/comunityPage/ComunityPagePopularity';
import { ComunityPageLatest } from '../components/comunityPage/ComunityPageLatest';
import { ComunityWriting } from '../components/comunityPage/ComunityWriting';
import { MyInfoPage } from '../components/myInfo/MyInfoPage';

import { IdFindPage } from '../components/loginPage/IdFindPage';
import { PasswordFindPage } from '../components/loginPage/PasswordFindPage';
import { SignUpPage } from '../components/loginPage/SignUpPage';

import { NewsPage } from '../components/NewsPage';

import { CategoryPage } from '../components/comunityPage/CategoryPage';
import { Post } from '../components/Post';

import { Find } from '../components/loginPage/Find';
import { FindLayout } from './FindLayout';
import { IdFind_1 } from '../components/loginPage/idFind/IdFind_1';
import { IdFind_2_false } from '../components/loginPage/idFind/IdFind_2_false';
import { IdFind_2_true } from '../components/loginPage/idFind/IdFind_2_true';

import { PasswordFind_1 } from '../components/loginPage/passwordFind/PasswordFind_1';
import { PasswordFind_2 } from '../components/loginPage/passwordFind/PasswordFind_2';
import { PasswordFind_3 } from '../components/loginPage/passwordFind/PasswordFind_3';
import { PasswordFind_4 } from '../components/loginPage/passwordFind/PasswordFind_4';

import { Email_1 } from '../components/loginPage/email/Email_1';
import { Email_2 } from '../components/loginPage/email/Email_2';


import { SignupPage } from '../components/signupPage/SignupPage';
import { Signup_1 } from '../components/loginPage/signup/Signup_1';
import { Signup_2 } from '../components/loginPage/signup/Signup_2';
import { Signup_3 } from '../components/loginPage/signup/Signup_3';
import { Signup_4 } from '../components/loginPage/signup/Signup_4';

import { Unregister_1 } from '../components/loginPage/unregister/Unregister_1';
import { Unregister_2 } from '../components/loginPage/unregister/Unregister_2';







const router = createBrowserRouter( [
  {
    path: '/',
    
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      
      {
        path: 'find/id',
        element: <IdFindPage />
      },
      {
        path: 'find/id_true',
        element: <IdFind_2_true />,
      },
      {
        path: 'find/id_false',
        element: <IdFind_2_false />,
      },


      {
        path: 'find/password1',
        element: <PasswordFindPage />
      },
      {
        path: 'find/password2',
        element: <PasswordFind_2 />
      },
      {
        path: 'find/password3',
        element: <PasswordFind_3 />
      },
      {
        path: 'find/password4',
        element: <PasswordFind_4 />
      },


      {
        path: 'signup0',
        element: <SignupPage />
      },
      {
        path: 'signup1',
        element: <Signup_1 />
      },
      {
        path: 'signup2',
        element: <Signup_2 />
      },
      {
        path: 'signup3',
        element: <Signup_3 />
      },
      {
        path: 'signup4',
        element: <Signup_4 />
      },
      

      {
        path: 'unregister1',
        element: <Unregister_1 />
      },
      {
        path: 'unregister2',
        element: <Unregister_2 />
      },




      {
        path: 'email1',
        element: <Email_1 />
      },
      {
        path: 'email2',
        element: <Email_2 />
      },
      




      {
        path: 'signup',
        element: <SignUpPage />,
      },
      

      {
        path: 'new',
        element: <NewsPage />,
      },
      {
        path: 'post',
        element: <Post />,
      },
      {
        element: <RootLayout_after />,
        children:[
          {
            path: 'home',
            element: <HomePage />, 
            
          },
          {
            path: 'comunity',

            children:[
              {
                index:true,
                element: <ComunityPagePopularity />,
              },
              {
                path: 'latest',
                element: <ComunityPageLatest />, 
              },
              {
                path: 'category',
                element: <CategoryPage />,
              },
            ]
          },
          {
            path: 'mypage',
            element: <MyPage />,
          },
          
      {
        path: 'writing',
        element: <ComunityWriting />,
      },

          


          
          
        ]
      },
      {
        element: <RootLayout_MyInfo />,
        children:[
          {
            path: 'myInfo',
            element: <MyInfoPage />,
          },
        ]
      },
      
    ],
  },
]);


export const RootRouter = () => {
  return <RouterProvider router={router} />;
};


/*
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
// import { RootLayout } from './RootLayout';
import { LoginPage } from '../components/loginPage/LoginPage';
import { HomePage } from '../components/homePage/HomePage';
import { MyPage } from '../components/myPage/MyPage';
import { ComunityPage } from '../components/comunityPage/ComunityPage' 


// 중첩 라우터 관리

const router= createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <Errorpage />,
        children: [
            {
                index: true,
                element: <LoginPage />,
            },
            {
                path:'home',
                element: <HomePage />,
            },
            {
                path:'comunity',
                element: <ComunityPage />,
            },
            {
                path:'mypage',
                element: <MyPage />,
            },
        ],
    },
]);
*/

/*
export const RootRouter= () => {
    return <RouterProvider router={router} />;
};
*/







/*
// 하나로 관리해주는 라우터


// router 객체 선언부
// path부분의 경로로 들어오면
// element에 있는 페이지로 렌더링.
const router= createBrowserRouter([
    {
        path: '/',
        element: <Homepage />,
    },
    {
        path: '/todolist',
        element: <TodoListpage />,
    },
]);


// router 객체를 컴포넌트로 제공해주기위한 provider
// 객체로 만들어둔 라우터 설정을 파라미터로 받아서 실제로 적용시켜준다. 
export const RootRouter = () => {
    return <RouterProvider router={router} />;
};

*/
