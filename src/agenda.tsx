import { View, Text, FlatList, useWindowDimensions } from 'react-native'
import React, { FC, useEffect, useRef } from 'react'
import { addDays, addHours, addMinutes, format, getHours, getMinutes, isToday, setMinutes } from 'date-fns';
import eventsProvider, { IEvent } from './events.provider';
import Event from './event';
// 9:00 - 10:00
// 9:45 - 10:50 
// 12:00 - 14:10 

const dates: IEvent[] = [
  {
    start: addHours(setMinutes(new Date().getTime(), 0).getTime(), 5).getTime(),
    end: addHours(setMinutes(new Date(), 55).getTime(), 5).getTime(),
    title: "Dr. Mariana Joseph",
    summary: "3452 Piedmont Rd NE, GA 3032",
  },
  {
    start: addHours(setMinutes(new Date().getTime(), 20).getTime(), 5).getTime(),
    end: addHours(setMinutes(new Date(), 90).getTime(), 5).getTime(),
    title: "Dr. Assaf Mazor",
    summary: "hoo meod hamood",
  },
  {
    start: addDays(setMinutes(new Date().getTime(), 20).getTime(), 2).getTime(),
    end: addHours(setMinutes(new Date(), 90).getTime(), 5).getTime(),
    title: "Dr. Assaf Mazor",
    summary: "hoo meod hamood",
  },
];


interface IProps {
  currDate: Date;
}

const keyExtractor = (_: any, index: number) => "key1" + index;

const getTime = (i: number) => {
  if( i === 0 ) return "";
  if (i < 12) {
    return `${i} AM`
  } else if (i === 12) {
    return `Noon`
  } else if (i === 24) {
    return `0 AM`
  } else {
    return `${i - 12} PM`
  }
}

const Agenda: FC<IProps> = ({ currDate }) => {
  const date = new Date();
  const currHour = getHours(date);
  const currMin = getMinutes(date);
  const FlatListRef = useRef<FlatList>(null);
  const { height } = useWindowDimensions();

  useEffect(() => {
    FlatListRef.current?.scrollToOffset({
      animated: false,
      offset: (currHour * 60) - 300
    })
  }, []);

  const renderEvent = ({ item, index }: any) => {
    return (
      <View style={{ height: index === 0 ? 40 : index === 24 ? 200 : 60, width: "100%", position: "relative" }}>
        <View style={{ height: index === 0 ? 40 : index === 24 ? 200 : 60, left: "15%", width: "100%",right: 0, position: "absolute", borderColor: "#d4d4d6", borderBottomWidth: 1 }}>
          {item.map((event: IEvent, i: number) => {
             return Object.keys(event).length !== 0 && <Event key={"key" + i} event={event} index={i} amount={item.length} />
          })}
        </View>
        <Text style={{ color: "#7d7d82", fontSize: 14, position: "absolute", top: -12, left: 10, fontFamily: "SF" }}>{getTime(index)}</Text>
        {index === currHour && isToday(currDate) && (
          <View style={{ height: 30, top: currMin, elevation: 3, shadowColor: "transparent", zIndex: 3 }}>
          <View style={{
            width: "87%",
            marginLeft: "auto",
            backgroundColor: "#fe8484",
            height: 2,
          }}>
            <View style={{ 
              marginLeft: 6,
              marginTop: -2.7,
              height: 7,
              width: 7,
              backgroundColor: "#fe3b30",
              borderRadius: 30,
            }} />
          </View>
          <View style={{
            height: 20,
            backgroundColor: "white",
            top: -12,
            zIndex: 1000,
            elevation: 1000,
            width: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "transparent",
          }}>
          <Text style={{
            color: "#fe372d",
            fontSize: 13,
            fontFamily: "SF"
          }}>{currHour + ":" + format(date, "mm")}</Text>
          </View>
          </View>
        )}
      </View>
    )
  }

  const getItemLayout = (_: any, index: number) => {
    return {length: 60, offset: 60 * index, index}
  }

  return (
    <View>
      <FlatList
        ref={FlatListRef}
        data={eventsProvider.getDayEvents(currDate, dates)}
        getItemLayout={getItemLayout}
        renderItem={renderEvent}
        keyExtractor={keyExtractor} />
    </View>
  )
}

export default Agenda