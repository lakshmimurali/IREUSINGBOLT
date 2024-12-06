import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { PenSquare, BookOpen, Home } from 'lucide-react';
import { ArticleList } from './components/ArticleList';
import { ArticleForm } from './components/ArticleForm';
import { ArticleReader } from './components/ArticleReader';
import { useArticles } from './hooks/useArticles';

function App() {
  const { articles, loading, error, createArticle } = useArticles();

  const handleCreateArticle = async (articleData: { title: string; content: string; tags: string[] }) => {
    try {
      await createArticle({
        ...articleData,
        author: 'Anonymous' // Replace with actual user authentication
      });
    } catch (err) {
      console.error('Failed to create article:', err);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex space-x-8">
                <Link to="/" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  <Home className="w-5 h-5 mr-2" />
                  Home
                </Link>
                <Link to="/write" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  <PenSquare className="w-5 h-5 mr-2" />
                  Write
                </Link>
                <Link to="/articles" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Articles
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={
              <div className="text-center py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Welcome to Interactive Reading Platform
                </h1>
                <p className="text-xl text-gray-600">
                  Write, read, and interact with articles in a whole new way
                </p>
              </div>
            } />
            <Route path="/write" element={
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Write an Article</h2>
                <ArticleForm onSubmit={handleCreateArticle} />
              </div>
            } />
            <Route path="/articles" element={
              loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : error ? (
                <div className="text-center py-12 text-red-600">{error}</div>
              ) : (
                <ArticleList articles={articles} />
              )
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;