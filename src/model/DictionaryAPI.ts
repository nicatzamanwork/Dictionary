import { IDefinition } from "../interfaces/Definition";
import { IState } from "../interfaces/State";
import axios from "axios";

class DictionaryAPI {
  private apiURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  private state: IState = {
    loading: false,
    error: null,
    definition: null,
  };
  private setLoading(loading: boolean) {
    this.state.loading = loading;
  }
  private setError(error: string) {
    this.state.error = error;
  }
  private setDefinition(definition: IDefinition) {
    this.state.definition = definition;
  }

  async getDefinition(word: string): Promise<IState> {
    this.setLoading(true);
    try {
      const response = await axios.get(this.apiURL + word);

      this.setDefinition(response.data);
    } catch (error) {
      this.setError(
        `Can't find the meaning "${word}". Please try to search for another word`
      );
    } finally {
      this.setLoading(false);
    }
    return this.state;
  }
}

export default DictionaryAPI;