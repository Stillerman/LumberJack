import 'package:flutter/material.dart';
import 'package:flutter_cupertino_date_picker/flutter_cupertino_date_picker.dart';

class CustomDatePicker extends StatefulWidget {
  final Function selectedCallback;

  CustomDatePicker(this.selectedCallback);

  @override
  State<StatefulWidget> createState() {
    return _CustomDatePickerState(selectedCallback);
  }
}

class _CustomDatePickerState extends State<CustomDatePicker> {
  DateTime selectedDate = DateTime.now();
  Function selectedCallback;

  _CustomDatePickerState(this.selectedCallback) {
    selectedCallback(selectedDate);
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: <Widget>[
      Text('Selected Date: ${selectedDate.toString()}'),
      FlatButton(onPressed: () => DatePicker.showDatePicker(
        context, 
        pickerMode: DateTimePickerMode.datetime,
        dateFormat: 'EEE MMM d|H|mm',
        onConfirm: (date, ints) {
          setState(() {
            selectedDate = date;
          });
          widget.selectedCallback(date);
        }
      ),
      child: Text('Select Date'))
    ],);
  }
}