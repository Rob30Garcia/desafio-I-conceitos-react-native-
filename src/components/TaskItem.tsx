import React, { useState, useRef, useEffect } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, taskNewTitle: string) => void;
}

export function TaskItem({ task, index, toggleTaskDone, removeTask, editTask }: TasksListProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [taskNewTitleValue, setTaskNewTitleValue] = useState<string>(task.title);

  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEdition() {
    setTaskNewTitleValue(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask(task.id, taskNewTitleValue);
    setIsEditing(false);
  }

  useEffect(() => {
    if(textInputRef.current) {
      isEditing ? textInputRef.current.focus() : textInputRef.current.blur();
    }
  }, [isEditing])

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
          //TODO - use onPress (toggle task) prop
        >
          <View 
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
            //TODO - use style prop 
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput 
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={taskNewTitleValue}
            onChangeText={setTaskNewTitleValue}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            //TODO - use style prop
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        testID={`trash-${index}`}
        style={{ paddingHorizontal: 24 }}
        onPress={() => removeTask(task.id)}
      >
        <Image source={trashIcon} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})