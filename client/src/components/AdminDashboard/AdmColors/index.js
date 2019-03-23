import React, { Component } from "react";
import { connect } from "react-redux";
import { SketchPicker } from "react-color";
import Preloader from "../../Preloader";

import {
  getNewColorHex,
  getNewColorName,
  checkNewColorInDb,
  handleNewColorModal,
  addOrUpdateColorInDb,
  getExistingColorsFromDb,
  updateColorsInAllProducts
} from "../../../actions/adminDashboard/admColorActions";

import { getProductFeatures } from "../../../actions/adminDashboard/admProductsActions";

import "./admColors.scss";

class AdmColors extends Component {
  componentDidMount() {
    this.props.getExistingColorsFromDb();
  }

  render() {
    const {
      // state
      newColorName,
      newCssHexCode,
      newColorModalStatus,
      isExistingColorsFetching,
      newColorMessage,
      existingColorObject,
      finalMessage,
      newColorObject,
      isAllColorsFetching,
      existingColors,

      // actions
      getNewColorName,
      getNewColorHex,
      checkNewColorInDb,
      handleNewColorModal,
      addOrUpdateColorInDb,
      getExistingColorsFromDb,
      updateColorsInAllProducts
    } = this.props;

    let existingColorsList = existingColors.map(color => {
      return (
        <li className="existing-colors-item" key={color._id}>
          <div
            className="existing-colors-style"
            style={{ backgroundColor: color.cssHexCode }}
          />
          <div className="existing-colors-text">
            <p>{color.colorName}</p>
          </div>
          <div className="existing-colors-text">
            <p>{color.cssHexCode}</p>
          </div>
        </li>
      );
    });

    return (
      <>
        <div className="admin-color-wrapper">
          <p className="admin-color-title">Add New Color</p>
          <div className="add-color">
            <SketchPicker
              className="add-color-picker"
              color={newCssHexCode}
              onChangeComplete={getNewColorHex}
            />
            <div className="add-color-actions">
              <div className="add-color-item">
                <label className="add-color-label" htmlFor="color-name">
                  Enter color name:{" "}
                </label>
                <input
                  type="text"
                  className="add-color-input"
                  id="color-name"
                  value={newColorName}
                  onChange={e => getNewColorName(e.target.value)}
                />
              </div>
              <div className="add-color-item">
                <label className="add-color-label" htmlFor="color-hexcode">
                  cssHexCode:{" "}
                </label>
                <input
                  type="text"
                  className="add-color-input"
                  id="color-hexcode"
                  value={newCssHexCode}
                  disabled
                />
              </div>
              <input
                type="button"
                className="add-color-save"
                value="Save new color"
                onClick={() => {
                  checkNewColorInDb(newColorName, newCssHexCode);
                  handleNewColorModal(true);
                }}
                disabled={newColorName && newCssHexCode ? false : true}
              />
            </div>
          </div>
          {newColorModalStatus ? (
            <div className="color-alert-modal">
              {isExistingColorsFetching ? (
                <Preloader />
              ) : (
                <>
                  <div className="color-alert-message-1">
                    {newColorMessage
                      ? "Color with the next parameters is found in DB:"
                      : "Color with the next parameters is not found in DB:"}{" "}
                  </div>
                  <div className="color-alert-params">
                    <p className="color-alert-param">
                      Name of color:{" "}
                      {newColorMessage
                        ? existingColorObject.colorName
                        : newColorName}
                    </p>
                    <p className="color-alert-param">
                      Color hex code:{" "}
                      {newColorMessage
                        ? existingColorObject.cssHexCode
                        : newCssHexCode}
                    </p>
                  </div>
                  <span
                    className="color-alert-style"
                    style={
                      newColorMessage
                        ? { backgroundColor: existingColorObject.cssHexCode }
                        : { backgroundColor: newCssHexCode }
                    }
                  >
                    How color looks
                  </span>
                  <div className="color-alert-message-2">
                    {newColorMessage
                      ? `If you want to update this color to DB (rewrite color parameters), click 'Update Color', othervise - click 'Cancel'. 
								Attention: color will be updated in every product, where it is present.`
                      : "If you want to add new color to DB, click 'Add Color', othervise - click 'Cancel'"}
                  </div>
                  <div className="color-alert-actions">
                    <input
                      type="button"
                      className="color-alert-action cancel"
                      value="Cancel"
                      onClick={() => handleNewColorModal(false)}
                    />
                    <input
                      type="button"
                      className="color-alert-action accept"
                      value={newColorMessage ? "Update Color" : "Add Color"}
                      onClick={() => {
                        addOrUpdateColorInDb(
                          newColorName,
                          newCssHexCode,
                          getExistingColorsFromDb,
                          this.props.getProductFeatures,
                          updateColorsInAllProducts
                        );
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          ) : null}
          {finalMessage ? (
            <div className="final-message">
              <p>{finalMessage}</p>
              {Object.keys(newColorObject).length > 0 ? (
                <>
                  <div className="color-alert-params">
                    <p className="color-alert-param">
                      Name of color: {newColorObject.colorName}
                    </p>
                    <p className="color-alert-param">
                      Color hex code: {newColorObject.cssHexCode}
                    </p>
                  </div>
                  <span
                    className="color-alert-style"
                    style={{ backgroundColor: newColorObject.cssHexCode }}
                  >
                    How color looks
                  </span>
                </>
              ) : null}
            </div>
          ) : null}
        </div>
        <div className="existing-colors">
          <p className="admin-color-title">See Existing Colors</p>
          <ul className="existing-colors-list">
            {isAllColorsFetching ? <Preloader /> : existingColorsList}
          </ul>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    newColorName: state.admColors.newColorName,
    newCssHexCode: state.admColors.newCssHexCode,
    newColorMessage: state.admColors.newColorMessage,
    existingColorObject: state.admColors.existingColorObject,
    newColorModalStatus: state.admColors.newColorModalStatus,
    isExistingColorsFetching: state.admColors.isExistingColorsFetching,
    finalMessage: state.admColors.finalMessage,
    newColorObject: state.admColors.newColorObject,
    isAllColorsFetching: state.admColors.isAllColorsFetching,
    existingColors: state.admColors.existingColors
  };
};

export default connect(
  mapStateToProps,
  {
    getNewColorHex,
    getNewColorName,
    checkNewColorInDb,
    handleNewColorModal,
    addOrUpdateColorInDb,
    getExistingColorsFromDb,
    getProductFeatures,
    updateColorsInAllProducts
  }
)(AdmColors);
