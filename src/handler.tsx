import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC, useCallback } from 'react'
import { trigger } from './events'

const Handler: FC = () => {
  const closeBottomSheet = useCallback(() => {
    trigger("close-bottom-sheet");
  }, [])
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={closeBottomSheet}>
        <Text style={[styles.btnTitle, {
          marginLeft: -25
        }]}>
          Cancel
        </Text>
      </TouchableOpacity>
      <Text style={styles.title}>New Event</Text>
      <TouchableOpacity onPress={closeBottomSheet}>
        <Text style={[styles.btnTitle, {
          marginRight: -25
        }]}>
          Add
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: "101%",
    backgroundColor: "#f9f9fd",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: "#d9d9e2",
    borderBottomWidth: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    color: "#222",
    fontSize: 17,
    fontWeight: "800",
    fontFamily: "SF"
  },

  btnTitle: {
    color: "#2470de",
    fontWeight: "500",
    fontSize: 16,
    fontFamily: "SF"
  }
});

export default Handler