import 'package:http/http.dart' as http;


class Bridge {
  String jWT;


  // static const String BASE = ''
  // static const String BASE = 'http://10.245.81.79:3000';
  static const String BASE = 'http://localhost:3000';

  Bridge ([this.jWT]);

  dynamic getHeaders () {
    if(jWT != null) return {
      'X-access-token': jWT
    };
    else return null;
  }

  Future<http.Response> post (String url, Map<String, String> data) {
    return  http.post(BASE + url,
    headers: getHeaders(),
    body: data);
  }

  Future<http.Response> httpGet(String url) {
    return http.get(BASE + url, headers: getHeaders());
  }
}