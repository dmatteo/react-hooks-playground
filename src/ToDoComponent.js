import React from 'react';
import styled from 'styled-components';
import { ToDoItem } from './ToDoItem';
import faker from 'faker';

const BORDER_COLOR = '#a1a1a1';

export class ToDoComponent extends React.Component {

    // this.state.items: ['List', 'Of', 'Strings'];
    state = {
        itemsAvailable: 0,
        items: []
    };

    componentDidMount() {
        this.updateSlotsCount();
        window.addEventListener('resize', this.updateSlotsCount);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateSlotsCount);
    }

    updateSlotsCount = () => {
        const contentHeight = window.innerHeight * 0.8 - 100;
        const elmHeight = 66;
        const itemsAvailable = Math.ceil(contentHeight / elmHeight);
        this.setState({ itemsAvailable });

    };

    addItem = () => {
        this.setState(oldState => ({
            items: [
                ...oldState.items,
                `${faker.commerce.department()} ${faker.company.bsBuzz()} ${faker.commerce.color()} ${faker.commerce.productAdjective()} ${faker.commerce.product()}`
            ]
        }))
    };

    removeItem = (idx) => {
        this.setState(oldState => ({
            items: [
                ...oldState.items.slice(0, idx),
                ...oldState.items.slice(idx + 1)
            ]
        }))
    };

    render() {
        return (
            <Container>
                <Header>Todo List (available space: {this.state.itemsAvailable} items)</Header>
                <Content>
                    <div>
                        {this.state.items.map((item, idx) => {
                            return (
                                <ToDoItem
                                    key={idx}
                                    idx={idx}
                                    value={item}
                                    onRemove={this.removeItem}
                                />
                            )
                        })}
                    </div>
                    <AddItem onClick={this.addItem}>Add Item</AddItem>
                </Content>
            </Container>
        )
    }
}

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
