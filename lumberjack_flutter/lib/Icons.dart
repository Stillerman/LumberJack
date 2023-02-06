import 'package:flutter/widgets.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

lookupIcon(String name) {
  switch (name) {
    case 'utensils':
      return Icon(FontAwesomeIcons.utensils);
    case 'capsules':
      return Icon(FontAwesomeIcons.capsules);
    case 'buisness-time':
      return Icon(FontAwesomeIcons.businessTime);
    case 'sticky-note':
      return Icon(FontAwesomeIcons.stickyNote);
    case 'mug-hot':
      return Icon(FontAwesomeIcons.mugHot);
    case 'glass-martini':
      return Icon(FontAwesomeIcons.glassMartini);
    case 'cannabis':
      return Icon(FontAwesomeIcons.cannabis);
    case 'shower':
      return Icon(FontAwesomeIcons.shower);
    case 'poop':
      return Icon(FontAwesomeIcons.poop);
    case 'heartbeat':
      return Icon(FontAwesomeIcons.heartbeat);
    case 'tshirt':
      return Icon(FontAwesomeIcons.universalAccess);
    case 'dumbbell':
      return Icon(FontAwesomeIcons.dumbbell);
    case 'hand-holding-heart':
      return Icon(FontAwesomeIcons.handHoldingHeart);
    case 'bed':
      return Icon(FontAwesomeIcons.bed);
    default:
      return Icon(FontAwesomeIcons.question);
  }
}