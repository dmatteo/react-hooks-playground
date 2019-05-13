import React, { useState } from 'react';
import styled from 'styled-components';

export const ToDoItem = ({ idx, value, onRemove, onEdit}) => {
    const [isEditable, setIsEditable] = useState(false);
    const [draft, setDraft] = useState(value);

    const onSaveDraft = () => {
        onEdit(idx, draft);
        setIsEditable(false);
    };

    return (
        <Item>
            {
                isEditable
                    ? (
                        <Content>
                            <Input
                                type="text"
                                value={draft}
                                onChange={e => setDraft(e.target.value)}
                            />
                            <button onClick={onSaveDraft}>Save</button>
                        </Content>
                    )
                    : <Content onClick={() => setIsEditable(true)}>{value}</Content>
            }
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

const Content = styled.div`
    display: flex;
    flex: 1;
    justify-content: space-between;
`;

const RemoveItem = styled.button`
    font-size: 14px;
`;

const Input = styled.input`
    flex: 1;
`;