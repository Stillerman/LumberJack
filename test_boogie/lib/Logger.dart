import 'dart:convert';

import 'package:flutter/material.dart';

import 'package:flutter/widgets.dart';
import 'package:test_boogie/Bridge.dart';
import 'package:test_boogie/Icons.dart';
import 'package:test_boogie/Nouns.dart';

import 'EventTypes.dart';
import 'Store.dart';


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

  dynamic currentEventData = {};

  _LoggingState(this.store, this.bridge) {
    store.addListener((){
      setState(() {
        eventTypes = store.eventTypes;
      });
    });
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
      return field.toQuestionWidget((dynamic response) {
        setState(() {
          currentEventData = <String, dynamic>{
            ...currentEventData,
            ...response
          };
        });
      });
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        child: Column(
      children: <Widget>[
        Text(currentEventData.toString()),
        Text(selectedEventType != null
            ? selectedEventType.data['icon']
            : 'null'),
        Padding(
          padding: EdgeInsets.all(25.0),
          child: Wrap(
            direction: Axis.horizontal,
            spacing: 15.0,
            runSpacing: 10.0,
            alignment: WrapAlignment.spaceAround,
            children: iconButtons(),
          ),
        ),
        ...getQuestionWidgets()
      ],
    ));
  }
}
