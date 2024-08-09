import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { XIcon, MaximizeIcon } from 'lucide-react';

const questions = [
  {
    type: 'code',
    question: "Which syntax do you prefer for creating a simple button?",
    option1: {
      framework: "Flutter",
      code: `
ElevatedButton(
  child: Text('Click me'),
  onPressed: () {
    print('Button pressed!');
  },
)
      `
    },
    option2: {
      framework: "React Native",
      code: `
<TouchableOpacity
  onPress={() => {
    console.log('Button pressed!');
  }}
>
  <Text>Click me</Text>
</TouchableOpacity>
      `
    }
  },
  {
    type: 'code',
    question: "Which state management approach do you prefer?",
    option1: {
      framework: "Flutter",
      code: `
// Using Provider
class Counter with ChangeNotifier {
  int _count = 0;
  int get count => _count;

  void increment() {
    _count++;
    notifyListeners();
  }
}

// Usage
Consumer<Counter>(
  builder: (context, counter, child) => Text(
    '\${counter.count}',
    style: Theme.of(context).textTheme.headline4,
  ),
)
      `
    },
    option2: {
      framework: "React Native",
      code: `
// Using React Hooks
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <View>
      <Text>{count}</Text>
      <Button 
        onPress={() => setCount(count + 1)} 
        title="Increment"
      />
    </View>
  );
}
      `
    }
  },
  {
    type: 'code',
    question: "Which documentation style do you find easier to understand?",
    option1: {
      framework: "Flutter",
      code: `
/// A widget that displays its children in a vertical array.
///
/// To cause a child to expand to fill the available vertical space, wrap the
/// child in an [Expanded] widget.
///
/// The [Column] widget does not scroll (and in general it is considered an error
/// to have more children in a [Column] than will fit in the available space).
/// If you have a line of widgets and want them to be able to scroll if there is
/// insufficient room, consider using a [ListView].
///
/// For a horizontal variant, see [Row].
///
/// If you only have one child, then consider using [Align] or [Center] to
/// position the child.
class Column extends Flex {
  /// Creates a vertical array of children.
  ///
  /// The [direction], [mainAxisAlignment], [mainAxisSize],
  /// [crossAxisAlignment], and [verticalDirection] arguments must not be null.
  /// If [crossAxisAlignment] is [CrossAxisAlignment.baseline], then
  /// [textBaseline] must not be null.
  ///
  /// The [textDirection] argument defaults to the ambient [Directionality], if
  /// any. If there is no ambient directionality, and a text direction is going
  /// to be necessary to disambiguate \`start\` or \`end\` values for the
  /// [crossAxisAlignment], the [textDirection] must not be null.
  Column({
    Key? key,
    MainAxisAlignment mainAxisAlignment = MainAxisAlignment.start,
    MainAxisSize mainAxisSize = MainAxisSize.max,
    CrossAxisAlignment crossAxisAlignment = CrossAxisAlignment.center,
    TextDirection? textDirection,
    VerticalDirection verticalDirection = VerticalDirection.down,
    TextBaseline? textBaseline,
    List<Widget> children = const <Widget>[],
  }) : super(
    children: children,
    key: key,
    direction: Axis.vertical,
    mainAxisAlignment: mainAxisAlignment,
    mainAxisSize: mainAxisSize,
    crossAxisAlignment: crossAxisAlignment,
    textDirection: textDirection,
    verticalDirection: verticalDirection,
    textBaseline: textBaseline,
  );
}
      `
    },
    option2: {
      framework: "React Native",
      code: `
import { View } from 'react-native';

/**
 * A container that supports layout with flexbox, style, some touch handling, and accessibility controls.
 *
 * @see https://reactnative.dev/docs/view
 */
const ViewNativeComponent = require('./ViewNativeComponent');

/**
 * The most fundamental component for building a UI, View is a container that supports layout with flexbox, style, some touch handling, and accessibility controls.
 * 
 * @param props The props for the View component.
 * @returns A React element representing the View.
 */
const View: React.AbstractComponent<
  ViewProps,
  React.ElementRef<typeof ViewNativeComponent>,
> = ViewNativeComponent;

export default View;
      `
    }
  },
  {
    type: 'code',
    question: "Which styling approach do you prefer for creating a two-column layout with the second column having two rows?",
    option1: {
      framework: "Flutter",
      code: `
Row(
  children: [
    Expanded(
      flex: 1,
      child: Container(
        color: Colors.blue,
        child: Center(child: Text('Column 1')),
      ),
    ),
    Expanded(
      flex: 1,
      child: Column(
        children: [
          Expanded(
            flex: 1,
            child: Container(
              color: Colors.green,
              child: Center(child: Text('Column 2, Row 1')),
            ),
          ),
          Expanded(
            flex: 1,
            child: Container(
              color: Colors.red,
              child: Center(child: Text('Column 2, Row 2')),
            ),
          ),
        ],
      ),
    ),
  ],
)
      `
    },
    option2: {
      framework: "React Native",
      code: `
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TwoColumnLayout = () => (
  <View style={styles.container}>
    <View style={styles.column1}>
      <Text>Column 1</Text>
    </View>
    <View style={styles.column2}>
      <View style={styles.row1}>
        <Text>Column 2, Row 1</Text>
      </View>
      <View style={styles.row2}>
        <Text>Column 2, Row 2</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  column1: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  column2: {
    flex: 1,
  },
  row1: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row2: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TwoColumnLayout;
    `
    }
  },
  {
    type: 'code',
    question: "Which implementation do you prefer to create a simple native module to get the device's battery level",
    option1: {
      framework: "Flutter",
      code: `
// Dart code
import 'package:flutter/services.dart';

class Battery {
  static const platform = MethodChannel('samples.flutter.dev/battery');

  static Future<String> getBatteryLevel() async {
    String batteryLevel;
    try {
      final int result = await platform.invokeMethod('getBatteryLevel');
      batteryLevel = 'Battery level: $result%';
    } on PlatformException catch (e) {
      batteryLevel = "Failed to get battery level: '\${e.message}'.";
    }
    return batteryLevel;
  }
}

// Android (Kotlin)
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel

class MainActivity: FlutterActivity() {
    private val CHANNEL = "samples.flutter.dev/battery"

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler { call, result ->
            if (call.method == "getBatteryLevel") {
                val batteryLevel = getBatteryLevel()
                if (batteryLevel != -1) {
                    result.success(batteryLevel)
                } else {
                    result.error("UNAVAILABLE", "Battery level not available.", null)
                }
            } else {
                result.notImplemented()
            }
        }
    }

    private fun getBatteryLevel(): Int {
        val batteryManager = getSystemService(Context.BATTERY_SERVICE) as BatteryManager
        return batteryManager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY)
    }
}
      `
    },
    option2: {
      framework: "React Native",
      code: `
// JavaScript code
import { NativeModules } from 'react-native';
const { BatteryModule } = NativeModules;

export const getBatteryLevel = async () => {
  try {
    const batteryLevel = await BatteryModule.getBatteryLevel();
    return \`Battery level: \${batteryLevel}%\`;
  } catch (e) {
    return \`Failed to get battery level: \${e.message}\`;
  }
};

// Android (Java)
package com.example.reactnative;

import android.content.Intent;
import android.content.IntentFilter;
import android.os.BatteryManager;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class BatteryModule extends ReactContextBaseJavaModule {
    BatteryModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "BatteryModule";
    }

    @ReactMethod
    public void getBatteryLevel(Promise promise) {
        Intent intent = this.getCurrentActivity().registerReceiver(null, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
        int level = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
        int scale = intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);

        if(level == -1 || scale == -1) {
            promise.reject("ERROR", "Could not get battery level");
            return;
        }

        float batteryLevel = level / (float)scale;
        promise.resolve((int)(batteryLevel * 100));
    }
}
      `
    }
  },
  {
    type: 'code',
    question: "How would you implement a bottom navigation bar with icons and labels using popular libraries in each framework?",
    option1: {
      framework: "Flutter",
      code: `
  // Using flutter_bloc for state management and flutter_botto
  
  mnavigationbar for navigation
  
  import 'package:flutter/material.dart';
  import 'package:flutter_bloc/flutter_bloc.dart';
  import 'package:flutter_bottomnavigationbar/flutter_bottomnavigationbar.dart';
  
  // Define states
  abstract class NavigationState {}
  class HomeState extends NavigationState {}
  class ProfileState extends NavigationState {}
  class SettingsState extends NavigationState {}
  
  // Define events
  abstract class NavigationEvent {}
  class TabTapped extends NavigationEvent {
    final int index;
    TabTapped({required this.index});
  }
  
  // Define bloc
  class NavigationBloc extends Bloc<NavigationEvent, NavigationState> {
    NavigationBloc() : super(HomeState()) {
      on<TabTapped>((event, emit) {
        switch (event.index) {
          case 0:
            emit(HomeState());
            break;
          case 1:
            emit(ProfileState());
            break;
          case 2:
            emit(SettingsState());
            break;
        }
      });
    }
  }
  
  class MyApp extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
      return MaterialApp(
        home: BlocProvider(
          create: (context) => NavigationBloc(),
          child: BlocBuilder<NavigationBloc, NavigationState>(
            builder: (context, state) {
              return Scaffold(
                body: _buildBody(state),
                bottomNavigationBar: BottomNavigationBar(
                  currentIndex: _getCurrentIndex(state),
                  onTap: (index) => 
                    context.read<NavigationBloc>().add(TabTapped(index: index)),
                  items: [
                    BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
                    BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
                    BottomNavigationBarItem(icon: Icon(Icons.settings), label: 'Settings'),
                  ],
                ),
              );
            },
          ),
        ),
      );
    }
  
    Widget _buildBody(NavigationState state) {
      if (state is HomeState) return Center(child: Text('Home'));
      if (state is ProfileState) return Center(child: Text('Profile'));
      if (state is SettingsState) return Center(child: Text('Settings'));
      return Container();
    }
  
    int _getCurrentIndex(NavigationState state) {
      if (state is HomeState) return 0;
      if (state is ProfileState) return 1;
      if (state is SettingsState) return 2;
      return 0;
    }
  }
      `
    },
    option2: {
      framework: "React Native",
      code: `
  // Using @react-navigation/bottom-tabs for navigation and Redux for state management
  
  import React from 'react';
  import { Text, View } from 'react-native';
  import { NavigationContainer } from '@react-navigation/native';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import { createStore } from 'redux';
  import { Provider, useSelector, useDispatch } from 'react-redux';
  import Icon from 'react-native-vector-icons/MaterialIcons';
  
  // Redux setup
  const initialState = { activeTab: 'Home' };
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_ACTIVE_TAB':
        return { ...state, activeTab: action.payload };
      default:
        return state;
    }
  };
  const store = createStore(reducer);
  
  // Screen components
  function HomeScreen() {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Home</Text></View>;
  }
  function ProfileScreen() {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Profile</Text></View>;
  }
  function SettingsScreen() {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Settings</Text></View>;
  }
  
  const Tab = createBottomTabNavigator();
  
  function MyTabs() {
    const dispatch = useDispatch();
    const activeTab = useSelector(state => state.activeTab);
  
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            } else if (route.name === 'Settings') {
              iconName = 'settings';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          listeners={{
            tabPress: () => dispatch({ type: 'SET_ACTIVE_TAB', payload: 'Home' }),
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen}
          listeners={{
            tabPress: () => dispatch({ type: 'SET_ACTIVE_TAB', payload: 'Profile' }),
          }}
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen}
          listeners={{
            tabPress: () => dispatch({ type: 'SET_ACTIVE_TAB', payload: 'Settings' }),
          }}
        />
      </Tab.Navigator>
    );
  }
  
  export default function App() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <MyTabs />
        </NavigationContainer>
      </Provider>
    );
  }
      `
    }
  },
  {
    type: 'code',
    question: "How would you implement a simple HTTP GET request and display the results using popular libraries in each framework?",
    option1: {
      framework: "Flutter",
      code: `
  // Using http package for network requests and flutter_bloc for state management
  
  import 'package:flutter/material.dart';
  import 'package:http/http.dart' as http;
  import 'package:flutter_bloc/flutter_bloc.dart';
  import 'dart:convert';
  
  // Events
  abstract class PostEvent {}
  class FetchPosts extends PostEvent {}
  
  // States
  abstract class PostState {}
  class PostInitial extends PostState {}
  class PostLoading extends PostState {}
  class PostLoaded extends PostState {
    final List<dynamic> posts;
    PostLoaded(this.posts);
  }
  class PostError extends PostState {
    final String message;
    PostError(this.message);
  }
  
  // BLoC
  class PostBloc extends Bloc<PostEvent, PostState> {
    PostBloc() : super(PostInitial()) {
      on<FetchPosts>((event, emit) async {
        emit(PostLoading());
        try {
          final response = await http.get(Uri.parse('https://jsonplaceholder.typicode.com/posts'));
          if (response.statusCode == 200) {
            final List<dynamic> posts = json.decode(response.body);
            emit(PostLoaded(posts));
          } else {
            emit(PostError('Failed to load posts'));
          }
        } catch (e) {
          emit(PostError('An error occurred: $e'));
        }
      });
    }
  }
  
  class MyApp extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
      return MaterialApp(
        home: BlocProvider(
          create: (context) => PostBloc()..add(FetchPosts()),
          child: Scaffold(
            appBar: AppBar(title: Text('Posts')),
            body: BlocBuilder<PostBloc, PostState>(
              builder: (context, state) {
                if (state is PostInitial) {
                  return Center(child: Text('Press the button to load posts'));
                } else if (state is PostLoading) {
                  return Center(child: CircularProgressIndicator());
                } else if (state is PostLoaded) {
                  return ListView.builder(
                    itemCount: state.posts.length,
                    itemBuilder: (context, index) {
                      return ListTile(
                        title: Text(state.posts[index]['title']),
                        subtitle: Text(state.posts[index]['body']),
                      );
                    },
                  );
                } else if (state is PostError) {
                  return Center(child: Text(state.message));
                }
                return Container();
              },
            ),
            floatingActionButton: FloatingActionButton(
              onPressed: () => context.read<PostBloc>().add(FetchPosts()),
              child: Icon(Icons.refresh),
            ),
          ),
        ),
      );
    }
  }
      `
    },
    option2: {
      framework: "React Native",
      code: `
  // Using axios for network requests and React Query for data fetching/caching
  
  import React from 'react';
  import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
  import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
  import axios from 'axios';
  
  const queryClient = new QueryClient();
  
  const fetchPosts = async () => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return data;
  };
  
  function PostList() {
    const { isLoading, isError, data, error } = useQuery('posts', fetchPosts);
  
    if (isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
  
    if (isError) {
      return <Text>Error: {error.message}</Text>;
    }
  
    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    );
  }
  
  function App() {
    return (
      <QueryClientProvider client={queryClient}>
        <View style={styles.container}>
          <PostList />
        </View>
      </QueryClientProvider>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 22
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
  export default App;
      `
    }
  },
  {
    type: 'code',
    question: "How would you implement a simple fade-in animation for a logo when a screen loads?",
    option1: {
      framework: "Flutter",
      code: `
  import 'package:flutter/material.dart';
  
  class AnimatedLogo extends StatefulWidget {
    @override
    _AnimatedLogoState createState() => _AnimatedLogoState();
  }
  
  class _AnimatedLogoState extends State<AnimatedLogo> with SingleTickerProviderStateMixin {
    late AnimationController _controller;
    late Animation<double> _animation;
  
    @override
    void initState() {
      super.initState();
      _controller = AnimationController(
        duration: const Duration(seconds: 2),
        vsync: this,
      );
      _animation = CurvedAnimation(
        parent: _controller,
        curve: Curves.easeIn,
      );
      _controller.forward();
    }
  
    @override
    Widget build(BuildContext context) {
      return FadeTransition(
        opacity: _animation,
        child: Container(
          width: 200,
          height: 200,
          color: Colors.blue,
          child: Center(
            child: Text(
              'Logo',
              style: TextStyle(color: Colors.white, fontSize: 24),
            ),
          ),
        ),
      );
    }
  
    @override
    void dispose() {
      _controller.dispose();
      super.dispose();
    }
  }
  
  class MyApp extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
      return MaterialApp(
        home: Scaffold(
          body: Center(
            child: AnimatedLogo(),
          ),
        ),
      );
    }
  }
      `
    },
    option2: {
      framework: "React Native",
      code: `
  import React, { useEffect } from 'react';
  import { View, Text, StyleSheet } from 'react-native';
  import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
  } from 'react-native-reanimated';
  
  const AnimatedLogo = () => {
    const opacity = useSharedValue(0);
  
    useEffect(() => {
      opacity.value = withTiming(1, {
        duration: 2000,
        easing: Easing.ease,
      });
    }, []);
  
    const animatedStyle = useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
      };
    });
  
    return (
      <Animated.View style={[styles.logo, animatedStyle]}>
        <Text style={styles.text}>Logo</Text>
      </Animated.View>
    );
  };
  
  const App = () => {
    return (
      <View style={styles.container}>
        <AnimatedLogo />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: 200,
      height: 200,
      backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: 'white',
      fontSize: 24,
    },
  });
  
  export default App;
      `
    }
  }
];

