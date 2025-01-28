import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

// Request Permission for Notifications
export const requestNotificationPermission = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "YOUR_PUBLIC_VAPID_KEY",
    });
    console.log("Notification Token:", token);
    return token;
  } catch (error) {
    console.error("Error getting notification permission:", error);
  }
};

// Listen for incoming notifications
onMessage(messaging, (payload) => {
  console.log("Message received:", payload);
  alert(`Reminder: ${payload.notification.title}`);
});

export { messaging };
