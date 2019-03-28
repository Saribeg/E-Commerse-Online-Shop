import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import Dropzone from "react-dropzone";

import Preloader from "../../Preloader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";

import "./admProducts.scss";

import {
  getCategory,
  getSubCategory,
  getFurtherSubCategory,
  getProductModelName,
  getwithdrawnStatus,
  getActiveStatus,
  getCurrentPrice,
  getPreviousPrice,
  getProductFeatures,
  handleProductColors,
  addColor,
  addSize,
  getImages,
  onFilesRejected,
  deleteDropzoneImage,
  deleteSize,
  deleteColor,
  handleProductSizes,
  handleProductQuantity,
  resetModal,
  resetForm,
  generateNewItemNo,
  sendNewProductToServer
} from "../../../actions/adminDashboard/admProductsActions";
import { getAdmNavMenuItems } from "../../../actions/adminDashboard/admNavMenuActions";

class AdmProducts extends Component {
  // Calling action-creator for getting from server object with Navigation Menu Items
  componentDidMount() {
    this.props.getAdmNavMenuItems();
    this.props.getProductFeatures();
  }

  render() {
    const {
      category,
      subCategory,
      furtherSubCategory,
      navMenuItems,
      subCategoryOptions,
      furtherSubCategoryOptions,
      getCategory,
      getSubCategory,
      getFurtherSubCategory,
      getProductModelName,
      productModelName,
      active,
      withdrawnFromSale,
      getwithdrawnStatus,
      getActiveStatus,
      currentPrice,
      previousPrice,
      getCurrentPrice,
      getPreviousPrice,
      productFeatures,
      colorOptions,
      colorStyles,
      sizeOptions,
      handleProductColors,
      addColor,
      addSize,
      getImages,
      onFilesRejected,
      deleteDropzoneImage,
      deleteSize,
      deleteColor,
      handleProductSizes,
      handleProductQuantity,
      resetModalStatus,
      resetModal,
      resetForm,
      admProducts,
      generateNewItemNo,
      sendNewProductToServer,
      validation,
      fetchingNewProduct,
      productMessage,
      photosMessage,
      itemNo,
      colorCollectionUpdateMessage,
      sizeCollectionUpdateMessage
    } = this.props;

    //Options for category input-select (men / women)
    let categoryOptions = navMenuItems.map(cat => {
      return {
        value: cat.categoryName,
        label: cat.categoryName
      };
    });

    let productFeaturesList = productFeatures.map((color, colorIndex) => {
      //Detecting the css-code of the color, chosen in input-select to show this color to user
      let currentColor = colorStyles.filter(item => {
        return item.colorName === color.colorName.value;
      });

      let currentColorCssHexCode = "#ffffff";

      if (currentColor.length > 0) {
        currentColorCssHexCode = currentColor[0]["cssHexCode"];
      }

      let dublicates = [
        ...new Set(
          color.previewImages
            .map((img, i) => {
              return img.name;
            })
            .sort()
            .filter((imgName, i, imgNamesArr) => {
              return imgNamesArr[i + 1] === imgNamesArr[i];
            })
        )
      ];

      //Creating image-preview component for react-dropzone
      let previewImagesContent = color.previewImages.map((image, i, arr) => {
        return (
          <li className="image-preview-item" key={image.preview}>
            <img
              src={image.preview}
              alt="Files Preview"
              className={
                dublicates.includes(image.name)
                  ? "image-preview-image image-preview-image-dublicate"
                  : "image-preview-image"
              }
              data-index={i}
            />
            <input
              type="button"
              className={
                dublicates.includes(image.name)
                  ? "delete-image delete-image-dublicate"
                  : "delete-image"
              }
              data-action="delete-image"
              value="Delete image"
            />
          </li>
        );
      });

      // Rendering product size block
      let sizeItemList = color.sizes.map((size, sizeIndex) => {
        return (
          <li className="admin-products-sizes-item" key={sizeIndex}>
            <Select
              className="admin-products-sizes-select"
              placeholder="Chose size"
              options={sizeOptions}
              value={productFeatures[colorIndex].sizes[sizeIndex].size}
              onChange={option =>
                handleProductSizes(
                  option,
                  productFeatures,
                  colorIndex,
                  sizeIndex,
                  validation
                )
              }
            />
            <input
              type="number"
              placeholder="Fill quantity"
              className="admin-products-sizes-quantity"
              value={productFeatures[colorIndex].sizes[sizeIndex].quantity}
              onChange={e =>
                handleProductQuantity(
                  e.target.value,
                  productFeatures,
                  colorIndex,
                  sizeIndex
                )
              }
            />
            {sizeIndex > 0 ? (
              <input
                type="button"
                className="admin-products-sizes-delete"
                value="Delete Size"
                onClick={() =>
                  deleteSize(productFeatures, colorIndex, sizeIndex, validation)
                }
              />
            ) : null}
            <div className="error-message">
              {validation.productFeatures[colorIndex].sizes[sizeIndex].size
                ? validation.productFeatures[colorIndex].sizes[sizeIndex].size
                : null}
            </div>
          </li>
        );
      });

      return (
        <div className="admin-products-productfeatures" key={colorIndex}>
          {colorIndex > 0 ? (
            <input
              type="button"
              className="delete-color"
              value="Delete Color"
              onClick={() =>
                deleteColor(productFeatures, colorIndex, validation)
              }
            />
          ) : null}
          <div className="admin-products-color-item">
            <div className="admin-products-color-text">
              <label className="admin-products-input-label">
                Product Color #{colorIndex + 1}
              </label>
              <Select
                value={productFeatures[colorIndex].colorName}
                onChange={option =>
                  handleProductColors(
                    option,
                    productFeatures,
                    colorIndex,
                    colorStyles,
                    validation
                  )
                }
                options={colorOptions}
                placeholder="Chose color"
              />
              <div className="error-message">
                {validation.productFeatures[colorIndex].colorName
                  ? validation.productFeatures[colorIndex].colorName
                  : null}
              </div>
            </div>
            <div
              className="admin-products-color-styled"
              style={{
                backgroundColor: currentColorCssHexCode
              }}
            />
          </div>
          <div className="admin-products-photos">
            <p className="admin-products-input-label">
              Drop images or click to select a file to upload
            </p>
            <Dropzone
              multiple
              onDrop={files => {
                getImages(files, productFeatures, colorIndex, validation);
              }}
              onDropRejected={() =>
                onFilesRejected(productFeatures, colorIndex)
              }
              onClick={e =>
                deleteDropzoneImage(e, productFeatures, colorIndex, validation)
              }
              accept={["image/png", "image/jpg", "image/jpeg"]}
              className="image-dropzone"
              activeClassName="image-dropzone-active"
              acceptClassName="image-dropzone-accepted"
              rejectClassName="image-dropzone-rejected"
              maxSize={5000000}
            >
              {color.previewImages.length < 1 ? (
                <FontAwesomeIcon
                  icon={faImages}
                  className="dropzone-placeholder"
                />
              ) : (
                <div className="image-preview">
                  <ul className="image-preview-list">{previewImagesContent}</ul>
                </div>
              )}
            </Dropzone>
            {color.filesRejected ? (
              <div className="error-message">
                Files upload are rejected. Please, check that files extension
                are .png / .jpg / .jpeg and there size does not exceed 1MB{" "}
              </div>
            ) : (
              <div className="stansart-message">
                Max-size: 1MB, allowed extensions: .png / .jpg / .jpeg{" "}
              </div>
            )}
            <div className="error-message">
              {validation.productFeatures[colorIndex].previewImages
                ? validation.productFeatures[colorIndex].previewImages
                : validation.productFeatures[colorIndex].imageNamesDuplicate
                ? validation.productFeatures[colorIndex].imageNamesDuplicate
                : null}
            </div>
          </div>

          <div className="admin-products-sizes">
            <ul className="admin-products-sizes-list">{sizeItemList}</ul>
          </div>
          <div className="error-message">
            {validation.productFeatures[colorIndex].sizeDublicate
              ? validation.productFeatures[colorIndex].sizeDublicate
              : null}
          </div>
          <input
            type="button"
            value="Add Size"
            className="add-size-btn"
            onClick={() => addSize(productFeatures, colorIndex, validation)}
          />
        </div>
      );
    });

    return (
      <>
        <div className="itemNo-wrapper">
          <input
            type="button"
            className="generate-new-itemNo"
            value="Generate New ItemNo (ProductId)"
            onClick={generateNewItemNo}
          />
          <span className="itemNo-value">
            {itemNo ? itemNo : "ItemNo is not generated"}
          </span>
        </div>
        <div className="admin-products-wrapper">
          <form
            className="admin-products-form"
            encType="multipart/form-data"
            method="post"
          >
            <div className="admin-products-category-wrapper">
              <div className="admin-products-categories">
                <div className="admin-products-categories-item">
                  <label className="admin-products-input-label">Category</label>
                  <Select
                    value={category}
                    onChange={option =>
                      getCategory(option, navMenuItems, validation)
                    }
                    options={categoryOptions}
                    placeholder="Chose category"
                    required
                    // isClearable
                  />
                  <div className="error-message">
                    {validation.category ? validation.category : null}
                  </div>
                </div>
                <div className="admin-products-categories-item">
                  <label className="admin-products-input-label">
                    Sub-Category
                  </label>
                  <Select
                    value={subCategory}
                    onChange={option =>
                      getSubCategory(option, navMenuItems, category, validation)
                    }
                    options={subCategoryOptions}
                    placeholder={category.value ? "Chose sub-category" : null}
                    isDisabled={category.value ? false : true}
                  />
                  <div className="error-message">
                    {validation.subCategory ? validation.subCategory : null}
                  </div>
                </div>
                <div className="admin-products-categories-item">
                  <label className="admin-products-input-label">
                    Sub-Sub-Category
                  </label>
                  <Select
                    value={furtherSubCategory}
                    onChange={option =>
                      getFurtherSubCategory(option, validation)
                    }
                    options={furtherSubCategoryOptions}
                    placeholder={
                      subCategory.value ? "Chose sub-sub-category" : null
                    }
                    isDisabled={
                      furtherSubCategoryOptions.length < 1
                        ? true
                        : subCategory.value
                        ? false
                        : true
                    }
                  />
                  <div className="error-message">
                    {validation.furtherSubCategory
                      ? validation.furtherSubCategory
                      : null}
                  </div>
                </div>
              </div>
              <div className="admin-products-model">
                <label className="admin-products-input-label">
                  Product Model Name
                </label>
                <input
                  className="admin-products-model-input"
                  type="text"
                  placeholder="Enter product model name"
                  value={productModelName}
                  onChange={e =>
                    getProductModelName(e.target.value, validation)
                  }
                />
                <div className="error-message">
                  {validation.productModelName
                    ? validation.productModelName
                    : null}
                </div>
              </div>
              <div className="admin-products-status">
                <label className="admin-products-status-label">
                  <input
                    className="admin-products-checkbox"
                    name="isWithdrawn"
                    type="checkbox"
                    checked={withdrawnFromSale}
                    onChange={e => getwithdrawnStatus(e.target.checked)}
                  />
                  <p className="admin-products-status-label-text">
                    Mark if withdrawn from sale
                  </p>
                </label>
                <label className="admin-products-status-label">
                  <input
                    className="admin-products-checkbox"
                    name="isActive"
                    type="checkbox"
                    checked={active}
                    onChange={e => getActiveStatus(e.target.checked)}
                  />
                  <p className="admin-products-status-label-text">
                    Mark to not show in product lists
                  </p>
                </label>
              </div>
              <div className="admin-products-prices">
                <div className="admin-products-price">
                  <label className="admin-products-input-label">
                    Current Price:
                  </label>
                  <input
                    type="number"
                    className="admin-products-price-input"
                    placeholder="Enter current price"
                    value={currentPrice}
                    onChange={e =>
                      getCurrentPrice(e.target.value, validation, previousPrice)
                    }
                  />
                  <span className="dollar">$</span>
                  <div className="error-message">
                    {validation.currentPrice ? validation.currentPrice : null}
                  </div>
                </div>
                <div className="admin-products-price">
                  <label className="admin-products-input-label">
                    Previous Price:
                  </label>
                  <input
                    className="admin-products-price-input"
                    type="number"
                    placeholder="Enter previous price"
                    value={previousPrice}
                    onChange={e =>
                      getPreviousPrice(e.target.value, validation, currentPrice)
                    }
                  />
                  <span className="dollar">$</span>
                  <div className="error-message">
                    {validation.previousPrice ? validation.previousPrice : null}
                  </div>
                </div>
              </div>
            </div>
            {productFeaturesList}
            <div className="error-message">
              {validation.colorDublicate ? validation.colorDublicate : null}
            </div>
            <input
              type="button"
              value="Add Color"
              className="add-color-btn"
              onClick={() => addColor(productFeatures, validation)}
            />
            <div className="admin-products-final-actions">
              <input
                type="button"
                className="admin-products-reset"
                value="Reset"
                onClick={() => resetModal(true)}
              />
              <input
                type="button"
                className="admin-products-submit"
                value="Save New Product To Database"
                onClick={() => {
                  sendNewProductToServer(
                    admProducts,
                    validation,
                    furtherSubCategoryOptions
                  );
                }}
              />
            </div>
          </form>
          <div
            className={resetModalStatus ? "reset-modal" : "reset-modal-hide"}
          >
            <span className="reset-modal-text">
              Are you sure you want to reset all filled information??? After
              clearing the filled fields, they will need to be filled again to
              add a new product to the database.
            </span>
            <div className="reset-modal-actions">
              <input
                type="button"
                className="reset-modal-btn reset-modal-cansel"
                value="Cancel"
                onClick={() => resetModal(false)}
              />
              <input
                type="button"
                className="reset-modal-btn reset-modal-confirm"
                value="Confirm"
                onClick={() => resetForm(admProducts)}
              />
            </div>
          </div>
        </div>
        <div className="server-message">
          {fetchingNewProduct ? <Preloader /> : null}
          {productMessage ? (
            <div className="server-message-product">{productMessage}</div>
          ) : null}
          {photosMessage ? (
            <div className="server-message-images"> {photosMessage}</div>
          ) : null}
          {colorCollectionUpdateMessage ? (
            <div className="server-message-images">
              {" "}
              {colorCollectionUpdateMessage}
            </div>
          ) : null}
          {sizeCollectionUpdateMessage ? (
            <div className="server-message-images">
              {" "}
              {sizeCollectionUpdateMessage}
            </div>
          ) : null}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    admProducts: state.admProducts,
    navMenuItems: state.navMenu.navMenuItems,
    category: state.admProducts.category,
    subCategory: state.admProducts.subCategory,
    furtherSubCategory: state.admProducts.furtherSubCategory,
    subCategoryOptions: state.admProducts.subCategoryOptions,
    furtherSubCategoryOptions: state.admProducts.furtherSubCategoryOptions,
    productModelName: state.admProducts.productModelName,
    active: state.admProducts.active,
    withdrawnFromSale: state.admProducts.withdrawnFromSale,
    currentPrice: state.admProducts.currentPrice,
    previousPrice: state.admProducts.previousPrice,
    productFeatures: state.admProducts.productFeatures,
    colorOptions: state.admProducts.colorOptions,
    sizeOptions: state.admProducts.sizeOptions,
    colorStyles: state.admProducts.colorStyles,
    itemNo: state.admProducts.itemNo,
    resetModalStatus: state.admProducts.resetModalStatus,
    validation: state.admProducts.validation,
    fetchingNewProduct: state.admProducts.fetchingNewProduct,
    productMessage: state.admProducts.productMessage,
    photosMessage: state.admProducts.photosMessage,
    colorCollectionUpdateMessage:
      state.admProducts.colorCollectionUpdateMessage,
    sizeCollectionUpdateMessage: state.admProducts.sizeCollectionUpdateMessage,
    existingColors: state.admColors.existingColors
  };
};

export default connect(
  mapStateToProps,
  {
    getCategory,
    getSubCategory,
    getFurtherSubCategory,
    getAdmNavMenuItems,
    getProductModelName,
    getwithdrawnStatus,
    getActiveStatus,
    getCurrentPrice,
    getPreviousPrice,
    getProductFeatures,
    handleProductColors,
    addColor,
    addSize,
    getImages,
    onFilesRejected,
    deleteDropzoneImage,
    deleteSize,
    deleteColor,
    handleProductSizes,
    handleProductQuantity,
    resetModal,
    resetForm,
    generateNewItemNo,
    sendNewProductToServer
  }
)(AdmProducts);
