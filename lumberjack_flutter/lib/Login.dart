import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:test_boogie/Bridge.dart';

class Login extends StatefulWidget {
  final onTokenRetrieved;

  Login(this.onTokenRetrieved);

  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final _formKey = GlobalKey<FormState>();

  Bridge bridge = Bridge();

  final emailController = TextEditingController(text: 'jason.t.stillerman@gmail.com');
  final passwordController = TextEditingController(text: 'Skyl1m1t66');

  String result = 'hoii';

  @override
  void dispose() {
    passwordController.dispose();
    emailController.dispose();
    super.dispose();
  }

  void attemptAuth (String email, String password) async {
    print('ATTEMPTING AUTH');

    Map <String, String> data = {
      'email': email,
      'password': password
    };

    var response = await bridge.post('/users/login', data);

    widget.onTokenRetrieved(json.decode(response.body)['data']['token']);
  }


  @override
  Widget build(BuildContext ctx) {
    return Form(
        key: _formKey,
        child: Column(
          children: <Widget>[
            Text(result),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 16.0),
              child: TextFormField(
                controller: emailController,
                validator: (value) {
                  if (value.isEmpty) {
                    return 'Please enter an email.';
                  }
                  return null;
                },
              ),
            ),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 16.0),
              child: TextFormField(
                controller: passwordController,
                obscureText: true,
                validator: (value) {
                  if (value.isEmpty) {
                    return 'Please enter a password.';
                  }
                  return null;
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 16.0),
              child: RaisedButton(
                onPressed: () {
                  // Validate returns true if the form is valid, or false
                  // otherwise.
                  if (_formKey.currentState.validate()) {
                    attemptAuth(emailController.text, passwordController.text);
                    // If the form is valid, display a Snackbar.
                    // Scaffold.of(context).showSnackBar(
                    //     SnackBar(content: Text('Logging in with ${emailController.text}')));
                  }
                },
                child: Text('Login'),
              ),
            ),
          ],
        ));
  }
}
