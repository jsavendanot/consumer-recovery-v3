import { AppThunk } from 'store';
import axios from 'common/utils/axios';
import authentication from '@kdpw/msal-b2c-react';
import {
  fetchStory,
  fetchStrenghts,
  fetchAreas,
  fetchSharedList,
  startLoading,
  stopLoading
} from './storySlice';
import { FocusArea, AreaApiType } from 'types/other';
import { Strength, Story } from 'types/story';
import { ShareNetworkApi } from 'types/network';
import { fetchGalleryImages } from 'slices/gallery/action';
import { fetchAllFocusAreas } from 'slices/other/action';
import {
  fetchSuggestedStrengths,
  fetchSuggestedFocusAreas
} from 'slices/suggestion/story/action';
import { fetchNetworks } from 'slices/network/action';

//** ASYNC FUNCS */

export const fetchStoryAllData = (): AppThunk => async (dispatch, getState) => {
  try {
    const myStrengthsLen = getState().story.strengths.length;
    const myFocusAreasLen = getState().story.focusAreas.length;

    myStrengthsLen === 0 && myFocusAreasLen === 0 && dispatch(startLoading());

    await dispatch(fetchStoryData());
    await dispatch(fetchGalleryImages());
    await dispatch(fetchStrenghtsData());
    await dispatch(fetchMyAreas());

    dispatch(fetchNetworks());
    dispatch(fetchSuggestedStrengths());
    dispatch(fetchSuggestedFocusAreas());

    myStrengthsLen === 0 && myFocusAreasLen === 0 && dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const fetchStoryData = (): AppThunk => async dispatch => {
  try {
    const story = await callMyStoryReadApi();
    dispatch(
      fetchStory({
        story
      })
    );

    const sharedData = await callMyStoryShareListApi(story.MyStoryId);
    dispatch(fetchSharedList({ networks: sharedData }));
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const fetchStrenghtsData = (): AppThunk => async dispatch => {
  try {
    const strengths = await callStrengthReadApi();
    dispatch(
      fetchStrenghts({
        strengths
      })
    );
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const fetchMyAreas = (): AppThunk => async dispatch => {
  try {
    const focusAreas = await callFocusAreaListApi();

    dispatch(
      fetchAreas({
        focusAreas
      })
    );
  } catch (err) {
    // dispatch(failed(err.toString()));
  }
};

export const updateMyStory = (
  history: any,
  story: string,
  strengths: Strength[],
  removedFocusAreas: FocusArea[]
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());

    await callMyStoryUpdateApi(story);
    await callStrengthUpdateApi(strengths);

    await Promise.all(
      removedFocusAreas.map(async area => {
        await callFocusAreaUpdateApi(area, false);
      })
    );

    await dispatch(fetchAllFocusAreas());
    await dispatch(fetchMyAreas());

    dispatch(stopLoading());
    history.push('/story');
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const writeStory = (
  history: any,
  story: string
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await callMyStoryUpdateApi(story);
    dispatch(stopLoading());
    history.push('/story');
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const addMyStrengths = (
  values: Strength[]
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    const strengths = await callStrengthUpdateApi(values);
    dispatch(fetchStrenghts({ strengths }));
    dispatch(stopLoading());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

export const addMyAreas = (
  focusAreas: FocusArea[]
): AppThunk => async dispatch => {
  try {
    dispatch(startLoading());
    await Promise.all(
      focusAreas.map(async area => {
        await callFocusAreaUpdateApi(area, true);
      })
    ).then(response => {
      dispatch(fetchAreas({ focusAreas }));
    });
    dispatch(stopLoading());

    dispatch(fetchAllFocusAreas());
  } catch (err) {
    dispatch(stopLoading());
    // dispatch(failed(err.toString()));
  }
};

//** API FUNCS */

const callMyStoryUpdateApi = (story: string) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  const requestContent = {
    Story: story,
    VisibleTo: 'SpecificPeople'
  };
  return axios.post('/MyStory/Update', requestContent);
};

export const callMyStoryUpdateImageApi = (imageId: string) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  const requestContent = {
    WhereAreYouFrom: imageId
  };
  return axios.post('/MyStory/Update', requestContent);
};

export const callMyStoryReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios
    .get(`/MyStory/Read/${sessionStorage.getItem('UserId')!}`)
    .then(response => {
      const story: Story = response.data;
      return story;
    });
};

const callStrengthUpdateApi = (values: Strength[]) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  const requestContent = {
    Items: [
      ...values.map(value => {
        return value.name;
      })
    ]
  };
  return axios.post('/Strength/Update', requestContent).then(response => {
    return values;
  });
};

export const callStrengthReadApi = () => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  const values: Strength[] = [];
  return axios
    .get(`/Strength/Read/${sessionStorage.getItem('UserId')!}`)
    .then(response => {
      response.data['Items'].forEach((item: string, index: string) => {
        values.push({
          id: index,
          name: item
        });
      });
      return values;
    });
};

const callFocusAreaUpdateApi = (area: FocusArea, isSelected: boolean) => {
  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  const requestContent = {
    Id: area.id,
    Label: area.name,
    IsSelected: isSelected,
    Description: area.description
  };
  return axios.post(`/FocusArea/Update/${area.id}`, requestContent);
};

export const callMyStoryShareListApi = (storyId: string) => {
  return axios.get(`/MyStoryShare/List/${storyId}`).then(response => {
    const networks: ShareNetworkApi[] = JSON.parse(
      JSON.stringify(response.data)
    );
    return networks;
  });
};

export const callFocusAreaListApi = () => {
  const info = [
    {
      id: '088433ef-caec-e911-a812-000d3a79722d',
      name: 'Mental health',
      image: 'mental-health.svg',
      color: '#F9FF83'
    },
    {
      id: '12ef08fc-caec-e911-a812-000d3a79722d',
      name: 'Physical health / Self-care',
      image: 'physical-health.svg',
      color: '#B5EAE7'
    },
    {
      id: '157c4d02-cbec-e911-a812-000d3a79722d',
      name: 'Identity/ Self-esteem',
      image: 'self-esteem.svg',
      color: '#FEC6FF'
    },
    {
      id: 'd2588108-cbec-e911-a812-000d3a79722d',
      name: 'Relationships',
      image: 'relationships.svg',
      color: '#FFCCCC'
    },
    {
      id: '03598108-cbec-e911-a812-000d3a79722d',
      name: 'Living skills',
      image: 'living-skills.svg',
      color: '#B3CBFF'
    },
    {
      id: '7226830e-cbec-e911-a812-000d3a79722d',
      name: 'Social networks',
      image: 'social-networks.svg',
      color: '#B5EAE7'
    },
    {
      id: '09b88714-cbec-e911-a812-000d3a79722d',
      name: 'Work / Education',
      image: 'work-education.svg',
      color: '#E0E0E0'
    },
    {
      id: '28b88714-cbec-e911-a812-000d3a79722d',
      name: 'Addictive behaviours',
      image: 'addictive-behaviours.svg',
      color: '#66A7BC'
    },
    {
      id: 'b071951a-cbec-e911-a812-000d3a79722d',
      name: 'Accommodation',
      image: 'accommodation.svg',
      color: '#EAE087'
    },
    {
      id: '1680bf20-cbec-e911-a812-000d3a79722d',
      name: 'Responsibilities',
      image: 'responsibilities.svg',
      color: '#FFEE4D'
    },
    {
      id: '3a80bf20-cbec-e911-a812-000d3a79722d',
      name: 'Hope / Trust',
      image: 'hope-trust.svg',
      color: '#C4C4C4'
    }
  ];

  axios.defaults.headers.common['Authorization'] =
    'Bearer ' + authentication.getAccessToken();
  return axios
    .get(`/FocusArea/List/${sessionStorage.getItem('UserId')}`)
    .then(response => {
      const focusAreas: FocusArea[] = [];
      response.data.forEach((area: AreaApiType) => {
        if (area.IsSelected) {
          const areaObject: FocusArea = {
            id: area.Id,
            name: area.Label,
            color: info.find(item => item.id === area.Id)?.color!,
            image: info.find(item => item.id === area.Id)?.image!,
            description: area.Description,
            isSelected: area.IsSelected
          };
          focusAreas.push(areaObject);
        }
      });

      return focusAreas;
    });
};
