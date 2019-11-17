import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
// import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:test_boogie/Bridge.dart';
import 'package:test_boogie/main.dart';

import 'Logger.dart';
import 'Store.dart';
import 'Timeline.dart';

class FlutterJack extends StatefulWidget {
  final String jWT;
  final AppState appState;

  FlutterJack(this.jWT, this.appState);

  @override
  State<StatefulWidget> createState() {
    return _FlutterJackState(jWT);
  }
}


class _FlutterJackState extends State<FlutterJack> {
  Bridge bridge;
  Store store;

  _FlutterJackState(String jWT) {
    bridge = Bridge(jWT);
    store = Store(bridge);
  }

  @override
  Widget build(BuildContext ctx) {
    if (widget.appState == AppState.Logging) return Logging(store, bridge);
    if (widget.appState == AppState.Browsing) return Timeline(store, bridge);
    else
      return Text('Something went wrong');
  }
}

