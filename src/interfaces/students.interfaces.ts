export type Student = {
  id: number;
  name: string;
  email: string;
  cpf: string;
};

export type StudentUpdate = Partial<Student>;

export type StudentCreate = Omit<Student, "id">;
