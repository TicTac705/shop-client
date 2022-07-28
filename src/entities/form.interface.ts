export interface IFormControl {
  key: string;
  label: string;
  value: any;
  validators?: string;
  mapper?: {
    toString: (value: any) => any;
    parse: (value: any) => any;
  };
}
