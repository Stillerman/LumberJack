import 'dart:convert';
import 'package:flutter/widgets.dart';
import 'package:test_boogie/Bridge.dart';
import 'package:test_boogie/EventTypes.dart';

import 'UserEvent.dart';

class Store with ChangeNotifier {
  Bridge _bridge;

  Store(this._bridge) {
    fetch();
  }

  void fetch() async {
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

    userEvents = (json.decode(response.body)['data'] as List<dynamic>)
        .map((ue) => UserEvent.withMetadata(ue, eventTypes))
        .toList()
          ..sort((et1, et2) =>
              et2.when.compareTo(et1.when)); // sorts events recent first

    return userEvents;
  }

  List<EventType> _eventTypes = [];
  List<UserEvent> _userEvents = [];
  EventType _selectedEventType;
  Map<String, String> _currentEventData = {};

  List<EventType> get eventTypes => _eventTypes;
  List<UserEvent> get userEvents => _userEvents;
  EventType get selectedEventType => _selectedEventType;
  dynamic get currentEventData => _currentEventData;
  Bridge get bridge => _bridge;
  set eventTypes(List<EventType> ets) {
    _eventTypes = ets;
    notifyListeners();
  }

  set userEvents(List<UserEvent> usrEvts) {
    _userEvents = usrEvts;
    notifyListeners();
  }

  set selectedEventType(EventType newEt) {
    _selectedEventType = newEt;
    notifyListeners();
  }

  set currentEventData(Map<String, String> newCED) {
    _currentEventData = newCED;
    notifyListeners();
  }
}
