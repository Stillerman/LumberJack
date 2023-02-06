import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:http/http.dart';
import 'package:provider/provider.dart';

import 'Store.dart';

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
  final Function selectedNounChanged;

  NounSelector(this.selectedNounChanged);

  @override
  State<StatefulWidget> createState() {
    return _NounSelectorState();
  }
}

class _NounSelectorState extends State<NounSelector> {
  String selectedNoun = '';

  TextEditingController _textController = TextEditingController();

  _NounSelectorState() {
    _textController.addListener(() {
      selectNoun(_textController.text);
    });
  }
  void selectNoun(String n, {bool updateController = false}) {
    setState(() {
      selectedNoun = n;
    });
    if (updateController) _textController.text = n;
    widget.selectedNounChanged(selectedNoun);
  }

  @override
  Widget build(BuildContext context) {
    final NounDictionary dictionary = Provider.of<NounDictionary>(context);
    return Column(children: <Widget>[
      Text(selectedNoun),
      TextField(
        controller: _textController,
      ),
      Wrap(
        direction: Axis.horizontal,
        spacing: 5.0,
        runSpacing: 5.0,
        children: dictionary.nouns
            .map((noun) => Chip(noun, false, onPressed: () {
                  selectNoun(noun, updateController: true);
                }))
            .toList(),
      )
    ]);
  }
}

class NounListSelector extends StatefulWidget {
  final Null Function(dynamic response) nounListChanged;

  NounListSelector(this.nounListChanged);

  @override
  State<StatefulWidget> createState() {
    return _NounListSelectorState(nounListChanged);
  }
}

class _NounListSelectorState extends State<NounListSelector> {
  TextEditingController textFieldController = TextEditingController();

  List<String> selectedNouns = [];

  Null Function(dynamic response) nounListChanged;
  String nounType;

  _NounListSelectorState(this.nounListChanged);

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
    final NounDictionary dictionary = Provider.of<NounDictionary>(context);

    return Column(
      children: <Widget>[
        Wrap(
          direction: Axis.horizontal,
          spacing: 5.0,
          runSpacing: 5.0,
          children: selectedNouns
              .map((noun) => Chip(
                    noun,
                    true,
                    onPressed: () {
                      remove(noun);
                    },
                  ))
              .toList(),
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
        Wrap(
          direction: Axis.horizontal,
          spacing: 5.0,
          runSpacing: 5.0,
          children: dictionary.nouns
              .map((noun) => Chip(
                    noun,
                    false,
                    onPressed: () {
                      sendOff(noun);
                    },
                  ))
              .toList(),
        )
      ],
    );
  }
}

class NounDictionaryProvider extends StatelessWidget {
  final Widget child;
  final String nounType;

  NounDictionaryProvider(this.nounType, this.child);

  @override
  Widget build(BuildContext context) {
    final Store store = Provider.of<Store>(context);

    return ChangeNotifierProvider<NounDictionary>(
        builder: (ctx) {
          return NounDictionary(store, nounType);
        },
        child: child);
  }
}

class NounDictionary with ChangeNotifier {
  String nounType;
  Store store;

  List<String> _nouns = [];

  List<String> get nouns => _nouns;

  set nouns(List<String> newNouns) {
    _nouns = newNouns;
    notifyListeners();
  }

  NounDictionary(this.store, this.nounType) {
    fetchNouns();
  }

  void fetchNouns() async {
    print('Attempting to fetch nouns of type $nounType');
    Response response = await store.bridge.httpGet('/nouns/type/' + nounType);
    nouns = (json.decode(response.body)['data'] as List<dynamic>)
        .map((noun) => noun['noun'].toString())
        .toList();
  }
}
