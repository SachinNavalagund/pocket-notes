import "./notes.css";
import { FaPlus } from "react-icons/fa";
import backgroundImage from "../../assets/image-removebg-preview 1.png";
import { IoMdLock } from "react-icons/io";
import { useState } from "react";
import AddNotes from "../AddNotes/AddNotes";
import SideBarGroupName from "../SideBarGroupName/SideBarGroupName";
import NotesSection from "../NotesSection/NotesSection";
import { useSelector } from "react-redux";

const Notes = () => {
  const [open, setOpen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const { activeGroup } = useSelector((state) => state.note);

  const handleCreateGroup = () => {
    setOpen(true);
  };

  const handleCreateGroupClose = () => {
    setOpen(false);
  };
  return (
    <div className="container">
      {/* Side bar */}
      <div className={`group-sidebar ${showNotes ? "hide-mobile" : ""}`}>
        <p className="side-head">Pocket Notes</p>
        <SideBarGroupName setShowNotes={setShowNotes} />
        <button className="add-group" onClick={handleCreateGroup}>
          <FaPlus size={30} fill="#ffffff" />
        </button>
      </div>

      {open && <AddNotes handleCreateGroupClose={handleCreateGroupClose} />}

      {activeGroup ? (
        <NotesSection setShowNotes={setShowNotes} showNotes={showNotes} />
      ) : (
        <div className="main-notes">
          <div className="initial-note-section">
            <img src={backgroundImage} alt="Background image" />
            <div className="initial-note-text">
              <h1>Pocket Notes</h1>
              <p>
                Send and receive messages without keeping your phone online.
                <br /> Use Pocket Notes on up to 4 linked devices and 1 mobile
                phone
              </p>
            </div>
            <div className="encryption">
              <p>
                <IoMdLock /> end-to-end encrypted
              </p>
            </div>
          </div>

          <NotesSection />
        </div>
      )}
    </div>
  );
};

export default Notes;
