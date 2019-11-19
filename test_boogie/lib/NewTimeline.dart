
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:provider/provider.dart';

import 'Store.dart';

class Timeline extends StatelessWidget {

  Iterable<Widget> getUserEventWidgets(Store store) {
    return store.userEvents.map((event) {
      return event.toWidget();
    }).toList();
  }

  @override
  Widget build(BuildContext ctx) {
    final Store store = Provider.of<Store>(ctx);
    return Container(
      padding: EdgeInsets.all(6.0),
      child: RefreshIndicator(
        onRefresh: store.fetchUserEvents,
          child: ListView(
        padding: const EdgeInsets.all(8),
        children: getUserEventWidgets(store),
      )),
    );
  }

}