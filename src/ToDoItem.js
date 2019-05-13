import React from 'react';
import styled from 'styled-components';

export const ToDoItem = ({ idx, value, onRemove, onEdit}) => {
    return (
        <Item>
            <span>{value}</span>
            <RemoveItem onClick={() => onRemove(idx)}>X</RemoveItem>
        </Item>
    )
};

const Item = styled.article`
    display: flex;
    justify-content: space-between;
    margin: 16px 17px;
    background: white;
    padding: 13px 18px;
    box-shadow: grey 3px 3px 6px 0px;
`;

const RemoveItem = styled.button`
    font-size: 14px;
`;