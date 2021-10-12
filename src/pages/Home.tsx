import React, { useState } from 'react';
import { 
  StyleSheet, 
  View,
  Alert
} from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskExist = tasks.find(task => task.title === newTaskTitle);

    if(!taskExist) {
      setTasks(old => [...old, {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }]);

      return;
    }

    Alert.alert(
      "Task já cadastrada",
      "Você não pode cadastrar uma task com o mesmo nome",
      [
        {
          text: "Ok"
        }
      ]
    );
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    setTasks(tasks.map(task => task.id === id ? {
      id: task.id,
      title: task.title,
      done: true
    }: task))
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não"
        },
        {
          text: "Sim",
          onPress: () => setTasks(tasks.filter(task => task.id !== id))
        }
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    setTasks(tasks.map(task => task.id === taskId ? {
      id: task.id,
      title: taskNewTitle,
      done: task.done
    }: task))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})