// export interface Phrase {
//   id: string;
//   english: string;
//   russian: number;
// }

export class Phrase {
  constructor(
    public id: string,
    public english: string,
    public russian: string,
    public words?: string[],
  ) {}
}
