import 'dart:io';

import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test_seru/modules/form_image/controllers/form_image_controller.dart';
import 'package:get/get.dart';
import 'package:photo_view/photo_view.dart';

import 'custom_inkwell.dart';

class ButtonUploadImage extends GetView<FormImageController> {
  final String title;
  final void Function()? onTap;
  final XFile? file;

  const ButtonUploadImage({
    super.key,
    required this.title,
    required this.onTap,
    this.file,
  });

  @override
  Widget build(BuildContext context) {
    if (file != null) {
      return Column(
        children: [
          SizedBox(
            width: Get.width,
            height: 500,
            child: PhotoView(
              imageProvider: FileImage(
                File(file!.path),
              ),
              minScale: PhotoViewComputedScale.contained,
            ),
          ),
          const SizedBox(height: 20),
          ElevatedButton(
            onPressed: onTap,
            child: Text("Ubah $title"),
          )
        ],
      );
    }
    return CustomInkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(10),
      child: Container(
        width: Get.width,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10),
          border: Border.all(
            color: Colors.grey,
          ),
        ),
        child: Column(
          children: [
            const SizedBox(height: 20),
            const Icon(Icons.add_a_photo),
            const SizedBox(height: 10),
            Text(title),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }
}
