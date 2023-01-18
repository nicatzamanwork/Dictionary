function Result({ meanings, phonetics }) {
  return (
    <>
      <div className="items">
        <ul>
          <li>
            {phonetics &&
              phonetics.map((phonetics: any, index: any) => (
                <span key={index}> {phonetics.text} </span>
              ))}
          </li>
          {meanings &&
            meanings.map((meaning: any, index: any) => (
              <li className="contain" key={index}>
                <h3>Noun</h3>
                <div className="details meaning">
                  <h3>Meaning</h3>
                  {meaning.definitions &&
                    meaning.definitions.map((definitions: any, index: any) => (
                      <p key={index}> - {definitions.definition}</p>
                    ))}
                </div>
                {meaning.synonyms.length !== 0 && (
                  <div className="details synonyms">
                    <h3>Synonyms</h3>
                    {meaning.synonyms.map((synonym: any, index: any) => (
                      <span key={index}>{synonym},</span>
                    ))}
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default Result;