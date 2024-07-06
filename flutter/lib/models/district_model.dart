class DistrictModel {
  String? id;
  String? name;
  String? regencyId;

  DistrictModel({this.id, this.name, this.regencyId});

  DistrictModel.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    name = json['name'];
    regencyId = json['regency_id'];
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'regency_id': regencyId,
    };
  }
}
