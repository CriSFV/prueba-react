import getApiInfo from "../services/api";
import ls from "../services/cache";
import mockPodcast from "./mocks";
import App from "../../components/App";
import EpisodeDetail from "../../components/EpisodeDetail";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("../services/api", () => ({
  getPodcasts: jest.fn(),
  getPodcastInfo: jest.fn(),
}));

jest.mock("../services/cache", () => ({
  get: jest.fn(),
}));

jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: () => ({
    query: {
      trackId: "1000604730376",
      id: "1535809342",
    },
  }),
}));

describe("print list", () => {
  beforeEach(() => {
    getApiInfo.getPodcasts.mockClear()
    getApiInfo.getPodcastInfo.mockClear()
    ls.get.mockClear()
  });

  afterEach(() => {
    getApiInfo.getPodcasts.mockRestore()
    getApiInfo.getPodcastInfo.mockRestore()
    ls.get.mockRestore();
  });

  test("return list", async () => {
    getApiInfo.getPodcasts.mockResolvedValue(mockPodcast.mockPodcastList);
    ls.get.mockReturnValue(mockPodcast.mockPodcastList);
    const view = render(<App />);

    expect(view.container).toHaveTextContent(
      mockPodcast.mockPodcastList[1].author
    );
  });

  test("return podcast detail", () => {
    ls.get.mockReturnValue(mockPodcast.mockPodcastDetail);
    getApiInfo.getPodcastInfo.mockReturnValue(mockPodcast.mockPodcastSelected);

    const handleLoading = jest.fn();
    const view = render(<EpisodeDetail handleLoading={handleLoading} />);
    expect(view.container).toHaveTextContent(
      mockPodcast.mockPodcastSelected.trackName
    );
  });
});

describe("input filter", () => {
  test("input filter works showing length in the counter", () => {
    getApiInfo.getPodcasts.mockResolvedValue(mockPodcast.mockPodcastList);
    ls.get.mockReturnValue(mockPodcast.mockPodcastList);

    const userSearch = jest.fn();

    render(<App userSearch={userSearch} />);
    const input = screen.getByRole("searcher")
    const listCounter = screen.getByRole("list-counter");

    fireEvent.keyUp(input, { target: { value: "budden" } });

    expect(input.value).toBe("budden");
    expect(screen.getByText("The Joe Budden Podcast")).toBeInTheDocument()
    expect(listCounter).toHaveTextContent(1);
  });
});
