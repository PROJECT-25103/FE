import React, { useMemo, useState } from "react";
import { Row, Col, Empty } from "antd";
import BannerSection from "./components/BannerSection";
import MovieTabs from "./components/MovieTabs";
import MovieFilterBar from "./components/MovieFilterBar";
import MovieCard from "./components/MovieCard";
import bannerImg from "../../../assets/images/banner/banner.png";
import posterTraiTim from "../../../assets/images/poster/trai-tim-que-quat.jpg";
import sampleMovies from "./data/sampleMovies";

const DEFAULT_BANNER = bannerImg;
const DEFAULT_POSTER = posterTraiTim;

const HomePage = () => {
  const [tabKey, setTabKey] = useState("coming");
  const [movies] = useState(sampleMovies);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState("popular");

  const genres = useMemo(() => {
    const setG = new Set();
    movies.forEach((m) => m.genres.forEach((g) => setG.add(g)));
    return ["All", ...Array.from(setG)];
  }, [movies]);

  const filtered = useMemo(() => {
    let list = movies.filter((m) =>
      m.title.toLowerCase().includes(query.toLowerCase()),
    );
    list = list.filter((m) => m.status === tabKey);
    if (genre !== "All") list = list.filter((m) => m.genres.includes(genre));
    return list;
  }, [movies, query, genre, tabKey]);

  const handleBuy = (movie) => {
    alert(`Mua vé: ${movie.title}`);
  };

  return (
    <div>
      <BannerSection src={bannerImg} fallback={DEFAULT_BANNER} />
      <div
        style={{
          width: "100%",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        <MovieTabs tabKey={tabKey} onChange={setTabKey} />
        <MovieFilterBar
          query={query}
          onQueryChange={setQuery}
          genre={genre}
          onGenreChange={setGenre}
          genres={genres}
          sort={sort}
          onSortChange={setSort}
          onReset={() => {
            setQuery("");
            setGenre("All");
            setSort("popular");
          }}
        />

        {filtered.length === 0 ? (
          <Empty description="Không có phim" />
        ) : (
          <Row gutter={[24, 28]}>
            {filtered.map((m) => (
              <Col key={m.id} xs={12} sm={12} md={8} lg={6}>
                <MovieCard
                  movie={m}
                  onBuy={handleBuy}
                  fallback={DEFAULT_POSTER}
                />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default HomePage;
