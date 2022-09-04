import { FC, useEffect, useRef } from "react";
import {
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  View,
} from "react-native";
import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  isSameDay,
  isSameWeek,
  isToday,
  subDays,
} from "date-fns";

const dates = eachWeekOfInterval(
  {
    start: new Date(),
    end: addDays(new Date(), 14),
  },
  {
    weekStartsOn: 1,
  }
).reduce((acc: any, cur) => {
  const allDays = eachDayOfInterval({
    start: subDays(cur, 1),
    end: addDays(cur, 5),
  });

  acc.push(allDays);

  return acc;
}, []);

const keyExtractor = (index: number) => "key" + index;

interface IProps {
  currDate: Date;
  onDatePress(date: Date): void;
}

const DateSlider: FC<IProps> = ({ currDate, onDatePress }) => {
  const { width } = useWindowDimensions();
  const currWeek = new Date();
  const WeekFlatListRef = useRef<FlatList>(null);

  useEffect(() => {
    var index = 0;
    dates.map((dates: Date[], i: number) => {
      if(isSameWeek(dates[0], currWeek)) {
        index = i;
      }
    });
    
    WeekFlatListRef.current?.scrollToIndex({
      animated: false,
      index: index || 0
    });
  }, [])

  const renderDays = ({ item }: any) => {
    const txt = format(item, "EEEEE");

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onDatePress(item)}
        style={{
          height: 50,
          width: 40,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#444444", fontSize: 12, fontFamily: "SF" }}>{txt}</Text>
        <View
          style={{
            backgroundColor: isSameDay(currDate, item) ? "#50c0e8" : "transparent",
            height: 30,
            width: 30,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20
          }}
        >
          <Text style={{
            color: isSameDay(currDate, item) ? "#fff" : isToday(item) ? "#50c0e8" :"#202020" ,
            fontSize: 15,
            fontFamily: "SF"
          }}>{item.getDate()}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderWeeks = ({ item }: any) => {
    return (
      <FlatList
        data={item}
        keyExtractor={keyExtractor}
        horizontal
        overScrollMode="never"
        scrollEventThrottle={260}
        showsHorizontalScrollIndicator={false}
        renderItem={renderDays}
        style={{
          width,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      />
    );
  };

  //----------------------------

  const itemLayout = (_: any, index: number) => {
    return { length: width, offset: width * index, index };
  };

  //----------------------------

  const getInitContentOffset = () => {
    const currWeek = new Date();
    const index = dates.forEach(({ item, index }: any) => {
      if(isSameWeek(currWeek, item)) {
        return index;
      }
    });

    return {
      y: 0,
      x: index * width || 0
    }
  }

  //----------------------------

  return (
    <View style={{ height: 98}}>
      <FlatList
        ref={WeekFlatListRef}
        data={dates}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled
        getItemLayout={itemLayout}
        scrollEnabled
        overScrollMode="never"
        scrollEventThrottle={260}
        decelerationRate={"fast"}
        showsHorizontalScrollIndicator={false}
        renderItem={renderWeeks}
        style={styles.container}
      />
      <Text
        style={{
          height: 35,
          marginTop: 3,
          width: "100%",
          textAlign: "center",
          borderColor: "#d4d4d6",
          borderBottomWidth: 1,
          color: "#202020",
          fontFamily: "SF"
        }}
      >
        {format(currDate, "eeeeeee MMMM dd, yyyy")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
  },
  row: {
    flexDirection: "row",
  },
});

export default DateSlider;
