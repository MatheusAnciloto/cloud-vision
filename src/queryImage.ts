import fs from 'fs';
import path from 'path';
import { imageAnnotatorClient, productSearchClient } from './client';
import keys from './constants';

export const getSimilarProductsFile = async () => {
  const { projectId, location, productSetId } = keys;

  const productSetPath = productSearchClient.productSetPath(
    projectId,
    location,
    productSetId
  );
  const content = fs.readFileSync(path.join(__dirname, '../photos/mona.png'), 'base64');
  const [response] = await imageAnnotatorClient.batchAnnotateImages({
    requests: [{
      image: {content: content},
      features: [{type: 'PRODUCT_SEARCH'}],
      imageContext: {
        productSearchParams: {
          productSet: productSetPath,
          productCategories: ['apparel'],
        },
      },
    }],
  });
  const results = response!.responses![0]?.productSearchResults;
  return results;
}
