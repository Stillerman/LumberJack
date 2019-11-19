import 'dart:convert';

import 'package:flutter/material.dart';

import 'package:flutter/widgets.dart';
import 'package:test_boogie/Bridge.dart';

import '../lib/EventTypes.dart';
import '../lib/Store.dart';

class Logging extends StatefulWidget {
  final Bridge bridge;
  final Store store;

  Logging(this.store, this.bridge);

  @override
  State<StatefulWidget> createState() {
    return _LoggingState(store, bridge);
  }
}

class _LoggingState extends State<Logging> {
  List<EventType> eventTypes = [];
  EventType selectedEventType;
  Bridge bridge;
  Store store;

  Map<String, String> currentEventData = {};

  _LoggingState(this.store, this.bridge) {
    store.addListener(listener);
  }

  void listener () {
      setState(() {
        eventTypes = store.eventTypes as List<EventType>;
      });
    }


  void dispose() {
    super.dispose();
    store.removeListener(listener);
  }

  List<Widget> iconButtons() {
    return eventTypes.map((et) {
      return et.toButton(selectedEventType == et, () {
        setState(() {
          selectedEventType = et;
        });
      });
    }).toList();
  }

  List<Widget> getQuestionWidgets() {
    if (selectedEventType?.fields == null) return [];
    return selectedEventType.fields.map((field) {
      return field.toQuestionWidget((Map<String, String> response) {
        setState(() {
          currentEventData = <String, String>{
            ...currentEventData,
            ...response
          };
        });
      });
    }).toList();
  }

  void submitEvent () {
    bridge.post('/userEvents/', {
      'fields': json.encode(currentEventData),
      'type': selectedEventType.pastTense
      }).then((result) {
      print('Result ${result.body.toString()}');
      store.fetchUserEvents();
    });
  }

  Widget submitWidget() {
    return Padding(
      padding: EdgeInsets.all(6.0),
      child: Column(children: <Widget>[
        Text(currentEventData.toString()),
        FlatButton(child: Text('Submit'), onPressed: submitEvent,)
        ]
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        child: PageView(
      scrollDirection: Axis.vertical,
      children: <Widget>[
        Padding(
          padding: EdgeInsets.all(25.0),
          child: Wrap(
            direction: Axis.horizontal,
            spacing: 15.0,
            runSpacing: 10.0,
            alignment: WrapAlignment.center,
            children: iconButtons(),
          ),
        ),
        ...getQuestionWidgets(),
        submitWidget()
      ],
    ));
  }
}
