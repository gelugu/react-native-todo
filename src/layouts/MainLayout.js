import React, { useContext, useCallback, useEffect } from "react";

import { View, Button, StyleSheet, Dimensions } from "react-native";

import { Navbar } from "../components/Navbar";
import { TaskLayout } from "./TaskLayout";
import { TaskListLayout } from "./TaskListLayout";
import { screenContext } from "../context/screen/screenContext";
import { taskContext } from "../context/task/taskContext";
import { AppLoader } from "../components/ui/AppLoader";
import { AppText } from "../components/ui/AppText";
import { THEME } from "../themes";
import { BoardLayout } from "./BoardLayout";
import { boardContext } from "../context/board/boardContext";

export const MainLayout = () => {
  const { fetchBoards, loading, error  } = useContext(boardContext);

  const loadBoards = useCallback(async () => await fetchBoards(), [fetchBoards]);

  useEffect(() => {
    loadBoards();
  }, []);

  if (loading) return <AppLoader style={styles.loader} />;

  if (error)
    return (
      <View style={styles.errorView}>
        <AppText style={styles.errorText}>{error}</AppText>
        <Button
          onPress={loadBoards}
          title="Try again"
          color={THEME.MAIN_COLOR}
        />
      </View>
    );

  return (
    <View style={styles.container}>
      <Navbar />
      <BoardLayout />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height,
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: { marginBottom: 10 },
});
