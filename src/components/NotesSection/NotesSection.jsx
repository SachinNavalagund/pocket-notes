import { useDispatch, useSelector } from "react-redux";
import "./notesSection.css";
import { getInitials } from "../SideBarGroupName/SideBarGroupName";
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { addNote } from "../../redux/noteSlice";
import { GoDotFill } from "react-icons/go";
import { formatedDate, formatTimestamp } from "../../utils/healper";
import { FaArrowLeftLong } from "react-icons/fa6";

const NotesSection = ({ setShowNotes, showNotes }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const { activeGroup, notes } = useSelector(
    (state) => state.note || { groups: [] }
  );

  const noteBookToBeShown = notes[activeGroup?.name] || [];

  const addNotes = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addNote({ groupName: activeGroup.name, noteText: text }));
    setText("");
  };

  return (
    <div
      className={`notes-section ${!activeGroup && "hidden"} ${
        !showNotes && "hide"
      }`}>
      {/* Notes Heading */}
      <div className="notes-section-head">
        <button className="mobile-sidebar" onClick={() => setShowNotes(false)}>
          <FaArrowLeftLong size={25} fill="#ffffff" />
        </button>

        <div
          className="group-icon-head"
          style={{ backgroundColor: activeGroup?.color }}>
          <span>{getInitials(activeGroup?.name)}</span>
        </div>
        <p className="group-name-head">{activeGroup?.name}</p>
      </div>

      {/* Notes content */}
      <div className="notes-content">
        {Array.isArray(noteBookToBeShown) &&
          noteBookToBeShown.map((note, index) => (
            <div className="notes-text" key={index}>
              <p>{note.text}</p>

              <div className="timestamp">
                <span className="">{formatedDate(note.timestamp)}</span>
                <span>
                  <GoDotFill />
                </span>
                <span>{formatTimestamp(note.timestamp)}</span>
              </div>
            </div>
          ))}
      </div>

      {/* Text area for adding new text for a notes */}
      <div className="notes-section-bottom">
        <form className="text-area-div" onSubmit={addNotes}>
          <textarea
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="text-area"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                addNotes(e);
              }
            }}
            placeholder="Enter your text here...........">
            {" "}
          </textarea>
          <button className="send-icon" type="submit" disabled={!text.trim()}>
            <IoSend size={30} fill={!text.trim() ? "#D3D3D3" : "#001F8B"} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NotesSection;
