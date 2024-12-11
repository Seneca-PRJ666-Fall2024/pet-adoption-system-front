import React from "react";
import styles from "../styles/ProfileSetup.module.css";

function Questionnaire({
  attributeGroups,
  formData, 
  handleInputChange,
  multivalue
}) {
  return (
        <>
            {attributeGroups.map((group, groupIndex) => (
                <div key={group.name + "-" + groupIndex}>
                  <label className={styles.mylabel}>{group.question}</label>
                  <br/>
                    {group.values && group.values.map((attribute, index) => (
                        <label className="me-5" key={group.name + "-" + attribute + "-" + index}>
                          <input
                              type={multivalue ? "checkbox" : "radio"}
                              name={group.name}
                              value={attribute}
                              onChange={handleInputChange}
                              checked={multivalue ? Array.isArray(formData[group.name]) && formData[group.name].includes(attribute) || false :
                                  formData[group.name] === attribute || false}
                              className="me-1"
                          />
                          {attribute}
                        </label>
                    ))}
                  {group.supportsOther && (
                      <input
                          type="text"
                          name={group.name + "Other"}
                          value={formData[group.name + "Other"] || ""}
                          onChange={handleInputChange}
                          className="ms-2"
                          placeholder={multivalue ? "Others (',' separated)" : "Other"}
                      />
                  )}
                  <br/>
                  <br/>
                  <br/>
                </div>
            ))}
        </>
  );
}

export default Questionnaire;
