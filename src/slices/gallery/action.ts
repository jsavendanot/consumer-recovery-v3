import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import { fetchImages, startLoading, stopLoading } from './gallerySlice';
import { Image } from 'types/gallery';
import { callMyStoryUpdateImageApi } from 'slices/story/action';
import {
  callProfileReadApi,
  callProfileUpdateApi
} from 'slices/profile/action';
import { Profile } from 'types/profile';

//** ASYNC FUNCS */
export const fetchGalleryImages = (): AppThunk => async (
  dispatch,
  getState
) => {
  try {
    dispatch(startLoading());

    const coverOfMyStoryImageId = getState().story.story.WhereAreYouFrom;
    const images = await callMyStoryPhotoListApi();

    const coverImage = images.find(item => item.Id === coverOfMyStoryImageId);
    const updatedImages = images.filter(
      item => item.Id !== coverOfMyStoryImageId
    );

    coverImage && updatedImages.unshift(coverImage);

    dispatch(
      fetchImages({
        images: updatedImages
      })
    );
    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const createGalleryImage = (
  image: Image
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callMyStoryPhotoCreateApi(image);

    const images = await callMyStoryPhotoListApi();
    dispatch(
      fetchImages({
        images
      })
    );

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const deleteGalleryImage = (
  imageId: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callMyStoryPhotoDeleteApi(imageId);

    const images = await callMyStoryPhotoListApi();
    dispatch(
      fetchImages({
        images
      })
    );

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const setAsCoverOfMyStoryImage = (
  imageId: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());

    await callMyStoryUpdateImageApi(imageId);

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const setAsMyProfileImage = (
  image: string,
  imageType: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());

    const profile = await callProfileReadApi();

    const updatedProfile: Profile = {
      ...profile,
      Image: image,
      ImageType: imageType
    };

    sessionStorage.setItem('Avatar', image);

    callProfileUpdateApi(updatedProfile);

    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */

export const callMyStoryPhotoListApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();

  return axios
    .get(`/MyStoryPhoto/List/${sessionStorage.getItem('UserId')}`)
    .then(response => {
      const images: Image[] = JSON.parse(JSON.stringify(response.data));
      return images;
    });
};

export const callMyStoryPhotoCreateApi = (image: Image) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.post('/MyStoryPhoto/Create/', image);
};

export const callMyStoryPhotoDeleteApi = (imageId: string) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios.delete(`/MyStoryPhoto/Delete/${imageId}`);
};
