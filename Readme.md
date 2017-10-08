### Steps to install and debug App
```
npm install -g react-native-cli
npm install

react-native run-ios
react-native run-android

npm run android
npm run ios
```

---

### To setup/upgrade react-native android & ios folders

```
react-native upgrade
```

---

### Configure Icons and Fonts
- add an icon named icon.png (256 x 256) to your project root. Then run:
```
app-icon generate --platforms=android,ios
```

- `react-native link react-native-vector-icons` then edit android/app/build.gradle ( NOT android/build.gradle ) and add the following:
```
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

### Configure Spalsh Screen
adding some code did the trick, explained [here](https://medium.com/handlebar-labs/how-to-add-a-splash-screen-to-a-react-native-app-ios-and-android-30a3cec835ae)

---

### Configure Push Notification
added [react-native-onesignal](https://www.npmjs.com/package/react-native-onesignal) to enable push notifications

---

### Configure CodePush
- Account and App Management
```
https://microsoft.github.io/code-push/docs/cli.html
```

- React Native app integration
```
https://microsoft.github.io/code-push/docs/react-native.html
```

---

### App UI Styling
```
http://nativebase.io
```

NativeBase is packed with three preset themes.

- Platform: The default theme of NativeBase which maps to the design of the platform where the app runs.

- Material: Sometimes, you need Material design for both the platforms. Not everyone is a fan but Google does use Material design on iOS. This theme is not 100% material yet but it can be used today.

- Common Colors: Most of the brands use a common color scheme for both the platforms but they also follow platform specific icons, font and orientation of the components. Common Colors theme is best suited for such use-cases.
