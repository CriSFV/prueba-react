import getApiInfo from '../services/api';
import '@testing-library/jest-dom';

jest.setTimeout(30000)

describe('get info from api', ()=>{
  
  test('returns the api data expected', async () => {
    const data = await getApiInfo.getPodcasts()
  
    expect(data.length).toBe(100)
    expect(data[0]).toEqual({ id: expect.any(String), title: expect.any(String), author: expect.any(String), summary: expect.any(String), img: expect.any(String) })
  });
  

  /* podcastdetail*****************/
  test('returns podcastDetails', async () =>{

    const data = await getApiInfo.getPodcastInfo(1658497449)
  
    expect(data[1]).toEqual({ wrapperType: expect.any(String), releaseDate: expect.any(String), trackTimeMillis: expect.any(Number), trackId: expect.any(Number), trackName: expect.any(String), episodeUrl: expect.any(String),description:expect.any(String)})
  })
})

