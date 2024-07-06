import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test_seru/models/type_model.dart';
import 'package:flutter_test_seru/modules/form_image/controllers/form_pick_image_controller.dart';
import 'package:get/get.dart';

class FormPickImageScreen extends StatelessWidget {
  const FormPickImageScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return GetBuilder(
      builder: (FormPickImageController controller) {
        return Obx(() {
          if (controller.loading.value) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          }
          return Stack(
            children: [
              CameraPreview(
                controller.cameraController,
              ),
              if (controller.args == Type.selfie)
                Positioned(
                  top: 100,
                  left: 100,
                  right: 100,
                  child: Container(
                    height: 240,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(999),
                      border: Border.all(
                        color: Colors.white,
                        width: 5,
                      ),
                    ),
                  ),
                )
              else if (controller.args == Type.idCard)
                Positioned(
                  top: 150,
                  left: 50,
                  right: 50,
                  child: Container(
                    height: 200,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(
                        color: Colors.white,
                        width: 5,
                      ),
                    ),
                  ),
                )
              else
                Container(),
              Positioned(
                bottom: 40,
                left: 100,
                right: 100,
                child: IconButton(
                  onPressed: () {
                    controller.takePicture();
                  },
                  color: Colors.white,
                  iconSize: 70,
                  icon: const Icon(Icons.camera),
                ),
              ),
            ],
          );
        });
      },
    );
  }
}
