export interface IToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}

// export function withPaging<T>(items: T[]): IPaging<T> {
//   return {
//     items,
//   };
// }
