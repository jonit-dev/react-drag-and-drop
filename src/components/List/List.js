import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

class List extends Component {
  onRenderTasks() {
    return this.props.column.tasks.map((task, index) => {
      return <Task task={task} index={index} key={task.id} />;
    });
  }

  //droppableId is required

  render() {
    return (
      <>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <div
              className={`list ${
                snapshot.isDraggingOver ? "dragging-over" : null
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div className="list-title">{this.props.column.title}</div>
              {this.onRenderTasks()}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </>
    );
  }
}

export default List;
