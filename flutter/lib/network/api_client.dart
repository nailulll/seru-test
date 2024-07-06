import 'package:dio/dio.dart';

import 'api_interceptors.dart';

class ApiClient {
  Dio init() {
    Dio dio = Dio();
    dio.interceptors.add(ApiInterceptors());
    dio.options.connectTimeout = const Duration(seconds: 30);
    dio.options.receiveTimeout = const Duration(seconds: 30);
    dio.options.sendTimeout = const Duration(seconds: 30);
    dio.options.followRedirects = true;
    return dio;
  }
}
