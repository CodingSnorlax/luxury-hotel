import req from "./https";

// Room
const apiGetRooms = () => req("get", "/api/v1/room");
const apiGetRoomDetail = (roomId: string) => req("get", `/api/v1/room/${roomId}`);

export {
  apiGetRooms,
  apiGetRoomDetail
};
