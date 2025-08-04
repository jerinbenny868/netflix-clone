import { User } from "../models/user.model.js";
import { fetchFromTDB } from "../services/tmdb.service.js";

export async function searchPerson(req, res) {
  const { query } = req.params;
  try {
    const response = await fetchFromTDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US`
    );
    if (response.results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No results found",
      });
    }
    res.json({
      success: true,
      content: response.results,
    });
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          name: response.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        success: false,
        message: "Person not found",
      });
    }
    console.error("Error fetching person:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch person",
    });
  }
}

export async function searchMovie(req, res) {
  const { query } = req.params;
  try {
    const response = await fetchFromTDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US`
    );
    if (response.results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No results found",
      });
    }
    res.json({
      success: true,
      content: response.results,
    });
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          name: response.results[0].title,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }
    console.error("Error fetching movie:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch movie",
    });
  }
}

export async function searchTv(req, res) {
  const { query } = req.params;
  try {
    const response = await fetchFromTDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US`
    );
    if (response.results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No results found",
      });
    }
    res.json({
      success: true,
      content: response.results,
    });
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          name: response.results[0].name,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        success: false,
        message: "TV show not found",
      });
    }
    console.error("Error fetching TV show:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch TV show",
    });
  }
}

export async function getSearchHistory(req, res) {
  try {
    res.status(200).json({
      success: true,
      content: req.user.searchHistory,
    });
  } catch (error) {
    console.error("Error fetching search history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch search history",
    });
  }
}

export async function deleteSearchHistory(req, res) {
  let { id } = req.params;
  id = parseInt(id);

  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });
    res.status(200).json({
      success: true,
      message: "Item deleted from search history",
    });
  } catch (error) {
    console.error("Error deleting search history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete search history",
    });
  }
}
