import React, { useContext, useCallback, useEffect } from "react";

import { View, Button, StyleSheet } from "react-native";

import { Navbar } from "../components/Navbar";
import { TaskLayout } from "./TaskLayout";
import { TaskListLayout } from "./TaskListLayout";
import { screenContext } from "../context/screen/screenContext";
import { taskContext } from "../context/task/taskContext";
import { AppLoader } from "../components/ui/AppLoader";
import { AppText } from "../components/ui/AppText";
import { THEME } from "../themes";
import { BoardLayout } from "./BoardLayout";

export const MainLayout = () => {
  const { taskId, boardId } = useContext(screenContext);
  const { fetchTasks, loading, error } = useContext(taskContext);

  const loadTasks = useCallback(async () => await fetchTasks(), [fetchTasks]);

  useEffect(() => {
    loadTasks();
  }, []);

  if (loading) return <AppLoader style={styles.loader} />;

  if (error)
    return (
      <View style={styles.errorView}>
        <AppText style={styles.errorText}>{error}</AppText>
        <Button
          onPress={loadTasks}
          title="Try again"
          color={THEME.MAIN_COLOR}
        />
      </View>
    );

  return (
    <View>
      <Navbar />
      {!boardId ? (
        <BoardLayout />
      ) : taskId ? (
        <TaskLayout />
      ) : (
        <TaskListLayout />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
