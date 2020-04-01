# iOS app to export Heart Rate & Resting Heart Rate data from Apple to Open Humans

This is a simple app that exports both regular heart rate readings as well as resting heart rate readings from _Apple Health_ into [Open Humans](https://www.openhumans.org). The app is done in _react-native_ and

## Development setup

People actually knowing what they do probably don't need this, but @gedankenstuecke never used this before, so he came up with this:

### Required files
There is two files you will want to move into a proper place:

```
mv ios/fluapp.xcodeproj/project.pbxproj.EXAMPLE ios/fluapp.xcodeproj/project.pbxproj
mv src/common/config.js.EXAMPLE src/common/config.js
```

Especially the last file will need to be edited to make this app work, fill in the `CLIENT_ID` & `CLIENT_SECRET` with your Open Humans credentials you got for your project.

###
Follow the [instructions on the _react-natitive_ website](https://reactnative.dev/docs/environment-setup).

From there on you can clone this repo and then try to do the following (there might be redundant steps, but @gedankenstuecke used this workflow to make it work)

```
cd qf-heartrate-apple-health
npm install
npm ci
cd ios/
pod install
cd ..
npm start -- --reset-cache
npx react-native run-ios
```

This should ultimately boot up the iOS simulator with the app running.

## Contributors

The bulk of the work for this app has been done by [Lukasz Baldy](https://www.linkedin.com/in/lukasz-baldy-26318b44/),
who was kind enough to volunteer an extraordinary amount of time as part of his on-going efforts with the [Open COVID-19 initiative](https://app.jogl.io/program/opencovid19).

Minor contributions were done by [Bastian Greshake Tzovaras](https://github.com/gedankenstuecke).

### Contributing

Check out our issues if there's open things. Also always get in touch via the #quantifiedflu channel in the Open Humans slack at https://slackin.openhumans.org
