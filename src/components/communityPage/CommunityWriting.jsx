import styled from "styled-components";

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
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0px 5px 4px rgb(182, 182, 182);
    padding: 30px 30px;
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
        font-family: Pretendard_SemiBold;
    }

    input:focus {outline:none;}
`;

const DeleteBtn = styled.button`
    background: url("src/image/comunityPage/deleteImg.png") no-repeat center center; 
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
    font-family: Pretendard_SemiBold;
    background: url("src/image/comunityPage/writingBackImg.png") no-repeat center center; 
    background-size: 218px 219px;

    &:focus {
        outline: none;
    }
`;

const CameraBtn = styled.button`
    position: fixed;
    bottom: 110px; 
    right: 640px; 
    width: 30px; 
    height: 30px;
    background: url("src/image/comunityPage/cameraImg.png") no-repeat center center;
    background-size: cover; 
    border: none;
    cursor: pointer;
    z-index: 1000;
`;

const SaveBtn = styled.button`
    position: fixed;
    bottom: 120px; 
    left: 590px; 
    width: 75px; 
    height: 34px;
    background-color: #FFE14F;
    background-size: cover; 
    border: none;
    border-radius: 50px;
    box-shadow: 0px 5px 4px rgb(182, 182, 182);
    cursor: pointer;
    z-index: 1000;

    font-size: 12px;
    font-color: #513D18;
    font-family: Pretendard_SemiBold;
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
                <Content type="text" placeholder="■ 내용을 입력해 주세요." />  
            </WritingBox>
            <CameraBtn onClick={() => alert("Camera button clicked")} />
            <SaveBtn onClick={() => alert("Save button clicked")}>완료</SaveBtn>
        </CommunityWritingBox>
    );
}
