import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';
import 'package:test_boogie/EventTypes.dart';
import 'package:intl/intl.dart';

import 'Store.dart';
import 'TemplateEngine.dart';

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

  delete(Store store) async {
    await store.bridge.delete('/userEvents/' + widget.userEvent.id);
    store.fetchUserEvents();
  }

  stop(Store store) async {
    await store.bridge.post('/userEvents/end/' + widget.userEvent.id, {});
    store.fetchUserEvents();
  }

  edit(Store store) {}


  List<Widget> getActionButtons(Store store) {
    var result = <Widget>[
      FlatButton(
        child: Text('Delete'),
        onPressed: () => delete(store)
      ),
      FlatButton(
        child: Text('Edit'),
        onPressed: () => edit(store)
      ),

    ];
    
    if (widget.userEvent.onGoing) result.add(FlatButton(
                    child: Text('Stop'),
                    onPressed: () => stop(store)
                  ));
    
    return result;
  }

  Widget title() {
    return Material(
      color: Colors.orange[200],
      borderRadius: BorderRadius.circular(10),
      child: InkWell(
        onTap: toggleExpanded,
        child: Container(
          padding: EdgeInsets.all(12.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            // direction: Axis.horizontal,
            // alignment: WrapAlignment.spaceBetween,
            // spacing: 10.0,
            
            children: <Widget>[
              Padding(padding: EdgeInsets.all(6.0), child: widget.userEvent.eventType.getIcon()),
              Expanded(child: Text(widget.userEvent.getSentence())),
              Text(DateFormat('E', 'en_US').add_jm().format(widget.userEvent.when))              
            ],
          ),
        ),
      ),
    );
  }

  Widget expandedView(Store store) {
    return Container(
      decoration: BoxDecoration(
          color: Colors.orange[100],
          borderRadius: BorderRadius.circular(10)),
      child: Column(children: <Widget>[
        title(),
        Padding(
          padding: EdgeInsets.all(12.0),
          child: Column(
            children: <Widget>[
              Text(widget.userEvent.data.toString()),
              Text(widget.userEvent.eventType.data.toString()),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: getActionButtons(store),
              )
            ],
          ),
        )
      ]),
    );
  }

  Widget meat(Store store) {
    if (expanded)
      return expandedView(store);
    else
      return title();
  }

  // @override
  // Widget build(BuildContext context) {
  //   return Padding(
  //     padding: EdgeInsets.all(6.0),
  //     child: Material(
  //       color: Color.fromRGBO(225, 225, 225, 1),
  //       borderRadius: BorderRadiusDirectional.circular(8.0),
  //       child: InkWell(
  //           splashColor: Colors.orangeAccent,
  //           onTap: toggleExpanded, // needed
  //           child: Container(
  //               padding: EdgeInsets.all(6.0), child: meat())),
  //     ),
  //   );
  // }

  @override
  Widget build(BuildContext context) {
    final Store store = Provider.of<Store>(context);
    return Padding(padding: EdgeInsets.all(6.0), child: meat(store));
  }
}

class UserEvent {
  dynamic data;
  dynamic fields;
  EventType eventType;
  String type;
  DateTime when;
  String id;
  bool onGoing;

  @override
  String toString() {
    return this.data.toString();
  }

  Widget toWidget() {
    return UserEventWidget(this);
  }

  UserEvent.withMetadata(this.data, List<EventType> eventTypes) {
    type = data['type'].toString().toLowerCase();
    fields = data['fields'] ?? {};
    id = data['_id'];
    onGoing = data['ongoing'] ?? false;
    
    String whenString = fields['when'] ?? data['createdAt'] ?? DateTime.now().toString();

    when = DateTime.parse(whenString).toLocal();

    var candidates = eventTypes
        .where((et) => (et.presentTense == type || et.pastTense == type));
    if (candidates.length > 0)
      eventType = candidates.first;
    else {
      print('Could not pair metadata for type $type');
      eventType = eventTypes.firstWhere(
          (et) => et.pastTense == 'drank (caffiene)',
          orElse: () => eventTypes.elementAt(0));
    }
  }

  String getSentence() {
    return renderTemplate(
        'You ' + (eventType.sentenceFragment ?? eventType.pastTense),
        (data['fields'] as Map<String, dynamic> ?? {})
            .map((key, val) => MapEntry(key, val.toString())));
    // return eventType.sentenceFragment;
  }
}
