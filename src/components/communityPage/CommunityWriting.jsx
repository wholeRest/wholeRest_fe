import React, { useState, useRef, useEffect } from "react";
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
    background-color: #F5F4E;
    padding: 30px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px; 
`;

const BoardName = styled.div`
    width: 100%;
    height: 5%;
    background-color: #FFE14F;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
        font-size: 16px;
        font-family: Pretendard_SemiBold;
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    width: 90%;
    justify-content: space-between; 
    margin-top: -20px;
    position: relative;

    input {
        width: 100%;
        border: none;
        font-size: 15px;
        font-family: Pretendard_ExtraBold, sans-serif; 
        background-color: #F5F4EF;
    }

    input:focus {outline:none;}
`;

const BackBtn = styled.button`
    position: absolute;
    width: 12px;
    height: 12px;
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
    background-color: #ced4da;
    margin: 0 auto;
`;

const TextArea = styled.textarea`
    width: 100%;
    border: none;
    resize: none;
    font-size: 14px;
    font-family: Pretendard_SemiBold, sans-serif; 
    background-color: #F5F4EF;
    overflow: hidden;

    &:focus {
        outline: none;
    }
`;

const CameraBtn = styled.button`
    position: fixed;
    bottom: 110px; 
    left: 230px; 
    width: 34px; 
    height: 34px;
    background: url("src/image/communityPage/cameraImg.png") no-repeat center center;
    background-size: cover; 
    border: none;
    cursor: pointer;
    z-index: 1000;
`;

const SaveBtn = styled.button`
    position: fixed;
    bottom: 110px; 
    right: 230px; 
    width: 75px; 
    height: 34px;
    background-color: #FFE14F;
    border: none;
    border-radius: 50px;
    box-shadow: 0px 5px 4px rgba(182, 182, 182, 0.5);
    cursor: pointer;
    z-index: 1000;

    font-size: 12px;
    font-family: Pretendard_SemiBold, sans-serif; 
`;

const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    text-align: center;
    margin-top: 10px;

    img {
        max-width: 100%;
    }
`;

const DeleteImageButton = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    border-radius: 3px;
    padding: 2px 5px;
    cursor: pointer;
    font-size: 12px;
    font-family: Pretendard_SemiBold;
`;

export function CommunityWriting() {
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const fileInputRef = useRef();
    const textAreaRef = useRef();

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "100px";
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [content]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const insertImageToContent = () => {
        if (image) {
            const imgTag = `<img src="${image}" alt="selected" style="max-width: 100%;" />`;
            setContent(content + imgTag);
            setImage(null); 
        }
    };

    const removeImage = () => {
        setImage(null);
    };

    return (
        <CommunityWritingBox>
            <BoardName>
                <BackBtn onClick={() => alert("Back button clicked")} />
                <p>00 게시판</p>
            </BoardName>
            <WritingBox>
                <Header>
                    <input type="text" placeholder="■ 제목을 입력해 주세요." /> 
                </Header>
                <Divider />
                <TextArea
                    ref={textAreaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="■ 내용을 입력해 주세요."
                />
                {image && (
                    <ImageContainer>
                        <img src={image} alt="selected" />
                        <DeleteImageButton onClick={removeImage}>삭제</DeleteImageButton>
                    </ImageContainer>
                )}
            </WritingBox>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/*"
            />
            <CameraBtn onClick={() => fileInputRef.current.click()}></CameraBtn>
            <SaveBtn onClick={insertImageToContent}>완료</SaveBtn>
        </CommunityWritingBox>
    );
}
