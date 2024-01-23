import React from "react";
import Icon from "@mdi/react";
import { mdiCheck } from "@mdi/js";

interface CheckListComponentProps {
  checkListArr: string[];
}

export const CheckListComponent: React.FC<CheckListComponentProps> = ({
  checkListArr,
}) => {
  return (
    <ul className="list-unstyled bg-light rounded p-6 pb-4 row g-0">
      {checkListArr.map((item, index) => (
        <li
          className="col-6 col-md-4 col-lg-3 col-xl-2 mb-2 me-md-4 me-lg-6 me-xl-10"
          key={index}
        >
          <div className="d-flex align-items-center">
            <Icon path={mdiCheck} size={1} className="text-primary me-2" />
            <span>{item}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};
