import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'Store.dart';

class Logger extends StatelessWidget {

  List<Widget> iconButtons(Store store) {
    return store.eventTypes.map((et) {
      return et.toButton(store.selectedEventType == et, () {
        store.selectedEventType = et;
      });
    }).toList();
  }

    List<Widget> getQuestionWidgets(Store store) {
    if (store.selectedEventType?.fields == null) return [];

    return store.selectedEventType.fields.map((field) {
      return field.toQuestionWidget((Map<String, String> response) {
        
          store.currentEventData = <String, String>{
            ...store.currentEventData,
            ...response
          };
      
      });
    }).toList();
  }

  void submitEvent (Store store) {
    store.bridge.post('/userEvents/', {
      'fields': json.encode(store.currentEventData),
      'type': store.selectedEventType.pastTense
      }).then((result) {
      print('Result ${result.body.toString()}');
      store.fetchUserEvents();
    });
  }

    Widget submitWidget(Store store) {
    return Padding(
      padding: EdgeInsets.all(6.0),
      child: Column(children: <Widget>[
        Text(store.currentEventData.toString()),
        FlatButton(child: Text('Submit'), onPressed: () => submitEvent(store),)
        ]
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final store = Provider.of<Store>(context);

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
            children: iconButtons(store),
          ),
        ),
        ...getQuestionWidgets(store),
        submitWidget(store)
      ],
    ));
  }
}