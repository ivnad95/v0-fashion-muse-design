
import { Tabs } from 'expo-router';
import { Home, Clock, Star } from 'lucide-react-native';
import { Colors } from '../constants';

export default () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.accentBlue,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.primaryDark,
          borderTopColor: Colors.glassBorder,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => <Clock color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="results"
        options={{
          title: 'Results',
          tabBarIcon: ({ color, size }) => <Star color={color} size={size} />,
          href: null, // Hide this tab from the tab bar
        }}
      />
    </Tabs>
  );
};
