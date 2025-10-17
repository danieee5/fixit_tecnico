import { useCallback } from "react";
import { useNavigation as useRawNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Services: undefined;
  Profile: undefined;
  TechnicianProfile: undefined;
  MyServices: undefined;
  Requests: undefined;
  TechnicianPerformance: undefined;
  TechnicianRequests: undefined;
  RequestDetail: { id: string };
  Certifications: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function useNavigateTo() {
  const navigation = useRawNavigation<NavigationProp>();

  return useCallback(
    (
      route: keyof RootStackParamList,
      params?: RootStackParamList[keyof RootStackParamList]
    ) => {
      navigation.navigate(route as any, params as any);
    },
    [navigation]
  );
}

export default useRawNavigation;
