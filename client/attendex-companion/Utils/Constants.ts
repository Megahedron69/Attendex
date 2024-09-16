import { type RouteProp } from "@react-navigation/native";

type RootStackParamList = {
  Layout: {
    userLocation?: { latitude: number; longitude: number };
    inOffice: boolean;
    width?: number;
    height?: number;
  };
};

export type RouteProps = RouteProp<RootStackParamList, "Layout">;
