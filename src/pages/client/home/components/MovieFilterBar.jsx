import React from "react";
import { Row, Col, Input, Select, Button } from "antd";
const { Search } = Input;
const { Option } = Select;

const MovieFilterBar = ({
  query,
  onQueryChange,
  genre,
  onGenreChange,
  genres,
  sort,
  onSortChange,
  onReset,
}) => (
  <Row gutter={[12, 12]} style={{ marginBottom: 12 }}>
    <Col xs={24} sm={12} md={10} lg={8}>
      <Search
        placeholder="Tìm theo tiêu đề..."
        allowClear
        enterButton
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
    </Col>

    <Col xs={12} sm={6} md={4} lg={4}>
      <Select style={{ width: "100%" }} value={genre} onChange={onGenreChange}>
        {genres.map((g) => (
          <Option key={g} value={g}>
            {g}
          </Option>
        ))}
      </Select>
    </Col>

    <Col xs={12} sm={6} md={6} lg={6}>
      <Select style={{ width: "100%" }} value={sort} onChange={onSortChange}>
        <Option value="popular">Mặc định</Option>
        <Option value="rating">Đánh giá cao</Option>
        <Option value="year_desc">Năm giảm dần</Option>
        <Option value="year_asc">Năm tăng dần</Option>
      </Select>
    </Col>

    <Col xs={24} style={{ textAlign: "right" }}>
      <Button onClick={onReset}>Reset</Button>
    </Col>
  </Row>
);

export default MovieFilterBar;
