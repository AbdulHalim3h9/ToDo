import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Complete Lab Task', done: false },
    { id: '2', title: 'Learn React Native', done: true },
  ]);

  const addTask = () => {
    if (!task.trim()) return;

    setTasks([
      { id: Date.now().toString(), title: task.trim(), done: false },
      ...tasks,
    ]);
    setTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const remaining = tasks.filter((item) => !item.done).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Todo List ✨</Text>
        <Text style={styles.subtitle}>
          {remaining} tasks remaining
        </Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new task..."
          value={task}
          onChangeText={setTask}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>No tasks yet. Add one!</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              style={[styles.check, item.done && styles.checked]}
              onPress={() => toggleTask(item.id)}
            >
              <Text style={styles.checkText}>
                {item.done ? '✓' : ''}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.taskArea}
              onPress={() => toggleTask(item.id)}
            >
              <Text style={[styles.taskText, item.done && styles.done]}>
                {item.title}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.delete}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F5FB',
    padding: 20,
  },
  header: {
    backgroundColor: '#6258D9',
    padding: 25,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 25,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#E6E3FF',
    marginTop: 10,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#6258D9',
    width: 55,
    marginLeft: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    color: '#FFFFFF',
    fontSize: 30,
  },
  list: {
    paddingBottom: 30,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  check: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: '#6258D9',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#6258D9',
  },
  checkText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  taskArea: {
    flex: 1,
    marginHorizontal: 12,
  },
  taskText: {
    fontSize: 16,
    color: '#252642',
  },
  done: {
    textDecorationLine: 'line-through',
    color: '#999999',
  },
  delete: {
    color: '#E74C3C',
    fontSize: 20,
    padding: 5,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#777777',
  },
});
