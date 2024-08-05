import styled from "styled-components";
import { Comment } from "./Comment";
import { Footer } from "./Footer"; 
import { Header } from "./Header";

const CommunityPostBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #F5F4EF;
    width: 100vw;
    max-width: 386px;
    min-height: 100vh;
    padding-bottom: 15vh;
    margin: 0 auto;
`;

const PostBox = styled.div`
    width: 95%;
    max-width: 395px;
    height: 100%;
    background-color: #F5F4E;
    padding: 30px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px; 
`;

const BoardName = styled.div`
    width: 100%;
    height: 36px;
    background-color: #FFE14F;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
        font-size: 15px;
        font-family: Pretendard_SemiBold;
    }
`;

const Title = styled.p`
    display: flex;
    width: 100%;
    margin-top: -20px;
    margin-bottom: 5px;
    position: relative;
    font-size: 13px;
    font-family: Pretendard_ExtraBold, sans-serif; 
    color: #66593E;
    background-color: #F5F4EF;
`;

const BackBtn = styled.button`
    position: absolute;
    width: 15px;
    height: 15px;
    background: url("src/image/communityPage/backImg.png") no-repeat center center;
    background-size: contain;
    border: none;
    cursor: pointer;
    z-index: 1000;
    padding: 0;  
    box-sizing: border-box;
    margin-left: -340px;  
`;

const Divider = styled.div`
    width: 100%;
    height: 0.5px;
    background-color: #AFAFAF;
    margin: auto;
`;

const Infor = styled.p`
    width: 100%;
    font-size: 10px;
    font-family: Pretendard_SemiBold, sans-serif; 
    color: #757575;
    background-color: #F5F4EF;
    margin-bottom: -3px;
`;

const Text = styled.p`
    width: 100%;
    font-size: 13px;
    font-family: Pretendard_SemiBold, sans-serif; 
    color: #66593E;
    background-color: #F5F4EF;
`;

const PostImg = styled.img`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CommentBtn = styled.div`
    display: flex;
    flex-direction: row; 
    align-items: center;
    padding: 5px; 
    gap: 5px;
    background-color: #F5F4EF;
`;

const LikeImg = styled.button`
    width: 17px; 
    height: 17px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    background: url("src/image/communityPage/likeImg.png") no-repeat center;
    background-size: contain;
`;

const LikeNum = styled.p`
    font-size: 16px;
    font-family: Pretendard_SemiBold, sans-serif; 
    color: #FF7979;
    margin-left: 3px;
    margin-right: 12px;
`;

const CommentImg = styled.img`
    width: 17px;    
`;

const CommentNum = styled.p`
    font-size: 16px;
    font-family: Pretendard_SemiBold, sans-serif; 
    color: #98BB85;
`;

const CommentDivider = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 0.5px;
    background-color: #AFAFAF;
    margin-bottom: 20px;
`;

const CommentInput = styled.input`
    width: 100%;
    color: #66593E;
    font-size: 14px;
    background-color: #F5F4EF;
    border: none;
    font-family: Pretendard_SemiBold, sans-serif; 
`;

const EnterImg = styled.button`

`;

export function Post() {
    return (
        <>
        <Header />
        <CommunityPostBox>
            <BoardName>
                <BackBtn onClick={() => alert("Back button clicked")} />
                <p>00 게시판</p>
            </BoardName>
            <PostBox>
                <Title>
                    제목 
                </Title>
                <Divider />
                <Infor>
                    0/00 | 00:00 | 익명
                </Infor>
                <Text>
                    내용
                </Text>
                <PostImg src="src/image/communityPage/RectangleImg.png" alt="Post Image" />
                <CommentBtn>
                    <LikeImg />
                    <LikeNum>000</LikeNum>
                    <CommentImg src="src/image/communityPage/commentImg.png" alt="Comment Icon" />
                    <CommentNum>000</CommentNum>
                </CommentBtn>
            </PostBox>
            <Comment name="익명1" etc="0/00 | 00:00" text="댓글 내용1" />
            <Comment name="익명2" etc="0/00 | 00:00" text="댓글 내용2" />
            <Comment name="익명3" etc="0/00 | 00:00" text="댓글 내용3" />

            <CommentDivider />
            <CommentInput placeholder="댓글을 입력하세요.">
                {/* <EnterImg /> */}
            </CommentInput>
        </CommunityPostBox>
        <Footer />
        </>
    );
}














// import styled from "styled-components";
// import { Comment } from "./Comment";

// const CommunityPostBox = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     background-color: #F5F4EF;
//     width: 100vw;
//     height: 50vw;
//     max-width: 386px;
//     min-height: 100vh;
//     padding-bottom: 15vh;
//     margin: 0 auto;
// `;

