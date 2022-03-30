import * as dotenv from 'dotenv';
import path from 'path';
import { imageAnnotatorClient, productSearchClient } from './client';
import keys from './constants';
import { createReferenceImage } from './createReferenceImage';
import { getSimilarProductsFile } from './queryImage';

dotenv.config({ path: '.env' });

const { projectId, location, productSetId, productId } = keys;

const labelExample = async () => {
  const [result] = await imageAnnotatorClient.labelDetection(path.join(__dirname, '../images/scream.jpg'));
  const labels = result?.labelAnnotations;

  if (!labels?.length) return labels;
  console.log(labels);

  labels.forEach(label => console.log(label.description));
};
const productPath = productSearchClient.productPath(projectId, location, productId);
const productSetPath = productSearchClient.productSetPath(
  projectId,
  location,
  productSetId
);
const locationPath = productSearchClient.locationPath(projectId, location);


const createProduct = async () => {
  const [createdProduct] = await productSearchClient.createProduct({
    parent: locationPath,
    product: {
      name: productSetId,
      description: productSetId,
      displayName: productSetId,
      productCategory: 'apparel',
    }
  });
  return createdProduct;
};

const addProductToProductSet = async () => {

  const request = {
    name: productSetPath,
    product: productPath,
  };

  const [response] = await productSearchClient.listProductsInProductSet(request);
  return response;
};

const listReferenceImages = async () => {
  const productPath = productSearchClient.productPath(projectId, location, productId);

  const [response] = await productSearchClient.listReferenceImages({
    parent: productPath
  });

  return response;
};

const getProductSet = async () => {
  const [response] = await productSearchClient.getProductSet({
    name: productSetPath,
  });

  return response;
};

const callAsync = async () => {
  const response = await getSimilarProductsFile(); 
  console.log(response);
}
callAsync();
