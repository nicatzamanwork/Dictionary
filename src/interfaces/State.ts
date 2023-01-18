import { IDefinition } from "./Definition";
export interface IState  {
  loading: boolean;
  error: string | null;
  definition: IDefinition | any;
  
}