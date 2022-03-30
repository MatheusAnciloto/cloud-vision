import { productSearchClient } from './client';
import keys from './constants';

export const createReferenceImage = async () => {
  const { projectId, location, productId } = keys;
  const productPath = productSearchClient.productPath(projectId, location, productId);
  const locationPath = productSearchClient.locationPath(projectId, location);

  console.log(locationPath);
  console.log(productPath);
  try {
    const [response] = await productSearchClient.createReferenceImage({
      parent: productPath,
      referenceImage: {
        uri: 'gs://us.artifacts.test-mlit.appspot.com/images/scream.jpg',
        name: 'scream',
      },
      referenceImageId: 'scream',
    });
  
    return response;
  } catch (e) {
    console.log(e);
  }
};
