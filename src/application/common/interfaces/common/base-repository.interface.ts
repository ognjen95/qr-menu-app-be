export interface IBaseRepository<T, Q> {
  create(dto: T): Promise<T>;
  update(dto: T): Promise<T>;
  find(options?: Q): Promise<T[]>;
  delete(id: string): Promise<T>;
}
