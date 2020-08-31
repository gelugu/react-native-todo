import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Image, Dimensions } from "react-native";

import { AddTask } from "../components/AddTask"; // Form to add new task
import { Task } from "../components/Task"; // Task element
import { THEME } from "../themes";

//  task list element
export const TaskListLayout = ({ tasks, addTask, openTask }) => {

  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const [deviceHeight, setDeviceHeight] = useState(
    Dimensions.get("window").height
  );

  const styles = StyleSheet.create({
    container: {
      height: deviceHeight * 0.9,
      width: deviceWidth * 0.9,
      

      // borderWidth: 1,
      // borderColor: "#ff0000"
    },
    list: {
      height: "100%",
      paddingVertical: 5,

      // borderWidth: 1,
      // borderColor: "#ff0000"
    },
    addTask: {
      alignSelf: "flex-end",
      alignItems: "center",
      justifyContent: "center",
      
      // borderWidth: 1,
      // borderColor: "#ff0000"
    },
    imageWrap: {
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      height: 100,
    },
    image: {
      width: "100%",
      height: "100%",
      resizeMode: "contain",
    },
  });
  
  useEffect(() => {
    const changeOrientation = () => {
      const width = deviceWidth;
      setDeviceWidth(deviceHeight);
      setDeviceHeight(width);
      console.log("w:", deviceWidth)
    };
    Dimensions.addEventListener("change", changeOrientation)

    return () => {
      Dimensions.removeEventListener("change", changeOrientation)
    }
  });

  return (
    <View style={{alignItems: "center"}}>
      <View style={styles.container}>
        <View style={styles.list}>
          {tasks.length ? (
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              data={tasks}
              renderItem={({ item }) => {
                return <Task task={item} openTask={openTask} />;
              }}
            />
          ) : (
            <View style={styles.imageWrap}>
              <Image
                style={styles.image}
                source={require("../../assets/no-items.png")}
              />
            </View>
          )}
        </View>

        <View style={styles.addTask} >
          <AddTask onSubmit={addTask} />
        </View>
      </View>
    </View>
  );
};
