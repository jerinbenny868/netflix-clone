import { fetchFromTDB } from "../services/tmdb.service.js";

export async function getTrendingMovie(req, res) {
  try {
    const data = await fetchFromTDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res.json({
      success: true,
      content: randomMovie,
    });
  } catch (error) {
    console.error("Error fetching trending movie:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch trending movie",
    });
  }
}

export async function getMovieTrailers(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
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

export async function getMovieDetails(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
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

export async function getSimilarMovies(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
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

export async function getMoviesByCategory(req, res) {
  const { category } = req.params;
  try {
    const data = await fetchFromTDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
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
