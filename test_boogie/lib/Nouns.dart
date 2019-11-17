import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class Chip extends StatelessWidget {
  final String text;
  final bool colored;
  final void Function() onPressed;

  Chip(this.text, this.colored, {this.onPressed});

  @override
  Widget build(BuildContext context) {
    return Material(
      color: this.colored ? Colors.orange : Colors.white,
      borderRadius: BorderRadius.circular(10.0),
      child: InkWell(
        borderRadius: BorderRadius.circular(10.0),
        onTap: onPressed,
        child: Container(
          padding:
              EdgeInsets.only(left: 5.0, right: 5.0, top: 3.0, bottom: 3.0),
          child: Text(text),
        ),
      ),
    );
  }
}

class NounSelector extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _NounSelectorState();
  }
}

class _NounSelectorState extends State<NounSelector> {
  @override
  Widget build(BuildContext context) {
    return TextField();
  }
}

class NounListSelector extends StatefulWidget {
  final Null Function(dynamic response) nounListChanged;
  final String nounType;

  NounListSelector(this.nounType, this.nounListChanged);

  @override
  State<StatefulWidget> createState() {
    return _NounListSelectorState(nounType, nounListChanged);
  }
}

class _NounListSelectorState extends State<NounListSelector> {
  TextEditingController textFieldController = TextEditingController();

  List<String> selectedNouns = [];

  Null Function(dynamic response) nounListChanged;
  String nounType;

  _NounListSelectorState(this.nounType, this.nounListChanged);

  void sendOff(text) {
    setState(() {
      selectedNouns.add(text);
      textFieldController.text = '';
      nounListChanged(selectedNouns);
    });
  }

  void remove(noun) {
    setState(() {
      selectedNouns.remove(noun);
      nounListChanged(selectedNouns);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Wrap(
          direction: Axis.horizontal,
          spacing: 5.0,
          runSpacing: 5.0,
          children: selectedNouns.map((noun) => Chip(noun, true, onPressed: (){ remove(noun); },)).toList(),
        ),
        Row(
          children: <Widget>[
            Flexible(
              child: TextField(
                onSubmitted: sendOff,
                controller: textFieldController,
              ),
            ),
            IconButton(
              icon: Icon(Icons.add),
              onPressed: () {
                sendOff(textFieldController.text);
              },
            )
          ],
        ),
      ],
    );
  }
}
