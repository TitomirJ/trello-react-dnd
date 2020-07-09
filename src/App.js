import React from 'react';
import { connect } from 'react-redux';
import Column from "./component/Column";
import { addColumn } from "./redux/actions";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const App = (props) => {
    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <Column
                    addColumn={props.addColumn}
                />
            </DndProvider>
        </div>
    );
}


const mapDispatchToProps = (dispatch) => ({
    addColumn: (columnName) => dispatch(addColumn(columnName))
});

export default connect(
    null,
    mapDispatchToProps,
)(App);
