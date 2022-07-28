export interface IPaging<T> {
  paginate: Paginate;
  collection: T[];
}

export interface Paginate {
  lastPage: number;
  currentPage: number;
  totalElements: number;
}

// export function withPaging<T>(items: T[]): IPaging<T> {
//   return {
//     items,
//   };
// }
