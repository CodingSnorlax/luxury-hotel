export interface IReactHookFormInput<T extends string> {
  name: T;
  label: string;
  placeholder: string;
  type: string;
  options: {
    required?: {
      value: boolean;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
  };
}
