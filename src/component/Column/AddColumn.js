import React from "react";
import { Button, Input } from 'antd';
import { PlusSquareOutlined, CloseOutlined } from '@ant-design/icons';

class AddColumn extends React.Component {

    state = {
        addColumnForm: false,
        columnName: ''
    }

    toggleShowForm = () => {
        this.setState((prevState) => ({
            addColumnForm: !prevState.addColumnForm
        }))
    }

    inputChange = (event) => {
        this.setState({columnName: event.target.value});
    }

    addColumn = (event) => {
        event.preventDefault();
        if(this.state.columnName !== ''){
            this.props.addColumn(this.state.columnName);
            this.setState({
                columnName: '',
                addColumnForm: false
            })
        }
    };


    render() {
        return (
            <>
                <div className='addColumn-wrapper'>
                    {!this.state.addColumnForm ? (
                        <>
                            <div>
                                <Button onClick={this.toggleShowForm} icon={ <PlusSquareOutlined/> }>Add Column</Button>
                            </div>
                        </>
                        ) : (
                            <>
                                <Input
                                    type="text"
                                    placeholder='column name'
                                    value={this.state.columnName}
                                    onChange={this.inputChange}
                                />
                                <div className='buttons-block'>
                                    <Button onClick={this.addColumn}>Add List</Button>
                                    <button className='btn-icon' onClick={this.toggleShowForm}>
                                        <CloseOutlined />
                                    </button>
                                </div>
                            </>
                        )
                    }
                </div>
            </>
        )
    }
}

export default AddColumn
