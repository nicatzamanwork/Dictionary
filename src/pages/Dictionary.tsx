import React, { useEffect, useState } from "react";
import DictionaryAPI from "../model/DictionaryAPI";
import { IState } from "../interfaces/State";
import Result from "../companents/Result";
function Dictionary() {
  const [text, setText] = useState<string>("");
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const [dataState, setState] = useState<IState | null>(null);
  const [meanings, setMeaning] = useState<any>([]);
  const [phonetics, setPhonetics] = useState<any>([]);

  const dictionaryApi = new DictionaryAPI();

  const handleChange = (e: any) => {
    setText(e.target.value);
    setShowBtn(true);
    if (!e.target.value) {
      setShowBtn(false);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    function fetchData() {
      dictionaryApi.getDefinition(text).then((res) => setState(res));
    }
    fetchData();
  };

  useEffect(() => {
    if (dataState?.error) {
      return;
    }
    setMeaning(dataState?.definition[0]?.meanings);
    setPhonetics(dataState?.definition[0]?.phonetics);
  }, [dataState]);

  const playAudio = (e: any) => {
    let link: any = null;
    if (e.phonetics.length) {
      e.phonetics.map((sound: any) => {
        if (sound.audio) {
          link = sound.audio;
        }
      });
    }
    let audio = new Audio(link);
    audio.play();
  };

  return (
    <div className="container">
      <div className="content">
        <h1>English Dictionary</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            name=""
            id=""
            autoFocus
            placeholder="Search a word"
            value={text}
            onChange={(e) => handleChange(e)}
          />
          <i className="fa-solid fa-magnifying-glass search"></i>
          <span
            className="clear"
            style={{ display: showBtn ? "block" : "none" }}
            onClick={() => {
              setText("");
              setShowBtn(false);
              setState(null);
            }}
          >
            x
          </span>
        </form>
        {dataState?.loading ? (
          <p>Loading</p>
        ) : dataState?.error ? (
          <p>{dataState.error}</p>
        ) : (
          <p style={{ display: dataState?.definition ? "none" : "block" }}>
            Type any existing word and press enter to get meaning, example,
            synonyms, etc.
          </p>
        )}
        {React.Children.toArray(
          dataState?.definition &&
            dataState.definition.map((e: any) => {
              return (
                <>
                  <div className="items">
                    <h2>{e.word}</h2>
                    <i
                      style={{ cursor: "pointer" }}
                      className="fa-solid fa-volume-high"
                      onClick={() => playAudio(e)}
                    ></i>
                  </div>
                  <div className="explain">
                    <Result meanings={meanings} phonetics={phonetics} />
                  </div>
                </>
              );
            })
        )}
      </div>
    </div>
  );
}

export default Dictionary;