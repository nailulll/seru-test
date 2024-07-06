class RegencyModel {
  String? id;
  String? provinceId;
  String? name;

  RegencyModel({this.id, this.provinceId, this.name});

  RegencyModel.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    provinceId = json['province_id'];
    name = json['name'];
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'province_id': provinceId,
      'name': name,
    };
  }
}