export default function FlutterReactNativeQuiz() {
  const [currentScreen, setCurrentScreen] = useState('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ flutter: 0, reactNative: 0 });
  const [fullScreenCode, setFullScreenCode] = useState(null);

  const handleStart = () => {
    setCurrentScreen('quiz');
  };

  const handleAnswer = (option) => {
    if (option === 'option1') {
      setScores(prev => ({ ...prev, flutter: prev.flutter + 1 }));
    } else {
      setScores(prev => ({ ...prev, reactNative: prev.reactNative + 1 }));
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentScreen('result');
    }
  };

  const screenVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const renderQuestionContent = (question, option) => {
    switch (question.type) {
      case 'code':
        return (
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-lg">{option.framework}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFullScreenCode({ framework: option.framework, code: option.code });
                }}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
              >
                <MaximizeIcon size={20} />
              </button>
            </div>
            <div className="flex-grow overflow-auto custom-scrollbar">
              <SyntaxHighlighter 
                language="javascript" 
                style={tomorrow} 
                className="text-sm h-full"
                customStyle={{ height: '100%', borderRadius: "4px" }}
              >
                {option.code.trim()}
              </SyntaxHighlighter>
            </div>
          </div>
        );
     case 'preference':
        return (
          <div className="h-full flex flex-col justify-center">
            <p className="mb-2 font-semibold text-lg">{option.framework}</p>
            <p>{option.description}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <motion.div
        className="bg-slate-200 rounded-xl shadow-2xl p-8 max-w-5xl w-full border border-gray-900 flex flex-col items-center gap-8"
        variants={screenVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1 className="text-4xl text-gray-800">&quot;React Native v/s Flutter&quot; Survey</h1>
        {currentScreen === 'intro' && (
          <motion.div className="flex flex-col gap-12" variants={screenVariants}>
            <p className=" leading-6 text-gray-600 text-xl italic">
              Developers are sentitive creatures, who are extremely susceptible to subtle nuances, personal preference and taste. This survey is designed to take you through an exploratory journey on finiding what you might like better today and let tomorrow decide for itself.
            </p>
            <button
              onClick={handleStart}
              className="bg-purple-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-purple-700 transition duration-300 shadow-lg"
            >
              Start Survey
            </button>
          </motion.div>
        )}

        {currentScreen === 'quiz' && (
          <motion.div className="space-y-8" variants={screenVariants}>
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">{questions[currentQuestion].question}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                className="bg-blue-100 p-6 rounded-lg cursor-pointer hover:bg-blue-200 transition duration-300 shadow-md h-[360px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer('option1')}
              >
                {renderQuestionContent(questions[currentQuestion], questions[currentQuestion].option1)}
              </motion.div>
              <motion.div
                className="bg-purple-100 p-6 rounded-lg cursor-pointer hover:bg-purple-200 transition duration-300 shadow-md h-[360px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer('option2')}
              >
                {renderQuestionContent(questions[currentQuestion], questions[currentQuestion].option2)}
              </motion.div>
            </div>
            <div className="mt-8 text-center text-gray-600 text-lg">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </motion.div>
        )}

        {currentScreen === 'result' && (
          <motion.div className="text-center" variants={screenVariants}>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Quiz Results</h2>
            <p className="mb-6 text-gray-600 text-xl">Based on your preferences:</p>
            <div className="flex justify-around mb-8">
              <div className="text-center">
                <p className="font-semibold text-blue-600 text-2xl mb-2">Flutter Score</p>
                <p className="text-4xl font-bold">{scores.flutter}</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-purple-600 text-2xl mb-2">React Native Score</p>
                <p className="text-4xl font-bold">{scores.reactNative}</p>
              </div>
            </div>
            <p className="mb-8 text-gray-700 text-xl">
              {scores.flutter > scores.reactNative 
                ? "Flutter seems to align better with your preferences and coding style!"
                : "React Native appears to be a better fit for your development approach!"}
            </p>
            <button
              onClick={() => {
                setCurrentScreen('intro');
                setCurrentQuestion(0);
                setScores({ flutter: 0, reactNative: 0 });
              }}
              className="bg-green-500 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-green-600 transition duration-300 shadow-lg"
            >
              Take the Quiz Again
            </button>
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {fullScreenCode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setFullScreenCode(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{fullScreenCode.framework} Code</h3>
                <button
                  onClick={() => setFullScreenCode(null)}
                  className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
                >
                  <XIcon size={24} />
                </button>
              </div>
              <div className="overflow-auto max-h-[calc(90vh-100px)] custom-scrollbar">
                <SyntaxHighlighter 
                  language="javascript" 
                  style={tomorrow} 
                  className="text-sm"
                  showLineNumbers
                >
                  {fullScreenCode.code.trim()}
                </SyntaxHighlighter>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}