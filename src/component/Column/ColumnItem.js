import React from "react";
import Card from "../Card";
import { DeleteOutlined } from '@ant-design/icons';
import { DragSource, DropTarget } from "react-dnd";
import { findDOMNode } from "react-dom";
import * as itemTypes from "../../redux/types";
import { dragColumn,  dragCardOnEmpty  } from "../../redux/actions";
import { connect } from "react-redux";

class ColumnItem extends React.Component {
    render() {
        const { connectDropTarget, connectDragSource } = this.props
        return connectDropTarget(
            connectDragSource(
                <div className='column-wrapper'>
                    <div className='column-article'>
                        <p className='column-name'>{this.props.name}</p>
                        <button onClick={() => this.props.deleteColumn(this.props.name)} className='btn-icon'>
                            <DeleteOutlined />
                        </button>
                    </div>
                    <Card
                        column={this.props.name}
                    />
                </div>
            )
        )
    }
}

const ListWithDnD = DropTarget(
    [itemTypes.COLUMN, itemTypes.CARD],
    {
        hover(props, monitor, component) {
            const targetType = monitor.getItemType();

            if (targetType === itemTypes.COLUMN) {
                const item = monitor.getItem();
                const dragIndex = item.index;
                const hoverIndex = props.index;

                if (item.column.title === "" || props.column.title === "") {
                    return null;
                }
                if (!component) return null;
                const hoverBoundingRect = findDOMNode(
                    component
                ).getBoundingClientRect();
                const hoverMiddleX =
                    (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
                const clientOffset = monitor.getClientOffset();
                const hoverClientX = clientOffset.x - hoverBoundingRect.left;
                if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
                    return null;
                }
                if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
                    return null;
                }
                if (dragIndex !== hoverIndex) {
                    props.dragColumn(dragIndex, hoverIndex);
                }

                item.index = hoverIndex;
            }

            if (targetType === itemTypes.CARD) {
                const item = monitor.getItem();

                const columnDraggedFrom = item.columnId;
                const columnDraggedOn = props.column.id;
                const draggedCard = item.cardId;

                if (props.name !== "" && props.column.cards.length === 0) {
                    props.dragCardOnEmpty(columnDraggedFrom, columnDraggedOn, draggedCard);
                }
            }
        }
    },
    connect => ({
        connectDropTarget: connect.dropTarget()
    })
)(
    DragSource(
        itemTypes.COLUMN,
        {
            beginDrag(props) {
                return {
                    index: props.index,
                    column: props.column
                };
            },
            isDragging(props, monitor) {
                return props.column.id === monitor.getItem().column.id;
            }
        },
        (connect, monitor) => ({
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging()
        })
    )(ColumnItem)
);


const mapDispatchToProps = (dispatch) => ({
    dragColumn: (dragIndex, hoverIndex) => dispatch(dragColumn(dragIndex, hoverIndex)),
    dragCardOnEmpty: (lastColumnId, nextColumnId, cardId) =>
        dispatch(dragCardOnEmpty(lastColumnId, nextColumnId, cardId))
});

export default connect(
    null,
    mapDispatchToProps,
)(ListWithDnD);

