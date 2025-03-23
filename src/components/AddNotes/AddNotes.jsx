import React, { useState } from "react";
import "./addNotes.css";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { addGroup } from "../../redux/noteSlice";

const colors = [
  "#B38BFA",
  "#FF79F2",
  "#43E6FC",
  "#F19576",
  "#0047FF",
  "#6691FF",
];

const AddNotes = ({ handleCreateGroupClose }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { groups } = useSelector((state) => state.note || { groups: [] });

  const handleGroupCreate = (e) => {
    e.preventDefault();
    if (!name || name.length < 2) {
      return alert("Please provide a group name with at least 2 characters");
    }
    if (!selectedColor) {
      return alert("Please Select a color");
    }

    const isDuplicate = groups.some((group) => group.name === name);
    if (isDuplicate) {
      return alert("Group already exists");
    }
    const data = {
      name: name,
      color: selectedColor,
    };

    dispatch(addGroup(data));
    setName("");
    setSelectedColor("");
  };

  return (
    <div className="create-group-div">
      <div className="input-div">
        <div className="heading-close">
          <p className="heading">Create New group</p>
          <button className="close-button" onClick={handleCreateGroupClose}>
            <RxCross2 size={25} />
          </button>
        </div>
        <form className="group-input-div" onSubmit={handleGroupCreate}>
          <label htmlFor="group-name" className="group-name">
            <p className="group-label">Group Name</p>
            <input
              type="text"
              id="group-name"
              name="group-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="group-name-input"
              placeholder="Enter group name"
            />
          </label>

          <label htmlFor="group-color" className="group-color">
            <p className="group-label">Choose colour</p>
            {colors.map((color, index) => (
              <span
                key={index}
                className={`color-circle ${
                  selectedColor === color ? "selected" : ""
                }`}
                onClick={() => setSelectedColor(color)}
                style={{ backgroundColor: color }}>
                <input
                  type="radio"
                  name="color"
                  value={color}
                  checked={selectedColor === color}
                  onChange={() => setSelectedColor(color)}
                  className="color-input"
                />
              </span>
            ))}
          </label>
          <div className="create-btn-div">
            <button className="create-btn" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotes;
