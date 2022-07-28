export interface IListItem {
  heading: string;
  value: any;
}

export function getListItemHeading(arr: IListItem[], value: any): string {
  if (!value || !arr || !arr.length) {
    return "";
  }
  const item = arr.find((x) => x.value === value);
  return item ? item.heading : "";
}
