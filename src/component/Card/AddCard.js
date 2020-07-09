import React from "react";
import {Button, Input} from "antd";
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

class AddCard extends React.Component {
    state = {
        addCardForm: false,
        cardDescription: ''
    }

    toggleShowForm = () => {
        this.setState((prevState) => ({
            addCardForm: !prevState.addCardForm
        }))
    }

    inputChange = (event) => {
        this.setState({cardDescription: event.target.value});
    }

    addCard = (event) => {
        event.preventDefault();
        if(this.state.cardDescription !== ''){
            this.props.addCard(this.state.cardDescription, this.props.column);
            this.setState({
                cardDescription: '',
                addCardForm: false
            })
        }
    };

    render() {
        return (
            <div className='addCard-wrapper'>
                {
                    !this.state.addCardForm ? (
                        <div>
                            <Button onClick={this.toggleShowForm} icon={ <PlusOutlined/> }>Add Card</Button>
                        </div>
                    ) : (
                        <div>
                            <Input.TextArea
                                type='text'
                                placeholder='card description'
                                value={this.state.cardDescription}
                                onChange={this.inputChange}
                            />
                            <div className='buttons-block'>
                                <Button onClick={this.addCard}>Add Card</Button>
                                <button className='btn-icon' onClick={this.toggleShowForm}>
                                    <CloseOutlined />
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default AddCard