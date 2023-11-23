import React from "react";
import PropTypes from "prop-types";

const AsideVerkaufenBetaPage = ({
  userAnswers,
  handleClickEditAnswer,
  criteriasList = [],
}) => {
  let colorName = "";
  criteriasList.forEach((item) => {
    item.id == 16 ? (colorName = item.name.toLowerCase()) : "";
  });
  function mapUserAnswers() {
    let elementsArray = [];
    for (let answer in userAnswers) {
      let titleName = "";
      switch (answer) {
        case "Device":
          titleName = "Gerätetyp";
          break;
        case "Brand":
          titleName = "Marke";
          break;
        case "Submodel":
          titleName = "Untermodell";
          break;
        case "Model":
          titleName = "Modell";
          break;
        case "Condition":
          titleName = "Allgemeiner Zustand";
          break;
        case "Defects":
          titleName = "Liste der Defekte";
          break;
        default:
          titleName = answer;
      }
      if (answer === "image") {
        elementsArray.unshift(
          <div className="itemAnswer" key={answer}>
            <img
              loading="lazy"
              className="modelImg"
              src={userAnswers[answer]}
              alt=""
            />
          </div>
        );
      } else if (answer !== "comment" && answer !== "Defects") {
        elementsArray.push(
          <div className="itemAnswer" key={answer}>
            <h6>{titleName}</h6>
            <ul>
              {userAnswers[answer].map((item, i) => {
                return (
                  <li key={i}>
                    {item.name}
                    {answer !== colorName &&
                      answer !== "Model" &&
                      answer !== "Device" &&
                      item.image && <img loading="lazy" src={item.image} />}
                    {item.colorCode && (
                      <span
                        className="colorPic"
                        style={{ backgroundColor: item.colorCode }}
                      />
                    )}
                    {item.nameExt ? ` (${item.nameExt})` : null}
                  </li>
                );
              })}
              {userAnswers[answer].length === 0 && <li>-</li>}
            </ul>
            <span
              className="edit"
              onClick={() => handleClickEditAnswer(answer, userAnswers[answer])}
            >
              <i className="fa fa-pencil" aria-hidden="true" />
            </span>
          </div>
        );
      } else if (answer === "Defects") {
        elementsArray.push(
          <div className="itemAnswer" key={answer}>
            <h6>{titleName}</h6>
            <ul>
              {userAnswers[answer].map((item, i) => (
                <li key={i}>{item["description-short"]}</li>
              ))}
            </ul>
            <span
              className="edit"
              onClick={() => handleClickEditAnswer(answer)}
            >
              <i className="fa fa-pencil" aria-hidden="true" />
            </span>
          </div>
        );
      }
    }
    if (elementsArray.length > 0) return elementsArray;
    else
      return (
        <div className="noChoices">
          <img loading="lazy" src="/images/design/no-result-aside.svg" alt="" />
          <p>Keine Angaben bis jetzt</p>
        </div>
      );
  }
  let domain =
    window.domainName.name.split(".")[
      window.domainName.name.split(".").length - 1
    ];
  return (
    <aside>
      <h6 className="yourChoices">Ihre Angaben</h6>
      <div className="userAnswers">{mapUserAnswers()}</div>
    </aside>
  );
};

AsideVerkaufenBetaPage.propTypes = {};
AsideVerkaufenBetaPage.defaultProps = {};

export default AsideVerkaufenBetaPage;
