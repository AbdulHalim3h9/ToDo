import { useRef, useState } from 'react';
import {
  FlatList,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
  type ListRenderItemInfo,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function TodoList() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const nextTaskId = useRef(0);

  function addTask() {
    const title = task.trim();
    if (!title) return;

    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: `${Date.now()}-${nextTaskId.current++}`,
        title,
        completed: false,
      },
    ]);
    setTask('');
  }

  function toggleTask(id: string) {
    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function deleteTask(id: string) {
    setTasks((currentTasks) => currentTasks.filter((item) => item.id !== id));
  }

  function renderTask({ item }: ListRenderItemInfo<Task>) {
    return (
      <View className="mb-3 flex-row items-center rounded-2xl bg-white px-4 py-3 shadow-sm">
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: item.completed }}
          accessibilityLabel={`${item.completed ? 'Mark incomplete' : 'Mark complete'}: ${item.title}`}
          onPress={() => toggleTask(item.id)}
          className={`mr-3 h-6 w-6 items-center justify-center rounded-full border ${
            item.completed
              ? 'border-emerald-500 bg-emerald-500'
              : 'border-gray-300 bg-white'
          }`}
        >
          {item.completed ? (
            <Text className="text-sm font-bold text-white">✓</Text>
          ) : null}
        </Pressable>
        <Text
          className={`flex-1 text-base ${
            item.completed ? 'text-gray-400 line-through' : 'text-gray-800'
          }`}
        >
          {item.title}
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Delete ${item.title}`}
          onPress={() => deleteTask(item.id)}
          hitSlop={10}
          className="ml-3 h-10 w-10 items-center justify-center"
        >
          <Text className="text-2xl text-gray-400">×</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <StatusBar barStyle="dark-content" />
      <View className="flex-1 bg-gray-50 px-5 pb-4 pt-14">
        <View className="mb-8">
          <Text className="text-3xl font-black text-emerald-500">
            My TodoList
          </Text>
          <Text className="mt-2 text-base text-gray-500">
            Keep your daily tasks listed.
          </Text>
        </View>

        <View className="mb-7 flex-row items-center rounded-2xl bg-white p-2 shadow-sm">
          <TextInput
            accessibilityLabel="New task"
            value={task}
            onChangeText={setTask}
            onSubmitEditing={addTask}
            placeholder="What do you need to do?"
            placeholderTextColor="#9ca3af"
            returnKeyType="done"
            className="min-h-12 flex-1 px-3 text-base text-gray-800"
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Add task"
            onPress={addTask}
            className="rounded-xl bg-emerald-500 px-5 py-3"
          >
            <Text className="text-base font-bold text-white">Add</Text>
          </Pressable>
        </View>

        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-xl font-bold text-gray-800">My tasks</Text>
          <Text className="text-sm text-gray-500">
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
          </Text>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderTask}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 12 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center px-6">
              <Text className="text-center text-base font-semibold text-gray-600">
                Your list is empty
              </Text>
              <Text className="mt-2 text-center text-sm text-gray-400">
                Add your first task above to get started.
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}
