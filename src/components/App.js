import React, { Component } from "react";
import "./App.scss";
import List from "./List/List"

//dnd
import { DragDropContext } from "react-beautiful-dnd";

class App extends Component {
  state = {
    columns: [
      {
        id: 1,
        title: "Sprint",
        tasks: [
          { id: 1, description: "Clean the house" },
          { id: 5, description: "Another task" }
        ]
      },
      { id: 2, title: "On Going", tasks: [{ id: 2, description: "Buy milk" }] },
      { id: 3, title: "Done", tasks: [] },
      { id: 4, title: "Backlog", tasks: [] }
    ],
    columnOrder: [4, 1, 2, 3]
  };

  /**
   * onSameColumnDropResource: This function handles the same column reordering of resources
   * @param  source, draggableId, destination => react dnd variables
   * @return newColumn, updatedTasks => updated resources to be set as new state
   */

  onSameColumnDropResource(source, draggableId, destination) {
    //get column that was dropped
    const column = this.state.columns.find(
      column => column.id === source.droppableId
    );

    //now lets get the updated tasks and the task that was dragged
    const updatedTasks = Array.from(column.tasks);
    const draggedTask = column.tasks.find(task => task.id === draggableId);

    //lets update our tasks array
    updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, draggedTask);

    //and then create a new version of our column (that will be updated through setState)
    const newColumn = {
      ...column,
      tasks: updatedTasks
    };
    return { newColumn, updatedTasks };
  }

  //required
  onDragEnd(result) {
    /* Result object sample
    
      const result = {

        draggableId: 'task-1',
        type: 'TYPE',
        reason: 'DROP', //can be CANCEL
        source: {
          droppableId: 'column-1',
          index: 0,
        },
        destination: {
          droppableId: 'column-1',
          index: 1
        }

      }
    
    
    */

    const { destination, source, draggableId } = result;

    console.log("onDragEnd fired!");

    // Verifications ========================================

    if (!destination) {
      //if there's no destination, do nothing
      console.log("no destination, doing nothing.");

      return;
    }

    //Check if location of the draggable didn't changed

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log("draggable destination is the same as source!");
      return; //do nothing
    }

    console.log("reordering columns...");

    const { newColumn, updatedTasks } = this.onSameColumnDropResource(
      source,
      draggableId,
      destination
    );

    this.setState({
      columns: this.state.columns.map(column => {
        if (column.id === newColumn.id) {
          column.tasks = updatedTasks;
        }
        return column;
      })
    });

    //it should sync update your state to reorder your list
  }

  onDragStart() {
    console.log("onDragStart fired!");
  }

  onDragUpdate() {
    console.log("onDragUpdate fired!");
  }

  onRenderLists() {
    return this.state.columnOrder.map(columnId => {
      const column = this.state.columns.find(column => column.id === columnId);

      return <List column={column} key={column.id} />;
    });
  }

  render() {
    return (
      <>
        <DragDropContext
          onDragEnd={result => this.onDragEnd(result)}
          onDragStart={this.onDragStart}
          onDragUpdate={this.onDragUpdate}
        >
          <h1>Kanban Clone</h1>

          <div className="lists">{this.onRenderLists()}</div>
        </DragDropContext>
      </>
    );
  }
}

export default App;
