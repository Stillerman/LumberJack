import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:property_change_notifier/property_change_notifier.dart';
import 'package:test_boogie/Bridge.dart';
import 'package:test_boogie/EventTypes.dart';

import 'UserEvent.dart';

class Store extends PropertyChangeNotifier<String> {
  Bridge bridge;

  Store(this.bridge) {
    fetch();
  }

  void fetch () async {
    await fetchEventTypes();
    await fetchUserEvents();
  }

  Future fetchEventTypes() async {
    var response = await bridge.httpGet('/eventTypes');

    eventTypes = (json.decode(response.body)['data'] as List<dynamic>)
        .map((et) => EventType(et))
        .toList();

    return eventTypes;
  }

  Future fetchUserEvents() async {
    var response = await bridge.httpGet('/userEvents');

    userEvents = (json.decode(response.body)['data'] as List<dynamic>).
    map((ue) => UserEvent.withMetadata(ue, eventTypes)).toList();

    return userEvents;
  }

  List<EventType> _eventTypes = [];
  List<UserEvent> _userEvents = [];

  List<EventType> get eventTypes => _eventTypes;
  List<UserEvent> get userEvents => _userEvents;

  set eventTypes(List<EventType> ets) {
    _eventTypes = ets;
    notifyListeners('eventTypes');
  }

  set userEvents(List<UserEvent> usrEvts) {
    _userEvents = usrEvts;
    notifyListeners('userEvents');
  }
}
