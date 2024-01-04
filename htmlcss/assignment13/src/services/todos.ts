import TodosModel from "../model/todos";
export const add = async (body: any) => {
  const project =
    // if (!project) {
    //   throw new NotFoundError(`Project with id: ${id} not found`);
    // }

    await TodosModel.add(body);

  const createdUser = await TodosModel.add(body);

  return createdUser;
};
