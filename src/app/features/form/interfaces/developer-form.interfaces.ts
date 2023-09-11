import { FormArray, FormControl } from "@angular/forms";

export interface IDeveloperData {
  dateOfBirth: Date
  email: string
  firstName: string;
  framework: string;
  frameworkVersion: string;
  hobbies: IHobby[];
  lastName: string;
}

export interface IHobby{
  name: string;
  duration: string;
}

export interface IVersions {
  angular: string[],
  react: string[],
  vue: string[],
}
