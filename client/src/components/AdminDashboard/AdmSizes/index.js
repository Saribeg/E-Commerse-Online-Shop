import React, { Component } from "react";
import { connect } from "react-redux";

import Preloader from "../../Preloader";

import {
  getNewSizeName,
  saveNewSizeInDb,
  getExistingSizes,
  getUpdatedSize,
  updateSizeInDb,
  updateSizesInAllProducts
} from "../../../actions/adminDashboard/admSizeActions";

import "./admSizes.scss";

class AdmSizes extends Component {
  componentDidMount() {
    this.props.getExistingSizes();
  }

  render() {
    const {
      //state
      newSizeName,
      isNewSizeFetching,
      checkNewSizeResult,
      isExistingSizesFetching,
      existingSizes,
      updatingSizes,
      sizeUpdateResults,
      isSizeUpdating,
      preUpdateValue,
      updatedSizeValue,
      errorMsg,
      fetchExistingSizesMessage,

      // actions
      getNewSizeName,
      saveNewSizeInDb,
      getUpdatedSize,
      updateSizeInDb,
      getExistingSizes,
      updateSizesInAllProducts
    } = this.props;

    let existingSizeValues = existingSizes.map(size => {
      return (
        <li className="admin-size-item" key={size._id}>
          {size.value}
        </li>
      );
    });

    let updatingSizeInputs = updatingSizes.map(size => {
      return (
        <li className="admin-size-item admin-size-item-multi" key={size._id}>
          <div className="admin-size-cell">
            <input
              type="text"
              className="admin-size-input"
              value={size.value}
              onChange={e =>
                getUpdatedSize(updatingSizes, size._id, e.target.value)
              }
            />
            <input
              type="button"
              className="admin-size-save"
              value="Save changes"
              onClick={() =>
                updateSizeInDb(
                  size._id,
                  size.value,
                  existingSizes,
                  getExistingSizes,
                  updateSizesInAllProducts
                )
              }
            />
            {preUpdateValue === size.value && isSizeUpdating ? (
              <div className="admin-size-minipreloader" />
            ) : null}
          </div>
          {updatedSizeValue === size.value && sizeUpdateResults ? (
            <span className="admin-size-msg">{sizeUpdateResults}</span>
          ) : null}
        </li>
      );
    });

    let categoriesInSizes = existingSizes.map(size => {
      let multiArr = size.categories.map(cat => {
        let sizeCat = cat.split("-");
        return (
          sizeCat[sizeCat.length - 1].charAt(0).toUpperCase() +
          sizeCat[sizeCat.length - 1].slice(1)
        );
      });

      let uniqueCats = [...new Set(multiArr)];

      let uniqueCatsString = uniqueCats.join(", ");

      return (
        <li key={size._id} className="admin-size-item">
          {uniqueCatsString}
        </li>
      );
    });

    return (
      <div className="admin-size">
        <p className="admin-size-title"> Add New Size</p>
        <div className="admin-size-new">
          <div className="admin-size-add">
            <label htmlFor="add-size" className="admin-size-label">
              Fill size value:{" "}
            </label>
            <input
              type="text"
              className="admin-size-input"
              id="add-size"
              value={newSizeName}
              onChange={e => getNewSizeName(e.target.value)}
            />
            <input
              type="button"
              className="admin-size-save admin-size-save-new"
              value="Save"
              onClick={() => saveNewSizeInDb(newSizeName, getExistingSizes)}
            />
            <span className="admin-size-result">
              {isNewSizeFetching ? (
                <div className="admin-size-minipreloader" />
              ) : (
                checkNewSizeResult
              )}
            </span>
          </div>
        </div>
        <p className="admin-size-title"> See / Update Existing Sizes</p>

        {fetchExistingSizesMessage ? (
          <span className="admin-size-error">{fetchExistingSizesMessage}</span>
        ) : null}

        {errorMsg ? <p className="error-msg">{errorMsg}</p> : null}
        <div className="admin-size-existing">
          {isExistingSizesFetching ? (
            <Preloader />
          ) : (
            <div className="admin-size-table">
              <div className="admin-size-row">
                <div className="admin-size-heading">Current size</div>
                <div className="admin-size-content">
                  <ul className="admin-size-list">{existingSizeValues}</ul>
                </div>
              </div>
              <div className="admin-size-row">
                <div className="admin-size-heading">New size (update)</div>
                <div className="admin-size-content">
                  <ul className="admin-size-list">{updatingSizeInputs}</ul>
                </div>
              </div>
              <div className="admin-size-row">
                <div className="admin-size-heading">
                  Categories sizes are in
                </div>
                <div className="admin-size-content">
                  <ul className="admin-size-list">{categoriesInSizes}</ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    newSizeName: state.admSizes.newSizeName,
    isNewSizeFetching: state.admSizes.isNewSizeFetching,
    checkNewSizeResult: state.admSizes.checkNewSizeResult,
    isExistingSizesFetching: state.admSizes.isExistingSizesFetching,
    existingSizes: state.admSizes.existingSizes,
    updatingSizes: state.admSizes.updatingSizes,
    sizeUpdateResults: state.admSizes.sizeUpdateResults,
    isSizeUpdating: state.admSizes.isSizeUpdating,
    preUpdateValue: state.admSizes.preUpdateValue,
    updatedSizeValue: state.admSizes.updatedSizeValue,
    errorMsg: state.admSizes.errorMsg,
    fetchExistingSizesMessage: state.admSizes.fetchExistingSizesMessage

  };
};

export default connect(
  mapStateToProps,
  {
    getNewSizeName,
    saveNewSizeInDb,
    getExistingSizes,
    getUpdatedSize,
    updateSizeInDb,
    updateSizesInAllProducts
  }
)(AdmSizes);
