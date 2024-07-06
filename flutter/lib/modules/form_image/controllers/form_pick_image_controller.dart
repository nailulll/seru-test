import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test_seru/models/type_model.dart';
import 'package:flutter_test_seru/modules/form_image/controllers/form_image_controller.dart';
import 'package:get/get.dart';
import 'package:google_ml_kit/google_ml_kit.dart';

class FormPickImageController extends GetxController {
  final args = Get.arguments as Type;
  late CameraController cameraController;
  var loading = true.obs;

  @override
  void onInit() {
    super.onInit();
    getCamera();
  }

  void getCamera() async {
    loading.value = true;
    CameraDescription camera;
    var cameras = await availableCameras();
    if (args == Type.idCard) {
      camera = cameras.first;
    } else {
      camera = cameras[1];
    }
    cameraController = CameraController(
      camera,
      ResolutionPreset.max,
      imageFormatGroup: ImageFormatGroup.jpeg,
    );
    await cameraController.initialize();
    loading.value = false;
  }

  void takePicture() async {
    switch (args) {
      case Type.selfie:
        selfie();
        break;
      case Type.idCard:
        idCard();
        break;
      case Type.freeStyle:
        freeStyle();
        break;
    }
  }

  void idCard() async {
    dialogLoading();
    var image = await cameraController.takePicture();
    final textRecognizer = TextRecognizer(script: TextRecognitionScript.latin);

    final RecognizedText recognizedText = await textRecognizer.processImage(
      InputImage.fromFilePath(image.path),
    );

    String? result;
    for (TextBlock block in recognizedText.blocks) {
      for (TextLine line in block.lines) {
        result = extractIdCardNumber(line.text);
        if (result != null) break;
      }
      if (result != null) break;
    }

    textRecognizer.close();

    closeLoading();

    if (result != null) {
      Get.find<FormImageController>().cardNumber.text = result;
      Get.back(result: TypeModel(type: Type.idCard, data: image));
    } else {
      Get.defaultDialog(
        title: "Warning!",
        middleText: "Pastikan gambar jelas!",
        textConfirm: "Ok",
        onConfirm: () {
          Get.back();
        },
      );
    }
  }

  void freeStyle() async {
    dialogLoading();
    var image = await cameraController.takePicture();
    closeLoading();
    Get.back(result: TypeModel(type: Type.freeStyle, data: image));
  }

  void selfie() async {
    dialogLoading();
    var image = await cameraController.takePicture();
    final inputImage = InputImage.fromFilePath(image.path);
    var faceDetector = GoogleMlKit.vision.faceDetector();
    var faces = await faceDetector.processImage(inputImage);

    closeLoading();

    if (faces.isNotEmpty) {
      Get.back(
        result: TypeModel(type: Type.selfie, data: image),
      );
    } else {
      Get.defaultDialog(
        title: "Warning!",
        middleText: "Muka tidak terdeteksi!",
        textConfirm: "Ok",
        onConfirm: () {
          Get.back();
        },
      );
    }
  }

  String? extractIdCardNumber(String text) {
    var conversionMap = {
      'O': '0',
      'o': '0',
      'D': '0',
      'I': '1',
      'i': '1',
      'L': '1',
      'Z': '2',
      'S': '5',
      'B': '8',
      '?': '2',
    };

    var cleanedInput = text.replaceAll(RegExp(r'[^A-Za-z0-9]'), '');

    if (cleanedInput.length != 16) {
      return null;
    }

    var convertedInput = StringBuffer();
    for (int i = 0; i < cleanedInput.length; i++) {
      var char = cleanedInput[i];
      if (conversionMap.containsKey(char)) {
        convertedInput.write(conversionMap[char]);
      } else {
        convertedInput.write(char);
      }
    }

    RegExp regex = RegExp(r'^\d{16}$');
    var match = regex.firstMatch(convertedInput.toString());
    if (match != null) {
      return match.group(0);
    }

    return null;
  }

  void dialogLoading() {
    Get.defaultDialog(
      title: 'Harap Tunggu',
      content: const CircularProgressIndicator(),
      onWillPop: () => Future.value(false),
    );
  }

  void closeLoading() {
    if (Get.isDialogOpen != null) {
      if (Get.isDialogOpen!) {
        if (Get.overlayContext != null) {
          Navigator.of(Get.overlayContext!).pop();
        }
      }
    }
  }
}
