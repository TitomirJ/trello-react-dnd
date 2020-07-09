import React from "react";
import AddCard from "./AddCard";
import { addCard, editCard, deleteCard } from "../../redux/actions";
import { connect } from "react-redux";
import CardItem from "./CardItem";

class Card extends React.Component {

    deleteCard = (column, cardId) => {
        this.props.deleteCard(column, cardId)
    }

    render() {
        return (
            <div>
                {
                    Object.values(this.props.columns[this.props.column].cards).map((key, i) =>
                        <CardItem
                            key={i}
                            description={key.description}
                            cardId={key.id}
                            card={key}
                            index={i}
                            editCard={this.props.editCard}
                            deleteCard={this.deleteCard}
                            column={this.props.column}
                            columnId={this.props.columns[this.props.column].id}
                            columns={this.props.columns}
                        />
                    )
                }
                <AddCard
                    addCard={this.props.addCard}
                    column={this.props.column}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    columns: state.columnsReducer
});

const mapDispatchToProps = (dispatch) => ({
    addCard: (cardName, columnName) => dispatch(addCard(cardName, columnName)),
    editCard: (cardName, columnName, id) => dispatch(editCard(cardName, columnName, id)),
    deleteCard: (column, cardId) => dispatch(deleteCard(column, cardId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Card);