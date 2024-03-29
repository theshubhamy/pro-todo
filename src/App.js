import React, { useState } from "react";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { v4 } from "uuid";

function App() {
  const [text, setText] = useState("");
  const [allIssue, setAllIssue] = useState([]);
  const [state, setState] = useState({
    todo: {
      title: "Todo",
      items: [],
    },
    "in-progress": {
      title: "In Progress",
      items: [],
    },
    done: {
      title: "Completed",
      items: [],
    },
  });

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    // Creating a copy of item before removing it from state
    const itemCopy = { ...state[source.droppableId].items[source.index] };

    setState((prev) => {
      prev = { ...prev };
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1);

      // Adding to new items array location
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );

      return prev;
    });
  };

  const addItem = async () => {
    setAllIssue([...allIssue, text]);
    if (text === "") {
      alert("please enter any issue.");
    } else {
      setState((prev) => {
        return {
          ...prev,
          todo: {
            title: "Todo",
            items: [
              {
                id: v4(),
                name: text,
              },
              ...prev.todo.items,
            ],
          },
        };
      });
      try {
        const res = await fetch(
          "https://pro-todo-firebase-default-rtdb.firebaseio.com/todo.json",
          {
            method: "POST",
            headers: {
              "content-Type": "application/json",
            },
            body: JSON.stringify({
              text,
            }),
          }
        );
        if (res.status === 200) {
          alert("Issue added sucessfully😊");
          localStorage.setItem("issue", allIssue);
          console.log(allIssue);
        } else {
          alert("server error");
        }
      } catch (error) {
        alert(error);
      }
      setText("");
    }
  };
  const clearItem = () => {
    localStorage.clear();
  };

  return (
    <>
      <div className="app-title">
        <h1>Pro Todo</h1>
      </div>
      <div className="additem">
        <input
          type="text"
          className="input-item"
          value={text}
          placeholder="Enter an issue here ..."
          onChange={(e) => setText(e.target.value)}
        />
        <div className="app-button">
          <button className="button" onClick={addItem}>
            Add
          </button>
          <button className="button" onClick={clearItem}>
            Clear
          </button>
        </div>
      </div>
      <div className="App">
        <DragDropContext onDragEnd={handleDragEnd}>
          {_.map(state, (data, key) => {
            return (
              <div key={key} className={"column"}>
                <h3 className="todo-title">{data.title}</h3>
                <Droppable droppableId={key}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={"droppable-col"}
                      >
                        {data.items.map((el, index) => {
                          return (
                            <Draggable
                              key={el.id}
                              index={index}
                              draggableId={el.id}
                            >
                              {(provided, snapshot) => {
                                console.log(snapshot);
                                return (
                                  <div
                                    className={`item ${
                                      snapshot.isDragging && "dragging"
                                    }`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    {el.name}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
}

export default App;
