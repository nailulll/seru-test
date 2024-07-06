import 'package:camera/camera.dart';

class TypeModel {
  final Type type;
  final XFile data;

  TypeModel({required this.type, required this.data});
}

enum Type {
  selfie,
  idCard,
  freeStyle,
}
