import { IDeveloperData } from "../features/form/interfaces/developer-form.interfaces";

export interface IFormState {
  isLoading: boolean;
  error: string;
  form: IDeveloperData | null;
}
