import React, { useState, useEffect } from 'react';
import './LatestNews.css';

const LatestNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error handling state

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/files/get-files");
      const data = await response.json();
      if (data.status === "ok") {
        // Sort articles by date in descending order and take the latest 10
        const sortedArticles = data.data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);
        setArticles(sortedArticles);
      } else {
        setError("Failed to load articles");
      }
    } catch (error) {
      setError("Error fetching articles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      <section className="latest-news-container">
        <h1 className="latest-news-heading">Latest News</h1>

        {loading ? (
          <div className="loading">Loading articles...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="cards-container">
            <section className="cards">
              {articles.map((article, index) => (
                <div key={index} className="card">
                  <a href={article.url_link || `/files/${article.pdf_link}`} className="card-content">
                    <article className='article-card'>
                      <header className="card-header">
                        <p className="date-published">
                          <span className="date-published-prefix">Article</span> on {new Date(article.date).toLocaleDateString()}
                        </p>
                        <h2 className="card-title">{article.title}</h2>
                      </header>
                    </article>
                  </a>
                </div>
              ))}
            </section>
          </div>
        )}
      </section>
    </>
  );
};

export default LatestNews;
