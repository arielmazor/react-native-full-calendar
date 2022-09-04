import { FC, useCallback, useEffect, useRef, useState } from "react";
import { FlatList, StatusBar, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import Agenda from "./src/agenda";
import DateSlider from "./src/DateSlider";
import BottomSheet from "./src/bottom-sheet";
import AddEvent from "./src/add-event";
import { useFonts } from 'expo-font';

const App: FC = () => {
  const [currDate, _setCurrDate] = useState<Date>( new Date());
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [fontsLoaded] = useFonts({
    'SF': require('./assets/FreeSans.ttf'),
  });

  //----------------------------

  const onDatePress = (date: Date) => {
    _setCurrDate(date);
  };

  //----------------------------

  const onAddEventPress = useCallback(() => {
    bottomSheetRef.current?.show();
  }, [])

  //----------------------------
  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <DateSlider currDate={currDate} onDatePress={onDatePress} />
      <Agenda currDate={currDate} />
      <TouchableOpacity
        onPress={onAddEventPress}
        activeOpacity={0.9}
        style={{
          position: "absolute",
          width: 60,
          height: 60,
          bottom: 25,
          right: 15,
          backgroundColor: "#d1e5f4",
          elevation: 15,
          shadowColor: "#000000d6",
          borderRadius: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Feather name="plus" color="#0b202a" size={26} />
      </TouchableOpacity>
      <BottomSheet ref={bottomSheetRef}>
        <AddEvent />
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default App;
