export interface Supplement {
  id: number;
  state: string;
  name: string;
  extras: {
    url: string;
    files: { url: string; name: string }[];
  };
}
