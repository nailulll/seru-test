import 'package:flutter/material.dart';
import 'package:flutter_test_seru/modules/form_image/controllers/form_image_controller.dart';
import 'package:flutter_test_seru/modules/form_image/widgets/button_upload_image.dart';
import 'package:get/get.dart';
import 'package:flutter_test_seru/models/type_model.dart';

class FormImageScreen extends StatelessWidget {
  const FormImageScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return GetBuilder(
      builder: (FormImageController controller) {
        return Scaffold(
          appBar: AppBar(
            title: const Text("Upload Data Diri"),
          ),
          body: SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [
                  Obx(() {
                    return ButtonUploadImage(
                      title: "Foto Selfie",
                      onTap: () => controller.pickImage(Type.selfie),
                      file: controller.selfieImage.value,
                    );
                  }),
                  const SizedBox(height: 20),
                  Obx(() {
                    return ButtonUploadImage(
                      title: "Foto KTP",
                      onTap: () => controller.pickImage(Type.idCard),
                      file: controller.idCardImage.value,
                    );
                  }),
                  const SizedBox(height: 20),
                  Obx(() {
                    return ButtonUploadImage(
                      title: "Foto Bebas",
                      onTap: () => controller.pickImage(Type.freeStyle),
                      file: controller.freeStyleImage.value,
                    );
                  }),
                  const SizedBox(height: 20),
                  SizedBox(
                    width: double.infinity,
                    height: 50,
                    child: ElevatedButton(
                      onPressed: () => controller.submit(),
                      child: const Text("Selanjutnya"),
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
