import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Task = props => {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          className={`task ${snapshot.isDragging ? "highlighted" : null}`} //highlight element on drag
          key={props.task.id}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}

          // style={{ backgroundColor: snapshot.isDragging ? "yellow" : 'black' }}
        >
          {props.task.description}
        </div>
      )}
    </Draggable>
  );
};
export default Task;

/* 
Object examples:

draggableSnapshot

  const draggableSnapshot = {
    isDragging: true,
    draggingOver: 'column-1',
  }

  const droppableSnapshot = {
    isDraggingOver = true,
    draggingOverWith: 'task-1'
  }

*/
