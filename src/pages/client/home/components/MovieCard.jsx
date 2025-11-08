import React from "react";
import { Card, Button, Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text, Link } = Typography;

const MovieCard = ({ movie, onBuy, fallback }) => {
  const navigate = useNavigate();

  const styles = {
    posterWrap: {
      position: "relative",
      borderRadius: 12,
      overflow: "hidden",
      minHeight: 320,
    },
    posterImg: { width: "100%", height: 320, objectFit: "cover" },
    ageTag: {
      position: "absolute",
      top: 10,
      left: 10,
      background: "#ffcf33",
      color: "#112",
      fontWeight: 700,
      borderRadius: 6,
      padding: "2px 6px",
      fontSize: 12,
    },
    buyBtn: {
      background: "#2d9cdb",
      borderColor: "#2d9cdb",
      color: "#fff",
      borderRadius: 6,
      height: 44,
      width: "100%",
      marginTop: 12,
    },
  };

  return (
    <Card bordered={false} bodyStyle={{ paddingTop: 12 }}>
      <div style={styles.posterWrap}>
        <div style={styles.ageTag}>{movie.age}</div>
        <img
          src={movie.poster}
          alt={movie.title}
          style={styles.posterImg}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallback;
          }}
        />
      </div>
      <div style={{ paddingTop: 8 }}>
        <Link onClick={() => navigate(`/showtime/${movie.id}`)} strong>
          {movie.title}
        </Link>
        <div>
          Thể loại: <Text strong>{movie.genres.join(", ")}</Text>
        </div>
        <div>
          Thời lượng: <Text strong>{movie.duration}</Text>
        </div>
        <div style={{ color: "#888" }}>
          Ngày khởi chiếu: <Text strong>{movie.releaseDate}</Text>
        </div>

        {movie.status === "now" && (
          <Button
            icon={<ShoppingCartOutlined />}
            style={styles.buyBtn}
            onClick={() => onBuy(movie)}
          >
            MUA VÉ
          </Button>
        )}
      </div>
    </Card>
  );
};

export default MovieCard;
