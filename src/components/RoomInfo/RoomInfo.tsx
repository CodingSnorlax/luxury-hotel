import { Icon as Iconify } from "@iconify/react";
import Icon from "@mdi/react";
import { mdiBedKing, mdiAccount } from "@mdi/js";
import "./RoomInfo.scss";

interface Props {
  areaInfo: string;
  bedInfoType: string;
  minPeople: number;
  maxPeople: number;
  border: boolean;
}
const RoomInfo = ({
  areaInfo,
  bedInfoType,
  minPeople,
  maxPeople,
  border,
}: Props) => {
  return (
    <div className="d-flex">
      <div
        className={`feature d-flex flex-column justify-content-center bg-light px-4 me-4 rounded-2 ${
          border ? "featureBorder" : ""
        }`}
      >
        <Iconify
          icon="fluent:slide-size-24-filled"
          className="fs-4 text-primary"
        />
        <p className="fw-bold">{areaInfo}</p>
      </div>
      <div
        className={`feature d-flex flex-column justify-content-center bg-light px-4 me-4 rounded-2 ${
          border ? "featureBorder" : ""
        }`}
      >
        <Icon path={mdiBedKing} size={1} className="text-primary" />
        <p className="fw-bold">{bedInfoType}</p>
      </div>
      <div
        className={`feature d-flex flex-column justify-content-center bg-light px-4 me-4 rounded-2 ${
          border ? "featureBorder" : ""
        }`}
      >
        <Icon path={mdiAccount} size={1} className="text-primary" />
        <p className="fw-bold">
          {minPeople}-{maxPeople} 人
        </p>
      </div>
    </div>
  );
};

export default RoomInfo;
