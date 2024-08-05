import styled from "styled-components";

const CommentBox = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #F5F4EF;
    width: 100%;
    margin: 0 auto;  
`;

const Inform = styled.div`
    background-color: #F5F4E;
    display: flex;
    flex-direction: row; 
    align-items: center;
    padding: 5px; 
    gap: 5px;
    margin-bottom: -10px;
`;

const Name = styled.p`
    font-size: 14px;
    font-family: Pretendard_ExtraBold, sans-serif; 
`;

const Etc = styled.p`
    font-size: 11px;
    font-family: Pretendard_SemiBold, sans-serif; 
`; 

const CommentText = styled.p`
    font-size: 10px;
    font-family: Pretendard_SemiBold, sans-serif; 
    padding: 5px;
`; 

const CommentDivider = styled.div`
    width: 100%;
    height: 0.5px;
    background-color: #AFAFAF;
    margin: 0;
`; 

export function Comment({ name, etc, text }) {
    return (
        <CommentBox>
            <CommentDivider />
            <Inform>
                <Name>{name}</Name>
                <Etc>{etc}</Etc>
            </Inform>
            <CommentText>{text}</CommentText>
        </CommentBox>
    );
}






// import styled from "styled-components";

// const CommentBox = styled.div`
//     display: flex;
//     flex-direction: column;
//     background-color: #F5F4EF;
//     width: 100vw;
//     height: 50vw;
//     max-width: 386px;
//     min-height: 100vh;
//     padding-bottom: 15vh;
//     margin: 0 auto;  
// `;

// const Inform = styled.div`
//     width: 100%
//     background-color: #F5F4E;
//     padding: 30px;
//     margin: 10px;
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
// `;

// const Name = styled.p`
//     font-size: 14px;
//     font-family: Pretendard_ExtraBold, sans-serif; 
// `;

// const Etc = styled.p`
//     font-size: 11px;
//     font-family: Pretendard_SemiBold, sans-serif; 
// `; 

// const CommentText = styled.p`
//     font-size: 10px;
//     font-family: Pretendard_SemiBold, sans-serif; 
// `; 

// const CommentDivider = styled.p`
//     width: 1150%;
//     height: 0.5px;
//     background-color: #AFAFAF;
//     margin: 0 auto;
// `; 

// export function Comment(){
//     return(
//         <CommentBox>
//             <Inform>
//                 <Name />
//                 <Etc />
//             </Inform>
//             <CommentText />
//             <CommentDivider />
//         </CommentBox>
//     );
// }
