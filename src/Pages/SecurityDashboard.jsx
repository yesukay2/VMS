import "../App.css";
import approvedExeat from "../approvedReqData";
import ApprovedExeat from "../Components/ApprovedExeat.jsx";

export default function ExeatsPage() {
  return (
    <div className="container body-wrapper">
      <h4 className="page-title d-flex justify-content-center align-items-center mt-2">
        Approved Exeats Log
      </h4>
      <h5 className="time-title">Today</h5>
      <ul className="list-group list-unstyled" id="exeat-list">
        {approvedExeat.length === 0 && "No Exeats Logged!"}
        {approvedExeat.map((exeat) => {
          return (
            <ApprovedExeat
              key={exeat.id}
              name={exeat.name}
              avatar={exeat.avatar}
              time={exeat.time}
              id={exeat.id}
            />
          );
        })}
      </ul>
      <h5 className="time-title">Yesterday</h5>
      <ul className="list-group list-unstyled" id="exeat-list">
        {approvedExeat.length === 0 && "No Exeats Logged!"}
        {approvedExeat.map((exeat) => {
          return (
            <ApprovedExeat
              key={exeat.id}
              name={exeat.name}
              avatar={exeat.avatar}
              time={exeat.time}
            />
          );
        })}
      </ul>
    </div>
  );
}
