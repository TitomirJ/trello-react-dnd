import React from "react";
import { EditOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import {Input} from "antd";
import { findDOMNode } from "react-dom";
import { DragSource, DropTarget } from "react-dnd";
import {dragCard} from "../../redux/actions";
import {connect} from "react-redux";
import * as itemTypes from "../../redux/types";

class CardItem extends React.Component {

    state = {
        isEdit: false,
        newDescription: ''
    }

    toggleEdit = () => {
        this.setState((prevState) => ({
            isEdit: !prevState.isEdit
        }))
    }

    newInputChange = (event) => {
        this.setState({newDescription: event.target.value});
    };

    editCard = () => {
        const { column, cardId } = this.props
        this.props.editCard(this.state.newDescription, column, cardId)
        this.toggleEdit()
    };

    deleteCard = () => {
        const { column, cardId } = this.props
        this.props.deleteCard(column, cardId)
        this.toggleEdit()
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.isEdit !== this.state.isEdit) {
            this.setState({
                newDescription: this.props.description
            });
        }
    }


    render() {
        const {
            connectDropTarget,
            connectDragSource
        } = this.props;

        return connectDragSource(
            connectDropTarget(
                <div className='card-wrapper'>
                    {
                        !this.state.isEdit ? (
                            <div className='card-article'>
                                <div>{this.props.description}</div>
                                <button onClick={this.toggleEdit} className='btn-icon'>
                                    <EditOutlined />
                                </button>
                            </div>
                        ) : (
                            <div className='card-article'>
                                <Input.TextArea
                                    type='text'
                                    value={this.state.newDescription}
                                    onChange={this.newInputChange}
                                />
                                <button onClick={this.toggleEdit} className='btn-icon'>
                                    <CloseOutlined />
                                </button>
                                <button onClick={this.editCard} className='btn-icon'>
                                    <CheckOutlined />
                                </button>
                                <div className='block-btnEditCard'>
                                    <button onClick={this.deleteCard} className='btn-editCard'>
                                        Delete
                                    </button>
                                    <button onClick={this.editCard} className='btn-editCard'>
                                        Save
                                    </button>
                                    <button onClick={this.toggleEdit} className='btn-editCard'>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </div>
            )
        )
    }
}

const CardSource = {
    beginDrag(props) {
        return {
            cardId: props.cardId,
            columnId: props.columnId,
            position: props.index
        };
    },
    isDragging(props, monitor) {
        return props.cardId === monitor.getItem().cardId
    }
};

function collect1(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

function collect2(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    };
}


const CardColumnTarget = {
    hover(props, monitor, component) {
        const item = monitor.getItem();

        const { columnId } = props;

        const draggedPosition = item.position;
        const hoverPosition = props.index;
        const hoverColumnId = columnId;

        if (!component) {
            return null
        }

        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (draggedPosition < hoverPosition && hoverClientY < hoverMiddleY) {
            return null
        }

        if (draggedPosition > hoverPosition && hoverClientY > hoverMiddleY) {
            return null
        }

        if (item.cardId !== props.card.id) {
            props.dragCard(item.columnId, item.position, columnId, props.index);
        }

        item.position = hoverPosition;
        item.columnId = hoverColumnId;
    }
};


const mapDispatchToProps = (dispatch) => ({
    dragCard: (lastColumnId, lastCardPos, nextColumnId, nextCardPos) =>
        dispatch(
            dragCard(lastColumnId, lastCardPos, nextColumnId, nextCardPos)
        )
});

export default connect(
    null,
    mapDispatchToProps,
)(
    DragSource(itemTypes.CARD, CardSource, collect1)(
        DropTarget(itemTypes.CARD, CardColumnTarget, collect2)(CardItem)
    )
);