export interface Room {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageUrlList: string[];
  areaInfo: string;
  bedInfo: {
    type: string;
    quantity: number;
  };
  maxPeople: number;
  minPeople: number;
  price: number;
  layoutInfo: [
    {
      title: string;
      isProvide: boolean;
    }
  ];
  facilityInfo: [
    {
      title: string;
      isProvide: boolean;
    }
  ];
  amenityInfo: [
    {
      title: string;
      isProvide: boolean;
    }
  ];
  createdAt: string;
  updatedAt: string;
}