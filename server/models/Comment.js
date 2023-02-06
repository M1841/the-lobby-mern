import mongoose, { trusted } from "mongoose";

const CommentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    likes: {
        type: Map,
        of: Boolean
    },
}, { timestamps: true});

const Comment = mongoose.model("Post", CommentSchema);

export default Post;