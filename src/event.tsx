import { View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import React, { FC } from 'react'
import { IEvent } from './events.provider'
import { getHours, getMinutes } from 'date-fns'

interface IProps {
  event: IEvent,
  index: number,
  amount: number,
}

const Event: FC<IProps> = ({ event, index, amount }) => {
  const startHour = getHours(event.start);
  const startMin = getMinutes(event.start)
  const endMin = getMinutes(event.end)
  const endHour = getHours(event.end);
  const { width } = useWindowDimensions();
  const top = startMin + 1;
  const bottom = (-((endHour - startHour) * 60) + (60 - endMin) + 1);
  
  //----------------------------
  
  const getLeft = () => {
    if(index === 0) {
      return 0;
    }
    return "45%";
  }

  //----------------------------
  
  const getRight = () => {
    if(index === 0) {
      return "55%";
    }

    return 0;
  }

  //----------------------------

  return (
    <View style={[
        styles.container,
        {
          top: top,
          bottom: bottom === 0 ? bottom + 1 : bottom,
          left: amount === 2 ? getLeft() : 0,
          right: amount === 2 ? getRight() : 0
        }
      ]}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.summary}>{event.summary}</Text>
      {/* <Text>{JSON.stringify(event)}</Text> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d0eefc",
    position: 'absolute',
    zIndex: 1000,
    right: 0,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    borderColor: "#28b2f8",
    borderLeftWidth: 3,
    shadowColor: "transparent",
    elevation: 1000,
    paddingLeft: 10,
    paddingTop: 1,
    overflow: "hidden",
  },
  title: {
    color: "#176d99",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 3,
    fontFamily: "SF"
  },
  summary: {
    fontSize: 11.5,
    fontWeight: "600",
    color: "#21a0df",
    fontFamily: "SF",
  }
})

export default Event