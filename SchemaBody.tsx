/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import styles from "./Schema.module.scss";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type SchemaBodyProps = {
  properties: Object;
}

type CodeStringProps = {
  description: string;
}

const Properities: React.FC<SchemaBodyProps> = ({ properties }) => {
    const names = properties ? Object.keys(properties) : [];

  const CodeString: React.FC<CodeStringProps> = ({ description }) => {
      const highlightCode = description.split(" ").map((desc, index) => {
        const regex = /`([a-zA-Z_]*[a-zA-Z]_?)`/g;
          return (regex.test(desc)) ?
              <div key={`${index}-code`}>
              <span
                  className={`${styles.schemaRole} ${styles.schemaCode}`}
              >{desc.split("`")[1]}
              </span>
              <span>{desc.split("`")[2]}</span>
                </div>
              : ` ${desc} `;
      });
      return (
          <div className={styles.schemaBodyDescription}>{highlightCode}</div>
      );
  }

  return (
      <div>{names && names.map((name, index) => {
          const { type, description, pattern, enum: _enum } = properties[name];
          return (
              <div className={styles.schemaBodySignature} key={`${index}-signature`}>
                  <div className={styles.schemaBodyHeader}>
                      <p><strong>{name}</strong></p>
                      {_enum ? <div className={styles.schemaBodyType}>{type}
                          <div className={styles.enumFlex}>{_enum.map((el: string, i: number) => <div
                              className={`${styles.schemaType} ${styles.schemaCode} ${styles.schemaEnums}`}
                              key={i}>{el}</div>)}
                          </div>
                      </div> : null}
                      {pattern ? <div className={styles.schemaRegexContainer}>
                          <div className={styles.schemaPatternType}>{type}</div>
                          <div className={styles.schemaBodyPattern}>{pattern}</div>
                      </div> : null}
                  </div>
                  <CodeString description={description}/>
              </div>
          );
      })}
      </div>
  )
};

const SchemaBody: React.FC<SchemaBodyProps> = ({ properties }) => {
  return (
      <div className={styles.schemaBody}>
          <Properities properties={properties}/>
      </div>
  );
}

export default SchemaBody;