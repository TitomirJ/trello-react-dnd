import React from "react";
import {connect} from "react-redux";
import AddColumn from "./AddColumn";
import {addColumn, deleteColumn} from "../../redux/actions";
import ColumnItem from "./ColumnItem";

class Index extends React.Component {

    scrollToEnd = () => {
        this.columnsEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (Object.keys(prevProps.columns).length < Object.keys(this.props.columns).length) {
            this.scrollToEnd()
        }
    }

    render() {
        return (
            <div className="columns-container">
                {
                    Object.entries(this.props.columns).map((column, index) =>
                        <ColumnItem
                            name={column[0]}
                            column={column[1]}
                            key={index}
                            deleteColumn={this.props.deleteColumn}
                            index={index}
                        />
                    )
                }

                <AddColumn
                    addColumn={this.props.addColumn}
                />

                <div ref={(el) => { this.columnsEnd = el; }}> </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    columns: state.columnsReducer
});

const mapDispatchToProps = (dispatch) => ({
    addColumn: (columnName) => dispatch(addColumn(columnName)),
    deleteColumn: (columnName) => dispatch(deleteColumn(columnName))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Index);