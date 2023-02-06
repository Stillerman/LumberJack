String renderTemplate(String template, Map<String, String> args) {
 
  Map<String, String> swaps = args.map((key, val){
    return MapEntry('{{' + key + '}}', val);
  });


  String helper(String templ, MapEntry swap) {
    return templ.replaceAll(swap.key, swap.value);
  }

  String result = template;

  for (var i = 0; i < swaps.length; i++) {
    result = helper(result, swaps.entries.elementAt(i));
  }

  return result;
}