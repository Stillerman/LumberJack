import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';
import 'package:test_boogie/Bridge.dart';
import 'package:test_boogie/main.dart';

import 'NewLogger.dart';
import 'Store.dart';
import 'NewTimeline.dart';

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

  Widget meat() {
    if (widget.appState == AppState.Logging) return Logger();
    if (widget.appState == AppState.Browsing) return Timeline();
    else
      return Text('Something went wrong');
  }

  @override
  Widget build(BuildContext ctx) {
    return ChangeNotifierProvider<Store>(
      builder: (_) => Store(bridge),
      child: meat()
    );
  }
}

