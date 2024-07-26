import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import { deletetodo, updatetodo } from "../todo/todoSlice";

import menu from "..//assets/menu.svg";
import watch_icon from "..//assets/watch_icon.svg";

import "./card.css";
import EditModal from "./EditModal";
import { checkTodo, deleteTodo, getTodo } from "../todo/todosSlice";

function Card({ filterValues, isFilterOn, activeTab, searchValue }) {
  const dispatch = useDispatch();
  const containerRefs = useRef([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editId, setEditId] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const mode = useSelector((state) => state.modeSlice.color);

  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const toDos = useSelector((state) => state.todosSlice.todos);
  // const {todos,loading,error} = todos;

  const filterTodo =
    isFilterOn && Object.keys(filterValues).length > 0
      ? toDos.filter(
          (item) =>
            item.priority === filterValues.priority &&
            item.color === filterValues.color &&
            item.date === filterValues.date
        )
      : toDos;

  const displayedTasks =
    activeTab === "My Task"
      ? filterTodo.filter((item) => !item.completed)
      : activeTab === "Completed"
      ? filterTodo.filter((item) => item.completed)
      : filterTodo;

  const filteredTasks = searchValue
    ? displayedTasks.filter((item) =>
        item.task.toLowerCase().includes(searchValue.toLowerCase())
      )
    : displayedTasks;

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const closeMenu = () => {
    setSelectedCardIndex(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };

  const handleSubmit = (id) => {
    setEditIndex(id);
  };
  const sendEditId = (editId) => {
    setEditId(editId);
  };

  const handleCheckboxChange = async (id, completed) => {
    await dispatch(checkTodo({ id, completed }));
  };

  const backgroundStyle = {
    backgroundColor: mode === "dark" ? "#101213" : "#fff",
  };
  const colorStyle = {
    color: mode === "dark" ? "#fff" : "#333",
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const isOutsideClicked = containerRefs.current.every((ref, index) => {
        if (index === selectedCardIndex) {
          return (
            !ref ||
            (!ref.contains(event.target) &&
              !event.target.closest(".options-container"))
          );
        }
        return !ref || !ref.contains(event.target);
      });
      if (isOutsideClicked) {
        closeMenu();
      }
    };
    if (selectedCardIndex !== null) {
      document.addEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [selectedCardIndex]);

  return (
    <>
      {
        <div
          style={{ colorStyle, backgroundStyle }}
          className="card_container d-flex"
        >
          <div className="card_manage d-flex">
            {filteredTasks.map((item, i) => (
              <div
                className="card"
                key={item.id}
                style={{ backgroundColor: item.color }}
              >
                <div className="card_header mb-1">
                  <div className="checkbox-wrapper-18">
                    <div className="round">
                      <input
                        type="checkbox"
                        style={{ cursor: "pointer" }}
                        id={`checkbox-${item.id}`}
                        checked={item.completed}
                        onChange={() =>
                          handleCheckboxChange(item.id, item.completed)
                        }
                      />
                      <label htmlFor={`checkbox-${item.id}`}></label>
                    </div>
                  </div>
                  <div
                    className="menu"
                    type="submit"
                    onClick={() => {
                      handleCardClick(i);
                    }}
                    ref={(el) => (containerRefs.current[i] = el)}
                  >
                    <img className="" type="submit" src={menu} alt="logo"></img>
                    {selectedCardIndex === i && (
                      <div className="options-container">
                        <div
                          className="option"
                          type="submit"
                          onClick={() => {
                            closeMenu();
                            openEditModal();
                            handleSubmit(i);
                            sendEditId(item.id);
                          }}
                        >
                          Edit
                        </div>
                        <div
                          className="option"
                          onClick={() => {
                            closeMenu();
                            handleDelete(item.id);
                          }}
                        >
                          Delete
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <EditModal
                  editModalOpen={editModalOpen}
                  closeEditModal={closeEditModal}
                  id={editIndex}
                  editId={editId}
                  mode={mode}
                />
                <div className="card_content">
                  <div></div>
                  <div
                    style={{ textOverflow: "ellipsis", wordBreak: "break-all" }}
                  >
                    {item.task}
                  </div>
                </div>
                <div className="card_footer">
                  <div className="d-flex">
                    <img
                      className="watch_icon"
                      src={watch_icon}
                      alt="logo"
                    ></img>
                    <div className="date">{item.date}</div>
                  </div>
                  <button className="priority_button">
                    {item.priority} Priority
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    </>
  );
}

export default Card;
