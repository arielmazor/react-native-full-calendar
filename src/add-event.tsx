import { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Button } from 'react-native';
import { BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { addWeeks, format } from 'date-fns';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';

const AddEvent = () => {
  const today = new Date();
  const [startDate, _setStartDate] = useState<Date>(today);
  const [startDatePickerMode, _setStartDatePickerMode] = useState<"time" | "date">("date");
  const [isStartsOpen, _setIsStartsOpen] = useState<boolean>(false);
  
  const startsAnimation = useRef(new Animated.Value(0)).current;
  const startsAnimationInterpolate = startsAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300]
  });

  //------------------

  // const onHourChangeText = (txt: string) => {
  //   const re = /^[0-9\b]+$/;
  //   if (txt === '' || re.test(txt) && parseInt(txt) <= 12) {
  //     _setStartDateHour(txt);
  //   }
  // }
  
  //------------------

  const onMinutesChangeText = (txt: string) => {
    const re = /^[0-9\b]+$/;
    if (txt === '' || re.test(txt) && parseInt(txt) <= 59) {
      // _setStartDateMinutes(txt);
    }
  }
  
  //------------------

  const toggleStartDatePickerWrapper = () => {
    if(isStartsOpen) {
      _setIsStartsOpen(false);
      Animated.timing(startsAnimation, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    } else {
      _setIsStartsOpen(true);
      Animated.timing(startsAnimation, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  }

  //------------------

  const onStartsHourPressBtnPress = () => {
    if(isStartsOpen && startDatePickerMode === "time") {
      _setStartDatePickerMode("date");
    } else {
      _setStartDatePickerMode("date");
      toggleStartDatePickerWrapper();
    }
  }
  
  //------------------

  const onStartsMinutesPressBtnPress = () => {
    if(isStartsOpen && startDatePickerMode === "date") {
      _setStartDatePickerMode("time");
    } else {
      _setStartDatePickerMode("time");
      toggleStartDatePickerWrapper();
    }
  }

  //------------------
  
  return (
    <BottomSheetScrollView style={styles.container}>
      <BottomSheetTextInput 
        style={styles.titleInput}
        placeholder="Title"
      />
      <View style={styles.separatorWrap}>
        <View style={styles.separator} />
      </View>
      <BottomSheetTextInput
       style={styles.summaryInput} 
       placeholder="Summary"
      />
      <View style={styles.startsDateBtn}>
        <Text style={styles.dateTitle}>Starts</Text>
        <TouchableOpacity style={styles.chooseHourWrap} onPress={onStartsHourPressBtnPress}>
          <Text style={{color: isStartsOpen && startDatePickerMode === "date" ? "#2470de" : "#222", fontFamily: "SF"}}>
            {format(startDate, "MMM d, yyyy")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chooseHourWrap} onPress={onStartsMinutesPressBtnPress}>
        <Text style={{color: isStartsOpen && startDatePickerMode === "time" ? "#2470de" : "#222", fontFamily: "SF"}}>
          { format(startDate, "HH:mm aa")}
        </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separatorWrap}>
        <View style={styles.separator} />
      </View>
      <Animated.View style={[styles.chooseTimeContainer, {
        height: startsAnimationInterpolate,
      }]}>
          <DatePicker
            mode={startDatePickerMode}
            date={startDate}
            onDateChange={(newDate) => _setStartDate(newDate)}
            minimumDate={today}
            maximumDate={addWeeks(today, 2)}
            minuteInterval={10}
          />
      </Animated.View>
      <TouchableOpacity activeOpacity={0.85} style={styles.endsDateBtn}>
          <Text style={styles.dateTitle}>Ends</Text>
      </TouchableOpacity>
    </BottomSheetScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0eff6"
  }, 
  separatorWrap: {
    height: 1,
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
  },
  separator: {
    width: "90%",
    height: 1,
    backgroundColor: "#d9d9e2",
  },
  titleInput: {
    height: 45,
    width: "100%",
    borderColor: "#d9d9e2",
    borderTopWidth: 1,
    backgroundColor: "#fff",
    marginTop: 20,
    paddingLeft: 10,
    fontFamily: "SF"
  },
  summaryInput: {
    height: 80,
    width: "100%",
    borderColor: "#d9d9e2",
    borderBottomWidth: 1,
    backgroundColor: "#fff",
    marginBottom: 30,
    textAlign: "auto",
    textAlignVertical: "top",
    paddingTop: 10,
    paddingLeft: 10,
    fontFamily: "SF"
  },
  startsDateBtn: {
    height: 45,
    width: "100%",
    borderColor: "#d9d9e2",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
  },
  endsDateBtn: {
    height: 45,
    width: "100%",
    borderColor: "#d9d9e2",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
  },
  dateTitle: {
    color: "#1f1f1f",
    fontSize: 16,
    fontWeight: "500",
    marginRight: "auto",
    fontFamily: "SF"
  },
  chooseTimeContainer: {
    height: 300,
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingTop: 10,
    alignItems: "center",
  },
  chooseHourWrap: {
    height: 30,
    borderRadius: 7,
    marginLeft: 13,
    backgroundColor: "#ececee",
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center"
  },
  chooseHourInput: {
    color: "#222",
    fontSize: 16,
    fontWeight: "900",
    fontFamily: "SF"
  },
  dateSeparator: { 
    color: "#222",
    fontSize: 16,
    fontWeight: "900",
    fontFamily: "SF",
    marginHorizontal: 5
  }
});

export default AddEvent