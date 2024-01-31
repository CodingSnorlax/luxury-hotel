import req from "./https";
import { ReservationPostData } from "../interface/Reservation";

export const apiPostReservationData = (data: ReservationPostData) => req("post", "/api/v1/order/", data);