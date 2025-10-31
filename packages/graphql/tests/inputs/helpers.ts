export type TestCase<T> = {
  name: String;
  input: T;
  success: boolean;
  error?: {
    path: string;
    message: string;
  };
};
