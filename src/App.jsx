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
  onPress={() => console.log('Button pressed!')}
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
    type: 'preference',
    question: "Which approach to styling do you prefer?",
    option1: {
      framework: "Flutter",
      description: "Widget-based styling with ThemeData and custom Themes"
    },
    option2: {
      framework: "React Native",
      description: "JavaScript object-based styling with StyleSheet"
    }
  },
  {
    type: 'preference',
    question: "Which navigation system seems more intuitive to you?",
    option1: {
      framework: "Flutter",
      description: "Navigator 2.0 with RouteInformationParser and RouterDelegate"
    },
    option2: {
      framework: "React Native",
      description: "React Navigation with Stack, Tab, and Drawer Navigators"
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
                customStyle={{ height: '100%' }}
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
      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(155, 155, 155, 0.5);
          border-radius: 20px;
          border: transparent;
        }
      `}</style>
      <motion.div
        className="bg-white rounded-xl shadow-2xl p-8 max-w-5xl w-full"
        variants={screenVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">React Native vs Flutter</h1>
        
        {currentScreen === 'intro' && (
          <motion.div className="text-center" variants={screenVariants}>
            <p className="mb-8 text-gray-600 text-lg">
              This advanced quiz will help you compare React Native and Flutter based on code examples, 
              documentation styles, and framework-specific approaches. Answer the questions to see which 
              framework aligns better with your preferences and coding style.
            </p>
            <button
              onClick={handleStart}
              className="bg-blue-500 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-blue-600 transition duration-300 shadow-lg"
            >
              Start Advanced Quiz
            </button>
          </motion.div>
        )}

        {currentScreen === 'quiz' && (
          <motion.div className="space-y-8" variants={screenVariants}>
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">{questions[currentQuestion].question}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                className="bg-blue-100 p-6 rounded-lg cursor-pointer hover:bg-blue-200 transition duration-300 shadow-md h-[500px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer('option1')}
              >
                {renderQuestionContent(questions[currentQuestion], questions[currentQuestion].option1)}
              </motion.div>
              <motion.div
                className="bg-purple-100 p-6 rounded-lg cursor-pointer hover:bg-purple-200 transition duration-300 shadow-md h-[500px]"
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