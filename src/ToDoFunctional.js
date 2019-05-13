import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ToDoItem } from './ToDoItem';
import faker from 'faker';

const BORDER_COLOR = '#a1a1a1';

export const ToDoFunctional = () => {
    const [itemsAvailable, setItemsAvailable] = useState(0);
    const [items, setItems] = useState([]);

    useEffect(() => {
        updateSlotsCount();
        window.addEventListener('resize', updateSlotsCount);

        return () => window.removeEventListener('resize', updateSlotsCount);
    }, [])

    const updateSlotsCount = () => {
        const contentHeight = window.innerHeight * 0.8 - 100;
        const elmHeight = 66;
        const itemsAvailable = Math.ceil(contentHeight / elmHeight);
        setItemsAvailable(itemsAvailable);
    };
    const addItem = () => setItems([
        ...items,
        `${faker.commerce.department()} ${faker.company.bsBuzz()} ${faker.commerce.color()} ${faker.commerce.productAdjective()} ${faker.commerce.product()}`
    ]);

    const removeItem = (idx) => setItems([
        ...items.slice(0, idx),
        ...items.slice(idx + 1)
    ]);

    return (
        <Container>
            <Header>Todo List (available space: {itemsAvailable} items)</Header>
            <Content>
                <div>
                    {items.map((item, idx) => {
                        return (
                            <ToDoItem
                                key={idx}
                                idx={idx}
                                value={item}
                                onRemove={removeItem}
                            />
                        )
                    })}
                </div>
                <AddItem onClick={addItem}>Add Item</AddItem>
            </Content>
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 80vw;
    height: 80vh;
    background: #cfcfcf;
    border: solid 1px ${BORDER_COLOR};
    box-shadow: #8a8a8a 4px 4px 8px 0px;
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    color: #333;
    font-size: 20px;
    font-weight: bold;
    background: white;
    border-bottom: solid 1px ${BORDER_COLOR};
`;

const Content = styled.main`
    display: flex;
    flex-direction: column;
    overflow: scroll;
    justify-content: space-between;
    flex: 1;
`;

const AddItem = styled.button`
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;
`;
