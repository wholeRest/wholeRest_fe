import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ToDoListBox = styled.div`
    margin: 15px;
    width: 88%;
    background-color: rgb(255, 225, 56);
    border-radius: 15px 50px 15px 15px;
    box-shadow: 0px 5px 4px rgb(182, 182, 182);
    padding: 20px 5px;
    color: #312626;
`;

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 0px 15px; 
    margin-bottom: 10px;
`;

const Header = styled.div`
    font-size: 15px;
    font-family: Consolas;
    font-weight: bold;
`;

const CheckImage = styled.img`
    width: 30px;
    height: 30px; 
`;

const ListContainer = styled.div`
    padding: 3px 15px;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`;

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
    margin-right: 10px;
    width: 15px;
    height: 15px;
    appearance: none;
    border: 2px solid;
    background-color: rgb(255, 225, 56);
    cursor: pointer;
    outline: none;

      &:checked {
        background-color: #553830; 
        border: 2px solid; 
        position: relative;
    }

    &:checked::after {
        content: '';
        position: absolute;
        top: 40%;
        left: 50%;
        width: 3px;
        height: 10px;
        border: solid 2px white;
        border-width: 0 2px 2px 0;
        transform: translate(-50%, -50%) rotate(45deg);
    }
`;

const ListText = styled.input`
    width: 87%;
    border: none;
    border-bottom: 2px solid;
    font-family: Pretendard_SemiBold; 
    font-size: 14px; 
    background-color: rgb(255, 225, 56);

    &:focus {
        outline: none;
    }
`;

const ToDoList = () => {
    const [todos, setTodos] = useState([
        { todo_id: 1, content: '', complete: false },
        { todo_id: 2, content: '', complete: false }
    ]);

    useEffect(() => {
        axios.get('/api/todo')
            .then(response => {
                setTodos(response.data);
            })
            .catch(error => {
                console.error('Error fetching todos:', error);
            });

        // 00시가 되면 초기화 되도록
        const now = new Date();
        const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const timeUntilMidnight = midnight - now;

        const timer = setTimeout(() => {
            setTodos([]); 
        }, timeUntilMidnight);

        return () => clearTimeout(timer); 
    }, []);

    // 체크 버튼
    const handleCheckBoxChange = (index) => {
        const updatedTodos = todos.map((todo, i) =>
            i === index ? { ...todo, complete: !todo.complete } : todo
        );
        setTodos(updatedTodos);

        axios.put(`/api/todo/${todos[index].todo_id}`, { ...updatedTodos[index] })
            .catch(error => console.error('Error updating todo:', error));
    };

    // 텍스트 인풋
    const handleTextChange = (index, event) => {
        const updatedTodos = todos.map((todo, i) => 
            i === index ? { ...todo, content: event.target.value } : todo 
        );
        setTodos(updatedTodos);

        axios.put(`/api/todo/${todos[index].todo_id}`, { ...updatedTodos[index] })
            .catch(error => console.error('Error updating todo:', error));
    };

    return (
        <ToDoListBox>
            <HeaderContainer>
                <CheckImage src="src/image/myPage/checkImg.png" />
                <Header>TODAY'S TO DO LIST</Header>
            </HeaderContainer>
            {todos.map((todo, index) => (
                <ListContainer key={todo.todo_id}>
                    <CheckBox
                        checked={todo.complete}
                        onChange={() => handleCheckBoxChange(index)}
                    />
                    <ListText 
                        value={todo.content}
                        onChange={(event) => handleTextChange(index, event)}
                    />
                </ListContainer>
            ))}
        </ToDoListBox>
    );
};

export default ToDoList;