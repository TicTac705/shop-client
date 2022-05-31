export interface IPaging<T> {
  items: T[];
}

export function withPaging<T>(items: T[]): IPaging<T> {
  return {
    items,
  };
}
