# Drivers Coop Software Engineering Takehome

This is a takehome technical project for applicants to The Drivers Cooperative.

Please read this README in its entirety before getting started.

## How to take this test

The goal is to write a new API on server and client similar to APIs we use at
TDC. In the followup discussion after you finish working on the takehome, you'll
discuss your solution and how you arrived at it.

Please don't spend more than 3-5 hours on this project. If you don't have a full
solution at the end of 3-5 hours, think about how you would complete the project
and send it in.

To submit, create a branch called `first-last` and commit your changes there.
Next, push your branch to a repo on your personal GitHub and share to
`jasonprado`. Email `jobs@drivers.coop` or your previous contact (probably
Jason) to let us know you're done.

## Getting Started

1. Run the server: `cd server && yarn install && yarn run start`
1.
   [Set up the React Native development environment](https://reactnative.dev/docs/environment-setup).
   If you have not previously set up the React Native environment, expect this
   to take up to an hour.
  * Follow the `React Native CLI Quickstart`, not the `Expo CLI Quickstart`. You
   can target the iOS simulator or Android emulator. The Xcode/iOS approach
   tends to be faster.
1. For Android: Register for a
   [Google Maps API Key](https://developers.google.com/maps/documentation/android-sdk/get-api-key)
   and set it in the file at
   `carmapclient/android/app/src/main/AndroidManifest.xml`. Be careful not to
   share this key in a public repository, or revoke the key when you are done
   with the takehome.
1. Run the client: `cd carmapclient && yarn install && yarn run <ios/android>`


At this point, the application should launch in your local simulator and display a map.
  

## Background

The client experiences we build at TDC update information in real time. The
location of a driver and rider are continually updated over GPS. We must sync
this data between our backends and clients.

This project contains a simulation of vehicles in Manhattan. Each vehicle
chooses a random starting point and destination, and on each tick of a timer it
simulates moving towards its location. This simulates GPS updates from our fleet
of drivers.

## Objective

In this project you will create an API on the server that publishes updates
about the simulated locations of vehicles as well as a client UX displaying the
simulated vehicles on a map. A simulation of vehicle locations is already
running in the server. Your task is to wire up this simulation to an API that
can be consumed by the client, and then to place markers on the client's map
representing each vehicle.


## Notes

* The vehicle simulation can be found in `server/src/carLocationGenerator.ts`.
  There is a comment suggesting where to publish updated locations.
* Support for GraphQL subscriptions has already been set up in both the client
  and the server.
* The setup assumes you are running the client application in an iOS simulator
  or Android emulator. Currently the client will not connect to your development
  server if you run it on an actual device.
* There is a png you can use for the vehicle marker at
  `carmapclient/components/Car.png`.
* If you are using an M1 Mac computer, you may run into problems using CocoaPods
  for iOS development. See resources below.


## Documentation

* Apollo GraphQL subscriptions are documented for
  [client](https://www.apollographql.com/docs/react/data/subscriptions/) and
  [server](https://www.apollographql.com/docs/apollo-server/data/subscriptions/).
* The `MapView` is provided by
  [react-native-maps](https://github.com/react-native-maps/react-native-maps).
* M1 MacBooks have some issues running some tools. This
  [GitHub issue comment](https://github.com/CocoaPods/CocoaPods/issues/10518#issuecomment-798921838)
  has instructions.

## Acknowledgements

Huge thanks to [Politics Rewired](https://politicsrewired.com/) for the
structure of this document.