export type Flatten<Type> = Type extends object
  ? { [Key in keyof Type]: Flatten<Type[Key]> }
  : Type;
