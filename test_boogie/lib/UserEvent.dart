import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:test_boogie/EventTypes.dart';

class UserEventWidget extends StatefulWidget {
  final UserEvent userEvent;

  UserEventWidget(this.userEvent);

  @override
  State<StatefulWidget> createState() {
    return _UserEventState();
  }
}

class _UserEventState extends State<UserEventWidget> {
  bool expanded = false;

  void toggleExpanded() {
    setState(() {
      expanded = !expanded;
    });
  }

  Widget title() {
    return Row(
      children: <Widget>[
        widget.userEvent.eventType.getIcon(),
        Text(widget.userEvent.data['type']),
        Text(widget.userEvent.data['createdBy'])
      ],
    );
  }

  Widget expandedView() {
    return Column(children: <Widget>[
      title(),
      Text(widget.userEvent.data.toString()),
      Text(widget.userEvent.eventType.data.toString())
    ]);

  }

  Widget meat() {
    if (expanded) return expandedView();
    else return title();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(6.0),
      child: Material(
        // needed
        color: Color.fromRGBO(225, 225, 225, 1),
        borderRadius: BorderRadiusDirectional.circular(8.0),
        child: InkWell(
            splashColor: Colors.orangeAccent,
            onTap: toggleExpanded, // needed
            child: Container(
                padding: EdgeInsets.all(6.0), child: meat())),
      ),
    );
  }
}

class UserEvent {
  dynamic data;
  EventType eventType;
  String type;

  @override
  String toString() {
    return this.data.toString();
  }

  Widget toWidget() {
    return UserEventWidget(this);
  }

  UserEvent(this.data) {
    type = data['type'].toString().toLowerCase();
  }

  UserEvent.withMetadata(this.data, List<EventType> eventTypes) {
    type = data['type'].toString().toLowerCase();
    
    var candidates = eventTypes.where((et) => (et.presentTense == type || et.pastTense == type));
    if (candidates.length > 0) eventType = candidates.first;
    else {
      print([type, eventTypes.map((et) => [et.pastTense, et.presentTense]).toList()]);
      eventType = eventTypes.first;
    }
  }
}
