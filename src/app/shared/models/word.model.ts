// export interface Word {
//   id: string;
//   english: string;
//   russian: number;
//   phrases?: string[];
// }

export class Word {
  constructor(
    public id: string,
    public english: string,
    public russian: string,
  ) {}
}
