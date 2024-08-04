import styled from "styled-components";

// 스타일 정의
const CommunityWritingBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #F5F4EF;
    width: 100vw;
    height: 50vw;
    max-width: 386px;
    min-height: 100vh;
    padding-bottom: 15vh;
    margin: 0 auto;
`;

const WritingBox = styled.div`
    width: 95%;
    max-width: 395px;
    height: 100%;
    background-color: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0px 5px 4px rgba(182, 182, 182, 0.5);
    padding: 30px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px; 
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    width: 95%;
    justify-content: space-between; 

    input {
        width: 100%;
        border: none;
        font-size: 15px;
        font-family: Pretendard, sans-serif; // 기본 폰트 설정
    }

    input:focus {outline:none;}
`;

const DeleteBtn = styled.button`
    background: url("/images/comunityPage/deleteImg.png") no-repeat center center; 
    background-size: cover; 
    width: 27px;
    height: 27px;
    border: none;
    cursor: pointer;
    margin-right: -15px;
`;

const Divider = styled.div`
    width: 100%;
    height: 0.5px;
    background-color: #ced4da;
    margin: 0 auto;
`;

const Content = styled.textarea`
    width: 100%;
    height: 100%;
    border: none;
    resize: none;
    font-size: 15px;
    font-family: Pretendard, sans-serif; // 기본 폰트 설정
    background: url("/images/comunityPage/writingBackImg.png") no-repeat center center; 
    background-size: 218px 219px;

    &:focus {
        outline: none;
    }
`;

const CameraBtn = styled.button`
    position: fixed;
    bottom: 110px; 
    right: 20px; // 상대적 위치로 수정
    width: 30px; 
    height: 30px;
    background: url("/images/comunityPage/cameraImg.png") no-repeat center center;
    background-size: cover; 
    border: none;
    cursor: pointer;
    z-index: 1000;
`;

const SaveBtn = styled.button`
    position: fixed;
    bottom: 120px; 
    left: 20px; // 상대적 위치로 수정
    width: 75px; 
    height: 34px;
    background-color: #FFE14F;
    border: none;
    border-radius: 50px;
    box-shadow: 0px 5px 4px rgba(182, 182, 182, 0.5);
    cursor: pointer;
    z-index: 1000;

    font-size: 12px;
    font-family: Pretendard, sans-serif; // 기본 폰트 설정
`;

export function CommunityWriting() {
    return (
        <CommunityWritingBox>
            <WritingBox>
                <Header>
                    <input type="text" placeholder="■ 제목을 입력해 주세요." /> 
                    <DeleteBtn />
                </Header>
                <Divider />
                <Content placeholder="■ 내용을 입력해 주세요." />  
            </WritingBox>
            <CameraBtn onClick={() => alert("Camera button clicked")} />
            <SaveBtn onClick={() => alert("Save button clicked")}>완료</SaveBtn>
        </CommunityWritingBox>
    );
}
