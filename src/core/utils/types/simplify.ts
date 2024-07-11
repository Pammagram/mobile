export type Simplify<Type> = Type extends object
  ? { [Key in keyof Type]: Simplify<Type[Key]> }
  : Type;
