import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button, TextField, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import './AdminCSS/AdminLstNws.css';

function AdminLstNws() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newArticle, setNewArticle] = useState({ title: '', url_link: '', pdf_link: '' });
    const [openEditModal, setOpenEditModal] = useState(false); // State for opening the edit modal
    const [currentArticleIndex, setCurrentArticleIndex] = useState(null); // Track which article is being edited

    const fetchArticles = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:4000/api/files/get-files");
            const data = await response.json();
            if (data.status === "ok") {
                const sortedArticles = data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
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

    const handleAddArticle = async () => {
        const formData = new FormData();
        formData.append("title", newArticle.title);
        formData.append("url_link", newArticle.url_link);
        if (newArticle.pdf_link) formData.append("file", newArticle.pdf_link);

        try {
            const response = await fetch("http://localhost:4000/api/files/upload-file", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            if (response.ok) {
                fetchArticles();  // Refresh the article list
                setNewArticle({ title: '', url_link: '', pdf_link: '' }); // Reset input fields
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError("Error adding article. Please try again.");
        }
    };

    const handleDeleteArticle = async (index) => {
        const articleId = articles[index]._id;

        try {
            const response = await fetch(`http://localhost:4000/api/files/delete/${articleId}`, {
                method: "DELETE",
            });
            const result = await response.json();
            if (response.ok) {
                fetchArticles();  // Refresh the article list
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError("Error deleting article. Please try again.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewArticle({ ...newArticle, [name]: value });
    };

    const handleEditClick = (index) => {
        const article = articles[index];
        setNewArticle({
            title: article.title,
            url_link: article.url_link,
            pdf_link: article.pdf_link,
        });
        setCurrentArticleIndex(index); // Set the index of the article being edited
        setOpenEditModal(true); // Open the edit modal
    };

    const handleSaveEdit = async () => {
        const formData = new FormData();
        formData.append("title", newArticle.title);
        formData.append("url_link", newArticle.url_link);
        if (newArticle.pdf_link) formData.append("file", newArticle.pdf_link);

        try {
            const response = await fetch(`http://localhost:4000/api/files/update/${articles[currentArticleIndex]._id}`, {
                method: "PUT",
                body: formData,
            });
            const result = await response.json();
            if (response.ok) {
                fetchArticles();  // Refresh the article list
                setOpenEditModal(false);  // Close the edit modal
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError("Error updating article. Please try again.");
        }
    };

    const handleCancelEdit = () => {
        setOpenEditModal(false); // Close the modal without saving
    };

    return (
        <section className="lstnws-container">
            <div className="lstnws-heading">Latest News</div>

            {loading ? (
                <div className="lstnws-loading">Loading articles...</div>
            ) : error ? (
                <div className="lstnws-error">{error}</div>
            ) : (
                <div className="lstnws-cards-container">
                    {/* Add New Article Card */}
                    <Card className="lstnws-add-card">
                        <CardContent>
                            <div className="lstnws-card-title">Add New Article</div>
                            <Box>
                                <TextField
                                    name="title"
                                    label="Title"
                                    value={newArticle.title}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    name="url_link"
                                    label="URL Link"
                                    value={newArticle.url_link}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    name="pdf_link"
                                    label="PDF Link"
                                    value={newArticle.pdf_link}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                                <Button onClick={handleAddArticle} variant="contained">Add Article</Button>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Displaying Articles */}
                    <div className="lstnws-cards-grid">
                        {articles.map((article, index) => (
                            <Card key={article._id} className="lstnws-card">
                                <CardContent style={{ flexGrow: 1 }}>
                                    <div className="lstnws-card-title-scrollable">{article.title}</div>
                                    <div className="lstnws-card-url">{article.url_link}</div>
                                </CardContent>
                                <div className="lstnws-card-footer">
                                    <Button
                                        onClick={() => handleEditClick(index)}
                                        className="lstnws-btn lstnws-btn-edit"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDeleteArticle(index)}
                                        className="lstnws-btn lstnws-btn-delete"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>

                </div>
            )}

            {/* Edit Modal */}
            <Dialog open={openEditModal} onClose={handleCancelEdit} className="edit-dialog">
                <DialogTitle className="edit-dialog-title">Edit Article</DialogTitle>
                <DialogContent className="edit-dialog-content">
                    <TextField
                        name="title"
                        label="Title"
                        value={newArticle.title}
                        onChange={handleChange}
                        fullWidth
                        className="edit-dialog-input"
                    />
                    <TextField
                        name="url_link"
                        label="URL Link"
                        value={newArticle.url_link}
                        onChange={handleChange}
                        fullWidth
                        className="edit-dialog-input"
                    />
                    <TextField
                        name="pdf_link"
                        label="PDF Link"
                        value={newArticle.pdf_link}
                        onChange={handleChange}
                        fullWidth
                        className="edit-dialog-input"
                    />
                </DialogContent>
                <DialogActions className="edit-dialog-actions">
                    <Button onClick={handleSaveEdit} className="edit-dialog-save-btn">Save</Button>
                    <Button onClick={handleCancelEdit} className="edit-dialog-cancel-btn">Cancel</Button>
                </DialogActions>
            </Dialog>

        </section>

    );
}

export default AdminLstNws;
