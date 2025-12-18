import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import OnBoardingScreen from "./Screens/onBoarding";
import Profile from "./Screens/Profile";
import SplashScreen from "./Screens/SplashScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnBoardingDone, setIsOnboardingDone] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem("onboardingCompleted");

        if (value === "true") {
          setIsOnboardingDone(true);
        }
      } catch (e) {
        console.log("Error reading AsyncStorage", e);
      } finally {
        setIsLoading(false);
      }
    };
    checkOnboarding();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <>
      <StatusBar
        translucent={true}
        barStyle="defualt" // Options: 'default', 'light-content', 'dark-content'
      ></StatusBar>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {},
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          {isOnBoardingDone ? (
            <Stack.Screen name="Profile">
              {(props) => (
                <Profile {...props} setIsOnboardingDone={setIsOnboardingDone} />
              )}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="onBoarding">
              {(props) => (
                <OnBoardingScreen
                  {...props}
                  setIsOnboardingDone={setIsOnboardingDone}
                />
              )}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
