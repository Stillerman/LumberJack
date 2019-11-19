import 'package:flutter/material.dart';
import 'package:test_boogie/Bridge.dart';
import 'package:test_boogie/UserEvent.dart';

import '../lib/Store.dart';

class Timeline extends StatefulWidget {
  final Bridge bridge;
  final Store store;

  Timeline(this.store, this.bridge);

  @override
  State<StatefulWidget> createState() {
    return _TimelineState(store, bridge);
  }
}

class _TimelineState extends State<Timeline> {
  List<UserEvent> userEvents = [];
  Bridge bridge;
  Store store;

  _TimelineState(this.store, this.bridge) {
    userEvents = store.userEvents as List<UserEvent>;

    store.addListener(listener);
  }

  void listener() {
      setState(() {
        userEvents = store.userEvents as List<UserEvent>;
      });
    }
  
  @override
  void dispose() {
    store.removeListener(listener);
    super.dispose();
  }

  Iterable<Widget> getUserEventWidgets() {
    return userEvents.map((event) {
      return event.toWidget();
    }).toList();
  }

  @override
  Widget build(BuildContext ctx) {
    return Container(
      padding: EdgeInsets.all(6.0),
      child: RefreshIndicator(
        onRefresh: store.fetchUserEvents,
          child: ListView(
        padding: const EdgeInsets.all(8),
        children: getUserEventWidgets(),
      )),
    );
  }
}
