
import App from '../components/App';
import Home from '../components/Home';

import {  MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import getApiInfo from '../services/api';
import ls from '../services/cache'
import mockPodcast from './mocks';
import EpisodeDetail from '../components/EpisodeDetail';


jest.mock('../services/api', () =>({
  getPodcasts: jest.fn(),
  getPodcastInfo: jest.fn()

}))

jest.mock('../services/cache',()=>({
  get: jest.fn(),

}))

jest.mock('react-router-dom', () =>({
  ...jest.requireActual('react-router-dom'),
  useParams:()=>({
    episodeId:'1000604730376',
    podcastId: '1535809342'
  }),
}))



describe('print list', ()=>{

  beforeEach(()=>{
    getApiInfo.getPodcasts.mockClear(),
    getApiInfo.getPodcastInfo.mockClear(),
    ls.get.mockClear()
})

  afterEach(()=>{
    getApiInfo.getPodcasts.mockRestore(),
    getApiInfo.getPodcastInfo.mockRestore(),
    ls.get.mockRestore()
  })

  test('return list', async ()=>{
    getApiInfo.getPodcasts.mockResolvedValue(mockPodcast.mockPodcastList);
    ls.get.mockReturnValue(mockPodcast.mockPodcastList)
    const component = render(< MemoryRouter> <App /> </MemoryRouter>);
    
    expect(component.container).toHaveTextContent(mockPodcast.mockPodcastList[1].author);
  });
  
  test('return podcast detail', () => {

    ls.get.mockReturnValue(mockPodcast.mockPodcastSelected)
    getApiInfo.getPodcastInfo.mockReturnValue(mockPodcast.mockPodcastDetail);

    const component = render(<MemoryRouter> <EpisodeDetail/> </MemoryRouter>)
    expect(component.container).toHaveTextContent(mockPodcast.mockPodcastDetail.trackName)
  });
  
});

describe('input filter', ()=>{

  test('input filter works showing length in the counter', ()=>{
    getApiInfo.getPodcasts.mockResolvedValue(mockPodcast.mockPodcastList);
    ls.get.mockReturnValue(mockPodcast.mockPodcastList)

    const userSearch = jest.fn()

    const component = render(<MemoryRouter> <App userSearch={userSearch}/> </MemoryRouter>)
    const input = component.container.querySelector('input')
    const filteredList = component.container.querySelector('ul')
    const listCounter = component.container.querySelector('#list-counter')

    fireEvent.keyUp(input, {target: {value: 'budden'}})

    expect(input.value).toBe('budden')
    expect(filteredList.childElementCount).toBe(1)
    expect(listCounter).toHaveTextContent(filteredList.childElementCount)
  })

})
