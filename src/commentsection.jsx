import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function CommentSection() {
    const { 
        register: registerComment, 
        handleSubmit: handleSubmitComment, 
        reset: resetComment, 
        formState: { errors: commentErrors } 
    } = useForm();

    const { 
        register: registerReply, 
        handleSubmit: handleSubmitReply, 
        reset: resetReply, 
        formState: { errors: replyErrors } 
    } = useForm();

    const { post_id } = useParams();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [replyToCommentId, setReplyToCommentId] = useState(null);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/commentsRoutes/getcomments/${post_id}`, {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            });
            setComments(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching comments:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [post_id]);

    const onSubmitComment = async (data) => {
        try {
            await axios.post(`http://localhost:3001/commentsRoutes/submitcomment/${post_id}`, data, {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            });
            console.log("Comment successfully posted");
            resetComment();
            fetchComments();
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    const onSubmitReply = async (data, commentId) => {
        try {
            await axios.post(`http://localhost:3001/commentsRoutes/submitreply/${commentId}`, data, {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            });
            console.log("Reply successfully posted");
            resetReply();
            setReplyToCommentId(null);
            fetchComments();
        } catch (error) {
            console.error("Error posting reply:", error);
        }
    };

    const handleReplyClick = (commentId) => {
        setReplyToCommentId(commentId);
    };

    if (loading) {
        return <p>Loading comments...</p>;
    }

    return (
        <div className="text-black bg-white p-4 md:p-6 rounded-lg shadow-lg flex flex-col flex-1 lg:ml-4 max-h-[700px] overflow-hidden">
            <div className="flex-1 overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Comments</h2>
                <div className="space-y-4 mb-3">
                    {Array.isArray(comments) && comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.comment_id} className="flex flex-col mb-4">
                                <div className="flex items-start p-3 bg-gray-50 rounded-lg shadow-sm mb-3 transition-all duration-300 hover:shadow-md">
                                    <img 
                                        src={comment.profilePicture || '/api/placeholder/40/40'} 
                                        alt={`${comment.firstname}'s profile`} 
                                        className="w-10 h-10 rounded-full mr-3 object-cover"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-sm text-gray-800 mb-1">{comment.firstname} {comment.lastname}</p>
                                        <p className="text-gray-600 text-sm break-words">{comment.comment}</p>
                                    </div>
                                    <button 
                                    onClick={() => handleReplyClick(comment.comment_id)} 
                                    className="mt-2 text-sky-500 hover:underline text-sm"
                                >
                                    Reply
                                </button>
                                </div>
                                
                                <div className="ml-12">
                                    {comment.replies && comment.replies.length > 0 ? (
                                        comment.replies.map((reply) => (
                                            <div key={reply.reply_id} className="flex items-start p-2 bg-gray-100 rounded-lg shadow-sm mb-2 transition-all duration-300 hover:shadow-md">
                                                <img 
                                                    src={reply.profilePicture || '/api/placeholder/40/40'} 
                                                    alt={`${reply.firstname}'s profile`} 
                                                    className="w-8 h-8 rounded-full mr-2 object-cover"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-xs text-gray-800 mb-1">{reply.firstname} {reply.lastname}</p>
                                                    <p className="text-gray-600 text-xs break-words">{reply.reply}</p>
                                                </div>
                                            </div>
                                        ))
                                    ):(<></>)}
                                </div>

                                

                                {replyToCommentId === comment.comment_id && (
                                    <form onSubmit={handleSubmitReply((data) => onSubmitReply(data, comment.comment_id))} className="space-y-2 mt-2">
                                        <textarea 
                                            rows="2" 
                                            id="reply"
                                            className="w-full p-2 border bg-transparent border-gray-300 rounded-2xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                            placeholder="Write a reply..."
                                            {...registerReply('reply', { required: "You didn't write a reply" })}
                                        />
                                        {replyErrors.reply && <p className="text-red-500 text-xs mt-1">{replyErrors.reply.message}</p>}
                                        <button className="w-full md:w-auto mt-2 bg-sky-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300">
                                            Submit Reply
                                        </button>
                                    </form>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 italic">No comments yet.</p>
                    )}
                </div>
            </div>

            <form onSubmit={handleSubmitComment(onSubmitComment)} className="mt-4 border-t border-gray-200 pt-4">
                <textarea 
                    rows="3" 
                    id="comment"
                    className="w-full p-2 border bg-transparent border-gray-300 rounded-2xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Write a comment..."
                    {...registerComment('comment', { required: "You didn't write a comment" })}
                />
                {commentErrors.comment && <p className="text-red-500 text-xs mt-1">{commentErrors.comment.message}</p>}
                <button className="mt-2 bg-sky-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300">
                    Add Comment
                </button>
            </form>
        </div>
    );
}

export default CommentSection;