// const PostBox = styled.div`
//     width: 95%;
//     max-width: 395px;
//     height: 100%;
//     background-color: #F5F4E;
//     padding: 30px;
//     margin: 10px;
//     display: flex;
//     flex-direction: column;
//     gap: 10px; 
// `;

// const BoardName = styled.div`
//     width: 100%;
//     height: 5%;
//     background-color: #FFE14F;
//     display: flex;
//     justify-content: center;
//     align-items: center;

//     p {
//         font-size: 16px;
//         font-family: Pretendard_SemiBold;
//     }
// `;

// const Header = styled.p`
//     display: flex;
//     width: 100%;
//     margin-top: -20px;
//     position: relative;
//     font-size: 15px;
//     font-family: Pretendard_ExtraBold, sans-serif; 
//     background-color: #F5F4EF;
// `;

// const BackBtn = styled.button`
//     position: absolute;
//     width: 12px;
//     height: 12px;
//     background: url("src/image/communityPage/backImg.png") no-repeat center center;
//     background-size: contain;
//     border: none;
//     cursor: pointer;
//     z-index: 1000;
//     padding: 0;  
//     box-sizing: border-box;
//     margin-left: -340px;  
// `;

// const Divider = styled.div`
//     width: 100%;
//     height: 0.5px;
//     background-color: #ced4da;
//     margin: 0 auto;
// `;

// const Infor = styled.p`
//     width: 100%;
//     font-size: 10px;
//     font-family: Pretendard_SemiBold, sans-serif; 
//     background-color: #F5F4EF;
// `;

// const Text = styled.p`
//     width: 100%;
//     font-size: 14px;
//     font-family: Pretendard_SemiBold, sans-serif; 
//     background-color: #F5F4EF;
// `;

// const PostImg = styled.img`
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
// `;

// const CommentBtn = styled.div`
//   display: flex;
//   flex-direction: row; 
//   align-items: center;
//   padding: 10px; 
//   gap: 5px;
//   background-color: #F5F4EF;
// `;

// const LikeImg = styled.button`
//     width: 15px; 
//     height: 15px;
//     background-color: transparent;
//     border: none;
//     cursor: pointer;
//     background: url("src/image/communityPage/likeImg.png") no-repeat center;
//     background-size: contain;
// `;

// const LikeNum = styled.p`
//     font-size: 15px;
//     font-family: Pretendard_SemiBold, sans-serif; 
//     color: #FF7979;
// `;

// const CommentImg = styled.img`
//     width: 15px; 
//     height: 13.5px;
// `;

// const CommentNum = styled.p`
//     font-size: 15px;
//     font-family: Pretendard_SemiBold, sans-serif; 
//     color: #98BB85;
// `;

// const CommentDivider = styled.div`
//     width: 100%;
//     height: 0.5px;
//     background-color: #AFAFAF;
//     margin: 0 auto;
// `;

// export function Post() {
//     return (
//         <CommunityPostBox>
//             <BoardName>
//                 <BackBtn onClick={() => alert("Back button clicked")} />
//                 <p>00 게시판</p>
//             </BoardName>
//             <PostBox>
//                 <Header>
//                     제목 
//                 </Header>
//                 <Divider />
//                 <Infor>
//                     0/00 | 00:00 | 익명
//                 </Infor>
//                 <Text>
//                     내용
//                 </Text>
//                 <PostImg src="src/image/communityPage/RectangleImg.png" />
//                 <CommentBtn>
//                     <LikeImg />
//                     <LikeNum>000</LikeNum>
//                     <CommentImg src="src/image/communityPage/commentImg.png" />
//                     <CommentNum>000</CommentNum>
//                 </CommentBtn>
//             </PostBox>
//             <CommentDivider />
//             {/* <Comment />
//             <Comment />
//             <Comment />
//             <Comment />
//             <Comment />
//             <Comment /> */}
//         </CommunityPostBox>
//     )
// }

