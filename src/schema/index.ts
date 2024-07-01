export type Records<TSchema> = TSchema[] & {
  moreBefore?: string;
  moreAfter?: string;
};
