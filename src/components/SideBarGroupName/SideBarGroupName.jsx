import { useDispatch, useSelector } from "react-redux";
import "./sideBarGroupName.css";
import { setActiveGroup } from "../../redux/noteSlice";

export const getInitials = (name) => {
  const words = name?.trim().split(" ");
  if (words?.length > 1) {
    return words[0][0]?.toUpperCase() + words[1][0]?.toUpperCase();
  } else {
    return name?.slice(0, 1).toUpperCase();
  }
};

const SideBarGroupName = ({ setShowNotes }) => {
  const { groups, activeGroup } = useSelector(
    (state) => state.note || { groups: [] }
  );

  const selectedGroup = activeGroup?.name;
  const dispatch = useDispatch();

  return (
    <div className="side-group-div">
      {groups.map((group, index) => (
        <div
          className={`group ${group.name === selectedGroup && "selected"}`}
          key={index}
          onClick={() => {
            dispatch(setActiveGroup(group));
            setShowNotes(true);
          }}>
          <div className="group-icon" style={{ backgroundColor: group.color }}>
            <span>{getInitials(group.name)}</span>
          </div>
          <p className="group-name">{group.name}</p>
        </div>
      ))}
    </div>
  );
};

export default SideBarGroupName;
