import { useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const initialTasks = [
  { id: '1', title: 'Review lecture notes', completed: false },
  { id: '2', title: 'Finish mobile app assignment', completed: false },
  { id: '3', title: 'Plan the week ahead', completed: true },
];

const filters = ['All', 'Active', 'Completed'];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [draft, setDraft] = useState('');
  const [filter, setFilter] = useState('All');

  const remaining = tasks.filter((task) => !task.completed).length;
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  function addTask() {
    const title = draft.trim();
    if (!title) return;

    setTasks((currentTasks) => [
      { id: `${Date.now()}`, title, completed: false },
      ...currentTasks,
    ]);
    setDraft('');
  }

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  function renderTask({ item }) {
    return (
      <View style={styles.taskCard}>
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: item.completed }}
          accessibilityLabel={`${item.completed ? 'Mark incomplete' : 'Mark complete'}: ${item.title}`}
          onPress={() => toggleTask(item.id)}
          style={[styles.checkbox, item.completed && styles.checkboxDone]}
        >
          {item.completed ? <Text style={styles.checkmark}>✓</Text> : null}
        </Pressable>
        <Text style={[styles.taskTitle, item.completed && styles.taskTitleDone]}>
          {item.title}
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Delete ${item.title}`}
          onPress={() => deleteTask(item.id)}
          hitSlop={10}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteText}>×</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View style={styles.brandIcon}>
              <Text style={styles.brandIconText}>✓</Text>
            </View>
            <Text style={styles.brand}>daylist</Text>
          </View>
          <Text style={styles.eyebrow}>MAKE TODAY COUNT</Text>
          <Text style={styles.heading}>Your tasks,</Text>
          <Text style={styles.headingAccent}>your pace.</Text>
          <Text style={styles.subtitle}>A little progress adds up.</Text>
        </View>

        <View style={styles.summaryCard}>
          <View>
            <Text style={styles.summaryLabel}>YOUR DAILY PROGRESS</Text>
            <Text style={styles.summaryCount}>
              {remaining} <Text style={styles.summarySuffix}>left to do</Text>
            </Text>
          </View>
          <View style={styles.progressIcon}>
            <Text style={styles.progressIconText}>✦</Text>
          </View>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width:
                    tasks.length === 0
                      ? '0%'
                      : `${((tasks.length - remaining) / tasks.length) * 100}%`,
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My list</Text>
          <Text style={styles.taskCount}>{tasks.length} tasks</Text>
        </View>

        <View style={styles.filterRow}>
          {filters.map((item) => {
            const selected = filter === item;
            return (
              <Pressable
                key={item}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => setFilter(item)}
                style={[styles.filterButton, selected && styles.filterButtonSelected]}
              >
                <Text
                  style={[
                    styles.filterText,
                    selected && styles.filterTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={renderTask}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>
                {filter === 'All' ? 'Nothing on your list yet' : `No ${filter.toLowerCase()} tasks`}
              </Text>
              <Text style={styles.emptySubtitle}>
                Add a task below and get started.
              </Text>
            </View>
          }
        />

        <View style={styles.inputCard}>
          <TextInput
            accessibilityLabel="New task"
            value={draft}
            onChangeText={setDraft}
            onSubmitEditing={addTask}
            placeholder="What needs to get done?"
            placeholderTextColor="#9AA19B"
            returnKeyType="done"
            style={styles.input}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Add task"
            onPress={addTask}
            style={({ pressed }) => [
              styles.addButton,
              pressed && styles.addButtonPressed,
            ]}
          >
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F7F2',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 22,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  brandIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#235B48',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
  },
  brandIconText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  brand: {
    color: '#1D3329',
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  eyebrow: {
    color: '#6E8778',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.8,
    marginBottom: 8,
  },
  heading: {
    color: '#20382D',
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -1.2,
    lineHeight: 39,
  },
  headingAccent: {
    color: '#438363',
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -1.2,
    lineHeight: 39,
  },
  subtitle: {
    color: '#7C877F',
    fontSize: 14,
    marginTop: 8,
  },
  summaryCard: {
    backgroundColor: '#235B48',
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
    minHeight: 104,
    justifyContent: 'center',
  },
  summaryLabel: {
    color: '#C4D7CA',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  summaryCount: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '700',
  },
  summarySuffix: {
    color: '#D5E4D9',
    fontSize: 14,
    fontWeight: '400',
  },
  progressIcon: {
    position: 'absolute',
    top: 20,
    right: 18,
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#39745D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressIconText: {
    color: '#E1B96B',
    fontSize: 22,
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#477863',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 14,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#E1B96B',
    borderRadius: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#24382D',
    fontSize: 19,
    fontWeight: '700',
  },
  taskCount: {
    color: '#89928B',
    fontSize: 12,
    fontWeight: '500',
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 13,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#ECEFE9',
  },
  filterButtonSelected: {
    backgroundColor: '#DDE9DF',
  },
  filterText: {
    color: '#7C877F',
    fontSize: 12,
    fontWeight: '600',
  },
  filterTextSelected: {
    color: '#235B48',
  },
  listContent: {
    paddingTop: 2,
    paddingBottom: 12,
    flexGrow: 1,
  },
  taskCard: {
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 9,
    shadowColor: '#1D3329',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#C4CEC5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxDone: {
    backgroundColor: '#438363',
    borderColor: '#438363',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 17,
  },
  taskTitle: {
    flex: 1,
    color: '#34443A',
    fontSize: 14,
    fontWeight: '500',
  },
  taskTitleDone: {
    color: '#A0AAA2',
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  deleteText: {
    color: '#A5AEA7',
    fontSize: 23,
    fontWeight: '300',
    lineHeight: 25,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 42,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    color: '#46564B',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptySubtitle: {
    color: '#8B958E',
    fontSize: 13,
    marginTop: 6,
    textAlign: 'center',
  },
  inputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 7,
    marginTop: 8,
    marginBottom: 12,
    shadowColor: '#1D3329',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  input: {
    flex: 1,
    color: '#34443A',
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  addButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#235B48',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonPressed: {
    backgroundColor: '#39745D',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '300',
    lineHeight: 30,
    marginTop: -2,
  },
});
