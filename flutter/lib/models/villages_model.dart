class VillagesModel {
  String? id;
  String? name;
  String? districtId;

  VillagesModel({
    this.id,
    this.name,
    this.districtId,
  });

  VillagesModel.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    name = json['name'];
    districtId = json['district_id'];
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'district_id': districtId,
    };
  }
}
