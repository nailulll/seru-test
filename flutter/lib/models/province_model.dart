class ProvinceModel {
  String? id;
  String? name;

  ProvinceModel({this.id, this.name});

  ProvinceModel.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    name = json['name'];
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
    };
  }
}
