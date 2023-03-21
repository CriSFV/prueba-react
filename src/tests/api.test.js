import getApiInfo from '../services/api';
import '@testing-library/jest-dom';

jest.setTimeout(30000)

describe('get info from api', ()=>{
  const theExpectedApiResponse = {
    id: '1535809341',
    title: "The Joe Budden Podcast",
    author: "The Joe Budden Network",
    img: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/170x170bb.png',
    summary: "Tune into Joe Budden and his friends. Follow along the crazy adventures of these very random friends."
  }
  
  test('returns the api data expected', async () => {
    // const mock = jest.fn(getApiInfo.getPodcasts)
    // mock.mockReturnValue(theExpectedApiResponse)
    const data = await getApiInfo.getPodcasts()
  
    expect(data.length).toBe(100)
    expect(data[0]).toEqual({ id: expect.any(String), title: expect.any(String), author: expect.any(String), summary: expect.any(String), img: expect.any(String) })
  });
  

  /* podcastdetail*****************/
  test('returns podcastDetails', async () =>{
    // const mock = jest.fn(getApiInfo.getPodcastInfo)
    const response = [{
      wrapperType: 'podcastEpisode',
      releaseDate: '2023-03-18T23:42:00Z',
      trackTimeMillis: 11695000,
      trackId: 1000604787959,
      trackName: 'BACKONFIGG Ep:52st With Ladies Night',
      episodeUrl: 'https://traffic.megaphone.fm/EAEOM7960817679.mp3?updated=1679194965'
    }]
    // mock.mockReturnValue(response)
    const data = await getApiInfo.getPodcastInfo(1658497449)
    // console.log(data[1]);
  
    expect(data[1]).toEqual({ wrapperType: expect.any(String), releaseDate: expect.any(String), trackTimeMillis: expect.any(Number), trackId: expect.any(Number), trackName: expect.any(String), episodeUrl: expect.any(String)})
  })
})

