import 'package:camera/camera.dart';
import 'package:dio/dio.dart';

class FormSubmitDto {
  final String firstName;
  final String lastName;
  final String bioData;
  final String province;
  final String regency;
  final String district;
  final String villages;
  final String idCardNumber;
  XFile? selfie;
  XFile? idCard;
  XFile? freeStyle;

  FormSubmitDto({
    required this.firstName,
    required this.lastName,
    required this.bioData,
    required this.province,
    required this.regency,
    required this.district,
    required this.villages,
    required this.idCardNumber,
    this.selfie,
    this.idCard,
    this.freeStyle,
  });

  Map<String, dynamic> toJson() => {
        'first_name': firstName,
        'last_name': lastName,
        'bio_data': bioData,
        'province': province,
        'regency': regency,
        'district': district,
        'villages': villages,
        'id_card_number': idCardNumber,
        'selfie': selfie,
        'id_card': idCard,
        'free_style': freeStyle,
      };

  Map<String, dynamic> toJsonFieldOnly() => {
        'first_name': firstName,
        'last_name': lastName,
        'bio_data': bioData,
        'province': province,
        'regency': regency,
        'district': district,
        'villages': villages,
        'id_card_number': idCardNumber,
      };

  FormData toFormDataImageOnly() => FormData.fromMap({
        'selfie': selfie,
        'id_card': idCard,
        'free_style': freeStyle,
      });

  FormData toFormData() => FormData.fromMap({
        'first_name': firstName,
        'last_name': lastName,
        'bio_data': bioData,
        'province': province,
        'regency': regency,
        'district': district,
        'villages': villages,
        'id_card_number': idCardNumber,
        'selfie': selfie,
        'id_card': idCard,
        'free_style': freeStyle,
      });
}
