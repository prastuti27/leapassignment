import BaseModel from "./baseModel";

export default class TodosModel extends BaseModel {
  static async add(todo: any) {
    return this.queryBuilder().insert(todo).table("todo");
  }

  //   static async update(id: number, project: any) {
  //     return;
  //   }

  //   static async delete(id: number) {
  //     return;
  //   }
}
