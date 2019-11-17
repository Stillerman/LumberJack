import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

import 'Icons.dart';
import 'Nouns.dart';

class EventTypeButton extends StatelessWidget {
  final EventType eventType;

  final Null Function() callback;
  final bool selected;

  EventTypeButton(this.eventType, this.selected, this.callback);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: <Widget>[
          FloatingActionButton(
            backgroundColor: selected ? Colors.orange : Colors.white,
            onPressed: callback,
            child: eventType.getIcon(),
          ),
        ],
      ),
    );
  }
}

enum FieldType { string, stringList, noun, nounList, time, number, text }

FieldType getFieldTypeFromString(String name) {
  switch (name.toLowerCase()) {
    case 'string list':
      return FieldType.stringList;
      break;
    case 'number':
      return FieldType.number;
      break;
    case 'time':
      return FieldType.time;
      break;
    case 'text':
      return FieldType.text;
      break;
    case 'noun':
      return FieldType.noun;
      break;
    case 'noun list':
      return FieldType.nounList;
    default:
      return FieldType.string;
  }
}

class EventTypeField {
  dynamic fieldData;
  String name;
  bool mandatory;
  String nounType;
  FieldType fieldType;
  String description;

  EventTypeField(this.fieldData) {
    fieldType = getFieldTypeFromString(fieldData['type']);
    name = fieldData['name'];
    description = fieldData['description'] ?? name + ' field';
  }

  Widget toQuestionWidget(Null Function(dynamic response) cb) {
    Widget helper() {
      switch (fieldType) {
        case FieldType.string:
          return Container(
            child: TextFormField(
              onChanged: (val) {
                cb({name: val});
              },
            ),
          );
          break;
        case FieldType.nounList:
          return NounListSelector(nounType, (val) {
            cb({name: val});
          });
        default:
          return Text('Not yet implemented');
      }
    }

    return Container(
      child: Padding(
        padding: EdgeInsets.all(15.0),
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(5.0),
            color: Colors.grey
          ),
          padding: EdgeInsets.all(10.0),
          child: Column(
          children: <Widget>[Text(name), Text(description), helper()],
        ),)
      ),
    );
  }
}

class EventType {
  dynamic data;

  String pastTense;
  String presentTense;
  String sentenceFragment;
  String paragraphTemplate;
  String icon;
  List<EventTypeField> fields;
  bool onGoing;

  EventType(this.data) {
    this.pastTense = data['pastTense'].toString().toLowerCase();
    this.presentTense = data['presentTense'].toString().toLowerCase();
    this.sentenceFragment = data['sentenceFragment'] ?? null;
    this.paragraphTemplate = data['paragraphTemplate'] ?? null;
    this.icon = data['icon'];
    this.fields = (data['fields'] as List<dynamic>).map((fieldData) {
      return EventTypeField(fieldData);
    }).toList();
  }

  Widget getIcon() {
    return lookupIcon(icon);
  }

  Widget toButton(bool selected, Null Function() cb) {
    return EventTypeButton(this, selected, cb);
  }
}
