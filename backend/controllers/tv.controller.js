import { fetchFromTDB } from "../services/tmdb.service.js";

export async function getTrendingTv(req, res) {
  try {
    const data = await fetchFromTDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    const randomTV =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.json({
      success: true,
      content: randomTV,
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        success: false,
        message: "TV show not found",
      });
    }
    console.error("Error fetching trending TV:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch trending TV",
    });
  }
}

export async function getTvTrailers(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    res.json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }
    console.error("Error fetching movie trailers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch movie trailers",
    });
  }
}

export async function getTvDetails(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTDB(
      `https://api.themoviedb.org/3/tv/${id}language=en-US`
    );
    res.json({
      success: true,
      content: data,
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }
    console.error("Error fetching movie details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch movie details",
    });
  }
}

export async function getSimilarTv(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    res.json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }
    console.error("Error fetching similar movies:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch similar movies",
    });
  }
}

export async function getTvByCategory(req, res) {
  const { category } = req.params;
  try {
    const data = await fetchFromTDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    res.json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    console.error("Error fetching movies by category:", error);
  }
}
