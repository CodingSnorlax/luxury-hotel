import React from "react";
import checkIcon from "../assets/icon/check.svg";

interface CheckListComponentProps {
  checkListArr: string[];
}

export const CheckListComponent: React.FC<CheckListComponentProps> = ({ checkListArr }) => {
    return (
      <ul className="list-unstyled row bg-light rounded p-6">
        {checkListArr.map((item, index) => (
          // 每5項換一個新的li元素
        <React.Fragment key={index}>
        {index > 0 && index % 5 === 0 && <div className="w-100 mb-4" key={`divider-${index}`} />}
        <li className="col-4 col-md-2 me-md-4">
          <img src={checkIcon} className="me-2" alt={item} />
          <span>{item}</span>
        </li>
      </React.Fragment>
        ))}
      </ul>
    );
  };
